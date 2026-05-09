'use client';

import { useEffect, useState } from 'react';

const MIN_LOADING_MS = 1200;
const MAX_WAIT_FOR_READY_MS = 5000;

export default function LoadingGate({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);

  useEffect(() => {
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, MIN_LOADING_MS));
    const preloadSplineScene = import('@/components/ui/splite');

    Promise.all([minDelay, preloadSplineScene]).then(() => {
      setShowContent(true);
    });
  }, []);

  useEffect(() => {
    if (!showContent) return;

    const timeoutId = setTimeout(() => setOverlayHidden(true), MAX_WAIT_FOR_READY_MS);

    return () => clearTimeout(timeoutId);
  }, [showContent]);

  const showOverlay = !showContent || !overlayHidden;

  return (
    <>
      {showContent && children}
      {showOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <span className="text-white text-xl">LOADING...</span>
        </div>
      )}
    </>
  );
}
