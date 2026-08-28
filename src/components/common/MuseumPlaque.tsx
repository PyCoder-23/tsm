import React from 'react';

interface MuseumPlaqueProps {
  catalogId?: string;
  title: string;
  subtitle?: string;
  classification?: string;
  medium?: string;
  artist?: string;
  observation?: string;
  quote?: string;
  children?: React.ReactNode;
  variant?: 'bronze' | 'metal' | 'dark';
  className?: string;
}

export const MuseumPlaque: React.FC<MuseumPlaqueProps> = ({
  catalogId,
  title,
  subtitle,
  classification,
  medium,
  artist = 'Sonal',
  observation,
  quote,
  children,
  variant = 'bronze',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'bronze':
        return 'plaque-bronze text-amber-100/90 border-museum-accent/30';
      case 'metal':
        return 'plaque-metal text-slate-200 border-white/15';
      default:
        return 'bg-museum-surface/90 text-slate-200 border-white/10';
    }
  };

  return (
    <div className={`relative p-5 sm:p-6 rounded-xl border backdrop-blur-md shadow-xl ${getVariantStyles()} ${className}`}>
      {/* Decorative architectural mounting bolts */}
      <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-museum-accent/40 shadow-inner" />
      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-museum-accent/40 shadow-inner" />
      <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-museum-accent/40 shadow-inner" />
      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-museum-accent/40 shadow-inner" />

      {/* Catalog ID & Classification Header */}
      {(catalogId || classification) && (
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-[11px] font-mono tracking-wider">
          {catalogId && (
            <span className="text-museum-accent font-semibold flex items-center">
              <span className="inline-block w-1.5 h-1.5 bg-museum-accent rounded-full mr-1.5 animate-pulse" />
              CAT: {catalogId}
            </span>
          )}
          {classification && (
            <span className="text-white/50 uppercase tracking-widest text-[10px]">
              {classification}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-display font-semibold tracking-wide text-white mb-1">
        {title}
      </h3>

      {subtitle && (
        <div className="text-xs sm:text-sm font-mono text-museum-accent/90 mb-3">
          {subtitle}
        </div>
      )}

      {/* Metadata list */}
      <div className="space-y-1.5 text-xs font-mono text-white/70 my-3">
        {medium && (
          <div className="flex items-baseline">
            <span className="text-white/40 w-24 shrink-0 uppercase tracking-wider text-[10px]">Medium:</span>
            <span className="text-white/90">{medium}</span>
          </div>
        )}
        {artist && (
          <div className="flex items-baseline">
            <span className="text-white/40 w-24 shrink-0 uppercase tracking-wider text-[10px]">Artist:</span>
            <span className="text-white/90 font-medium">{artist}</span>
          </div>
        )}
        {observation && (
          <div className="flex items-baseline">
            <span className="text-white/40 w-24 shrink-0 uppercase tracking-wider text-[10px]">Observation:</span>
            <span className="text-amber-200/90 italic">{observation}</span>
          </div>
        )}
      </div>

      {quote && (
        <div className="mt-3 p-3 rounded-lg bg-black/40 border-l-2 border-museum-accent text-xs font-sans italic text-white/80">
          "{quote}"
        </div>
      )}

      {children && <div className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed">{children}</div>}
    </div>
  );
};
