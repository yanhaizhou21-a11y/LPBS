import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  triggerHook?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        if (reduceMotion) return;

        const targets = el.querySelectorAll('[data-reveal]');
        const elementsToAnimate = targets.length > 0 ? targets : [el];

        gsap.fromTo(
          elementsToAnimate,
          {
            opacity: 0,
            y: options.y ?? 28,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: options.duration ?? 0.65,
            delay: options.delay ?? 0,
            stagger: options.stagger ?? 0.08,
            ease: options.ease ?? 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: options.triggerHook ?? 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    );

    return () => {
      mm.revert();
    };
  }, [options.stagger, options.y, options.duration, options.delay, options.ease, options.triggerHook]);

  return containerRef;
}

export default useScrollReveal;
