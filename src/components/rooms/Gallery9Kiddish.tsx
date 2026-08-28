import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shapes } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery9KiddishProps {
  onNext: () => void;
}

const PLAYFUL_BLOCKS = [
  { id: 'b1', label: 'FOLDED TRIANGLE #42', color: 'bg-amber-400 text-museum-bg', shape: 'rounded-2xl rotate-3' },
  { id: 'b2', label: 'RANDOM CLAY CAT', color: 'bg-emerald-400 text-museum-bg', shape: 'rounded-full -rotate-6' },
  { id: 'b3', label: 'UNSOLICITED LORE DUMP', color: 'bg-cyan-400 text-museum-bg', shape: 'rounded-xl rotate-12' },
  { id: 'b4', label: 'SKIP LECTURE TO WORK', color: 'bg-pink-400 text-museum-bg', shape: 'rounded-3xl -rotate-3' },
  { id: 'b5', label: 'MIDNIGHT GIGGLE ATTACK', color: 'bg-violet-400 text-museum-bg', shape: 'rounded-2xl rotate-6' },
];

export const Gallery9Kiddish: React.FC<Gallery9KiddishProps> = ({ onNext }) => {
  const [tappedBlocks, setTappedBlocks] = useState<string[]>([]);

  const handleBlockTap = (id: string) => {
    soundEngine.playInspect();
    if (!tappedBlocks.includes(id)) {
      setTappedBlocks([...tappedBlocks, id]);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 09 // SECTOR: KID-09</span>
          <span>•</span>
          <span>THE KIDDISH ROOM</span>
        </div>
        <div className="text-right text-pink-400">PLAYFUL CONTRAST PAVILION</div>
      </div>

      {/* Main Content */}
      <div className="my-6 space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-pink-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BEHAVIORAL DUALITY EXHIBIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            "Kiddish in My Weird Ways"
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            A vibrant architectural contrast proving that serious mathematical discipline and playful quirkiness live under the exact same roof.
          </p>
        </div>

        {/* Large Curatorial Quote Plaque */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-900 border-2 border-pink-500/30 shadow-2xl space-y-4">
          <div className="text-[10px] font-mono text-pink-400 uppercase tracking-widest">
            SUBJECT SELF-DESCRIPTION // VERBATIM ARCHIVE
          </div>
          <blockquote className="text-2xl sm:text-4xl font-display font-bold text-white tracking-wide italic">
            "I'm kiddish in my weird ways."
          </blockquote>
          <div className="p-3.5 rounded-xl bg-black/50 border border-pink-500/20 text-xs font-mono text-pink-200/90">
            <span className="font-bold text-pink-400">RESEARCH FINDING:</span> Observers and colleagues have found absolutely zero reason to dispute this statement.
          </div>
        </div>

        {/* Interactive Tactile Playful Blocks */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center space-x-2">
            <Shapes className="w-3.5 h-3.5 text-museum-accent" />
            <span>TACTILE PLAYGROUND (TAP BLOCKS TO INTERACT)</span>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center py-4">
            {PLAYFUL_BLOCKS.map((block) => {
              const isTapped = tappedBlocks.includes(block.id);

              return (
                <motion.button
                  key={block.id}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBlockTap(block.id)}
                  className={`px-5 py-3 font-mono font-bold text-xs shadow-xl transition-all ${block.color} ${block.shape} ${
                    isTapped ? 'ring-4 ring-white shadow-2xl' : 'opacity-90'
                  }`}
                >
                  <span>{block.label}</span>
                  {isTapped && <span className="ml-1.5">✨</span>}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE HIDDEN ROOMS (UNMAPPED DEPTHS)
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER THE HIDDEN ROOMS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
