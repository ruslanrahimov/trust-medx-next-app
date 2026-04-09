'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LEVELS = [
  { label: 'Старт', color: '#5FA8A3', range: [0, 1] },
  { label: 'Развитие', color: '#D4A574', range: [2, 3] },
  { label: 'Экспертиза', color: '#2C5F5D', range: [4, 5] },
];

const MODULES = [
  {
    num: '01',
    title: 'Основы медицинского туризма',
    subtitle: 'Foundation',
    level: 'Старт',
    color: '#5FA8A3',
    colorBg: 'rgba(95,168,163,0.09)',
    items: [
      'Структура рынка и роль агента',
      'Этапы сопровождения пациента',
      'Этические и юридические принципы',
    ],
    result: 'Базовое понимание индустрии и шаблоны документов',
    image: '/medtour_entry_prog.png',
    imageDesc:
      'Агент изучает карту медицинского туризма — ноутбук с данными о клиниках, брошюры с маршрутами лечения, уютный рабочий стол',
  },
  {
    num: '02',
    title: 'Работа с пациентами и партнёрами',
    subtitle: 'Patient & Partner Management',
    level: 'Старт',
    color: '#D4A574',
    colorBg: 'rgba(212,165,116,0.09)',
    items: [
      'Консультации и выявление потребностей',
      'Подбор клиники и врача',
      'Работа с возражениями и доверие',
      'Финансовые модели и отчётность',
    ],
    result: 'Реальные сценарии общения и готовые скрипты',
    image: '/agent_pacients_partners.png',
    imageDesc:
      'Видеозвонок консультанта с пациентом — экран ноутбука с профилем клиники Стамбула, блокнот с заметками, тёплый домашний офис',
  },
  {
    num: '03',
    title: 'Маркетинг и продвижение',
    subtitle: 'Marketing & Personal Brand',
    level: 'Развитие',
    color: '#7EBDB8',
    colorBg: 'rgba(126,189,184,0.09)',
    items: [
      'Создание личного бренда',
      'Работа с соцсетями (Instagram, Telegram, TikTok)',
      'Контент и сторителлинг',
      'Репутация и отзывы',
    ],
    result: 'Шаблоны и стратегии от TrustMedX',
    image: '/agent_marketing_and _media.png',
    imageDesc:
      'Смартфон с открытым Instagram — профиль агента медицинского туризма, визуальная лента с фото клиник и отзывами пациентов',
  },
  {
    num: '04',
    title: 'Юридические и организационные вопросы',
    subtitle: 'Legal & Compliance',
    level: 'Развитие',
    color: '#C89563',
    colorBg: 'rgba(200,149,99,0.09)',
    items: [
      'Агентские соглашения и договоры',
      'Ответственность, конфиденциальность, налоги',
      'GDPR и защита данных',
    ],
    result: 'Шаблоны документов и чек-листы',
    image: '/agent-license.png',
    imageDesc:
      'Стопка юридических документов и ноутбук с открытым шаблоном агентского договора — строгий деловой стол, ручка, чек-лист',
  },
  {
    num: '05',
    title: 'Управление сетью агентов',
    subtitle: 'Advanced: Agency Network',
    level: 'Экспертиза',
    color: '#2C5F5D',
    colorBg: 'rgba(44,95,93,0.09)',
    items: [
      'Франчайзинговая модель',
      'Команда и мотивация',
      'CRM, аналитика, стандарты обслуживания',
    ],
    result: 'Индивидуальная разработка стратегии агентства',
    image: '/agents_network.png',
    imageDesc:
      'CRM дашборд на большом мониторе — карта сети агентов по городам, воронка продаж, статистика обращений пациентов',
  },
  {
    num: '06',
    title: 'Комбинированные программы',
    subtitle: 'Online + On-site',
    level: 'Экспертиза',
    color: '#967259',
    colorBg: 'rgba(150,114,89,0.09)',
    items: [
      'Онлайн-вебинары и очные тренинги',
      'Обучающие туры с посещением клиник',
      'Мастер-классы от руководителей TrustMedX',
    ],
    result: 'Сертификат по завершении курса',
    hasCert: true,
    image: '/agents_group.png',
    imageDesc:
      'Группа из 8–10 агентов-стажёров на экскурсии в клинику Стамбула — встреча с главным врачом, дружелюбная профессиональная атмосфера',
  },
];

function CheckIcon({ color }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill={color} fillOpacity="0.14" />
      <path
        d="M5 8l2 2 4-4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModuleCard({ mod, index, cardRef }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="group relative flex overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: 'white',
        border: `1px solid ${hovered ? mod.color + '38' : 'rgba(74,59,44,0.08)'}`,
        boxShadow: hovered
          ? `0 18px 52px ${mod.color}1E, 0 4px 16px rgba(74,59,44,0.06)`
          : '0 4px 20px rgba(74,59,44,0.06)',
        transform: hovered ? 'translateY(-5px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="w-1 flex-shrink-0 self-stretch rounded-l-2xl transition-all duration-500"
        style={{
          background: `linear-gradient(180deg, ${mod.color} 0%, ${mod.color}55 100%)`,
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Top row: module number + level badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="text-4xl font-black leading-none select-none"
            style={{
              fontFamily: "'Fraunces', serif",
              color: mod.color,
              opacity: hovered ? 0.30 : 0.18,
              transition: 'opacity 0.4s',
            }}
          >
            {mod.num}
          </div>
          <div
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{
              background: mod.colorBg,
              color: mod.color,
              fontFamily: "'DM Sans', sans-serif",
              border: `1px solid ${mod.color}22`,
            }}
          >
            {mod.level}
          </div>
        </div>

        {/* Image */}
        <div
          className="relative w-full mb-4 overflow-hidden rounded-xl"
          style={{ height: '120px' }}
        >
          {mod.image ? (
            <>
              <Image
                src={mod.image}
                alt={mod.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${mod.color}50 0%, transparent 55%)` }}
              />
            </>
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${mod.colorBg} 0%, ${mod.color}14 100%)` }}
              />
              <div
                className="absolute inset-0 opacity-[0.055]"
                style={{
                  backgroundImage: `radial-gradient(circle, ${mod.color} 1px, transparent 1px)`,
                  backgroundSize: '18px 18px',
                }}
              />
            </>
          )}
        </div>

        {/* Subtitle */}
        <div
          className="text-xs font-semibold uppercase tracking-[0.14em] mb-1.5"
          style={{ color: mod.color, fontFamily: "'DM Sans', sans-serif" }}
        >
          {mod.subtitle}
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-[#4A3B2C] mb-3.5 leading-snug"
          style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
        >
          {mod.title}
        </h3>

        {/* Items */}
        <ul className="space-y-2 flex-1">
          {mod.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckIcon color={mod.color} />
              <span
                className="text-sm text-[#4A3B2C]/68 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Result footer */}
        <div
          className="mt-4 pt-4 border-t flex items-start gap-2.5"
          style={{ borderColor: 'rgba(74,59,44,0.08)' }}
        >
          {mod.hasCert ? (
            <svg
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: mod.color }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: mod.color }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          )}
          <span
            className="text-xs font-medium leading-relaxed"
            style={{ color: mod.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            {mod.result}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AgentsModules() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.13,
        ease: 'power3.out',
      });

      gsap.from('.am-level-label', {
        scrollTrigger: { trigger: '.am-levels', start: 'top 82%', once: true },
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 87%', once: true },
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: (i % 3) * 0.1,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEFBF6 0%, #F8F5EE 50%, #FEFBF6 100%)' }}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.016] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #4A3B2C 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />

      {/* Orbs */}
      <div
        className="absolute top-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.07) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(95,168,163,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
            style={{ background: 'rgba(212,165,116,0.08)', borderColor: 'rgba(212,165,116,0.28)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
            <span
              className="text-[#C89563] text-xs uppercase tracking-[0.18em] font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Учебная программа
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-[#4A3B2C] mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            6 модулей — от старта до экспертизы
          </h2>
          <p
            className="text-base md:text-lg text-[#4A3B2C]/58 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Последовательная программа с упором на реальную практику и развитие личного бренда
          </p>
        </div>

        {/* Level track */}
        <div className="am-levels flex items-center justify-center gap-0 mb-12 overflow-x-auto">
          {LEVELS.map((lv, i) => (
            <div key={i} className="am-level-label flex items-center">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap"
                style={{
                  background: `${lv.color}12`,
                  border: `1px solid ${lv.color}30`,
                  color: lv.color,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: lv.color }} />
                {lv.label}
                <span className="opacity-50 text-[10px]">·  мод. {lv.range[0] + 1}–{lv.range[1] + 1}</span>
              </div>
              {i < LEVELS.length - 1 && (
                <div className="mx-3 flex items-center">
                  <svg className="w-4 h-4 text-[#4A3B2C]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {MODULES.map((mod, index) => (
            <ModuleCard
              key={mod.num}
              mod={mod}
              index={index}
              cardRef={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
