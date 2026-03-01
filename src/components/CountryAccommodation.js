'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hotel, Car, Utensils, UserCheck, Languages, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const countryConfig = {
  turkey: { accent: '#C06558' },
  'south-korea': { accent: '#4E7EA6' },
  china: { accent: '#9E4D4D' },
};

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', -apple-system, sans-serif";

const iconMap = {
  hotel: Hotel,
  transport: Car,
  food: Utensils,
  coordinator: UserCheck,
  translator: Languages,
  support: Clock,
};

function ServiceCard({ service, accentColor, index }) {
  const Icon = iconMap[service.icon] || Hotel;

  return (
    <div
      className="ca-card group relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 hover:bg-white/95 hover:-translate-y-1 transition-all duration-300 h-full"
      style={{ boxShadow: '0 2px 16px rgba(74,59,44,0.06), inset 0 1px 0 rgba(255,255,255,0.9)' }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)` }}
      >
        <Icon size={22} strokeWidth={2} style={{ color: accentColor }} />
      </div>

      {/* Title */}
      <h4
        className="text-lg font-semibold text-[#4A3B2C] mb-2"
        style={{ fontFamily: DISPLAY_FONT }}
      >
        {service.title}
      </h4>

      {/* Description */}
      <p
        className="text-sm text-[#4A3B2C]/60 leading-relaxed"
        style={{ fontFamily: BODY_FONT }}
      >
        {service.description}
      </p>

      {/* Hover corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}12, transparent 70%)`,
        }}
      />

      {/* Index number — subtle decorative */}
      <div
        className="absolute bottom-4 right-5 text-3xl font-bold text-[#4A3B2C]/04 select-none"
        style={{ fontFamily: DISPLAY_FONT }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}

export default function CountryAccommodation({ dict, lang, country }) {
  const sectionRef = useRef(null);
  const config = countryConfig[country] || countryConfig.turkey;

  const servicesData = {
    turkey: [
      {
        icon: 'hotel',
        title: { ru: 'Комфортное проживание', en: 'Comfortable Accommodation', ar: 'إقامة مريحة' }[lang],
        description: { ru: 'Размещение в отелях 4–5★ рядом с клиникой. Включены завтраки и трансфер.', en: 'Accommodation in 4–5★ hotels near the clinic. Breakfast and transfer included.', ar: 'إقامة في فنادق 4-5 نجوم بالقرب من العيادة. الإفطار والنقل مشمول.' }[lang],
      },
      {
        icon: 'transport',
        title: { ru: 'Трансфер', en: 'Transfer', ar: 'النقل' }[lang],
        description: { ru: 'Встреча в аэропорту, доставка в отель и клинику на комфортном транспорте.', en: 'Airport pick-up, delivery to hotel and clinic by comfortable transport.', ar: 'الاستقبال في المطار، التوصيل إلى الفندق والعيادة.' }[lang],
      },
      {
        icon: 'food',
        title: { ru: 'Питание', en: 'Meals', ar: 'الوجبات' }[lang],
        description: { ru: 'Рекомендации ресторанов, доставка еды. Специальное меню при необходимости.', en: 'Restaurant recommendations, food delivery. Special menu if needed.', ar: 'توصيات المطاعم، توصيل الطعام.' }[lang],
      },
      {
        icon: 'coordinator',
        title: { ru: 'Персональный координатор', en: 'Personal Coordinator', ar: 'منسق شخصي' }[lang],
        description: { ru: 'Русскоговорящий координатор сопровождает вас на всех этапах.', en: 'Russian-speaking coordinator accompanies you at all stages.', ar: 'منسق يرافقك في جميع المراحل.' }[lang],
      },
      {
        icon: 'translator',
        title: { ru: 'Переводчик', en: 'Translator', ar: 'مترجم' }[lang],
        description: { ru: 'Профессиональный медицинский переводчик на всех консультациях.', en: 'Professional medical translator at all consultations.', ar: 'مترجم طبي محترف في جميع الاستشارات.' }[lang],
      },
      {
        icon: 'support',
        title: { ru: 'Поддержка 24/7', en: '24/7 Support', ar: 'دعم على مدار الساعة' }[lang],
        description: { ru: 'Круглосуточная связь с координатором для решения любых вопросов.', en: '24/7 contact with coordinator to solve any issues.', ar: 'اتصال على مدار الساعة لحل أي مشاكل.' }[lang],
      },
    ],
    'south-korea': [
      {
        icon: 'hotel',
        title: { ru: 'Премиальные отели', en: 'Premium Hotels', ar: 'فنادق متميزة' }[lang],
        description: { ru: 'Проживание в отелях премиум-класса с высоким уровнем сервиса.', en: 'Stay in premium hotels with high level of service.', ar: 'الإقامة في فنادق متميزة مع مستوى عالٍ من الخدمة.' }[lang],
      },
      {
        icon: 'transport',
        title: { ru: 'VIP трансфер', en: 'VIP Transfer', ar: 'نقل VIP' }[lang],
        description: { ru: 'Комфортная доставка на премиальном транспорте с водителем.', en: 'Comfortable delivery by premium transport with driver.', ar: 'توصيل مريح بوسائل نقل متميزة مع سائق.' }[lang],
      },
      {
        icon: 'food',
        title: { ru: 'Гастрономия', en: 'Gastronomy', ar: 'فن الطهو' }[lang],
        description: { ru: 'Знакомство с корейской кухней и международные рестораны.', en: 'Introduction to Korean cuisine and international restaurants.', ar: 'التعرف على المطبخ الكوري والمطاعم العالمية.' }[lang],
      },
      {
        icon: 'coordinator',
        title: { ru: 'Личный менеджер', en: 'Personal Manager', ar: 'مدير شخصي' }[lang],
        description: { ru: 'Индивидуальный менеджер ведет ваш case от начала до конца.', en: 'Individual manager handles your case from start to finish.', ar: 'مدير فردي يتعامل مع حالتك من البداية إلى النهاية.' }[lang],
      },
      {
        icon: 'translator',
        title: { ru: 'Профессиональный перевод', en: 'Professional Translation', ar: 'ترجمة احترافية' }[lang],
        description: { ru: 'Медицинские переводчики с опытом работы в клиниках.', en: 'Medical translators with experience in clinics.', ar: 'مترجمون طبيون ذوو خبرة في العيادات.' }[lang],
      },
      {
        icon: 'support',
        title: { ru: 'Консьерж-сервис', en: 'Concierge Service', ar: 'خدمة الكونسيرج' }[lang],
        description: { ru: 'Помощь в организации досуга, экскурсий и шопинга.', en: 'Assistance in organizing leisure, excursions and shopping.', ar: 'المساعدة في تنظيم الترفيه والرحلات والتسوق.' }[lang],
      },
    ],
    china: [
      {
        icon: 'hotel',
        title: { ru: 'Удобное размещение', en: 'Convenient Accommodation', ar: 'إقامة مريحة' }[lang],
        description: { ru: 'Отели рядом с клиниками с русскоговорящим персоналом.', en: 'Hotels near clinics with Russian-speaking staff.', ar: 'فنادق بالقرب من العيادات مع موظفين يتحدثون الروسية.' }[lang],
      },
      {
        icon: 'transport',
        title: { ru: 'Организация транспорта', en: 'Transport Organization', ar: 'تنظيم النقل' }[lang],
        description: { ru: 'Трансфер, такси, помощь с общественным транспортом.', en: 'Transfer, taxi, public transport assistance.', ar: 'النقل، سيارة الأجرة، المساعدة في النقل العام.' }[lang],
      },
      {
        icon: 'food',
        title: { ru: 'Адаптация питания', en: 'Food Adaptation', ar: 'تكييف الطعام' }[lang],
        description: { ru: 'Помощь в выборе привычной еды, рекомендации ресторанов.', en: 'Help in choosing familiar food, restaurant recommendations.', ar: 'المساعدة في اختيار الطعام المألوف.' }[lang],
      },
      {
        icon: 'coordinator',
        title: { ru: 'Координатор', en: 'Coordinator', ar: 'منسق' }[lang],
        description: { ru: 'Сопровождение русскоговорящего специалиста.', en: 'Accompaniment of Russian-speaking specialist.', ar: 'مرافقة متخصص يتحدث الروسية.' }[lang],
      },
      {
        icon: 'translator',
        title: { ru: 'Перевод документов', en: 'Document Translation', ar: 'ترجمة الوثائق' }[lang],
        description: { ru: 'Перевод медицинских документов и сопровождение на приёмах.', en: 'Translation of medical documents and accompaniment at appointments.', ar: 'ترجمة الوثائق الطبية والمرافقة في المواعيد.' }[lang],
      },
      {
        icon: 'support',
        title: { ru: 'Постоянная связь', en: 'Constant Contact', ar: 'اتصال دائم' }[lang],
        description: { ru: 'Всегда на связи для решения бытовых и медицинских вопросов.', en: 'Always in touch to solve everyday and medical issues.', ar: 'دائماً على اتصال لحل القضايا اليومية والطبية.' }[lang],
      },
    ],
  };

  const services = servicesData[country] || servicesData.turkey;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ca-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        immediateRender: false,
      });
      gsap.from('.ca-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        immediateRender: false,
      });
      gsap.from('.ca-footer', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 40%', once: true },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#FEFBF6' }}>
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FEFBF6 0%, #FAF7EF 50%, #FEFBF6 100%)' }} />

      {/* Central soft orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${config.accent}18, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="ca-header text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white/60 backdrop-blur-sm mb-5"
            style={{ borderColor: `${config.accent}30` }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: config.accent }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: BODY_FONT, color: config.accent }}
            >
              {lang === 'ru' ? 'Сервис и комфорт' : lang === 'en' ? 'Service & Comfort' : 'الخدمة والراحة'}
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4A3B2C] mb-4 leading-tight"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {lang === 'ru' && 'Комфорт и забота'}
            {lang === 'en' && 'Comfort & Care'}
            {lang === 'ar' && 'الراحة والرعاية'}
          </h2>

          <p
            className="text-lg text-[#4A3B2C]/60 max-w-xl mx-auto"
            style={{ fontFamily: BODY_FONT }}
          >
            {lang === 'ru' && 'Мы заботимся о вашем комфорте на всех этапах лечения'}
            {lang === 'en' && 'We take care of your comfort at every stage of treatment'}
            {lang === 'ar' && 'نحن نعتني براحتك في كل مرحلة من مراحل العلاج'}
          </p>
        </div>

        {/* Services grid */}
        <div className="ca-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              accentColor={config.accent}
              index={index}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="ca-footer mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-8 py-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60" style={{ boxShadow: '0 4px 24px rgba(74,59,44,0.07), inset 0 1px 0 rgba(255,255,255,0.9)' }}>
            <span
              className="text-[#4A3B2C]/55 text-sm"
              style={{ fontFamily: BODY_FONT }}
            >
              {lang === 'ru' && 'Все услуги включены в стоимость пакета'}
              {lang === 'en' && 'All services included in package price'}
              {lang === 'ar' && 'جميع الخدمات مشمولة في سعر الباقة'}
            </span>
            <span className="hidden sm:block text-[#4A3B2C]/20">·</span>
            <span
              className="text-xl font-semibold"
              style={{ fontFamily: DISPLAY_FONT, color: config.accent }}
            >
              {lang === 'ru' && 'Никаких скрытых платежей'}
              {lang === 'en' && 'No Hidden Fees'}
              {lang === 'ar' && 'لا رسوم خفية'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
