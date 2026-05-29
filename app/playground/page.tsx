"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadBalancerGame from '@/components/playground/LoadBalancerGame';
import PathfindingGame from '@/components/playground/PathfindingGame';

const games = [
  { id: 'load-balancer', name: 'The Load Balancer', icon: '🔀' },
  { id: 'pathfinding', name: 'Algorithm Visualizer', icon: '🗺️' },
];

export default function PlaygroundPage() {
  const [activeGame, setActiveGame] = useState(games[0].id);

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-[#0a0a0a] pt-32 pb-24 px-4 md:px-8 font-manrope selection:bg-[#00e060] selection:text-[#0a0a0a] overflow-hidden relative">
      {/* Brutalist background effects (subtle dots) */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #0a0a0a 2px, transparent 2px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-full">
        {/* Header */}
        <header className="mb-12 text-center md:text-left relative z-10">
          <h1 
              className="text-6xl md:text-8xl text-[#0a0a0a] mb-4 tracking-[-0.02em] leading-none"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            THE <span className="bg-[#00e060] px-2 border-4 border-[#0a0a0a] shadow-[6px_6px_0_#0a0a0a]">PLAYGROUND</span>
          </h1>
          <p className="text-[#0a0a0a] font-bold font-dm-mono max-w-2xl text-[14px] leading-relaxed mx-auto md:mx-0 mt-6 bg-white p-4 border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a]">
            I don&apos;t just build systems—I play with them. Here are a few interactive simulations demonstrating core concepts in System Design, Algorithms, and AI.
          </p>
        </header>

        {/* Game Selector */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start relative z-10">
          {games.map((game) => {
            const isActive = activeGame === game.id;
            return (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`relative px-6 py-3 font-bold font-dm-mono uppercase tracking-widest text-[13px] transition-all duration-200 flex items-center gap-3 border-[3px] border-[#0a0a0a] ${
                  isActive
                    ? 'bg-[#00e060] text-[#0a0a0a] translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0_#0a0a0a]'
                    : 'bg-white text-[#0a0a0a] shadow-[6px_6px_0_#0a0a0a] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#0a0a0a] hover:bg-[#f5e642]'
                }`}
              >
                <span className="relative z-10 text-xl">{game.icon}</span>
                <span className="relative z-10">{game.name}</span>
              </button>
            );
          })}
        </div>

        {/* Game Arena Container */}
        <div className="flex-grow min-h-[800px] w-full bg-white border-[4px] border-[#0a0a0a] shadow-[12px_12px_0_#0a0a0a] p-4 md:p-8 relative overflow-hidden z-10">
          <AnimatePresence mode="wait">
            {activeGame === 'load-balancer' && (
              <motion.div
                key="load-balancer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <LoadBalancerGame />
              </motion.div>
            )}
            {activeGame === 'pathfinding' && (
              <motion.div
                key="pathfinding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <PathfindingGame />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
