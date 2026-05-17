"use client";

import React, { useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { motion } from 'framer-motion';

const dummyProjects = [
  { title: "UIVERSE (3D UI)", description: "Create, share, and use beautiful custom elements made with CSS" },
  { title: "NEURO SYNC", description: "Brain-computer interface dashboard with real-time analytics" },
  { title: "QUANTUM LEAP", description: "A predictive model visualization tool built with WebGL" },
  { title: "ECHO COMMERCE", description: "Next-gen headless e-commerce storefront for luxury brands" },
  { title: "ORBITAL MAPS", description: "Interactive 3D planetary mapping and charting system" },
  { title: "SYNTH WAVE", description: "Audio visualization and generative music synthesizer app" }
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#fafaf9] text-black pt-36 pb-32 px-4 overflow-hidden font-inter">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Ambient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#00ff88]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#08e260]/10 to-transparent blur-[120px]" />
        
        {/* Subtle dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-black font-orbitron tracking-widest uppercase">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00894d] to-[#00ff88]">Archive</span>
          </h1>
          <p className="text-neutral-500 font-dm-mono max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A curated collection of digital experiences, interactive interfaces, and bleeding-edge web applications.
          </p>
        </motion.div>


        {/* Staggered Project Cards */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 place-items-center"
        >
          {dummyProjects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <ProjectCard title={project.title} description={project.description} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
