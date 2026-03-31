'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">

        {/* ── TOP — founder identity ── */}
        <div className="fs-top mb-8 md:mb-10">
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
        <div className="max-w-3xl mb-8">
          <p className="text-base md:text-[1.1rem] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
            {founder.intro}
          </p>
          <p className="mt-4 text-base md:text-[1.1rem] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
            {founder.philosophy}
          </p>
        </div>

        <div className="w-full h-px mb-14" style={{ background: 'rgba(74,59,44,0.07)' }} />

        {/* ── BODY — story + approach ── */}
        <div className="fs-body grid lg:grid-cols-2 gap-10 mb-14">
          {/* Story */}
          <div className="fs-left">
            <h3 className="text-2xl font-semibold text-[#5FA8A3] mb-6" style={{ fontFamily: DISPLAY_FONT }}>
              История создания
            </h3>
            <div className="space-y-4">
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.story}</p>
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.motivation}</p>
            </div>
          </div>

          {/* Approach */}
          <div className="fs-right">
            <h3 className="text-2xl font-semibold text-[#D4A574] mb-6" style={{ fontFamily: DISPLAY_FONT }}>
              Подход к работе
            </h3>
            <div className="space-y-4">
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.approach}</p>
              <p className="text-[15px] text-[#4A3B2C]/62 leading-relaxed" style={{ fontFamily: BODY_FONT }}>{founder.today}</p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
