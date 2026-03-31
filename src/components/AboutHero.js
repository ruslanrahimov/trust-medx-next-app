'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function AboutHero({ dict, lang }) {
  const heroRef = useRef(null);
  const mission = dict.aboutPage.mission;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        opacity: 0,
        y: -16,
        duration: 0.6,
      })
      .from('.hero-title-line', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
      }, '-=0.3')
      .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.5')

      .from('.hero-scroll', {
        opacity: 0,
        duration: 0.6,
      }, '-=0.2');

      // Floating shapes
      gsap.utils.toArray('.floating-shape').forEach((shape, i) => {
        gsap.to(shape, {
          y: -20 - (i * 10),
          x: i % 2 === 0 ? 15 : -15,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 3 + (i * 0.5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Scroll indicator bounce
      gsap.to('.scroll-dot', {
        y: 8,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAF8F0] via-[#FEFBF6] to-[#F8F5EE]"
    >
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shape absolute -top-32 -right-32 w-[600px] h-[600px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-[#5FA8A3]/8 to-[#2C5F5D]/5 blur-3xl" />
        <div className="floating-shape absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-tr from-[#D4A574]/8 to-[#967259]/5 blur-3xl" />
        <div className="floating-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-[40%_60%_60%_40%/60%_40%_40%_60%] bg-[#5FA8A3]/5 blur-2xl" />
      </div>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #4A3B2C 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 w-full">

        {/* Title row: logo left | divider | subtitle right */}
        <div className="hero-title-line flex flex-col md:flex-row items-center gap-0 mb-8 w-full">
          {/* Logo */}
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src="/trustmedx-logo-mobile.png"
              alt="TrustMedX"
              width={220}
              height={136}
              priority
              className="w-[180px] md:w-[220px] h-auto"
            />
          </div>

          {/* Horizontal divider — mobile */}
          <div className="block md:hidden w-24 h-px my-3 bg-gradient-to-r from-transparent via-[#4A3B2C]/20 to-transparent" />
          {/* Vertical divider — desktop */}
          <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#4A3B2C]/20 to-transparent" />

          {/* Subtitle */}
          <div className="flex-1 flex items-center justify-center md:justify-start md:pl-6">
            <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-none text-center md:text-left">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C5F5D] via-[#5FA8A3] to-[#2C5F5D] font-[family-name:var(--font-fraunces)]">
                {mission.subtitle}
              </span>
            </h1>
          </div>
        </div>

        {/* Intro text */}
        <p className="hero-subtitle text-lg md:text-xl text-[#4A3B2C]/70 font-light leading-relaxed font-[family-name:var(--font-dm-sans)] mb-10">
          {mission.intro}{mission.description ? ` ${mission.description}` : ''}
        </p>


        {/* Scroll indicator */}
        <div className="hero-scroll flex justify-center">
          <div className="flex flex-col items-center gap-2 text-[#4A3B2C]/40">
            <span className="text-xs tracking-widest uppercase font-[family-name:var(--font-dm-sans)]">Узнать больше</span>
            <div className="w-5 h-8 rounded-full border border-[#4A3B2C]/20 flex items-start justify-center p-1">
              <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-[#5FA8A3]/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C360,20 480,100 720,60 C960,20 1080,100 1440,60 L1440,120 L0,120 Z"
            fill="#FEFBF6"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
