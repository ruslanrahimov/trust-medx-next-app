'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Globe2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutIntro({ dict }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card animation
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Stats animation
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Content Card */}
        <div
          ref={cardRef}
          className="relative max-w-5xl mx-auto"
        >
          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            {/* Left side - Text */}
            <div className="space-y-6">
              <div className="relative p-10 bg-gradient-to-br from-white to-[#FEFBF6] rounded-[2rem] border border-[#4A3B2C]/10 shadow-xl">
                <p className="text-lg md:text-xl text-[#4A3B2C]/80 leading-relaxed font-[family-name:var(--font-dm-sans)] mb-6">
                  {dict.aboutPage.mission.description}
                </p>

                {/* Decorative line */}
                <div className="w-20 h-1 bg-gradient-to-r from-[#5FA8A3] to-[#D4A574] rounded-full mb-6" />

                {/* Icon features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#5FA8A3]/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#5FA8A3]" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4A3B2C] mb-1">
                        Проверенные клиники
                      </p>
                      <p className="text-xs text-[#4A3B2C]/60">
                        В Турции и других странах
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#D4A574]/10 flex items-center justify-center">
                      <Globe2 className="w-5 h-5 text-[#D4A574]" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4A3B2C] mb-1">
                        Международный опыт
                      </p>
                      <p className="text-xs text-[#4A3B2C]/60">
                        Работаем по всему миру
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#5FA8A3]/20 to-transparent rounded-[2rem] -z-10 blur-xl" />
              </div>
            </div>

            {/* Right side - Stats */}
            <div className="space-y-4">
              <div
                ref={(el) => (statsRef.current[0] = el)}
                className="relative p-6 bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] rounded-2xl shadow-lg text-white"
              >
                <div className="text-4xl font-bold mb-2" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                  10+
                </div>
                <div className="text-sm font-medium opacity-90">
                  Лет опыта в медицинском туризме
                </div>
              </div>

              <div
                ref={(el) => (statsRef.current[1] = el)}
                className="relative p-6 bg-gradient-to-br from-[#D4A574] to-[#C69563] rounded-2xl shadow-lg text-white"
              >
                <div className="text-4xl font-bold mb-2" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                  200+
                </div>
                <div className="text-sm font-medium opacity-90">
                  Проверенных клиник-партнёров
                </div>
              </div>

              <div
                ref={(el) => (statsRef.current[2] = el)}
                className="relative p-6 bg-gradient-to-br from-[#4A3B2C] to-[#3A2F22] rounded-2xl shadow-lg text-white"
              >
                <div className="text-4xl font-bold mb-2" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                  24/7
                </div>
                <div className="text-sm font-medium opacity-90">
                  Поддержка на всех этапах
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
