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
    description: 'Напишите на email или позвоните — ответим и расскажем о ближайших датах',
    color: '#7EBDB8',
  },
  {
    num: '02',
    title: 'Подберём программу',
    description: 'Учтём ваш уровень и цели, поможем выбрать подходящий модуль',
    color: '#D4A574',
  },
  {
    num: '03',
    title: 'Зарегистрируйтесь',
    description: 'Оформим участие — и вы начнёте развиваться в индустрии медицинского туризма',
    color: '#7EBDB8',
  },
];

function StepCard({ step }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative p-7 md:p-8 rounded-2xl h-full transition-all duration-400 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.065)',
        border: hovered ? '1px solid rgba(255,255,255,0.22)' : '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="text-6xl font-black mb-4 leading-none select-none transition-all duration-400"
        style={{
          fontFamily: "'Fraunces', serif",
          color: step.color,
          opacity: hovered ? 0.44 : 0.28,
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
        className="text-sm text-white/58 leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {step.description}
      </p>

      <div
        className="absolute bottom-0 left-6 right-6 h-px transition-all duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${step.color}${hovered ? '55' : '00'}, transparent)`,
        }}
      />
    </div>
  );
}

function ContactItem({ label, value, href, icon, accent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
      style={{
        background: hovered ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.07)',
        border: hovered ? `1px solid ${accent}48` : '1px solid rgba(255,255,255,0.11)',
        backdropFilter: 'blur(8px)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 8px 28px ${accent}18` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
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
      <div className="flex-1">
        <div
          className="text-[11px] text-white/42 mb-0.5 uppercase tracking-wide"
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
      <svg
        className="w-4 h-4 transition-all duration-300"
        style={{ color: hovered ? accent : 'rgba(255,255,255,0.22)', transform: hovered ? 'translateX(3px)' : 'none' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function AgentsHowToJoin() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ahtj-header > *', {
        scrollTrigger: { trigger: '.ahtj-header', start: 'top 80%', once: true },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.14, ease: 'power3.out',
      });
      gsap.from('.ahtj-step', {
        scrollTrigger: { trigger: '.ahtj-steps', start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 0.65, stagger: 0.15, ease: 'power3.out',
      });
      gsap.from('.ahtj-contact', {
        scrollTrigger: { trigger: '.ahtj-contact', start: 'top 85%', once: true },
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #162e2c 0%, #2C5F5D 50%, #1e4b48 100%)' }}
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
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      {/* Orbs */}
      <div
        className="absolute -top-20 left-1/3 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.13) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(95,168,163,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="ahtj-header text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/18 mb-6"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#7EBDB8]" />
            <span
              className="text-white/78 text-xs uppercase tracking-[0.18em] font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Как попасть на обучение
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            Начать просто
          </h2>
          <p
            className="text-base md:text-lg text-white/56 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Обучение проходит в дружественной атмосфере, с упором на реальную практику и
            развитие личного бренда агента
          </p>
        </div>

        {/* Steps */}
        <div className="ahtj-steps grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {STEPS.map((step, i) => (
            <div key={i} className="ahtj-step relative">
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex absolute top-9 left-full z-20 items-center -translate-x-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white/18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
              <StepCard step={step} />
            </div>
          ))}
        </div>

        {/* Contact block */}
        <div
          className="ahtj-contact relative p-8 md:p-10 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(126,189,184,0.12) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7EBDB8]/30 mb-5"
                style={{ background: 'rgba(126,189,184,0.12)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7EBDB8]" />
                <span
                  className="text-[#7EBDB8] text-xs uppercase tracking-wide font-medium"
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
                className="text-white/55 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Мы подберём подходящий курс по вашему уровню и целям, расскажем о ближайших
                датах и поможем зарегистрироваться
              </p>

              {/* Community highlight */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                style={{
                  background: 'rgba(212,165,116,0.14)',
                  border: '1px solid rgba(212,165,116,0.28)',
                }}
              >
                <svg
                  className="w-4 h-4 text-[#D4A574]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span
                  className="text-[#D4A574] text-sm font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Дружественная атмосфера и живое сообщество
                </span>
              </div>
            </div>

            {/* Right contacts */}
            <div className="space-y-3">
              <ContactItem
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
              <ContactItem
                label="Телефон / WhatsApp"
                value="+90 532 173 48 32"
                href="tel:+905321734832"
                accent="#7EBDB8"
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
