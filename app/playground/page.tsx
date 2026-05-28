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
    <main className="min-h-screen bg-neutral-950 text-neutral-200 pt-32 pb-24 px-4 md:px-8 font-manrope selection:bg-[#00c37b] selection:text-white overflow-hidden relative">
      {/* Dark theme background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00c37b]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] bg-[#00c37b]/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-full">
        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 tracking-wider">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c37b] to-[#00894d]">PLAYGROUND</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl text-[15px] leading-relaxed mx-auto md:mx-0">
            I don&apos;t just build systems—I play with them. Here are a few interactive simulations demonstrating core concepts in System Design, Algorithms, and AI.
          </p>
        </header>

        {/* Game Selector */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
          {games.map((game) => {
            const isActive = activeGame === game.id;
            return (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 overflow-hidden ${
                  isActive
                    ? 'text-white border-[#00c37b]/50 shadow-[0_0_20px_rgba(0,195,123,0.15)]'
                    : 'text-neutral-500 hover:text-neutral-300 border-neutral-800 hover:border-neutral-700 bg-neutral-900/50'
                } border`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-game-bg"
                    className="absolute inset-0 bg-[#00c37b]/10 z-0"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{game.icon}</span>
                <span className="relative z-10">{game.name}</span>
              </button>
            );
          })}
        </div>

        {/* Game Arena Container */}
        <div className="flex-grow min-h-[800px] w-full bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-4 md:p-8 relative overflow-hidden backdrop-blur-sm shadow-2xl">
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
