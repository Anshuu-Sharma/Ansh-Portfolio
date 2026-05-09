'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useProjectScroll = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.project-section')
    
    sections.forEach((section, index) => {
      const content = section.querySelector('.project-content')
      
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: '+=100%',
          scrub: true,
          pin: true,
          pinSpacing: false,
        }
      })
      .to(content, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to(content, {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.in'
      }, '+=0.5')
    })
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}
