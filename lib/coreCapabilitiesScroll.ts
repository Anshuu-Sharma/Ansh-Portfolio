import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCoreCapabilitiesScroll() {
  const section = document.querySelector<HTMLElement>('.core-capabilities-section');
  if (!section) return () => {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'center center',
      scrub: true,
    },
  });

  tl.fromTo(
    section,
    { y: 80, opacity: 0.6 },
    { y: 0, opacity: 1, ease: 'power3.out' }
  );

  const st = tl.scrollTrigger;
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    st?.kill();
  };
}
