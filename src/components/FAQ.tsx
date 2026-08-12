import React from 'react';
import { MotionAccordion } from './ui/motion-faqs-accordion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { landingFaqItems } from '../data/landingFaq';

export const FAQ: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  return (
    <section id="faq" ref={containerRef} className="py-16 md:py-24 bg-emerald-50/50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-emerald-100/60 dark:border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 data-reveal className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Pertanyaan yang sering ditanyakan
        </h2>
        <div data-reveal className="mt-10 text-left">
          <MotionAccordion items={landingFaqItems} gap={10} className="faq-accordion" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
