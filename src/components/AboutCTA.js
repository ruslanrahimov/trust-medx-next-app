'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

export default function AboutCTA({ dict, lang }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.acta-content', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const trustItems = ['Проверенные клиники', 'Поддержка 24/7', 'Полная прозрачность'];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        <div className="acta-content">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* ── LEFT — headline ── */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50" style={{ fontFamily: BODY_FONT }}>
                  Начните сегодня
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#4A3B2C] leading-[1.08] tracking-tight mb-6"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {dict.aboutPage.cta.title}
              </h2>
              <p className="text-base md:text-[1.05rem] text-[#4A3B2C]/55 leading-relaxed max-w-md" style={{ fontFamily: BODY_FONT }}>
                {dict.aboutPage.cta.description}
              </p>
            </div>

            {/* ── RIGHT — actions ── */}
            <div className="flex flex-col gap-8">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.dispatchEvent(new Event('open-consultation-modal'))}
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    fontFamily: BODY_FONT,
                    background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 100%)',
                    boxShadow: '0 6px 24px rgba(44,95,93,0.28)',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative z-10">{dict.aboutPage.cta.primaryButton}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </button>

                <a
                  href={`/${lang}/for-patients`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#4A3B2C] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    fontFamily: BODY_FONT,
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(74,59,44,0.14)',
                  }}
                >
                  {dict.aboutPage.cta.secondaryButton}
                </a>
              </div>

              {/* Trust items */}
              <div className="flex flex-wrap gap-6">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(95,168,163,0.15)' }}
                    >
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="#4A9691" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[13px] text-[#4A3B2C]/55" style={{ fontFamily: BODY_FONT }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
