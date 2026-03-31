'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, HeartHandshake, Stethoscope, Eye, Baby, Smile, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const specialties = [
  { icon: Smile,          name: 'Стоматология',            sub: 'Имплантация, виниры, протезирование',    color: '#5FA8A3', tag: 'Популярно' },
  { icon: Stethoscope,    name: 'Эстетическая медицина',   sub: 'Омоложение, инъекции, аппаратная косметология', color: '#D4A574', tag: null },
  { icon: HeartHandshake, name: 'Пластическая хирургия',   sub: 'Ринопластика, липосакция, маммопластика',color: '#5FA8A3', tag: null },
  { icon: Eye,            name: 'Офтальмология',            sub: 'Лазерная коррекция, катаракта, глаукома',color: '#D4A574', tag: null },
  { icon: Baby,           name: 'Репродуктология',          sub: 'ЭКО, суррогатное материнство, диагностика', color: '#5FA8A3', tag: 'Популярно' },
  { icon: Target,         name: 'Другие направления',       sub: 'Онкология, ортопедия, кардиология и др.', color: '#D4A574', tag: null },
];

const processSteps = [
  { step: '01', text: 'Первичный запрос и анализ ситуации',   color: '#5FA8A3' },
  { step: '02', text: 'Подбор врача и клиники',               color: '#D4A574' },
  { step: '03', text: 'Организация и планирование поездки',   color: '#5FA8A3' },
  { step: '04', text: 'Лечение и координация на месте',       color: '#D4A574' },
  { step: '05', text: 'Возвращение домой и поддержка',        color: '#5FA8A3' },
];

export default function AboutApproach({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aap-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 32, duration: 1, ease: 'power3.out',
      });
      gsap.from('.aap-left', {
        scrollTrigger: { trigger: '.aap-body', start: 'top 80%', once: true },
        opacity: 0, x: -32, duration: 1, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.aap-right', {
        scrollTrigger: { trigger: '.aap-body', start: 'top 80%', once: true },
        opacity: 0, x: 32, duration: 1, ease: 'power3.out', delay: 0.2,
      });
      gsap.fromTo(
        '.aap-spec',
        { opacity: 0, y: 20 },
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
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">

        {/* ── Full-width header ── */}
        <div className="aap-head flex flex-col md:flex-row md:items-stretch gap-0 mb-8">
          {/* Left: label + title */}
          <div className="flex-1 flex flex-col justify-between pr-10 md:pr-14 pb-8 md:pb-0">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                Наш подход
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] leading-[1.06] tracking-tight"
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
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px self-stretch" style={{ background: 'linear-gradient(to bottom, transparent, rgba(74,59,44,0.12) 20%, rgba(74,59,44,0.12) 80%, transparent)' }} />

          {/* Right: description */}
          <div className="flex-1 flex flex-col justify-end pl-0 md:pl-14">
            <div
              className="mb-4 w-6 h-0.5 rounded-full hidden md:block"
              style={{ background: 'linear-gradient(90deg, #D4A574, #5FA8A3)' }}
            />
            <p
              className="text-base text-[#4A3B2C]/60 leading-[1.8]"
              style={{ fontFamily: BODY_FONT }}
            >
              {dict.aboutPage.mission.paragraph2}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-8" style={{ background: 'rgba(74,59,44,0.07)' }} />

        {/* ── Body: 2 equal columns ── */}
        <div className="aap-body grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT — specialties 3×2 ── */}
          <div className="aap-left flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                Направления
              </span>
            </div>
            <div className="aap-spec-grid grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {specialties.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="aap-spec group">
                    <div
                      className="h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                      style={{
                        background: '#fff',
                        boxShadow: '0 2px 8px rgba(74,59,44,0.08), 0 1px 2px rgba(74,59,44,0.04)',
                      }}
                    >
                      {/* Accent top bar — always visible, per-card colour */}
                      <div
                        className="h-1 w-full shrink-0"
                        style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}70)` }}
                      />

                      <div className="flex flex-col gap-3 p-4">
                        {/* Icon + tag */}
                        <div className="flex items-center justify-between">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: s.color }} strokeWidth={1.75} />
                          </div>
                          {s.tag && (
                            <span
                              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{ color: s.color, background: `${s.color}15`, fontFamily: BODY_FONT }}
                            >
                              {s.tag}
                            </span>
                          )}
                        </div>

                        {/* Name */}
                        <p
                          className="text-[13px] font-semibold leading-snug text-[#4A3B2C]"
                          style={{ fontFamily: DISPLAY_FONT }}
                        >
                          {s.name}
                        </p>

                        {/* Sub */}
                        <p
                          className="text-[11px] leading-relaxed text-[#4A3B2C]/50"
                          style={{ fontFamily: BODY_FONT }}
                        >
                          {s.sub}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT — numbered steps ── */}
          <div className="aap-right flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                Этапы сопровождения
              </span>
            </div>
            <div className="flex flex-col gap-5">
              {processSteps.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-4 px-4 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-x-0.5 cursor-default"
                  style={{
                    background: '#fff',
                    boxShadow: '0 1px 4px rgba(74,59,44,0.06)',
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  {/* Watermark number */}
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[3.5rem] font-bold leading-none pointer-events-none select-none"
                    style={{ fontFamily: DISPLAY_FONT, color: `${item.color}0e` }}
                  >
                    {item.step}
                  </span>

                  <p
                    className="flex-1 text-[16px] text-[#4A3B2C]/70 group-hover:text-[#4A3B2C]/90 transition-colors duration-200 leading-snug relative z-10"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    {item.text}
                  </p>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
