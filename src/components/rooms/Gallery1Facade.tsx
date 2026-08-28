import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scan } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';
import { MuseumPlaque } from '../common/MuseumPlaque';

interface Gallery1FacadeProps {
  onNext: () => void;
}

export const Gallery1Facade: React.FC<Gallery1FacadeProps> = ({ onNext }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanRevealed, setScanRevealed] = useState(false);

  const triggerScan = () => {
    setIsScanning(true);
    soundEngine.playInspect();
    setTimeout(() => {
      setIsScanning(false);
      setScanRevealed(true);
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Level Specification */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 01 // SECTOR: FAC-01</span>
          <span>•</span>
          <span>THE FAÇADE</span>
        </div>
        <div className="text-right">SURVEY ACCURACY: 31%</div>
      </div>

      {/* Main Exhibition Hall Content */}
      <div className="my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Massive Brutalist Plaque & Exhibit Text */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              PRIMARY ARCHITECTURAL EXHIBIT
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              EXHIBIT 01: FIRST IMPRESSION
            </h2>
          </div>

          <MuseumPlaque
            catalogId="EX-001"
            title="The Academic Façade"
            subtitle="Preliminary Spectator Analysis"
            classification="Visual & Behavioral Survey"
            variant="metal"
          >
            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="p-3 bg-black/40 rounded-lg border-l-2 border-cyan-400 space-y-1.5">
                <div className="text-white/40 uppercase text-[10px]">INITIAL CLASSIFICATION:</div>
                <ul className="space-y-1 text-slate-200 list-disc list-inside">
                  <li>Extremely studious.</li>
                  <li>Serious.</li>
                  <li>Probably studying right now.</li>
                  <li>Possibly studying while reading this sentence.</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-white/50">ESTIMATED SURVEY ACCURACY:</span>
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  31% [ HIGHLY INCOMPLETE ]
                </span>
              </div>
            </div>
          </MuseumPlaque>

          {/* Architectural Quote Card */}
          <div className="p-4 rounded-xl bg-museum-surface/80 border border-white/10 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed italic border-l-4 border-museum-accent">
            "You cannot understand a building from its façade. The exterior represents only what people see first — not what exists once you step inside."
          </div>
        </div>

        {/* Right Column: Brutalist Elevation CAD Scan Visualization */}
        <div className="md:col-span-5 flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-square rounded-2xl blueprint-surface border-2 border-cyan-500/30 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Scan animation line */}
            {isScanning && (
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-20"
              />
            )}

            {/* Top CAD details */}
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/70 z-10">
              <span>SCAN // ELEVATION-FRONT</span>
              <span>1:50 METRIC</span>
            </div>

            {/* Brutalist Façade Diagram Illustration */}
            <div className="my-auto flex flex-col items-center justify-center space-y-2 py-4 relative z-10">
              <div className="w-40 h-28 border-2 border-cyan-400/80 bg-cyan-950/40 rounded flex flex-col items-center justify-center p-2 relative shadow-lg">
                <div className="text-[10px] font-mono text-cyan-300 text-center font-bold">
                  SURFACE LAYER:
                </div>
                <div className="text-xs font-mono text-white text-center">
                  "STUDIOUS GIRL"
                </div>

                {/* Subsurface teaser */}
                {scanRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-10 bg-museum-accent text-museum-bg px-2.5 py-1 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-xl"
                  >
                    +69% HIDDEN DEPTHS DETECTED
                  </motion.div>
                )}
              </div>

              <div className="w-56 h-3 bg-cyan-500/20 border-t border-cyan-400/50" />
            </div>

            {/* Scan Trigger Button */}
            <div className="pt-2 z-10 flex justify-center">
              <button
                onClick={triggerScan}
                disabled={isScanning}
                className="w-full py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 text-xs font-mono transition-all flex items-center justify-center space-x-2"
              >
                <Scan className="w-3.5 h-3.5" />
                <span>{isScanning ? 'SCANNING FAÇADE...' : 'DEEP STRUCTURAL SCAN'}</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-white/40 text-center">
            Preliminary hypothesis proved severely inadequate upon further inspection.
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          PROCEED TO STRUCTURAL BLUEPRINT
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>CONTINUE INSIDE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
