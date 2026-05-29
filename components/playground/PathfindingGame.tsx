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
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center bg-white p-5 border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#0a0a0a] mb-8 gap-4 z-10 shrink-0 relative">
        <div>
          <h2 className="text-4xl text-[#0a0a0a] leading-none" style={{ fontFamily: 'var(--font-bebas-neue)' }}>Algorithm Visualizer</h2>
          <p className="text-[13px] text-[#0a0a0a] font-dm-mono font-bold mt-1 uppercase tracking-widest">Compare search algorithms in real-time.</p>
        </div>
        
        <div className="flex flex-col xl:flex-row items-end xl:items-center gap-4 w-full xl:w-auto">
            
            {/* Algorithm Selector */}
            <div className="flex flex-row items-center bg-white p-1 border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] w-full xl:w-auto overflow-x-auto shrink-0 h-fit">
                {(['astar', 'dijkstra', 'greedy', 'bfs', 'dfs'] as AlgorithmType[]).map((alg) => (
                    <button
                        key={alg}
                        onClick={() => !isRunning && setAlgorithm(alg)}
                        disabled={isRunning}
                        className={`px-4 py-2 text-[12px] font-bold font-dm-mono uppercase tracking-widest whitespace-nowrap transition-colors h-8 flex items-center justify-center ${
                            algorithm === alg 
                                ? 'bg-[#0a0a0a] text-white' 
                                : 'text-[#0a0a0a] hover:bg-[#f5f5f0]'
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
                        className="px-6 py-2 border-[3px] border-[#0a0a0a] text-[12px] font-bold font-dm-mono uppercase tracking-widest transition-all bg-white text-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_#0a0a0a] disabled:opacity-50"
                    >
                        CLEAR
                    </button>
                    <button
                        onClick={runAlgorithm}
                        disabled={isRunning}
                        className={`px-6 py-2 border-[3px] border-[#0a0a0a] font-bold font-dm-mono uppercase tracking-widest text-[13px] transition-all min-w-[140px] whitespace-nowrap ${
                            isRunning 
                            ? 'bg-[#e5e5e5] text-neutral-400 cursor-not-allowed shadow-[4px_4px_0_#0a0a0a]' 
                            : 'bg-[#00e060] text-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_#0a0a0a]'
                        }`}
                    >
                        {isRunning ? 'SEARCHING...' : `START ${algorithm === 'astar' ? 'A*' : algorithm.toUpperCase()}`}
                    </button>
                </div>

                <div className="flex gap-4 ml-2 border-[3px] border-[#0a0a0a] bg-white px-3 py-1.5 shadow-[4px_4px_0_#0a0a0a]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#e5e5e5] border-2 border-[#0a0a0a]" />
                        <span className="text-[11px] text-[#0a0a0a] font-bold font-dm-mono uppercase">Visited: {stats.visited}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#f5e642] border-2 border-[#0a0a0a]" />
                        <span className="text-[11px] text-[#0a0a0a] font-bold font-dm-mono uppercase">Path: {stats.pathLength}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold font-dm-mono text-[#0a0a0a]">Time:</span>
                        <span className="text-[11px] text-[#0a0a0a] font-bold font-dm-mono uppercase">{stats.executionTimeMs}ms</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Grid Arena */}
      <div className="flex-grow relative bg-[#f5f5f0] border-[4px] border-[#0a0a0a] shadow-[inset_8px_8px_0_rgba(0,0,0,0.05)] p-4 md:p-8 flex items-center justify-center overflow-hidden min-h-[600px]">
        {grid.length > 0 && (
            <div 
                className="bg-white border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#0a0a0a] overflow-hidden touch-none"
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` 
                }}
                onMouseLeave={handleMouseUp}
            >
                {grid.map((row, rowIdx) => (
                    row.map((node, colIdx) => {
                        let cellClasses = "w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 border-[0.5px] border-[#0a0a0a]/20 transition-colors duration-200 cursor-pointer ";
                        
                        if (node.isStart) cellClasses += "bg-[#00e060] !border-[2px] !border-[#0a0a0a] scale-110 z-10 shadow-[2px_2px_0_#0a0a0a] ";
                        else if (node.isEnd) cellClasses += "bg-red-500 !border-[2px] !border-[#0a0a0a] scale-110 z-10 shadow-[2px_2px_0_#0a0a0a] ";
                        else if (node.isWall) cellClasses += "bg-[#0a0a0a] !border-[#0a0a0a] scale-105 z-10 shadow-[2px_2px_0_#0a0a0a] ";
                        else if (node.isPath) cellClasses += "bg-[#f5e642] !border-[2px] !border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a] z-10 transition-all duration-300 scale-105 ";
                        else if (node.isVisited) cellClasses += "bg-[#e5e5e5] !border-[#0a0a0a]/50 transition-all duration-500 ";
                        else cellClasses += "bg-white hover:bg-[#f5f5f0] hover:!border-[2px] hover:!border-[#0a0a0a] z-20 ";

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
