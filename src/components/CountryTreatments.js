'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, TrendingDown, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const countryConfig = {
  turkey: { accent: '#D4836C', lightAccent: '#E8A090' },
  'south-korea': { accent: '#7BAAC8', lightAccent: '#A3C4DC' },
  china: { accent: '#C47070', lightAccent: '#DC9898' },
};

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', -apple-system, sans-serif";

function TreatmentCard({ treatment, accentColor, lightAccent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="ct-card relative group rounded-2xl overflow-hidden border transition-all duration-400 hover:-translate-y-1.5"
      style={{
        background: 'rgba(255,255,255,0.06)',
        borderColor: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.12)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />

      <div className="p-7">
        {/* Name */}
        <h3
          className="text-xl font-semibold text-white/90 mb-2 leading-snug"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          {treatment.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-white/50 mb-6 leading-relaxed"
          style={{ fontFamily: BODY_FONT }}
        >
          {treatment.description}
        </p>

        {/* Duration + Price row */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${accentColor}20` }}
            >
              <Clock size={15} style={{ color: accentColor }} />
            </div>
            <div>
              <div className="text-[10px] text-white/35 uppercase tracking-wider mb-0.5" style={{ fontFamily: BODY_FONT }}>
                {treatment.durationLabel}
              </div>
              <div className="text-sm font-medium text-white/75" style={{ fontFamily: BODY_FONT }}>
                {treatment.duration}
              </div>
            </div>
          </div>

          <div className="w-px h-8 bg-white/10 flex-shrink-0" />

          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${accentColor}20` }}
            >
              <TrendingDown size={15} style={{ color: accentColor }} />
            </div>
            <div>
              <div className="text-[10px] text-white/35 uppercase tracking-wider mb-0.5" style={{ fontFamily: BODY_FONT }}>
                {treatment.priceLabel}
              </div>
              <div
                className="text-sm font-semibold"
                style={{ fontFamily: BODY_FONT, color: lightAccent }}
              >
                {treatment.price}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        {treatment.features && treatment.features.length > 0 && (
          <div className="space-y-1.5">
            {treatment.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle size={13} style={{ color: accentColor }} className="flex-shrink-0" />
                <span
                  className="text-xs text-white/45"
                  style={{ fontFamily: BODY_FONT }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(to top, ${accentColor}18, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
}

export default function CountryTreatments({ dict, lang, country }) {
  const sectionRef = useRef(null);
  const config = countryConfig[country] || countryConfig.turkey;

  const t = (key) => {
    const translations = {
      duration: { ru: 'Длительность', en: 'Duration', ar: 'المدة' },
      from: { ru: 'От', en: 'From', ar: 'من' },
      days: { ru: 'дней', en: 'days', ar: 'أيام' },
      day: { ru: 'день', en: 'day', ar: 'يوم' },
    };
    return translations[key]?.[lang] || translations[key]?.ru || key;
  };

  const treatmentsData = {
    turkey: [
      {
        name: { ru: 'Пластическая хирургия', en: 'Plastic Surgery', ar: 'الجراحة التجميلية' }[lang],
        description: { ru: 'Ринопластика, маммопластика, липосакция и другие процедуры от ведущих хирургов', en: 'Rhinoplasty, mammoplasty, liposuction and other procedures from leading surgeons', ar: 'تجميل الأنف، تجميل الثدي، شفط الدهون وإجراءات أخرى' }[lang],
        duration: `5–10 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$2,500',
        priceLabel: t('from'),
        features: [
          { ru: 'Консультация хирурга', en: 'Surgeon consultation', ar: 'استشارة الجراح' }[lang],
          { ru: 'Все анализы включены', en: 'All tests included', ar: 'جميع التحاليل مشمولة' }[lang],
          { ru: 'Реабилитация', en: 'Rehabilitation', ar: 'إعادة التأهيل' }[lang],
        ],
      },
      {
        name: { ru: 'Стоматология', en: 'Dentistry', ar: 'طب الأسنان' }[lang],
        description: { ru: 'Имплантация, виниры, голливудская улыбка с использованием премиальных материалов', en: 'Implants, veneers, Hollywood smile with premium materials', ar: 'زراعة الأسنان، الفينير، ابتسامة هوليوود بمواد متميزة' }[lang],
        duration: `3–7 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$300',
        priceLabel: t('from'),
        features: [
          { ru: '3D сканирование', en: '3D scanning', ar: 'مسح ثلاثي الأبعاد' }[lang],
          { ru: 'Гарантия качества', en: 'Quality guarantee', ar: 'ضمان الجودة' }[lang],
          { ru: 'Все материалы премиум', en: 'All premium materials', ar: 'جميع المواد متميزة' }[lang],
        ],
      },
      {
        name: { ru: 'Трансплантация волос', en: 'Hair Transplant', ar: 'زراعة الشعر' }[lang],
        description: { ru: 'Методики FUE и DHI с гарантией результата от 12 месяцев', en: 'FUE and DHI methods with 12-month result guarantee', ar: 'طرق FUE و DHI مع ضمان نتيجة لمدة 12 شهراً' }[lang],
        duration: `3–5 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$1,800',
        priceLabel: t('from'),
        features: [
          { ru: 'До 5000 графтов', en: 'Up to 5000 grafts', ar: 'حتى 5000 طعم' }[lang],
          { ru: 'Безболезненно', en: 'Painless', ar: 'بدون ألم' }[lang],
          { ru: 'Естественный результат', en: 'Natural result', ar: 'نتيجة طبيعية' }[lang],
        ],
      },
      {
        name: { ru: 'Кардиология', en: 'Cardiology', ar: 'أمراض القلب' }[lang],
        description: { ru: 'Диагностика и лечение сердечно-сосудистых заболеваний', en: 'Diagnosis and treatment of cardiovascular diseases', ar: 'تشخيص وعلاج أمراض القلب والأوعية الدموية' }[lang],
        duration: `7–14 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$5,000',
        priceLabel: t('from'),
        features: [
          { ru: 'Полная диагностика', en: 'Complete diagnosis', ar: 'تشخيص كامل' }[lang],
          { ru: 'Опытные кардиологи', en: 'Experienced cardiologists', ar: 'أطباء قلب ذوو خبرة' }[lang],
          { ru: 'Современное оборудование', en: 'Modern equipment', ar: 'معدات حديثة' }[lang],
        ],
      },
      {
        name: { ru: 'Онкология', en: 'Oncology', ar: 'علم الأورام' }[lang],
        description: { ru: 'Комплексное лечение онкологических заболеваний', en: 'Comprehensive treatment of oncological diseases', ar: 'علاج شامل للأمراض السرطانية' }[lang],
        duration: `14–30 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$8,000',
        priceLabel: t('from'),
        features: [
          { ru: 'Индивидуальный план', en: 'Individual plan', ar: 'خطة فردية' }[lang],
          { ru: 'Новейшие методики', en: 'Latest methods', ar: 'أحدث الأساليب' }[lang],
          { ru: 'Поддержка 24/7', en: '24/7 support', ar: 'دعم على مدار الساعة' }[lang],
        ],
      },
      {
        name: { ru: 'Ортопедия', en: 'Orthopedics', ar: 'جراحة العظام' }[lang],
        description: { ru: 'Эндопротезирование суставов и лечение опорно-двигательного аппарата', en: 'Joint replacement and musculoskeletal treatment', ar: 'استبدال المفاصل وعلاج الجهاز العضلي الهيكلي' }[lang],
        duration: `10–21 ${t('day')}`,
        durationLabel: t('duration'),
        price: '$6,500',
        priceLabel: t('from'),
        features: [
          { ru: 'Современные протезы', en: 'Modern prosthetics', ar: 'أطراف صناعية حديثة' }[lang],
          { ru: 'Быстрая реабилитация', en: 'Fast rehabilitation', ar: 'إعادة تأهيل سريعة' }[lang],
          { ru: 'Опытные хирурги', en: 'Experienced surgeons', ar: 'جراحون ذوو خبرة' }[lang],
        ],
      },
    ],
    'south-korea': [
      {
        name: { ru: 'Пластическая хирургия', en: 'Plastic Surgery', ar: 'الجراحة التجميلية' }[lang],
        description: { ru: 'Передовые методики контурной пластики лица и тела', en: 'Advanced facial and body contouring techniques', ar: 'تقنيات متقدمة لنحت الوجه والجسم' }[lang],
        duration: `7–14 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$3,500',
        priceLabel: t('from'),
        features: [
          { ru: 'V-line коррекция', en: 'V-line correction', ar: 'تصحيح خط V' }[lang],
          { ru: 'Минимальная инвазивность', en: 'Minimal invasiveness', ar: 'الحد الأدنى من التدخل الجراحي' }[lang],
          { ru: 'Быстрое восстановление', en: 'Fast recovery', ar: 'تعافي سريع' }[lang],
        ],
      },
      {
        name: { ru: 'Косметология', en: 'Cosmetology', ar: 'التجميل' }[lang],
        description: { ru: 'Инновационные процедуры anti-age и омоложения', en: 'Innovative anti-age and rejuvenation procedures', ar: 'إجراءات مبتكرة لمكافحة الشيخوخة والتجديد' }[lang],
        duration: `3–7 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$500',
        priceLabel: t('from'),
        features: [
          { ru: 'Лазерные технологии', en: 'Laser technologies', ar: 'تقنيات الليزر' }[lang],
          { ru: 'Уникальные методики', en: 'Unique methods', ar: 'طرق فريدة' }[lang],
          { ru: 'Долгий эффект', en: 'Long-lasting effect', ar: 'تأثير طويل الأمد' }[lang],
        ],
      },
      {
        name: { ru: 'Онкология', en: 'Oncology', ar: 'علم الأورام' }[lang],
        description: { ru: 'Роботизированная хирургия и таргетная терапия', en: 'Robotic surgery and targeted therapy', ar: 'الجراحة الروبوتية والعلاج المستهدف' }[lang],
        duration: `14–30 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$12,000',
        priceLabel: t('from'),
        features: [
          { ru: 'Робот Da Vinci', en: 'Da Vinci robot', ar: 'روبوت دافنشي' }[lang],
          { ru: 'Точная диагностика', en: 'Precise diagnosis', ar: 'تشخيص دقيق' }[lang],
          { ru: 'Персональный подход', en: 'Personal approach', ar: 'نهج شخصي' }[lang],
        ],
      },
      {
        name: { ru: 'Кардиохирургия', en: 'Cardiac Surgery', ar: 'جراحة القلب' }[lang],
        description: { ru: 'Малоинвазивные операции на сердце', en: 'Minimally invasive heart surgery', ar: 'جراحة القلب بالمنظار' }[lang],
        duration: `10–20 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$15,000',
        priceLabel: t('from'),
        features: [
          { ru: 'Минимальные разрезы', en: 'Minimal incisions', ar: 'شقوق صغيرة' }[lang],
          { ru: 'Быстрое восстановление', en: 'Fast recovery', ar: 'تعافي سريع' }[lang],
          { ru: 'Высокая точность', en: 'High precision', ar: 'دقة عالية' }[lang],
        ],
      },
      {
        name: { ru: 'Стоматология', en: 'Dentistry', ar: 'طب الأسنان' }[lang],
        description: { ru: 'Цифровая стоматология и имплантация', en: 'Digital dentistry and implantation', ar: 'طب الأسنان الرقمي والزرع' }[lang],
        duration: `5–10 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$800',
        priceLabel: t('from'),
        features: [
          { ru: '3D моделирование', en: '3D modeling', ar: 'نمذجة ثلاثية الأبعاد' }[lang],
          { ru: 'Безболезненно', en: 'Painless', ar: 'بدون ألم' }[lang],
          { ru: 'Пожизненная гарантия', en: 'Lifetime warranty', ar: 'ضمان مدى الحياة' }[lang],
        ],
      },
      {
        name: { ru: 'Диагностика Check-up', en: 'Check-up Diagnostics', ar: 'تشخيص شامل' }[lang],
        description: { ru: 'Комплексное обследование организма за 1–2 дня', en: 'Comprehensive body examination in 1–2 days', ar: 'فحص شامل للجسم في 1-2 يوم' }[lang],
        duration: `1–2 ${t('day')}`,
        durationLabel: t('duration'),
        price: '$1,200',
        priceLabel: t('from'),
        features: [
          { ru: '200+ параметров', en: '200+ parameters', ar: 'أكثر من 200 معيار' }[lang],
          { ru: 'Полный отчет', en: 'Full report', ar: 'تقرير كامل' }[lang],
          { ru: 'Рекомендации врачей', en: 'Doctor recommendations', ar: 'توصيات الأطباء' }[lang],
        ],
      },
    ],
    china: [
      {
        name: { ru: 'Традиционная медицина', en: 'Traditional Medicine', ar: 'الطب التقليدي' }[lang],
        description: { ru: 'Акупунктура, траволечение, массаж Туина', en: 'Acupuncture, herbal medicine, Tuina massage', ar: 'الوخز بالإبر، الأعشاب الطبية، تدليك توينا' }[lang],
        duration: `10–21 ${t('day')}`,
        durationLabel: t('duration'),
        price: '$800',
        priceLabel: t('from'),
        features: [
          { ru: 'Древние методики', en: 'Ancient methods', ar: 'طرق قديمة' }[lang],
          { ru: 'Индивидуальный подход', en: 'Individual approach', ar: 'نهج فردي' }[lang],
          { ru: 'Натуральные препараты', en: 'Natural remedies', ar: 'علاجات طبيعية' }[lang],
        ],
      },
      {
        name: { ru: 'Неврология', en: 'Neurology', ar: 'طب الأعصاب' }[lang],
        description: { ru: 'Лечение заболеваний нервной системы методами ТКМ и западной медицины', en: 'Treatment of nervous system diseases with TCM and Western medicine', ar: 'علاج أمراض الجهاز العصبي بالطب الصيني التقليدي والطب الغربي' }[lang],
        duration: `14–30 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$2,500',
        priceLabel: t('from'),
        features: [
          { ru: 'Комплексный подход', en: 'Comprehensive approach', ar: 'نهج شامل' }[lang],
          { ru: 'Реабилитация', en: 'Rehabilitation', ar: 'إعادة التأهيل' }[lang],
          { ru: 'Долгий эффект', en: 'Long-lasting effect', ar: 'تأثير طويل الأمد' }[lang],
        ],
      },
      {
        name: { ru: 'Ортопедия', en: 'Orthopedics', ar: 'جراحة العظام' }[lang],
        description: { ru: 'Лечение суставов и позвоночника с применением ТКМ', en: 'Treatment of joints and spine with TCM application', ar: 'علاج المفاصل والعمود الفقري بتطبيق الطب الصيني التقليدي' }[lang],
        duration: `14–28 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$3,000',
        priceLabel: t('from'),
        features: [
          { ru: 'Безоперационные методы', en: 'Non-surgical methods', ar: 'طرق غير جراحية' }[lang],
          { ru: 'Акупунктура', en: 'Acupuncture', ar: 'الوخز بالإبر' }[lang],
          { ru: 'Травяные компрессы', en: 'Herbal compresses', ar: 'كمادات عشبية' }[lang],
        ],
      },
      {
        name: { ru: 'Онкология', en: 'Oncology', ar: 'علم الأورام' }[lang],
        description: { ru: 'Интегративный подход к лечению рака', en: 'Integrative approach to cancer treatment', ar: 'نهج متكامل لعلاج السرطان' }[lang],
        duration: `21–60 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$10,000',
        priceLabel: t('from'),
        features: [
          { ru: 'ТКМ + западная медицина', en: 'TCM + Western medicine', ar: 'الطب الصيني التقليدي + الطب الغربي' }[lang],
          { ru: 'Снижение побочных эффектов', en: 'Reduced side effects', ar: 'تقليل الآثار الجانبية' }[lang],
          { ru: 'Укрепление иммунитета', en: 'Immune boost', ar: 'تعزيز المناعة' }[lang],
        ],
      },
      {
        name: { ru: 'Дерматология', en: 'Dermatology', ar: 'الأمراض الجلدية' }[lang],
        description: { ru: 'Лечение кожных заболеваний натуральными методами', en: 'Treatment of skin diseases with natural methods', ar: 'علاج الأمراض الجلدية بطرق طبيعية' }[lang],
        duration: `7–21 ${t('day')}`,
        durationLabel: t('duration'),
        price: '$1,500',
        priceLabel: t('from'),
        features: [
          { ru: 'Травяные препараты', en: 'Herbal remedies', ar: 'علاجات عشبية' }[lang],
          { ru: 'Акупунктура', en: 'Acupuncture', ar: 'الوخز بالإبر' }[lang],
          { ru: 'Массаж', en: 'Massage', ar: 'تدليك' }[lang],
        ],
      },
      {
        name: { ru: 'Гастроэнтерология', en: 'Gastroenterology', ar: 'أمراض الجهاز الهضمي' }[lang],
        description: { ru: 'Лечение ЖКТ методами традиционной и современной медицины', en: 'Treatment of GI tract with traditional and modern medicine', ar: 'علاج الجهاز الهضمي بالطب التقليدي والحديث' }[lang],
        duration: `14–30 ${t('days')}`,
        durationLabel: t('duration'),
        price: '$2,000',
        priceLabel: t('from'),
        features: [
          { ru: 'Фитотерапия', en: 'Phytotherapy', ar: 'العلاج بالأعشاب' }[lang],
          { ru: 'Диетотерапия', en: 'Diet therapy', ar: 'العلاج بالنظام الغذائي' }[lang],
          { ru: 'Современная диагностика', en: 'Modern diagnostics', ar: 'تشخيص حديث' }[lang],
        ],
      },
    ],
  };

  const treatments = treatmentsData[country] || treatmentsData.turkey;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        immediateRender: false,
      });
      gsap.from('.ct-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 50%, #2a4a47 100%)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Country accent orb */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${config.accent}60, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="ct-header text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white/08 backdrop-blur-sm mb-5"
            style={{ borderColor: `${config.accent}45` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.accent }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: BODY_FONT, color: config.lightAccent }}
            >
              {lang === 'ru' ? 'Направления лечения' : lang === 'en' ? 'Treatment Options' : 'خيارات العلاج'}
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90 mb-4 leading-tight"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {lang === 'ru' && 'Популярные направления лечения'}
            {lang === 'en' && 'Popular Treatment Options'}
            {lang === 'ar' && 'خيارات العلاج الشائعة'}
          </h2>

          <p
            className="text-lg text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: BODY_FONT }}
          >
            {lang === 'ru' && 'Широкий спектр медицинских услуг с прозрачным ценообразованием'}
            {lang === 'en' && 'Wide range of medical services with transparent pricing'}
            {lang === 'ar' && 'مجموعة واسعة من الخدمات الطبية بأسعار شفافة'}
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="ct-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {treatments.map((treatment, index) => (
            <TreatmentCard
              key={index}
              treatment={treatment}
              accentColor={config.accent}
              lightAccent={config.lightAccent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
