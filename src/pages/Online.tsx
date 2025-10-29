// Online.tsx — 간단한 실시간(폴링) 그룹 채팅
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Online() {
  const [messages, setMessages] = useState<Array<{ id: string; user: string; text: string; createdAt?: string }>>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/login');
  }, [loading, user, navigate]);

  useEffect(() => {
    let stop = false;
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/online/messages', { credentials: 'include' });
        if (res.status === 401) {
          setError('로그인이 필요합니다.');
          return;
        }
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.items)) setMessages(data.items);
        }
      } catch {}
    };
    const fetchLoop = async () => {
      await fetchMessages();
      if (!stop) setTimeout(fetchLoop, 2500);
    };
    fetchLoop();
    return () => { stop = true; };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/online/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
      });
      if (res.status === 401) {
        setError('로그인이 필요합니다.');
        return;
      }
      if (res.ok) {
        setInput('');
        // 전송 직후 한 번 재조회하여 즉시 반영
        try { await fetch('/api/online/messages', { credentials: 'include' }).then(r => r.ok ? r.json() : null).then(d => { if (d?.items) setMessages(d.items); }); } catch {}
      }
    } catch {}
    finally { setSending(false); }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !(e as any).nativeEvent?.isComposing) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div style={{ padding: 16, display: 'grid', gridTemplateRows: '1fr auto', gap: 12, height: 'calc(100vh - 56px)' }}>
      {error && (
        <div style={{ color: '#b91c1c', background: '#fee2e2', border: '1px solid #fecaca', padding: '8px 10px', borderRadius: 8, marginBottom: 8 }}>
          {error}
        </div>
      )}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12, overflowY: 'auto', background: '#fff' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{m.user}</div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); void send(); }} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="메시지를 입력하세요. Enter 전송 (Shift+Enter 줄바꿈)"
          rows={2}
          style={{ flex: 1, padding: 10, border: '1px solid #e5e7eb', borderRadius: 8, resize: 'vertical', background: '#fff' }}
        />
        <button type="submit" disabled={sending || !input.trim()} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #2563eb', background: sending ? '#93c5fd' : '#2563eb', color: '#fff', cursor: sending ? 'not-allowed' : 'pointer' }}>
          {sending ? '전송중…' : '전송'}
        </button>
      </form>
    </div>
  );
}
