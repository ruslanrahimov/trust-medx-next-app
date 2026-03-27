'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Lightbulb } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

export default function FounderSection({ dict }) {
  const sectionRef = useRef(null);
  const founder = dict.aboutPage.founder;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fs-top', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 36, duration: 1, ease: 'power3.out',
      });
      gsap.from('.fs-left', {
        scrollTrigger: { trigger: '.fs-body', start: 'top 80%', once: true },
        opacity: 0, x: -36, duration: 1, ease: 'power3.out',
      });
      gsap.from('.fs-right', {
        scrollTrigger: { trigger: '.fs-body', start: 'top 78%', once: true },
        opacity: 0, x: 36, duration: 1, ease: 'power3.out', delay: 0.14,
      });
      gsap.from('.fs-bottom', {
        scrollTrigger: { trigger: '.fs-bottom', start: 'top 86%', once: true },
        opacity: 0, y: 36, duration: 1, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">

        {/* ── TOP — founder identity ── */}
        <div className="fs-top mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
              {founder.badge}
            </span>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            {/* Avatar */}
            <div
              className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 10px 32px rgba(212,165,116,0.30)' }}
            >
              <Image
                src="/daria.jpg"
                alt={founder.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] leading-[1.06] tracking-tight"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {founder.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-base font-medium text-[#5FA8A3]" style={{ fontFamily: BODY_FONT }}>
                  {founder.role}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#4A3B2C]/25" />
                <span className="text-sm text-[#D4A574]" style={{ fontFamily: BODY_FONT }}>
                  {founder.experience}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Intro text */}
        <div className="max-w-3xl mb-14">
          <p className="text-base md:text-[1.1rem] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
            {founder.intro}
          </p>
        </div>

        <div className="w-full h-px mb-14" style={{ background: 'rgba(74,59,44,0.07)' }} />

        {/* ── BODY — story + approach ── */}
        <div className="fs-body grid lg:grid-cols-2 gap-10 mb-14">
          {/* Story */}
          <div className="fs-left">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-3.5 h-3.5 shrink-0" style={{ color: '#5FA8A3' }} strokeWidth={2} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5FA8A3]" style={{ fontFamily: BODY_FONT }}>
                История создания
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.story}</p>
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.motivation}</p>
            </div>
          </div>

          {/* Approach */}
          <div className="fs-right">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-3.5 h-3.5 shrink-0" style={{ color: '#D4A574' }} strokeWidth={2} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4A574]" style={{ fontFamily: BODY_FONT }}>
                Подход к работе
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.approach}</p>
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.today}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-px mb-14" style={{ background: 'rgba(74,59,44,0.07)' }} />

        {/* ── BOTTOM — philosophy (dark accent) ── */}
        <div
          className="fs-bottom relative rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 100%)' }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, #5FA8A3 0%, transparent 70%)' }} />

          <div className="relative p-10 md:p-14 lg:p-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EBDB8] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/40" style={{ fontFamily: BODY_FONT }}>
                Философия работы
              </span>
            </div>
            <div className="w-8 h-0.5 mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #5FA8A3, #D4A574)' }} />
            <p
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.35] tracking-tight max-w-3xl"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              {founder.philosophy}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
