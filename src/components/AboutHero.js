'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Quote } from 'lucide-react';

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

export default function AboutHero({ dict }) {
  const heroRef = useRef(null);
  const mission = dict.aboutPage.mission;
  const homeAbout = dict.pages.homePage.homeAbout;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ah-label', { opacity: 0, y: 18, duration: 0.7 })
        .from('.ah-title-1', { opacity: 0, y: 56, duration: 1.05 }, '-=0.4')
        .from('.ah-title-2', { opacity: 0, y: 56, duration: 1.05 }, '-=0.75')
        .from('.ah-desc', { opacity: 0, y: 24, duration: 0.8 }, '-=0.55')
        .from('.ah-stat', { opacity: 0, y: 14, duration: 0.5, stagger: 0.12 }, '-=0.45')
        .from('.ah-visual', { opacity: 0, x: 30, duration: 1.2 }, '-=1.4');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 min-h-[92dvh]">
        {/* ── LEFT ── */}
        <div className="flex flex-col justify-center px-6 lg:pl-14 xl:pl-20 lg:pr-12 py-24 lg:py-0">
          {/* Section label */}
          <div className="ah-label flex items-center gap-3 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50"
              style={{ fontFamily: BODY_FONT }}
            >
              {mission.badge}
            </span>
          </div>

          {/* Headline */}
          <div className="mb-8 overflow-hidden">
            <h1
              className="ah-title-1 text-[3rem] md:text-[4rem] lg:text-[3.6rem] xl:text-[4.5rem] font-bold text-[#4A3B2C] leading-[1.04] tracking-tight"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              {mission.title}
            </h1>
            <h2
              className="ah-title-2 text-[3rem] md:text-[4rem] lg:text-[3.6rem] xl:text-[4.5rem] font-bold leading-[1.04] tracking-tight"
              style={{
                fontFamily: DISPLAY_FONT,
                background: 'linear-gradient(110deg, #5FA8A3 0%, #4A9691 55%, #7EBDB8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {mission.subtitle}
            </h2>
          </div>

          {/* Lead text */}
          <p
            className="ah-desc max-w-md text-base md:text-[1.05rem] text-[#4A3B2C]/58 leading-relaxed mb-14"
            style={{ fontFamily: BODY_FONT }}
          >
            {mission.intro}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-stretch gap-0 border-t border-[#4A3B2C]/10 pt-8">
            {homeAbout.stats.map(({ number, suffix, label }, i) => (
              <div
                key={i}
                className="ah-stat flex flex-col"
                style={{
                  paddingRight: '2rem',
                  paddingLeft: i > 0 ? '2rem' : '0',
                  borderLeft: i > 0 ? '1px solid rgba(74,59,44,0.11)' : 'none',
                }}
              >
                <span
                  className="text-[2.2rem] md:text-[2.6rem] font-bold text-[#4A3B2C] leading-none"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {number}
                  <span style={{ color: '#5FA8A3' }}>{suffix}</span>
                </span>
                <span
                  className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#4A3B2C]/42"
                  style={{ fontFamily: BODY_FONT }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — visual ── */}
        <div className="ah-visual relative h-[52dvh] min-h-[300px] lg:h-auto">
          <div
            className="absolute inset-0 flex items-end justify-center overflow-hidden"
            style={{ background: 'linear-gradient(150deg, #F0E8DE 0%, #E6D8CB 40%, #D9CCBC 70%, #D0C4B0 100%)' }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #4A3B2C 0px, #4A3B2C 1px, transparent 0px, transparent 44px)' }}
            />

            {/* Accent circles */}
            <div className="absolute top-12 right-12 w-36 h-36 rounded-full opacity-18" style={{ background: 'radial-gradient(circle, #5FA8A3 0%, transparent 70%)' }} />
            <div className="absolute top-28 left-16 w-24 h-24 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }} />
            <div className="absolute top-[45%] right-[30%] w-16 h-16 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7EBDB8 0%, transparent 70%)' }} />

            {/* Silhouettes */}
            {[
              { xPct: 14, headR: 22, bodyW: 48, bodyH: 130, color: '#5FA8A3' },
              { xPct: 33, headR: 29, bodyW: 64, bodyH: 162, color: '#D4A574' },
              { xPct: 54, headR: 24, bodyW: 54, bodyH: 142, color: '#5FA8A3' },
              { xPct: 74, headR: 20, bodyW: 44, bodyH: 118, color: '#7EBDB8' },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute bottom-0 flex flex-col items-center"
                style={{ left: `${p.xPct}%`, transform: 'translateX(-50%)' }}
              >
                <div className="rounded-full mb-1 shrink-0" style={{ width: p.headR * 2, height: p.headR * 2, background: `${p.color}2a`, border: `1.5px solid ${p.color}55` }} />
                <div className="rounded-t-[50%] shrink-0" style={{ width: p.bodyW, height: p.bodyH, background: `linear-gradient(to bottom, ${p.color}22, ${p.color}0e)`, border: `1.5px solid ${p.color}38`, borderBottom: 'none' }} />
              </div>
            ))}

            {/* Quote */}
            <div className="absolute top-8 left-8 flex items-start gap-2 max-w-[190px]">
              <Quote className="shrink-0 mt-0.5 opacity-18" style={{ width: 18, height: 18, color: '#4A3B2C' }} strokeWidth={2} />
              <p className="text-[11px] italic text-[#4A3B2C]/32 leading-relaxed" style={{ fontFamily: DISPLAY_FONT }}>
                {homeAbout.quoteText}
              </p>
            </div>

            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(74,59,44,0.14) 0%, transparent 48%)' }} />
          </div>

          {/* Founder card */}
          <div
            className="absolute -left-4 top-[30%] hidden md:flex items-center gap-3 rounded-xl border border-[#4A3B2C]/10 bg-white px-4 py-3 z-10"
            style={{ boxShadow: '0 12px 40px rgba(74,59,44,0.12)' }}
          >
            <div
              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4A574, #C89563)' }}
            >
              <span className="text-white font-bold text-sm" style={{ fontFamily: DISPLAY_FONT }}>
                {homeAbout.founderCard.initial}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#4A3B2C] leading-tight" style={{ fontFamily: BODY_FONT }}>
                {homeAbout.founderCard.name}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-[#4A3B2C]/45 mt-0.5" style={{ fontFamily: BODY_FONT }}>
                {homeAbout.founderCard.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
