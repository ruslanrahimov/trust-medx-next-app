'use client';

import { useState, useEffect } from 'react';
import { Award, DollarSign, Heart, Sparkles, Shield, Clock } from 'lucide-react';

const countryConfig = {
  turkey: { accentColor: '#E30A17' },
  'south-korea': { accentColor: '#0047A0' },
  china: { accentColor: '#DE2910' },
};

const iconMap = {
  quality: Award,
  price: DollarSign,
  service: Heart,
  technology: Sparkles,
  safety: Shield,
  speed: Clock,
};

function AdvantageCard({ advantage, index, accentColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const Icon = iconMap[advantage.icon] || Award;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="relative group"
      style={{
        opacity: 0,
        transform: 'translateY(40px) scale(0.95)',
        animation: isVisible ? `cardAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-[#4A3B2C]/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
          style={{
            background: `radial-gradient(circle at top right, ${accentColor}20, transparent 70%)`,
          }}
        />

        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative">
          {/* Icon with animated border */}
          <div className="relative w-16 h-16 mb-6">
            {/* Animated rotating border */}
            <div
              className="absolute inset-0 rounded-2xl transition-all duration-700"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)`,
                opacity: isHovered ? 0.2 : 0.1,
                transform: isHovered ? 'rotate(10deg) scale(1.1)' : 'rotate(0deg) scale(1)',
              }}
            />

            {/* Icon container */}
            <div
              className="relative w-full h-full rounded-2xl flex items-center justify-center bg-white transition-transform duration-500 group-hover:scale-110"
              style={{
                boxShadow: `0 8px 20px ${accentColor}20`,
              }}
            >
              <Icon
                size={28}
                strokeWidth={2}
                className="transition-all duration-500"
                style={{
                  color: accentColor,
                  transform: isHovered ? 'rotate(5deg)' : 'rotate(0deg)',
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-2xl font-bold text-[#4A3B2C] mb-3 transition-colors duration-300 group-hover:text-[#2a2520]"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {advantage.title}

            {/* Animated underline */}
            <div
              className="h-0.5 w-0 rounded-full mt-2 transition-all duration-500 group-hover:w-12"
              style={{ backgroundColor: accentColor }}
            />
          </h3>

          {/* Description */}
          <p
            className="text-[#4A3B2C]/70 leading-relaxed"
            style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
          >
            {advantage.description}
          </p>

          {/* Decorative element */}
          <div
            className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at bottom right, ${accentColor}10, transparent 60%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CountryAdvantages({ dict, lang, country }) {
  const mounted = true;
  const config = countryConfig[country] || countryConfig.turkey;

  const advantagesData = {
    turkey: [
      {
        icon: 'quality',
        title: dict?.countries?.turkey?.advantages?.[0]?.title || 'Высочайшее качество',
        description: dict?.countries?.turkey?.advantages?.[0]?.description || 'Клиники с международной аккредитацией JCI и ISO, оснащенные современным оборудованием',
      },
      {
        icon: 'price',
        title: dict?.countries?.turkey?.advantages?.[1]?.title || 'Доступные цены',
        description: dict?.countries?.turkey?.advantages?.[1]?.description || 'Стоимость лечения на 50-70% ниже, чем в Европе и США при том же качестве',
      },
      {
        icon: 'service',
        title: dict?.countries?.turkey?.advantages?.[2]?.title || 'Премиальный сервис',
        description: dict?.countries?.turkey?.advantages?.[2]?.description || 'Персональный координатор, трансфер, переводчик и полное сопровождение 24/7',
      },
      {
        icon: 'technology',
        title: dict?.countries?.turkey?.advantages?.[3]?.title || 'Новейшие технологии',
        description: dict?.countries?.turkey?.advantages?.[3]?.description || 'Использование самого современного медицинского оборудования и инновационных методик',
      },
      {
        icon: 'safety',
        title: dict?.countries?.turkey?.advantages?.[4]?.title || 'Безопасность',
        description: dict?.countries?.turkey?.advantages?.[4]?.description || 'Строгие протоколы безопасности и контроля качества на всех этапах лечения',
      },
      {
        icon: 'speed',
        title: dict?.countries?.turkey?.advantages?.[5]?.title || 'Быстрая организация',
        description: dict?.countries?.turkey?.advantages?.[5]?.description || 'Организация поездки и начало лечения в течение 7-14 дней',
      },
    ],
    'south-korea': [
      {
        icon: 'technology',
        title: dict?.countries?.southKorea?.advantages?.[0]?.title || 'Передовые технологии',
        description: dict?.countries?.southKorea?.advantages?.[0]?.description || 'Лидер в области инновационных медицинских технологий и роботизированной хирургии',
      },
      {
        icon: 'quality',
        title: dict?.countries?.southKorea?.advantages?.[1]?.title || 'Мировые стандарты',
        description: dict?.countries?.southKorea?.advantages?.[1]?.description || 'Врачи с международным образованием и признанием, клиники мирового уровня',
      },
      {
        icon: 'service',
        title: dict?.countries?.southKorea?.advantages?.[2]?.title || 'Индивидуальный подход',
        description: dict?.countries?.southKorea?.advantages?.[2]?.description || 'Тщательная диагностика и персонализированные программы лечения',
      },
      {
        icon: 'safety',
        title: dict?.countries?.southKorea?.advantages?.[3]?.title || 'Высокая безопасность',
        description: dict?.countries?.southKorea?.advantages?.[3]?.description || 'Одни из самых низких показателей осложнений в мире',
      },
      {
        icon: 'heart',
        title: dict?.countries?.southKorea?.advantages?.[4]?.title || 'Комфорт и забота',
        description: dict?.countries?.southKorea?.advantages?.[4]?.description || 'Высочайший уровень гостеприимства и внимания к пациентам',
      },
      {
        icon: 'price',
        title: dict?.countries?.southKorea?.advantages?.[5]?.title || 'Оптимальное соотношение',
        description: dict?.countries?.southKorea?.advantages?.[5]?.description || 'Справедливые цены при премиальном качестве услуг',
      },
    ],
    china: [
      {
        icon: 'sparkles',
        title: dict?.countries?.china?.advantages?.[0]?.title || 'Уникальный подход',
        description: dict?.countries?.china?.advantages?.[0]?.description || 'Интеграция традиционной китайской медицины с современными западными методами',
      },
      {
        icon: 'quality',
        title: dict?.countries?.china?.advantages?.[1]?.title || 'Опыт тысячелетий',
        description: dict?.countries?.china?.advantages?.[1]?.description || 'Древние методики лечения, проверенные временем и подтвержденные наукой',
      },
      {
        icon: 'technology',
        title: dict?.countries?.china?.advantages?.[2]?.title || 'Современная медицина',
        description: dict?.countries?.china?.advantages?.[2]?.description || 'Инвестиции в передовое оборудование и инновационные исследования',
      },
      {
        icon: 'price',
        title: dict?.countries?.china?.advantages?.[3]?.title || 'Доступность',
        description: dict?.countries?.china?.advantages?.[3]?.description || 'Конкурентные цены на лечение высокого качества',
      },
      {
        icon: 'service',
        title: dict?.countries?.china?.advantages?.[4]?.title || 'Полное сопровождение',
        description: dict?.countries?.china?.advantages?.[4]?.description || 'Помощь с визой, переводом и адаптацией на всех этапах',
      },
      {
        icon: 'shield',
        title: dict?.countries?.china?.advantages?.[5]?.title || 'Надежность',
        description: dict?.countries?.china?.advantages?.[5]?.description || 'Работа только с проверенными и сертифицированными клиниками',
      },
    ],
  };

  const advantages = advantagesData[country] || advantagesData.turkey;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAF8F0] to-white" />

      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className="text-center mb-16 md:mb-20"
          style={{
            opacity: 0,
            animation: mounted ? 'fadeInUp 1s ease-out forwards' : 'none',
          }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A3B2C] mb-4"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {lang === 'ru' && 'Почему выбирают нас'}
            {lang === 'en' && 'Why Choose Us'}
            {lang === 'ar' && 'لماذا تختارنا'}
          </h2>

          <p
            className="text-lg text-[#4A3B2C]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
          >
            {lang === 'ru' && 'Ключевые преимущества лечения, которые делают нас лучшим выбором'}
            {lang === 'en' && 'Key advantages that make us your best choice'}
            {lang === 'ar' && 'المزايا الرئيسية التي تجعلنا خيارك الأفضل'}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard
              key={index}
              advantage={advantage}
              index={index}
              accentColor={config.accentColor}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
