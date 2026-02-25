'use client';

import { useState, useEffect } from 'react';
import { Hotel, Car, Utensils, UserCheck, Languages, Clock } from 'lucide-react';

const countryConfig = {
  turkey: { accentColor: '#E30A17' },
  'south-korea': { accentColor: '#0047A0' },
  china: { accentColor: '#DE2910' },
};

const iconMap = {
  hotel: Hotel,
  transport: Car,
  food: Utensils,
  coordinator: UserCheck,
  translator: Languages,
  support: Clock,
};

function ServiceCard({ service, index, accentColor }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  const Icon = iconMap[service.icon] || Hotel;

  return (
    <div
      className="relative group"
      style={{
        opacity: 0,
        transform: 'scale(0.9)',
        animation: isVisible ? `scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none',
      }}
    >
      <div className="relative bg-white rounded-2xl p-6 border border-[#4A3B2C]/10 hover:border-[#4A3B2C]/20 transition-all duration-500 hover:shadow-xl h-full">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
          }}
        >
          <Icon size={24} strokeWidth={2} style={{ color: accentColor }} />
        </div>

        {/* Title */}
        <h4
          className="text-lg font-bold text-[#4A3B2C] mb-2"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {service.title}
        </h4>

        {/* Description */}
        <p
          className="text-sm text-[#4A3B2C]/70 leading-relaxed"
          style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
        >
          {service.description}
        </p>

        {/* Decorative corner */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${accentColor}10, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}

export default function CountryAccommodation({ dict, lang, country }) {
  const mounted = true;
  const config = countryConfig[country] || countryConfig.turkey;

  const servicesData = {
    turkey: [
      {
        icon: 'hotel',
        title: { ru: 'Комфортное проживание', en: 'Comfortable Accommodation', ar: 'إقامة مريحة' }[lang],
        description: { ru: 'Размещение в отелях 4-5* рядом с клиникой. Включены завтраки и трансфер.', en: 'Accommodation in 4-5* hotels near the clinic. Breakfast and transfer included.', ar: 'إقامة في فنادق 4-5 نجوم بالقرب من العيادة. الإفطار والنقل مشمول.' }[lang],
      },
      {
        icon: 'transport',
        title: { ru: 'Трансфер', en: 'Transfer', ar: 'النقل' }[lang],
        description: { ru: 'Встреча в аэропорту, доставка в отель и клинику на комфортном транспорте.', en: 'Airport pick-up, delivery to hotel and clinic by comfortable transport.', ar: 'الاستقبال في المطار، التوصيل إلى الفندق والعيادة بوسائل نقل مريحة.' }[lang],
      },
      {
        icon: 'food',
        title: { ru: 'Питание', en: 'Meals', ar: 'الوجبات' }[lang],
        description: { ru: 'Рекомендации ресторанов, доставка еды. Специальное меню при необходимости.', en: 'Restaurant recommendations, food delivery. Special menu if needed.', ar: 'توصيات المطاعم، توصيل الطعام. قائمة خاصة إذا لزم الأمر.' }[lang],
      },
      {
        icon: 'coordinator',
        title: { ru: 'Персональный координатор', en: 'Personal Coordinator', ar: 'منسق شخصي' }[lang],
        description: { ru: 'Русскоговорящий координатор сопровождает вас на всех этапах.', en: 'Russian-speaking coordinator accompanies you at all stages.', ar: 'منسق يتحدث الروسية يرافقك في جميع المراحل.' }[lang],
      },
      {
        icon: 'translator',
        title: { ru: 'Переводчик', en: 'Translator', ar: 'مترجم' }[lang],
        description: { ru: 'Профессиональный медицинский переводчик на всех консультациях.', en: 'Professional medical translator at all consultations.', ar: 'مترجم طبي محترف في جميع الاستشارات.' }[lang],
      },
      {
        icon: 'support',
        title: { ru: 'Поддержка 24/7', en: '24/7 Support', ar: 'دعم على مدار الساعة' }[lang],
        description: { ru: 'Круглосуточная связь с координатором для решения любых вопросов.', en: '24/7 contact with coordinator to solve any issues.', ar: 'اتصال على مدار الساعة مع المنسق لحل أي مشاكل.' }[lang],
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
        description: { ru: 'Помощь в выборе привычной еды, рекомендации ресторанов.', en: 'Help in choosing familiar food, restaurant recommendations.', ar: 'المساعدة في اختيار الطعام المألوف، توصيات المطاعم.' }[lang],
      },
      {
        icon: 'coordinator',
        title: { ru: 'Координатор', en: 'Coordinator', ar: 'منسق' }[lang],
        description: { ru: 'Сопровождение русскоговорящего специалиста.', en: 'Accompaniment of Russian-speaking specialist.', ar: 'مرافقة متخصص يتحدث الروسية.' }[lang],
      },
      {
        icon: 'translator',
        title: { ru: 'Перевод документов', en: 'Document Translation', ar: 'ترجمة الوثائق' }[lang],
        description: { ru: 'Перевод медицинских документов и сопровождение на приемах.', en: 'Translation of medical documents and accompaniment at appointments.', ar: 'ترجمة الوثائق الطبية والمرافقة في المواعيد.' }[lang],
      },
      {
        icon: 'support',
        title: { ru: 'Постоянная связь', en: 'Constant Contact', ar: 'اتصال دائم' }[lang],
        description: { ru: 'Всегда на связи для решения бытовых и медицинских вопросов.', en: 'Always in touch to solve everyday and medical issues.', ar: 'دائماً على اتصال لحل القضايا اليومية والطبية.' }[lang],
      },
    ],
  };

  const services = servicesData[country] || servicesData.turkey;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAF8F0] to-white" />

      {/* Decorative gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${config.accentColor}10, transparent 70%)`,
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
            {lang === 'ru' && 'Комфорт и забота'}
            {lang === 'en' && 'Comfort & Care'}
            {lang === 'ar' && 'الراحة والرعاية'}
          </h2>

          <p
            className="text-lg text-[#4A3B2C]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
          >
            {lang === 'ru' && 'Мы заботимся о вашем комфорте на всех этапах лечения'}
            {lang === 'en' && 'We take care of your comfort at every stage'}
            {lang === 'ar' && 'نحن نعتني براحتك في كل مرحلة'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              accentColor={config.accentColor}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 text-center"
          style={{
            opacity: 0,
            animation: mounted ? 'fadeInUp 1s ease-out 0.8s forwards' : 'none',
          }}
        >
          <div className="inline-flex flex-col items-center gap-3 px-8 py-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#4A3B2C]/10">
            <p
              className="text-[#4A3B2C]/70"
              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
            >
              {lang === 'ru' && 'Все услуги включены в стоимость пакета'}
              {lang === 'en' && 'All services included in package price'}
              {lang === 'ar' && 'جميع الخدمات مشمولة في سعر الباقة'}
            </p>
            <div
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                color: config.accentColor,
              }}
            >
              {lang === 'ru' && 'Никаких скрытых платежей'}
              {lang === 'en' && 'No Hidden Fees'}
              {lang === 'ar' && 'لا رسوم خفية'}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
