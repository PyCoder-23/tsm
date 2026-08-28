import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { INITIAL_EASTER_EGGS } from './data/easterEggs';
import type { FloorId, EasterEgg } from './types/museum';
import { soundEngine } from './audio/soundEngine';

// Scenes
import { LoadingScene } from './scenes/LoadingScene';
import { ExteriorScene } from './scenes/ExteriorScene';
import { LobbyScene } from './scenes/LobbyScene';
import { ElevatorScene } from './scenes/ElevatorScene';
import { RooftopScene } from './scenes/RooftopScene';

// Floors
import { Floor1Facade } from './scenes/floors/Floor1Facade';
import { Floor2Studio } from './scenes/floors/Floor2Studio';
import { Floor3Archive } from './scenes/floors/Floor3Archive';
import { Floor4Hidden } from './scenes/floors/Floor4Hidden';
import { Floor5Cinema } from './scenes/floors/Floor5Cinema';

// Persistent UI
import { MinimalHUD } from './components/layout/MinimalHUD';
import { ArchitecturalCursor } from './components/layout/ArchitecturalCursor';
import { EasterEggToast } from './components/common/EasterEggToast';
import { SecretsModal } from './components/common/SecretsModal';

// Scene phase type
type ScenePhase = 'loading' | 'exterior' | 'lobby' | 'elevator' | 'floor' | 'rooftop';

export function App() {
  const [phase, setPhase] = useState<ScenePhase>('loading');
  const [currentFloor, setCurrentFloor] = useState<FloorId>(1);
  const [elevatorOrigin, setElevatorOrigin] = useState<FloorId | 'lobby' | 'rooftop'>('lobby');
  const [isMuted, setIsMuted] = useState(false);
  const [isSecretsOpen, setIsSecretsOpen] = useState(false);
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>(INITIAL_EASTER_EGGS);
  const [activeEggToast, setActiveEggToast] = useState<EasterEgg | null>(null);

  // Automatic soundtrack mapping based on active phase / floor
  useEffect(() => {
    if (phase === 'loading') return;

    if (phase === 'exterior') {
      soundEngine.playTrack('exterior');
    } else if (phase === 'lobby') {
      soundEngine.playTrack('lobby');
    } else if (phase === 'elevator') {
      soundEngine.playTrack('elevator');
    } else if (phase === 'floor') {
      if (currentFloor === 1) soundEngine.playTrack('floor-1');
      else if (currentFloor === 2) soundEngine.playTrack('floor-2');
      else if (currentFloor === 3) soundEngine.playTrack('floor-3');
      else if (currentFloor === 4) soundEngine.playTrack('floor-4');
      else if (currentFloor === 5) soundEngine.playTrack('floor-5');
    } else if (phase === 'rooftop') {
      soundEngine.playTrack('rooftop');
    }
  }, [phase, currentFloor]);

  const unlockEgg = (eggId: string) => {
    setEasterEggs((prev) => {
      const target = prev.find((e) => e.id === eggId);
      if (target && !target.discovered) {
        const updated = prev.map((e) => (e.id === eggId ? { ...e, discovered: true } : e));
        setActiveEggToast({ ...target, discovered: true });
        return updated;
      }
      return prev;
    });
  };

  const handleToggleMute = () => {
    const nowActive = soundEngine.toggleMute();
    setIsMuted(!nowActive);
  };

  // Navigation helpers
  const goToExterior = () => setPhase('exterior');
  const goToLobby = () => {
    setElevatorOrigin('lobby');
    setPhase('lobby');
  };
  const goToElevator = (from?: FloorId | 'lobby' | 'rooftop') => {
    if (from !== undefined) setElevatorOrigin(from);
    setPhase('elevator');
  };
  const goToRooftop = () => {
    setElevatorOrigin('rooftop');
    setPhase('rooftop');
  };

  const goToFloor = (floor: FloorId) => {
    setCurrentFloor(floor);
    setElevatorOrigin(floor);
    setPhase('floor');
  };

  const unlockedCount = easterEggs.filter((e) => e.discovered).length;

  return (
    <div className="w-screen h-screen overflow-hidden bg-museum-bg relative">
      {/* CAD cursor reticle */}
      <ArchitecturalCursor />

      {/* Minimal persistent HUD — only shown after loading */}
      {phase !== 'loading' && (
        <MinimalHUD
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenSecrets={() => setIsSecretsOpen(true)}
          unlockedEggsCount={unlockedCount}
        />
      )}

      {/* === SCENE STACK === */}
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScene key="loading" onComplete={goToExterior} />
        )}

        {phase === 'exterior' && (
          <ExteriorScene key="exterior" onEnter={goToLobby} />
        )}

        {phase === 'lobby' && (
          <LobbyScene key="lobby" onEnterElevator={goToElevator} />
        )}

        {phase === 'elevator' && (
          <ElevatorScene
            key="elevator"
            currentFloor={elevatorOrigin}
            onSelectFloor={goToFloor}
            onGoRooftop={goToRooftop}
            onGoLobby={goToLobby}
          />
        )}

        {phase === 'floor' && currentFloor === 1 && (
          <Floor1Facade
            key="floor-1"
            onElevator={() => goToElevator(1)}
            onUnlockEgg={unlockEgg}
          />
        )}

        {phase === 'floor' && currentFloor === 2 && (
          <Floor2Studio
            key="floor-2"
            onElevator={() => goToElevator(2)}
            onUnlockEgg={unlockEgg}
          />
        )}

        {phase === 'floor' && currentFloor === 3 && (
          <Floor3Archive
            key="floor-3"
            onElevator={() => goToElevator(3)}
            onUnlockEgg={unlockEgg}
          />
        )}

        {phase === 'floor' && currentFloor === 4 && (
          <Floor4Hidden
            key="floor-4"
            onElevator={() => goToElevator(4)}
            onUnlockEgg={unlockEgg}
          />
        )}

        {phase === 'floor' && currentFloor === 5 && (
          <Floor5Cinema
            key="floor-5"
            onElevator={() => goToElevator(5)}
          />
        )}

        {phase === 'rooftop' && (
          <RooftopScene
            key="rooftop"
            onRestart={goToExterior}
            onElevator={() => goToElevator('rooftop')}
          />
        )}
      </AnimatePresence>

      {/* === PERSISTENT OVERLAYS === */}
      <SecretsModal
        isOpen={isSecretsOpen}
        onClose={() => setIsSecretsOpen(false)}
        eggs={easterEggs}
      />

      <EasterEggToast
        egg={activeEggToast}
        onDismiss={() => setActiveEggToast(null)}
      />
    </div>
  );
}

export default App;
