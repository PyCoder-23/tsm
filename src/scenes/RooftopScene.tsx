import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, Heart, Compass, RotateCcw, ArrowLeft, Flame } from 'lucide-react';

interface RooftopSceneProps {
  onRestart: () => void;
  onElevator: () => void;
}

const CANDLES = Array.from({ length: 7 }, (_, i) => ({
  x: 78 + i * 20,
  delay: `${i * 0.12}s`,
}));

export const RooftopScene: React.FC<RooftopSceneProps> = ({ onRestart, onElevator }) => {
  const [cardVisible, setCardVisible] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showYayyBanner, setShowYayyBanner] = useState(false);

  useEffect(() => {
    // Initial auto-confetti burst upon reaching the rooftop sanctuary
    const fire = (opts: confetti.Options) => confetti({ ...opts, disableForReducedMotion: true });

    const t1 = setTimeout(() => {
      fire({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#e2b36f', '#f9c74f', '#ffffff', '#ff9aa2', '#c7ceea', '#b5ead7'],
      });
      soundEngine.playSecretUnlock();
    }, 600);

    const t2 = setTimeout(() => {
      fire({
        particleCount: 80,
        spread: 70,
        angle: 60,
        origin: { y: 0.4, x: 0.1 },
        colors: ['#e2b36f', '#ffffff', '#ffd166'],
      });
    }, 1200);

    const t3 = setTimeout(() => {
      fire({
        particleCount: 80,
        spread: 70,
        angle: 120,
        origin: { y: 0.4, x: 0.9 },
        colors: ['#c7ceea', '#b5ead7', '#ffffff'],
      });
    }, 1600);

    const tCard = setTimeout(() => setCardVisible(true), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tCard);
    };
  }, []);

  const handleCelebrate = () => {
    setCelebrated(true);
    setShowYayyBanner(true);
    setTimeout(() => setShowYayyBanner(false), 4000);

    // 1. Play joyful "Yayy!" fanfare + firework audio
    soundEngine.playCelebrationYayy();

    // 2. Firework rocket wave 1 (Left & Right high-altitude bursts)
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 75,
      origin: { x: 0.1, y: 0.6 },
      colors: ['#ffd166', '#ff9aa2', '#ffffff', '#e2b36f'],
      startVelocity: 65,
      ticks: 300,
      disableForReducedMotion: true,
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 75,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#c7ceea', '#b5ead7', '#ffd166', '#ffffff'],
      startVelocity: 65,
      ticks: 300,
      disableForReducedMotion: true,
    });

    // 3. Firework wave 2 (Center starburst chrysanthemums)
    setTimeout(() => {
      confetti({
        particleCount: 180,
        spread: 120,
        origin: { x: 0.5, y: 0.35 },
        colors: ['#ffd166', '#f43f5e', '#a855f7', '#06b6d4', '#ffffff'],
        startVelocity: 55,
        ticks: 350,
        disableForReducedMotion: true,
      });
    }, 300);

    // 4. Firework wave 3 (Dense glittering gold and pastel rain)
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 140,
        origin: { x: 0.5, y: 0.45 },
        colors: ['#e2b36f', '#f9c74f', '#ff9aa2', '#b5ead7', '#fff'],
        startVelocity: 45,
        ticks: 400,
        disableForReducedMotion: true,
      });
    }, 600);
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    soundEngine.playInspect();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffd166', '#fff', '#ff9aa2'],
    });
  };

  return (
    <motion.div
      key="rooftop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white relative"
      style={{ background: '#05070e' }}
    >
      {/* ── PHOTOREALISTIC NIGHT ROOFTOP BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/rooftop-celebration.jpg"
          alt="The Sonal Museum Night Rooftop Terrace"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.9) contrast(1.1)',
          }}
        />
        {/* Night Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(4,6,12,0.7) 0%, rgba(4,6,12,0.1) 30%, rgba(4,6,12,0.3) 65%, rgba(4,6,12,0.92) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(3,5,10,0.6) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP ROOFTOP HUD HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-amber-300 font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 4 · THE ROOFTOP SANCTUARY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Pinnacle of the Building
          </h1>
          <p className="text-xs font-mono text-white/60 mt-0.5">
            ELEVATION +38.50m · SKYLINE PANORAMA & PRIVATE SANCTUARY
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              soundEngine.playTransition();
              onElevator();
            }}
            className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/40 font-mono text-xs text-white/80 hover:text-white tracking-wider uppercase transition-all backdrop-blur-md flex items-center space-x-2 shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ELEVATOR</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playTransition();
              onRestart();
            }}
            className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/40 font-mono text-xs text-white/80 hover:text-white tracking-wider uppercase transition-all backdrop-blur-md flex items-center space-x-2 shadow-xl"
          >
            <RotateCcw className="w-4 h-4" />
            <span>MUSEUM PLAZA</span>
          </button>
        </div>
      </header>

      {/* ── CELEBRATION YAYY FLOATING BANNER ── */}
      <AnimatePresence>
        {showYayyBanner && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-8 py-3.5 rounded-3xl bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 text-black font-display font-bold text-lg sm:text-2xl shadow-2xl shadow-amber-500/40 border-2 border-white flex items-center space-x-3"
          >
            <span>🎉</span>
            <span className="tracking-wide">YAYY! HAPPY BIRTHDAY SONAL!</span>
            <span>✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN STAGE: BIRTHDAY CARD & 3-TIER CAKE ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: The Personal Birthday Letter Card */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <AnimatePresence>
            {cardVisible && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden border-2 shadow-2xl p-7 sm:p-8 backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(20,12,30,0.92) 0%, rgba(12,6,18,0.96) 100%)',
                  borderColor: 'rgba(255,209,102,0.35)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 50px rgba(255,209,102,0.1)',
                }}
              >
                {/* Ribbon Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    background: 'linear-gradient(to right, #ff9aa2, #ffd166, #b5ead7, #c7ceea, #ff9aa2)',
                  }}
                />

                {/* Letter Header */}
                <div className="text-center mb-4 pb-3 border-b border-white/10">
                  <div className="text-[10px] font-mono tracking-[0.45em] text-amber-300/70 uppercase font-bold">
                    THE SONAL MUSEUM · PERMANENT MONOGRAPH
                  </div>
                </div>

                {/* Letter Body */}
                <div className="space-y-3 font-sans text-sm sm:text-base leading-relaxed text-slate-200">
                  <p>
                    When I first met you, I honestly thought you were just the super-studious girl who seemed to spend all day studying.
                  </p>
                  <p className="font-semibold text-white">
                    Then I got to know you.
                  </p>
                  <p>
                    And somewhere along the way, the building got a lot bigger.
                  </p>

                  {/* Character Facets List */}
                  <div className="py-2.5 px-4 rounded-2xl bg-black/40 border border-white/10 space-y-1 my-3 font-mono text-xs sm:text-sm">
                    <div className="text-cyan-300">· The architect.</div>
                    <div className="text-amber-300">· The writer.</div>
                    <div className="text-emerald-300">· The creator.</div>
                    <div className="text-rose-300">· The sarcastic one.</div>
                    <div className="text-purple-300">· The sleepy one.</div>
                    <div className="text-pink-300">· The person with an unreasonable amount of lore.</div>
                    <div className="text-amber-200 font-bold pt-1">· And just... Sonal. ✨</div>
                  </div>

                  {/* Birthday Wishing Sign-off */}
                  <div className="pt-3 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl font-display font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #ffd166, #ff9aa2, #c7ceea)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Happy Birthday! 🎂
                      </h3>
                      <p className="text-xs font-sans italic text-white/60 mt-0.5">
                        I'm glad I got to know the person beyond the façade.
                      </p>
                    </div>
                    <div className="text-xs font-mono text-amber-300/80 font-bold">
                      — Harleen
                    </div>
                  </div>
                </div>

                {/* Celebrate & Fireworks Action Button */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40">
                    PERMANENT COLLECTION COMPLETE
                  </span>

                  <button
                    onClick={handleCelebrate}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 hover:scale-105 active:scale-95 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-xl shadow-amber-500/30 flex items-center space-x-2 animate-pulse"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{celebrated ? '✨ FIREWORKS & CELEBRATE MORE!' : '🎉 CELEBRATE WITH FIREWORKS!'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Interactive 3-Tier Birthday Cake Installation */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="p-6 rounded-3xl bg-black/75 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-3">
            
            {/* Candle Flames Row */}
            <div className="flex items-end space-x-1.5 relative z-10">
              {CANDLES.map((candle, i) => (
                <div key={i} className="flex flex-col items-center">
                  {!candlesBlown ? (
                    <div className="animate-candle-flicker" style={{ animationDelay: candle.delay }}>
                      <svg width="10" height="16" viewBox="0 0 10 16">
                        <ellipse cx="5" cy="12" rx="3.5" ry="5" fill="#ffaa20" />
                        <ellipse cx="5" cy="8" rx="2" ry="4" fill="#fff7a0" />
                      </svg>
                    </div>
                  ) : (
                    <div style={{ height: '16px', width: '10px' }} />
                  )}
                  <div
                    style={{
                      width: '6px',
                      height: '16px',
                      background: `linear-gradient(to bottom, ${
                        ['#ff9aa2', '#ffd166', '#c7ceea', '#b5ead7', '#ffdac1', '#e2b36f', '#f9c74f'][
                          i % 7
                        ]
                      }, rgba(0,0,0,0.3))`,
                      borderRadius: '2px 2px 0 0',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* 3-Tier Cake SVG */}
            <svg width="160" height="110" viewBox="0 0 160 110">
              {/* Tier 3 */}
              <rect x="45" y="18" width="70" height="26" rx="3" fill="#6b3fa0" />
              <ellipse cx="80" cy="18" rx="35" ry="7" fill="white" />
              {[52, 60, 68, 76, 84, 92, 100, 108].map((x, i) => (
                <ellipse key={i} cx={x} cy={22} rx={3} ry={6 + (i % 3)} fill="white" />
              ))}

              {/* Tier 2 */}
              <rect x="25" y="44" width="110" height="30" rx="3" fill="#c2498f" />
              <ellipse cx="80" cy="44" rx="55" ry="8" fill="white" />
              {[32, 44, 56, 68, 80, 92, 104, 116, 128].map((x, i) => (
                <ellipse key={i} cx={x} cy={49} rx={3.5} ry={7 + (i % 3)} fill="white" />
              ))}

              {/* Tier 1 */}
              <rect x="5" y="74" width="150" height="32" rx="3" fill="#e2614a" />
              <ellipse cx="80" cy="74" rx="75" ry="9" fill="white" />
              {[12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144].map((x, i) => (
                <ellipse key={i} cx={x} cy={79} rx={3.5} ry={8 + (i % 3)} fill="white" />
              ))}
              <text
                x="80"
                y="96"
                textAnchor="middle"
                fontSize="9"
                fontFamily="Georgia, serif"
                fill="white"
                fontStyle="italic"
              >
                Happy Birthday!
              </text>

              {/* Base plate */}
              <ellipse cx="80" cy="107" rx="82" ry="6" fill="#1a1025" />
            </svg>

            {/* Blow Candles Action */}
            {!candlesBlown ? (
              <button
                onClick={handleBlowCandles}
                className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all"
              >
                🕯️ BLOW CANDLES
              </button>
            ) : (
              <div className="text-xs font-mono text-amber-200/90 italic">
                ✨ Make a wish, Sonal!
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── FOOTER: DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        <div>
          <span>LEVEL R: THE ROOFTOP SANCTUARY</span>
          <span className="mx-2">·</span>
          <span className="text-amber-300">CELEBRATION COMPLETE</span>
        </div>
        <div className="text-white/70 italic">
          "The final stop. The view. The message. The celebration."
        </div>
      </footer>
    </motion.div>
  );
};
