import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Eye } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface MinimalHUDProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSecrets: () => void;
  unlockedEggsCount: number;
}

export const MinimalHUD: React.FC<MinimalHUDProps> = ({
  isMuted,
  onToggleMute,
  onOpenSecrets,
  unlockedEggsCount,
}) => {
  return (
    <>
      {/* Sound toggle — top left */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onToggleMute}
        title={isMuted ? 'Enable sound' : 'Mute sound'}
        className="fixed top-4 left-4 z-50 w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: 'rgba(10,14,18,0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white/30" />
        ) : (
          <Volume2 className="w-4 h-4 text-museum-accent" />
        )}
      </motion.button>

      {/* Secrets / Easter eggs — top right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={() => {
          soundEngine.playInspect();
          onOpenSecrets();
        }}
        title="Classified discoveries"
        className="fixed top-4 right-4 z-50 h-9 px-3 rounded-lg flex items-center space-x-1.5 transition-all hover:scale-105"
        style={{
          background: 'rgba(10,14,18,0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Eye className="w-3.5 h-3.5 text-white/30" />
        {unlockedEggsCount > 0 && (
          <span className="text-[10px] font-mono text-museum-accent font-bold">
            {unlockedEggsCount}
          </span>
        )}
      </motion.button>
    </>
  );
};
