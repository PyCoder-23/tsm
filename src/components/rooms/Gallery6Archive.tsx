import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';
import { ARCHIVE_EXHIBITS } from '../../data/museumData';
import type { ExhibitItem } from '../../types/museum';
import { soundEngine } from '../../audio/soundEngine';
import { ModalExhibit } from '../common/ModalExhibit';

interface Gallery6ArchiveProps {
  onNext: () => void;
  onEggShrug?: () => void;
  onEggToldYou?: () => void;
  onEgg2v1?: () => void;
}

export const Gallery6Archive: React.FC<Gallery6ArchiveProps> = ({
  onNext,
  onEggShrug,
  onEggToldYou,
  onEgg2v1,
}) => {
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitItem | null>(null);
  const [shrugClickCount, setShrugClickCount] = useState(0);

  const handleExhibitClick = (exhibit: ExhibitItem) => {
    soundEngine.playInspect();
    setSelectedExhibit(exhibit);

    // Easter Egg Checks
    if (exhibit.id === 'ex-shrug') {
      const nextCount = shrugClickCount + 1;
      setShrugClickCount(nextCount);
      if (nextCount >= 3 && onEggShrug) {
        soundEngine.playSecretUnlock();
        onEggShrug();
      }
    } else if (exhibit.id === 'ex-toldyou' && onEggToldYou) {
      soundEngine.playSecretUnlock();
      onEggToldYou();
    } else if (exhibit.id === 'ex-2v1' && onEgg2v1) {
      soundEngine.playSecretUnlock();
      onEgg2v1();
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 06 // SECTOR: MIC-06</span>
          <span>•</span>
          <span>THE ARCHIVE OF SMALL THINGS</span>
        </div>
        <div className="text-right text-cyan-400">SPECIMEN PRESERVATION VAULT</div>
      </div>

      {/* Main Content */}
      <div className="my-6 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-museum-accent uppercase tracking-wider">
            ARCHIVAL SPECIMEN WALL
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Archive of Small Things
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            Everyday phrases, tactical school incidents, and linguistic mannerisms preserved under museum glass. Click any specimen to inspect curatorial findings.
          </p>
        </div>

        {/* Specimen Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARCHIVE_EXHIBITS.map((exhibit) => {
            const isShrug = exhibit.id === 'ex-shrug';

            return (
              <motion.div
                key={exhibit.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExhibitClick(exhibit)}
                className="p-5 rounded-2xl bg-[#131922] border border-white/10 hover:border-museum-accent/50 hover:bg-[#18212c] cursor-pointer transition-all flex flex-col justify-between shadow-lg group relative overflow-hidden"
              >
                {/* Decorative corner brackets */}
                <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 group-hover:text-museum-accent transition-colors">
                  {exhibit.catalogId}
                </div>

                <div>
                  <div className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest mb-1.5">
                    {exhibit.tag}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-amber-200 transition-colors mb-1">
                    {exhibit.title}
                  </h3>

                  {exhibit.subtitle && (
                    <div className="text-xs font-mono text-museum-accent/80 mb-3">
                      {exhibit.subtitle}
                    </div>
                  )}

                  <p className="text-xs font-mono text-slate-300 line-clamp-3 leading-relaxed">
                    {exhibit.description[0]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-white transition-colors">
                  <span>{isShrug && shrugClickCount > 0 ? `SPAMMED: ${shrugClickCount}x` : 'SPECIMEN'}</span>
                  <span className="text-museum-accent flex items-center space-x-1">
                    <span>INSPECT</span>
                    <Eye className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Curatorial Dry Humor Quote */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white/70 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-museum-accent shrink-0" />
            <span>Research conclusion: 🤷‍♀️ is not merely an emoji; it is an impenetrable philosophical position.</span>
          </div>
          <span className="text-[10px] text-museum-accent hidden sm:inline-block">PRESERVATION GRADE: A+</span>
        </div>
      </div>

      {/* Modal Deep Inspection */}
      <ModalExhibit
        exhibit={selectedExhibit}
        onClose={() => setSelectedExhibit(null)}
      />

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE STORY ARCHIVE (FLOATING VAULT)
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER STORY ARCHIVE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
