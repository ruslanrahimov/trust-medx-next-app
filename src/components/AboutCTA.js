'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCTA({ dict, lang }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Floating decorative elements
      gsap.to('.cta-float-1', {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to('.cta-float-2', {
        y: -15,
        x: -10,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEFBF6] via-[#FBF8F1] to-[#F8F5EE]" />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="cta-float-1 absolute top-1/4 -right-20 w-80 h-80 bg-gradient-to-br from-[#5FA8A3]/15 to-[#7EBDB8]/5 rounded-full blur-3xl" />
        <div className="cta-float-2 absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-[#D4A574]/15 to-[#E8C9A0]/5 rounded-full blur-3xl" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          ref={contentRef}
          className="relative p-12 md:p-16 bg-white/80 backdrop-blur-sm rounded-[3rem] border border-[#4A3B2C]/10 shadow-2xl shadow-[#5FA8A3]/10 overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5FA8A3]/5 via-transparent to-[#D4A574]/5" />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#5FA8A3]/20 to-transparent blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-[#D4A574]/20 to-transparent blur-2xl" />

          {/* Content */}
          <div className="relative text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] shadow-lg shadow-[#5FA8A3]/30">
              <Phone className="w-10 h-10 text-white" strokeWidth={2} />
            </div>

            {/* Title */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-6"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
              }}
            >
              {dict.aboutPage.cta.title}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#4A3B2C]/70 max-w-2xl mx-auto mb-10 leading-relaxed font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.cta.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Button */}
              <button
                onClick={() => window.dispatchEvent(new Event('open-consultation-modal'))}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#5FA8A3] to-[#4A9691] text-white font-semibold shadow-lg shadow-[#5FA8A3]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#5FA8A3]/40 hover:-translate-y-1 font-[family-name:var(--font-dm-sans)]"
              >
                <span>{dict.aboutPage.cta.primaryButton}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary Button */}
              <a
                href={`/${lang}/for-patients`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#4A3B2C]/20 bg-white/80 text-[#4A3B2C] font-semibold backdrop-blur-sm transition-all duration-300 hover:border-[#4A3B2C]/40 hover:bg-white hover:-translate-y-1 hover:shadow-lg font-[family-name:var(--font-dm-sans)]"
              >
                {dict.aboutPage.cta.secondaryButton}
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-[#4A3B2C]/10">
              <div className="flex flex-wrap items-center justify-center gap-8">
                {/* Trust indicator 1 */}
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#5FA8A3]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-[#4A3B2C]/70 font-[family-name:var(--font-dm-sans)]">
                    Verified Clinics
                  </span>
                </div>

                {/* Trust indicator 2 */}
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#5FA8A3]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm text-[#4A3B2C]/70 font-[family-name:var(--font-dm-sans)]">
                    24/7 Support
                  </span>
                </div>

                {/* Trust indicator 3 */}
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#5FA8A3]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-[#4A3B2C]/70 font-[family-name:var(--font-dm-sans)]">
                    100% Secure
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#5FA8A3]/20 rounded-tl-3xl" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#D4A574]/20 rounded-br-3xl" />
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
