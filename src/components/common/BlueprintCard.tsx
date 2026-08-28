import React from 'react';
import { Compass, Maximize2 } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface BlueprintCardProps {
  code: string;
  title: string;
  category?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isInteractive?: boolean;
  className?: string;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  code,
  title,
  category,
  children,
  onClick,
  isInteractive = true,
  className = '',
}) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          soundEngine.playInspect();
          onClick();
        }
      }}
      className={`relative rounded-xl border border-cyan-500/20 blueprint-surface p-4 sm:p-5 overflow-hidden transition-all duration-300 ${
        isInteractive
          ? 'cursor-pointer hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 group'
          : ''
      } ${className}`}
    >
      {/* Blueprint Grid Watermark and Technical Coordinate Marks */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/50 flex items-center space-x-1 pointer-events-none">
        <Compass className="w-2.5 h-2.5 text-cyan-400/70" />
        <span>{code}</span>
      </div>

      <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-400/40 pointer-events-none">
        SCALE 1:100
      </div>

      {/* Subtle CAD Crosshairs */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-500/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-500/30 pointer-events-none" />

      {/* Header */}
      <div className="mt-2 mb-3">
        {category && (
          <span className="text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase">
            {category}
          </span>
        )}
        <h4 className="text-base font-display font-semibold text-white group-hover:text-cyan-300 transition-colors">
          {title}
        </h4>
      </div>

      {/* Content */}
      <div className="text-xs text-slate-300 leading-relaxed space-y-2">
        {children}
      </div>

      {isInteractive && (
        <div className="mt-4 pt-2 border-t border-cyan-500/15 flex items-center justify-between text-[10px] font-mono text-cyan-400/60">
          <span>ARCHITECTURAL SPECIFICATION</span>
          <span className="flex items-center space-x-1 text-cyan-400 group-hover:translate-x-0.5 transition-transform">
            <span>INSPECT</span>
            <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      )}
    </div>
  );
};
