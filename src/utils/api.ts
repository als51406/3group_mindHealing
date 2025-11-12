// Centralized fetch helper: in-flight request dedupe, jittered exponential backoff,
// short TTL cache for /api/me, and a response wrapper that caches body text so
// multiple callers can call json()/text() safely.
type FetchOptions = RequestInit & { cacheTTL?: number };

const inFlight = new Map<string, Promise<any>>();
const shortCache = new Map<string, { expires: number; value: any }>();

function makeKey(input: RequestInfo, init?: RequestInit) {
  if (typeof input === 'string') {
    return `${input}::${init ? JSON.stringify(init) : ''}`;
  }
  try { return JSON.stringify(input); } catch { return String(input); }
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithBackoff(input: RequestInfo, init: FetchOptions = {}) {
  const key = makeKey(input, init);

  // short cache for /api/me (1.5s default)
  if (typeof input === 'string' && input.includes('/api/me')) {
    const cached = shortCache.get(key);
    if (cached && cached.expires > Date.now()) return cached.value;
  }

  // If caller provided a signal, do not dedupe the request — an AbortController
  // passed by a component should only cancel that component's request, not a
  // shared in-flight promise used elsewhere.
  const hasSignal = !!(init && (init as any).signal);
  if (!hasSignal && inFlight.has(key)) return inFlight.get(key);

  const attempt = async () => {
    const maxRetries = 4;
    let attemptIdx = 0;
    while (true) {
      try {
        const res = await fetch(input, init);
        if (res.status === 429 && attemptIdx < maxRetries) {
          const backoff = Math.min(1000 * Math.pow(2, attemptIdx), 5000);
          const jitter = Math.random() * 300;
          await delay(backoff + jitter);
          attemptIdx++;
          continue;
        }

        // wrap response to cache body text so multiple callers can call json()/text()
        const bodyText = await res.text();
        const cachedResponse: any = {
          ok: res.ok,
          status: res.status,
          headers: res.headers,
          json: async () => {
            try { return JSON.parse(bodyText); } catch { return null; }
          },
          text: async () => bodyText,
          clone: () => cachedResponse,
        };

        // cache /api/me for a very short time
        if (typeof input === 'string' && input.includes('/api/me')) {
          shortCache.set(key, { expires: Date.now() + (init.cacheTTL || 1500), value: cachedResponse });
        }

        return cachedResponse;
      } catch (err) {
        if (attemptIdx < 4) {
          await delay(500 + Math.random() * 400);
          attemptIdx++;
          continue;
        }
        throw err;
      }
    }
  };

  const p = attempt().finally(() => { if (!hasSignal) inFlight.delete(key); });
  if (!hasSignal) inFlight.set(key, p);
  return p;
}

export { fetchWithBackoff };

// Default export for consumers that import the module as a default
export default fetchWithBackoff;
