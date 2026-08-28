import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { FICTIONAL_LIBRARY_BOOKS } from '../../data/museumData';
import { soundEngine } from '../../audio/soundEngine';

interface Gallery5AcademicProps {
  onNext: () => void;
}

export const Gallery5Academic: React.FC<Gallery5AcademicProps> = ({ onNext }) => {
  const [selectedBook, setSelectedBook] = useState<number | null>(0);
  const [timeStage, setTimeStage] = useState<number>(0);

  const timeStages = [
    { time: '22:30', status: 'Studying ML Aggarwal MCQs', remark: '"Just finishing this chapter."' },
    { time: '00:00', status: 'GMD Isometric Projections', remark: '"I will shut down in 5 mins."' },
    { time: '01:47', status: 'Analyzing Car Logos for NATA', remark: '"Subject continues studying anyway 💀"' },
  ];

  const handleNextTime = () => {
    soundEngine.playInspect();
    setTimeStage((timeStage + 1) % timeStages.length);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2">
          <span className="text-museum-accent font-bold">GALLERY 05 // SECTOR: ACA-05</span>
          <span>•</span>
          <span>THE ACADEMIC WING</span>
        </div>
        <div className="text-right text-cyan-400">THE MIDNIGHT STUDY VAULT</div>
      </div>

      {/* Main Content */}
      <div className="my-6 space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            HIGH-DENSITY LIBRARY & STUDY CARREL
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The Academic Wing: Mathematics, Entrance Prep & 01:47 AM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono">
            Documenting intense preparation, ML Aggarwal problem sets, spatial aptitude, and the legendary 5-minute shutdown postponement.
          </p>
        </div>

        {/* Study Desk Clock & Bookshelf Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Midnight Study Clock & Status Station */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#18202b] to-[#0f141a] border-2 border-cyan-500/30 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>NOCTURNAL TIME RECORDER</span>
                </span>
                <span className="text-xs font-mono text-amber-400 animate-pulse">● LOGGED</span>
              </div>

              {/* Glowing Digital Clock */}
              <div className="text-center py-4 bg-black/60 rounded-xl border border-white/10 shadow-inner">
                <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest text-cyan-300 text-shadow">
                  {timeStages[timeStage].time}
                </div>
                <div className="text-xs font-mono text-white/50 mt-1">MIDNIGHT STUDY CARREL</div>
              </div>

              {/* Status readout */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-white/40">ACTIVITY:</span>
                  <span className="text-white font-medium">{timeStages[timeStage].status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">SUBJECT STATEMENT:</span>
                  <span className="text-amber-300 font-semibold">{timeStages[timeStage].remark}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">TIREDNESS INDEX:</span>
                  <span className="text-rose-400 font-bold">CRITICAL // YET UNSTOPPABLE</span>
                </div>
              </div>

              {/* Time Stepper Button */}
              <button
                onClick={handleNextTime}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>ADVANCE MIDNIGHT CLOCK ({timeStage + 1}/3)</span>
              </button>
            </div>

            {/* Respectful Humor Note */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-white/60 space-y-1">
              <div className="text-museum-accent font-semibold flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>ARCHIVAL RESEARCH NOTE</span>
              </div>
              <p>
                Not a glorification of burnout, but a genuine testament: she pushes hard, cares deeply about her craft, and maintains an extraordinary work ethic.
              </p>
            </div>
          </div>

          {/* Right Column: Fictionalized Curatorial Bookshelf */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center space-x-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE ACADEMIC ARCHIVE (CLICK SPINES TO INSPECT)</span>
            </div>

            <div className="space-y-3">
              {FICTIONAL_LIBRARY_BOOKS.map((book, idx) => {
                const isSelected = selectedBook === idx;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      soundEngine.playInspect();
                      setSelectedBook(isSelected ? null : idx);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#182330] border-cyan-400 shadow-lg shadow-cyan-500/10'
                        : 'bg-[#11171f] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: book.accentColor }}
                          />
                          <h4 className="text-sm font-display font-bold text-white">
                            {book.title}
                          </h4>
                        </div>
                        <div className="text-xs font-mono text-cyan-300/80">
                          {book.subtitle}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-white/40 uppercase">
                        VOL. 0{idx + 1}
                      </span>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-white/10 text-xs font-mono text-slate-300 space-y-1.5"
                      >
                        <div className="text-white/40 text-[10px]">CURATOR'S ANNOTATION:</div>
                        <p className="italic text-amber-200/90 leading-relaxed">
                          "{book.notes}"
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">
          NEXT: THE ARCHIVE OF SMALL THINGS
        </span>

        <button
          onClick={() => {
            soundEngine.playTransition();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-museum-accent text-museum-bg font-mono font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all flex items-center space-x-2 shadow-lg shadow-museum-accent/10"
        >
          <span>ENTER ARCHIVE OF SMALL THINGS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
