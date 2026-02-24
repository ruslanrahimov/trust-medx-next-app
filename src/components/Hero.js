'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Shield, Users } from 'lucide-react';

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
      gsap.set(['.hero-badge', '.hero-title-line', '.hero-subtitle', '.hero-cta-btn', '.hero-trust-row', '.hero-image-col', '.hero-stat-card'], { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { opacity: 0, y: 24, duration: 0.85 })
        .from('.hero-title-line', { opacity: 0, y: 44, duration: 1, stagger: 0.16 }, '-=0.55')
        .from('.hero-subtitle', { opacity: 0, y: 22, duration: 0.8 }, '-=0.5')
        .from('.hero-cta-btn', { opacity: 0, y: 18, duration: 0.7, stagger: 0.12 }, '-=0.45')
        .from('.hero-trust-row', { opacity: 0, y: 14, duration: 0.65 }, '-=0.4')
        .from('.hero-image-col', { opacity: 0, x: 32, duration: 1 }, '-=0.9')
        .from('.hero-stat-card', { opacity: 0, y: 20, scale: 0.94, duration: 0.75, stagger: 0.14 }, '-=0.6');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[86vh] md:min-h-[90vh] flex flex-col overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      {/* Grain texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Orb top-right */}
      <div className="pointer-events-none absolute z-0"
        style={{
          top: '-120px', right: '-140px', width: '680px', height: '680px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,165,116,0.18) 0%, rgba(200,149,99,0.06) 60%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Orb bottom-left */}
      <div className="pointer-events-none absolute z-0"
        style={{
          bottom: '-160px', left: '-180px', width: '780px', height: '780px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(95,168,163,0.15) 0%, rgba(126,189,184,0.05) 60%, transparent 100%)',
          filter: 'blur(72px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 sm:px-6 lg:pl-8 lg:pr-0 pb-10 sm:pb-12 lg:pb-0">
        <div className="ml-auto w-full max-w-[1600px]">
          <div className="grid items-center gap-8 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-2 lg:items-stretch lg:gap-0">

            {/* Left column */}
            <div className="order-2 lg:order-1 flex flex-col pt-10 sm:pt-12 lg:pt-28 lg:pr-4 xl:pr-6">
              {/* Badge */}
              <div
                className="hero-badge mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#D4A574]/30 px-5 py-2.5 backdrop-blur-sm"
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
              <h1 className="mb-6 leading-[1.08]" style={{ fontFamily: DISPLAY_FONT }}>
                <span className="hero-title-line block text-[2.5rem] font-semibold text-[#4A3B2C] sm:text-5xl lg:text-[3.1rem] xl:text-[3.6rem]">
                  {forPatientsDict.title}
                </span>
                <span
                  className="hero-title-line block text-[2.5rem] font-bold sm:text-5xl lg:text-[3.1rem] xl:text-[3.6rem]"
                  style={{
                    background: 'linear-gradient(110deg, #5FA8A3 0%, #4A9691 45%, #7EBDB8 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}
                >
                  {forPatientsDict.titleAccent}
                </span>
                <span className="hero-title-line block text-[2.5rem] font-semibold text-[#4A3B2C] sm:text-5xl lg:text-[3.1rem] xl:text-[3.6rem]">
                  {forPatientsDict.titleEnd}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle mb-9 max-w-lg text-base leading-relaxed text-[#4A3B2C]/65 sm:text-lg"
                style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {forPatientsDict.description}
              </p>

              {/* CTA buttons */}
              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={`/${lang}/online-consultation`}
                  className="hero-cta-btn group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-7 py-4 text-sm font-semibold uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    background: 'linear-gradient(135deg, #5FA8A3 0%, #4A9691 100%)',
                    boxShadow: '0 8px 28px rgba(95,168,163,0.30)',
                    letterSpacing: '0.06em',
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative z-10">{heroDict.ctaPrimary}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>

                <Link
                  href={`/${lang}/about`}
                  className="hero-cta-btn group inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-7 py-4 text-sm font-semibold uppercase text-[#4A3B2C] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                  style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.06em', border: '1px solid rgba(74,59,44,0.18)' }}
                >
                  <span>{heroDict.ctaSecondary}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </Link>
              </div>

              {/* Trust row */}
              <div className="hero-trust-row flex flex-wrap items-center gap-3 sm:gap-4">
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

            {/* Right column */}
            <div className="hero-image-col order-1 lg:order-2 relative pt-16 sm:pt-20 lg:pt-0 lg:h-full">
              <div
                className="relative h-[320px] sm:h-[420px] lg:h-full w-full overflow-hidden rounded-[2rem] lg:rounded-l-[2.5rem] lg:rounded-r-none"
                style={{ boxShadow: '0 32px 80px rgba(74,59,44,0.14), 0 8px 24px rgba(74,59,44,0.08)' }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/hero.png"
                    alt="TrustMedX — medical care worldwide"
                    fill
                    sizes="(min-width: 1280px) 680px, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(74,59,44,0.22) 0%, rgba(74,59,44,0.04) 40%, transparent 70%)' }} />
              </div>

              {/* Floating card — top right */}
              <div
                className="hero-stat-card absolute right-4 top-8 hidden md:flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3.5 backdrop-blur-md xl:right-8"
                style={{ boxShadow: '0 12px 40px rgba(74,59,44,0.12)' }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #5FA8A3, #4A9691)' }}>
                  <Shield style={{ height: '18px', width: '18px', color: '#ffffff' }} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#4A3B2C] leading-none" style={{ fontFamily: DISPLAY_FONT }}>50+</div>
                  <div className="mt-0.5 text-[11px] font-medium uppercase text-[#4A3B2C]/55"
                    style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.07em' }}>
                    Клиник
                  </div>
                </div>
              </div>

              {/* Floating card — bottom left */}
              <div
                className="hero-stat-card absolute -left-5 bottom-12 hidden md:flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3.5 backdrop-blur-md xl:-left-8"
                style={{ boxShadow: '0 12px 40px rgba(74,59,44,0.12)' }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #D4A574, #C89563)' }}>
                  <Users style={{ height: '18px', width: '18px', color: '#ffffff' }} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#4A3B2C] leading-none" style={{ fontFamily: DISPLAY_FONT }}>98.5%</div>
                  <div className="mt-0.5 text-[11px] font-medium uppercase text-[#4A3B2C]/55"
                    style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.07em' }}>
                    Успех
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
