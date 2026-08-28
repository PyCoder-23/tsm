import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Moon } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';
import { MuseumPlaque } from '../common/MuseumPlaque';

interface Screen0ExteriorProps {
  onEnter: () => void;
  onSecretBadgeFound?: () => void;
}

export const Screen0Exterior: React.FC<Screen0ExteriorProps> = ({ onEnter, onSecretBadgeFound }) => {
  const [isOpeningDoors, setIsOpeningDoors] = useState(false);

  const handleEnter = () => {
    setIsOpeningDoors(true);
    soundEngine.playTransition();
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Background Architectural Atmosphere: Dusk Sky with Horizon Gradient & Stars */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c10] via-[#0d141d] to-[#1a1c22]" />
        
        {/* Subtle Twilight Horizon Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-amber-500/10 via-sky-600/5 to-transparent blur-2xl" />

        {/* Minimalist Architectural Skyline Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20 flex items-end justify-between px-12">
          <div className="w-24 h-32 bg-slate-800 border-t border-slate-700" />
          <div className="w-36 h-48 bg-slate-900 border-t border-slate-800" />
          <div className="w-20 h-28 bg-slate-800 border-t border-slate-700" />
          <div className="w-48 h-56 bg-slate-900 border-t border-slate-800" />
          <div className="w-28 h-36 bg-slate-800 border-t border-slate-700" />
        </div>

        {/* Subtle Swaying Tree Silhouettes */}
        <div className="absolute bottom-4 left-8 opacity-30 text-emerald-950 font-mono text-xs hidden md:block">
          <div className="w-12 h-28 border-r border-emerald-800/40 transform -skew-x-2 animate-pulse" />
        </div>
      </div>

      {/* Top Architectural Metadata */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-white/50"
      >
        <div className="flex items-center space-x-2">
          <Moon className="w-3.5 h-3.5 text-museum-accent" />
          <span>LOCATION: ARCHITECTURAL SECTOR 00 // DUSK SURVEY</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3">
          <span>SURVEY STATUS: ACTIVE</span>
          <span>•</span>
          <span className="text-museum-accent">ELEVATION: 0.00m</span>
        </div>
      </motion.div>

      {/* Hero Architectural Monolith & Entrance */}
      <div className="my-auto py-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {/* Subtle Curatorial Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-museum-accent/30 text-museum-accent text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-museum-accent animate-ping" />
            <span className="tracking-widest uppercase">PERMANENT ARCHITECTURAL EXHIBITION</span>
          </div>

          {/* Main Museum Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-white">
              THE SONAL MUSEUM
            </h1>
            <p className="text-lg sm:text-2xl font-mono text-museum-accent font-light tracking-wide">
              An ongoing study in structural and human depth.
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-sans leading-relaxed text-balance">
            A digital architectural installation constructed around one particular person. Walk inside to explore beyond the initial survey.
          </p>

          {/* Monumental Entrance Plaque */}
          <div className="pt-4 max-w-md mx-auto">
            <MuseumPlaque
              catalogId="MUSEUM-ENTRY-001"
              title="THE SONAL MUSEUM"
              subtitle="Curated by Harleen for Sonal"
              classification="Architectural Installation"
              variant="bronze"
              className="text-left"
            >
              <div className="flex items-center justify-between text-xs font-mono pt-1 text-white/70">
                <span>VISITOR REGISTRATION:</span>
                <span className="text-museum-accent font-bold">#001 (Sonal)</span>
              </div>
            </MuseumPlaque>
          </div>

          {/* Enter Button with Architectural Door Opening Transition */}
          <div className="pt-6 flex flex-col items-center space-y-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnter}
              disabled={isOpeningDoors}
              className="relative px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-r from-museum-accent via-amber-400 to-museum-accent text-museum-bg font-mono font-bold text-sm tracking-widest uppercase shadow-2xl hover:shadow-museum-accent/30 transition-all flex items-center space-x-3 group"
            >
              <span>{isOpeningDoors ? 'OPENING MONUMENT DOORS...' : 'ENTER THE MUSEUM'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>

            <span className="text-[11px] font-mono text-white/40">
              [ Click to open the exterior doors and step into Gallery I ]
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Plaza Details & Secret Badge Easter Egg */}
      <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-2">
        <div>
          <span>FOUNDATION YEAR: 2026</span>
          <span className="mx-2">•</span>
          <span>SPECIAL ARCHIVE</span>
        </div>

        {/* Easter Egg Trigger: Curatorial Staff Badge */}
        <button
          onClick={() => {
            soundEngine.playSecretUnlock();
            if (onSecretBadgeFound) onSecretBadgeFound();
          }}
          className="text-white/30 hover:text-museum-accent transition-colors flex items-center space-x-1"
          title="Inspect discarded security credential"
        >
          <Building className="w-3 h-3" />
          <span>[ STAFF BADGE #0409 ]</span>
        </button>
      </div>
    </div>
  );
};
