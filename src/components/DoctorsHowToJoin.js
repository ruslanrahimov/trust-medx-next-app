'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: '01',
    title: 'Свяжитесь с нами',
    description:
      'Напишите на email или позвоните — наша команда ответит в течение 24 часов',
    color: '#D4A574',
  },
  {
    num: '02',
    title: 'Подберём курс',
    description:
      'Объясним формат, даты и условия участия. Поможем выбрать подходящую программу',
    color: '#7EBDB8',
  },
  {
    num: '03',
    title: 'Участвуйте',
    description:
      'Приезжайте в Стамбул и получайте практический опыт в ведущих клиниках',
    color: '#D4A574',
  },
];

function StepCard({ step, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative p-7 md:p-8 rounded-2xl h-full transition-all duration-400 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.06)',
        border: hovered
          ? `1px solid rgba(255,255,255,0.20)`
          : '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Step number — large watermark */}
      <div
        className="text-6xl font-black mb-4 leading-none select-none"
        style={{
          fontFamily: "'Fraunces', serif",
          color: step.color,
          opacity: hovered ? 0.45 : 0.30,
          transition: 'opacity 0.3s',
        }}
      >
        {step.num}
      </div>

      <h3
        className="text-xl font-bold text-white mb-3"
        style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
      >
        {step.title}
      </h3>
      <p
        className="text-sm text-white/60 leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {step.description}
      </p>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px transition-all duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${step.color}${hovered ? '60' : '00'}, transparent)`,
        }}
      />
    </div>
  );
}

function ContactRow({ icon, label, value, href, accent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
      style={{
        background: hovered ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.07)',
        border: hovered ? `1px solid ${accent}45` : '1px solid rgba(255,255,255,0.11)',
        backdropFilter: 'blur(8px)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 8px 28px ${accent}18` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: `${accent}22` }}
      >
        <svg
          className="w-5 h-5"
          style={{ color: accent }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {icon}
        </svg>
      </div>
      <div>
        <div
          className="text-[11px] text-white/45 mb-0.5 uppercase tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </div>
        <div
          className="text-white font-medium"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {value}
        </div>
      </div>
      <div className="ml-auto">
        <svg
          className="w-4 h-4 text-white/25 transition-all duration-300"
          style={{ transform: hovered ? 'translateX(3px)' : 'none', color: hovered ? accent : undefined }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

export default function DoctorsHowToJoin() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.htj-header > *', {
        scrollTrigger: { trigger: '.htj-header', start: 'top 80%', once: true },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
      });

      gsap.from('.htj-step', {
        scrollTrigger: { trigger: '.htj-steps', start: 'top 80%', once: true },
        opacity: 0,
        y: 40,
        duration: 0.65,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.htj-contact', {
        scrollTrigger: { trigger: '.htj-contact', start: 'top 85%', once: true },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 55%, #1e4b48 100%)',
      }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orbs */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(95,168,163,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="htj-header text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 mb-6"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
            <span
              className="text-white/80 text-xs uppercase tracking-[0.18em] font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Как попасть на обучение
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            Три простых шага
          </h2>
          <p
            className="text-base md:text-lg text-white/58 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Все программы проводятся в мини-группах от 4–6 человек для максимального
            практического опыта
          </p>
        </div>

        {/* Steps */}
        <div className="htj-steps grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14">
          {STEPS.map((step, i) => (
            <div key={i} className="htj-step relative">
              {/* Connector arrow between steps */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex absolute top-9 left-full z-20 items-center -translate-x-3 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-white/20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
              <StepCard step={step} index={i} />
            </div>
          ))}
        </div>

        {/* Contact card */}
        <div
          className="htj-contact relative p-8 md:p-10 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.13)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Decorative orb inside */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212,165,116,0.14) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 items-center">
            {/* Left text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A574]/30 mb-5"
                style={{ background: 'rgba(212,165,116,0.12)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
                <span
                  className="text-[#D4A574] text-xs uppercase tracking-wide font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Записаться
                </span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug"
                style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
              >
                Свяжитесь с командой TrustMedX
              </h3>
              <p
                className="text-white/58 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Мы подберём подходящий курс, объясним формат, даты и условия участия
              </p>

              {/* Mini-group highlight */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                style={{
                  background: 'rgba(95,168,163,0.15)',
                  border: '1px solid rgba(95,168,163,0.30)',
                }}
              >
                <svg
                  className="w-4 h-4 text-[#7EBDB8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span
                  className="text-[#7EBDB8] text-sm font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Мини-группы 4–6 человек
                </span>
              </div>
            </div>

            {/* Right contacts */}
            <div className="space-y-3">
              <ContactRow
                label="Email"
                value="info@trustmedx.com.tr"
                href="mailto:info@trustmedx.com.tr"
                accent="#D4A574"
                icon={
                  <>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </>
                }
              />
              <ContactRow
                label="Телефон / WhatsApp"
                value="+90 532 173 48 32"
                href="tel:+905321734832"
                accent="#5FA8A3"
                icon={
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.17 6.17l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
