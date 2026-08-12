import React from 'react';
import { MotionAccordion } from './ui/motion-faqs-accordion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { landingFaqItems } from '../data/landingFaq';

interface FAQSectionProps {
  onOpenCheckout?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = () => {
  const containerRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 30 });

  return (
    <section id="faq" ref={containerRef} className="faq-section py-16 sm:py-24">
      <div className="container faq-container mx-auto px-4 sm:px-6 max-w-4xl">
        <div data-reveal className="section-header premium-section-header premium-faq-header">
          <div className="inline-flex items-center rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-orange-700 mb-3 shadow-xs">
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pertanyaan yang Sering Ditanyakan
          </h2>
        </div>
        <div data-reveal>
          <MotionAccordion items={landingFaqItems} gap={10} className="faq-accordion" />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
