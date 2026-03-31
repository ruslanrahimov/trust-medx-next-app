'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

const ACCENTS = ['#5FA8A3', '#D4A574', '#7EBDB8', '#5FA8A3', '#D4A574'];

export default function AboutValues({ dict }) {
  const sectionRef = useRef(null);
  const descRef = useRef(null);
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.av-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
      });
      gsap.from('.av-item', {
        scrollTrigger: { trigger: '.av-left', start: 'top 78%', once: true },
        opacity: 0, x: -24, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      });
      gsap.from('.av-right', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        opacity: 0, x: 24, duration: 1, ease: 'power3.out', delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate description change
  useEffect(() => {
    if (!descRef.current) return;
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 8, scale: 0.99 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }
    );
  }, [active]);

  const whyChoose = dict.aboutPage.whyChoose;
  const activeAccent = ACCENTS[active] || '#5FA8A3';

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">

        {/* Header */}
        <div className="av-head flex flex-col md:flex-row md:items-end gap-3 md:gap-0 mb-8 md:mb-20">
          {/* Title block */}
          <div className="md:pr-12 shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                {whyChoose.badge}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight"
              style={{ fontFamily: DISPLAY_FONT, color: '#4A3B2C' }}
            >
              Почему выбирают<br />
              <span style={{
                background: 'linear-gradient(108deg, #D4A574 0%, #C89563 40%, #5FA8A3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                TrustMedX
              </span>
            </h2>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#4A3B2C]/12 to-transparent mx-2 shrink-0" />

          {/* Subtitle */}
          <div className="md:pl-12 flex-1 flex items-end">
            <p className="text-base text-[#4A3B2C]/50 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
              {whyChoose.subtitle}
            </p>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="lg:hidden flex flex-col">
          {whyChoose.items.map((item, index) => {
            const accent = ACCENTS[index] || '#5FA8A3';
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <div className="w-full h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />
                <button
                  className="w-full text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center gap-4 py-5 px-1">
                    <div
                      className="shrink-0 w-0.5 h-7 rounded-full transition-all duration-300"
                      style={{ background: isOpen ? accent : 'rgba(74,59,44,0.12)' }}
                    />
                    <span
                      className="shrink-0 text-[12px] font-semibold tabular-nums transition-colors duration-300"
                      style={{ fontFamily: BODY_FONT, color: isOpen ? accent : 'rgba(74,59,44,0.28)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="flex-1 text-[1.1rem] font-bold leading-snug transition-colors duration-300"
                      style={{ fontFamily: DISPLAY_FONT, color: isOpen ? '#2C5F5D' : 'rgba(74,59,44,0.72)' }}
                    >
                      {item.title}
                    </span>
                    <svg
                      className="shrink-0 w-4 h-4 transition-transform duration-300"
                      style={{ color: accent, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.75}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isOpen ? '320px' : '0px' }}
                >
                  <div className="pb-5 px-1">
                    <div
                      className="rounded-xl p-5"
                      style={{
                        background: `${accent}09`,
                        border: `1px solid ${accent}22`,
                      }}
                    >
                      <div
                        className="w-6 h-0.5 mb-4 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${accent}, rgba(212,165,116,0.55))` }}
                      />
                      <p
                        className="text-[14px] leading-[1.85]"
                        style={{ fontFamily: BODY_FONT, color: 'rgba(74,59,44,0.65)' }}
                      >
                        {item.description}
                      </p>
                      <div
                        className="mt-4 pt-4 border-t flex items-center gap-2"
                        style={{ borderColor: `${accent}20` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
                        <span
                          className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                          style={{ fontFamily: BODY_FONT, color: accent }}
                        >
                          TrustMedX
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="w-full h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />
        </div>

        {/* Desktop split layout */}
        <div className="hidden lg:flex lg:flex-row gap-0 lg:gap-16 items-stretch">

          {/* Left: clickable titles */}
          <div className="av-left lg:w-1/2 flex flex-col">
            {whyChoose.items.map((item, index) => {
              const accent = ACCENTS[index] || '#5FA8A3';
              const isActive = index === active;
              return (
                <button
                  key={index}
                  className="av-item group text-left w-full"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                >
                  <div className="w-full h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />
                  <div
                    className="flex items-center gap-6 py-6 px-2 transition-all duration-300"
                    style={{ background: isActive ? `${accent}06` : 'transparent' }}
                  >
                    {/* Active bar */}
                    <div
                      className="shrink-0 w-0.5 self-stretch rounded-full transition-all duration-300"
                      style={{ background: isActive ? accent : 'transparent' }}
                    />

                    {/* Number */}
                    <span
                      className="shrink-0 text-[13px] font-semibold tabular-nums transition-colors duration-300"
                      style={{
                        fontFamily: BODY_FONT,
                        color: isActive ? accent : 'rgba(74,59,44,0.25)',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <span
                      className="flex-1 text-xl md:text-2xl font-bold leading-snug transition-colors duration-300"
                      style={{
                        fontFamily: DISPLAY_FONT,
                        color: isActive ? '#2C5F5D' : 'rgba(74,59,44,0.45)',
                      }}
                    >
                      {item.title}
                    </span>

                    {/* Arrow */}
                    <svg
                      className="shrink-0 w-4 h-4 transition-all duration-300"
                      style={{
                        color: isActive ? accent : 'transparent',
                        transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                      }}
                      fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.75}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </div>
                </button>
              );
            })}
            <div className="w-full h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />
          </div>

          {/* Right: active description */}
          <div className="av-right lg:w-1/2 flex items-center mt-10 lg:mt-0">
            <div className="w-full relative">

              {/* Soft accent orb behind card */}
              <div
                className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-700"
                style={{ background: `${activeAccent}18` }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(212,165,116,0.12)' }}
              />

              {/* Card */}
              <div
                className="relative rounded-2xl p-10 md:p-12 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(74,59,44,0.08)',
                  boxShadow: '0 4px 40px rgba(74,59,44,0.06)',
                }}
              >
                {/* Dot pattern */}
                <div
                  className="absolute inset-0 opacity-[0.025] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #4A3B2C 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />

                <div ref={descRef} className="relative z-10">
                  {/* Number watermark */}
                  <span
                    className="block text-[7rem] font-bold leading-none -mt-4 -ml-2 mb-2 select-none"
                    style={{ fontFamily: DISPLAY_FONT, color: `${activeAccent}15` }}
                  >
                    {String(active + 1).padStart(2, '0')}
                  </span>

                  {/* Accent line */}
                  <div
                    className="w-10 h-0.5 mb-6 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${activeAccent}, rgba(212,165,116,0.6))` }}
                  />

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-[1.75rem] font-bold leading-snug mb-5"
                    style={{ fontFamily: DISPLAY_FONT, color: '#2C5F5D' }}
                  >
                    {whyChoose.items[active].title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[15px] leading-[1.85]"
                    style={{ fontFamily: BODY_FONT, color: 'rgba(74,59,44,0.62)' }}
                  >
                    {whyChoose.items[active].description}
                  </p>

                  {/* Bottom tag */}
                  <div className="mt-8 pt-6 border-t border-[#4A3B2C]/06 flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: activeAccent }}
                    />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ fontFamily: BODY_FONT, color: `${activeAccent}` }}
                    >
                      TrustMedX
                    </span>
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
