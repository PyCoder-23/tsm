import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, Compass, KeyRound } from 'lucide-react';
import type { RoomId, RoomDefinition } from '../../types/museum';
import { soundEngine } from '../../audio/soundEngine';

interface MuseumHUDProps {
  currentRoom: RoomDefinition;
  totalRooms: number;
  currentIndex: number;
  onOpenDirectory: () => void;
  onSelectRoom: (id: RoomId) => void;
  unlockedEggsCount: number;
  totalEggsCount: number;
  onOpenSecretsModal?: () => void;
}

export const MuseumHUD: React.FC<MuseumHUDProps> = ({
  currentRoom,
  totalRooms,
  currentIndex,
  onOpenDirectory,
  onSelectRoom,
  unlockedEggsCount,
  totalEggsCount,
  onOpenSecretsModal,
}) => {
  const [isAudioOn, setIsAudioOn] = useState(!soundEngine.getMutedState());

  const handleAudioToggle = () => {
    const isNowActive = soundEngine.toggleMute();
    setIsAudioOn(isNowActive);
  };

  const progressPercent = ((currentIndex) / (totalRooms - 1)) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#0c0f12]/95 via-[#0c0f12]/80 to-transparent backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Museum Identifier & Visitor Badge */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => onSelectRoom('exterior')}
            className="flex items-center space-x-2 text-left group"
            title="Return to Exterior Plaza"
          >
            <div className="w-8 h-8 rounded-lg bg-museum-accent/15 border border-museum-accent/30 flex items-center justify-center text-museum-accent group-hover:bg-museum-accent group-hover:text-museum-bg transition-all">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-display font-bold tracking-wider text-white flex items-center space-x-1.5">
                <span>THE SONAL MUSEUM</span>
                <span className="text-[10px] text-museum-accent font-mono">v1.0</span>
              </div>
              <div className="text-[10px] font-mono text-white/50 tracking-wide hidden sm:block">
                AN ONGOING STUDY
              </div>
            </div>
          </button>

          <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

          {/* Visitor #001 Pill */}
          <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60">VISITOR:</span>
            <span className="text-white font-semibold">#001 — SONAL</span>
          </div>
        </div>

        {/* Center: Current Room Location Breadcrumb */}
        <div className="hidden md:flex items-center space-x-2 text-xs font-mono">
          <span className="text-museum-accent font-bold">
            [{currentRoom.number} / {String(totalRooms - 1).padStart(2, '0')}]
          </span>
          <span className="text-white/40">//</span>
          <span className="text-white font-medium tracking-wide uppercase">
            {currentRoom.name}
          </span>
        </div>

        {/* Right: Controls & Directory */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Easter Eggs Pill */}
          <button
            onClick={onOpenSecretsModal}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-museum-accent/10 border border-museum-accent/25 text-museum-accent text-xs font-mono hover:bg-museum-accent/20 transition-colors"
            title="Archival Secrets Discovered"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="font-semibold">{unlockedEggsCount}/{totalEggsCount}</span>
            <span className="hidden sm:inline-block text-[10px] text-museum-accent/70">SECRETS</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              isAudioOn
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
            }`}
            title={isAudioOn ? 'Mute Spatial Soundscape' : 'Enable Spatial Soundscape'}
          >
            {isAudioOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline-block">ACOUSTICS ON</span>
                {/* Micro Audio Equalizer Waveform */}
                <div className="flex items-end space-x-0.5 h-2.5 ml-1">
                  <span className="w-0.5 bg-cyan-400 animate-pulse h-2" />
                  <span className="w-0.5 bg-cyan-400 animate-pulse h-3" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 bg-cyan-400 animate-pulse h-1.5" style={{ animationDelay: '0.4s' }} />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline-block">MUTED</span>
              </>
            )}
          </button>

          {/* Directory & Elevator Sheet Toggle */}
          <button
            onClick={() => {
              soundEngine.playInspect();
              onOpenDirectory();
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono transition-all shadow-sm"
            title="Open Architectural Directory"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline-block font-semibold">DIRECTORY</span>
          </button>
        </div>
      </div>

      {/* Subtle Progress Bar */}
      <div className="w-full h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-museum-blueprint to-museum-accent transition-all duration-500"
          style={{ width: `${Math.max(5, progressPercent)}%` }}
        />
      </div>
    </header>
  );
};
