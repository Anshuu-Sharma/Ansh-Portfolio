'use client';

import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Modevelle',
    description:
      "A demo e-commerce website for women's fashion, featuring product listings, cart functionality, and user authentication. Built using Next.js and the Shopify Storefront API.",
    url: '#',
    category: 'Ecommerce Website',
    techStack: ['Next.js', 'Shopify Storefront API', 'GSAP'],
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    url: '#',
    category: 'Web App',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    url: '#',
    category: 'Prototype',
    techStack: ['TypeScript', 'Figma', 'Tailwind'],
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
    url: '#',
    category: 'Integration',
    techStack: ['Next.js', 'REST APIs', 'Docker'],
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animDirection, setAnimDirection] = useState<'next' | 'prev'>('next');
  const [animKey, setAnimKey] = useState(0);
  const project = projects[currentIndex];

  const handleSelect = (index: number) => {
    if (index === currentIndex) return;
    setAnimDirection(index > currentIndex ? 'next' : 'prev');
    setAnimKey((k) => k + 1);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="stick-hero-image">
        <div className="hero-to-work-img-wrapper" />
      </div>
      <section className="projects-showcase" id="projects">
        <div className="projects-showcase-bg" />
        <div className="container projects-showcase-container">
          <article
            key={`${project.id}-${animKey}`}
            className={`projects-showcase-card project-anim-${animDirection}`}
          >
            {/* Top right: hamburger + metadata */}
            <div className="projects-showcase-topright">
              <button
                type="button"
                className="projects-showcase-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <span />
                <span />
                <span />
              </button>
              <div className="projects-showcase-meta">
                <div className="projects-showcase-divider" />
                <span className="projects-showcase-category">{project.category.toUpperCase()}</span>
                <div className="projects-showcase-divider" />
                <span className="projects-showcase-tech">
                  {project.techStack.map((t) => t.toUpperCase()).join(' • ')}
                </span>
              </div>
            </div>

            <div className="projects-showcase-grid">
              {/* Left: indicator, title, description, CTA */}
              <div className="projects-showcase-left">
                <div className="projects-showcase-indicator">
                  <span className="projects-showcase-indicator-label">PROJECT</span>
                  <span className="projects-showcase-indicator-nums">
                    {String(currentIndex + 1).padStart(2, '0')} | {String(projects.length).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="projects-showcase-title">{project.title}</h2>
                <p className="projects-showcase-desc">{project.description}</p>
                <a href={project.url} className="projects-showcase-cta" target="_blank" rel="noopener noreferrer">
                  ( VISIT SITE ↗ )
                </a>
              </div>

              {/* Right: floating mockups */}
              <div className="projects-showcase-right">
                <div className="projects-showcase-mockups">
                  <div className="projects-mockup projects-mockup--back" />
                  <div className="projects-mockup projects-mockup--mid" />
                  <div className="projects-mockup projects-mockup--front">
                    <div className="projects-mockup-browser">
                      <div className="projects-mockup-bar">
                        <span>Shop</span>
                        <span>Search</span>
                        <span className="projects-mockup-brand">Modevelle</span>
                        <span>Profile</span>
                        <span>Cart (0)</span>
                      </div>
                      <div className="projects-mockup-filters">
                        <span>Jeans</span>
                        <span>Sizes</span>
                        <button type="button">Clear filters</button>
                        <span className="projects-mockup-sort">Sort: Newest</span>
                      </div>
                      <div className="projects-mockup-products">
                        {['The Classic High-Rise Flare Jean', 'Shadow Comfort Jeans', 'Slim Fit Denim'].map((name, i) => (
                          <div key={i} className="projects-mockup-product">
                            <div className="projects-mockup-product-img" />
                            <span className="projects-mockup-product-name">{name}</span>
                            <span className="projects-mockup-product-price">INR 2000.0</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: project nav dots */}
            <div className="projects-showcase-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`projects-showcase-dot ${i === currentIndex ? 'is-active' : ''}`}
                  onClick={() => handleSelect(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
