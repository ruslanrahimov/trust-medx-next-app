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
      gsap.from('.ai-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: -24, duration: 1.0, ease: 'power3.out',
      });
      gsap.from('.ai-left', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        opacity: 0, x: -36, duration: 1.1, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.ai-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        opacity: 0, x: 36, duration: 1.1, ease: 'power3.out', delay: 0.18,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { label: 'Подбор врача с учётом вашего запроса' },
    { label: 'Фиксированная стоимость без скрытых платежей' },
    { label: 'Личный координатор 24/7' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      {/* Thin top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">

          {/* ── ROW 1 — full-width label ── */}
          <div className="ai-header mb-10 lg:mb-12">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                О нас
              </span>
            </div>
          </div>

          {/* ── ROW 2 — two columns ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* ── LEFT — heading + body + features ── */}
          <div className="ai-left flex flex-col justify-center space-y-8">
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
              {features.map(({ label }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(95,168,163,0.15)' }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#4A9691" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#4A3B2C]" style={{ fontFamily: BODY_FONT }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — dark teal card ── */}
          <div
            className="ai-card relative rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(155deg, #132e2c 0%, #1e4a47 40%, #2C5F5D 100%)' }}
          >
            {/* Grain texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                opacity: 0.045,
              }}
            />
            {/* Diagonal stripe pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 28px)',
              }}
            />
            {/* Color overlays */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle, #7EBDB8 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-18 pointer-events-none" style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }} />
            {/* Bottom vignette */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,28,26,0.5) 0%, transparent 100%)' }} />

            <div className="relative p-10 md:p-12 h-full flex flex-col">
              {/* Top: decorative line + quote */}
              <div className="w-8 h-0.5 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #7EBDB8, #D4A574)' }} />

              {/* Quote text */}
              <p
                className="text-[1.05rem] md:text-[1.15rem] font-medium text-white/90 leading-[1.65]"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {dict.pages.homePage.homeAbout.description}
              </p>

              {/* Founder row */}
              <div className="mt-auto pt-10">
                <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
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
                      <p className="text-[10px] text-white/40 uppercase tracking-wide mt-0.5" style={{ fontFamily: BODY_FONT }}>
                        {dict.pages.homePage.homeAbout.founderCard.role}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                    <ArrowRight className="w-3.5 h-3.5 text-white/50" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
