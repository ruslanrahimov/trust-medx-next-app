'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Heart, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUE_ICONS = [Shield, Heart, Award];
const VALUE_ICON_STYLES = [
  { container: 'bg-[#5FA8A3]/20 border border-[#5FA8A3]/30', icon: '#5FA8A3' },
  { container: 'bg-[#D4A574]/20 border border-[#D4A574]/30', icon: '#D4A574' },
  { container: 'bg-[#7EBDB8]/20 border border-[#7EBDB8]/30', icon: '#7EBDB8' },
];

export default function HomeWhyUs({ dict }) {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [animatedNumbers, setAnimatedNumbers] = useState([]);

  useEffect(() => {
    setAnimatedNumbers(dict.pages.homePage.whyUs.stats.map(() => 0));

    const ctx = gsap.context(() => {
      gsap.from('.whyus-badge', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 16, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.whyus-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.whyus-subtitle', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 30, duration: 1, ease: 'power3.out', delay: 0.22,
      });
      gsap.from('.whyus-rule', {
        scrollTrigger: { trigger: '.whyus-rule', start: 'top 88%', once: true },
        scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power3.out',
      });

      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.from(stat, {
          scrollTrigger: { trigger: stat, start: 'top 88%', once: true },
          opacity: 0, scale: 0.8, duration: 0.8, delay: index * 0.12, ease: 'back.out(1.4)',
        });

        const targetNumber = parseInt(dict.pages.homePage.whyUs.stats[index].number, 10);
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 82%',
          onEnter: () => {
            gsap.to({}, {
              duration: 2.4,
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

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 60 },
        {
          scrollTrigger: { trigger: '.values-grid', start: 'top 82%', once: true },
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
        }
      );
      gsap.to('.whyus-orb', {
        y: -24, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [dict]);

  const whyUs = dict.pages.homePage.whyUs;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 50%, #2a4a47 100%)' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orbs */}
      <div className="whyus-orb absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.28) 0%, transparent 70%)' }} />
      <div className="whyus-orb absolute -bottom-48 -right-40 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.22) 0%, transparent 70%)' }} />
      <div className="whyus-orb absolute top-1/2 left-2/3 w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(126,189,184,0.14) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="whyus-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 border border-white/20 bg-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3]" aria-hidden="true" />
            <span className="text-xs font-semibold text-white uppercase tracking-[0.18em]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {whyUs.badge}
            </span>
          </div>

          <h2 className="whyus-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-5"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
            {whyUs.title}
          </h2>

          <p className="whyus-subtitle text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {whyUs.subtitle}
          </p>
        </div>

        {/* Divider */}
        <hr className="whyus-rule border-0 h-px mb-16 md:mb-20" style={{ background: 'rgba(255,255,255,0.10)' }} />

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mb-20 md:mb-28">
          {whyUs.stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className={[
                'flex flex-col items-center text-center py-10 px-6',
                index < whyUs.stats.length - 1 ? 'border-r border-white/10' : '',
                index >= 2 ? 'border-t border-white/10 lg:border-t-0' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="flex items-end gap-1 mb-3">
                <span className="text-5xl md:text-6xl font-bold text-white leading-none"
                  style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
                  {(animatedNumbers[index] ?? 0).toLocaleString()}
                </span>
                {stat.suffix && (
                  <span className="text-3xl md:text-4xl font-bold leading-none pb-1"
                    style={{
                      fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                      background: 'linear-gradient(135deg, #5FA8A3 0%, #7EBDB8 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base text-white/60 font-medium tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {whyUs.values.map((value, index) => {
            const Icon = VALUE_ICONS[index];
            const iconStyle = VALUE_ICON_STYLES[index];
            return (
              <div key={index}
                className={`value-card group relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 md:p-10 transition-all duration-300 hover:bg-white/15 hover:border-white/25 hover:-translate-y-1 cursor-default`}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-7 transition-transform duration-300 group-hover:scale-105 ${iconStyle.container}`}>
                  <Icon className="w-6 h-6" style={{ color: iconStyle.icon, strokeWidth: 1.75 }} aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug"
                  style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
                  {value.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-base"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
