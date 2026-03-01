'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Award, Users, TrendingUp, Stethoscope, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin();
}

// Harmonized accent colors — muted to complement the warm teal palette
const countryConfig = {
  turkey: {
    accent: '#C06558',
    flag: '🇹🇷',
  },
  'south-korea': {
    accent: '#4E7EA6',
    flag: '🇰🇷',
  },
  china: {
    accent: '#9E4D4D',
    flag: '🇨🇳',
  },
};

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', -apple-system, sans-serif";

export default function CountryHero({ dict, lang, country }) {
  const heroRef = useRef(null);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set natural state first so GSAP captures opacity:1 as the target
      gsap.set(['.ch-badge', '.ch-title', '.ch-sub', '.ch-desc', '.ch-cta', '.ch-visual-panel'], { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      // Left column — sequential stagger
      tl.from('.ch-badge',  { opacity: 0, y: 20, duration: 0.75 })
        .from('.ch-title',  { opacity: 0, y: 44, duration: 1.0  }, '-=0.45')
        .from('.ch-sub',    { opacity: 0, y: 20, duration: 0.8  }, '-=0.55')
        .from('.ch-desc',   { opacity: 0, y: 18, duration: 0.7  }, '-=0.45')
        .from('.ch-cta',    { opacity: 0, y: 16, duration: 0.65 }, '-=0.35')
        // Right panel — animate as ONE unit (no children animated separately)
        .from('.ch-visual-panel', { opacity: 0, x: 36, duration: 1.0 }, '-=1.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Award, value: data.stats.clinics, label: data.stats.clinicsLabel },
    { icon: TrendingUp, value: data.stats.success, label: data.stats.successLabel },
    { icon: Stethoscope, value: data.stats.experience, label: data.stats.experienceLabel },
    { icon: Users, value: data.stats.patients, label: data.stats.patientsLabel },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      {/* Decorative layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        {/* Teal brand orb — top right */}
        <div
          className="absolute"
          style={{
            top: '-140px', right: '-160px',
            width: '700px', height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(95,168,163,0.15) 0%, rgba(95,168,163,0.05) 60%, transparent 100%)',
            filter: 'blur(64px)',
          }}
        />
        {/* Country accent orb — bottom left */}
        <div
          className="absolute"
          style={{
            bottom: '-160px', left: '-180px',
            width: '780px', height: '780px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${config.accent}22 0%, ${config.accent}08 60%, transparent 100%)`,
            filter: 'blur(72px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text content */}
          <div>
            {/* Badge */}
            <div
              className="ch-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#4A3B2C]/10 mb-8 shadow-sm"
            >
              <span className="text-xl">{config.flag}</span>
              <span
                className="text-[13px] font-semibold tracking-wide"
                style={{ fontFamily: BODY_FONT, color: config.accent }}
              >
                {data.name}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: config.accent }}
              />
            </div>

            {/* Title */}
            <h1
              className="ch-title text-[2.6rem] md:text-[3.25rem] lg:text-[3.75rem] font-semibold leading-[1.1] tracking-tight text-[#4A3B2C] mb-5"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              {data.hero.title}
            </h1>

            {/* Subtitle */}
            <p
              className="ch-sub text-xl md:text-2xl mb-5 leading-snug"
              style={{ fontFamily: DISPLAY_FONT, color: config.accent }}
            >
              {data.hero.subtitle}
            </p>

            {/* Description */}
            <p
              className="ch-desc text-base text-[#4A3B2C]/65 leading-relaxed mb-9 max-w-[500px]"
              style={{ fontFamily: BODY_FONT }}
            >
              {data.hero.description}
            </p>

            {/* CTA buttons */}
            <div className="ch-cta flex items-center gap-4 flex-wrap">
              <button
                className="group relative px-7 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #1a3a38, #2C5F5D)',
                  fontFamily: BODY_FONT,
                  boxShadow: '0 6px 24px rgba(44,95,93,0.28)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  {lang === 'ru' && 'Получить консультацию'}
                  {lang === 'en' && 'Get Consultation'}
                  {lang === 'ar' && 'احصل على استشارة'}
                  <ChevronRight size={16} />
                </span>
              </button>

              <button
                className="px-6 py-3.5 rounded-xl font-medium text-[#4A3B2C] border border-[#4A3B2C]/15 bg-white/50 hover:bg-white/80 transition-all duration-300 text-sm"
                style={{ fontFamily: BODY_FONT }}
              >
                {lang === 'ru' && 'Узнать больше'}
                {lang === 'en' && 'Learn More'}
                {lang === 'ar' && 'اعرف المزيد'}
              </button>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="ch-visual-panel relative">
            {/* Main card */}
            <div
              className="relative rounded-3xl overflow-hidden border border-white/50"
              style={{
                background: `linear-gradient(150deg, ${config.accent}0A 0%, ${config.accent}05 45%, rgba(95,168,163,0.07) 100%)`,
                boxShadow: '0 8px 48px rgba(74,59,44,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
              }}
            >
              {/* Top area — flag + country name */}
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-6xl leading-none">{config.flag}</span>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-[0.18em] text-[#4A3B2C]/40 mb-1"
                      style={{ fontFamily: BODY_FONT }}
                    >
                      {lang === 'ru' ? 'Медицинский туризм' : lang === 'en' ? 'Medical Tourism' : 'السياحة الطبية'}
                    </div>
                    <div
                      className="text-2xl font-semibold text-[#4A3B2C]"
                      style={{ fontFamily: DISPLAY_FONT }}
                    >
                      {data.name}
                    </div>
                  </div>
                </div>
                {/* Accent divider */}
                <div
                  className="h-px"
                  style={{
                    background: `linear-gradient(to right, ${config.accent}45, ${config.accent}15, transparent)`,
                  }}
                />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 px-6 pb-8 pt-4">
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={i}
                    className="group relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 hover:bg-white/95 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ boxShadow: '0 2px 16px rgba(74,59,44,0.07), inset 0 1px 0 rgba(255,255,255,0.9)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${config.accent}18` }}
                    >
                      <Icon size={18} strokeWidth={2} style={{ color: config.accent }} />
                    </div>
                    <div
                      className="text-2xl font-bold text-[#4A3B2C] leading-none mb-1"
                      style={{ fontFamily: DISPLAY_FONT }}
                    >
                      {value}
                    </div>
                    <div
                      className="text-xs text-[#4A3B2C]/50 leading-tight"
                      style={{ fontFamily: BODY_FONT }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating TrustMedX partner badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 border border-white/70" style={{ boxShadow: '0 8px 32px rgba(74,59,44,0.12), inset 0 1px 0 rgba(255,255,255,1)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1a3a38, #2C5F5D)' }}
                >
                  <span
                    className="text-white text-xs font-bold"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    T
                  </span>
                </div>
                <div>
                  <div
                    className="text-[10px] text-[#4A3B2C]/45 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    TrustMedX
                  </div>
                  <div
                    className="text-xs font-semibold text-[#4A3B2C]"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    {lang === 'ru' ? 'Официальный партнёр' : lang === 'en' ? 'Official Partner' : 'شريك رسمي'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
