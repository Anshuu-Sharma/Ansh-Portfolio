'use client';

import { useState, useRef, useEffect } from 'react';
import Matter from 'matter-js';
import { initCoreCapabilitiesScroll } from '@/lib/coreCapabilitiesScroll';

type TabId = 'capabilities' | 'tech' | 'services';

const TABS: { id: TabId; label: string }[] = [
  { id: 'capabilities', label: 'CORE CAPABILITIES' },
  { id: 'tech', label: 'TECH STACKS' },
  { id: 'services', label: 'SERVICES' },
];

const BUBBLES_CAPABILITIES_BASE = [
  'Full-stack',
  'SEO',
  'Headless CMS',
  'Motion & Interaction',
  'Creative Frontend',
  'Web Apps',
  'AI',
  'Performance',
  'eCommerce',
  'No code',
  'Less code',
  '🔥',
  '⚡',
  '◆',
  '▣',
  '◉',
  '◎',
  '✦',
  'Accessibility',
  'Responsive',
  'APIs',
  'Real-time',
  'Testing',
  'DevOps',
  'Security',
  'Analytics',
  'PWA',
  'SSR',
  'State',
  'Animations',
  'Design Systems',
  'Documentation',
  'Code Review',
  '★',
  '●',
  '▲',
];

const BUBBLES_TECH = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Tailwind',
  'Matter.js',
  'REST APIs',
  'GraphQL',
  'Docker',
  'Git',
  '🔧',
  '⚙️',
  '📦',
  '🖥️',
  '🌐',
  '🔒',
  'JavaScript',
  'HTML/CSS',
  'MongoDB',
  'Redis',
  'AWS',
  'Vercel',
  'Prisma',
  'Jest',
  'Webpack',
  'ESLint',
  'Figma',
  'Linux',
  'CI/CD',
  'Nginx',
  'WebSockets',
  '📡',
  '🔑',
  '⚙',
];

const BUBBLES_SERVICES = [
  'Web Development',
  'API Design',
  'Consulting',
  'Prototyping',
  'UI/UX',
  'Integration',
  'Maintenance',
  'Training',
  'Audits',
  'Support',
  '🚀',
  '💡',
  '📋',
  '🤝',
  '📈',
  '🛠️',
  '📱',
  '☁️',
  'MVP Build',
  'Refactoring',
  'Code Review',
  'Mentoring',
  'Technical Writing',
  'Accessibility Audit',
  'Performance Tuning',
  'Migration',
  'Debugging',
  'Documentation',
  'Onboarding',
  'SLA Support',
  '🔍',
  '📄',
  '🎯',
  '⚡',
  '🔄',
  '✨',
];

const BUBBLES_BY_TAB: Record<TabId, string[]> = {
  capabilities: BUBBLES_CAPABILITIES_BASE,
  tech: BUBBLES_TECH,
  services: BUBBLES_SERVICES,
};

const COLORS = ['#ffecd9', '#cceee8', '#f0e0f0', '#e8e8e8', '#dde5f5', '#e8e0f5'];

function getColor(i: number) {
  return COLORS[i % COLORS.length];
}

export default function CoreCapabilities() {
  const [activeTab, setActiveTab] = useState<TabId>('capabilities');
  const [positions, setPositions] = useState<{ x: number; y: number; angle: number }[]>([]);
  const [ready, setReady] = useState(false);
  const [fallTrigger, setFallTrigger] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let wasOutOfView = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && wasOutOfView) {
          setFallTrigger((t) => t + 1);
          wasOutOfView = false;
        } else if (!entry.isIntersecting) {
          wasOutOfView = true;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const kill = initCoreCapabilitiesScroll();
    return () => kill?.();
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const bubbles = BUBBLES_BY_TAB[activeTab];
    setReady(false);
    setPositions([]);

    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 1.2;
    engine.positionIterations = 12;
    engine.velocityIterations = 8;

    const width = scene.offsetWidth || 400;
    const height = scene.offsetHeight || 500;

    const ground = Bodies.rectangle(width / 2, height + 30, width + 400, 80, {
      isStatic: true,
    });

    const leftWall = Bodies.rectangle(-30, height / 2, 60, height + 200, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 40, height / 2, 80, height + 200, { isStatic: true });

    const bubbleBodies = bubbles.map((_text, i) =>
      Bodies.rectangle(
        Math.random() * width,
        -i * 60,
        180,
        50,
        {
          restitution: 0.6,
          friction: 0.5,
          frictionStatic: 0.6,
          chamfer: { radius: 25 },
          slop: 0.01,
        }
      )
    );

    World.add(engine.world, [ground, leftWall, rightWall, ...bubbleBodies]);

    const mouse = Mouse.create(scene);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2 },
    });
    World.add(engine.world, mouseConstraint);

    Events.on(engine, 'afterUpdate', () => {
      setPositions(
        bubbleBodies.map((b) => ({
          x: b.position.x,
          y: b.position.y,
          angle: b.angle,
        }))
      );
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    setReady(true);

    return () => {
      Mouse.clearSourceEvents(mouse);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [activeTab, fallTrigger]);

  const bubbles = BUBBLES_BY_TAB[activeTab];

  return (
    <div className="core-capabilities-scroll-wrapper">
      <section ref={sectionRef} className="core-capabilities-section" id="capabilities">
      <div className="core-capabilities-container">
        <nav className="core-capabilities-nav" aria-label="Capabilities tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`core-capabilities-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id ? `( ${tab.label} )` : tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div ref={sceneRef} className="core-capabilities-bubbles bubble-scene">
          {ready && positions.length === bubbles.length &&
            bubbles.map((text, index) => {
              const pos = positions[index];
              return (
                <div
                  key={`${activeTab}-${text}-${index}`}
                  className="core-capability-physics-wrap"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    width: 180,
                    height: 50,
                    transform: `translate(-50%, -50%) rotate(${pos.angle}rad)`,
                  }}
                >
                  <div
                    className="core-capability-bubble core-capability-pill"
                    style={{ background: getColor(index) }}
                    role="presentation"
                    aria-label={text}
                  >
                    <span className="core-capability-label">{text}</span>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
    </div>
  );
}
