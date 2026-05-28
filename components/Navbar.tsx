'use client';

import { VscHome, VscLayers, VscAccount, VscTerminal } from 'react-icons/vsc';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Dock from './ui/Dock';
import { CurtainTransition } from './ui/curtain-transition';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Lift the curtain only when the pathname actually changes to our target
  useEffect(() => {
    if (targetRoute && pathname === targetRoute) {
      // Wait long enough for heavy pages (like Home with Spline) to mount
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setTargetRoute(null);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [pathname, targetRoute]);

  const handleNavClick = (section: string, routePath?: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Ensure the curtain is fully dropped (900ms animation) before pushing the route
    setTimeout(() => {
      if (routePath && routePath !== pathname) {
        setTargetRoute(routePath);
        router.push(routePath);
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }
    }, 1000); // Increased from 950ms to 1000ms for safety
  };

  const items = [
    { icon: <VscHome size={20} className="text-neutral-700" />, label: 'Home', onClick: () => handleNavClick('hero', '/') },
    { icon: <VscLayers size={20} className="text-neutral-700" />, label: 'Projects', onClick: () => handleNavClick('projects', '/projects') },
    { icon: <VscAccount size={20} className="text-neutral-700" />, label: 'About', onClick: () => handleNavClick('about', '/about') },
    { icon: <VscTerminal size={20} className="text-neutral-700" />, label: 'Playground', onClick: () => handleNavClick('playground', '/playground') },
    { icon: <FaGithub size={20} className="text-neutral-700" />, label: 'GitHub', onClick: () => window.open('https://github.com/Anshuu-Sharma', '_blank') },
    { icon: <FaLinkedin size={20} className="text-neutral-700" />, label: 'LinkedIn', onClick: () => window.open('https://linkedin.com/in/ansh-sharma-36a936143', '_blank') },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <Dock 
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      </div>
      <CurtainTransition isActive={isTransitioning} />
    </>
  );
}
