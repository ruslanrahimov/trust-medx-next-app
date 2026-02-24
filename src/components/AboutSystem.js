'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, FileCheck, Award, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSystem({ dict }) {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            },
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: FileCheck,
      title: 'Проверка лицензий',
      description: 'Документы и разрешения',
      color: '#5FA8A3',
    },
    {
      icon: Users,
      title: 'Квалификация врачей',
      description: 'Опыт и специализация',
      color: '#D4A574',
    },
    {
      icon: Award,
      title: 'Стандарты лечения',
      description: 'Качество и протоколы',
      color: '#5FA8A3',
    },
    {
      icon: CheckCircle2,
      title: 'Партнёрство',
      description: 'Подписание соглашений',
      color: '#D4A574',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#FEFBF6] to-white"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-br from-[#5FA8A3]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-bl from-[#D4A574]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#5FA8A3]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3]" />
            <span className="text-sm font-semibold text-[#4A3B2C]/80 uppercase tracking-wider">
              Наша система
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-[#4A3B2C] mb-6"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            Надёжная система взаимодействия
          </h2>

          <p className="text-lg text-[#4A3B2C]/70 leading-relaxed">
            {dict.aboutPage.mission.paragraph1}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className="group relative"
              >
                <div className="relative h-full p-8 bg-white rounded-2xl border border-[#4A3B2C]/10 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  {/* Step number */}
                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: `${step.color}15`,
                      color: step.color,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${step.color}15`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-bold text-[#4A3B2C] mb-2"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#4A3B2C]/60">
                    {step.description}
                  </p>

                  {/* Connecting line (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#4A3B2C]/20 to-transparent" />
                  )}

                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom right, ${step.color}05, transparent)`,
                    }}
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
