import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function PageLoader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(() => !prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#080808] px-6"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-[#121212] shadow-[0_0_40px_rgba(255,43,28,0.28)]">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                NI
              </span>
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-sm bg-[#FF2B1C]" />
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-display text-xs font-semibold tracking-[0.28em] text-white/90 uppercase">
                NE&apos;MATOV ISLOMJON
              </span>
              <div className="h-[2px] w-44 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full bg-gradient-to-r from-[#FF2B1C] via-[#FF5A1F] to-[#FF7A24]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
