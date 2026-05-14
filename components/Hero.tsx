'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const SplineScene = dynamic(
  () => import('@/components/ui/splite').then((m) => ({ default: m.SplineScene })),
  { ssr: false }
);

const ZOOM_HERO_HEIGHT = 1;
const ZOOM_MAX = 1.3;
const ZOOM_ORIGIN_Y = '28%';
const ZOOM_ORIGIN_Y_PERCENT = 28;
const LOW_POWER_MEMORY_GB = 4;
const ROBOT_TRANSITION_START_SCALE = 0.77;

export default function Hero() {
  const [zoomProgress, setZoomProgress] = useState(0);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shouldMountSpline, setShouldMountSpline] = useState(false);
  const [isRobotEntering, setIsRobotEntering] = useState(true);
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMedia = window.matchMedia('(max-width: 900px)');
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

    const sync = () => {
      setReduceMotion(motionMedia.matches);
      setIsLowPowerDevice(mobileMedia.matches || memory <= LOW_POWER_MEMORY_GB);
    };

    sync();
    motionMedia.addEventListener('change', sync);
    mobileMedia.addEventListener('change', sync);
    return () => {
      motionMedia.removeEventListener('change', sync);
      mobileMedia.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (isLowPowerDevice || reduceMotion) {
      setShouldMountSpline(false);
      return;
    }

    let cancelled = false;
    const mount = () => {
      if (!cancelled) setShouldMountSpline(true);
    };

    if ('requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(mount);
      return () => {
        cancelled = true;
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = setTimeout(mount, 100);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isLowPowerDevice, reduceMotion]);

  useEffect(() => {
    const updateFromScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const zoomDistance = viewportH * ZOOM_HERO_HEIGHT;
      const zoom = Math.min(scrollY / zoomDistance, 1);
      setZoomProgress(zoom);
      scrollRafRef.current = null;
    };

    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsRobotEntering(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  const clampedZoom = Math.min(Math.max(zoomProgress, 0), 1);
  const fade = 1 - clampedZoom;

  return (
    <section className="hero" id="hero" style={{ '--hero-fade': fade } as CSSProperties}>
      <div className="hero-bg-text">ANSH SHARMA</div>
      <div className="side-text left">SOFTWARE / AI ENGINEER</div>
      <div className="side-text right">BASED IN INDIA</div>

      <div className="orbital-wrapper">
        <div className="orbital-hover-zone" aria-hidden />
        <svg viewBox="0 0 500 500" className="orbital-text">
          <defs>
            <path
              id="circlePath"
              d="
                M 250, 250
                m -180, 0
                a 180,180 0 1,1 360,0
                a 180,180 0 1,1 -360,0
              "
            />
          </defs>
          <text>
            <textPath href="#circlePath">
              CREATIVE DEVELOPER • INTERACTIVE EXPERIENCES • ANSH SHARMA •
            </textPath>
          </text>
        </svg>
      </div>

      <div className="robot-container">
        <div
          className={`hero-robot-fullview${isRobotEntering ? ' hero-robot-entering' : ''}`}
          aria-hidden
          style={
            {
              width: `${ZOOM_MAX * 100}vw`,
              height: `${ZOOM_MAX * 100}vh`,
              left: `calc(50vw - ${ZOOM_MAX * 50}vw)`,
              top: `calc(50vh - ${ZOOM_ORIGIN_Y_PERCENT * ZOOM_MAX}vh)`,
              transform: 'scale(1)',
              transformOrigin: `50% ${ZOOM_ORIGIN_Y}`,
            } as CSSProperties
          }
        >
          {shouldMountSpline ? (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              interactive
              quality={isLowPowerDevice ? 'low' : 'high'}
            />
          ) : (
            <div className="hero-robot-fallback" />
          )}
        </div>
      </div>

      <div className="hero-title">
        <h1>Ansh Sharma</h1>
        <p>SOFTWARE ENGINEER • AI ENGINEER • FULL STACK DEVELOPER</p>
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-left">
              <div className="hero-intro-brackets">
                <div className="h1-wrapper">
                  <span className="h1-intro title"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
