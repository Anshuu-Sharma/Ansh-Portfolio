import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProjectsScroll() {
  const cards = gsap.utils.toArray<HTMLElement>('.project-card');
  if (cards.length < 2) return () => {};

  cards.forEach((card, index) => {
    if (index === 0) return;

    const prevCard = cards[index - 1] as HTMLElement;

    // One timeline per transition: previous card out + current card in, same scrub range
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
      },
    });

    tl.to(prevCard, {
      y: -120,
      opacity: 0,
      filter: 'blur(8px)',
      ease: 'power3.inOut',
    }).fromTo(
      card,
      { y: 120, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
      },
      0
    );
  });

  // Recalculate trigger positions after layout (images, fonts, etc.)
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
