'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, HeartHandshake, Stethoscope, Eye, Baby, Smile } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutApproach({ dict }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const specialtiesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
          });
        }
      });

      // Specialties animation
      specialtiesRef.current.forEach((spec, index) => {
        if (spec) {
          gsap.from(spec, {
            scrollTrigger: {
              trigger: spec,
              start: 'top 85%',
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specialties = [
    { icon: Smile, name: 'Стоматология', color: '#5FA8A3' },
    { icon: Stethoscope, name: 'Эстетическая медицина', color: '#D4A574' },
    { icon: HeartHandshake, name: 'Пластическая хирургия', color: '#5FA8A3' },
    { icon: Eye, name: 'Офтальмология', color: '#D4A574' },
    { icon: Baby, name: 'Репродуктивные программы', color: '#5FA8A3' },
    { icon: Target, name: 'И другие направления', color: '#D4A574' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left - Main Text Card */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5FA8A3]/10 border border-[#5FA8A3]/20 mb-6">
              <Target className="w-4 h-4 text-[#5FA8A3]" />
              <span className="text-sm font-semibold text-[#5FA8A3] uppercase tracking-wider">
                Наш подход
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-[#4A3B2C] mb-6"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Комплексное сопровождение
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-[#4A3B2C]/80 leading-relaxed">
                {dict.aboutPage.mission.paragraph2}
              </p>

              {/* Highlight Card */}
              <div className="relative p-6 bg-gradient-to-br from-[#5FA8A3]/10 to-[#D4A574]/10 rounded-2xl border border-[#4A3B2C]/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                    <HeartHandshake className="w-6 h-6 text-[#5FA8A3]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-[#4A3B2C] mb-2"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      Общая цель команды
                    </h3>
                    <p className="text-sm text-[#4A3B2C]/70">
                      Обеспечить пациенту уверенность, безопасность и результат
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Process Steps */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="relative"
          >
            <div className="relative p-8 bg-gradient-to-br from-[#FEFBF6] to-white rounded-3xl border border-[#4A3B2C]/10 shadow-xl">
              <h3
                className="text-2xl font-bold text-[#4A3B2C] mb-6"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                Этапы сопровождения
              </h3>

              <div className="space-y-4">
                {[
                  { step: '01', text: 'Первичный запрос и анализ ситуации', color: '#5FA8A3' },
                  { step: '02', text: 'Подбор врача и клиники', color: '#D4A574' },
                  { step: '03', text: 'Организация и планирование', color: '#5FA8A3' },
                  { step: '04', text: 'Лечение и координация', color: '#D4A574' },
                  { step: '05', text: 'Возвращение домой и поддержка', color: '#5FA8A3' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.step}
                    </div>
                    <p className="text-sm text-[#4A3B2C]/70 flex-1">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#D4A574]/20 to-transparent rounded-[2rem] -z-10 blur-xl" />
            </div>
          </div>
        </div>

        {/* Medical Directions Section */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="relative"
        >
          <div className="text-center mb-12">
            <h3
              className="text-3xl md:text-4xl font-bold text-[#4A3B2C] mb-4"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Направления работы
            </h3>
            <p className="text-lg text-[#4A3B2C]/60 max-w-3xl mx-auto">
              {dict.aboutPage.mission.paragraph3}
            </p>
          </div>

          {/* Specialties Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (specialtiesRef.current[index] = el)}
                  className="group"
                >
                  <div className="relative p-6 bg-white rounded-2xl border border-[#4A3B2C]/10 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
                    <div
                      className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${specialty.color}15`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: specialty.color }} strokeWidth={2} />
                    </div>
                    <p className="text-xs font-medium text-[#4A3B2C]/70">
                      {specialty.name}
                    </p>
                  </div>
                </div>
              );
            })}
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
