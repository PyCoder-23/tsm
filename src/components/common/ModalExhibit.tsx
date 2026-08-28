import React from 'react';
import { X, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExhibitItem } from '../../types/museum';
import { soundEngine } from '../../audio/soundEngine';

interface ModalExhibitProps {
  exhibit: ExhibitItem | null;
  onClose: () => void;
}

export const ModalExhibit: React.FC<ModalExhibitProps> = ({ exhibit, onClose }) => {
  if (!exhibit) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-museum-surface border border-museum-accent/30 rounded-2xl shadow-2xl overflow-hidden text-museum-text"
        >
          {/* Header Blueprint bar */}
          <div className="bg-gradient-to-r from-[#18222d] to-[#121921] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-museum-accent animate-ping" />
              <span className="font-mono text-xs font-semibold text-museum-accent tracking-widest uppercase">
                CATALOG RECORD // {exhibit.catalogId}
              </span>
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

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            <div>
              <div className="text-xs font-mono text-cyan-400 tracking-wider mb-1">
                {exhibit.classification}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {exhibit.title}
              </h2>
              {exhibit.subtitle && (
                <div className="text-sm font-mono text-museum-accent mt-1">
                  {exhibit.subtitle}
                </div>
              )}
            </div>

            {/* Description lines */}
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              {exhibit.description.map((p, idx) => (
                <p key={idx} className="border-l-2 border-museum-accent/30 pl-3.5">
                  {p}
                </p>
              ))}
            </div>

            {/* Meta tags / Data */}
            {exhibit.meta && exhibit.meta.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                {exhibit.meta.map((m, i) => (
                  <div key={i} className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="text-xs font-mono font-medium text-white/90 mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Curatorial stamp */}
            <div className="bg-museum-accent/5 border border-museum-accent/20 rounded-xl p-4 flex items-start space-x-3 text-xs font-mono text-museum-accent/80">
              <Compass className="w-4 h-4 shrink-0 mt-0.5 text-museum-accent" />
              <div>
                <span className="font-semibold text-museum-accent">CURATORIAL NOTE:</span> Specimen cataloged by Harleen during ongoing architectural and personal studies. Preservation status: permanent.
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="bg-black/40 px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-white/40">THE SONAL ARCHIVES</span>
            <button
              onClick={() => {
                soundEngine.playInspect();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all font-semibold"
            >
              CLOSE RECORD
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
