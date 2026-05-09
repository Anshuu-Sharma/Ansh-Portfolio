'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS, PROJECT_IDS } from '@/lib/projects';
import { initProjectsScroll } from '@/lib/projectsScroll';
import ProjectCtaOverlay from './ProjectCtaOverlay';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function ProjectShowcase() {
  useEffect(() => {
    const kill = initProjectsScroll();
    
    // Refresh ScrollTrigger after layout settles
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      kill?.();
      clearTimeout(refreshTimeout);
    };
  }, []);

  useEffect(() => {
    const projectSection = document.querySelector('.project-wrapper');
    const robot = document.querySelector<HTMLElement>('.robot-container');
    if (!projectSection || !robot) return;

    const handleScroll = () => {
      const rect = projectSection.getBoundingClientRect();
      const shouldHide = rect.bottom < window.innerHeight * 0.35;
      if (shouldHide) {
        robot.classList.add('is-hidden');
      } else {
        robot.classList.remove('is-hidden');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="projects project-wrapper" id="projects">
      {PROJECT_IDS.map((id, index) => {
        const project = PROJECTS[id];
        if (!project) return null;
        const countDisplay = `${String(index + 1).padStart(2, '0')} | ${String(PROJECT_IDS.length).padStart(2, '0')}`;
        return (
          <div key={id} className={`project-card project-${index + 1}`}>
            <div className="top-bar">
              <div className="project-indicator">
                <span className="label">PROJECT</span>
                <span className="count">{countDisplay}</span>
              </div>
            </div>

            <div className="meta">
              <p className="meta-title">{project.category.toUpperCase()}</p>
              <div className="divider" />
              <p className="meta-tech">{project.techStack}</p>
              <div className="divider" />
            </div>

            <div className="content">
              <div className="left">
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                <Link href={`/projects/${id}`} className="cta">
                  VIEW PROJECT <span>↗</span>
                </Link>
              </div>

              <div className="right">
                <div className="mockup-stack">
                  <Image
                    src={project.image}
                    alt={`${project.title} mockup`}
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <ProjectCtaOverlay />
    </section>
  );
}
