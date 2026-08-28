import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Compass, ChevronRight } from 'lucide-react';
import type { RoomId, RoomDefinition } from '../../types/museum';
import { soundEngine } from '../../audio/soundEngine';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: RoomDefinition[];
  currentRoomId: RoomId;
  onSelectRoom: (id: RoomId) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  rooms,
  currentRoomId,
  onSelectRoom,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-md bg-museum-surface/98 border-l border-white/15 h-full flex flex-col shadow-2xl text-museum-text z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#18212a]">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-museum-accent uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL DIRECTORY</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mt-1">
                Museum Navigation
              </h3>
            </div>

            <button
              onClick={() => {
                soundEngine.playInspect();
                onClose();
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Directory Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
            <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2 px-2">
              Select Sector // Elevator Levels
            </div>

            {rooms.map((room) => {
              const isCurrent = room.id === currentRoomId;
              return (
                <button
                  key={room.id}
                  onClick={() => {
                    soundEngine.playTransition();
                    onSelectRoom(room.id);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isCurrent
                      ? 'bg-museum-accent/15 border-museum-accent/40 shadow-md shadow-museum-accent/5'
                      : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                        isCurrent
                          ? 'bg-museum-accent text-museum-bg'
                          : 'bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white'
                      }`}
                    >
                      {room.number}
                    </span>

                    <div>
                      <div className="text-[10px] font-mono text-cyan-400/80">
                        {room.level}
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          isCurrent ? 'text-museum-accent' : 'text-white group-hover:text-slate-100'
                        }`}
                      >
                        {room.name}
                      </div>
                      <div className="text-xs text-white/50 line-clamp-1">
                        {room.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-museum-accent mr-1 animate-pulse" />
                    )}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isCurrent
                          ? 'text-museum-accent translate-x-0.5'
                          : 'text-white/30 group-hover:text-white group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer stats */}
          <div className="p-4 bg-black/40 border-t border-white/10 text-xs font-mono text-white/50 flex items-center justify-between">
            <span>PERMANENT SURVEY</span>
            <span className="text-museum-accent">STATUS: EXPANDING</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
