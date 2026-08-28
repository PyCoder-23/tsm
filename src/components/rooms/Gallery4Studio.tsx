import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Layers, Sparkles, Compass } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery4StudioProps {
  onNext: () => void;
  onSecretFound?: () => void;
}

const STUDIO_ITEMS = [
  {
    id: 'clay',
    icon: Sparkles,
    code: 'MAT-01',
    title: 'RAW CLAY PROTOTYPE',
    category: 'TACTILE MEDIUM',
    summary: 'Subject appears to enjoy physically shaping three-dimensional objects by hand.',
    curatorNote: 'Observation: High tactile creativity. Materializes concepts into physical space rather than just digital screens.',
    tag: 'HANDCRAFTED',
  },
  {
    id: 'notebook',
    icon: BookOpen,
    code: 'DOC-02',
    title: 'THE BLACK STORY NOTEBOOK',
    category: 'CLASSIFIED ARCHIVE',
    summary: 'Contains ongoing characters, worldbuilding fragments, and narrative lore.',
    curatorNote: 'Contents: Strictly Classified. Author currently refuses to release spoilers to unauthorized visitors.',
    tag: 'LORE VAULT',
  },
  {
    id: 'gmd-sheet',
    icon: Compass,
    code: 'GMD-03',
    title: 'GMD DRAFTING SHEET (CLASS 9 - PRESENT)',
    category: 'GEOMETRICAL DRAWING',
    summary: 'Isometric projections, conic sections, orthographic elevations, and millimeter-grade precision.',
    curatorNote: 'Evidence indicates dedication to geometrical drawing dating back to Class 9.',
    tag: 'PRECISION',
  },
  {
    id: 'unfinished',
    icon: Layers,
    code: 'WIP-04',
    title: 'UNFINISHED PAPER MODEL',
    category: 'EXPERIMENTAL PROTOTYPE',
    summary: 'Folded paper and cardboard structural study sitting on the drafting table.',
    curatorNote: 'Status: Probably not actually unfinished — merely in continuous architectural evolution.',
    tag: 'IN PROGRESS',
  },
];

export const Gallery4Studio: React.FC<Gallery4StudioProps> = ({ onNext, onSecretFound }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    soundEngine.playInspect();
    setActiveItem(activeItem === id ? null : id);
    if (id === 'gmd-sheet' && onSecretFound) {
      soundEngine.playSecretUnlock();
      onSecretFound();
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 04 // SECTOR: STU-04</span>
          <span>•</span>
          <span>THE STUDIO & MATERIALS LAB</span>
        </div>
        <div className="text-right text-cyan-400">CREATIVE WORKBENCH</div>
      </div>

      {/* Main Studio Content */}
      <div className="my-6 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            WORKSHOP RECONSTRUCTION
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Studio: Drafting, Clay & Physical Models
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            Interactive examination of drafting tools, physical papercraft, clay sculptures, and the classified notebook.
          </p>
        </div>

        {/* Studio Drafting Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {STUDIO_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = activeItem === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleItemClick(item.id)}
                className={`p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#182635] border-cyan-400 shadow-xl shadow-cyan-500/10'
                    : 'bg-[#121820]/90 border-white/10 hover:border-cyan-400/40 hover:bg-[#151f2b]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-display font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                    {item.code}
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-300 mb-3 leading-relaxed">
                  {item.summary}
                </p>

                <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-cyan-300/90 italic">
                  "{item.curatorNote}"
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>TAG: {item.tag}</span>
                  <span className="text-cyan-400 underline underline-offset-2">
                    {isSelected ? 'SPECIFICATION ACTIVE' : 'CLICK TO EXAMINE'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Curatorial Observation Plaque */}
        <div className="p-4 rounded-xl bg-black/40 border border-museum-accent/30 flex items-start space-x-3 text-xs font-mono text-amber-200/90">
          <Compass className="w-4 h-4 shrink-0 text-museum-accent mt-0.5" />
          <div>
            <span className="font-bold text-museum-accent">DISCOVERY SUMMARY:</span> When Harleen first met Sonal, he perceived her strictly through her academic seriousness. The studio reveals that underneath that discipline lies someone who writes stories, sculpts clay, folds origami, and designs physical structures.
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE ACADEMIC WING (THE MIDNIGHT LIBRARY)
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER ACADEMIC WING</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
