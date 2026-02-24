'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Heart, Shield, Target } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPhilosophy({ dict }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const pillarsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Pillars animation
      pillarsRef.current.forEach((pillar, index) => {
        if (pillar) {
          gsap.from(pillar, {
            scrollTrigger: {
              trigger: pillar,
              start: 'top 85%',
            },
            opacity: 0,
            y: 40,
            rotation: -5,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Heart,
      title: 'Честность',
      description: 'Прозрачность на каждом этапе',
      color: '#5FA8A3',
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Безопасность пациента — приоритет',
      color: '#D4A574',
    },
    {
      icon: Target,
      title: 'Результат',
      description: 'Фокус на результате лечения',
      color: '#5FA8A3',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#FEFBF6] via-[#FAF8F0] to-[#FEFBF6]"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        {/* Large gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#5FA8A3]/10 via-[#D4A574]/10 to-transparent rounded-full blur-3xl" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#5FA8A3]/30 shadow-lg mb-6">
            <Lightbulb className="w-4 h-4 text-[#5FA8A3]" />
            <span className="text-sm font-semibold text-[#4A3B2C]/80 uppercase tracking-wider">
              Наша философия
            </span>
          </div>
        </div>

        {/* Main Philosophy Card */}
        <div
          ref={contentRef}
          className="relative max-w-5xl mx-auto mb-16"
        >
          <div className="relative p-10 md:p-14 bg-white/90 backdrop-blur-sm rounded-[3rem] border-2 border-[#4A3B2C]/10 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-gradient-to-br from-[#5FA8A3]/20 to-transparent blur-2xl" />
            <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-gradient-to-tl from-[#D4A574]/20 to-transparent blur-2xl" />

            {/* Content */}
            <div className="relative">
              <div className="w-16 h-1 bg-gradient-to-r from-[#5FA8A3] to-[#D4A574] rounded-full mb-8" />

              <p
                className="text-2xl md:text-3xl leading-relaxed text-[#4A3B2C] font-medium"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {dict.aboutPage.mission.philosophy}
              </p>

              <div className="w-16 h-1 bg-gradient-to-r from-[#D4A574] to-[#5FA8A3] rounded-full mt-8 ml-auto" />
            </div>

            {/* Quote marks decoration */}
            <div className="absolute top-6 left-6 text-8xl font-serif text-[#5FA8A3]/10 leading-none">
              "
            </div>
            <div className="absolute bottom-6 right-6 text-8xl font-serif text-[#D4A574]/10 leading-none rotate-180">
              "
            </div>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                ref={(el) => (pillarsRef.current[index] = el)}
                className="group"
              >
                <div className="relative h-full p-8 bg-white rounded-2xl border border-[#4A3B2C]/10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `linear-gradient(135deg, ${pillar.color}, ${pillar.color}dd)`,
                      boxShadow: `0 10px 30px ${pillar.color}40`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl font-bold text-[#4A3B2C] text-center mb-3"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#4A3B2C]/60 text-center">
                    {pillar.description}
                  </p>

                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, ${pillar.color}05, transparent)`,
                    }}
                  />

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: pillar.color }}
                  />
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
