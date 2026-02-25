'use client';

import { useState, useEffect } from 'react';
import { Send, FileCheck, Calendar, Plane, Stethoscope, Home } from 'lucide-react';

const countryConfig = {
  turkey: { accentColor: '#E30A17' },
  'south-korea': { accentColor: '#0047A0' },
  china: { accentColor: '#DE2910' },
};

const iconMap = {
  request: Send,
  documents: FileCheck,
  planning: Calendar,
  arrival: Plane,
  treatment: Stethoscope,
  return: Home,
};

function ProcessStep({ step, index, isLast, accentColor, lang }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[step.icon] || Send;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="relative"
      style={{
        opacity: 0,
        transform: 'translateX(-30px)',
        animation: isVisible ? `slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-6">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          {/* Number badge */}
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
              transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)',
            }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-lg opacity-0 transition-opacity duration-500"
              style={{
                background: accentColor,
                opacity: isHovered ? 0.6 : 0,
              }}
            />

            {/* Icon */}
            <Icon
              size={24}
              strokeWidth={2.5}
              className="text-white relative z-10 transition-transform duration-500"
              style={{
                transform: isHovered ? 'rotate(-5deg)' : 'rotate(0deg)',
              }}
            />
          </div>

          {/* Connecting line */}
          {!isLast && (
            <div className="relative w-0.5 flex-1 mt-4 mb-4 min-h-[100px]">
              {/* Background line */}
              <div className="absolute inset-0 bg-[#4A3B2C]/10 rounded-full" />

              {/* Animated line */}
              <div
                className="absolute inset-0 rounded-full origin-top"
                style={{
                  background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}80)`,
                  transform: `scaleY(${isVisible ? 1 : 0})`,
                  transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${index * 0.2 + 0.5}s`,
                }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#4A3B2C]/10 hover:border-[#4A3B2C]/20 hover:bg-white/80 transition-all duration-500 hover:-translate-x-2 hover:shadow-lg">
            {/* Step number label */}
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{
                background: `${accentColor}15`,
                color: accentColor,
                fontFamily: "'DM Sans', -apple-system, sans-serif",
              }}
            >
              {lang === 'ru' && `Шаг ${index + 1}`}
              {lang === 'en' && `Step ${index + 1}`}
              {lang === 'ar' && `الخطوة ${index + 1}`}
            </div>

            {/* Title */}
            <h3
              className="text-xl font-bold text-[#4A3B2C] mb-2"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              className="text-[#4A3B2C]/70 leading-relaxed"
              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
            >
              {step.description}
            </p>

            {/* Timeline info */}
            {step.timeline && (
              <div
                className="mt-4 inline-flex items-center gap-2 text-sm"
                style={{
                  color: accentColor,
                  fontFamily: "'DM Sans', -apple-system, sans-serif",
                }}
              >
                <Calendar size={16} />
                <span>{step.timeline}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CountryProcess({ dict, lang, country }) {
  const mounted = true;
  const config = countryConfig[country] || countryConfig.turkey;

  const processSteps = [
    {
      icon: 'request',
      title: lang === 'ru' ? 'Заявка' : lang === 'en' ? 'Request' : 'الطلب',
      description: lang === 'ru' ? 'Отправьте заявку через сайт или свяжитесь с нами. Опишите вашу ситуацию и пожелания.' : lang === 'en' ? 'Submit a request via website or contact us. Describe your situation and preferences.' : 'أرسل طلبًا عبر الموقع أو اتصل بنا. صف حالتك وتفضيلاتك.',
      timeline: lang === 'ru' ? '1 день' : lang === 'en' ? '1 day' : 'يوم واحد',
    },
    {
      icon: 'documents',
      title: lang === 'ru' ? 'Анализ документов' : lang === 'en' ? 'Document Analysis' : 'تحليل المستندات',
      description: lang === 'ru' ? 'Наши врачи изучат ваши медицинские документы и подберут оптимальную клинику и программу лечения.' : lang === 'en' ? 'Our doctors will review your medical documents and select optimal clinic and treatment program.' : 'سيقوم أطباؤنا بمراجعة مستنداتك الطبية واختيار العيادة والبرنامج الأمثل.',
      timeline: lang === 'ru' ? '2-3 дня' : lang === 'en' ? '2-3 days' : '2-3 أيام',
    },
    {
      icon: 'planning',
      title: lang === 'ru' ? 'Планирование' : lang === 'en' ? 'Planning' : 'التخطيط',
      description: lang === 'ru' ? 'Согласуем даты, оформим визу, забронируем отель и билеты. Подготовим все необходимые документы.' : lang === 'en' ? 'Coordinate dates, arrange visa, book hotel and tickets. Prepare all necessary documents.' : 'تنسيق التواريخ، ترتيب التأشيرة، حجز الفندق والتذاكر. إعداد جميع المستندات الضرورية.',
      timeline: lang === 'ru' ? '7-14 дней' : lang === 'en' ? '7-14 days' : '7-14 يومًا',
    },
    {
      icon: 'arrival',
      title: lang === 'ru' ? 'Прибытие' : lang === 'en' ? 'Arrival' : 'الوصول',
      description: lang === 'ru' ? 'Встретим вас в аэропорту, разместим в отеле, проведем первичную консультацию в клинике.' : lang === 'en' ? 'Meet you at airport, accommodate in hotel, conduct initial consultation at clinic.' : 'نستقبلك في المطار، ونقيمك في الفندق، ونجري استشارة أولية في العيادة.',
      timeline: lang === 'ru' ? '1 день' : lang === 'en' ? '1 day' : 'يوم واحد',
    },
    {
      icon: 'treatment',
      title: lang === 'ru' ? 'Лечение' : lang === 'en' ? 'Treatment' : 'العلاج',
      description: lang === 'ru' ? 'Полное сопровождение на всех этапах лечения. Переводчик, координатор и поддержка 24/7.' : lang === 'en' ? 'Full support at all treatment stages. Translator, coordinator and 24/7 support.' : 'دعم كامل في جميع مراحل العلاج. مترجم، منسق ودعم على مدار الساعة.',
      timeline: lang === 'ru' ? 'По программе' : lang === 'en' ? 'As per program' : 'حسب البرنامج',
    },
    {
      icon: 'return',
      title: lang === 'ru' ? 'Возвращение домой' : lang === 'en' ? 'Return Home' : 'العودة إلى الوطن',
      description: lang === 'ru' ? 'Поддержка после возвращения, связь с врачами, контроль восстановления и ответы на вопросы.' : lang === 'en' ? 'Post-return support, doctor communication, recovery monitoring and answering questions.' : 'الدعم بعد العودة، التواصل مع الأطباء، مراقبة التعافي والإجابة على الأسئلة.',
      timeline: lang === 'ru' ? 'Постоянно' : lang === 'en' ? 'Ongoing' : 'مستمر',
    },
  ];
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F0] via-white to-[#FAF8F0]" />

      <div className="relative max-w-4xl mx-auto px-6">
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
            {lang === 'ru' && 'Как мы работаем'}
            {lang === 'en' && 'How We Work'}
            {lang === 'ar' && 'كيف نعمل'}
          </h2>

          <p
            className="text-lg text-[#4A3B2C]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
          >
            {lang === 'ru' && 'Простой и прозрачный процесс от заявки до возвращения домой'}
            {lang === 'en' && 'Simple and transparent process from request to return home'}
            {lang === 'ar' && 'عملية بسيطة وشفافة من الطلب إلى العودة إلى الوطن'}
          </p>
        </div>

        {/* Process Steps */}
        <div>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              step={step}
              index={index}
              isLast={index === processSteps.length - 1}
              accentColor={config.accentColor}
              lang={lang}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
