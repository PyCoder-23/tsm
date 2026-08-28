import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery11CorridorProps {
  onNext: () => void;
}

const CORRIDOR_STEPS = [
  'A façade tells you what a building looks like.',
  'A floor plan tells you how it is organized.',
  'But neither tells you what it feels like to be inside.',
  'Maybe people work the same way.',
];

export const Gallery11Corridor: React.FC<Gallery11CorridorProps> = ({ onNext }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const handleAdvance = () => {
    soundEngine.playInspect();
    if (stepIndex < CORRIDOR_STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      soundEngine.playTransition();
      onNext();
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 11 // SECTOR: COR-11</span>
          <span>•</span>
          <span>THE LONG CORRIDOR</span>
        </div>
        <div className="text-right text-amber-400">SKYBRIDGE THRESHOLD</div>
      </div>

      {/* Panoramic Perspective Corridor View */}
      <div className="my-auto py-12 relative flex flex-col items-center justify-center text-center space-y-8">
        {/* Subtle Sunset Amber / Twilight Window Gradient */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-amber-950/20 via-sky-950/30 to-amber-950/20 border border-white/10 blur-xl pointer-events-none" />

        {/* Minimalist Step Progression Indicators */}
        <div className="flex items-center space-x-2">
          {CORRIDOR_STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                stepIndex === i
                  ? 'w-10 bg-museum-accent'
                  : i < stepIndex
                  ? 'w-4 bg-museum-accent/40'
                  : 'w-4 bg-white/15'
              }`}
            />
          ))}
        </div>

        {/* Poetic Line Display */}
        <div className="min-h-[160px] flex items-center justify-center max-w-2xl px-4">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-wide leading-relaxed text-balance"
          >
            "{CORRIDOR_STEPS[stepIndex]}"
          </motion.p>
        </div>

        {/* Walk / Step Forward Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdvance}
          className="px-8 py-3.5 rounded-xl bg-museum-accent/20 hover:bg-museum-accent/30 border border-museum-accent/50 text-museum-accent font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center space-x-2 shadow-lg"
        >
          <span>{stepIndex < CORRIDOR_STEPS.length - 1 ? 'WALK FURTHER DOWN THE CORRIDOR' : 'ASCEND TO ROOFTOP GARDEN'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono text-white/40">
        <span>APPROACHING FINAL ELEVATION: ROOFTOP LEVEL</span>
        <span>THE ARCHITECTURAL METAPHOR CONVERGES</span>
      </div>
    </div>
  );
};
