"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CommitsGrid } from "./commits-grid";

// SVG Path definitions for the curtain's states
const pathStates = {
  // Hidden at the top
  hidden: "M 0,0 C 25,0 75,0 100,0 L 100,0 C 75,0 25,0 0,0 Z",
  // Dropping down (bottom edge forms a fluid S-curve wave)
  dropping: "M 0,0 C 25,0 75,0 100,0 L 100,50 C 75,50 25,120 0,80 Z",
  // Fully covering the screen
  covered: "M 0,0 C 25,0 75,0 100,0 L 100,100 C 75,100 25,100 0,100 Z",
  // Continuing downward (top edge falls, revealing content behind it)
  lifting: "M 0,60 C 25,90 75,20 100,20 L 100,100 C 75,100 25,100 0,100 Z",
  // Completely fallen off the bottom
  done: "M 0,100 C 25,100 75,100 100,100 L 100,100 C 75,100 25,100 0,100 Z"
};

// Premium cinematic easing curve
const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Shadow Layer (falls first, lifts last)
const animLayer1 = {
  initial: { d: pathStates.hidden },
  enter: {
    d: [pathStates.hidden, pathStates.dropping, pathStates.covered],
    transition: { duration: 0.9, ease, times: [0, 0.6, 1] }
  },
  exit: {
    d: [pathStates.covered, pathStates.lifting, pathStates.done],
    transition: { duration: 0.9, ease, times: [0, 0.4, 1], delay: 0.05 }
  }
};

// Foreground Layer (falls slightly delayed, lifts first)
const animLayer2 = {
  initial: { d: pathStates.hidden },
  enter: {
    d: [pathStates.hidden, pathStates.dropping, pathStates.covered],
    transition: { duration: 0.9, ease, times: [0, 0.6, 1], delay: 0.05 }
  },
  exit: {
    d: [pathStates.covered, pathStates.lifting, pathStates.done],
    transition: { duration: 0.9, ease, times: [0, 0.4, 1] }
  }
};

export function CurtainTransition({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[99999] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }} // Keeps wrapper mounted while SVG exits
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Background/Shadow Layer */}
            <motion.path
              fill="#e0e0dc" // Slightly darker off-white for realistic depth
              variants={animLayer1}
              initial="initial"
              animate="enter"
              exit="exit"
            />
            {/* Foreground Layer */}
            <motion.path
              fill="#f8f8f6" // Premium soft off-white
              variants={animLayer2}
              initial="initial"
              animate="enter"
              exit="exit"
            />
          </svg>

          {/* Centered CommitsGrid Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 w-full"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.4, ease, delay: 0 } }}
          >
            <div className="w-full max-w-4xl mx-auto pointer-events-auto">
              <CommitsGrid text="ANSH" fastMode={true} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
