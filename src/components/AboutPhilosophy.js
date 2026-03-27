'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Shield, Target } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const pillars = [
  { icon: Heart, title: 'Честность', description: 'Прозрачность на каждом этапе взаимодействия с пациентом', color: '#5FA8A3' },
  { icon: Shield, title: 'Безопасность', description: 'Безопасность и здоровье пациента — наш главный приоритет', color: '#D4A574' },
  { icon: Target, title: 'Результат', description: 'Фокус на реальном результате лечения и долгосрочном благополучии', color: '#5FA8A3' },
];

export default function AboutPhilosophy({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aph-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 18, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.aph-quote', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        opacity: 0, y: 50, duration: 1.1, ease: 'power3.out', delay: 0.1,
      });
      gsap.fromTo(
        '.aph-pillar',
        { opacity: 0, y: 32 },
        {
          scrollTrigger: { trigger: '.aph-pillars', start: 'top 86%', once: true },
          opacity: 1, y: 0, stagger: 0.16, duration: 0.85, ease: 'power3.out', immediateRender: false,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* Label */}
        <div className="aph-label flex items-center gap-3 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] shrink-0" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
            Наша философия
          </span>
        </div>

        {/* Large pullquote */}
        <div className="aph-quote max-w-4xl mb-20 md:mb-24">
          <div className="w-10 h-0.5 bg-gradient-to-r from-[#5FA8A3] to-[#D4A574] rounded-full mb-10" />
          <p
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#4A3B2C] leading-[1.25] tracking-tight"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {dict.aboutPage.mission.philosophy}
          </p>
          <div className="w-10 h-0.5 bg-gradient-to-r from-[#D4A574] to-[#5FA8A3] rounded-full mt-10 ml-auto" />
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-16" style={{ background: 'rgba(74,59,44,0.07)' }} />

        {/* Pillars */}
        <div className="aph-pillars grid md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="aph-pillar group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${pillar.color}14`, border: `1px solid ${pillar.color}28` }}
                >
                  <Icon className="w-5 h-5" style={{ color: pillar.color }} strokeWidth={1.75} />
                </div>
                <h3
                  className="text-2xl font-bold text-[#4A3B2C] mb-3"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[13px] text-[#4A3B2C]/55 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                  {pillar.description}
                </p>
                <div className="mt-5 w-8 h-0.5 rounded-full transition-all duration-300 group-hover:w-14" style={{ backgroundColor: pillar.color }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
