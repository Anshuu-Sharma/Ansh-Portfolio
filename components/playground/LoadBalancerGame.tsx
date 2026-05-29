"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type ServerNode = {
  id: number;
  status: 'active' | 'down' | 'overloaded';
  queue: number;
  xPct: number;
  yPct: number;
};

type RequestParticle = {
  id: number;
  targetNodeId: number;
};

const MAX_QUEUE = 10;
const PROCESSING_SPEED_MS = 600; 
const SPAWN_RATE_MS = 300; 
const ANIMATION_DURATION_MS = 500;
const NUM_SERVERS = 6;

// Pre-calculate positions in a circle
const generateNodes = (): ServerNode[] => {
  const nodes: ServerNode[] = [];
  for (let i = 0; i < NUM_SERVERS; i++) {
    // Start at top (-90 degrees)
    const angle = (i * (Math.PI * 2)) / NUM_SERVERS - Math.PI / 2;
    // Radius is 33% of the container to leave room for the larger nodes
    const r = 33; 
    const xPct = 50 + r * Math.cos(angle);
    const yPct = 50 + r * Math.sin(angle);
    
    nodes.push({
      id: i,
      status: 'active',
      queue: 0,
      xPct,
      yPct
    });
  }
  return nodes;
};

export default function LoadBalancerGame() {
  const [nodes, setNodes] = useState<ServerNode[]>(generateNodes());
  const [algorithm, setAlgorithm] = useState<'round-robin' | 'least-connections'>('round-robin');
  const [isRunning, setIsRunning] = useState(false);
  const [autoScale, setAutoScale] = useState(false);
  const [isSpiking, setIsSpiking] = useState(false);
  
  const requestCount = useRef(0);
  const rrIndex = useRef(0);
  const [particles, setParticles] = useState<RequestParticle[]>([]);

  // Spawn requests
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setNodes(currentNodes => {
        const activeNodes = currentNodes.filter(n => n.status === 'active');
        if (activeNodes.length === 0) return currentNodes; // All down

        let targetNodeId = -1;
        
        if (algorithm === 'round-robin') {
          let safety = 0;
          do {
            rrIndex.current = (rrIndex.current + 1) % currentNodes.length;
            safety++;
          } while (currentNodes[rrIndex.current].status !== 'active' && safety < 10);
          targetNodeId = currentNodes[rrIndex.current].id;
        } else {
          // least connections
          let minQueue = Infinity;
          activeNodes.forEach(n => {
            if (n.queue < minQueue) {
              minQueue = n.queue;
              targetNodeId = n.id;
            }
          });
        }

        if (targetNodeId !== -1) {
          const pId = requestCount.current++;
          setParticles(prev => [...prev, { id: pId, targetNodeId }]);
          
          setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== pId));
            setNodes(nodesSnap => {
              return nodesSnap.map(n => {
                if (n.id === targetNodeId) {
                  const newQueue = n.queue + 1;
                  return { ...n, queue: newQueue, status: newQueue > MAX_QUEUE ? 'overloaded' : n.status };
                }
                return n;
              });
            });
          }, ANIMATION_DURATION_MS);
        }

        return currentNodes;
      });
    }, isSpiking ? 50 : SPAWN_RATE_MS);

    return () => clearInterval(interval);
  }, [isRunning, algorithm, isSpiking]);

  // Auto-Scale logic
  useEffect(() => {
    if (!isRunning || !autoScale) return;
    
    const interval = setInterval(() => {
      setNodes(currentNodes => {
        const activeNodes = currentNodes.filter(n => n.status === 'active' || n.status === 'overloaded');
        const downNodes = currentNodes.filter(n => n.status === 'down');
        
        if (activeNodes.length === 0) return currentNodes; // All down

        const totalQueue = activeNodes.reduce((sum, n) => sum + n.queue, 0);
        const avgQueue = totalQueue / activeNodes.length;

        // Scale Up if high load and we have down nodes
        if (avgQueue > 6 && downNodes.length > 0) {
           return currentNodes.map(n => n.id === downNodes[0].id ? { ...n, status: 'active', queue: 0 } : n);
        }
        // Scale Down if low load and we have more than 2 active nodes (keep at least 2)
        else if (avgQueue < 2 && activeNodes.length > 2) {
           const targetNodeId = activeNodes[activeNodes.length - 1].id;
           return currentNodes.map(n => n.id === targetNodeId ? { ...n, status: 'down', queue: 0 } : n);
        }

        return currentNodes;
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isRunning, autoScale]);

  const triggerSpike = () => {
      if (isSpiking || !isRunning) return;
      setIsSpiking(true);
      setTimeout(() => {
          setIsSpiking(false);
      }, 5000);
  };

  // Process queues
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setNodes(currentNodes => 
        currentNodes.map(n => {
          if (n.status === 'active' && n.queue > 0) {
            return { ...n, queue: n.queue - 1 };
          }
          if (n.status === 'overloaded' && n.queue > 0) {
             if (Math.random() > 0.5) {
                const newQueue = n.queue - 1;
                return { ...n, queue: newQueue, status: newQueue <= MAX_QUEUE * 0.8 ? 'active' : 'overloaded' };
             }
          }
          return n;
        })
      );
    }, PROCESSING_SPEED_MS);

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleNodeStatus = (id: number) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        if (n.status === 'active' || n.status === 'overloaded') return { ...n, status: 'down', queue: 0 };
        return { ...n, status: 'active', queue: 0 };
      }
      return n;
    }));
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#0a0a0a] mb-8 gap-4 z-10 relative">
        <div>
          <h2 className="text-4xl text-[#0a0a0a] leading-none" style={{ fontFamily: 'var(--font-bebas-neue)' }}>Load Balancer</h2>
          <p className="text-[13px] text-[#0a0a0a] font-dm-mono font-bold mt-1 uppercase tracking-widest">Keep the servers from crashing.</p>
          <p className="text-[11px] text-[#00e060] font-dm-mono font-bold mt-1 uppercase tracking-widest bg-[#0a0a0a] inline-block px-2 py-0.5 border-2 border-[#0a0a0a]">Click servers to toggle ON/OFF.</p>
        </div>
        
        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 flex-wrap justify-end">
            <div className="flex items-center gap-2 border-[3px] border-[#0a0a0a] px-3 py-1.5 bg-[#f5f5f0] shadow-[4px_4px_0_#0a0a0a]">
                <span className="text-[12px] font-bold font-dm-mono uppercase tracking-widest text-[#0a0a0a]">Auto-Scale:</span>
                <button 
                  onClick={() => setAutoScale(!autoScale)}
                  className={`w-12 h-6 relative transition-colors border-2 border-[#0a0a0a] ${autoScale ? 'bg-[#00e060]' : 'bg-white'}`}
                >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-[#0a0a0a] transition-transform ${autoScale ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
            </div>
            
            <div className="w-1 h-8 bg-[#0a0a0a] hidden md:block" />

            <div className="flex bg-white border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a]">
              <button 
                onClick={() => setAlgorithm('round-robin')}
                className={`px-4 py-2 text-[12px] font-bold font-dm-mono uppercase tracking-widest transition-colors ${algorithm === 'round-robin' ? 'bg-[#0a0a0a] text-white' : 'text-[#0a0a0a] hover:bg-[#f5f5f0]'}`}
              >
                Round Robin
              </button>
              <div className="w-[3px] bg-[#0a0a0a]" />
              <button 
                onClick={() => setAlgorithm('least-connections')}
                className={`px-4 py-2 text-[12px] font-bold font-dm-mono uppercase tracking-widest transition-colors ${algorithm === 'least-connections' ? 'bg-[#0a0a0a] text-white' : 'text-[#0a0a0a] hover:bg-[#f5f5f0]'}`}
              >
                Least Conn
              </button>
            </div>
            
            <button
              onClick={() => {
                  if(!isRunning) {
                      setNodes(n => n.map(x => ({...x, queue: 0, status: 'active'})));
                      setParticles([]);
                      setIsSpiking(false);
                  }
                  setIsRunning(!isRunning);
              }}
              className={`px-6 py-2.5 border-[3px] border-[#0a0a0a] font-bold font-dm-mono uppercase tracking-widest text-[13px] transition-all min-w-[160px] ${
                isRunning 
                  ? 'bg-red-500 text-white shadow-[4px_4px_0_#0a0a0a] hover:translate-y-1 hover:translate-x-1 hover:shadow-none' 
                  : 'bg-[#00e060] text-[#0a0a0a] shadow-[6px_6px_0_#0a0a0a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#0a0a0a]'
              }`}
            >
              {isRunning ? 'STOP TRAFFIC' : 'START TRAFFIC'}
            </button>
          </div>
          
          <button
            onClick={triggerSpike}
            disabled={!isRunning || isSpiking}
            className={`px-6 py-2 border-[3px] border-[#0a0a0a] text-[12px] font-bold font-dm-mono uppercase tracking-widest transition-all ${
                isSpiking
                    ? 'bg-orange-500 text-white shadow-[4px_4px_0_#0a0a0a] animate-pulse'
                    : !isRunning
                        ? 'bg-[#e5e5e5] text-neutral-400 cursor-not-allowed'
                        : 'bg-white text-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_#0a0a0a] hover:bg-[#f5e642]'
            }`}
          >
            {isSpiking ? '⚠️ INCOMING SPIKE ⚠️' : 'SIMULATE SPIKE (5s)'}
          </button>
        </div>
      </div>

      {/* Arena */}
      <div className="flex-grow relative bg-[#f5f5f0] border-[4px] border-[#0a0a0a] shadow-[inset_8px_8px_0_rgba(0,0,0,0.05)] overflow-hidden flex items-center justify-center p-4 min-h-[700px]">
        {/* Square container to keep the circle perfect */}
        <div className="relative w-full max-w-[700px] aspect-square">
            
            {/* Center Load Balancer (ELB) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] border-[5px] border-[#0a0a0a] w-32 h-32 z-30 shadow-[8px_8px_0_#00e060] flex items-center justify-center flex-col">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                    <path d="M4 12H9L13 5H20M9 12L13 19H20" stroke="#00e060" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                    <rect x="2" y="10" width="4" height="4" fill="#00e060"/>
                    <rect x="18" y="3" width="4" height="4" fill="#00e060"/>
                    <rect x="18" y="17" width="4" height="4" fill="#00e060"/>
                </svg>
                <span className="text-[#00e060] font-bold font-dm-mono tracking-widest text-[14px]">ELB</span>
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {nodes.map(n => (
                    <line 
                        key={`line-${n.id}`}
                        x1="50%" y1="50%" 
                        x2={`${n.xPct}%`} y2={`${n.yPct}%`} 
                        stroke={n.status === 'down' ? '#e5e5e5' : n.status === 'overloaded' ? '#0a0a0a' : '#0a0a0a'} 
                        strokeWidth="3" 
                        strokeDasharray={n.status === 'down' ? '5 5' : 'none'} 
                    />
                ))}
            </svg>

            {/* Particles rendering */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <AnimatePresence>
                    {particles.map(p => {
                        const targetNode = nodes.find(n => n.id === p.targetNodeId);
                        if (!targetNode) return null;
                        
                        return (
                            <motion.div
                                key={p.id}
                                initial={{ top: '50%', left: '50%', opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
                                animate={{ top: `${targetNode.yPct}%`, left: `${targetNode.xPct}%`, opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: ANIMATION_DURATION_MS / 1000, ease: "linear" }}
                                className="absolute w-5 h-5 bg-[#00e060] border-[2px] border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a]"
                            />
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Nodes */}
            {nodes.map(node => {
                const queuePct = Math.min(100, (node.queue / MAX_QUEUE) * 100);
                const isOver = node.status === 'overloaded';
                const isDown = node.status === 'down';
                
                return (
                <div 
                    key={node.id} 
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                    style={{ left: `${node.xPct}%`, top: `${node.yPct}%` }}
                >
                    <button
                        onClick={() => toggleNodeStatus(node.id)}
                        className={`w-[140px] p-4 border-[4px] transition-all duration-200 flex flex-col items-center shadow-[6px_6px_0_#0a0a0a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#0a0a0a] ${
                            isDown 
                                ? 'bg-[#e5e5e5] border-[#0a0a0a] opacity-80 grayscale' 
                                : isOver
                                    ? 'bg-red-500 border-[#0a0a0a]'
                                    : 'bg-white border-[#0a0a0a]'
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`w-3 h-3 border-2 border-[#0a0a0a] ${isDown ? 'bg-neutral-600' : isOver ? 'bg-red-900 animate-pulse' : 'bg-[#00e060]'}`} />
                            <span className={`text-[15px] font-bold font-dm-mono ${isOver ? 'text-white' : 'text-[#0a0a0a]'}`}>SRV-0{node.id + 1}</span>
                        </div>
                        
                        {/* Compact Queue Bar */}
                        <div className={`w-full h-4 border-[2px] border-[#0a0a0a] mb-2 relative ${isOver ? 'bg-red-950' : 'bg-[#e5e5e5]'}`}>
                            <div 
                                className={`h-full border-r-[2px] border-[#0a0a0a] transition-all duration-300 ${isDown ? 'bg-neutral-500' : isOver ? 'bg-white' : 'bg-[#f5e642]'}`}
                                style={{ width: `${queuePct}%` }}
                            />
                        </div>

                        <span className={`text-[11px] font-bold font-dm-mono uppercase tracking-widest ${isOver ? 'text-white' : 'text-[#0a0a0a]'}`}>
                            {isDown ? 'OFFLINE' : isOver ? 'CRASHED' : `QUEUE: ${node.queue}/${MAX_QUEUE}`}
                        </span>
                    </button>
                </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}
