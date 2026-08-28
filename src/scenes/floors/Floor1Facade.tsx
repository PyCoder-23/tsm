import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { Compass, Highlighter, GraduationCap } from 'lucide-react';

interface Floor1Props {
  onElevator: () => void;
  onUnlockEgg?: (id: string) => void;
}

interface Exhibit {
  id: string;
  icon?: React.ReactNode;
  label: string;
  title: string;
  body: string[];
  specs?: { label: string; value: string }[];
  eggId?: string;
  color: string;
}

const EXHIBITS: Exhibit[] = [
  {
    id: 'ex01',
    label: 'EXHIBIT 01 · PEDESTAL 01',
    title: 'THE FIRST IMPRESSION',
    body: [
      'Initial observation: Serious, quiet, academic, and deeply focused.',
      'Always studying or working with mathematical precision.',
      '',
      'Initial hypothesis confidence: 40%.',
      'Conclusion: The hypothesis collapsed completely as soon as her real personality was revealed.',
    ],
    specs: [
      { label: 'Classification', value: 'Studious Demeanor' },
      { label: 'Accuracy', value: '20% (Façade Only)' },
      { label: 'Core Discovery', value: 'Unfathomable Depth' },
    ],
    color: '#e2b36f',
  },
  {
    id: 'survey',
    label: 'EXHIBIT 02 · FRAMED BLUEPRINT',
    title: 'EXTERIOR SURVEY NOTES',
    body: [
      'Preliminary survey document created during initial encounters.',
      'Observed parameters: Academic rigor, structural control, polite reserve.',
      '',
      'Note: Do not judge the interior volume from the exterior elevations.',
    ],
    specs: [
      { label: 'Medium', value: 'Technical Ink on Vellum' },
      { label: 'Survey Date', value: '2026 Archive' },
    ],
    color: '#38bdf8',
  },
  {
    id: 'stationery',
    icon: <Highlighter className="w-4 h-4 text-emerald-400" />,
    label: 'EXHIBIT 03 · ARTIFACT VITRINE',
    title: 'THE SACRED STATIONERY & NOTE CODEX',
    body: [
      'Archived artifact: A terrifyingly organized set of notebooks with color-coded headings, ruled margins, and fine-line highlighter hierarchies.',
      '',
      'Observation: When Sonal unzips her pencil case, it resembles a surgeon preparing for open-heart surgery.',
      'Borrowing Policy: Strictly prohibited without written architectural clearance.',
    ],
    specs: [
      { label: 'Stationery Arsenal', value: '12-Color Dual-Tip Palette' },
      { label: 'Margin Precision', value: 'Exact 0.5mm Alignment' },
      { label: 'Pen Borrowing Risk', value: 'Immediate Surveillance' },
    ],
    color: '#10b981',
  },
  {
    id: 'study-protocol',
    icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
    label: 'EXHIBIT 04 · BEHAVIORAL SPECIMEN',
    title: 'THE MAXIMUM STUDY PROTOCOL',
    body: [
      'Visual aura: Headphones clamped on, posture locked, textbook angled precisely at 45 degrees.',
      'Appears 100% absorbed in higher academic theory to external bystanders.',
      '',
      'Internal mental breakdown:',
      '• 60% Complex architectural concepts & coursework',
      '• 40% Generating unhinged personal lore & comedic observations',
    ],
    specs: [
      { label: 'Visual Aura', value: 'Unstoppable Scholar Forcefield' },
      { label: 'Distraction Tolerance', value: '0.00% (Unless it is Lore)' },
      { label: 'Internal Processing', value: '240 FPS Multithreading' },
    ],
    color: '#f59e0b',
  },
  {
    id: 'hypothesis',
    label: 'EXHIBIT 05 · PEDESTAL 02',
    title: 'STRUCTURAL RE-EVALUATION',
    body: [
      'Revision of initial character models.',
      'Behind the calm studious exterior lies an architect, storyteller, and chaotic lore generator.',
      '',
      'Multiple undocumented wings and hidden chambers detected.',
    ],
    specs: [
      { label: 'Status', value: 'Continuously Expanding' },
      { label: 'Conclusion', value: '10/10 Human' },
    ],
    color: '#a855f7',
  },
  {
    id: 'badge',
    label: 'EXHIBIT 06 · CURATOR CREDENTIAL',
    title: 'STAFF BADGE #0409',
    body: [
      'NAME: Sonal',
      'TITLE: Chief Architect of Ideas & Stories',
      'CLEARANCE: All Levels (G through R)',
      '',
      'Special Perk: Permitted to declare "5-minute shutdown" without legal consequences.',
    ],
    specs: [
      { label: 'Clearance', value: 'Omnipresent Level 10' },
      { label: 'Passcode', value: '0409-SONAL-MUSEUM' },
    ],
    eggId: 'egg-badge',
    color: '#e2b36f',
  },
];

export const Floor1Facade: React.FC<Floor1Props> = ({ onElevator, onUnlockEgg }) => {
  const [selected, setSelected] = useState<Exhibit | null>(null);

  const handleClick = (ex: Exhibit) => {
    soundEngine.playInspect();
    setSelected(ex);
    if (ex.eggId && onUnlockEgg) {
      soundEngine.playSecretUnlock();
      onUnlockEgg(ex.eggId);
    }
  };

  return (
    <motion.div
      key="floor1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#090c12' }}
    >
      {/* ── PHOTOREALISTIC GALLERY HALL BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/gallery-hall.jpg"
          alt="The Sonal Museum Exhibition Gallery Hall"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.85) contrast(1.1)',
          }}
        />
        {/* Gallery Lighting Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(7,10,16,0.75) 0%, rgba(7,10,16,0.15) 35%, rgba(7,10,16,0.4) 65%, rgba(7,10,16,0.94) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,6,10,0.65) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-museum-accent font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 3 · FLOOR 1</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Façade & First Impressions
          </h1>
          <p className="text-xs font-mono text-white/60 mt-0.5">
            CONCRETE MONOGRAPHS · STATIONERY CODEX · STUDY PROTOCOLS · BLUEPRINTS
          </p>
        </div>

        {/* Elevator Button */}
        <button
          onClick={() => {
            soundEngine.playTransition();
            onElevator();
          }}
          className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-museum-accent/60 font-mono text-xs text-white/80 hover:text-white tracking-wider uppercase transition-all backdrop-blur-md flex items-center space-x-2 w-fit shadow-xl"
        >
          <span>ELEVATOR ↑</span>
        </button>
      </header>

      {/* ── MAIN GALLERY EXHIBITS GRID ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXHIBITS.map((exhibit, idx) => (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleClick(exhibit)}
              className="cursor-pointer rounded-3xl p-6 border transition-all relative overflow-hidden group shadow-2xl flex flex-col justify-between min-h-[250px] backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(20,25,35,0.92) 0%, rgba(10,14,20,0.96) 100%)',
                borderColor: `${exhibit.color}35`,
              }}
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: `linear-gradient(to right, transparent, ${exhibit.color}80, transparent)` }}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {exhibit.icon}
                    <span
                      className="text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${exhibit.color}15`,
                        color: exhibit.color,
                        border: `1px solid ${exhibit.color}30`,
                      }}
                    >
                      {exhibit.label.split('·')[0]}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {exhibit.title}
                </h3>

                <p className="text-xs font-mono text-slate-300/70 line-clamp-3 leading-relaxed">
                  {exhibit.body[0]}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-4">
                <span className="text-white/40">PEDESTAL SPECIMEN</span>
                <span style={{ color: exhibit.color }} className="font-bold group-hover:underline flex items-center space-x-1">
                  <span>INSPECT</span>
                  <span>→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ── FOOTER: DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        <div>
          <span>LEVEL 1: THE FAÇADE</span>
          <span className="mx-2">·</span>
          <span className="text-museum-accent">6 ARTIFACTS ON DISPLAY</span>
        </div>
        <div className="text-white/70 italic">
          "Different spaces. Different stories. Different sides of her."
        </div>
      </footer>

      {/* ── EXHIBIT INSPECTION MODAL ── */}
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
                background: 'linear-gradient(135deg, #151c28 0%, #0c1018 100%)',
                borderColor: `${selected.color}50`,
                boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px ${selected.color}15`,
              }}
            >
              <div className="pb-4 mb-4 border-b border-white/10">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase font-bold"
                  style={{ color: selected.color }}
                >
                  {selected.label}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  {selected.title}
                </h3>
              </div>

              <div className="space-y-2.5 mb-6">
                {selected.body.map((line, i) => (
                  <p
                    key={i}
                    className={`text-sm font-mono leading-relaxed ${
                      line === '' ? 'h-2' : 'text-slate-200'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {selected.specs && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 mb-6">
                  <div className="text-[10px] font-mono text-white/40 tracking-wider uppercase font-semibold">
                    CURATORIAL METRICS & SPECIFICATIONS
                  </div>
                  {selected.specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-mono">
                      <span className="text-white/50">{s.label}:</span>
                      <span className="text-amber-200 font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all"
                  style={{
                    background: `${selected.color}20`,
                    borderColor: `${selected.color}40`,
                    color: selected.color,
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
