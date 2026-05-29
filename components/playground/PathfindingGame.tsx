"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// --- Types & Constants ---
type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  fScore: number;
  previousNode: NodeType | null;
};

type AlgorithmType = 'astar' | 'dijkstra' | 'greedy' | 'bfs' | 'dfs';

const ROWS = 20;
const COLS = 40;
const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 34;

// --- Helper Functions ---
const createNode = (col: number, row: number): NodeType => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    fScore: Infinity,
    isVisited: false,
    isWall: false,
    isPath: false,
    previousNode: null,
  };
};

const getInitialGrid = () => {
  const grid: NodeType[][] = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// Manhattan distance
const heuristic = (nodeA: NodeType, nodeB: NodeType) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

export default function PathfindingGame() {
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('astar');
  const [stats, setStats] = useState({ visited: 0, pathLength: 0, executionTimeMs: 0 });

  // Initialize grid
  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  // --- Mouse Event Handlers for Drawing Walls ---
  const handleMouseDown = (row: number, col: number) => {
    if (isRunning || isFinished) return;
    const newGrid = [...grid];
    const node = newGrid[row][col];
    if (node.isStart || node.isEnd) return;
    
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMousePressed || isRunning || isFinished) return;
    const newGrid = [...grid];
    const node = newGrid[row][col];
    if (node.isStart || node.isEnd || node.isWall) return; // Don't toggle off on drag, only draw
    
    const newNode = { ...node, isWall: true };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  // --- Algorithms ---
  const runAlgorithm = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsFinished(false);
    setStats({ visited: 0, pathLength: 0, executionTimeMs: 0 });

    // Reset visited and path states but keep walls
    const cleanGrid: NodeType[][] = grid.map(row => row.map(node => ({
        ...node, 
        isVisited: false, 
        isPath: false, 
        distance: Infinity, 
        fScore: Infinity, 
        previousNode: null 
    })));

    const startNode = cleanGrid[START_NODE_ROW][START_NODE_COL];
    const endNode = cleanGrid[END_NODE_ROW][END_NODE_COL];
    
    startNode.distance = 0;
    startNode.fScore = heuristic(startNode, endNode);
    
    const visitedNodesInOrder: NodeType[] = [];
    
    // START TIMER
    const startTime = performance.now();

    // Data structures for different algorithms
    const openList: NodeType[] = [startNode];
    
    while (openList.length > 0) {
        let closestNode: NodeType;

        // Extract the next node based on the selected algorithm
        if (algorithm === 'astar') {
            openList.sort((a, b) => a.fScore - b.fScore);
            closestNode = openList.shift()!;
        } else if (algorithm === 'dijkstra') {
            openList.sort((a, b) => a.distance - b.distance);
            closestNode = openList.shift()!;
        } else if (algorithm === 'greedy') {
            openList.sort((a, b) => heuristic(a, endNode) - heuristic(b, endNode));
            closestNode = openList.shift()!;
        } else if (algorithm === 'bfs') {
            closestNode = openList.shift()!; // FIFO Queue
        } else if (algorithm === 'dfs') {
            closestNode = openList.pop()!; // LIFO Stack
        } else {
            closestNode = openList.shift()!;
        }

        // Skip walls
        if (closestNode.isWall) continue;
        
        // Skip if already visited (important for BFS/DFS so they don't loop endlessly)
        if (closestNode.isVisited) continue;
        
        // Impossible to reach (for weighted algorithms)
        if (closestNode.distance === Infinity && (algorithm === 'astar' || algorithm === 'dijkstra')) break;

        closestNode.isVisited = true;
        if (!closestNode.isStart && !closestNode.isEnd) {
            visitedNodesInOrder.push(closestNode);
        }

        // Found the target
        if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
            break;
        }

        // Update neighbors
        const neighbors = [];
        const { row, col } = closestNode;
        // The order of pushing neighbors affects DFS/BFS direction bias.
        if (row > 0) neighbors.push(cleanGrid[row - 1][col]); // Up
        if (col < COLS - 1) neighbors.push(cleanGrid[row][col + 1]); // Right
        if (row < ROWS - 1) neighbors.push(cleanGrid[row + 1][col]); // Down
        if (col > 0) neighbors.push(cleanGrid[row][col - 1]); // Left

        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                
                if (algorithm === 'dfs' || algorithm === 'bfs') {
                    // Unweighted logic
                    if (!openList.includes(neighbor)) {
                        neighbor.previousNode = closestNode;
                        openList.push(neighbor);
                    }
                } else {
                    // Weighted logic (A*, Dijkstra, Greedy)
                    const tentativeDistance = closestNode.distance + 1;
                    if (tentativeDistance < neighbor.distance) {
                        neighbor.previousNode = closestNode;
                        neighbor.distance = tentativeDistance;
                        neighbor.fScore = tentativeDistance + heuristic(neighbor, endNode);
                        if (!openList.includes(neighbor)) {
                            openList.push(neighbor);
                        }
                    }
                }
            }
        }
    }

    // END TIMER
    const endTime = performance.now();
    const computeTime = Number((endTime - startTime).toFixed(2));

    // Backtrack to find shortest path
    const shortestPathInOrder: NodeType[] = [];
    let currentNode: NodeType | null = endNode.previousNode ? endNode : null; // Start from the node before end
    while (currentNode !== null && !currentNode.isStart) {
        shortestPathInOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    // Edge case: if we didn't find the end node, clear the path
    if (!endNode.previousNode) {
        shortestPathInOrder.length = 0;
    }

    // Now animate
    animateAlgorithm(visitedNodesInOrder, shortestPathInOrder, cleanGrid, computeTime);
  };

  const animateAlgorithm = (visited: NodeType[], path: NodeType[], baseGrid: NodeType[][], computeTime: number) => {
      let activeGrid = [...baseGrid];

      // If nothing to animate (start blocked entirely)
      if (visited.length === 0) {
          setIsRunning(false);
          setIsFinished(true);
          setStats({ visited: 0, pathLength: 0, executionTimeMs: computeTime });
          return;
      }

      // Animate visited nodes
      for (let i = 0; i <= visited.length; i++) {
          if (i === visited.length) {
              setTimeout(() => {
                  animatePath(path, activeGrid, computeTime, visited.length);
              }, 10 * i);
              return;
          }
          
          setTimeout(() => {
              const node = visited[i];
              const newGrid = [...activeGrid];
              newGrid[node.row] = [...newGrid[node.row]];
              newGrid[node.row][node.col] = { ...node, isVisited: true };
              activeGrid = newGrid;
              setGrid(newGrid);
              setStats(s => ({ ...s, visited: i + 1, executionTimeMs: computeTime }));
          }, 10 * i);
      }
  };

  const animatePath = (path: NodeType[], activeGrid: NodeType[][], computeTime: number, visitedLength: number) => {
      for (let i = 0; i < path.length; i++) {
          setTimeout(() => {
              const node = path[i];
              const newGrid = [...activeGrid];
              newGrid[node.row] = [...newGrid[node.row]];
              newGrid[node.row][node.col] = { ...node, isPath: true };
              activeGrid = newGrid;
              setGrid(newGrid);
              setStats(s => ({ ...s, pathLength: i + 1, executionTimeMs: computeTime }));
              
              if (i === path.length - 1) {
                  setIsRunning(false);
                  setIsFinished(true);
              }
          }, 30 * i); 
      }
      
      // If no path was found
      if (path.length === 0) {
          setIsRunning(false);
          setIsFinished(true);
      }
  };

  const clearGrid = () => {
      if (isRunning) return;
      setGrid(getInitialGrid());
      setIsFinished(false);
      setStats({ visited: 0, pathLength: 0, executionTimeMs: 0 });
  };
  
  const getAlgorithmName = () => {
      switch(algorithm) {
          case 'astar': return 'A* Search';
          case 'dijkstra': return "Dijkstra's";
          case 'greedy': return 'Greedy Best-First';
          case 'bfs': return 'Breadth-First';
          case 'dfs': return 'Depth-First';
      }
  };

  return (
    <div className="flex flex-col h-full w-full max-h-full" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {/* Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6 gap-4 z-10 shrink-0">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white">Algorithm Visualizer</h2>
          <p className="text-xs text-neutral-400 font-dm-mono">Compare search algorithms in real-time.</p>
        </div>
        
        <div className="flex flex-col xl:flex-row items-end xl:items-center gap-4 w-full xl:w-auto">
            
            {/* Algorithm Selector */}
            <div className="flex flex-row items-center bg-neutral-900 p-1 rounded-lg border border-neutral-800 w-full xl:w-auto overflow-x-auto shrink-0 h-fit">
                {(['astar', 'dijkstra', 'greedy', 'bfs', 'dfs'] as AlgorithmType[]).map((alg) => (
                    <button
                        key={alg}
                        onClick={() => !isRunning && setAlgorithm(alg)}
                        disabled={isRunning}
                        className={`px-3 py-1.5 text-xs font-bold font-dm-mono rounded-md whitespace-nowrap transition-colors h-8 flex items-center justify-center ${
                            algorithm === alg 
                                ? 'bg-[#00c37b] text-black shadow-[0_0_10px_rgba(0,195,123,0.3)]' 
                                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                        }`}
                    >
                        {alg === 'astar' ? 'A*' : alg.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-end">
                <div className="flex gap-3">
                    <button
                        onClick={clearGrid}
                        disabled={isRunning}
                        className="px-4 py-2 rounded-lg font-bold text-sm tracking-wider transition-all text-neutral-400 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white disabled:opacity-50"
                    >
                        CLEAR
                    </button>
                    <button
                        onClick={runAlgorithm}
                        disabled={isRunning}
                        className={`px-6 py-2 rounded-lg font-bold text-sm tracking-wider transition-all shadow-lg min-w-[140px] whitespace-nowrap ${
                            isRunning 
                            ? 'bg-[#00c37b]/50 text-neutral-900 border border-[#00c37b]/50 cursor-not-allowed' 
                            : 'bg-[#00c37b] text-neutral-950 border border-[#00c37b] hover:bg-[#00e87a] shadow-[#00c37b]/20'
                        }`}
                    >
                        {isRunning ? 'SEARCHING...' : `START ${algorithm === 'astar' ? 'A*' : algorithm.toUpperCase()}`}
                    </button>
                </div>

                <div className="flex gap-4 ml-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#00c37b]/20 border border-[#00c37b]" />
                        <span className="text-[10px] text-neutral-500 font-dm-mono uppercase">Visited: {stats.visited}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white" />
                        <span className="text-[10px] text-neutral-500 font-dm-mono uppercase">Path: {stats.pathLength}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-neutral-800 flex items-center justify-center border border-neutral-700">
                            <span className="text-[8px]">⏱️</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-dm-mono uppercase">{stats.executionTimeMs}ms</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Grid Arena */}
      <div className="flex-grow relative bg-neutral-950/50 rounded-xl border border-neutral-800/50 p-4 md:p-8 flex items-center justify-center overflow-hidden min-h-[600px]">
        {grid.length > 0 && (
            <div 
                className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden touch-none"
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` 
                }}
                onMouseLeave={handleMouseUp}
            >
                {grid.map((row, rowIdx) => (
                    row.map((node, colIdx) => {
                        let cellClasses = "w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 border-[0.5px] border-neutral-800 transition-colors duration-200 cursor-pointer ";
                        
                        if (node.isStart) cellClasses += "bg-blue-500 !border-blue-400 rounded-sm scale-110 z-10 shadow-[0_0_10px_rgba(59,130,246,0.8)] ";
                        else if (node.isEnd) cellClasses += "bg-red-500 !border-red-400 rounded-sm scale-110 z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)] ";
                        else if (node.isWall) cellClasses += "bg-neutral-700 !border-neutral-600 scale-105 ";
                        else if (node.isPath) cellClasses += "bg-white !border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 transition-all duration-300 ";
                        else if (node.isVisited) cellClasses += "bg-[#00c37b]/20 border-[#00c37b]/30 transition-all duration-500 ";
                        else cellClasses += "hover:bg-neutral-800";

                        return (
                            <div 
                                key={`${rowIdx}-${colIdx}`}
                                id={`node-${rowIdx}-${colIdx}`}
                                className={cellClasses}
                                onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                                onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                                onMouseUp={handleMouseUp}
                                // Mobile support
                                onTouchStart={() => handleMouseDown(rowIdx, colIdx)}
                            />
                        );
                    })
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
