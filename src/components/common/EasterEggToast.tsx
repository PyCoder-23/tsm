import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import type { EasterEgg } from '../../types/museum';

interface EasterEggToastProps {
  egg: EasterEgg | null;
  onDismiss: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ egg, onDismiss }) => {
  if (!egg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#16202a]/95 border-2 border-museum-accent/60 rounded-2xl shadow-2xl p-4 text-white backdrop-blur-xl"
      >
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-museum-accent/20 text-museum-accent shrink-0 mt-0.5">
            <KeyRound className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-museum-accent uppercase">
                SECRET UNLOCKED
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-museum-accent animate-ping" />
            </div>
            <h4 className="text-sm font-display font-bold text-white">
              {egg.title}
            </h4>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              {egg.rewardMessage}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
          <span className="text-museum-accent/80">Archival Clearance Granted</span>
          <button
            onClick={onDismiss}
            className="text-white/60 hover:text-white underline underline-offset-2"
          >
            DISMISS
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
