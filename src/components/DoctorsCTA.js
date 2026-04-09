'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CTAButton({ href, accent, children, primary }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold transition-all duration-300"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        ...(primary
          ? {
              background: hovered
                ? 'linear-gradient(135deg, #5FA8A3 0%, #2C5F5D 100%)'
                : 'linear-gradient(135deg, #4A9691 0%, #2C5F5D 100%)',
              color: 'white',
              boxShadow: hovered
                ? '0 14px 40px rgba(74,150,145,0.45)'
                : '0 8px 28px rgba(74,150,145,0.28)',
              transform: hovered ? 'translateY(-3px)' : 'none',
            }
          : {
              background: hovered ? 'rgba(95,168,163,0.13)' : 'rgba(95,168,163,0.07)',
              color: '#2C5F5D',
              border: `1.5px solid ${hovered ? 'rgba(95,168,163,0.55)' : 'rgba(95,168,163,0.30)'}`,
              boxShadow: hovered ? '0 8px 24px rgba(95,168,163,0.18)' : 'none',
              transform: hovered ? 'translateY(-3px)' : 'none',
            }),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

export default function DoctorsCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dcta-inner > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
      });

      // Button shine loop
      gsap.to('.dcta-shine', {
        x: '240%',
        duration: 2.8,
        repeat: -1,
        delay: 2,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FEFBF6 0%, #FAF7F0 100%)',
      }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(95,168,163,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="dcta-inner relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8"
          style={{
            background: 'rgba(212,165,116,0.10)',
            borderColor: 'rgba(212,165,116,0.30)',
          }}
        >
          <svg
            className="w-3.5 h-3.5 text-[#C89563]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span
            className="text-[#C89563] text-xs uppercase tracking-[0.18em] font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Начните обучение
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-5 leading-tight"
          style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
        >
          Готовы расширить{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(110deg, #5FA8A3 0%, #4A9691 50%, #2C5F5D 100%)',
            }}
          >
            свою экспертизу?
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg text-[#4A3B2C]/62 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Мини-группы 4–6 человек, практика в ведущих клиниках Турции, международный
          сертификат. Свяжитесь с нами — подберём программу под вас.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary — Email */}
          <a
            href="mailto:info@trustmedx.com.tr"
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #4A9691 0%, #2C5F5D 100%)',
              boxShadow: '0 8px 30px rgba(74,150,145,0.28)',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(74,150,145,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(74,150,145,0.28)';
            }}
          >
            {/* Shine sweep */}
            <div
              className="dcta-shine absolute top-0 -left-[100%] w-1/2 h-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
            <svg
              className="w-5 h-5 relative"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="relative">info@trustmedx.com.tr</span>
          </a>

          {/* Secondary — Phone */}
          <a
            href="tel:+905321734832"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'rgba(95,168,163,0.08)',
              border: '1.5px solid rgba(95,168,163,0.32)',
              color: '#2C5F5D',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(95,168,163,0.14)';
              e.currentTarget.style.border = '1.5px solid rgba(95,168,163,0.55)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(95,168,163,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(95,168,163,0.08)';
              e.currentTarget.style.border = '1.5px solid rgba(95,168,163,0.32)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.17 6.17l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+90 532 173 48 32</span>
          </a>
        </div>

        {/* Decorative separator */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="w-14 h-px bg-[#4A3B2C]/10" />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'rgba(74,59,44,0.20)' }}
          />
          <div className="w-14 h-px bg-[#4A3B2C]/10" />
        </div>

        {/* Trust note */}
        <p
          className="text-sm text-[#4A3B2C]/40 mt-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          TrustMedX Academy · Стамбул, Турция
        </p>
      </div>
    </section>
  );
}
