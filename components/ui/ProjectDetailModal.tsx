'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/projects';

const ProjectMediaCarousel = ({ media, color }: { media: NonNullable<Project['media']>; color: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const next = (e?: React.MouseEvent) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % media.length); };
  const prev = (e?: React.MouseEvent) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + media.length) % media.length); };

  if (!media || media.length === 0) return null;

  return (
    <>
      <div 
        className="relative w-full aspect-video border-[4px] border-[#0a0a0a] bg-black mb-8 group overflow-hidden shadow-[8px_8px_0_#0a0a0a] cursor-pointer"
        onClick={() => setIsFullScreen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {media[currentIndex].type === 'image' ? (
              <img src={media[currentIndex].url} alt={`Media ${currentIndex + 1}`} className="w-full h-full object-contain" />
            ) : (
              <video src={media[currentIndex].url} autoPlay loop muted playsInline className="w-full h-full object-contain pointer-events-none" />
            )}
          </motion.div>
        </AnimatePresence>
        
        {media.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#f5f5f0] border-2 border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a] flex items-center justify-center hover:bg-[#e8180a] hover:text-[#f5e642] transition-colors z-10 opacity-0 group-hover:opacity-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#f5f5f0] border-2 border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a] flex items-center justify-center hover:bg-[#e8180a] hover:text-[#f5e642] transition-colors z-10 opacity-0 group-hover:opacity-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" onClick={(e) => e.stopPropagation()}>
              {media.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-3 h-3 border-2 border-[#0a0a0a] ${currentIndex === idx ? 'bg-[#f5e642]' : 'bg-[#f5f5f0]'}`}
                  style={{ backgroundColor: currentIndex === idx ? color : '#f5f5f0' }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setIsFullScreen(false)}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-[#0a0a0a] border-2 border-white/20 hover:bg-[#e8180a] hover:border-[#0a0a0a] flex items-center justify-center transition-colors text-white hover:text-[#f5e642] shadow-[4px_4px_0_#000]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div 
              className="relative w-full max-w-7xl aspect-video p-4 md:p-8 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {media[currentIndex].type === 'image' ? (
                    <img src={media[currentIndex].url} alt={`Media ${currentIndex + 1}`} className="max-w-full max-h-full object-contain border-[4px] border-[#333]" />
                  ) : (
                    <video src={media[currentIndex].url} autoPlay loop muted playsInline controls className="max-w-full max-h-full object-contain border-[4px] border-[#333]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {media.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0a0a0a] border-2 border-white/20 shadow-[4px_4px_0_#000] flex items-center justify-center hover:bg-[#e8180a] hover:border-[#0a0a0a] text-white hover:text-[#f5e642] transition-colors z-10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0a0a0a] border-2 border-white/20 shadow-[4px_4px_0_#000] flex items-center justify-center hover:bg-[#e8180a] hover:border-[#0a0a0a] text-white hover:text-[#f5e642] transition-colors z-10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            data-lenis-prevent="true"
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container Wrapper for Centering */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl max-h-full bg-[#f5f5f0] border-[5px] border-[#0a0a0a] shadow-[12px_12px_0_#0a0a0a] overflow-hidden flex flex-col pointer-events-auto"
            >
            
            {/* Brutalist Header Banner */}
            <div 
                className="relative p-6 md:p-8 flex justify-between items-start shrink-0 border-b-[5px] border-[#0a0a0a] overflow-hidden"
                style={{ backgroundColor: project.color }}
            >
                {/* Background ID Watermark */}
                <div 
                    className="absolute right-[-10px] bottom-[-20px] text-[10rem] leading-[0.8] font-bebas-neue opacity-20 pointer-events-none text-black tracking-tighter"
                    style={{ fontFamily: 'var(--font-bebas-neue)' }}
                >
                    {project.id.padStart(2, '0')}
                </div>

                <div className="relative z-10 flex-1 pr-6">
                    <span 
                        className="inline-block bg-[#00e060] border-[3px] border-[#0a0a0a] shadow-[3px_3px_0_#0a0a0a] text-[#000] font-extrabold text-[0.65rem] tracking-[0.15em] px-2 py-1 uppercase mb-4"
                    >
                    ● {project.category}
                    </span>
                    <h2 
                        className="text-4xl md:text-6xl text-[#0a0a0a] leading-[0.9] tracking-[-0.01em] mb-2"
                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                    >
                    {project.title.toUpperCase()}
                    </h2>
                    <p className="text-[#0a0a0a] font-dm-mono font-bold text-sm md:text-base max-w-2xl bg-white/50 inline-block px-2 py-1 border-2 border-black mt-2">
                        {project.subtitle}
                    </p>
                </div>
                
                {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative z-10 mr-6 mt-1 hover:opacity-70 transition-opacity text-[#0a0a0a]"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="44" height="44">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                )}

                <button 
                    onClick={onClose}
                    className="relative z-10 w-12 h-12 bg-[#0a0a0a] hover:bg-[#e8180a] flex items-center justify-center transition-colors shrink-0 text-[#f5e642] hover:text-white border-2 border-[#0a0a0a] shadow-[4px_4px_0_#000]"
                >
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                </button>
            </div>

            {/* Scrollable Content */}
            <div 
              className="overflow-y-auto p-6 md:p-8 pt-6 flex-1 min-h-0 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-[#f5f5f0] [&::-webkit-scrollbar-thumb]:bg-[#0a0a0a] [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#f5f5f0]" 
              data-lenis-prevent="true"
            >
              {project.media && project.media.length > 0 && (
                <ProjectMediaCarousel media={project.media} color={project.color} />
              )}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                {/* Left Column */}
                <div className="space-y-10">
                  {/* Description */}
                  <section>
                    <p className="text-[#0a0a0a] font-inter font-medium leading-relaxed whitespace-pre-wrap text-[0.95rem] border-l-[5px] border-[#e8180a] pl-4">
                      {project.description}
                    </p>
                  </section>

                  {/* Impact / Resume Bullets */}
                  <section>
                    <h3 
                        className="text-2xl text-[#0a0a0a] mb-5 tracking-wide"
                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                    >
                        IMPACT & IMPLEMENTATION
                    </h3>
                    <ul className="space-y-5">
                      {project.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-[#0a0a0a] font-inter leading-relaxed text-[0.9rem] font-medium">
                          <span className="mt-1 w-3 h-3 bg-[#0a0a0a] shrink-0 border-2 border-[#f5e642]" />
                          <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold bg-[#f5e642]/50 px-1">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Tech Stack */}
                  <section className="bg-white border-[3px] border-[#0a0a0a] p-5 shadow-[4px_4px_0_#0a0a0a]">
                    <h3 
                        className="text-xl text-[#0a0a0a] mb-4 tracking-wide"
                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                    >
                        TECH STACK
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-[#f5f5f0] border-[2px] border-[#0a0a0a] text-[#0a0a0a] text-[0.65rem] font-bold font-dm-mono uppercase tracking-widest shadow-[2px_2px_0_#0a0a0a]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Tech Concepts */}
                  <section className="bg-[#0a0a0a] p-5 border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#00e060]">
                    <h3 
                        className="text-xl text-[#00e060] mb-4 tracking-wide"
                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                    >
                        ARCHITECTURE & CONCEPTS
                    </h3>
                    <ul className="space-y-3">
                      {project.techConcepts.map((concept, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#f5f5f0] font-dm-mono font-medium">
                          <span className="text-[#00e060] font-bold">›</span>
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Actions */}
                  {project.liveUrl && (
                    <section>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-4 border-[4px] border-[#0a0a0a] font-bebas-neue text-2xl tracking-[0.1em] text-[#f5e642] bg-[#0a0a0a] hover:bg-[#f5e642] hover:text-[#0a0a0a] transition-colors shadow-[6px_6px_0_#00e060]"
                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                      >
                        + VIEW LIVE DEPLOYMENT
                      </a>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
