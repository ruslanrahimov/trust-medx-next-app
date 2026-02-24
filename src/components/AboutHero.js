'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Shield } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutHero({ dict }) {
  const heroRef = useRef(null);
  const floatingRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.4,
      });

      gsap.from('.hero-intro', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.6,
      });

      // Floating elements animation
      floatingRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: '-20px',
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-[#FEFBF6] via-white to-[#FAF8F0]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#5FA8A3]/20 to-[#7EBDB8]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#D4A574]/20 to-[#E8C9A0]/10 rounded-full blur-3xl" />

        {/* Floating decorative elements */}
        <div
          ref={(el) => (floatingRef.current[0] = el)}
          className="absolute top-1/4 left-1/4 w-20 h-20 opacity-10"
        >
          <Shield className="w-full h-full text-[#5FA8A3]" strokeWidth={1} />
        </div>
        <div
          ref={(el) => (floatingRef.current[1] = el)}
          className="absolute top-1/3 right-1/4 w-16 h-16 opacity-10"
        >
          <Heart className="w-full h-full text-[#D4A574]" strokeWidth={1} />
        </div>
        <div
          ref={(el) => (floatingRef.current[2] = el)}
          className="absolute bottom-1/4 left-1/3 w-24 h-24 opacity-10"
        >
          <Sparkles className="w-full h-full text-[#5FA8A3]" strokeWidth={1} />
        </div>

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <div className="text-center mb-8">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#5FA8A3]/30 shadow-lg shadow-[#5FA8A3]/10">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
            <span className="text-sm font-semibold text-[#4A3B2C]/80 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.mission.badge}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-center text-[#4A3B2C] mb-6"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
          }}
        >
          {dict.aboutPage.mission.title}
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-2xl md:text-3xl text-center font-semibold mb-8">
          <span className="bg-gradient-to-r from-[#5FA8A3] to-[#4A9691] bg-clip-text text-transparent">
            {dict.aboutPage.mission.subtitle}
          </span>
        </p>

        {/* Intro Text */}
        <div className="hero-intro max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-center text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
            {dict.aboutPage.mission.intro}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#5FA8A3]/50 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[#5FA8A3]" />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4A574]/50 to-transparent" />
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
