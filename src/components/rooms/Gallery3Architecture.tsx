import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Compass } from 'lucide-react';
import { OrigamiSwan3D } from '../3d/OrigamiSwan3D';
import { MuseumPlaque } from '../common/MuseumPlaque';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery3ArchitectureProps {
  onNext: () => void;
  onSwanInteract?: () => void;
}

const SYMBOLIC_MODELS = [
  {
    title: 'THE BRUTALIST MONOLITH',
    type: 'Mass & Gravity',
    description: 'A study in uncompromising geometric weight. Represents academic discipline and unwavering focus.',
    scale: '1:200',
    color: 'from-slate-700 to-slate-900',
  },
  {
    title: 'THE GLASS PAVILION',
    type: 'Light & Transparency',
    description: 'A structure designed around sightlines and reflections. You can see through it, but only if light hits at the right angle.',
    scale: '1:150',
    color: 'from-cyan-900/60 to-slate-900',
  },
  {
    title: 'THE PARAMETRIC CURVE',
    type: 'Fluid Geometry',
    description: 'Continuous non-linear surfaces that resist simple categorization. Evolving and organic.',
    scale: '1:100',
    color: 'from-amber-900/50 to-slate-900',
  },
  {
    title: 'THE UNFINISHED SCAFFOLD',
    type: 'In-Progress Works',
    description: 'An architectural form that is deliberately incomplete. Still discovering new rooms and elevations.',
    scale: '1:50',
    color: 'from-emerald-900/40 to-slate-900',
  },
];

export const Gallery3Architecture: React.FC<Gallery3ArchitectureProps> = ({
  onNext,
  onSwanInteract,
}) => {
  const [activeModel, setActiveModel] = useState<number | null>(null);

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 03 // SECTOR: ARC-03</span>
          <span>•</span>
          <span>THE ARCHITECTURE WING</span>
        </div>
        <div className="text-right">NORTH ATRIUM GALLERY</div>
      </div>

      {/* Main Exhibition Hall Content */}
      <div className="my-6 space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-museum-accent uppercase tracking-wider">
            PRIMARY SCULPTURAL CENTERPIECE
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Architecture Wing & The Swan
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            Spatial structures, physical forms, and the celebrated 384-piece modular triangular origami swan.
          </p>
        </div>

        {/* Centerpiece 3D Swan & Plaque Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Origami Swan Interactive Visualizer */}
          <div className="lg:col-span-7">
            <OrigamiSwan3D onInteract={onSwanInteract} />
          </div>

          {/* Swan Museum Plaque & Curatorial Text */}
          <div className="lg:col-span-5 space-y-4">
            <MuseumPlaque
              catalogId="ARC-SWAN-001"
              title="THE MODULAR ORIGAMI SWAN"
              subtitle="Centerpiece of the Permanent Collection"
              classification="Physical Modular Sculpture"
              medium="Paper (Interlocking Triangular Units)"
              artist="Sonal"
              observation="Somehow turned a collection of hundreds of separate triangles into a graceful swan."
              variant="bronze"
            >
              <div className="mt-4 pt-4 border-t border-museum-accent/20 text-xs font-mono text-amber-200/80 italic space-y-2">
                <p>
                  "A single folded triangle looks like nothing more than paper geometry. But when you connect hundreds of them patiently, a living form emerges."
                </p>
                <p className="text-white/60 not-italic">
                  Perhaps this explains something.
                </p>
              </div>
            </MuseumPlaque>

            {/* Hint Box */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-white/50 flex items-center space-x-2">
              <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Tip: Click and drag the swan to inspect 360° or toggle the CAD Wireframe mode.</span>
            </div>
          </div>
        </div>

        {/* Miniature Symbolic Architectural Plinths */}
        <div className="space-y-3 pt-4">
          <div className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center space-x-2">
            <Box className="w-3.5 h-3.5 text-museum-accent" />
            <span>SYMBOLIC STRUCTURAL PLINTHS (STUDY MODELS)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SYMBOLIC_MODELS.map((model, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onClick={() => {
                  soundEngine.playInspect();
                  setActiveModel(activeModel === idx ? null : idx);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all bg-gradient-to-b ${model.color} ${
                  activeModel === idx
                    ? 'border-museum-accent shadow-lg shadow-museum-accent/10'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-2">
                  <span>PLINTH 0{idx + 1}</span>
                  <span className="text-museum-accent">{model.scale}</span>
                </div>
                <h4 className="text-sm font-display font-semibold text-white mb-1">
                  {model.title}
                </h4>
                <div className="text-[11px] font-mono text-cyan-400/90 mb-2">
                  {model.type}
                </div>
                <p className="text-xs font-mono text-slate-300 line-clamp-3">
                  {model.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE STUDIO & MATERIALS LAB
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER THE STUDIO</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
