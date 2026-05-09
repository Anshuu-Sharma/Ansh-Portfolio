'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.8,
      duration: 0.8,
      smoothWheel: true,
    });

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const updateScrollbar = () => {
      const scrollbarThumb = document.querySelector('.custom-scrollbar__thumb') as HTMLElement;
      if (scrollbarThumb) {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const thumbHeight = Math.max((clientHeight / scrollHeight) * 100, 5);
        const maxTranslate = clientHeight - (thumbHeight / 100) * clientHeight;
        const translateY = (scrollTop / (scrollHeight - clientHeight)) * maxTranslate;
        
        scrollbarThumb.style.height = `${thumbHeight}%`;
        scrollbarThumb.style.transform = `translateY(${Math.min(translateY, maxTranslate)}px)`;
      }
    };

    const interval = setInterval(updateScrollbar, 16);
    updateScrollbar();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="custom-scrollbar">
        <div className="custom-scrollbar__thumb" />
      </div>
      {children}
    </>
  );
}
