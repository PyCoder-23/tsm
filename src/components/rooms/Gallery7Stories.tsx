import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookMarked, Feather, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery7StoriesProps {
  onNext: () => void;
}

const FLOATING_MANUSCRIPTS = [
  {
    id: 'f1',
    code: 'ARC-01',
    snippet: 'Character development detected.',
    loreStatus: 'PROTAGONIST DRAFTED',
    notes: 'Complex internal conflict established. Author currently refining character motives.',
  },
  {
    id: 'f2',
    code: 'ARC-02',
    snippet: 'New lore added to overarching world.',
    loreStatus: 'WORLDBUILDING EXPANSION',
    notes: 'Geographical lore and cultural rules expanded by several chapters.',
  },
  {
    id: 'f3',
    code: 'ARC-03',
    snippet: 'Plot unresolved — climax pending.',
    loreStatus: 'NARRATIVE TENSION',
    notes: 'Major storyline cliffhanger. Spoilers strictly withheld from unauthorized visitors.',
  },
  {
    id: 'f4',
    code: 'ARC-04',
    snippet: 'Author has suddenly entered another idea.',
    loreStatus: 'CREATIVE CONVERGENCE',
    notes: 'New parallel character concept generated while working on architectural drawing.',
  },
];

export const Gallery7Stories: React.FC<Gallery7StoriesProps> = ({ onNext }) => {
  const [activeManuscript, setActiveManuscript] = useState<number | null>(0);

  const handleCardClick = (idx: number) => {
    soundEngine.playInspect();
    setActiveManuscript(activeManuscript === idx ? null : idx);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 07 // SECTOR: LOR-07</span>
          <span>•</span>
          <span>THE STORY ARCHIVE</span>
        </div>
        <div className="text-right text-amber-400">VAULT CLEARANCE: CLASSIFIED</div>
      </div>

      {/* Main Content */}
      <div className="my-6 space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            ATMOSPHERIC LORE VAULT
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Sonal's Stories & Worldbuilding
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            Original narratives, developed characters, and imaginative universes. Click the floating manuscript fragments to review detected signals.
          </p>
        </div>

        {/* Floating Manuscripts Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Security Classification Plaque */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1c1824] to-[#100e16] border-2 border-purple-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest flex items-center space-x-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                  <span>NARRATIVE SECURITY VAULT</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                  ENCRYPTED
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-display font-bold text-white">
                  CONTENTS: CLASSIFIED
                </h3>
                <p className="text-xs font-mono text-purple-200/80 leading-relaxed">
                  Reason: The author has not provided sufficient spoilers. The archive remains in a state of active worldbuilding.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-purple-500/20 space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-white/40">AUTHOR:</span>
                  <span className="text-white font-semibold">Sonal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">CURRENT STATUS:</span>
                  <span className="text-museum-accent font-semibold">Actively Generating Lore</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">SPOILER DISCLOSURE:</span>
                  <span className="text-rose-400 font-semibold">0.00%</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white/60 space-y-1">
              <div className="text-cyan-400 font-semibold flex items-center space-x-1">
                <Feather className="w-3.5 h-3.5" />
                <span>OBSERVATION NOTE</span>
              </div>
              <p>
                A creative mind that writes complex stories while simultaneously tackling rigid geometrical drawing and architecture entrance preparation.
              </p>
            </div>
          </div>

          {/* Right Column: Floating Glowing Manuscript Cards */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center space-x-2">
              <BookMarked className="w-3.5 h-3.5 text-museum-accent" />
              <span>DETECTED NARRATIVE SIGNALS (CLICK TO REVEAL)</span>
            </div>

            <div className="space-y-3">
              {FLOATING_MANUSCRIPTS.map((item, idx) => {
                const isSelected = activeManuscript === idx;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.015, x: 4 }}
                    onClick={() => handleCardClick(idx)}
                    className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#20172e] to-[#161222] border-purple-400 shadow-xl shadow-purple-500/10'
                        : 'bg-[#121018] border-white/10 hover:border-purple-500/40 hover:bg-[#181422]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                          {item.code}
                        </span>
                        <span className="text-xs font-mono text-purple-300/80">
                          {item.loreStatus}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/40">
                        {isSelected ? 'SIGNAL DECRYPTED' : 'CLICK TO SCAN'}
                      </span>
                    </div>

                    <h4 className="text-base font-display font-semibold text-white mb-2">
                      "{item.snippet}"
                    </h4>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-3 border-t border-purple-500/20 text-xs font-mono text-slate-300 italic"
                      >
                        {item.notes}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE AIRPORT CINEMA (EXHIBIT 09)
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER AIRPORT CINEMA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
