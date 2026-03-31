'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, FileCheck, Award, Users, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const steps = [
  {
    icon: FileCheck,
    title: 'Проверка лицензий',
    description: 'Все разрешения, сертификаты и документы клиники проходят многоуровневую проверку',
    accent: '#5FA8A3',
    tag: 'Документация',
  },
  {
    icon: Users,
    title: 'Квалификация врачей',
    description: 'Опыт, специализация и репутация каждого специалиста подтверждены независимо',
    accent: '#D4A574',
    tag: 'Специалисты',
  },
  {
    icon: Award,
    title: 'Стандарты лечения',
    description: 'Клиника соответствует международным протоколам и стандартам качества JCI / ISO',
    accent: '#7EBDB8',
    tag: 'Качество',
  },
  {
    icon: CheckCircle2,
    title: 'Официальное партнёрство',
    description: 'Подписание соглашений и юридическое оформление — только после всех этапов',
    accent: '#C89563',
    tag: 'Договор',
  },
];

export default function AboutSystem({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.as-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, x: -36, duration: 1, ease: 'power3.out',
      });
      gsap.fromTo(
        '.as-card',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', immediateRender: false,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden"
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
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">

          {/* ── LEFT — text ── */}
          <div className="as-head flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/45" style={{ fontFamily: BODY_FONT }}>
                Наша система
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-8"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              Надёжная система взаимодействия
            </h2>
            <div className="w-10 h-0.5 mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #5FA8A3, #D4A574)' }} />
            <p className="text-base text-white/55 leading-[1.8]" style={{ fontFamily: BODY_FONT }}>
              {dict.aboutPage.mission.paragraph1}
            </p>
          </div>

          {/* ── RIGHT — 2×2 cards ── */}
          <div className="as-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="as-card group relative rounded-2xl overflow-hidden flex flex-col cursor-default transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: `0 0 0 0 ${step.accent}00`,
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-0.5 w-full shrink-0 transition-all duration-300 group-hover:h-1"
                    style={{ background: `linear-gradient(90deg, ${step.accent}, ${step.accent}66)` }}
                  />

                  <div className="relative p-5 flex flex-col flex-1">
                    {/* Watermark number */}
                    <span
                      className="absolute -right-2 -top-3 text-[5rem] font-bold leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        fontFamily: DISPLAY_FONT,
                        color: `${step.accent}12`,
                        lineHeight: 1,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Header row: icon + tag */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${step.accent}18`,
                          border: `1px solid ${step.accent}35`,
                          boxShadow: `0 4px 14px ${step.accent}22`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: step.accent, strokeWidth: 1.75 }} />
                      </div>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full"
                        style={{
                          color: step.accent,
                          background: `${step.accent}15`,
                          border: `1px solid ${step.accent}30`,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[15px] font-semibold text-white leading-snug mb-2"
                      style={{ fontFamily: DISPLAY_FONT }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[12px] text-white/50 leading-relaxed mt-auto"
                      style={{ fontFamily: BODY_FONT }}
                    >
                      {step.description}
                    </p>

                    {/* Bottom verified row */}
                    <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/07">
                      <ShieldCheck className="w-3 h-3" style={{ color: step.accent, strokeWidth: 2 }} />
                      <span
                        className="text-[10px] uppercase tracking-widest font-medium"
                        style={{ color: `${step.accent}99`, fontFamily: BODY_FONT }}
                      >
                        Верифицировано
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
