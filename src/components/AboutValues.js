'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Heart, Award, Users, Globe, Lightbulb } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const ICONS = [Award, Shield, Heart, Users, Globe, Lightbulb];
const COLORS = ['#5FA8A3', '#D4A574', '#7EBDB8', '#5FA8A3', '#D4A574', '#7EBDB8'];

export default function AboutValues({ dict }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.av-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 36, duration: 1, ease: 'power3.out',
      });
      gsap.fromTo(
        '.av-card',
        { opacity: 0, y: 44 },
        {
          scrollTrigger: { trigger: '.av-grid', start: 'top 80%', once: true },
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', immediateRender: false,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const whyChoose = dict.aboutPage.whyChoose;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* Header */}
        <div className="av-head flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                {whyChoose.badge}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#4A3B2C] leading-[1.08] tracking-tight"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              {whyChoose.title}
            </h2>
          </div>
          <p className="text-base text-[#4A3B2C]/50 max-w-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>
            {whyChoose.subtitle}
          </p>
        </div>

        <div className="w-full h-px mb-16" style={{ background: 'rgba(74,59,44,0.07)' }} />

        {/* Cards grid */}
        <div className="av-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChoose.items.map((item, index) => {
            const Icon = ICONS[index] || Award;
            const color = COLORS[index] || '#5FA8A3';
            return (
              <div key={index} className="av-card group">
                <div className="relative h-full p-8 bg-white rounded-xl border border-[#4A3B2C]/08 transition-all duration-300 hover:border-[#4A3B2C]/16 hover:shadow-md hover:-translate-y-0.5 cursor-default overflow-hidden">
                  {/* Number — very subtle */}
                  <span
                    className="absolute top-6 right-6 text-[11px] font-bold text-[#4A3B2C]/15 tabular-nums"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: `${color}12`, border: `1px solid ${color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color, strokeWidth: 1.75 }} />
                  </div>

                  <h3 className="text-xl font-bold text-[#4A3B2C] mb-3 leading-snug" style={{ fontFamily: DISPLAY_FONT }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#4A3B2C]/58 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                    {item.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
