'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [showTransition, setShowTransition] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show mini-nav as soon as we hide the original navbar (small scroll), not after hero
      const scrollThreshold = 60;
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setShowTransition(true);
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => setShowTransition(false), 300);
    }, 150);
  };

  return (
    <>
      {/* Original navbar - shown when not scrolled */}
      <nav className={`navbar ${isScrolled ? 'navbar-hidden' : ''}`}>
        <div className="container">
          <div className="navbar-contain">
            <div className="logo">|| ANSH SHARMA ||</div>
            <ul className="nav-links">
              <span className="nav-link" onClick={() => handleNavClick('projects')}>
                Projects
              </span>
              <span className="nav-link" onClick={() => handleNavClick('about')}>
                About me
              </span>
              <span className="nav-link" onClick={() => handleNavClick('services')}>
                Services
              </span>
              <span className="nav-link" onClick={() => handleNavClick('footer')}>
                Contact
              </span>
            </ul>
          </div>
        </div>
      </nav>

      {/* Floating navbar - shown when scrolled */}
      <nav className={`floating-navbar ${isScrolled ? 'floating-navbar-visible' : ''}`}>
        <div
          className={`floating-navbar-container ${isMenuOpen ? 'floating-navbar-container-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className={`hamburger-icon ${isMenuOpen ? 'hamburger-icon-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={`floating-nav-menu ${isMenuOpen ? 'floating-nav-menu-open' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="floating-nav-link" onClick={() => handleNavClick('hero')}>
              HOME
            </span>
            <span className="floating-nav-link" onClick={() => handleNavClick('projects')}>
              PROJECTS
            </span>
            <span className="floating-nav-link" onClick={() => handleNavClick('about')}>
              ABOUT ME
            </span>
            <span className="floating-nav-link" onClick={() => handleNavClick('services')}>
              SERVICES & CAPABILITIES
            </span>
            <span className="floating-nav-link" onClick={() => handleNavClick('footer')}>
              CONTACT
            </span>
          </div>
        </div>
      </nav>

      <div className={`transition-curtain ${showTransition ? 'active' : ''}`}>
        <span className="navitaion-text title">Home</span>
      </div>
    </>
  );
}
