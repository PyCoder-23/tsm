import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FloorId } from '../types/museum';
import { soundEngine } from '../audio/soundEngine';
import { Compass, ArrowUp, ArrowDown } from 'lucide-react';

interface ElevatorSceneProps {
  currentFloor: FloorId | 'lobby' | 'rooftop';
  onSelectFloor: (floor: FloorId) => void;
  onGoRooftop: () => void;
  onGoLobby: () => void;
}

const FLOOR_DATA: {
  id: FloorId | 'R' | 'G';
  label: string;
  name: string;
  description: string;
  color: string;
}[] = [
  { id: 'R', label: 'R', name: 'The Rooftop Sanctuary', description: 'Night Garden & Celebration', color: '#84cc16' },
  { id: 5, label: '5', name: 'The Cinema', description: 'Airport Incident 24 FPS', color: '#f43f5e' },
  { id: 4, label: '4', name: 'The Hidden Rooms', description: 'Interior Sanctum & Ambitions', color: '#6366f1' },
  { id: 3, label: '3', name: 'The Archive of Curiosities', description: 'Specimen Vault & Lore', color: '#8b5cf6' },
  { id: 2, label: '2', name: 'The Studio', description: '3D Modular Origami Swan', color: '#06b6d4' },
  { id: 1, label: '1', name: 'The Façade', description: 'First Impressions & Sketches', color: '#e2b36f' },
  { id: 'G', label: 'G', name: 'Grand Atrium', description: 'Reception & Entrance', color: '#94a3b8' },
];

type ElevatorPhase = 'idle' | 'closing' | 'riding' | 'opening' | 'arrived';

export const ElevatorScene: React.FC<ElevatorSceneProps> = ({
  currentFloor,
  onSelectFloor,
  onGoRooftop,
  onGoLobby,
}) => {
  const [phase, setPhase] = useState<ElevatorPhase>('idle');
  const [displayFloor, setDisplayFloor] = useState<string>(
    currentFloor === 'lobby' ? 'G' : currentFloor === 'rooftop' ? 'R' : String(currentFloor)
  );
  const [targetFloor, setTargetFloor] = useState<FloorId | 'R' | 'G' | null>(null);
  const [transitDirection, setTransitDirection] = useState<'up' | 'down'>('up');

  const currentFloorLabel = currentFloor === 'lobby' ? 'G' : currentFloor === 'rooftop' ? 'R' : String(currentFloor);

  const handleFloorSelect = (floor: FloorId | 'R' | 'G') => {
    if (phase !== 'idle') return;
    if (String(floor) === currentFloorLabel) return;

    setTargetFloor(floor);
    setPhase('closing');
    soundEngine.playDoorOpen();

    const floorSeq = ['G', '1', '2', '3', '4', '5', 'R'];
    const startIdx = floorSeq.indexOf(currentFloorLabel);
    const endIdx = floorSeq.indexOf(String(floor));
    const dir = endIdx > startIdx ? 'up' : 'down';
    setTransitDirection(dir);

    // After doors close, start ride
    setTimeout(() => {
      setPhase('riding');
      soundEngine.playElevatorRide();

      // Tick through floor sequence
      const stepDelay = 1400 / Math.max(1, Math.abs(endIdx - startIdx));
      let cur = startIdx;
      const stepDir = endIdx > startIdx ? 1 : -1;

      const timer = setInterval(() => {
        cur += stepDir;
        if (cur >= 0 && cur < floorSeq.length) {
          setDisplayFloor(floorSeq[cur]);
        }
        if (cur === endIdx) {
          clearInterval(timer);
        }
      }, stepDelay);
    }, 600);

    // Arrive
    setTimeout(() => {
      setPhase('opening');
      soundEngine.playElevatorBell();
    }, 2400);

    // Callback
    setTimeout(() => {
      setPhase('arrived');
      setTimeout(() => {
        if (floor === 'R') onGoRooftop();
        else if (floor === 'G') onGoLobby();
        else onSelectFloor(floor as FloorId);
      }, 400);
    }, 3100);
  };

  return (
    <motion.div
      key="elevator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#060910' }}
    >
      {/* ── PHOTOREALISTIC ELEVATOR ATRIUM BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/elevator-atrium.jpg"
          alt="The Sonal Museum Central Atrium Elevator View"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-700 ease-out"
          style={{
            filter: phase === 'riding' ? 'blur(2px) brightness(0.7)' : 'brightness(0.9) contrast(1.08)',
          }}
        />
        {/* Atrium Perspective Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(4,7,12,0.7) 0%, rgba(4,7,12,0.1) 30%, rgba(4,7,12,0.3) 70%, rgba(4,7,12,0.9) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(3,5,10,0.65) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP ELEVATOR HUD ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-cyan-300 font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 2 · CENTRAL GLASS ELEVATOR</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Panoramic Atrium Transit
          </h1>
        </div>

        {/* Current Floor Digital Readout Display */}
        <div className="px-5 py-2.5 rounded-2xl bg-black/75 border border-cyan-400/40 backdrop-blur-md flex items-center space-x-3 shadow-xl">
          <div className="text-right font-mono">
            <div className="text-[10px] text-white/50 tracking-wider">CURRENT LEVEL</div>
            <div className="text-xs text-cyan-300 font-bold">
              {phase === 'riding' ? 'IN TRANSIT...' : `FLOOR ${displayFloor}`}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center font-mono font-bold text-xl text-cyan-300 shadow-md shadow-cyan-500/20">
            {displayFloor}
          </div>
        </div>
      </header>

      {/* ── MAIN STAGE: ELEVATOR CABIN & BRUSHED TITANIUM BUTTON PILLAR ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Floor Directory Information Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-black/70 border border-white/15 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-white/50 tracking-wider uppercase">
                TRANSIT SELECTOR
              </span>
              <span className="text-xs font-mono text-cyan-300 font-semibold">
                CHOOSE DESTINATION
              </span>
            </div>

            <div className="space-y-2">
              {FLOOR_DATA.map((floor) => {
                const isCurrent = String(floor.id) === currentFloorLabel;
                const isTarget = String(floor.id) === String(targetFloor);

                return (
                  <div
                    key={String(floor.id)}
                    onClick={() => handleFloorSelect(floor.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-cyan-500/20 border-cyan-400/60 text-white shadow-lg'
                        : isTarget
                        ? 'bg-amber-500/20 border-amber-400/60 text-amber-200 shadow-lg'
                        : 'bg-white/5 border-white/5 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-sm border"
                        style={{
                          background: isCurrent ? `${floor.color}30` : 'rgba(255,255,255,0.06)',
                          borderColor: isCurrent ? floor.color : 'rgba(255,255,255,0.1)',
                          color: isCurrent ? floor.color : '#fff',
                        }}
                      >
                        {floor.label}
                      </div>
                      <div>
                        <div className="text-sm font-display font-bold text-white">
                          {floor.name}
                        </div>
                        <div className="text-xs font-mono text-white/50">
                          {floor.description}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isCurrent ? (
                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                          YOU ARE HERE
                        </span>
                      ) : isTarget ? (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold animate-pulse">
                          TRANSIT TARGET
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-white/40 group-hover:text-white">
                          TRAVEL →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Sleek Brushed Titanium Vertical Elevator Button Pillar */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div
            className="w-full max-w-[280px] p-6 rounded-3xl border-2 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center space-y-3"
            style={{
              background: 'linear-gradient(135deg, rgba(30,40,55,0.95) 0%, rgba(15,20,30,0.98) 100%)',
              borderColor: 'rgba(255,255,255,0.25)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            {/* Brushed Titanium Pillar Header */}
            <div className="text-center pb-2 border-b border-white/10 w-full">
              <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase font-bold">
                ELEVATOR PANEL
              </div>
              <div className="text-xs font-mono text-cyan-300 font-semibold mt-0.5">
                LEVELS
              </div>
            </div>

            {/* Backlit Circular Elevator Buttons */}
            <div className="space-y-2.5 w-full py-2 flex flex-col items-center">
              {FLOOR_DATA.map((f) => {
                const isCurrent = String(f.id) === currentFloorLabel;
                const isTarget = String(f.id) === String(targetFloor);

                return (
                  <motion.button
                    key={String(f.id)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleFloorSelect(f.id)}
                    disabled={phase !== 'idle' || isCurrent}
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-lg transition-all shadow-xl relative border-2 ${
                      isCurrent
                        ? 'bg-amber-500/30 text-amber-300 border-amber-400 shadow-lg shadow-amber-500/30 ring-4 ring-amber-500/20'
                        : isTarget
                        ? 'bg-cyan-500/30 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/30 ring-4 ring-cyan-500/20 animate-pulse'
                        : 'bg-black/60 text-white/70 border-white/20 hover:border-white/60 hover:text-white'
                    }`}
                  >
                    <span>{f.label}</span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 absolute -top-0.5 right-1 animate-ping" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Pillar Bottom Label */}
            <div className="text-center pt-2 border-t border-white/10 w-full text-[9px] font-mono text-white/30">
              MUSEUM OF ARCHITECTURAL DESIGN
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER: DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        <div>
          <span>LOCATION: CENTRAL GLASS ELEVATOR ATRIUM</span>
          <span className="mx-2">·</span>
          <span className="text-cyan-300">PASSENGER ELEVATION IN SERVICE</span>
        </div>
        <div className="text-white/70 italic">
          "Choose your floor. Choose what you want to discover."
        </div>
      </footer>

      {/* ── RIDING IN TRANSIT CINEMATIC OVERLAY ── */}
      <AnimatePresence>
        {phase === 'riding' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none text-center space-y-4"
          >
            <div className="flex items-center space-x-3 text-cyan-300 font-mono text-xl font-bold">
              {transitDirection === 'up' ? (
                <ArrowUp className="w-8 h-8 animate-bounce" />
              ) : (
                <ArrowDown className="w-8 h-8 animate-bounce" />
              )}
              <span>{transitDirection === 'up' ? 'ASCENDING' : 'DESCENDING'} TO LEVEL {displayFloor}...</span>
            </div>

            <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="h-full bg-cyan-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
