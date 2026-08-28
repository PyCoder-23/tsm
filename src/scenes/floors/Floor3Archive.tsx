import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHIVE_EXHIBITS } from '../../data/museumData';
import { soundEngine } from '../../audio/soundEngine';
import { Palette, Compass } from 'lucide-react';

interface Floor3Props {
  onElevator: () => void;
  onUnlockEgg?: (id: string) => void;
}

export const Floor3Archive: React.FC<Floor3Props> = ({ onElevator, onUnlockEgg }) => {
  const [selected, setSelected] = useState<(typeof ARCHIVE_EXHIBITS)[0] | null>(null);
  const [shrugCount, setShrugCount] = useState(0);
  const [filterTag, setFilterTag] = useState<string>('ALL');

  const handleExhibitClick = (exhibit: (typeof ARCHIVE_EXHIBITS)[0]) => {
    soundEngine.playInspect();
    setSelected(exhibit);

    if (exhibit.id === 'ex-shrug') {
      const next = shrugCount + 1;
      setShrugCount(next);
      if (next >= 3 && onUnlockEgg) {
        soundEngine.playSecretUnlock();
        onUnlockEgg('egg-shrug-spam');
      }
    } else if (exhibit.id === 'ex-toldyou' && onUnlockEgg) {
      soundEngine.playSecretUnlock();
      onUnlockEgg('egg-told-you');
    } else if (exhibit.id === 'ex-2v1' && onUnlockEgg) {
      soundEngine.playSecretUnlock();
      onUnlockEgg('egg-tactical-2v1');
    }
  };

  const tagColor: Record<string, string> = {
    LINGUISTIC: '#a855f7',
    LOGIC: '#06b6d4',
    PROTOCOL: '#f43f5e',
    PHYSIOLOGY: '#10b981',
    TACTICAL: '#f59e0b',
    VOCABULARY: '#ec4899',
    LORE: '#e2b36f',
    OBSERVATION: '#64dfdf',
  };

  const allTags = ['ALL', ...Array.from(new Set(ARCHIVE_EXHIBITS.map((e) => e.tag || 'LORE')))];

  const filteredExhibits = filterTag === 'ALL'
    ? ARCHIVE_EXHIBITS
    : ARCHIVE_EXHIBITS.filter((e) => e.tag === filterTag);

  return (
    <motion.div
      key="floor3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#0b0814' }}
    >
      {/* ── PHOTOREALISTIC PAINTINGS GALLERY BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/paintings-gallery.jpg"
          alt="The Sonal Museum Paintings & Lore Gallery Hall"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.85) contrast(1.08)',
          }}
        />
        {/* Gallery Lighting Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(8,5,16,0.75) 0%, rgba(8,5,16,0.15) 35%, rgba(8,5,16,0.4) 65%, rgba(8,5,16,0.94) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(6,3,12,0.65) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-purple-300 font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 3 · FLOOR 3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Painting Gallery & Lore Archive
          </h1>
          <p className="text-xs font-mono text-white/60 mt-0.5">
            FRAMED CANVASES · BEHAVIORAL PROTOCOLS · PHILOSOPHICAL STORIES
          </p>
        </div>

        {/* Elevator Button */}
        <button
          onClick={() => {
            soundEngine.playTransition();
            onElevator();
          }}
          className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-purple-400/60 font-mono text-xs text-white/80 hover:text-white tracking-wider uppercase transition-all backdrop-blur-md flex items-center space-x-2 w-fit shadow-xl"
        >
          <span>ELEVATOR ↑</span>
        </button>
      </header>

      {/* ── MAIN ARCHIVE VITRINE / FRAMED PAINTINGS GRID ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-8 space-y-6">
        
        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 font-bold uppercase">
            <Palette className="w-4 h-4" />
            <span>EXHIBIT CATEGORIES</span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-md">
            {allTags.map((tag) => {
              const color = tagColor[tag] || '#a855f7';
              const active = filterTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setFilterTag(tag);
                    soundEngine.playInspect();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all ${
                    active
                      ? 'bg-purple-500/20 text-purple-200 border border-purple-500/50 shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                  style={{ color: active ? color : undefined }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Framed Exhibition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredExhibits.map((exhibit, idx) => {
            const color = tagColor[exhibit.tag || ''] || '#a855f7';
            const isShrug = exhibit.id === 'ex-shrug';

            return (
              <motion.div
                key={exhibit.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => handleExhibitClick(exhibit)}
                className="cursor-pointer rounded-3xl p-5 border transition-all relative overflow-hidden group shadow-2xl flex flex-col justify-between min-h-[220px] backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(25,18,38,0.92) 0%, rgba(14,9,24,0.96) 100%)',
                  borderColor: `${color}35`,
                }}
              >
                {/* Framed Canvas Top Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ background: `linear-gradient(to right, transparent, ${color}80, transparent)` }}
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        background: `${color}15`,
                        color: color,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {exhibit.tag}
                    </span>
                    <span className="text-[10px] font-mono text-white/30 font-semibold">
                      {exhibit.catalogId}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                    {exhibit.title}
                  </h3>

                  {exhibit.subtitle && (
                    <div className="text-[10px] font-mono text-purple-300/70 mb-2 font-semibold">
                      {exhibit.subtitle}
                    </div>
                  )}

                  <p className="text-xs font-mono text-slate-300/70 line-clamp-3 leading-relaxed">
                    {exhibit.description[0]}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono mt-3">
                  <span className="text-white/40">
                    {isShrug && shrugCount > 0 ? (
                      <span className="text-purple-300 font-bold">DISPATCHED: ×{shrugCount}</span>
                    ) : (
                      'FRAMED ARTIFACT'
                    )}
                  </span>
                  <span style={{ color }} className="font-bold group-hover:underline flex items-center space-x-1">
                    <span>INSPECT</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* ── FOOTER: DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        <div>
          <span>LEVEL 3: THE GALLERY OF LORE</span>
          <span className="mx-2">·</span>
          <span className="text-purple-300">8 FRAMED CANVASES ON DISPLAY</span>
        </div>
        <div className="text-white/70 italic">
          "🤷‍♀️ is not merely an emoji. It is an immutable law of physics."
        </div>
      </footer>

      {/* ── DETAIL INSPECTION MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl p-8 border shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #18112a 0%, #0d0818 100%)',
                borderColor: `${tagColor[selected.tag || ''] || '#a855f7'}50`,
                boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px ${tagColor[selected.tag || ''] || '#a855f7'}15`,
              }}
            >
              <div className="pb-4 mb-4 border-b border-white/10">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase font-bold"
                  style={{ color: tagColor[selected.tag || ''] || '#a855f7' }}
                >
                  {selected.catalogId} · {selected.tag}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  {selected.title}
                </h3>
              </div>

              <div className="space-y-2.5 mb-6">
                {selected.description.map((line, i) => (
                  <p
                    key={i}
                    className="text-sm font-mono leading-relaxed text-slate-200"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {selected.meta && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 mb-6">
                  <div className="text-[10px] font-mono text-white/40 tracking-wider uppercase font-semibold">
                    CURATORIAL NOTES & METRICS
                  </div>
                  {selected.meta.map((m, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-mono">
                      <span className="text-white/50">{m.label}:</span>
                      <span className="text-purple-300 font-medium">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all"
                  style={{
                    background: `${tagColor[selected.tag || ''] || '#a855f7'}20`,
                    borderColor: `${tagColor[selected.tag || ''] || '#a855f7'}40`,
                    color: tagColor[selected.tag || ''] || '#a855f7',
                    borderWidth: '1px',
                  }}
                >
                  [ CLOSE ARTIFACT ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
