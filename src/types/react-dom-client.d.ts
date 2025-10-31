declare module 'react-dom/client' {
  // intentionally using 'react' and types only; avoid unused top-level bindings
  export function createRoot(container: Element | DocumentFragment): {
    render(children: React.ReactNode): void;
    unmount(): void;
  };
}
