'use client';

import { useEffect } from 'react';
import { PROJECTS, PROJECT_IDS } from '@/lib/projects';

/**
 * Preloads all project media (images + videos) in the background.
 * Images are loaded via the Image() constructor which populates the browser cache.
 * Videos are fetched with low priority so the browser caches them without
 * blocking the main thread or competing with critical resources.
 */
export function usePreloadProjectMedia() {
  useEffect(() => {
    const imageUrls: string[] = [];
    const videoUrls: string[] = [];

    for (const id of PROJECT_IDS) {
      const project = PROJECTS[id];
      if (!project?.media) continue;
      for (const item of project.media) {
        if (item.type === 'image') {
          imageUrls.push(item.url);
        } else if (item.type === 'video') {
          videoUrls.push(item.url);
        }
      }
    }

    // Preload images — the browser will cache these automatically
    for (const url of imageUrls) {
      const img = new Image();
      img.src = url;
    }

    // Preload videos with low-priority fetch so they don't block anything
    // We use a small stagger to avoid hammering the network all at once
    const abortController = new AbortController();
    videoUrls.forEach((url, index) => {
      setTimeout(() => {
        if (abortController.signal.aborted) return;
        fetch(url, {
          signal: abortController.signal,
          priority: 'low' as RequestPriority,
        }).catch(() => {
          // Silently ignore — preloading is best-effort
        });
      }, index * 500); // Stagger by 500ms per video
    });

    return () => {
      abortController.abort();
    };
  }, []);
}
