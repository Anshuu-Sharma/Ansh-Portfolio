"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type FallingWord = {
  id: number;
  text: string;
  xPosition: number; // percentage 10 to 90
  status: 'falling' | 'zapped';
};

const WORDS = [
  'admin', 'user123', 'select * from', 'password', 'hack3r', 
  '<script>', 'alert(1)', 'hello_world', '12345', 'DROP TABLE',
  '--sql', 'null', 'undefined', 'console.log()', '<h1>hi</h1>'
];

export default function RegexDefenderGame() {
  const [regexStr, setRegexStr] = useState<string>('');
  const [words, setWords] = useState<FallingWord[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const wordIdCount = useRef(0);

  // Spawn words
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setWords(prev => {
        // limit to 10 words max to prevent clutter
        if (prev.filter(w => w.status === 'falling').length > 10) return prev;
        
        const newWord: FallingWord = {
          id: wordIdCount.current++,
          text: WORDS[Math.floor(Math.random() * WORDS.length)],
          xPosition: 10 + Math.random() * 80,
          status: 'falling'
        };
        return [...prev, newWord];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Zap matching words
  useEffect(() => {
    if (!regexStr || !isRunning) return;

    try {
      const regex = new RegExp(regexStr); // user might type invalid regex, catch it
      setWords(prev => prev.map(w => {
        if (w.status === 'falling' && regex.test(w.text)) {
          return { ...w, status: 'zapped' };
        }
        return w;
      }));
    } catch (e) {
      // invalid regex, ignore
    }
  }, [regexStr, words, isRunning]); // check on every word spawn and regex change

  // Clean up words after animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWords(prev => prev.filter(w => w.id > wordIdCount.current - 15)); // Keep only recent to avoid memory leak, real cleanup is handled by AnimatePresence onExitComplete
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white">Regex Defender</h2>
          <p className="text-xs text-neutral-400 font-dm-mono">Zap the malicious payloads with Regex.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800 flex-grow md:flex-grow-0">
            <span className="text-neutral-500 font-dm-mono px-3 py-1.5 text-sm">/</span>
            <input
              type="text"
              value={regexStr}
              onChange={(e) => setRegexStr(e.target.value)}
              placeholder="\d+"
              className="bg-transparent border-none outline-none text-[#00c37b] font-dm-mono text-sm w-full md:w-32 placeholder-neutral-700"
            />
            <span className="text-neutral-500 font-dm-mono px-3 py-1.5 text-sm">/</span>
          </div>
          
          <button
            onClick={() => {
                if(!isRunning) setWords([]);
                setIsRunning(!isRunning);
            }}
            className={`px-6 py-2 rounded-lg font-bold text-sm tracking-wider transition-all shadow-lg shrink-0 ${
              isRunning 
                ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20' 
                : 'bg-[#00c37b] text-neutral-950 border border-[#00c37b] hover:bg-[#00e87a] shadow-[#00c37b]/20'
            }`}
          >
            {isRunning ? 'STOP' : 'START'}
          </button>
        </div>
      </div>

      {/* Arena */}
      <div className="flex-grow relative bg-neutral-950/50 rounded-xl border border-neutral-800/50 overflow-hidden p-4 min-h-[600px]">
        {/* Defender Turret (visual only) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-10 bg-neutral-800 rounded-t-full border-t border-x border-[#00c37b]/50 z-20 shadow-[0_0_20px_rgba(0,195,123,0.2)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#00c37b] animate-pulse" />
        </div>

        {/* Falling Words */}
        <div className="absolute inset-0 z-10 overflow-hidden">
            <AnimatePresence>
                {words.map(w => {
                    if (w.status === 'zapped') {
                        return (
                            <motion.div
                                key={`zap-${w.id}`}
                                initial={{ top: '50%', left: `${w.xPosition}%`, opacity: 1, scale: 1 }}
                                animate={{ opacity: 0, scale: 2 }}
                                transition={{ duration: 0.3 }}
                                className="absolute text-red-500 font-dm-mono text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.8)] z-30"
                            >
                                {w.text}
                            </motion.div>
                        );
                    }

                    return (
                        <motion.div
                            key={`fall-${w.id}`}
                            initial={{ top: '-10%', left: `${w.xPosition}%`, opacity: 1 }}
                            animate={{ top: '110%', opacity: 0.5 }}
                            transition={{ duration: 6, ease: "linear" }}
                            onAnimationComplete={() => {
                                setWords(prev => prev.filter(item => item.id !== w.id));
                            }}
                            className="absolute bg-neutral-900 border border-neutral-800 px-3 py-1 rounded text-neutral-300 font-dm-mono text-xs whitespace-nowrap"
                        >
                            {w.text}
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>

        {/* Laser beam rendering (simple CSS line to the latest zapped word, optional polish) */}
        {!isRunning && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-neutral-950/80 backdrop-blur-sm">
                <p className="text-neutral-500 font-dm-mono text-sm">Press START to drop payloads.</p>
            </div>
        )}
      </div>
    </div>
  );
}
