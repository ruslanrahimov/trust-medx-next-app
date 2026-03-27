'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

export default function AboutIntro({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ai-left', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, x: -36, duration: 1.1, ease: 'power3.out',
      });
      gsap.from('.ai-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        opacity: 0, x: 36, duration: 1.1, ease: 'power3.out', delay: 0.12,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { label: 'Проверенные клиники', sub: 'Только партнёры с подтверждёнными лицензиями' },
    { label: 'Личный куратор', sub: 'На каждом этапе лечения' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      {/* Thin top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* ── LEFT — text ── */}
          <div className="ai-left flex flex-col justify-center space-y-8">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                О компании
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-4xl md:text-5xl font-bold text-[#4A3B2C] leading-[1.1] tracking-tight"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              Надёжный партнёр{' '}
              <span
                style={{
                  background: 'linear-gradient(108deg, #D4A574 0%, #C89563 40%, #5FA8A3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                в вашем здоровье
              </span>
            </h2>

            {/* Body */}
            <p
              className="text-base md:text-[1.05rem] text-[#4A3B2C]/60 leading-relaxed max-w-md"
              style={{ fontFamily: BODY_FONT }}
            >
              {dict.aboutPage.mission.description}
            </p>

            {/* Feature list */}
            <div className="space-y-4 pt-2">
              {features.map(({ label, sub }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(95,168,163,0.15)' }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#4A9691" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A3B2C]" style={{ fontFamily: BODY_FONT }}>{label}</p>
                    <p className="text-xs text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — dark teal card ── */}
          <div className="ai-card relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #1a3a38 0%, #2C5F5D 100%)' }}>
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #5FA8A3 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }} />

            <div className="relative p-10 md:p-12 h-full flex flex-col justify-between">
              {/* Card label */}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7EBDB8] shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/50" style={{ fontFamily: BODY_FONT }}>
                  О нас
                </span>
              </div>

              {/* Decorative line */}
              <div className="w-10 h-0.5 mb-6 rounded-full" style={{ background: 'linear-gradient(90deg, #5FA8A3, #D4A574)' }} />

              {/* Quote text */}
              <p
                className="text-2xl md:text-3xl font-medium text-white leading-[1.35] tracking-tight flex-1"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {dict.pages.homePage.homeAbout.description}
              </p>

              {/* Bottom row */}
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #D4A574, #C89563)' }}
                  >
                    <span className="text-white font-bold text-sm" style={{ fontFamily: DISPLAY_FONT }}>
                      {dict.pages.homePage.homeAbout.founderCard.initial}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/85" style={{ fontFamily: BODY_FONT }}>
                      {dict.pages.homePage.homeAbout.founderCard.name}
                    </p>
                    <p className="text-[10px] text-white/45 uppercase tracking-wide mt-0.5" style={{ fontFamily: BODY_FONT }}>
                      {dict.pages.homePage.homeAbout.founderCard.role}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white/60" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
