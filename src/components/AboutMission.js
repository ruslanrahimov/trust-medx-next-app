'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutMission({ dict }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.from('.mission-badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // Title animation
      gsap.from('.mission-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
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
            y: 60,
            x: index === 0 ? -30 : 30,
            rotation: index === 0 ? -2 : 2,
            duration: 1,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-[#FEFBF6] to-[#FAF8F0]"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-[#5FA8A3]/10 to-[#7EBDB8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-[#D4A574]/10 to-[#E8C9A0]/5 rounded-full blur-3xl" />

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="mission-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#5FA8A3]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
            <span className="text-sm font-medium text-[#4A3B2C]/80 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.mission.badge}
            </span>
          </div>

          <h2
            className="mission-title text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-4 font-[family-name:var(--font-fraunces)]"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
            }}
          >
            {dict.aboutPage.mission.title}
          </h2>

          <p className="text-xl md:text-2xl text-[#5FA8A3] font-semibold mb-6 font-[family-name:var(--font-dm-sans)]">
            {dict.aboutPage.mission.subtitle}
          </p>
        </div>

        {/* About Company Content */}
        <div className="relative max-w-5xl mx-auto">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="relative p-8 md:p-12 bg-white/90 backdrop-blur-sm rounded-[2.5rem] border border-[#4A3B2C]/10 shadow-2xl shadow-[#5FA8A3]/10 mb-8"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#5FA8A3]/0 to-[#5FA8A3]/5" />

            {/* Content */}
            <div className="relative space-y-6">
              <p className="text-lg md:text-xl text-[#4A3B2C] font-semibold leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {dict.aboutPage.mission.intro}
              </p>

              <p className="text-base md:text-lg text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {dict.aboutPage.mission.description}
              </p>

              <p className="text-base md:text-lg text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {dict.aboutPage.mission.paragraph1}
              </p>

              <p className="text-base md:text-lg text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {dict.aboutPage.mission.paragraph2}
              </p>

              <p className="text-base md:text-lg text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {dict.aboutPage.mission.paragraph3}
              </p>
            </div>

            {/* Decorative corner element */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-[#5FA8A3]/20 to-transparent rounded-[2rem] -z-10 blur-xl" />
          </div>

          {/* Philosophy Card */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="group relative p-8 md:p-10 bg-gradient-to-br from-[#5FA8A3]/10 to-[#D4A574]/10 backdrop-blur-sm rounded-[2.5rem] border border-[#4A3B2C]/10 shadow-xl transition-all duration-500 hover:shadow-2xl"
          >
            {/* Icon */}
            <div className="relative inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl border border-[#4A3B2C]/15 bg-white/50 transition-all duration-300 group-hover:scale-105">
              <Target className="w-6 h-6 text-[#5FA8A3]" strokeWidth={2} />
            </div>

            {/* Content */}
            <h3
              className="text-2xl md:text-3xl font-bold text-[#4A3B2C] mb-4 font-[family-name:var(--font-fraunces)]"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
              }}
            >
              Наша философия
            </h3>

            <p className="text-base md:text-lg text-[#4A3B2C]/80 leading-relaxed font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.mission.philosophy}
            </p>

            {/* Decorative corner element */}
            <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-bl from-[#D4A574]/20 to-transparent rounded-[2rem] -z-10 blur-xl" />
          </div>
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
