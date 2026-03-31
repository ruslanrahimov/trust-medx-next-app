'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Phone, MessageCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConsultationCTA({ dict, lang }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      if (isMobile) {
        // Keep mobile content always visible to avoid hidden items before scroll trigger.
        gsap.set(
          [badgeRef.current, titleRef.current, subtitleRef.current, cardRef.current, '.cta-benefit-item'],
          { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'transform' }
        );
        gsap.to('.badge-pulse-dot', {
          scale: 1.45, opacity: 0.35, duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true,
        });
        gsap.to('.btn-shine', {
          x: '220%', duration: 2.6, ease: 'none', repeat: -1, repeatDelay: 2.8,
        });
        return;
      }

      const trigger = { trigger: sectionRef.current, start: 'top 78%', once: true };

      gsap.from(badgeRef.current, {
        scrollTrigger: trigger, opacity: 0, x: -30, duration: 0.6, ease: 'power3.out',
      });
      gsap.from(titleRef.current, {
        scrollTrigger: { ...trigger, start: 'top 76%' }, opacity: 0, x: -30, duration: 0.75, delay: 0.12, ease: 'power3.out',
      });
      gsap.from(subtitleRef.current, {
        scrollTrigger: { ...trigger, start: 'top 74%' }, opacity: 0, x: -30, duration: 0.7, delay: 0.22, ease: 'power3.out',
      });
      gsap.from('.cta-benefit-item', {
        scrollTrigger: { ...trigger, start: 'top 72%' }, y: 14,
        duration: 0.55, stagger: 0.08, delay: 0.2, ease: 'power3.out', immediateRender: false,
      });
      gsap.from(cardRef.current, {
        scrollTrigger: { ...trigger, start: 'top 72%' }, opacity: 0, scale: 0.95, duration: 0.85, delay: 0.18, ease: 'power3.out',
      });
      gsap.to('.badge-pulse-dot', {
        scale: 1.45, opacity: 0.35, duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });
      gsap.to('.btn-shine', {
        x: '220%', duration: 2.6, ease: 'none', repeat: -1, repeatDelay: 2.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cta = dict.pages.homePage.finalCta;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#FEFBF6' }}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.18) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #4A3B2C 0px, #4A3B2C 1px, transparent 1px, transparent 28px)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center lg:items-stretch">

          {/* Left column */}
          <div className="flex flex-col">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 self-start px-5 py-2.5 rounded-full border border-[#5FA8A3]/25 mb-8"
              style={{ background: 'rgba(95,168,163,0.08)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="badge-pulse-dot absolute inline-flex h-full w-full rounded-full" style={{ background: '#5FA8A3' }} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: '#5FA8A3' }} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#5FA8A3' }}>
                {cta.badge}
              </span>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] mb-5"
              style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif", color: '#4A3B2C' }}
            >
              {cta.title}
            </h2>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-lg leading-relaxed mb-10"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,59,44,0.60)' }}>
              {cta.subtitle}
            </p>

            {/* Benefits */}
            <div className="flex flex-col gap-3">
              {cta.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="cta-benefit-item flex items-center gap-4 bg-white rounded-xl p-4 border transition-all duration-300 cursor-default"
                  style={{ borderColor: 'rgba(74,59,44,0.08)', boxShadow: '0 1px 3px rgba(74,59,44,0.06)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(95,168,163,0.30)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(74,59,44,0.10)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(74,59,44,0.08)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(74,59,44,0.06)';
                  }}
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#5FA8A3' }} strokeWidth={2.2} />
                  <span className="text-sm font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: '#4A3B2C' }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — card */}
          <div ref={cardRef} className="lg:h-full">
            <div
              className="relative bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 border overflow-hidden lg:mt-16 lg:min-h-[calc(100%-4rem)] lg:flex lg:flex-col"
              style={{ borderColor: 'rgba(74,59,44,0.08)', boxShadow: '0 25px 60px rgba(74,59,44,0.10)' }}
            >
              {/* Teal → gold accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[6px]"
                style={{ background: 'linear-gradient(to right, #5FA8A3, #D4A574)', borderRadius: '2rem 2rem 0 0' }} />

              {/* Ornamental plus watermark */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]" aria-hidden="true">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 rounded-full" style={{ background: '#4A3B2C' }} />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 rounded-full" style={{ background: '#4A3B2C' }} />
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-4 sm:gap-5 lg:gap-6 pt-2 sm:pt-3 lg:pt-4 lg:flex-1 lg:justify-between">
                <div>
                  <h3 className="text-[1.55rem] sm:text-[1.95rem] md:text-[2.25rem] lg:text-[2.4rem] font-bold mb-2.5"
                    style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif", color: '#4A3B2C' }}>
                    Начните сегодня
                  </h3>
                  <p className="text-[1rem] sm:text-[1.05rem] leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,59,44,0.55)' }}>
                    Свяжитесь с нашими специалистами и получите персональный план лечения за рубежом.
                  </p>
                </div>

                <div className="h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

                <div className="flex flex-col gap-4 lg:gap-5">
                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event('open-consultation-modal'))}
                    className="group relative w-full inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 100%)',
                      boxShadow: '0 8px 24px rgba(44,95,93,0.35)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(44,95,93,0.50)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,95,93,0.35)'; }}
                  >
                    <span className="btn-shine pointer-events-none absolute inset-y-0 w-1/3 -translate-x-full skew-x-[-20deg]"
                      style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)' }} />
                    <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <span>{cta.ctaPrimary}</span>
                  </button>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/994XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold bg-white border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ fontFamily: "'DM Sans', sans-serif", borderColor: 'rgba(74,59,44,0.20)', color: '#4A3B2C' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.40)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(74,59,44,0.20)'; }}
                  >
                    <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#25D366' }} strokeWidth={2} />
                    <span>{cta.ctaSecondary}</span>
                  </a>
                </div>

                <p className="text-center text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,59,44,0.45)' }}>
                  ✓ Бесплатная консультация&nbsp;&nbsp;·&nbsp;&nbsp;✓ Ответ за 2 часа
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
