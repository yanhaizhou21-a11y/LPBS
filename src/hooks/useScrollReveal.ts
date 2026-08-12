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
  fadeAway?: boolean;
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
        if (reduceMotion) {
          gsap.set(el.querySelectorAll('[data-reveal]').length > 0 ? el.querySelectorAll('[data-reveal]') : [el], {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          });
          return;
        }

        const targets = el.querySelectorAll('[data-reveal]');
        const elementsToAnimate = targets.length > 0 ? targets : [el];

        gsap.fromTo(
          elementsToAnimate,
          {
            autoAlpha: 0,
            y: options.y ?? 30,
            scale: 0.98,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: options.duration ?? 0.7,
            delay: options.delay ?? 0,
            stagger: options.stagger ?? 0.08,
            ease: options.ease ?? 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: options.triggerHook ?? 'top 86%',
              end: 'bottom 10%',
              toggleActions: options.fadeAway === true ? 'play reverse play reverse' : 'play none none reverse',
            },
          }
        );
      }
    );

    return () => {
      mm.revert();
    };
  }, [options.stagger, options.y, options.duration, options.delay, options.ease, options.triggerHook, options.fadeAway]);

  return containerRef;
}

export default useScrollReveal;
