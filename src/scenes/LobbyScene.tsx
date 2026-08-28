import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, Compass, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';

interface LobbySceneProps {
  onEnterElevator: () => void;
}

const GUIDE_LINES = [
  { text: 'Welcome to The Sonal Museum.', delay: 500 },
  { text: 'You are standing inside the Grand Entrance Lobby.', delay: 2000 },
  { text: 'This building is an interactive architectural tribute to a singular person.', delay: 4200 },
  { text: 'Ahead lies the Central Glass Atrium and Elevator Core. Board when ready.', delay: 6500 },
];

const DIRECTORY = [
  { floor: 'R', name: 'Rooftop Sanctuary', note: 'Night Garden & Celebration' },
  { floor: '5', name: 'The Cinema', note: 'Airport Incident 24 FPS' },
  { floor: '4', name: 'The Hidden Rooms', note: 'Interior Sanctum & Ambitions' },
  { floor: '3', name: 'The Archive', note: 'Specimen Vault & Lore' },
  { floor: '2', name: 'The Studio', note: '3D Modular Origami Swan' },
  { floor: '1', name: 'The Façade', note: 'First Impressions & Sketches' },
  { floor: 'G', name: 'Grand Atrium', note: 'Reception & Directory' },
];

export const LobbyScene: React.FC<LobbySceneProps> = ({ onEnterElevator }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    GUIDE_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
  }, []);

  const handleBoardElevator = () => {
    if (isTransitioning) return;
    soundEngine.playDoorOpen();
    setIsTransitioning(true);
    setTimeout(() => {
      onEnterElevator();
    }, 700);
  };

  return (
    <motion.div
      key="lobby"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#080c14' }}
    >
      {/* ── PHOTOREALISTIC ENTRANCE LOBBY BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/entrance-lobby.jpg"
          alt="The Sonal Museum Grand Entrance Lobby"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.85) contrast(1.08)',
          }}
        />
        {/* Soft Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(6,10,18,0.7) 0%, rgba(6,10,18,0.15) 35%, rgba(6,10,18,0.4) 65%, rgba(6,10,18,0.92) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,8,14,0.6) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP ATRIUM HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-museum-accent font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 1 · THE ENTRANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Grand Entrance & Reception Atrium
          </h1>
          <p className="text-xs font-mono text-white/60 mt-0.5">
            ELEVATION ±0.00m · CONCRETE & ILLUMINATED GLASS
          </p>
        </div>

        {/* Board Elevator Primary Action */}
        <button
          onClick={handleBoardElevator}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-museum-accent to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 flex items-center space-x-2 w-fit"
        >
          <span>BOARD ELEVATOR</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </header>

      {/* ── CENTRAL STAGE: DIRECTORY & HOLOGRAPHIC CURATOR ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Building Directory Board */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-black/65 border border-white/15 backdrop-blur-md shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2 text-xs font-mono text-museum-accent font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>BUILDING DIRECTORY</span>
            </div>
            <span className="text-[10px] font-mono text-white/40">7 LEVELS</span>
          </div>

          <div className="space-y-1.5">
            {DIRECTORY.map((d, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
                  d.floor === 'G'
                    ? 'bg-museum-accent/20 border-museum-accent/50 text-museum-accent font-bold shadow-sm'
                    : 'bg-white/5 border-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">
                    {d.floor}
                  </span>
                  <span className="font-medium">{d.name}</span>
                </div>
                <span className="text-[10px] opacity-50">{d.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Curatorial Transmission Briefing */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Hologram Avatar */}
          <div className="relative mb-5 flex flex-col items-center">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl border-2 border-cyan-400/50 bg-cyan-950/40 backdrop-blur-md flex items-center justify-center shadow-xl shadow-cyan-500/20">
                <Sparkles className="w-7 h-7 text-cyan-300 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/15 blur-xl pointer-events-none" />
            </motion.div>
            <div className="mt-2 text-[10px] font-mono text-cyan-300/80 tracking-widest uppercase font-semibold">
              AI CURATORIAL SYSTEM · TRANSMITTING
            </div>
          </div>

          {/* Dialogue Box */}
          <div className="w-full max-w-lg p-6 rounded-3xl bg-black/75 border border-cyan-500/30 shadow-2xl backdrop-blur-md text-left space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase">
                CURATORIAL BRIEFING
              </span>
            </div>

            <div className="space-y-2.5 min-h-[90px]">
              {GUIDE_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {i < visibleLines && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-sm font-mono text-slate-200 leading-relaxed"
                    >
                      {line.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-white/50">
                Central glass elevator shaft ready
              </span>
              <button
                onClick={handleBoardElevator}
                className="text-xs font-mono text-museum-accent hover:underline font-bold flex items-center space-x-1"
              >
                <span>ENTER ELEVATOR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER: DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        <div>
          <span>LOCATION: GRAND ENTRANCE ATRIUM</span>
          <span className="mx-2">·</span>
          <span className="text-museum-accent">CLEARANCE GRANTED</span>
        </div>
        <div className="text-white/70 italic">
          "Step inside. A new world begins."
        </div>
      </footer>

      {/* ── TRANSITION OVERLAY ── */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none"
          >
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full border-2 border-museum-accent border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-mono text-museum-accent tracking-widest uppercase">
                CALLING ELEVATOR CABIN...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
