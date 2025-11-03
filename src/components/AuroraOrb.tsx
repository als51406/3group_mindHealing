import { useEffect, useMemo, useState } from 'react';
import './aurora.css';
import { paletteFromBase } from '../utils/colorUtils';

export default function AuroraOrb({ color, size = 260, className = '' }: { color: string; size?: number; className?: string }) {
  const [prev, setPrev] = useState(color);
  const [showNew, setShowNew] = useState(false);
  const current = useMemo(() => paletteFromBase(prev), [prev]);
  const next = useMemo(() => paletteFromBase(color), [color]);
  const style = {
    '--size': `${size}px`,
    '--c1': current.c1,
    '--c2': current.c2,
    '--c3': current.c3,
  } as React.CSSProperties;
  const styleOverlay = {
    '--c1': next.c1,
    '--c2': next.c2,
    '--c3': next.c3,
  } as React.CSSProperties;

  useEffect(() => {
    if (color === prev) return;
    setShowNew(true);
    const t = setTimeout(() => { setPrev(color); setShowNew(false); }, 600);
    return () => clearTimeout(t);
  }, [color, prev]);

  return (
    <div className={`aurora-orb-wrap ${className}`} style={style}>
      <div className="aurora-orb">
        <div className={`aurora-orb__overlay ${showNew ? 'show' : ''}`} style={styleOverlay} />
      </div>
    </div>
  );
}
