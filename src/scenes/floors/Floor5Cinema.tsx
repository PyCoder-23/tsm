import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIRPORT_INCIDENT_TIMELINE } from '../../data/museumData';
import { soundEngine } from '../../audio/soundEngine';
import { Play, Pause, ChevronLeft, ChevronRight, Award, Clapperboard, Compass } from 'lucide-react';

interface Floor5Props {
  onElevator: () => void;
}

const METRICS = [
  { label: 'POPULATION ODDS', value: '1 in 21,000,000', color: '#38bdf8' },
  { label: 'PHONE NUMBERS ACQUIRED', value: '0.00 / 2.00', color: '#f59e0b' },
  { label: 'BUTTERFLIES DETECTED', value: '100% 🥹', color: '#10b981' },
  { label: 'REGRET MULTIPLIER', value: '200% (DOUBLE REGRET)', color: '#f43f5e' },
  { label: 'DELULU STATUS', value: 'OFFICIALLY ETERNAL', color: '#a855f7' },
];

export const Floor5Cinema: React.FC<Floor5Props> = ({ onElevator }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % AIRPORT_INCIDENT_TIMELINE.length);
      soundEngine.playInspect();
    }, 4200);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleStep = (idx: number) => {
    soundEngine.playInspect();
    setActiveStep(idx);
  };

  const step = AIRPORT_INCIDENT_TIMELINE[activeStep];

  return (
    <motion.div
      key="floor5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#090407' }}
    >
      {/* ── PHOTOREALISTIC CINEMA THEATER BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cinema-theater.jpg"
          alt="The Sonal Museum Boutique Cinema Screening Room"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.82) contrast(1.1)',
          }}
        />
        {/* Cinema Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(8,3,6,0.75) 0%, rgba(8,3,6,0.15) 35%, rgba(8,3,6,0.4) 65%, rgba(8,3,6,0.94) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,2,4,0.65) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-rose-400 font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 3 · FLOOR 5</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Cinema: The Airport Incident (24 FPS)
          </h1>
          <p className="text-xs font-mono text-white/60 mt-0.5">
            DOCUMENTARY RECONSTRUCTION · 1080P WIDESCREEN PROJECTION · ODISHA TO MUMBAI
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Autoplay Controller */}
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              soundEngine.playInspect();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 border shadow-lg backdrop-blur-md ${
              isPlaying
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10'
                : 'bg-black/60 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE FILM' : 'AUTO-PLAY REEL'}</span>
          </button>

          {/* Elevator Button */}
          <button
            onClick={() => {
              soundEngine.playTransition();
              onElevator();
            }}
            className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-rose-400/60 font-mono text-xs text-white/80 hover:text-white tracking-wider uppercase transition-all backdrop-blur-md flex items-center space-x-2 w-fit shadow-xl"
          >
            <span>ELEVATOR ↑</span>
          </button>
        </div>
      </header>

      {/* ── MAIN SCREENING HALL & JURY SCORECARD ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Cinema Projection Screen */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div
              className="relative rounded-3xl overflow-hidden border-2 shadow-2xl flex flex-col justify-between min-h-[400px] backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(20,8,15,0.92) 0%, rgba(10,3,7,0.96) 100%)',
                borderColor: 'rgba(244,63,94,0.4)',
                boxShadow: '0 0 50px rgba(244,63,94,0.15), inset 0 0 40px rgba(0,0,0,0.8)',
              }}
            >
              {/* Header Ribbon */}
              <div className="px-6 py-4 border-b border-rose-500/20 flex items-center justify-between bg-black/40 backdrop-blur-md">
                <div className="flex items-center space-x-2 text-xs font-mono text-rose-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-bold tracking-wider">PROJECTOR ACTIVE · 1080P PROJECTION</span>
                </div>
                <span className="text-[10px] font-mono text-white/40">
                  REEL SCENE {step.step} OF {AIRPORT_INCIDENT_TIMELINE.length}
                </span>
              </div>

              {/* Projected Scene Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="px-8 py-8 flex flex-col justify-center my-auto"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      SCENE {step.step}
                    </span>
                    <span className="text-xs font-mono text-white/50 font-medium">
                      {step.location}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-rose-300/80 border border-white/10 font-semibold">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-base sm:text-lg font-mono text-slate-200 leading-relaxed max-w-2xl">
                    {step.detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress & Chapter Switcher */}
              <div className="px-6 py-4 border-t border-rose-500/15 bg-black/50 backdrop-blur-md flex items-center justify-between">
                <button
                  onClick={() => handleStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="p-2 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white transition-all flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV</span>
                </button>

                <div className="flex items-center space-x-2">
                  {AIRPORT_INCIDENT_TIMELINE.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleStep(i)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeStep === i
                          ? 'w-8 bg-rose-500 shadow-md shadow-rose-500/50'
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    handleStep(Math.min(AIRPORT_INCIDENT_TIMELINE.length - 1, activeStep + 1))
                  }
                  disabled={activeStep === AIRPORT_INCIDENT_TIMELINE.length - 1}
                  className="p-2 rounded-xl text-xs font-mono font-bold bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 disabled:opacity-20 border border-rose-500/30 transition-all flex items-center space-x-1"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Curatorial Jury Scorecard */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div
              className="p-6 rounded-3xl border shadow-xl backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(25,10,18,0.92) 0%, rgba(14,4,10,0.96) 100%)',
                borderColor: 'rgba(244,63,94,0.3)',
              }}
            >
              <div className="flex items-center space-x-2 text-xs font-mono text-rose-400 font-bold uppercase tracking-wider mb-4 pb-2 border-b border-rose-500/20">
                <Award className="w-4 h-4" />
                <span>OFFICIAL CURATORIAL JURY</span>
              </div>

              <div className="space-y-2.5 mb-4">
                {METRICS.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between"
                  >
                    <span className="text-[11px] font-mono text-white/50">{m.label}:</span>
                    <span className="text-xs font-mono font-bold" style={{ color: m.color }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <p className="text-xs font-mono text-rose-200/90 leading-relaxed italic">
                  "Curatorial Jury Final Verdict: Three miraculous encounters, one heroic luggage rescue, zero digits acquired. Certified Hall-of-Fame cinematic delulu."
                </p>
              </div>
            </div>

            {/* Scene Directory */}
            <div className="p-5 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-white/40 uppercase tracking-wider mb-3">
                <Clapperboard className="w-3.5 h-3.5" />
                <span>SCENE DIRECTORY</span>
              </div>

              <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                {AIRPORT_INCIDENT_TIMELINE.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStep(idx)}
                    className={`w-full text-left p-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                      activeStep === idx
                        ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate mr-2">{t.step}. {t.title}</span>
                    <span className="text-[10px] opacity-60">{t.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER: DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        <div>
          <span>LEVEL 5: THE CINEMA HALL</span>
          <span className="mx-2">·</span>
          <span className="text-rose-400">7 DOCUMENTARY CHAPTERS · ODISHA TO MUMBAI</span>
        </div>
        <div className="text-white/70 italic">
          "The Airport Incident: 24 frames per second of pure personal lore."
        </div>
      </footer>
    </motion.div>
  );
};
