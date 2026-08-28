import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, KeyRound, CheckCircle2, Lock } from 'lucide-react';
import type { EasterEgg } from '../../types/museum';
import { soundEngine } from '../../audio/soundEngine';

interface SecretsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eggs: EasterEgg[];
}

export const SecretsModal: React.FC<SecretsModalProps> = ({ isOpen, onClose, eggs }) => {
  if (!isOpen) return null;

  const unlockedCount = eggs.filter((e) => e.discovered).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-museum-surface border-2 border-museum-accent/40 rounded-2xl shadow-2xl overflow-hidden text-museum-text"
        >
          {/* Header */}
          <div className="bg-[#161e27] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-museum-accent/20 text-museum-accent">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  Archival Secrets & Easter Eggs
                </h3>
                <div className="text-xs font-mono text-museum-accent">
                  CLEARANCE: {unlockedCount} / {eggs.length} DISCOVERED
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playInspect();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Secrets List */}
          <div className="p-6 space-y-3 max-h-[65vh] overflow-y-auto">
            {eggs.map((egg, idx) => (
              <div
                key={egg.id}
                className={`p-4 rounded-xl border transition-all ${
                  egg.discovered
                    ? 'bg-museum-accent/10 border-museum-accent/30'
                    : 'bg-black/30 border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {egg.discovered ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-white/30" />
                    )}
                    <span className="text-sm font-display font-bold text-white">
                      {egg.discovered ? egg.title : `Classified Secret #${idx + 1}`}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    {egg.discovered ? 'UNLOCKED' : 'ENCRYPTED'}
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-300 pl-6">
                  {egg.discovered ? egg.rewardMessage : `Hint: ${egg.trigger}`}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-black/40 border-t border-white/10 text-center text-xs font-mono text-white/40">
            Tip: Explore museum artifacts, spam click 🤷‍♀️, inspect restricted doors, and explore drafting sheets to unlock all 6 clearances.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
