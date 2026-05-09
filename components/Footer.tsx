'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const formatIST = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = String(ist.getHours()).padStart(2, '0');
      const m = String(ist.getMinutes()).padStart(2, '0');
      const s = String(ist.getSeconds()).padStart(2, '0');
      setIstTime(`${h}:${m}:${s}`);
    };
    formatIST();
    const interval = setInterval(formatIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        {/* Remarkable line + Let's work together */}
        <div className="footer-cta-block">
          <p className="footer-remarkable">Let&apos;s build and ship something remarkable. Open
to agency collaborations, freelance work, and
fully remote full-time opportunities.</p>
          <div className="work-together-wrap">
            <a
              className="work-together-pill"
              href="mailto:anshingsharma07@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="work-together-label">Let&apos;s work together</span>
              <svg className="work-together-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Line above LinkedIn / three columns - thickness & color in globals.css .footer-separator */}
        <div className="footer-separator" />

        {/* Three-column footer */}
        <div className="footer-columns">
          <div className="footer-col footer-col-left">
            {/* <a className="footer-link" href="mailto:anshingsharma07@gmail.com">
              hello.anshingsharma07@gmail.com
            </a> */}
            <a className="footer-link" target="_blank" href="https://www.linkedin.com/in/ansh-sharma-36a936143/" rel="noreferrer">
              LinkedIn
            </a>
            <a className="footer-link" target="_blank" href="https://github.com/Anshuu-Sharma" rel="noreferrer">
              GitHub
            </a>
            <a className="footer-link" target="_blank" href="https://leetcode.com/u/ansh7s/" rel="noreferrer">
              LeetCode
            </a>
          </div>
          <div className="footer-col footer-col-center">
            {/* <span className="footer-link footer-time">IST - {istTime}</span> */}
            <span className="footer-link footer-clickable" onClick={scrollToTop}>
              Back to top
            </span>
            <span className="footer-credit">Designed by <a href="http://khatri.in" target="_blank" rel="noreferrer">KHATRI</a></span>
            {/* <div className="footer-link footer-show-grid">
              <span>Show grid</span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="12" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="2" y="12" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="12" y="12" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div> */}
          </div>
          <div className="footer-col footer-col-right">
            {/* <span className="footer-credit">Designed by KHATRI</span> */}
          </div>
        </div>
      </div>

      {/* Large bottom title with glow */}
      <div className="footer-hero-wrap">
        <span className="footer-hero-marquee">
          <span className="footer-hero-text">|| Ansh Sharma ||</span>
          <span className="footer-hero-text" aria-hidden="true">|| Ansh Sharma ||</span>
          <span className="footer-hero-text" aria-hidden="true">|| Ansh Sharma ||</span>
        </span>
      </div>
    </footer>
  );
}
