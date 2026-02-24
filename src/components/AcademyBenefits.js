'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AcademyBenefits({ dict }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Alternating accent colors for visual interest
  const accentColors = ['#5FA8A3', '#D4A574', '#5FA8A3', '#D4A574'];

  const icons = {
    0: ( // Expert Faculty
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    1: ( // Practical Skills
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    2: ( // Global Network
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    3: ( // Certification
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#FEFBF6] via-[#FAF8F0] to-[#FEFBF6] overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-4 font-[family-name:var(--font-fraunces)]">
            {dict.academy.benefits.title}
          </h2>

          {/* Minimalist divider */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
            <div className="w-1 h-1 rounded-full bg-[#4A3B2C]/30" />
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
          </div>
        </div>

        {/* Benefits Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dict.academy.benefits.items.map((item, index) => {
            const accentColor = accentColors[index];
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="benefit-card group relative"
              >
                {/* Card - Bold Design */}
                <div
                  className="relative h-full p-6 rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}06 0%, white 50%, ${accentColor}04 100%)`,
                    boxShadow: `
                      0 8px 30px -8px ${accentColor}30,
                      0 0 0 1px ${accentColor}15,
                      inset 0 1px 0 0 rgba(255,255,255,0.9)
                    `,
                  }}
                >
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.02] transition-opacity duration-500 group-hover:opacity-[0.04]"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, ${accentColor} 25%, transparent 25%),
                        linear-gradient(-45deg, ${accentColor} 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, ${accentColor} 75%),
                        linear-gradient(-45deg, transparent 75%, ${accentColor} 75%)
                      `,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    }}
                  />

                  {/* Icon Container - Colored */}
                  <div className="benefit-icon relative mb-5">
                    {/* Colored background */}
                    <div
                      className="absolute inset-0 w-12 h-12 rounded-xl transition-all duration-500 group-hover:scale-105"
                      style={{
                        backgroundColor: accentColor,
                        opacity: 0.15,
                      }}
                    />
                    <div
                      className="absolute inset-0 w-12 h-12 rounded-xl border-2 transition-all duration-500 group-hover:border-opacity-100"
                      style={{
                        borderColor: accentColor,
                        borderOpacity: 0.3,
                      }}
                    />
                    {/* Icon */}
                    <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-500 group-hover:scale-110" style={{ color: accentColor }}>
                      {icons[index]}
                    </div>
                  </div>

                  {/* Number Badge - Refined */}
                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    <span
                      className="text-xs font-black font-[family-name:var(--font-dm-sans)]"
                      style={{ color: accentColor }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl md:text-2xl font-black text-[#4A3B2C] mb-3 leading-tight font-[family-name:var(--font-fraunces)] transition-colors duration-300 group-hover:text-[#2a2520]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                      {item.description}
                    </p>

                    {/* Accent underline */}
                    <div
                      className="mt-4 h-1 w-0 rounded-full transition-all duration-700 group-hover:w-12"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>

                  {/* Bottom accent glow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 opacity-0 transition-opacity duration-700 group-hover:opacity-30 blur-xl pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${accentColor}, transparent)`,
                    }}
                  />

                  {/* Corner decoration */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none">
                    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ color: accentColor }}>
                      <circle cx="28" cy="28" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                      <circle cx="28" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
