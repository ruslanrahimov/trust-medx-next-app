'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, FileCheck, Award, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const steps = [
  { icon: FileCheck, title: 'Проверка лицензий', description: 'Тщательная проверка всех разрешений, сертификатов и документов клиники', color: '#5FA8A3' },
  { icon: Users, title: 'Квалификация врачей', description: 'Оценка опыта, специализации и репутации каждого специалиста', color: '#7EBDB8' },
  { icon: Award, title: 'Стандарты лечения', description: 'Соответствие международным протоколам и стандартам качества', color: '#5FA8A3' },
  { icon: CheckCircle2, title: 'Официальное партнёрство', description: 'Подписание соглашений и юридическое оформление сотрудничества', color: '#7EBDB8' },
];

export default function AboutSystem({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.as-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 36, duration: 1, ease: 'power3.out',
      });
      gsap.fromTo(
        '.as-card',
        { opacity: 0, y: 50 },
        {
          scrollTrigger: { trigger: '.as-grid', start: 'top 80%', once: true },
          opacity: 1, y: 0, stagger: 0.16, duration: 0.9, ease: 'power3.out', immediateRender: false,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 50%, #2a4a47 100%)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Orbs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.28) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-48 -right-40 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.22) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* Header */}
        <div className="as-head max-w-2xl mb-20 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/45" style={{ fontFamily: BODY_FONT }}>
              Наша система
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            Надёжная система<br />взаимодействия
          </h2>
          <p className="text-lg text-white/55 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
            {dict.aboutPage.mission.paragraph1}
          </p>
        </div>

        <div className="w-full h-px mb-20" style={{ background: 'rgba(255,255,255,0.10)' }} />

        {/* Cards */}
        <div className="as-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="as-card group relative rounded-xl border border-white/12 bg-white/08 p-8 transition-all duration-300 hover:bg-white/13 hover:border-white/22 hover:-translate-y-1 cursor-default"
              >
                <p className="text-[11px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-6" style={{ fontFamily: BODY_FONT }}>
                  0{index + 1}
                </p>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${step.color}22`, border: `1px solid ${step.color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: step.color, strokeWidth: 1.75 }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug" style={{ fontFamily: DISPLAY_FONT }}>
                  {step.title}
                </h3>
                <p className="text-[13px] text-white/55 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
