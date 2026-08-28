import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import { FLOOR_PLAN_SECTORS } from '../../data/museumData';
import type { RoomId, FloorPlanSector } from '../../types/museum';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery2FloorPlanProps {
  onSelectRoom: (id: RoomId) => void;
  onNext: () => void;
  onSecretFound?: () => void;
}

export const Gallery2FloorPlan: React.FC<Gallery2FloorPlanProps> = ({
  onSelectRoom,
  onNext,
  onSecretFound,
}) => {
  const [selectedSector, setSelectedSector] = useState<FloorPlanSector>(FLOOR_PLAN_SECTORS[0]);

  const handleSectorClick = (sector: FloorPlanSector) => {
    soundEngine.playInspect();
    setSelectedSector(sector);

    if (sector.status === 'hidden') {
      soundEngine.playSecretUnlock();
      if (onSecretFound) onSecretFound();
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 02 // SECTOR: CAD-02</span>
          <span>•</span>
          <span>THE MASTER FLOOR PLAN</span>
        </div>
        <div className="text-right text-cyan-400">STRUCTURAL BLUEPRINT 1:100</div>
      </div>

      {/* Main Floor Plan Grid */}
      <div className="my-6 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            ARCHITECTURAL SURVEY // REVISED MAP
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            The Incomplete Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            Interactive schematic of Sonal's cognitive & creative geography. Click any sector to inspect dimensions or warp directly to that wing.
          </p>
        </div>

        {/* CAD Floor Plan Canvas Box */}
        <div className="relative rounded-2xl blueprint-surface border-2 border-cyan-500/40 p-4 sm:p-8 shadow-2xl overflow-hidden">
          {/* Top Blueprint Title Block */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3 mb-6 text-[10px] sm:text-xs font-mono text-cyan-300">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
              <span className="font-bold">PROJECT: SONAL — ARCHITECTURAL CAD SURVEY</span>
            </div>
            <div className="flex items-center space-x-3 text-cyan-400/70">
              <span>REV: 04.9</span>
              <span>•</span>
              <span>GRID: 24m² CELLS</span>
            </div>
          </div>

          {/* Interactive Sectors Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {FLOOR_PLAN_SECTORS.map((sec) => {
              const isSelected = selectedSector.id === sec.id;
              const isHidden = sec.status === 'hidden';

              return (
                <motion.div
                  key={sec.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSectorClick(sec)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-300 shadow-lg shadow-cyan-500/20'
                      : isHidden
                      ? 'bg-amber-950/30 border-amber-500/40 hover:border-amber-400'
                      : 'bg-black/30 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-cyan-500/10'
                  }`}
                >
                  {/* Sector Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        isHidden
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {sec.code}
                    </span>

                    <span
                      className={`text-[9px] uppercase tracking-wider ${
                        isHidden ? 'text-amber-400 animate-pulse' : 'text-cyan-400/70'
                      }`}
                    >
                      {isHidden ? 'SURVEY ANOMALY' : 'ACCESSIBLE'}
                    </span>
                  </div>

                  {/* Sector Name */}
                  <h4 className="text-sm font-display font-semibold text-white mb-1.5 line-clamp-1">
                    {sec.name}
                  </h4>

                  {/* Notes snippet */}
                  <p className="text-[11px] font-mono text-slate-300 line-clamp-2 leading-relaxed">
                    {sec.notes}
                  </p>

                  {/* Active Indicator Corner */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-bl" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Selected Sector Detail Inspection Pane */}
          {selectedSector && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 sm:p-5 rounded-xl bg-black/60 border border-cyan-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                    SECTOR SELECTED: {selectedSector.code}
                  </span>
                  {selectedSector.status === 'hidden' && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                      ACCESS: UNMAPPED BY ORIGINAL SURVEY
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white">
                  {selectedSector.name}
                </h3>
                <p className="text-xs font-mono text-slate-300 max-w-xl">
                  {selectedSector.notes}
                </p>
              </div>

              {selectedSector.roomId && (
                <button
                  onClick={() => {
                    soundEngine.playTransition();
                    onSelectRoom(selectedSector.roomId!);
                  }}
                  className="shrink-0 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-museum-bg font-mono font-bold text-xs flex items-center space-x-2 transition-all shadow-md shadow-cyan-400/20"
                >
                  <span>FAST-TRAVEL TO WING</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE ARCHITECTURE WING & THE SWAN
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER ARCHITECTURE WING</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
