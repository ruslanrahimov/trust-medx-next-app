'use client';

import { useState, useEffect } from 'react';
import { Award, Users, TrendingUp, MapPin } from 'lucide-react';

const countryConfig = {
  turkey: {
    accentColor: '#E30A17',
    flag: '🇹🇷',
    gradient: 'from-[#E30A17]/10 via-transparent to-[#E30A17]/5',
  },
  'south-korea': {
    accentColor: '#0047A0',
    flag: '🇰🇷',
    gradient: 'from-[#0047A0]/10 via-transparent to-[#0047A0]/5',
  },
  china: {
    accentColor: '#DE2910',
    flag: '🇨🇳',
    gradient: 'from-[#DE2910]/10 via-transparent to-[#DE2910]/5',
  },
};

function StatCard({ icon: Icon, value, label, delay, accentColor }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="relative group"
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        animation: isVisible ? `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none',
      }}
    >
      <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#4A3B2C]/10 hover:border-[#4A3B2C]/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#4A3B2C]/5">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: `${accentColor}15` }}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
            }}
          >
            <Icon
              className="transition-all duration-500"
              size={24}
              strokeWidth={2}
              style={{ color: accentColor }}
            />
          </div>

          {/* Value */}
          <div
            className="text-3xl font-bold mb-1 transition-colors duration-300"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              color: '#4A3B2C',
            }}
          >
            {value}
          </div>

          {/* Label */}
          <div
            className="text-sm text-[#4A3B2C]/60"
            style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CountryHero({ dict, lang, country }) {
  const mounted = true;
  const config = countryConfig[country] || countryConfig.turkey;

  const countryData = {
    turkey: dict?.countries?.turkey || {
      name: lang === 'ru' ? 'Турция' : lang === 'en' ? 'Turkey' : 'تركيا',
      hero: {
        title: lang === 'ru' ? 'Лечение мирового класса в Турции' : lang === 'en' ? 'World-Class Treatment in Turkey' : 'علاج عالمي المستوى في تركيا',
        subtitle: lang === 'ru' ? 'Передовые технологии, опытные врачи и доступные цены' : lang === 'en' ? 'Advanced technologies, experienced doctors and affordable prices' : 'تقنيات متقدمة، أطباء ذوو خبرة وأسعار معقولة',
        description: lang === 'ru' ? 'Турция — один из мировых лидеров медицинского туризма с современными клиниками, аккредитованными международными организациями' : lang === 'en' ? 'Turkey is one of the world leaders in medical tourism with modern clinics accredited by international organizations' : 'تركيا هي واحدة من الرواد العالميين في السياحة الطبية مع عيادات حديثة معتمدة من منظمات دولية',
      },
      stats: {
        clinics: '200+',
        clinicsLabel: lang === 'ru' ? 'Аккредитованных клиник' : lang === 'en' ? 'Accredited Clinics' : 'عيادات معتمدة',
        success: '98%',
        successLabel: lang === 'ru' ? 'Успешных операций' : lang === 'en' ? 'Successful Operations' : 'عمليات ناجحة',
        experience: '15+',
        experienceLabel: lang === 'ru' ? 'Лет опыта' : lang === 'en' ? 'Years of Experience' : 'سنوات من الخبرة',
        patients: '50K+',
        patientsLabel: lang === 'ru' ? 'Довольных пациентов' : lang === 'en' ? 'Satisfied Patients' : 'مرضى راضون',
      },
    },
    'south-korea': dict?.countries?.southKorea || {
      name: lang === 'ru' ? 'Южная Корея' : lang === 'en' ? 'South Korea' : 'كوريا الجنوبية',
      hero: {
        title: lang === 'ru' ? 'Инновационная медицина Южной Кореи' : lang === 'en' ? 'Innovative Medicine of South Korea' : 'الطب المبتكر في كوريا الجنوبية',
        subtitle: lang === 'ru' ? 'Высокие технологии и индивидуальный подход' : lang === 'en' ? 'High technology and individual approach' : 'التكنولوجيا العالية والنهج الفردي',
        description: lang === 'ru' ? 'Южная Корея известна передовыми медицинскими технологиями и высочайшими стандартами качества лечения' : lang === 'en' ? 'South Korea is known for advanced medical technologies and highest standards of treatment quality' : 'تشتهر كوريا الجنوبية بالتقنيات الطبية المتقدمة وأعلى معايير جودة العلاج',
      },
      stats: {
        clinics: '150+',
        clinicsLabel: lang === 'ru' ? 'Премиальных клиник' : lang === 'en' ? 'Premium Clinics' : 'عيادات متميزة',
        success: '99%',
        successLabel: lang === 'ru' ? 'Успешных процедур' : lang === 'en' ? 'Successful Procedures' : 'إجراءات ناجحة',
        experience: '20+',
        experienceLabel: lang === 'ru' ? 'Лет в медтуризме' : lang === 'en' ? 'Years in Medical Tourism' : 'سنوات في السياحة الطبية',
        patients: '30K+',
        patientsLabel: lang === 'ru' ? 'Международных пациентов' : lang === 'en' ? 'International Patients' : 'مرضى دوليون',
      },
    },
    china: dict?.countries?.china || {
      name: lang === 'ru' ? 'Китай' : lang === 'en' ? 'China' : 'الصين',
      hero: {
        title: lang === 'ru' ? 'Традиционная и современная медицина Китая' : lang === 'en' ? 'Traditional and Modern Medicine of China' : 'الطب التقليدي والحديث في الصين',
        subtitle: lang === 'ru' ? 'Уникальное сочетание древних знаний и инноваций' : lang === 'en' ? 'Unique combination of ancient knowledge and innovations' : 'مزيج فريد من المعرفة القديمة والابتكارات',
        description: lang === 'ru' ? 'Китай предлагает уникальную интеграцию традиционной китайской медицины с современными западными методами лечения' : lang === 'en' ? 'China offers unique integration of traditional Chinese medicine with modern Western treatment methods' : 'تقدم الصين تكاملاً فريداً للطب الصيني التقليدي مع طرق العلاج الغربية الحديثة',
      },
      stats: {
        clinics: '300+',
        clinicsLabel: lang === 'ru' ? 'Сертифицированных клиник' : lang === 'en' ? 'Certified Clinics' : 'عيادات معتمدة',
        success: '97%',
        successLabel: lang === 'ru' ? 'Положительных результатов' : lang === 'en' ? 'Positive Results' : 'نتائج إيجابية',
        experience: '25+',
        experienceLabel: lang === 'ru' ? 'Лет традиций' : lang === 'en' ? 'Years of Tradition' : 'سنوات من التقاليد',
        patients: '100K+',
        patientsLabel: lang === 'ru' ? 'Вылеченных пациентов' : lang === 'en' ? 'Treated Patients' : 'مرضى معالجون',
      },
    },
  };

  const data = countryData[country] || countryData.turkey;
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F0] via-[#FEFBF6] to-[#F8F5EE]" />

      {/* Country-specific gradient accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: config.accentColor }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: config.accentColor }}
        />
      </div>

      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Flag badge */}
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border mb-6"
              style={{
                borderColor: `${config.accentColor}30`,
                opacity: 0,
                animation: mounted ? 'fadeIn 0.8s ease-out 0.2s forwards' : 'none',
              }}
            >
              <span className="text-2xl">{config.flag}</span>
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: "'DM Sans', -apple-system, sans-serif",
                  color: config.accentColor,
                }}
              >
                {data.name}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-6 leading-tight"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                opacity: 0,
                animation: mounted ? 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' : 'none',
              }}
            >
              {data.hero.title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl mb-4"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                color: config.accentColor,
                opacity: 0,
                animation: mounted ? 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none',
              }}
            >
              {data.hero.subtitle}
            </p>

            {/* Description */}
            <p
              className="text-lg text-[#4A3B2C]/70 leading-relaxed mb-8"
              style={{
                fontFamily: "'DM Sans', -apple-system, sans-serif",
                opacity: 0,
                animation: mounted ? 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards' : 'none',
              }}
            >
              {data.hero.description}
            </p>

            {/* CTA Button */}
            <div
              style={{
                opacity: 0,
                animation: mounted ? 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' : 'none',
              }}
            >
              <button
                className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}dd)`,
                  fontFamily: "'DM Sans', -apple-system, sans-serif",
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative flex items-center gap-2">
                  {lang === 'ru' && 'Получить консультацию'}
                  {lang === 'en' && 'Get Consultation'}
                  {lang === 'ar' && 'احصل على استشارة'}
                  <MapPin size={18} />
                </span>
              </button>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={Award}
              value={data.stats.clinics}
              label={data.stats.clinicsLabel}
              delay={700}
              accentColor={config.accentColor}
            />
            <StatCard
              icon={TrendingUp}
              value={data.stats.success}
              label={data.stats.successLabel}
              delay={800}
              accentColor={config.accentColor}
            />
            <StatCard
              icon={Award}
              value={data.stats.experience}
              label={data.stats.experienceLabel}
              delay={900}
              accentColor={config.accentColor}
            />
            <StatCard
              icon={Users}
              value={data.stats.patients}
              label={data.stats.patientsLabel}
              delay={1000}
              accentColor={config.accentColor}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
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

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
