'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const pillars = [
  { title: 'Честность',    description: 'Прозрачность на каждом этапе взаимодействия с пациентом', color: '#5FA8A3' },
  { title: 'Безопасность', description: 'Здоровье и безопасность пациента — наш главный приоритет', color: '#D4A574' },
  { title: 'Результат',    description: 'Фокус на реальном результате лечения и долгосрочном благополучии', color: '#5FA8A3' },
];

export default function AboutPhilosophy({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aph-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 16, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.aph-quote', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        opacity: 0, y: 36, duration: 1.1, ease: 'power3.out', delay: 0.1,
      });
      gsap.fromTo(
        '.aph-pillar',
        { opacity: 0, y: 24 },
        {
          scrollTrigger: { trigger: '.aph-pillars', start: 'top 86%', once: true },
          opacity: 1, y: 0, stagger: 0.14, duration: 0.8, ease: 'power3.out', immediateRender: false,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">

        {/* Label */}
        <div className="aph-label flex items-center gap-3 mb-6 md:mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] shrink-0" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
            Наша философия
          </span>
        </div>

        {/* Quote — full width, inline flow */}
        <div className="aph-quote relative mb-8 md:mb-14 px-8 py-4">
          {/* Opening mark — top left */}
          <span
            className="absolute top-0 left-0 leading-none select-none pointer-events-none"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: '5rem',
              lineHeight: '0.75',
              color: '#D4A574',
              opacity: 0.25,
            }}
          >
            "
          </span>

          <p
            className="text-xl md:text-2xl font-medium text-[#4A3B2C] leading-[1.7] tracking-tight italic relative z-10"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {dict.aboutPage.mission.philosophy}
          </p>

          {/* Closing mark — bottom right */}
          <span
            className="absolute bottom-0 right-0 leading-none select-none pointer-events-none"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: '5rem',
              lineHeight: '0.75',
              color: '#5FA8A3',
              opacity: 0.25,
            }}
          >
            "
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-12" style={{ background: 'rgba(74,59,44,0.07)' }} />

        {/* Pillars — editorial, no cards */}
        <div className="aph-pillars grid md:grid-cols-3">
          {pillars.map((pillar, index) => (
              <div
                key={index}
                className={`aph-pillar group px-0 md:px-10 py-2 md:py-0 ${index > 0 ? 'md:border-l md:border-[rgba(74,59,44,0.08)]' : ''}`}
              >
                <h3
                  className="text-xl font-bold text-[#4A3B2C] mb-3"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {pillar.title}
                </h3>

                <p
                  className="text-[13px] text-[#4A3B2C]/52 leading-relaxed"
                  style={{ fontFamily: BODY_FONT }}
                >
                  {pillar.description}
                </p>

                <div
                  className="mt-4 h-px rounded-full transition-all duration-500 group-hover:opacity-100"
                  style={{ width: '2rem', background: pillar.color, opacity: 0.3 }}
                />
              </div>
          ))}
        </div>

      </div>
    </section>
  );
}
