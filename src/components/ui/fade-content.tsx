import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  container?: HTMLElement | string | null;
  direction?: 'right' | 'left' | 'up' | 'down' | 'none';
  distance?: number;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  toggleActions?: string;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
}

export const FadeContent: React.FC<FadeContentProps> = ({
  children,
  container,
  direction = 'right',
  distance = 40,
  blur = false,
  duration = 700,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.12,
  initialOpacity = 0,
  toggleActions = 'play none none reverse',
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { autoAlpha: 1, x: 0, y: 0, filter: 'blur(0px)' });
      return;
    }

    let scrollerTarget: Element | Window | null = null;
    if (typeof container === 'string') {
      scrollerTarget = document.querySelector(container);
    } else if (container) {
      scrollerTarget = container;
    } else {
      scrollerTarget = window;
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

    const offsetX = direction === 'right' ? distance : direction === 'left' ? -distance : 0;
    const offsetY = direction === 'down' ? distance : direction === 'up' ? -distance : 0;

    gsap.set(el, {
      autoAlpha: initialOpacity,
      x: offsetX,
      y: offsetY,
      filter: blur ? 'blur(8px)' : 'blur(0px)',
      willChange: 'opacity, filter, transform',
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            x: offsetX,
            y: offsetY,
            filter: blur ? 'blur(8px)' : 'blur(0px)',
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.(),
          });
        }
      },
    });

    tl.to(el, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      duration: getSeconds(duration),
      ease: ease,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      end: 'bottom 10%',
      animation: tl,
      toggleActions: toggleActions,
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, [
    container,
    direction,
    distance,
    blur,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
    toggleActions,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete,
  ]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
