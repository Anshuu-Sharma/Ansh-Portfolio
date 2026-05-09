'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

type CtaPosition = {
  href: string;
  left: number;
  top: number;
  width: number;
  height: number;
  id: string;
};

type BestCard = { el: HTMLElement; area: number; distance: number; index: number };

export default function ProjectCtaOverlay() {
  const [ctaPosition, setCtaPosition] = useState<CtaPosition | null>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const positionFromCard = (card: HTMLElement | null) => {
      // Cancel any pending RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        if (!card) {
          setCtaPosition(null);
          rafRef.current = null;
          return;
        }

        const cta = card.querySelector<HTMLAnchorElement>('.cta');
        if (!cta) {
          setCtaPosition(null);
          rafRef.current = null;
          return;
        }

        const rect = cta.getBoundingClientRect();
        const href = cta.getAttribute('href');
        if (!href) {
          setCtaPosition(null);
          rafRef.current = null;
          return;
        }

        const style = window.getComputedStyle(cta);
        // Skip only if not rendered at all; visibility hidden is allowed
        if (style.display === 'none' || parseFloat(style.opacity || '1') === 0) {
          setCtaPosition(null);
          rafRef.current = null;
          return;
        }

        setCtaPosition({
          href,
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          id: card.className.match(/project-\d+/)?.[0] || 'card-active',
        });
        rafRef.current = null;
      });
    };

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'));
    cardsRef.current = cards;
    if (!cards.length) return;

    const chooseBestCard = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      const best = cardsRef.current.reduce<BestCard | null>((acc, el, idx) => {
        const rect = el.getBoundingClientRect();
        const visibleWidth = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0));
        const visibleHeight = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        const area = visibleWidth * visibleHeight;
        if (area <= 0) return acc;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - vh / 2);

        if (
          !acc ||
          area > acc.area ||
          (area === acc.area && distance < acc.distance) ||
          (area === acc.area && distance === acc.distance && idx > acc.index)
        ) {
          return { el, area, distance, index: idx };
        }

        return acc;
      }, null);

      if (!best) {
        activeCardRef.current = null;
        positionFromCard(null);
        return;
      }

      const bestEl = best.el;

      if (activeCardRef.current !== bestEl) {
        activeCardRef.current = bestEl;
        positionFromCard(bestEl);
      } else {
        positionFromCard(bestEl);
      }
    };

    // Keep current best card in ref for scroll/resize updates
    const updateActiveCard = () => {
      chooseBestCard();
    };

    const observer = new IntersectionObserver(updateActiveCard, {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    cards.forEach((card) => observer.observe(card));

    // Initial update with delays to ensure DOM and transforms are ready
    const timeoutId1 = setTimeout(() => chooseBestCard(), 100);
    const timeoutId2 = setTimeout(() => chooseBestCard(), 500);

    // Update overlay on scroll/resize using current active card
    let ticking = false;
    const throttledUpdate = () => {
      if (!ticking) {
        ticking = true;
        chooseBestCard();
        requestAnimationFrame(() => {
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('resize', throttledUpdate);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      observer.disconnect();
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
    };
  }, []);

  if (!ctaPosition) return null;

  return (
    <Link
      key={ctaPosition.id}
      href={ctaPosition.href}
      className="cta-overlay"
      style={{
        left: `${ctaPosition.left}px`,
        top: `${ctaPosition.top}px`,
        width: `${ctaPosition.width}px`,
        height: `${ctaPosition.height}px`,
      }}
    >
      VIEW PROJECT <span>↗</span>
    </Link>
  );
}
