'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  interactive?: boolean;
  quality?: 'low' | 'high';
}

export function SplineScene({
  scene,
  className,
  interactive = true,
  quality = 'high',
}: SplineSceneProps) {
  const dpr = quality === 'low' ? 1 : Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5);

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        renderOnDemand={!interactive}
        style={{ pointerEvents: interactive ? 'auto' : 'none' }}
        onLoad={(app) => {
          const runtime = app as unknown as {
            setZoom?: (value: number) => void;
            setVariable?: (name: string, value: string) => void;
            renderer?: { setPixelRatio?: (value: number) => void };
          };

          runtime.setZoom?.(quality === 'low' ? 0.95 : 1);
          runtime.setVariable?.('quality', quality);
          // Cap pixel density to avoid expensive high-DPR rendering on large screens.
          runtime.renderer?.setPixelRatio?.(dpr);
        }}
      />
    </Suspense>
  );
}
