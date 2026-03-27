'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

export default function AboutStats({ dict }) {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [animatedNumbers, setAnimatedNumbers] = useState([]);

  useEffect(() => {
    setAnimatedNumbers(dict.aboutPage.stats.items.map(() => 0));

    const ctx = gsap.context(() => {
      gsap.from('.ast-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 36, duration: 1, ease: 'power3.out',
      });
      gsap.from('.ast-rule', {
        scrollTrigger: { trigger: '.ast-rule', start: 'top 88%', once: true },
        scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power3.out',
      });

      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.from(stat, {
          scrollTrigger: { trigger: stat, start: 'top 85%', once: true },
          opacity: 0, y: 24, duration: 0.7, delay: index * 0.1, ease: 'power3.out',
        });
        const targetNumber = parseInt(dict.aboutPage.stats.items[index].number);
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 80%',
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
    }, sectionRef);

    return () => ctx.revert();
  }, [dict]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 50%, #2a4a47 100%)' }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.28) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-48 -left-40 w-[580px] h-[580px] rounded-full blur-3xl pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.22) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* Header */}
        <div className="ast-head mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/40" style={{ fontFamily: BODY_FONT }}>
              {dict.aboutPage.stats.badge}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.06] tracking-tight"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {dict.aboutPage.stats.title}
          </h2>
        </div>

        <div className="ast-rule w-full h-px mb-16 md:mb-20" style={{ background: 'rgba(255,255,255,0.10)' }} />

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {dict.aboutPage.stats.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className={[
                'flex flex-col py-10 px-8',
                index > 0 ? 'border-l border-white/10' : '',
                index >= 2 ? 'border-t border-white/10 lg:border-t-0' : '',
              ].filter(Boolean).join(' ')}
            >
              {/* Number */}
              <div className="flex items-baseline gap-0.5 mb-3">
                <span
                  className="text-5xl md:text-6xl font-bold text-white leading-none"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {(animatedNumbers[index] ?? 0).toLocaleString()}
                </span>
                {item.suffix && (
                  <span
                    className="text-3xl md:text-4xl font-bold leading-none"
                    style={{
                      fontFamily: DISPLAY_FONT,
                      background: 'linear-gradient(135deg, #5FA8A3 0%, #7EBDB8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {item.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-white/70 mb-1" style={{ fontFamily: DISPLAY_FONT }}>
                {item.label}
              </p>
              <p className="text-[12px] text-white/38 leading-snug max-w-[130px]" style={{ fontFamily: BODY_FONT }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
