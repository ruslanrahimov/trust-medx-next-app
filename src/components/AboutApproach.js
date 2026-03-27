'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, HeartHandshake, Stethoscope, Eye, Baby, Smile } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const specialties = [
  { icon: Smile, name: 'Стоматология', color: '#5FA8A3' },
  { icon: Stethoscope, name: 'Эстетическая медицина', color: '#D4A574' },
  { icon: HeartHandshake, name: 'Пластическая хирургия', color: '#5FA8A3' },
  { icon: Eye, name: 'Офтальмология', color: '#D4A574' },
  { icon: Baby, name: 'Репродуктивные программы', color: '#5FA8A3' },
  { icon: Target, name: 'И другие направления', color: '#D4A574' },
];

const processSteps = [
  { step: '01', text: 'Первичный запрос и анализ ситуации', color: '#5FA8A3' },
  { step: '02', text: 'Подбор врача и клиники', color: '#D4A574' },
  { step: '03', text: 'Организация и планирование', color: '#5FA8A3' },
  { step: '04', text: 'Лечение и координация', color: '#D4A574' },
  { step: '05', text: 'Возвращение домой и поддержка', color: '#5FA8A3' },
];

export default function AboutApproach({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aap-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 36, duration: 1, ease: 'power3.out',
      });
      gsap.from('.aap-steps', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, x: 36, duration: 1, ease: 'power3.out', delay: 0.15,
      });
      gsap.fromTo(
        '.aap-spec',
        { opacity: 0, y: 24 },
        {
          scrollTrigger: { trigger: '.aap-spec-grid', start: 'top 85%', once: true },
          opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: 'power3.out', immediateRender: false,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start mb-24">

          {/* ── LEFT ── */}
          <div className="aap-head">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                Наш подход
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#4A3B2C] leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              Комплексное{' '}
              <span
                style={{
                  background: 'linear-gradient(110deg, #5FA8A3 0%, #4A9691 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                сопровождение
              </span>
            </h2>
            <p className="text-base md:text-[1.05rem] text-[#4A3B2C]/58 leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
              {dict.aboutPage.mission.paragraph2}
            </p>

            {/* Accent feature */}
            <div
              className="flex items-start gap-4 p-6 rounded-xl border border-[#4A3B2C]/08"
              style={{ backgroundColor: '#F7F3EE' }}
            >
              <div
                className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #5FA8A3, #4A9691)' }}
              >
                <HeartHandshake className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#4A3B2C] mb-1" style={{ fontFamily: DISPLAY_FONT }}>
                  Общая цель команды
                </p>
                <p className="text-[13px] text-[#4A3B2C]/55 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                  Обеспечить пациенту уверенность, безопасность и результат
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT — numbered steps ── */}
          <div className="aap-steps">
            <p className="text-sm font-semibold text-[#4A3B2C]/40 uppercase tracking-[0.14em] mb-8" style={{ fontFamily: BODY_FONT }}>
              Этапы сопровождения
            </p>
            <div className="space-y-0">
              {processSteps.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 py-5 group"
                  style={{ borderBottom: index < processSteps.length - 1 ? '1px solid rgba(74,59,44,0.07)' : 'none' }}
                >
                  <span
                    className="shrink-0 text-xs font-bold tracking-widest"
                    style={{ color: item.color, fontFamily: BODY_FONT, minWidth: '2rem' }}
                  >
                    {item.step}
                  </span>
                  <p className="flex-1 text-sm md:text-[15px] text-[#4A3B2C]/65 group-hover:text-[#4A3B2C]/85 transition-colors duration-200" style={{ fontFamily: BODY_FONT }}>
                    {item.text}
                  </p>
                  <div className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, opacity: 0.4 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Specialties ── */}
        <div>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                  Направления
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#4A3B2C] leading-tight" style={{ fontFamily: DISPLAY_FONT }}>
                Направления работы
              </h3>
            </div>
            <p className="hidden md:block text-sm text-[#4A3B2C]/45 max-w-xs text-right leading-relaxed" style={{ fontFamily: BODY_FONT }}>
              {dict.aboutPage.mission.paragraph3}
            </p>
          </div>

          <div className="aap-spec-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon;
              return (
                <div key={index} className="aap-spec group">
                  <div
                    className="p-5 bg-white rounded-xl border border-[#4A3B2C]/08 transition-all duration-300 hover:border-[#4A3B2C]/16 hover:shadow-md hover:-translate-y-0.5 text-center"
                  >
                    <div
                      className="w-11 h-11 mx-auto mb-3 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${specialty.color}12`, border: `1px solid ${specialty.color}22` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: specialty.color }} strokeWidth={1.75} />
                    </div>
                    <p className="text-[12px] font-medium text-[#4A3B2C]/60 leading-snug" style={{ fontFamily: BODY_FONT }}>
                      {specialty.name}
                    </p>
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
