'use client';

import { VscHome, VscLayers, VscAccount, VscBriefcase, VscMail } from 'react-icons/vsc';
import Dock from './ui/Dock';
import { CurtainTransition } from './ui/curtain-transition';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleNavClick = (section: string, routePath?: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      if (routePath) {
        router.push(routePath);
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 950);
  };

  const items = [
    { icon: <VscHome size={20} className="text-neutral-700" />, label: 'Home', onClick: () => handleNavClick('hero', '/') },
    { icon: <VscLayers size={20} className="text-neutral-700" />, label: 'Projects', onClick: () => handleNavClick('projects', '/projects') },
    { icon: <VscAccount size={20} className="text-neutral-700" />, label: 'About', onClick: () => handleNavClick('about') },
    { icon: <VscBriefcase size={20} className="text-neutral-700" />, label: 'Services', onClick: () => handleNavClick('services') },
    { icon: <VscMail size={20} className="text-neutral-700" />, label: 'Contact', onClick: () => handleNavClick('footer') },
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
