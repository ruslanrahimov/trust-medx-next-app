'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Search, FileCheck, Heart, HandHeart } from 'lucide-react';

// Icon mapping for each step
const stepIcons = {
  consultation: MessageCircle,
  selection: Search,
  organization: FileCheck,
  treatment: Heart,
  support: HandHeart,
};

function ProcessStep({ step, index, isLast, totalSteps }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = stepIcons[step.type] || MessageCircle;
  const progress = ((index + 1) / totalSteps) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative process-step"
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        animation: isVisible ? `slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s forwards` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-6 md:gap-8">
        {/* Enhanced Timeline with animated progress */}
        <div className="flex flex-col items-center relative z-10">
          {/* Animated Icon Container */}
          <div className="relative group/icon">
            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9A55C]/20 to-[#8B7355]/20 blur-xl transition-all duration-700"
              style={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
            />

            {/* Main icon container with 3D effect */}
            <div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAF8F0] to-[#F5F1E8]" />

              {/* Animated gradient border */}
              <div
                className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-[#C9A55C] via-[#8B7355] to-[#C9A55C] opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"
                style={{
                  background: isHovered
                    ? 'linear-gradient(135deg, #C9A55C 0%, #8B7355 50%, #C9A55C 100%)'
                    : 'linear-gradient(135deg, transparent 0%, transparent 50%, transparent 100%)',
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-white via-[#FAF8F0] to-[#F5F1E8] rounded-2xl" />
              </div>

              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-[#4A3B2C]/10 group-hover/icon:border-[#C9A55C]/30 transition-colors duration-500" />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon
                  className="text-[#4A3B2C] transition-all duration-500 group-hover/icon:text-[#C9A55C] group-hover/icon:scale-110"
                  size={28}
                  strokeWidth={1.5}
                  style={{
                    transform: isHovered ? 'rotate(5deg)' : 'rotate(0deg)',
                  }}
                />
              </div>

              {/* Shimmer effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/icon:translate-x-full transition-transform duration-1000"
                style={{
                  transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                }}
              />
            </div>

            {/* Luxurious step number badge */}
            <div
              className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-[#C9A55C] to-[#8B7355] shadow-lg flex items-center justify-center transition-all duration-500 group-hover/icon:scale-110"
              style={{
                transform: isHovered ? 'rotate(10deg)' : 'rotate(0deg)',
              }}
            >
              <span className="text-white text-sm font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                {index + 1}
              </span>

              {/* Inner glow */}
              <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
            </div>
          </div>

          {/* Animated connecting line with progress */}
          {!isLast && (
            <div className="relative w-0.5 flex-1 mt-6 mb-6 min-h-[80px] overflow-hidden">
              {/* Background line */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4A3B2C]/15 via-[#4A3B2C]/10 to-[#4A3B2C]/15" />

              {/* Animated progress line */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-[#C9A55C] via-[#B8944A] to-[#C9A55C] origin-top"
                style={{
                  transform: `scaleY(${isVisible ? 1 : 0})`,
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${index * 0.15 + 0.4}s`,
                }}
              />

              {/* Flowing light effect */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-transparent h-1/3 animate-flow"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              />

              {/* Pulsing dot */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C9A55C] shadow-lg shadow-[#C9A55C]/50 animate-pulse"
                style={{
                  animationDelay: `${index * 0.15 + 0.6}s`,
                }}
              />
            </div>
          )}
        </div>

        {/* Enhanced Content Card */}
        <div className="flex-1 pb-12 md:pb-14">
          <div
            className="group/card relative overflow-hidden rounded-3xl transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
            }}
          >
            {/* Layered background with depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FEFBF6] to-[#FAF8F0]" />

            {/* Animated gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#C9A55C]/0 via-transparent to-[#8B7355]/0 opacity-0 group-hover/card:opacity-5 transition-opacity duration-700"
            />

            {/* Noise texture for premium feel */}
            <div
              className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
              }}
            />

            {/* Border with gradient */}
            <div className="absolute inset-0 rounded-3xl border border-[#4A3B2C]/8 group-hover/card:border-[#C9A55C]/20 transition-colors duration-500" />

            {/* Premium shadow */}
            <div
              className="absolute inset-0 rounded-3xl shadow-sm group-hover/card:shadow-2xl group-hover/card:shadow-[#C9A55C]/10 transition-shadow duration-500"
            />

            {/* Content */}
            <div className="relative p-6 md:p-8">
              {/* Step indicator bar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-1 bg-[#4A3B2C]/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9A55C] to-[#B8944A] rounded-full transition-all duration-1000"
                    style={{
                      width: `${progress}%`,
                      opacity: isVisible ? 1 : 0,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#C9A55C]" style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
                  {progress.toFixed(0)}%
                </span>
              </div>

              {/* Title with luxury typography */}
              <h3
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#4A3B2C] mb-3 group-hover/card:text-[#3D3124] transition-colors duration-300"
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  letterSpacing: '-0.02em',
                }}
              >
                {step.title}

                {/* Animated underline */}
                <div className="h-0.5 w-0 group-hover/card:w-16 bg-gradient-to-r from-[#C9A55C] to-transparent rounded-full transition-all duration-500 mt-2" />
              </h3>

              {/* Description with refined typography */}
              <p
                className="text-sm md:text-base text-[#4A3B2C]/70 leading-relaxed mb-4"
                style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
              >
                {step.description}
              </p>

              {/* Key points with premium styling */}
              {step.points && step.points.length > 0 && (
                <ul className="space-y-3 mt-4">
                  {step.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#4A3B2C]/60 group/point"
                      style={{
                        opacity: 0,
                        animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.15 + idx * 0.1 + 0.5}s forwards` : 'none',
                      }}
                    >
                      {/* Luxury bullet point */}
                      <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#C9A55C]/10 to-[#8B7355]/10 flex items-center justify-center mt-0.5 group-hover/point:from-[#C9A55C]/20 group-hover/point:to-[#8B7355]/20 transition-all duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A55C]" />
                      </span>
                      <span style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Decorative corner accent */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle at bottom right, #C9A55C15 0%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowWeWork({ dict, lang }) {
  const mounted = true;
  const [progressValue, setProgressValue] = useState(0);
  const isRTL = lang === 'ar';

  // Process steps with fallback
  const steps = dict?.howWeWork?.steps || [
    {
      type: 'consultation',
      title: 'Консультация',
      description: 'Первичное обращение и детальный анализ вашей медицинской ситуации. Мы внимательно изучаем все документы и формируем понимание ваших потребностей.',
      points: [],
    },
    {
      type: 'selection',
      title: 'Подбор клиники',
      description: 'Выбор оптимальной страны, клиники и врача на основе медицинских показаний и ваших предпочтений. Предоставляем несколько вариантов для сравнения.',
      points: [],
    },
    {
      type: 'organization',
      title: 'Организация',
      description: 'Подготовка всех необходимых документов, согласование плана лечения и организация поездки. Берём на себя все организационные вопросы.',
      points: [],
    },
    {
      type: 'treatment',
      title: 'Лечение',
      description: 'Полное сопровождение на всех этапах лечения. Координация с клиникой, переводчики, решение любых возникающих вопросов на месте.',
      points: [],
    },
    {
      type: 'support',
      title: 'Поддержка',
      description: 'Помощь и консультации после возвращения домой. Коммуникация с врачами, контроль восстановления и ответы на все вопросы.',
      points: [],
    },
  ];

  const sectionTitle = dict?.howWeWork?.title || 'Как мы работаем';
  const sectionSubtitle = dict?.howWeWork?.subtitle || 'Прозрачный процесс от первого обращения до полного восстановления';

  useEffect(() => {
    // Animate overall progress
    const timer = setTimeout(() => {
      setProgressValue(100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative py-20 md:py-28 px-4 md:px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F0] via-[#FEFBF6] to-[#F5F1E8]" />

      {/* Radial gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-[#C9A55C]/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-[#8B7355]/5 to-transparent blur-3xl" />

      {/* Premium texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-16 md:mb-20"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            animation: mounted ? 'slideInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
          }}
        >
          {/* Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A3B2C] mb-4"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontWeight: 600,
            }}
          >
            {sectionTitle}
          </h2>

          {/* Subtitle */}
          {sectionSubtitle && (
            <p
              className="text-base md:text-lg text-[#4A3B2C]/70 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
            >
              {sectionSubtitle}
            </p>
          )}
        </div>

        {/* Process Steps */}
        <div className="relative">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.type}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              totalSteps={steps.length}
            />
          ))}
        </div>

        {/* Premium bottom CTA */}
        <div
          className="mt-12 text-center"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            animation: mounted ? 'slideInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards' : 'none',
          }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-white via-[#FEFBF6] to-white rounded-2xl border border-[#C9A55C]/20 shadow-xl shadow-[#C9A55C]/10 relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A55C]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#C9A55C] to-[#8B7355] animate-pulse" />
            <span
              className="text-sm md:text-base text-[#4A3B2C] font-semibold relative"
              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
            >
              {lang === 'ru' && 'Готовы начать ваш путь к здоровью?'}
              {lang === 'en' && 'Ready to start your journey to health?'}
              {lang === 'ar' && 'هل أنت مستعد لبدء رحلتك نحو الصحة؟'}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes flow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(300%);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-flow {
          animation: flow 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
