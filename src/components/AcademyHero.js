'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AcademyHero({ dict }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-title-line', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
      })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.5')
      .from(descriptionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.6')
      .from(scrollRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      }, '-=0.4');

      // Scroll indicator bounce
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Floating shapes animation
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
        {/* Large organic blob - top right */}
        <div className="floating-shape absolute -top-32 -right-32 w-[600px] h-[600px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-[#5FA8A3]/8 to-[#2C5F5D]/5 blur-3xl" />

        {/* Medium organic blob - bottom left */}
        <div className="floating-shape absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-tr from-[#D4A574]/8 to-[#967259]/5 blur-3xl" />

        {/* Small accent blob - center */}
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.15]"
        >
          <div className="hero-title-line mb-2">
            <span className="text-[#4A3B2C] font-[family-name:var(--font-fraunces)]">
              {dict.academy.hero.title}
            </span>
          </div>
          <div className="hero-title-line relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C5F5D] via-[#5FA8A3] to-[#2C5F5D] font-[family-name:var(--font-fraunces)]">
              {dict.academy.hero.titleAccent}
            </span>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent rounded-full opacity-40" />
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl text-[#4A3B2C]/80 mb-4 max-w-4xl mx-auto font-light leading-relaxed font-[family-name:var(--font-dm-sans)]"
        >
          {dict.academy.hero.subtitle}
        </p>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-base md:text-lg text-[#4A3B2C]/60 max-w-3xl mx-auto mb-12 leading-relaxed font-[family-name:var(--font-dm-sans)]"
        >
          {dict.academy.hero.description}
        </p>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="scroll-indicator flex flex-col items-center gap-2 text-[#5FA8A3]"
        >
          <span className="text-xs uppercase tracking-widest font-medium font-[family-name:var(--font-dm-sans)]">
            Discover More
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
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
