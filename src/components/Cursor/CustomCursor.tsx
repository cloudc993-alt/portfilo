import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isVisible = false;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
      const target = e.target as HTMLElement | null;
      isHovering = Boolean(
        target?.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]'),
      );
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.opacity = isVisible ? '1' : '0';
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0) scale(${
          isHovering ? 0.5 : 1
        })`;
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = isVisible ? '1' : '0';
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${
          isHovering ? 1.5 : 1
        })`;
        ringRef.current.style.borderColor = isHovering
          ? 'rgba(255, 122, 36, 0.85)'
          : 'rgba(255, 43, 28, 0.55)';
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden lg:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-[#FF2B1C]/60 transition-colors duration-200 will-change-transform"
        style={{ opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#FF5A1F] shadow-[0_0_12px_#FF2B1C] will-change-transform"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
