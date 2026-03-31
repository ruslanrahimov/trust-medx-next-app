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
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.from(stat, {
          scrollTrigger: { trigger: stat, start: 'top 88%', once: true },
          opacity: 0, y: 12, duration: 0.6, delay: index * 0.08, ease: 'power3.out',
        });
        const targetNumber = parseInt(dict.aboutPage.stats.items[index].number);
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 88%',
          onEnter: () => {
            gsap.to({}, {
              duration: 1.8,
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
    <div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 50%, #2a4a47 100%)' }}
    >
      {/* subtle top/bottom fade lines */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(95,168,163,0.35), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(95,168,163,0.35), transparent)' }} />

      {/* faint orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(95,168,163,0.12) 0%, transparent 70%)', filter: 'blur(24px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 py-8 md:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {dict.aboutPage.stats.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className={[
                'flex flex-col items-center text-center px-6 py-4',
                index % 2 !== 0 ? 'border-l border-white/10' : '',
                index >= 2 ? 'border-t border-white/10 lg:border-t-0' : '',
                index >= 1 ? 'lg:border-l' : '',
              ].filter(Boolean).join(' ')}
            >
              {/* Number + suffix */}
              <div className="flex items-baseline gap-0.5 mb-1">
                <span
                  className="text-2xl md:text-3xl font-bold text-white leading-none tabular-nums"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {(animatedNumbers[index] ?? 0).toLocaleString()}
                </span>
                {item.suffix && (
                  <span
                    className="text-xl md:text-2xl font-bold leading-none"
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

              {/* Label */}
              <p
                className="text-[11px] font-medium text-white/50 uppercase tracking-wider leading-tight"
                style={{ fontFamily: BODY_FONT }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
