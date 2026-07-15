import { useCallback, useEffect, useRef } from 'react';

export default function SplitDivider({ onDrag }) {
  const draggingRef = useRef(false);

  const handlePointerDown = useCallback((e) => {
    draggingRef.current = true;
    e.preventDefault();
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!draggingRef.current) return;
      onDrag(e.clientX);
    };
    const handlePointerUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [onDrag]);

  return (
    <div
      onPointerDown={handlePointerDown}
      role="separator"
      aria-orientation="vertical"
      className="seam hidden md:block w-3 shrink-0 cursor-col-resize text-teal/50 hover:text-teal transition-colors bg-paper-bg"
      style={{ zIndex: 10 }}
    />
  );
}
