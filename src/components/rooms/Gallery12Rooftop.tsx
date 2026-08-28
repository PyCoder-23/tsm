import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Sun, Eye, CheckCircle2 } from 'lucide-react';
import { MuseumPlaque } from '../common/MuseumPlaque';
import { MuseumAerialView } from '../3d/MuseumAerialView';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery12RooftopProps {
  onRestart: () => void;
}

export const Gallery12Rooftop: React.FC<Gallery12RooftopProps> = ({ onRestart }) => {
  const [showAerialView, setShowAerialView] = useState(false);

  const triggerCelebration = () => {
    soundEngine.playSecretUnlock();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e2b36f', '#64dfdf', '#ffffff', '#ffd166'],
      disableForReducedMotion: true,
    });
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 12 // SECTOR: ROOF-12</span>
          <span>•</span>
          <span>THE ROOFTOP GARDEN</span>
        </div>
        <div className="text-right text-museum-accent">ELEVATION: OPEN SKY // SUNSET</div>
      </div>

      {/* Main Rooftop Content */}
      <div className="space-y-10">
        {/* Atmosphere Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-museum-accent/15 border border-museum-accent/30 text-museum-accent text-xs font-mono">
              <Sun className="w-3.5 h-3.5" />
              <span>THE ROOFTOP TERRACE // FINAL EXHIBITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              The Person Behind The Building
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                soundEngine.playInspect();
                setShowAerialView(!showAerialView);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 border ${
                showAerialView
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/15'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showAerialView ? 'VIEW EXHIBIT PLAQUE' : 'VIEW AERIAL S-STRUCTURE'}</span>
            </button>

            <button
              onClick={triggerCelebration}
              className="px-4 py-2 rounded-xl bg-museum-accent/20 hover:bg-museum-accent/30 border border-museum-accent/40 text-museum-accent text-xs font-mono transition-all flex items-center space-x-1.5"
              title="Celebrate Sonal's Birthday"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CELEBRATE ✨</span>
            </button>
          </div>
        </div>

        {/* View Toggle: Aerial View OR The Grand Birthday Plaque */}
        {showAerialView ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MuseumAerialView onReturnToEntrance={onRestart} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Monumental Birthday Bronze Plaque (Harleen's Letter) */}
            <div className="lg:col-span-8">
              <MuseumPlaque
                catalogId="FINAL-EXHIBIT"
                title="THE PERSON BEHIND THE BUILDING"
                subtitle="Permanent Dedication"
                classification="Culmination of Ongoing Studies"
                variant="bronze"
                className="p-6 sm:p-10"
              >
                <div className="space-y-4 text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans mt-4">
                  <p>
                    When I first met you, I honestly thought you were just the super-studious girl who spent all day studying.
                  </p>
                  <p>
                    Then I got to know you.
                  </p>
                  <p className="font-semibold text-white">
                    And somewhere along the way, the building got a lot bigger.
                  </p>
                  
                  <div className="p-4 rounded-xl bg-black/40 border border-museum-accent/25 space-y-1.5 text-xs sm:text-sm font-mono text-amber-200/80">
                    <div>• There was the architecture nerd.</div>
                    <div>• The writer.</div>
                    <div>• The person who makes random things out of clay and paper.</div>
                    <div>• The sarcastic menace.</div>
                    <div>• The sleepy student who somehow keeps going.</div>
                    <div>• The person with an unreasonable amount of childhood lore.</div>
                    <div>• The person who can turn a random event into an entire story.</div>
                    <div className="text-white font-bold pt-1">• And just... Sonal.</div>
                  </div>

                  <div className="pt-4 border-t border-museum-accent/30 space-y-3">
                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
                      Happy Birthday, Sonal :)
                    </h3>
                    <p className="italic text-slate-200">
                      I'm glad I got to know the person beyond the façade.
                    </p>
                  </div>
                </div>

                {/* Permanent Collection Footer */}
                <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/50 gap-2">
                  <span>THE SONAL MUSEUM // PERMANENT COLLECTION</span>
                  <span className="text-museum-accent font-bold">STATUS: STILL DISCOVERING NEW ROOMS</span>
                </div>
              </MuseumPlaque>
            </div>

            {/* Right Column: Visitor Completion Certificate & Aerial Teaser */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 text-xs font-mono text-museum-accent">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">TOUR COMPLETE</span>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-white/40">VISITOR:</span>
                    <span className="text-white font-bold">#001 — Sonal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">TOTAL ROOMS SURVEYED:</span>
                    <span className="text-cyan-400 font-bold">12 / 12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">FAÇADE ACCURACY:</span>
                    <span className="text-amber-400">SURPASSED BY REALITY</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <button
                    onClick={() => {
                      soundEngine.playInspect();
                      setShowAerialView(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW S-SHAPED AERIAL SURVEY</span>
                  </button>
                </div>
              </div>

              {/* Reset / Return to Entrance */}
              <button
                onClick={() => {
                  soundEngine.playTransition();
                  onRestart();
                }}
                className="w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>[ RETURN TO ENTRANCE ]</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-6 text-center text-xs font-mono text-white/40">
        Constructed with architectural precision, modular paper triangles, and endless friendship lore.
      </div>
    </div>
  );
};
