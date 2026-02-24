'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TreatmentCTA({ dict, lang }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-br from-[#FEFBF6] to-[#F8F5EE] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#5FA8A3]/10 to-transparent blur-3xl" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#D4A574]/10 to-transparent blur-3xl" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle, #4A3B2C 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div
          ref={contentRef}
          className="relative p-10 md:p-16 rounded-3xl bg-white/60 backdrop-blur-sm border border-[#5FA8A3]/20 shadow-2xl overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5FA8A3]/5 via-transparent to-[#D4A574]/5" />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#5FA8A3]/10 border border-[#5FA8A3]/20">
              <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
              <span className="text-sm font-semibold text-[#5FA8A3] tracking-wide font-[family-name:var(--font-dm-sans)]">
                {dict.treatmentAbroad.cta.badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B2C] mb-6 font-[family-name:var(--font-fraunces)] leading-tight">
              {dict.treatmentAbroad.cta.title}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#4A3B2C]/70 mb-10 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-dm-sans)]">
              {dict.treatmentAbroad.cta.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${lang}/online-consultation`}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden font-[family-name:var(--font-dm-sans)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {dict.treatmentAbroad.cta.primaryButton}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A9691] to-[#5FA8A3] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <Link
                href={`/${lang}/contacts`}
                className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm text-[#4A3B2C] font-semibold border-2 border-[#4A3B2C]/20 hover:border-[#5FA8A3]/50 hover:bg-white transition-all duration-500 hover:-translate-y-1 font-[family-name:var(--font-dm-sans)]"
              >
                {dict.treatmentAbroad.cta.secondaryButton}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-10 pt-8 border-t border-[#4A3B2C]/10">
              <div className="flex items-center gap-2 text-sm text-[#4A3B2C]/60 font-[family-name:var(--font-dm-sans)]">
                <svg className="w-5 h-5 text-[#5FA8A3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{dict.treatmentAbroad.cta.trust1}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#4A3B2C]/60 font-[family-name:var(--font-dm-sans)]">
                <svg className="w-5 h-5 text-[#5FA8A3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{dict.treatmentAbroad.cta.trust2}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#4A3B2C]/60 font-[family-name:var(--font-dm-sans)]">
                <svg className="w-5 h-5 text-[#5FA8A3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{dict.treatmentAbroad.cta.trust3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
