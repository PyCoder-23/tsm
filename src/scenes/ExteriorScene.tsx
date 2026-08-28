import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { ArrowRight, Compass, Sparkles, Info } from 'lucide-react';

interface ExteriorSceneProps {
  onEnter: () => void;
}

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  subtitle: string;
  tag: string;
  align: 'left' | 'right';
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'rooftop',
    x: 28,
    y: 12,
    title: 'ROOFTOP GARDEN',
    subtitle: 'The end of the journey. The best view.',
    tag: 'LEVEL R',
    align: 'left',
  },
  {
    id: 'floors',
    x: 22,
    y: 32,
    title: 'ARCHITECTURAL FLOORS',
    subtitle: 'Each floor holds a different part of the story.',
    tag: 'LEVELS 1-5',
    align: 'left',
  },
  {
    id: 'atrium',
    x: 25,
    y: 50,
    title: 'CENTRAL ATRIUM',
    subtitle: 'The heart of the museum. Everything connects here.',
    tag: 'ELEVATOR CORE',
    align: 'left',
  },
  {
    id: 'living',
    x: 78,
    y: 18,
    title: 'LIVING ARCHITECTURE',
    subtitle: 'A mix of concrete, glass, nature and light. Just like her.',
    tag: 'STRUCTURE',
    align: 'right',
  },
  {
    id: 'hidden-s',
    x: 76,
    y: 36,
    title: "HIDDEN 'S'",
    subtitle: "Look closely. The whole building was always an 'S'.",
    tag: 'SYMBOLISM',
    align: 'right',
  },
  {
    id: 'entrance',
    x: 74,
    y: 54,
    title: 'THE ENTRANCE',
    subtitle: 'Every journey starts somewhere.',
    tag: 'GROUND LEVEL',
    align: 'right',
  },
];

export const ExteriorScene: React.FC<ExteriorSceneProps> = ({ onEnter }) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const handleEnterMuseum = () => {
    if (isEntering) return;
    soundEngine.playDoorOpen();
    setIsEntering(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <motion.div
      key="exterior"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#070a0e' }}
    >
      {/* ── BACKGROUND PHOTOREALISTIC HERO RENDER ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-building.jpg"
          alt="The Sonal Museum Hero Building"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
          style={{
            filter: isEntering ? 'brightness(1.4) scale(1.08)' : 'brightness(0.92) contrast(1.05)',
          }}
        />
        {/* Cinematic Vignette & Gradient Overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(5,8,14,0.75) 0%, rgba(5,8,14,0.1) 30%, rgba(5,8,14,0.3) 70%, rgba(5,8,14,0.92) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,6,10,0.65) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP ARCHITECTURAL HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-museum-accent font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL MONOGRAPH · 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">
            THE <span className="text-museum-accent">SONAL</span> MUSEUM
          </h1>
          <p className="text-sm font-sans text-white/70 tracking-wide mt-1">
            A building. A story. A person.
          </p>
        </motion.div>

        {/* Action button & Blueprint Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center space-x-3"
        >
          <button
            onClick={() => {
              setShowAnnotations(!showAnnotations);
              soundEngine.playInspect();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all backdrop-blur-md border flex items-center space-x-2 ${
              showAnnotations
                ? 'bg-museum-accent/20 border-museum-accent/40 text-museum-accent shadow-lg shadow-museum-accent/10'
                : 'bg-black/50 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showAnnotations ? 'ANNOTATIONS ON' : 'ANNOTATIONS OFF'}</span>
          </button>

          <button
            onClick={handleEnterMuseum}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-museum-accent to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 flex items-center space-x-2"
          >
            <span>ENTER MUSEUM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </header>

      {/* ── INTERACTIVE BLUEPRINT ANNOTATIONS PIN OVERLAY ── */}
      <div className="relative z-10 w-full h-[480px] sm:h-[540px] pointer-events-none">
        <AnimatePresence>
          {showAnnotations &&
            HOTSPOTS.map((spot, idx) => {
              const isLeft = spot.align === 'left';
              const isActive = activeHotspot === spot.id;

              return (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.08 }}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                  }}
                  onMouseEnter={() => {
                    setActiveHotspot(spot.id);
                    soundEngine.playInspect();
                  }}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  {/* Pin Target Marker */}
                  <div className="relative flex items-center">
                    {/* Pulsing ring */}
                    <div className="w-4 h-4 rounded-full bg-museum-accent/30 animate-ping absolute -left-1" />
                    
                    {/* Center glowing dot */}
                    <div
                      className={`w-3 h-3 rounded-full border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-museum-accent border-white scale-125 shadow-lg shadow-museum-accent'
                          : 'bg-white/80 border-museum-accent'
                      }`}
                    />

                    {/* Architectural Hairline Connector */}
                    <div
                      className={`h-[1px] bg-gradient-to-r transition-all duration-300 ${
                        isLeft
                          ? 'w-8 sm:w-16 -order-1 bg-gradient-to-l from-white/80 to-white/20'
                          : 'w-8 sm:w-16 bg-gradient-to-r from-white/80 to-white/20'
                      }`}
                    />

                    {/* Annotation Label Card */}
                    <div
                      className={`px-3 py-2 rounded-xl backdrop-blur-md border transition-all duration-300 max-w-[200px] sm:max-w-[260px] ${
                        isActive
                          ? 'bg-black/85 border-museum-accent/60 shadow-2xl scale-105'
                          : 'bg-black/55 border-white/15'
                      } ${isLeft ? '-order-2 text-right mr-2' : 'ml-2 text-left'}`}
                    >
                      <div className="flex items-center space-x-1.5 justify-start text-[9px] font-mono font-bold tracking-widest text-museum-accent uppercase">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{spot.tag}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-display font-bold text-white leading-tight mt-0.5">
                        {spot.title}
                      </div>
                      <p className="text-[10px] sm:text-xs font-sans text-white/75 mt-0.5 leading-snug">
                        {spot.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      {/* ── BOTTOM ARCHITECTURAL PIPELINE & DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 space-y-6">
        
        {/* 4-Stage Architectural Journey Pipeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Stage 1 */}
          <div
            onClick={handleEnterMuseum}
            className="cursor-pointer p-4 rounded-2xl bg-black/65 border border-white/10 hover:border-museum-accent/50 backdrop-blur-md transition-all hover:scale-[1.02] group shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono text-museum-accent font-bold uppercase mb-1">
              <span>1. THE ENTRANCE</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs font-sans text-white/70">
              Step inside. A new world begins.
            </p>
          </div>

          {/* Stage 2 */}
          <div
            onClick={handleEnterMuseum}
            className="cursor-pointer p-4 rounded-2xl bg-black/65 border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all hover:scale-[1.02] group shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold uppercase mb-1">
              <span>2. THE ELEVATOR</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs font-sans text-white/70">
              Choose your floor. Choose what you want to discover.
            </p>
          </div>

          {/* Stage 3 */}
          <div
            onClick={handleEnterMuseum}
            className="cursor-pointer p-4 rounded-2xl bg-black/65 border border-white/10 hover:border-purple-400/50 backdrop-blur-md transition-all hover:scale-[1.02] group shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono text-purple-300 font-bold uppercase mb-1">
              <span>3. THE FLOORS</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs font-sans text-white/70">
              Different spaces. Different stories. Different sides of her.
            </p>
          </div>

          {/* Stage 4 */}
          <div
            onClick={handleEnterMuseum}
            className="cursor-pointer p-4 rounded-2xl bg-black/65 border border-white/10 hover:border-rose-400/50 backdrop-blur-md transition-all hover:scale-[1.02] group shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono text-rose-300 font-bold uppercase mb-1">
              <span>4. THE ROOFTOP</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs font-sans text-white/70">
              The final stop. The view. The message. The celebration.
            </p>
          </div>
        </div>

        {/* Design Language Material Bar & Monograph Quote */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
          <div>
            <span className="text-white/40 uppercase tracking-wider block mb-1">DESIGN LANGUAGE:</span>
            <div className="flex flex-wrap items-center gap-3 text-white/80">
              <span>Concrete</span>
              <span className="text-white/20">·</span>
              <span>Glass</span>
              <span className="text-white/20">·</span>
              <span>Greenery</span>
              <span className="text-white/20">·</span>
              <span>Light</span>
              <span className="text-white/20">·</span>
              <span className="text-museum-accent">Strong yet warm. Futuristic yet human.</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-sans italic text-white/90">
              "Not just a museum. It's a reflection of everything that makes you, you."
            </p>
          </div>
        </div>
      </footer>

      {/* ── DOOR OPENING CINEMATIC FLASH TRANSITION ── */}
      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full border-2 border-museum-accent border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-mono text-museum-accent tracking-widest uppercase">
                ENTERING ATRIUM...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
