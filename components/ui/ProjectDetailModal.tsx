'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/projects';

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
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container Wrapper for Centering */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl max-h-full bg-[#0a0a0a]/95 border border-white/10 rounded-3xl overflow-hidden flex flex-col pointer-events-auto"
              style={{ 
                boxShadow: `0 20px 80px -20px ${project.color}30, 0 0 0 1px ${project.color}20 inset`
              }}
            >
            {/* Header */}
            <div className="relative p-6 md:p-8 pb-4 flex justify-between items-start border-b border-white/5 shrink-0">
              <div>
                <span 
                  className="font-dm-mono text-xs uppercase tracking-[0.2em] mb-3 block"
                  style={{ color: project.color }}
                >
                  {project.category}
                </span>
                <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                  {project.title}
                </h2>
                <p className="text-white/60 font-inter text-sm md:text-base max-w-2xl">
                  {project.subtitle}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0 text-white/70 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div 
              className="overflow-y-auto p-6 md:p-8 pt-6 flex-1 min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20" 
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
              data-lenis-prevent="true"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                {/* Left Column */}
                <div className="space-y-10">
                  {/* Description */}
                  <section>
                    <p className="text-white/80 font-inter leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </section>

                  {/* Tech Stack */}
                  <section>
                    <h3 className="font-dm-mono text-xs uppercase tracking-[0.15em] text-white/40 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-dm-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Impact / Resume Bullets */}
                  <section>
                    <h3 className="font-dm-mono text-xs uppercase tracking-[0.15em] text-white/40 mb-4">Impact & Implementation</h3>
                    <ul className="space-y-4">
                      {project.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/80 font-inter leading-relaxed text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                          <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Tech Concepts */}
                  <section className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                    <h3 className="font-dm-mono text-xs uppercase tracking-[0.15em] text-white/40 mb-5">Architecture & Concepts</h3>
                    <ul className="space-y-4 relative before:absolute before:inset-y-2 before:left-1.5 before:w-px before:bg-white/10">
                      {project.techConcepts.map((concept, idx) => (
                        <li key={idx} className="relative pl-6 text-sm text-white/70 font-inter">
                          <span className="absolute left-[3px] top-2 w-1.5 h-1.5 rounded-full -translate-x-1/2" style={{ backgroundColor: project.color }} />
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
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-dm-mono text-sm tracking-widest text-black bg-white hover:bg-white/90 transition-colors"
                      >
                        VIEW LIVE ↗
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
