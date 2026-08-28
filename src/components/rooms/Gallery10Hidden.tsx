import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldAlert, DoorOpen, Compass } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery10HiddenProps {
  onNext: () => void;
  onDoNotEnterSecret?: () => void;
}

export const Gallery10Hidden: React.FC<Gallery10HiddenProps> = ({
  onNext,
  onDoNotEnterSecret,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [secretDoorTapped, setSecretDoorTapped] = useState(false);

  const handleReveal = () => {
    soundEngine.playTransition();
    setIsRevealed(true);
  };

  const handleDoNotEnter = () => {
    soundEngine.playSecretUnlock();
    setSecretDoorTapped(true);
    if (onDoNotEnterSecret) onDoNotEnterSecret();
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 10 // SECTOR: HID-10</span>
          <span>•</span>
          <span>THE HIDDEN ROOMS</span>
        </div>
        <div className="text-right text-amber-400">UNSURVEYED STRUCTURAL DEPTH</div>
      </div>

      {/* Main Content */}
      <div className="my-auto py-8 space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>UNMAPPED ARCHITECTURAL SANCTUM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
            The Hidden Rooms
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-mono">
            Spaces not found on the original survey blueprints. Unseen dedication, resilience, and genuine depth.
          </p>
        </div>

        {/* Secret Sliding Acoustic Wood Wall */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#181a20] to-[#0c0e12] border-2 border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Light slit through concrete */}
          <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-amber-400/30 to-transparent blur-sm pointer-events-none" />

          {!isRevealed ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-museum-accent">
                <DoorOpen className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-xl font-display font-bold text-white">
                  Acoustic Panel Concealment
                </h3>
                <p className="text-xs font-mono text-slate-300">
                  This room was omitted during the initial façade survey. Click below to slide back the wall.
                </p>
              </div>

              <button
                onClick={handleReveal}
                className="px-6 py-3 rounded-xl bg-museum-accent/20 hover:bg-museum-accent/30 border border-museum-accent/40 text-museum-accent font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-2"
              >
                <span>SLIDE ACOUSTIC WALL OPEN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-slate-200"
            >
              <div className="space-y-4 max-w-2xl font-serif text-lg sm:text-xl leading-relaxed italic text-amber-100/90 border-l-2 border-museum-accent pl-5">
                <p>
                  "There are rooms visitors don't see immediately."
                </p>
                <p>
                  "That doesn't mean they aren't there."
                </p>
                <p>
                  "Some parts of a person only appear once you've spent enough time inside the building."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-white/60 space-y-1">
                <div className="text-museum-accent font-semibold">CURATORIAL REFLECTION:</div>
                <p>
                  Beyond the academic focus and the sarcasm is someone thoughtful, loyal, genuinely hardworking, and quietly carrying ambitious dreams.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Easter Egg Door: DO NOT ENTER */}
        <div className="flex justify-end">
          <button
            onClick={handleDoNotEnter}
            className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all flex items-center space-x-1.5"
            title="Restricted Staff Access"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{secretDoorTapped ? '[ LOGGED: YOU WERE WARNED ]' : '[ DOOR 10-B: DO NOT ENTER ]'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE LONG CORRIDOR (THE THRESHOLD)
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>STEP INTO THE CORRIDOR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
