import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface LoadingSceneProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  { text: 'ARCHITECTURAL SURVEY', delay: 0, duration: 500 },
  { text: 'Initializing museum structure...', delay: 500, duration: 600 },
  { text: 'Cataloguing exhibits & permanent lore...', delay: 1100, duration: 500 },
  { text: 'Reconstructing floor plans & galleries...', delay: 1600, duration: 600 },
  { text: 'Calibrating central glass elevator...', delay: 2200, duration: 500 },
  { text: 'Loading spatial acoustics & soundscapes...', delay: 2700, duration: 500 },
  { text: 'Survey verified. Museum ready for occupancy.', delay: 3200, duration: 600 },
];

export const LoadingScene: React.FC<LoadingSceneProps> = ({ onComplete }) => {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [surveyReady, setSurveyReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    LOADING_STEPS.forEach((step, i) => {
      setTimeout(() => setVisibleSteps(i + 1), step.delay);
    });

    // Progress bar
    const progressSteps = [0, 15, 32, 50, 68, 85, 96, 100];
    progressSteps.forEach((val, i) => {
      setTimeout(() => setProgress(val), i * 450);
    });

    // When survey finishes at 100%, show the Enter Trigger Button
    setTimeout(() => {
      setSurveyReady(true);
    }, 3800);
  }, []);

  const handleEnterMuseum = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Initialize audio context and start the home soundtrack (Woody Path)
    soundEngine.enableAudio();
    soundEngine.playDoorOpen();

    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="scene-container flex flex-col items-center justify-center bg-[#070a0e] text-white relative overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 blueprint-surface opacity-15 pointer-events-none" />

      {/* Architectural Corner Brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-museum-accent/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-museum-accent/30 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-museum-accent/30 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-museum-accent/30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg px-8 space-y-8 text-center">
        
        {/* Museum Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          {/* Architectural Icon */}
          <div className="mx-auto w-16 h-16 relative">
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
              <rect x="16" y="24" width="32" height="36" stroke="currentColor" strokeWidth="1.5" className="text-museum-accent/60" />
              <rect x="22" y="12" width="20" height="14" stroke="currentColor" strokeWidth="1.5" className="text-museum-accent/60" />
              <rect x="28" y="4" width="8" height="10" stroke="currentColor" strokeWidth="1.5" className="text-museum-accent/60" />
              <rect x="21" y="30" width="6" height="6" fill="currentColor" className="text-museum-accent/30" />
              <rect x="37" y="30" width="6" height="6" fill="currentColor" className="text-museum-accent/30" />
              <rect x="21" y="42" width="6" height="6" fill="currentColor" className="text-museum-accent/20" />
              <rect x="37" y="42" width="6" height="6" fill="currentColor" className="text-museum-accent/20" />
              <rect x="27" y="48" width="10" height="12" stroke="currentColor" strokeWidth="1" className="text-museum-accent/50" />
              <line x1="8" y1="60" x2="56" y2="60" stroke="currentColor" strokeWidth="1.5" className="text-museum-accent/40" />
            </svg>
            <div className="absolute inset-0 animate-building-glow" />
          </div>

          <p className="text-[10px] font-mono tracking-[0.45em] text-museum-accent/70 uppercase font-semibold">
            THE SONAL MUSEUM
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Architectural Survey Protocol
          </h2>
        </motion.div>

        {/* Loading Steps Terminal */}
        <div className="space-y-2 min-h-[180px] text-left p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
          {LOADING_STEPS.map((step, i) => (
            <AnimatePresence key={i}>
              {i < visibleSteps && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-3 font-mono text-xs"
                >
                  <span className="text-museum-accent/70 shrink-0">
                    {i === LOADING_STEPS.length - 1 && visibleSteps === LOADING_STEPS.length
                      ? '▶'
                      : i < visibleSteps - 1
                      ? '✓'
                      : '›'}
                  </span>
                  <span
                    className={
                      i === 0
                        ? 'text-museum-accent font-bold tracking-widest'
                        : i < visibleSteps - 1
                        ? 'text-white/40'
                        : 'text-white/90'
                    }
                  >
                    {step.text}
                    {i === visibleSteps - 1 && i < LOADING_STEPS.length - 1 && (
                      <span className="cursor-blink ml-0.5 text-museum-accent">_</span>
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Progress Bar & Status */}
        <div className="space-y-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-museum-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-white/40">
            <span>SURVEY PROGRESS</span>
            <span className="text-museum-accent font-bold">{progress}%</span>
          </div>
        </div>

        {/* ── ENTER TRIGGER BUTTON (Starts Soundscape & Opens Museum) ── */}
        <AnimatePresence>
          {surveyReady && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-2"
            >
              <button
                onClick={handleEnterMuseum}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-museum-accent via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>ENTER THE SONAL MUSEUM</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[10px] font-mono text-museum-accent/70 mt-2 tracking-wider">
                ♪ Unlocks spatial audio soundscape & commences journey
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
