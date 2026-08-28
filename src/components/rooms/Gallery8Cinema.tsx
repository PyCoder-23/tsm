import React, { useState } from 'react';
import { ArrowRight, Clapperboard, Film, Sparkles } from 'lucide-react';
import { AIRPORT_INCIDENT_TIMELINE } from '../../data/museumData';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery8CinemaProps {
  onNext: () => void;
}

export const Gallery8Cinema: React.FC<Gallery8CinemaProps> = ({ onNext }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepClick = (idx: number) => {
    soundEngine.playInspect();
    setActiveStep(idx);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 08 // SECTOR: CIN-08</span>
          <span>•</span>
          <span>THE AIRPORT CINEMA</span>
        </div>
        <div className="text-right text-rose-400">EXHIBIT 09: CASE STUDY</div>
      </div>

      {/* Main Content */}
      <div className="my-6 space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center space-x-2">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>DOCUMENTARY RECONSTRUCTION // EXHIBIT 09</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Airport Incident
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            A stylized documentary timeline reconstructing the cinematic Mumbai → Odisha transit encounter.
          </p>
        </div>

        {/* Cinema Projection Screen & Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stylized Cinema Projection Screen */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#181216] via-[#100c0f] to-[#0a0709] border-2 border-rose-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Projector Light Beam subtle visual */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-40 bg-gradient-to-b from-rose-500/15 to-transparent blur-3xl pointer-events-none" />

              {/* Screen Header */}
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3 mb-6 text-xs font-mono text-rose-300">
                <div className="flex items-center space-x-2">
                  <Film className="w-4 h-4 text-rose-400" />
                  <span className="font-bold">PROJECTION SCREEN 01</span>
                </div>
                <div className="text-rose-400/80">REEL 09 // 24 FPS</div>
              </div>

              {/* Current Scene Display */}
              <div className="space-y-4 min-h-[190px] flex flex-col justify-center">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-bold">
                    SCENE {AIRPORT_INCIDENT_TIMELINE[activeStep].step} / 07
                  </span>
                  <span className="text-xs font-mono text-white/50">
                    LOC: {AIRPORT_INCIDENT_TIMELINE[activeStep].location}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {AIRPORT_INCIDENT_TIMELINE[activeStep].title}
                </h3>

                <p className="text-sm font-mono text-slate-200 leading-relaxed">
                  {AIRPORT_INCIDENT_TIMELINE[activeStep].detail}
                </p>
              </div>

              {/* Stepper controls */}
              <div className="pt-6 border-t border-rose-500/20 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundEngine.playInspect();
                    setActiveStep(Math.max(0, activeStep - 1));
                  }}
                  disabled={activeStep === 0}
                  className="px-3 py-1.5 rounded bg-white/5 text-xs font-mono text-white/70 hover:text-white disabled:opacity-30"
                >
                  ◀ PREV SCENE
                </button>

                <div className="flex space-x-1.5">
                  {AIRPORT_INCIDENT_TIMELINE.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleStepClick(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeStep === i ? 'bg-rose-400 w-5' : 'bg-white/20 hover:bg-white/40 w-2'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    soundEngine.playInspect();
                    setActiveStep(Math.min(AIRPORT_INCIDENT_TIMELINE.length - 1, activeStep + 1));
                  }}
                  disabled={activeStep === AIRPORT_INCIDENT_TIMELINE.length - 1}
                  className="px-3 py-1.5 rounded bg-rose-500/20 text-xs font-mono text-rose-300 hover:bg-rose-500/30 disabled:opacity-30 font-bold"
                >
                  NEXT SCENE ▶
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Curatorial Box Office & Rating Report */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/15 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-xs font-mono text-rose-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>OFFICIAL CURATORIAL ASSESSMENT</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="text-white/50">CINEMATIC VALUE:</span>
                  <span className="text-xl font-bold text-rose-400">9.7 / 10</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="text-white/50">PHONE NUMBERS EXCHANGED:</span>
                  <span className="text-xl font-bold text-amber-300">0</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="text-white/50">BUTTERFLIES CONFIRMED:</span>
                  <span className="text-base font-bold text-emerald-400">YES 🥹</span>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200/90 leading-relaxed italic">
                  "Researcher's Conclusion: Subject later admitted to being 'delulu'. A certified top-tier piece of personal lore."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE KIDDISH ROOM (TACTILE CONTRAST)
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER THE KIDDISH ROOM</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
