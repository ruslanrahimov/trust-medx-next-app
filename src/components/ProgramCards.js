'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProgramCards({ dict, lang }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const programs = useMemo(() => [
    {
      type: 'managers',
      data: dict.academy.programs.managers,
      accentColor: '#5FA8A3',
      accentLight: '#E8F5F4',
      imageGradient: 'from-[#5FA8A3]/20 via-[#5FA8A3]/10 to-[#5FA8A3]/5',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
          <circle cx="21" cy="5" r="2" fill="currentColor" />
        </svg>
      ),
      href: `/${lang}/academy/managers`,
    },
    {
      type: 'doctors',
      data: dict.academy.programs.doctors,
      accentColor: '#D4A574',
      accentLight: '#F8F0E5',
      imageGradient: 'from-[#D4A574]/20 via-[#D4A574]/10 to-[#D4A574]/5',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.96 0L15 8" />
        </svg>
      ),
      href: `/${lang}/academy/doctors`,
    },
  ], [dict, lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            opacity: 0,
            y: 80,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
          });

          // Features list animation
          const features = card.querySelectorAll('.feature-item');
          features.forEach((feature, idx) => {
            gsap.from(feature, {
              scrollTrigger: {
                trigger: feature,
                start: 'top 90%',
              },
              opacity: 0,
              x: -20,
              duration: 0.5,
              delay: idx * 0.1,
              ease: 'power2.out',
            });
          });

          // Dramatic hover animations
          const cardInner = card.querySelector('.program-card-inner');
          const accentColor = programs[index].accentColor;

          card.addEventListener('mouseenter', () => {
            // Enhanced shadow with dramatic glow
            gsap.to(cardInner, {
              boxShadow: `
                0 25px 80px -20px ${accentColor}50,
                0 0 0 2px ${accentColor}30,
                0 0 60px ${accentColor}20,
                inset 0 1px 0 0 rgba(255,255,255,0.9)
              `,
              duration: 0.7,
              ease: 'power3.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(cardInner, {
              boxShadow: `
                0 10px 40px -10px ${accentColor}30,
                0 0 0 1px ${accentColor}15,
                inset 0 1px 0 0 rgba(255,255,255,0.8)
              `,
              duration: 0.7,
              ease: 'power3.out',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [programs]);

  return (
    <section
      id="choose-path"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#FAF8F0] via-[#FEFBF6] to-[#F8F5EE] overflow-hidden"
    >
      {/* Layered decorative backgrounds with accent colors */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#5FA8A3]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D4A574]/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#4A3B2C]/3 rounded-full blur-3xl" />

      {/* Geometric accent shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#5FA8A3]">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-10 w-40 h-40 opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4A574]">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Enhanced grid pattern with accent */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #5FA8A3 1px, transparent 1px),
            linear-gradient(to bottom, #D4A574 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line x1="0" y1="30%" x2="100%" y2="40%" stroke="#5FA8A3" strokeWidth="1" />
          <line x1="0" y1="60%" x2="100%" y2="70%" stroke="#D4A574" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header - Enhanced */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 relative">
          {/* Decorative accent bars */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px opacity-10">
            <div className="absolute left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#5FA8A3] to-transparent" />
            <div className="absolute right-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#D4A574] to-transparent" />
          </div>

          <div className="relative">
            {/* Title with accent underline */}
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A3B2C] mb-3 font-[family-name:var(--font-fraunces)]">
                {dict.academy.programs.title}
              </h2>
              {/* Accent underline */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-[#5FA8A3] via-[#D4A574] to-[#5FA8A3] opacity-30" />
            </div>

            <p className="text-base md:text-lg text-[#4A3B2C]/70 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-dm-sans)] mt-5">
              {dict.academy.programs.subtitle}
            </p>
          </div>
        </div>

        {/* Program Cards Grid - Equal Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:grid-rows-1">
          {programs.map((program, index) => (
            <div
              key={program.type}
              ref={(el) => (cardsRef.current[index] = el)}
              className="program-card h-full"
            >
              <Link href={program.href} className="block group h-full">
                <div
                  className="program-card-inner relative h-full min-h-[560px] lg:h-full rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${program.accentColor}08 0%, white 50%, ${program.accentColor}05 100%)`,
                    boxShadow: `
                      0 10px 40px -10px ${program.accentColor}30,
                      0 0 0 1px ${program.accentColor}15,
                      inset 0 1px 0 0 rgba(255,255,255,0.8)
                    `,
                  }}
                >
                  {/* Image Placeholder Area - Bold Design */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    {/* Rich gradient background */}
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${program.accentColor} 0%, ${program.accentColor}dd 100%)`,
                      }}
                    />

                    {/* Layered gradient overlay for depth */}
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: `radial-gradient(circle at 30% 50%, transparent 0%, ${program.accentColor} 100%)`,
                      }}
                    />

                    {/* Animated geometric pattern */}
                    <div
                      className="absolute inset-0 opacity-10 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, white 25%, transparent 25%),
                          linear-gradient(-45deg, white 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, white 75%),
                          linear-gradient(-45deg, transparent 75%, white 75%)
                        `,
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
                      }}
                    />

                    {/* Icon with dramatic styling */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 text-white drop-shadow-2xl"
                      >
                        {program.icon}
                      </div>
                    </div>

                    {/* Diagonal accent stripe */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-60 opacity-20 rotate-12 transition-transform duration-700 group-hover:rotate-[20deg] group-hover:scale-110"
                      style={{ backgroundColor: 'white' }}
                    />

                    {/* Bottom gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: program.accentColor }}>
                        Image placeholder
                      </span>
                    </div>
                  </div>

                  {/* Content - Expressive Design */}
                  <div className="relative flex flex-col p-7 md:p-8">
                    {/* Vertical accent bar */}
                    <div
                      className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full transition-all duration-500 group-hover:w-1.5"
                      style={{
                        background: `linear-gradient(to bottom, ${program.accentColor}, ${program.accentColor}40)`,
                      }}
                    />

                    {/* Badge - Tilted design */}
                    <div className="relative inline-flex self-start mb-5">
                      <div
                        className="px-4 py-2 rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-2 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${program.accentColor} 0%, ${program.accentColor}dd 100%)`,
                        }}
                      >
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white font-[family-name:var(--font-dm-sans)]">
                          {program.data.badge}
                        </span>
                      </div>
                      {/* Badge shadow accent */}
                      <div
                        className="absolute -bottom-1 -right-1 w-full h-full rounded-lg -z-10 opacity-30"
                        style={{ backgroundColor: program.accentColor }}
                      />
                    </div>

                    {/* Title - Bold & Expressive */}
                    <div className="relative mb-4">
                      <h3 className="text-3xl md:text-4xl font-black text-[#4A3B2C] leading-tight font-[family-name:var(--font-fraunces)] transition-colors duration-300 group-hover:text-[#2a2520]">
                        {program.data.title}
                      </h3>
                      {/* Title accent line */}
                      <div
                        className="absolute -left-2 top-1/2 w-0 h-1 rounded-full transition-all duration-500 group-hover:w-6"
                        style={{ backgroundColor: program.accentColor }}
                      />
                    </div>

                    {/* Description with accent */}
                    <p className="text-[#4A3B2C]/70 text-sm md:text-base mb-6 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                      {program.data.description}
                    </p>

                    {/* Features List - Enhanced */}
                    <ul className="space-y-3 mb-7 flex-grow">
                      {program.data.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="feature-item flex items-start gap-3 text-[#4A3B2C]/80 group/item"
                        >
                          {/* Checkmark with gradient background */}
                          <div className="relative flex-shrink-0 mt-0.5">
                            <div
                              className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-12"
                              style={{
                                background: `linear-gradient(135deg, ${program.accentColor} 0%, ${program.accentColor}cc 100%)`,
                                boxShadow: `0 2px 8px ${program.accentColor}40`,
                              }}
                            >
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          </div>
                          <span className="font-[family-name:var(--font-dm-sans)] text-sm md:text-base leading-relaxed transition-transform duration-300 group-hover/item:translate-x-1">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Duration & CTA - Bold Design */}
                    <div className="relative mt-auto">
                      {/* Gradient divider */}
                      <div
                        className="h-px mb-5"
                        style={{
                          background: `linear-gradient(to right, transparent, ${program.accentColor}40, transparent)`,
                        }}
                      />

                      <div className="flex items-center justify-between">
                        {/* Duration badge */}
                        <div
                          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: `${program.accentColor}10`,
                            border: `1px solid ${program.accentColor}20`,
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: program.accentColor }}
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="font-bold text-xs font-[family-name:var(--font-dm-sans)]" style={{ color: program.accentColor }}>
                            {program.data.duration}
                          </span>
                        </div>

                        {/* CTA with dramatic style */}
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm font-[family-name:var(--font-dm-sans)] transition-all duration-500 group-hover:gap-3 group-hover:px-5"
                          style={{
                            background: `linear-gradient(135deg, ${program.accentColor} 0%, ${program.accentColor}dd 100%)`,
                            color: 'white',
                            boxShadow: `0 4px 12px ${program.accentColor}40`,
                          }}
                        >
                          <span>{program.data.cta}</span>
                          <svg
                            className="arrow-icon w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Floating corner accent */}
                    <div
                      className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-0 transition-all duration-700 group-hover:opacity-20 group-hover:scale-150 blur-2xl pointer-events-none"
                      style={{ backgroundColor: program.accentColor }}
                    />
                  </div>

                  {/* Bottom right diagonal accent */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
                    <div
                      className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-5 transition-all duration-700 group-hover:opacity-10 group-hover:scale-125"
                      style={{ backgroundColor: program.accentColor }}
                    />
                  </div>

                  {/* Decorative corner lines */}
                  <div className="absolute top-0 left-0 w-20 h-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <line x1="0" y1="20" x2="30" y2="20" stroke={program.accentColor} strokeWidth="2" />
                      <line x1="20" y1="0" x2="20" y2="30" stroke={program.accentColor} strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
