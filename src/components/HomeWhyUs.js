'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Heart, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUE_ICONS = [Shield, Heart, Award];
const ACCENT_COLORS = ['#5FA8A3', '#D4A574', '#7EBDB8'];
const ORDINALS = ['01', '02', '03'];

export default function HomeWhyUs({ dict }) {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [animatedNumbers, setAnimatedNumbers] = useState([]);

  useEffect(() => {
    setAnimatedNumbers(dict.pages.homePage.whyUs.stats.map(() => 0));

    const ctx = gsap.context(() => {
      gsap.from('.whyus-badge', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 12, duration: 0.6, ease: 'power3.out',
      });
      gsap.from('.whyus-heading', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 36, duration: 0.9, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.whyus-subtitle', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.2,
      });

      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.from(stat, {
          scrollTrigger: { trigger: stat, start: 'top 90%', once: true },
          opacity: 0, y: 16, duration: 0.6, delay: index * 0.1, ease: 'power3.out',
        });
        const targetNumber = parseInt(dict.pages.homePage.whyUs.stats[index].number, 10);
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 86%',
          onEnter: () => {
            gsap.to({}, {
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: function () {
                const current = Math.floor(targetNumber * this.progress());
                setAnimatedNumbers((prev) => { const next = [...prev]; next[index] = current; return next; });
              },
              onComplete: () => {
                setAnimatedNumbers((prev) => { const next = [...prev]; next[index] = targetNumber; return next; });
              },
            });
          },
          once: true,
        });
      });

      gsap.fromTo('.value-card',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: '.values-grid', start: 'top 82%', once: true },
          opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', immediateRender: false,
        }
      );

      gsap.to('.whyus-orb', {
        y: -20, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [dict]);

  const whyUs = dict.pages.homePage.whyUs;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 50%, #2a4a47 100%)' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />

      {/* Orbs */}
      <div className="whyus-orb absolute -top-32 -left-32 w-[440px] h-[440px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.22) 0%, transparent 70%)' }} />
      <div className="whyus-orb absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.18) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12 md:mb-16">
          <div className="whyus-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-white/15 bg-white/8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3]" />
            <span
              className="text-[11px] font-semibold text-white/70 uppercase tracking-[0.2em]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {whyUs.badge}
            </span>
          </div>

          <h2
            className="whyus-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.12] tracking-tight mb-4"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            {whyUs.title}
          </h2>

          <p
            className="whyus-subtitle text-base md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {whyUs.subtitle}
          </p>
        </div>

        {/* ── Stats strip ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 mb-14 md:mb-18 border border-white/10 rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          {whyUs.stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className={[
                'flex flex-col items-center text-center py-6 px-4',
                index < whyUs.stats.length - 1 ? 'border-r border-white/10' : '',
                index >= 2 ? 'border-t border-white/10 lg:border-t-0' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="flex items-baseline gap-0.5 mb-1.5">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none tabular-nums"
                  style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
                >
                  {(animatedNumbers[index] ?? 0).toLocaleString()}
                </span>
                {stat.suffix && (
                  <span
                    className="text-2xl md:text-3xl lg:text-4xl font-bold leading-none"
                    style={{
                      fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                      background: 'linear-gradient(135deg, #5FA8A3 0%, #7EBDB8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p
                className="text-[11px] font-medium text-white/45 uppercase tracking-wider"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Values grid ── */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {whyUs.values.map((value, index) => {
            const Icon = VALUE_ICONS[index];
            const accent = ACCENT_COLORS[index];
            return (
              <div
                key={index}
                className="value-card group relative rounded-xl border border-white/12 overflow-hidden transition-all duration-300 hover:border-white/22 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
              >
                {/* Top accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                />

                {/* Faint ordinal */}
                <span
                  className="absolute top-4 right-5 text-7xl font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                    color: 'rgba(255,255,255,0.04)',
                  }}
                  aria-hidden="true"
                >
                  {ORDINALS[index]}
                </span>

                <div className="relative p-6 md:p-7">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-5 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: `${accent}22`, border: `1px solid ${accent}35` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: accent, strokeWidth: 1.75 }} aria-hidden="true" />
                  </div>

                  <h3
                    className="text-lg font-semibold text-white mb-2.5 leading-snug"
                    style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
                  >
                    {value.title}
                  </h3>

                  <p
                    className="text-sm text-white/60 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
