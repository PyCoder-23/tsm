import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { Lock, Eye, Sparkles, BatteryLow, Compass, Moon, Zap, MessageSquareQuote } from 'lucide-react';

interface Floor4Props {
  onElevator: () => void;
  onUnlockEgg?: (id: string) => void;
}

interface Chamber {
  id: string;
  doorNumber: string;
  title: string;
  status: 'unlocked' | 'ajar' | 'sealed';
  icon: React.ReactNode;
  lore: string[];
  color: string;
  quote?: string;
}

const CHAMBERS: Chamber[] = [
  {
    id: 'ch-ambitions',
    doorNumber: 'PORTAL 4.01',
    title: 'THE ARCHITECT’S VISION',
    status: 'unlocked',
    icon: <Compass className="w-5 h-5 text-indigo-400" />,
    lore: [
      'Wants to be an architect. Is already perceiving the world through structural axes and light.',
      'Sees blueprints in casual spaces and geometries in everyday life.',
      '',
      'The distance between this floor and the sky is shrinking with every design.',
    ],
    quote: '"Structure precedes beauty."',
    color: '#6366f1',
  },
  {
    id: 'ch-writing',
    doorNumber: 'PORTAL 4.02',
    title: 'THE LORE ARCHIVE',
    status: 'unlocked',
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    lore: [
      'The quiet gift of turning random, mundane occurrences into vivid mythologies.',
      'She writes details down. She observes what crowds glance over.',
      '',
      'A personal universe documented one memory at a time.',
    ],
    quote: '"Everything is lore if you pay close enough attention."',
    color: '#e2b36f',
  },
  {
    id: 'ch-tiredness',
    doorNumber: 'PORTAL 4.03',
    title: 'THE 5-MINUTE SHUTDOWN',
    status: 'unlocked',
    icon: <BatteryLow className="w-5 h-5 text-rose-400" />,
    lore: [
      '"I will shut down in 5 minutes."',
      'She utters this statement with absolute conviction every single night.',
      '',
      'Reality: Runs on a mysterious backup generator that defies thermodynamic laws.',
    ],
    quote: '"Current battery: 2%. Expected uptime: 4 more hours."',
    color: '#f43f5e',
  },
  {
    id: 'ch-sarcasm',
    doorNumber: 'PORTAL 4.04',
    title: 'THE DEADPAN WIT SANCTUARY',
    status: 'unlocked',
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    lore: [
      'A chamber dedicated to her razor-sharp, quiet deadpan remarks delivered with zero facial expression.',
      'She will listen to a 10-minute chaotic story and summarize it with a single devastating one-liner that leaves everyone speechless.',
      '',
      'Warning: High probability of getting roasted with mathematical precision.',
    ],
    quote: '"I am not rolling my eyes. My brain is just searching for a better answer."',
    color: '#eab308',
  },
  {
    id: 'ch-daily-chaos',
    doorNumber: 'PORTAL 4.05',
    title: 'THE CASUAL DISASTER CHRONICLES',
    status: 'unlocked',
    icon: <MessageSquareQuote className="w-5 h-5 text-orange-400" />,
    lore: [
      'Documenting Sonal’s uncanny ability to turn minor everyday inconveniences into full-blown comedic epics.',
      'From absurd transit rides to random social encounters, everything gets narrated with theatrical dramatic irony.',
      '',
      'Status: Certified top-tier personal commentary track.',
    ],
    quote: '"It was supposed to be a normal day. Then reality occurred."',
    color: '#f97316',
  },
  {
    id: 'ch-curiosity',
    doorNumber: 'PORTAL 4.06',
    title: 'MIDNIGHT INVESTIGATIONS',
    status: 'unlocked',
    icon: <Eye className="w-5 h-5 text-cyan-400" />,
    lore: [
      'Investigates the strange light left on in the school at midnight.',
      'Theorizes detailed backstories for strangers on international flights.',
      '',
      'Unstoppable curiosity that makes life infinitely more interesting.',
    ],
    quote: '"Why is that light on? We must find out."',
    color: '#06b6d4',
  },
  {
    id: 'ch-unknown',
    doorNumber: 'PORTAL 4.07',
    title: 'THE UNMAPPED CHAMBER',
    status: 'ajar',
    icon: <Moon className="w-5 h-5 text-purple-400" />,
    lore: [
      'An unexplored quadrant discovered during the 2026 architectural survey.',
      'Still under active discovery as new chapters unfold.',
      '',
      'Status: Continually expanding.',
    ],
    quote: '"Some rooms are built as you grow."',
    color: '#a855f7',
  },
  {
    id: 'ch-locked',
    doorNumber: 'PORTAL 4.08',
    title: 'CLASSIFIED SANCTUM',
    status: 'sealed',
    icon: <Lock className="w-5 h-5 text-slate-400" />,
    lore: [
      'Secured with biometric and keycard clearance.',
      'Some inner thoughts and sacred dreams require time to open.',
      '',
      'Clearance level: Future Years.',
    ],
    quote: '"Clearance restricted. Time unlocks all doors."',
    color: '#64748b',
  },
];

export const Floor4Hidden: React.FC<Floor4Props> = ({ onElevator, onUnlockEgg: _ }) => {
  const [selected, setSelected] = useState<Chamber | null>(null);

  const handleDoorClick = (chamber: Chamber) => {
    soundEngine.playDoorOpen();
    setSelected(chamber);
  };

  return (
    <motion.div
      key="floor4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#090d16' }}
    >
      {/* ── PHOTOREALISTIC HIDDEN CORRIDOR BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hidden-corridor.jpg"
          alt="The Sonal Museum Hidden Chambers Corridor"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.82) contrast(1.1)',
          }}
        />
        {/* Hallway Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(6,9,16,0.75) 0%, rgba(6,9,16,0.15) 35%, rgba(6,9,16,0.4) 65%, rgba(6,9,16,0.94) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,7,12,0.65) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-indigo-300 font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 3 · FLOOR 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Hidden Chambers & Interior Sanctum
          </h1>
          <p className="text-xs font-mono text-white/60 mt-0.5">
            RECESSED PORTALS · DEADPAN WIT · SITUATIONAL CHRONICLES · AMBITIONS
          </p>
        </div>

        {/* Elevator Button */}
        <button
          onClick={() => {
            soundEngine.playTransition();
            onElevator();
          }}
          className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-indigo-400/60 font-mono text-xs text-white/80 hover:text-white tracking-wider uppercase transition-all backdrop-blur-md flex items-center space-x-2 w-fit shadow-xl"
        >
          <span>ELEVATOR ↑</span>
        </button>
      </header>

      {/* ── MAIN CORRIDOR DOORS GRID ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHAMBERS.map((chamber, idx) => {
            const isSealed = chamber.status === 'sealed';
            const isAjar = chamber.status === 'ajar';

            return (
              <motion.div
                key={chamber.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{ y: isSealed ? 0 : -6, scale: isSealed ? 1 : 1.02 }}
                onClick={() => handleDoorClick(chamber)}
                className={`cursor-pointer rounded-3xl p-6 border transition-all relative overflow-hidden group shadow-2xl flex flex-col justify-between min-h-[250px] backdrop-blur-md ${
                  isSealed ? 'opacity-60' : ''
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(18,24,38,0.92) 0%, rgba(10,14,24,0.96) 100%)',
                  borderColor: `${chamber.color}35`,
                }}
              >
                {/* Portal Frame Highlight */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ background: `linear-gradient(to right, transparent, ${chamber.color}80, transparent)` }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-2xl border"
                      style={{
                        background: `${chamber.color}15`,
                        borderColor: `${chamber.color}30`,
                      }}
                    >
                      {chamber.icon}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono tracking-wider font-bold text-white/40 block">
                        {chamber.doorNumber}
                      </span>
                      <span
                        className="text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full inline-block font-bold"
                        style={{
                          background: `${chamber.color}15`,
                          color: chamber.color,
                        }}
                      >
                        {chamber.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {chamber.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-300/70 line-clamp-3 leading-relaxed">
                    {chamber.lore[0]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-4">
                  <span className="text-white/40 italic">
                    {isAjar ? 'Slightly Ajar' : isSealed ? 'Restricted' : 'Chamber Portal'}
                  </span>
                  <span
                    style={{ color: chamber.color }}
                    className="font-bold group-hover:underline flex items-center space-x-1"
                  >
                    <span>{isSealed ? 'VIEW LOG' : 'ENTER CHAMBER'}</span>
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
          <span>LEVEL 4: THE HIDDEN CHAMBERS</span>
          <span className="mx-2">·</span>
          <span className="text-indigo-300">8 INTERNAL PORTALS CATALOGUED</span>
        </div>
        <div className="text-white/70 italic">
          "A person is not a single façade. A person is an entire complex of rooms."
        </div>
      </footer>

      {/* ── CHAMBER DETAIL INSPECTION MODAL ── */}
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
                background: 'linear-gradient(135deg, #12182c 0%, #0a0e1a 100%)',
                borderColor: `${selected.color}50`,
                boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px ${selected.color}15`,
              }}
            >
              <div className="pb-4 mb-4 border-b border-white/10">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase font-bold"
                  style={{ color: selected.color }}
                >
                  {selected.doorNumber} · {selected.status.toUpperCase()}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  {selected.title}
                </h3>
              </div>

              <div className="space-y-2.5 mb-6">
                {selected.lore.map((line, i) => (
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

              {selected.quote && (
                <div
                  className="p-4 rounded-2xl border mb-6"
                  style={{
                    background: `${selected.color}10`,
                    borderColor: `${selected.color}25`,
                  }}
                >
                  <p
                    className="text-xs font-mono italic text-center"
                    style={{ color: selected.color }}
                  >
                    {selected.quote}
                  </p>
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
                  [ CLOSE CHAMBER ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
