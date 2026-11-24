import React, { useCallback, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useTilt(maxTilt = 7) {
  const prefersReduced = useReducedMotion();
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-y * maxTilt).toFixed(2);
      const rotateY = (x * maxTilt).toFixed(2);
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
        transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
      });
    },
    [maxTilt, prefersReduced],
  );

  const onMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
    });
  }, []);

  return { tiltStyle, onMouseMove, onMouseLeave };
}
