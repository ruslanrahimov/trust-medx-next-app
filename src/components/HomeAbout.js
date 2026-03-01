'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Quote } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

export default function HomeAbout({ dict, lang }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ha-badge', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 18, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.ha-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 50, duration: 1.1, ease: 'power3.out', delay: 0.12,
      });
      gsap.from('.ha-desc', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.22,
      });
      gsap.from('.ha-cta-wrap', {
        scrollTrigger: { trigger: '.ha-cta-wrap', start: 'top 92%', once: true },
        opacity: 0, y: 16, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.ha-visual', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        opacity: 0, x: 44, duration: 1.2, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.ha-founder-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        opacity: 0, x: -28, y: 10, duration: 0.9, ease: 'power3.out', delay: 0.4,
      });
      gsap.to('.ha-orb-1', {
        y: -22, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });
      gsap.to('.ha-orb-2', {
        y: -18, duration: 6.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const about = dict.pages.homePage.homeAbout;

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 pb-12 md:pt-[4.5rem] md:pb-[4.5rem] overflow-hidden"
      style={{ background: 'linear-gradient(168deg, #FEFBF6 0%, #FAF7F0 55%, #FEFBF6 100%)' }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Ambient orbs */}
      <div
        className="ha-orb-1 pointer-events-none absolute z-0"
        style={{
          top: '-100px', left: '-120px',
          width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,165,116,0.17) 0%, rgba(212,165,116,0.04) 60%, transparent 100%)',
          filter: 'blur(72px)',
        }}
      />
      <div
        className="ha-orb-2 pointer-events-none absolute z-0"
        style={{
          bottom: '-120px', right: '-100px',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(95,168,163,0.13) 0%, rgba(95,168,163,0.03) 60%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Dot grid accent */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #4A3B2C 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 md:mb-12 flex justify-center">
          <div
            className="ha-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border bg-white/70 backdrop-blur-sm"
            style={{ borderColor: 'rgba(212,165,116,0.30)', boxShadow: '0 4px 18px rgba(212,165,116,0.08)' }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4A574] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4A574]" />
            </span>
            <span
              className="text-xs font-semibold uppercase text-[#4A3B2C]/70"
              style={{ fontFamily: BODY_FONT, letterSpacing: '0.13em' }}
            >
              {about.badge}
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ─── LEFT: TEXT ─── */}
          <div className="space-y-8">
            {/* Headline */}
            <div className="ha-headline space-y-1">
              <h2
                className="text-4xl md:text-5xl xl:text-[3.25rem] font-bold text-[#4A3B2C] leading-[1.09] tracking-tight"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {about.titleStart}
              </h2>
              <h2
                className="text-4xl md:text-5xl xl:text-[3.25rem] font-bold leading-[1.09] tracking-tight"
                style={{
                  fontFamily: DISPLAY_FONT,
                  background: 'linear-gradient(108deg, #D4A574 0%, #C89563 40%, #5FA8A3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {about.titleAccent}
              </h2>
            </div>

            {/* Description */}
            <p
              className="ha-desc text-base md:text-[1.05rem] text-[#4A3B2C]/62 leading-relaxed max-w-[480px]"
              style={{ fontFamily: BODY_FONT }}
            >
              {about.description}
            </p>

            {/* CTA */}
            <div className="ha-cta-wrap pt-1">
              <Link
                href={`/${lang}/about`}
                className="group inline-flex items-center gap-2.5 rounded-xl border px-6 py-3 text-sm font-semibold uppercase text-[#2C5F5D] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#1a3a38]"
                style={{
                  fontFamily: BODY_FONT,
                  letterSpacing: '0.07em',
                  borderColor: 'rgba(44,95,93,0.45)',
                  background: 'rgba(44,95,93,0.08)',
                  boxShadow: '0 6px 20px rgba(44,95,93,0.14)',
                }}
              >
                <span>{about.cta}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>

          {/* ─── RIGHT: VISUAL ─── */}
          <div className="ha-visual relative">

            {/* Main visual card */}
            <div
              className="relative overflow-hidden rounded-[2rem]"
              style={{ boxShadow: '0 40px 100px rgba(74,59,44,0.13), 0 8px 24px rgba(74,59,44,0.07)' }}
            >
              {/* Team placeholder */}
              <div
                className="relative h-[440px] md:h-[500px] w-full overflow-hidden flex items-end justify-center"
                style={{
                  background: 'linear-gradient(150deg, #F2EAE0 0%, #E8DDD0 35%, #DDD2C2 65%, #D5C9B5 100%)',
                }}
              >
                {/* Diagonal stripe pattern */}
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #4A3B2C 0px, #4A3B2C 1px, transparent 0px, transparent 44px)',
                  }}
                />

                {/* Abstract circle accents */}
                <div
                  className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, #5FA8A3 0%, transparent 70%)' }}
                />
                <div
                  className="absolute top-24 left-14 w-20 h-20 rounded-full opacity-15"
                  style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }}
                />
                <div
                  className="absolute top-1/2 right-1/4 w-14 h-14 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, #7EBDB8 0%, transparent 70%)' }}
                />

                {/* Stylised team silhouettes */}
                {[
                  { xPct: 15, headR: 22, bodyW: 48, bodyH: 130, color: '#5FA8A3' },
                  { xPct: 34, headR: 28, bodyW: 62, bodyH: 158, color: '#D4A574' },
                  { xPct: 55, headR: 24, bodyW: 52, bodyH: 138, color: '#5FA8A3' },
                  { xPct: 74, headR: 20, bodyW: 44, bodyH: 118, color: '#7EBDB8' },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 flex flex-col items-center"
                    style={{ left: `${p.xPct}%`, transform: 'translateX(-50%)' }}
                  >
                    {/* Head */}
                    <div
                      className="rounded-full mb-1 flex-shrink-0"
                      style={{
                        width: p.headR * 2,
                        height: p.headR * 2,
                        background: `${p.color}28`,
                        border: `1.5px solid ${p.color}50`,
                      }}
                    />
                    {/* Body */}
                    <div
                      className="rounded-t-[50%] flex-shrink-0"
                      style={{
                        width: p.bodyW,
                        height: p.bodyH,
                        background: `linear-gradient(to bottom, ${p.color}20, ${p.color}10)`,
                        border: `1.5px solid ${p.color}35`,
                        borderBottom: 'none',
                      }}
                    />
                  </div>
                ))}

                {/* Quote element */}
                <div className="absolute top-8 left-8 flex items-start gap-2 max-w-[200px]">
                  <Quote
                    className="flex-shrink-0 mt-0.5 opacity-20"
                    style={{ width: 20, height: 20, color: '#4A3B2C' }}
                    strokeWidth={2}
                  />
                  <p
                    className="text-xs italic text-[#4A3B2C]/35 leading-relaxed"
                    style={{ fontFamily: DISPLAY_FONT }}
                  >
                    {about.quoteText}
                  </p>
                </div>

                {/* Placeholder label */}
                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/32"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    {about.photoPlaceholder}
                  </p>
                </div>

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(74,59,44,0.10) 0%, transparent 45%)' }}
                />
              </div>
            </div>

            {/* Floating founder card */}
            <div
              className="ha-founder-card absolute -left-5 top-10 hidden md:flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3.5 backdrop-blur-md xl:-left-8"
              style={{ boxShadow: '0 14px 48px rgba(74,59,44,0.14)' }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D4A574, #C89563)' }}
              >
                <span
                  className="text-white font-bold text-base"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {about.founderCard.initial}
                </span>
              </div>
              <div>
                <p
                  className="text-xs font-bold text-[#4A3B2C] leading-tight"
                  style={{ fontFamily: BODY_FONT }}
                >
                  {about.founderCard.name}
                </p>
                <p
                  className="text-[10px] font-medium uppercase tracking-wider text-[#4A3B2C]/50 mt-0.5"
                  style={{ fontFamily: BODY_FONT }}
                >
                  {about.founderCard.role}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
