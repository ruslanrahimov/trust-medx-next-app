'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Heart, Award, Globe, Lightbulb, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutValues({ dict }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const icons = [Award, Shield, Heart, Users, Globe];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-[#FEFBF6] to-[#FAF8F0]"
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#5FA8A3]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
            <span className="text-sm font-medium text-[#4A3B2C]/80 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.whyChoose.badge}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-6"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
            }}
          >
            {dict.aboutPage.whyChoose.title}
          </h2>

          <p className="text-base md:text-lg text-[#4A3B2C]/60 max-w-3xl mx-auto font-[family-name:var(--font-dm-sans)]">
            {dict.aboutPage.whyChoose.subtitle}
          </p>

          {/* Minimalist divider */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
            <div className="w-1 h-1 rounded-full bg-[#4A3B2C]/30" />
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
          </div>
        </div>

        {/* Why Choose Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dict.aboutPage.whyChoose.items.map((item, index) => {
            const Icon = icons[index];

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#4A3B2C]/10 transition-all duration-300 hover:bg-white/90 hover:border-[#5FA8A3]/20 hover:shadow-lg hover:-translate-y-1">
                  {/* Icon Container */}
                  <div className="relative inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] shadow-md shadow-[#5FA8A3]/30 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl md:text-2xl font-bold text-[#4A3B2C] mb-4"
                    style={{
                      fontFamily: "'Crimson Pro', Georgia, serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                    {item.description}
                  </p>

                  {/* Number badge */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-gradient-to-br from-[#5FA8A3]/10 to-[#D4A574]/10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-sm font-bold text-[#5FA8A3]"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Decorative gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5FA8A3]/0 to-[#D4A574]/0 group-hover:from-[#5FA8A3]/5 group-hover:to-[#D4A574]/5 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
