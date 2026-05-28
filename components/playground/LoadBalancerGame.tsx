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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6 gap-4 z-10 relative">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white">Load Balancer</h2>
          <p className="text-xs text-neutral-400 font-dm-mono mt-1">Keep the servers from crashing.</p>
          <p className="text-[10px] text-[#00c37b]/80 font-dm-mono mt-1 uppercase tracking-wide">Click servers to toggle ON/OFF.</p>
        </div>
        
        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <div className="flex items-center gap-4 flex-wrap justify-end">
            <div className="flex items-center gap-2">
                <span className="text-xs font-dm-mono text-neutral-500">Auto-Scale:</span>
                <button 
                  onClick={() => setAutoScale(!autoScale)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${autoScale ? 'bg-[#00c37b]' : 'bg-neutral-800'}`}
                >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${autoScale ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
            </div>
            
            <div className="w-px h-6 bg-neutral-800 hidden md:block" />

            <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
              <button 
                onClick={() => setAlgorithm('round-robin')}
                className={`px-3 py-1.5 text-xs font-dm-mono rounded-md transition-colors ${algorithm === 'round-robin' ? 'bg-[#00c37b]/20 text-[#00c37b]' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Round Robin
              </button>
              <button 
                onClick={() => setAlgorithm('least-connections')}
                className={`px-3 py-1.5 text-xs font-dm-mono rounded-md transition-colors ${algorithm === 'least-connections' ? 'bg-[#00c37b]/20 text-[#00c37b]' : 'text-neutral-500 hover:text-neutral-300'}`}
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
              className={`px-6 py-2 rounded-lg font-bold text-sm tracking-wider transition-all shadow-lg min-w-[160px] ${
                isRunning 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20' 
                  : 'bg-[#00c37b] text-neutral-950 border border-[#00c37b] hover:bg-[#00e87a] shadow-[#00c37b]/20'
              }`}
            >
              {isRunning ? 'STOP TRAFFIC' : 'START TRAFFIC'}
            </button>
          </div>
          
          <button
            onClick={triggerSpike}
            disabled={!isRunning || isSpiking}
            className={`px-4 py-1.5 rounded text-xs font-bold tracking-wider transition-all border ${
                isSpiking
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/50 animate-pulse'
                    : !isRunning
                        ? 'bg-neutral-900 text-neutral-600 border-neutral-800 cursor-not-allowed'
                        : 'bg-neutral-900 text-orange-500 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500'
            }`}
          >
            {isSpiking ? '⚠️ INCOMING SPIKE ⚠️' : 'SIMULATE SPIKE (5s)'}
          </button>
        </div>
      </div>

      {/* Arena */}
      <div className="flex-grow relative bg-neutral-950/50 rounded-xl border border-neutral-800/50 overflow-hidden flex items-center justify-center p-4 min-h-[700px]">
        {/* Square container to keep the circle perfect */}
        <div className="relative w-full max-w-[700px] aspect-square">
            
            {/* Center Load Balancer (ELB) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-800 border border-[#00c37b]/40 w-28 h-28 rounded-full z-30 shadow-[0_0_30px_rgba(0,195,123,0.15)] flex items-center justify-center flex-col">
                <div className="w-10 h-10 rounded-full border-[3px] border-[#00c37b] border-t-transparent animate-spin mb-2" style={{ animationDuration: '3s' }} />
                <span className="text-white font-orbitron font-bold tracking-widest text-xs">ELB</span>
            </div>

            {/* Connecting Lines (optional, for visual polish) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-20">
                {nodes.map(n => (
                    <line 
                        key={`line-${n.id}`}
                        x1="50%" y1="50%" 
                        x2={`${n.xPct}%`} y2={`${n.yPct}%`} 
                        stroke={n.status === 'down' ? '#555' : n.status === 'overloaded' ? '#ef4444' : '#00c37b'} 
                        strokeWidth="1" 
                        strokeDasharray="4 4" 
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
                                className="absolute w-4 h-4 bg-[#00c37b] rounded-full shadow-[0_0_12px_#00c37b]"
                            />
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Nodes */}
            {nodes.map(node => {
                const queuePct = (node.queue / MAX_QUEUE) * 100;
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
                        className={`w-[140px] p-3 rounded-xl border transition-all duration-300 flex flex-col items-center ${
                            isDown 
                                ? 'bg-neutral-900 border-neutral-800 opacity-50 grayscale' 
                                : isOver
                                    ? 'bg-red-950/80 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                                    : 'bg-neutral-900 border-[#00c37b]/30 hover:border-[#00c37b]/60 shadow-[0_0_15px_rgba(0,195,123,0.1)]'
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${isDown ? 'bg-neutral-600' : isOver ? 'bg-red-500 animate-pulse' : 'bg-[#00c37b]'}`} />
                            <span className="text-xs font-orbitron font-bold text-neutral-300">SRV-0{node.id + 1}</span>
                        </div>
                        
                        {/* Compact Queue Bar */}
                        <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 mb-2 relative">
                            <div 
                                className={`h-full transition-all duration-300 ${isDown ? 'bg-neutral-700' : isOver ? 'bg-red-500' : 'bg-[#00c37b]'}`}
                                style={{ width: `${queuePct}%` }}
                            />
                        </div>

                        <span className="text-[10px] font-dm-mono text-neutral-500">
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
