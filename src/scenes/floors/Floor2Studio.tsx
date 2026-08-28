import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { OrigamiSwan3D } from '../../components/3d/OrigamiSwan3D';
import { Sparkles, Compass, BookOpen, Layers, Scissors, Flame, Image as ImageIcon, Citrus, Clock, Hammer } from 'lucide-react';

interface Floor2Props {
  onElevator: () => void;
  onUnlockEgg?: (id: string) => void;
}

interface Exhibit {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string[];
  specs?: { label: string; value: string }[];
  image?: string;
  hasRealComparison?: boolean;
  isWIP?: boolean;
  eggId?: string;
  color: string;
}

const STUDIO_EXHIBITS: Exhibit[] = [
  {
    id: 'swan-centerpiece',
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    label: 'MASTERPIECE EXHIBIT 01',
    title: 'THE MODULAR ORIGAMI SWAN',
    body: [
      'Handcrafted from hundreds of interlocking golden-yellow triangular paper modules.',
      'Features stepped wing arches, a segmented ring S-curve neck, and a sharp pointed cone beak.',
      '',
      'Structural Logic: Friction-fit modular tessellation without adhesive.',
      'Artist: Sonal.',
    ],
    specs: [
      { label: 'Medium', value: 'Golden-Yellow Folded Paper Units' },
      { label: 'Beak Geometry', value: 'Pointed Cone Beak' },
      { label: 'Assembly', value: 'Modular 3D Origami Interlocking' },
      { label: 'Artist', value: 'Sonal' },
    ],
    image: '/images/real-origami-swan.jpg',
    hasRealComparison: true,
    eggId: 'egg-gmd-infinite',
    color: '#f59e0b',
  },
  {
    id: 'horned-volcano',
    icon: <Flame className="w-5 h-5 text-rose-500" />,
    label: 'SCULPTURAL INSTALLATION 02',
    title: 'THE HORNED VOLCANO',
    body: [
      'A legendary handmade clay artifact representing a volcanic caldera flanked by two mythical horns.',
      'Lava channels and magma fissure cracks radiate outwards across a scorched dark bedrock plinth.',
      '',
      'Lore: Built during a burst of creative passion, it stands as one of Sonal’s most distinctive handmade creations.',
    ],
    specs: [
      { label: 'Sculptural Form', value: 'Two-Horned Magma Caldera' },
      { label: 'Medium', value: 'Molded Clay, Acrylic Lava Veins' },
      { label: 'Story Status', value: 'Top-Tier Personal Lore' },
      { label: 'Artist', value: 'Sonal' },
    ],
    image: '/images/real-horned-volcano.jpg',
    hasRealComparison: true,
    color: '#f43f5e',
  },
  {
    id: 'fruits-on-plate',
    icon: <Citrus className="w-5 h-5 text-lime-400" />,
    label: 'FORTHCOMING MASTERPIECE 03',
    title: 'FRUITS ON A PLATE (ORIGAMI TRIANGLES)',
    body: [
      'A brand new 3D modular origami still-life composition featuring assorted fruits resting on an origami plate.',
      'Designed and folded entirely from interlocking triangular paper modules.',
      '',
      'Status: Currently being folded and assembled in Sonal’s creative studio atelier.',
      'Will be unveiled and installed in the permanent studio collection soon!',
    ],
    specs: [
      { label: 'Composition', value: 'Origami Fruits & Decorative Plate' },
      { label: 'Medium', value: 'Modular Triangular Paper Units' },
      { label: 'Current Phase', value: 'Under Active Construction 🔨' },
      { label: 'Availability', value: 'Arriving in Studio Soon' },
      { label: 'Artist', value: 'Sonal' },
    ],
    isWIP: true,
    color: '#84cc16',
  },
  {
    id: 'sketch-board',
    icon: <Compass className="w-5 h-5 text-cyan-400" />,
    label: 'TECHNICAL ARCHIVE 04',
    title: 'GMD DRAFTING SHEETS',
    body: [
      'GMD technical drafting sheets dating back to Class 9.',
      'Conic sections, orthographic projections, T-squares, and precise 0.5mm guide lines.',
      '',
      'The foundation of an architectural mind.',
    ],
    specs: [
      { label: 'Standard', value: 'GMD Geometric Technical Drawing' },
      { label: 'Tools', value: 'T-Square, 2H Lead, Compass' },
      { label: 'Era', value: 'Class 9 — Present' },
    ],
    eggId: 'egg-gmd-infinite',
    color: '#06b6d4',
  },
  {
    id: 'notebook',
    icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
    label: 'CLASSIFIED ARTIFACT 05',
    title: 'THE CREATIVE LOGBOOK',
    body: [
      'Private notebook filled with architectural layouts, midnight thoughts, and character sketches.',
      '',
      'Status: Restricted Access.',
      'Observation: Where stories and structures are born.',
    ],
    specs: [
      { label: 'Classification', value: 'Eyes Only' },
      { label: 'Ink Type', value: 'Black Micron Fineliner' },
    ],
    color: '#818cf8',
  },
  {
    id: 'paper-scraps',
    icon: <Scissors className="w-5 h-5 text-emerald-400" />,
    label: 'PROCESS FRAGMENTS 06',
    title: 'STUDIO CUTTINGS & SCATTER',
    body: [
      'Test paper cuts, trial folds, and prototype fragments.',
      'Every finished sculpture represents dozens of quiet experimental iterations.',
    ],
    specs: [
      { label: 'Process', value: 'Iterative Paper Engineering' },
      { label: 'Result', value: 'Excellence' },
    ],
    color: '#10b981',
  },
];

export const Floor2Studio: React.FC<Floor2Props> = ({ onElevator, onUnlockEgg }) => {
  const [selected, setSelected] = useState<Exhibit | null>(null);
  const [activeView, setActiveView] = useState<'3d' | 'real-swan' | 'volcano' | 'fruits-wip' | 'all'>('3d');

  const handleExhibitClick = (exhibit: Exhibit) => {
    soundEngine.playInspect();
    setSelected(exhibit);
    if (exhibit.eggId && onUnlockEgg) {
      soundEngine.playSecretUnlock();
      onUnlockEgg(exhibit.eggId);
    }
  };

  return (
    <motion.div
      key="floor2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="scene-container overflow-y-auto scene-scrollable flex flex-col justify-between text-white"
      style={{ background: '#090e15' }}
    >
      {/* ── PHOTOREALISTIC STUDIO WORKSHOP BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/studio-workshop.jpg"
          alt="The Sonal Museum Creative Studio Workshop"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.82) contrast(1.1)',
          }}
        />
        {/* Atelier Lighting Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(6,10,16,0.75) 0%, rgba(6,10,16,0.15) 35%, rgba(6,10,16,0.4) 65%, rgba(6,10,16,0.94) 100%),
              radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,7,12,0.65) 100%)
            `,
          }}
        />
      </div>

      {/* ── TOP HEADER ── */}
      <header className="relative z-10 pt-8 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-amber-300 font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>STAGE 3 · FLOOR 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Studio & Material Lab
          </h1>
          <p className="text-xs font-mono text-white/60 mt-0.5">
            ORIGAMI SWAN · HORNED VOLCANO · FRUITS ON A PLATE (WIP) · GMD DRAFTING
          </p>
        </div>

        {/* Elevator Button */}
        <button
          onClick={() => {
            soundEngine.playTransition();
            onElevator();
          }}
          className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-400/60 font-mono text-xs text-white/80 hover:text-white tracking-wider uppercase transition-all backdrop-blur-md flex items-center space-x-2 w-fit shadow-xl"
        >
          <span>ELEVATOR ↑</span>
        </button>
      </header>

      {/* ── MAIN STUDIO STAGE & EXHIBIT CONTROLS ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-8 space-y-6">
        
        {/* Interactive View Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-amber-300/80 font-bold uppercase tracking-wider">
              SELECT EXHIBITION VIEW:
            </span>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => {
                setActiveView('3d');
                soundEngine.playInspect();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 ${
                activeView === '3d'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D SWAN MODEL</span>
            </button>

            <button
              onClick={() => {
                setActiveView('real-swan');
                soundEngine.playInspect();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 ${
                activeView === 'real-swan'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>REAL SWAN PHOTO</span>
            </button>

            <button
              onClick={() => {
                setActiveView('volcano');
                soundEngine.playInspect();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 ${
                activeView === 'volcano'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>HORNED VOLCANO</span>
            </button>

            <button
              onClick={() => {
                setActiveView('fruits-wip');
                soundEngine.playInspect();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 ${
                activeView === 'fruits-wip'
                  ? 'bg-lime-500/20 text-lime-300 border border-lime-500/50 shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Citrus className="w-3.5 h-3.5" />
              <span>FRUITS (WIP) 🔨</span>
            </button>

            <button
              onClick={() => {
                setActiveView('all');
                soundEngine.playInspect();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 ${
                activeView === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ALL ARTIFACTS</span>
            </button>
          </div>
        </div>

        {/* ── ACTIVE VIEW CONTAINER ── */}
        {activeView === '3d' && (
          <div className="space-y-6">
            {/* Interactive 3D Model Plinth */}
            <div className="relative">
              <OrigamiSwan3D
                onInteract={() => {
                  if (onUnlockEgg) onUnlockEgg('egg-gmd-infinite');
                }}
              />
            </div>

            {/* Plaque Note */}
            <div className="p-4 rounded-2xl bg-black/65 border border-amber-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-mono font-bold text-amber-200">
                    INTERACTIVE 3D VIRTUAL RECONSTRUCTION
                  </div>
                  <div className="text-xs font-sans text-white/70">
                    Golden paper units with pointed beak. Drag to orbit 360° or toggle CAD Wireframe mode.
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleExhibitClick(STUDIO_EXHIBITS[0])}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase transition-all whitespace-nowrap"
              >
                INSPECT SPECIFICATIONS →
              </button>
            </div>
          </div>
        )}

        {activeView === 'real-swan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Real Swan Photo Card */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl relative group">
              <img
                src="/images/real-origami-swan.jpg"
                alt="Sonal's Real Handcrafted Modular Origami Swan"
                className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-amber-500/90 text-black font-bold uppercase tracking-wider">
                  AUTHENTIC ARTIFACT PHOTO
                </span>
                <p className="text-white/90 text-sm font-sans mt-2">
                  Photographed in the studio: Sonal’s genuine modular origami swan with pointed beak and crafting scissors in background.
                </p>
              </div>
            </div>

            {/* Description & Technical Breakdown */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-black/70 border border-amber-500/30 backdrop-blur-md space-y-4 shadow-2xl">
              <div className="pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold">
                  STUDIO ARCHIVE · VERIFIED ARTIFACT
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  The Real Handcrafted Swan
                </h3>
              </div>

              <p className="text-xs font-mono text-slate-200 leading-relaxed">
                Assembled entirely by hand using yellow triangular origami paper units folded and locked into place one by one.
              </p>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs font-mono">
                <div className="text-[10px] text-white/40 font-bold uppercase">PHYSICAL ATTRIBUTES</div>
                <div className="flex justify-between">
                  <span className="text-white/50">Fold Technique:</span>
                  <span className="text-amber-200">3D Triangular Modular</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Mouth Finish:</span>
                  <span className="text-amber-200">Sharp Pointed Beak Cone</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Original Creator:</span>
                  <span className="text-amber-200">Sonal</span>
                </div>
              </div>

              <button
                onClick={() => setActiveView('3d')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs font-bold tracking-wider uppercase shadow-xl hover:scale-[1.02] transition-all"
              >
                COMPARE WITH 3D LIVE MODEL →
              </button>
            </div>
          </div>
        )}

        {activeView === 'volcano' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Horned Volcano Photo Card */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-rose-500/40 shadow-2xl relative group">
              <img
                src="/images/real-horned-volcano.jpg"
                alt="Sonal's Handcrafted Horned Volcano Sculpture"
                className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold uppercase tracking-wider">
                  CLAY SCULPTURAL ARTIFACT
                </span>
                <p className="text-white/90 text-sm font-sans mt-2">
                  "The Horned Volcano" — sculpted caldera with glowing magma crater, twin horned peaks, and radiating lava fissures.
                </p>
              </div>
            </div>

            {/* Horned Volcano Lore Card */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-black/70 border border-rose-500/30 backdrop-blur-md space-y-4 shadow-2xl">
              <div className="pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-rose-400 uppercase font-bold">
                  SCULPTURAL INSTALLATION 02
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  The Horned Volcano
                </h3>
              </div>

              <p className="text-xs font-mono text-slate-200 leading-relaxed">
                A handcrafted clay sculpture featuring a glowing magma basin and two mythical horns rising from the crater walls, complete with crackling lava veins spreading onto the stone base.
              </p>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20 space-y-2 text-xs font-mono">
                <div className="text-[10px] text-rose-300 font-bold uppercase">LORE RECORD</div>
                <p className="text-xs font-sans text-rose-200/90 italic leading-relaxed">
                  "Legend states this volcano erupted during a high-stakes creative deadline. The two horns symbolize unyielding creative power."
                </p>
              </div>

              <button
                onClick={() => handleExhibitClick(STUDIO_EXHIBITS[1])}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-xl hover:scale-[1.02] transition-all"
              >
                INSPECT FULL SCULPTURAL METRICS →
              </button>
            </div>
          </div>
        )}

        {/* Forthcoming Fruits on a Plate WIP View */}
        {activeView === 'fruits-wip' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* WIP Drafting Blueprint Board */}
            <div
              className="lg:col-span-7 rounded-3xl p-8 border-2 border-lime-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[420px]"
              style={{
                background: 'linear-gradient(135deg, rgba(20,30,15,0.95) 0%, rgba(10,18,8,0.98) 100%)',
                backgroundImage: `
                  repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(132,204,22,0.06) 39px, rgba(132,204,22,0.06) 40px),
                  repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(132,204,22,0.06) 39px, rgba(132,204,22,0.06) 40px)
                `,
              }}
            >
              {/* Top Banner */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-lime-500/20 border border-lime-500/40 text-lime-300 text-xs font-mono font-bold">
                  <Hammer className="w-3.5 h-3.5 animate-bounce" />
                  <span>UNDER ACTIVE CONSTRUCTION</span>
                </div>
                <span className="text-xs font-mono text-lime-400/60 font-semibold">
                  CATALOGUE #WIP-FRUITS-06
                </span>
              </div>

              {/* Central Blueprint Still-Life Sketch Illustration */}
              <div className="my-auto py-6 text-center flex flex-col items-center space-y-3">
                <div className="w-24 h-24 rounded-3xl bg-lime-950/60 border border-lime-500/40 flex items-center justify-center shadow-xl shadow-lime-500/10">
                  <Citrus className="w-12 h-12 text-lime-400 animate-pulse" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Fruits on a Plate
                </h3>
                <p className="text-xs font-mono text-lime-300/80 max-w-md">
                  Modular 3D Origami Triangle Still-Life Composition
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="p-4 rounded-2xl bg-black/50 border border-lime-500/20 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2 text-white/70">
                  <Clock className="w-4 h-4 text-lime-400" />
                  <span>Folding in progress in Sonal's studio atelier</span>
                </div>
                <span className="text-lime-300 font-bold">ARRIVING SOON</span>
              </div>
            </div>

            {/* Forthcoming Information Card */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-black/70 border border-lime-500/30 backdrop-blur-md space-y-4 shadow-2xl">
              <div className="pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase font-bold">
                  FORTHCOMING MASTERPIECE 03
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  Origami Triangle Still-Life
                </h3>
              </div>

              <p className="text-xs font-mono text-slate-200 leading-relaxed">
                A new complex 3D modular origami still-life composition featuring assorted fruits resting on an origami plate, crafted entirely from interlocking folded paper triangles.
              </p>

              <div className="p-4 rounded-2xl bg-lime-950/30 border border-lime-500/20 space-y-2 text-xs font-mono">
                <div className="text-[10px] text-lime-300 font-bold uppercase">STUDIO DISCLOSURE</div>
                <p className="text-xs font-sans text-lime-200/90 italic leading-relaxed">
                  "Currently being folded and assembled in Sonal's creative studio atelier. Will be unveiled and added to the permanent museum collection soon!"
                </p>
              </div>

              <button
                onClick={() => handleExhibitClick(STUDIO_EXHIBITS[2])}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-lime-400 to-lime-500 text-black font-mono text-xs font-bold tracking-wider uppercase shadow-xl hover:scale-[1.02] transition-all"
              >
                VIEW CURATORIAL PREVIEW CARD →
              </button>
            </div>
          </div>
        )}

        {activeView === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STUDIO_EXHIBITS.map((exhibit, idx) => (
              <motion.div
                key={exhibit.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => handleExhibitClick(exhibit)}
                className="cursor-pointer rounded-3xl p-6 border transition-all relative overflow-hidden group shadow-2xl flex flex-col justify-between min-h-[260px] backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(20,25,35,0.92) 0%, rgba(10,14,20,0.96) 100%)',
                  borderColor: `${exhibit.color}35`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ background: `linear-gradient(to right, transparent, ${exhibit.color}80, transparent)` }}
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="p-2.5 rounded-xl border"
                      style={{
                        background: `${exhibit.color}15`,
                        borderColor: `${exhibit.color}30`,
                      }}
                    >
                      {exhibit.icon}
                    </div>
                    
                    {exhibit.isWIP ? (
                      <span className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-300 font-bold border border-lime-500/40 animate-pulse">
                        WIP · SOON 🔨
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">
                        {exhibit.label.split('·')[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {exhibit.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-300/70 line-clamp-3 leading-relaxed">
                    {exhibit.body[0]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-4">
                  <span className="text-white/40">
                    {exhibit.isWIP ? 'FORTHCOMING ARTIFACT' : 'STUDIO ARTIFACT'}
                  </span>
                  <span style={{ color: exhibit.color }} className="font-bold group-hover:underline flex items-center space-x-1">
                    <span>INSPECT</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER: DESIGN LANGUAGE ── */}
      <footer className="relative z-10 pb-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        <div>
          <span>LEVEL 2: THE STUDIO & CRAFT LAB</span>
          <span className="mx-2">·</span>
          <span className="text-amber-300">6 CURATED ARTIFACTS</span>
        </div>
        <div className="text-white/70 italic">
          "Where geometry transforms into sculpture and stories."
        </div>
      </footer>

      {/* ── DETAIL INSPECTION MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl p-8 border shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #151c28 0%, #0c1018 100%)',
                borderColor: `${selected.color}50`,
                boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px ${selected.color}15`,
              }}
            >
              <div className="pb-4 mb-4 border-b border-white/10">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase font-bold"
                  style={{ color: selected.color }}
                >
                  {selected.label}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  {selected.title}
                </h3>
              </div>

              {selected.image && (
                <div className="mb-5 rounded-2xl overflow-hidden border border-white/15 h-48 relative">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/90">
                    REAL HANDMADE PHOTO
                  </div>
                </div>
              )}

              <div className="space-y-2.5 mb-6">
                {selected.body.map((line, i) => (
                  <p
                    key={i}
                    className={`text-sm font-mono leading-relaxed ${
                      line === '' ? 'h-2' : 'text-slate-200'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {selected.specs && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 mb-6">
                  <div className="text-[10px] font-mono text-white/40 tracking-wider uppercase font-semibold">
                    TECHNICAL DATA & PROVENANCE
                  </div>
                  {selected.specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-mono">
                      <span className="text-white/50">{s.label}:</span>
                      <span className="text-amber-200 font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all"
                  style={{
                    background: `${selected.color}20`,
                    borderColor: `${selected.color}40`,
                    color: selected.color,
                    borderWidth: '1px',
                  }}
                >
                  [ CLOSE ARTIFACT ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
