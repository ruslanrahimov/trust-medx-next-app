'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import TelegramBanner from '@/components/TelegramBanner';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";

export default function Hero({ dict, lang }) {
  const heroRef = useRef(null);

  const heroDict = dict.pages.homePage.hero;
  const forPatientsDict = dict.forPatientsHero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.hero-badge', '.hero-title-line', '.hero-subtitle', '.hero-feature', '.hero-cta-btn', '.hero-stat', '.hero-trust-row', '.hero-image-col'], { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { opacity: 0, y: 24, duration: 0.85 })
        .from('.hero-title-line', { opacity: 0, y: 44, duration: 1, stagger: 0.16 }, '-=0.55')
        .from('.hero-subtitle', { opacity: 0, y: 22, duration: 0.8 }, '-=0.5')
        .from('.hero-feature', { opacity: 0, x: -16, duration: 0.6, stagger: 0.1 }, '-=0.45')
        .from('.hero-cta-btn', { opacity: 0, y: 18, duration: 0.7, stagger: 0.12 }, '-=0.3')
        .from('.hero-stat', { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.hero-trust-row', { opacity: 0, y: 14, duration: 0.65 }, '-=0.4')
        .from('.hero-image-col', { opacity: 0, x: 32, duration: 1 }, '-=1.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-dvh flex flex-col"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      {/* Decorative layer — isolated overflow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        {/* Orb top-right */}
        <div className="absolute"
          style={{
            top: '-120px', right: '-140px', width: '680px', height: '680px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,165,116,0.18) 0%, rgba(200,149,99,0.06) 60%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Orb bottom-left */}
        <div className="absolute"
          style={{
            bottom: '-160px', left: '-180px', width: '780px', height: '780px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(95,168,163,0.15) 0%, rgba(126,189,184,0.05) 60%, transparent 100%)',
            filter: 'blur(72px)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row">

            {/* Left column */}
            <div className="order-2 lg:order-1 flex flex-col px-4 sm:px-6 lg:pl-12 xl:pl-20 lg:pr-8 xl:pr-12 pt-5 sm:pt-7 lg:pt-10 pb-4 sm:pb-6 lg:pb-8 lg:w-1/2 xl:w-[52%]">

              {/* Main content group */}
              <div className="flex flex-col">
                {/* Badge */}
                <div
                  className="hero-badge mb-4 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#D4A574]/30 px-5 py-2 backdrop-blur-sm"
                  style={{ background: 'rgba(212,165,116,0.08)' }}
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4A574] opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4A574]" />
                  </span>
                  <span className="text-xs font-semibold uppercase text-[#4A3B2C]/75"
                    style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.10em' }}>
                    {heroDict.badge}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="mb-4 leading-[1.08]" style={{ fontFamily: DISPLAY_FONT }}>
                  <span className="hero-title-line block text-[2.2rem] font-semibold text-[#4A3B2C] sm:text-5xl lg:text-[2.75rem] xl:text-[3.2rem]">
                    {forPatientsDict.title}
                  </span>
                  <span
                    className="hero-title-line block text-[2.2rem] font-bold sm:text-5xl lg:text-[2.75rem] xl:text-[3.2rem]"
                    style={{
                      background: 'linear-gradient(110deg, #5FA8A3 0%, #4A9691 45%, #7EBDB8 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}
                  >
                    {forPatientsDict.titleAccent}
                  </span>
                  <span className="hero-title-line block text-[2.2rem] font-semibold text-[#4A3B2C] sm:text-5xl lg:text-[2.75rem] xl:text-[3.2rem]">
                    {forPatientsDict.titleEnd}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle mb-4 max-w-lg text-sm leading-relaxed text-[#4A3B2C]/65 sm:text-base"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  {forPatientsDict.description}
                </p>

                {/* Feature highlights */}
                <ul className="mb-5 space-y-2">
                  {[
                    'Подбор клиники и врача под ваш диагноз',
                    'Визовая поддержка и организация трансфера',
                    'Личный куратор на всех этапах лечения',
                  ].map((item) => (
                    <li key={item} className="hero-feature flex items-center gap-3 text-sm text-[#4A3B2C]/70" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(95,168,163,0.15)' }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#4A9691" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <button
                    onClick={() => window.dispatchEvent(new Event('open-consultation-modal'))}
                    className="hero-cta-btn group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-7 py-3.5 text-sm font-semibold uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 100%)',
                      boxShadow: '0 8px 28px rgba(44,95,93,0.30)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative z-10">{heroDict.ctaPrimary}</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  </button>

                  <Link
                    href={`/${lang}/about`}
                    className="hero-cta-btn group inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-7 py-3.5 text-sm font-semibold uppercase text-[#4A3B2C] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                    style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.06em', border: '1px solid rgba(74,59,44,0.18)' }}
                  >
                    <span>{heroDict.ctaSecondary}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                  </Link>
                </div>

              </div>

              {/* Stats + Trust — равный отступ сверху и снизу */}
              <div className="my-auto flex flex-col">
                <div className="grid grid-cols-4 gap-4 border-t border-[#4A3B2C]/10 pt-5">
                  {[
                    { value: '50+', label: 'Клиник\nпартнёров' },
                    { value: '12', label: 'Стран\nмира' },
                    { value: '98%', label: 'Успешных\nслучаев' },
                    { value: '24/7', label: 'Поддержка\nпациентов' },
                  ].map(({ value, label }, i) => (
                    <div key={value} className="hero-stat flex flex-col" style={{ borderLeft: i > 0 ? '1px solid rgba(74,59,44,0.10)' : 'none', paddingLeft: i > 0 ? '1rem' : '0' }}>
                      <span className="text-xl font-bold leading-none text-[#4A3B2C] xl:text-2xl" style={{ fontFamily: DISPLAY_FONT }}>{value}</span>
                      <span className="mt-1 text-[11px] leading-snug text-[#4A3B2C]/50 whitespace-pre-line" style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.02em' }}>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="hero-trust-row mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex -space-x-2.5">
                    {[
                      { initials: 'АМ', bg: 'linear-gradient(135deg, #5FA8A3, #4A9691)' },
                      { initials: 'ЕК', bg: 'linear-gradient(135deg, #D4A574, #C89563)' },
                      { initials: 'НС', bg: 'linear-gradient(135deg, #7EBDB8, #5FA8A3)' },
                      { initials: 'ВО', bg: 'linear-gradient(135deg, #C89563, #D4A574)' },
                    ].map(({ initials, bg }) => (
                      <div key={initials}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FEFBF6] text-[10px] font-bold text-white shadow-sm"
                        style={{ background: bg, fontFamily: 'var(--font-dm-sans)' }}>
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#D4A574] text-[#D4A574]" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#4A3B2C]/60"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}>
                    1,200+ довольных пациентов
                  </span>
                </div>
              </div>
            </div>

            {/* Right column — full-height image, no rounding, no badges */}
            <div className="hero-image-col order-1 lg:order-2 relative h-[22dvh] min-h-[120px] sm:h-[26dvh] lg:h-auto lg:flex-1 shrink-0 lg:shrink">
              <Image
                src="/hero.png"
                alt="TrustMedX — medical care worldwide"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(74,59,44,0.22) 0%, rgba(74,59,44,0.04) 40%, transparent 70%)' }} />
            </div>

      </div>

      {/* Telegram banner — bottom of hero */}
      <TelegramBanner dict={dict} lang={lang} />

    </section>
  );
}
