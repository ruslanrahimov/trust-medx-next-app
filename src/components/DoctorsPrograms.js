'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROGRAMS = [
  {
    id: 'hair',
    title: 'Трансплантация волос',
    subtitle: 'Hair Transplant Training',
    color: '#5FA8A3',
    colorBg: 'rgba(95,168,163,0.10)',
    items: [
      'FUE, DHI, Sapphire, Hybrid техники',
      'Планирование линии роста и работа с графтами',
      'PRP, мезотерапия, послеоперационный уход',
      'Практика на моделях и живые операции',
    ],
    certificate: 'Сертификат после окончания',
    footer: null,
    image: '/doctors_hair_trans.png',
    imageDesc:
      'Крупный план: хирург с медицинскими пинцетами выполняет FUE трансплантацию волос — видны фолликулы, линейка роста волос, яркое операционное освещение',
  },
  {
    id: 'plastic',
    title: 'Пластическая хирургия',
    subtitle: 'Plastic Surgery Observership',
    color: '#D4A574',
    colorBg: 'rgba(212,165,116,0.10)',
    items: [
      'Ринопластика, маммопластика, липосакция, фейслифтинг',
      'Наблюдение за реальными операциями',
      'Современные протоколы реабилитации',
    ],
    certificate: null,
    footer: 'Лучшие клиники Стамбула · хирурги международного уровня',
    image: '/doctors_plast.png',
    imageDesc:
      'Два хирурга в операционной: один наблюдает, другой объясняет технику ринопластики — медицинские маски, яркий свет, современное оборудование',
  },
  {
    id: 'dental',
    title: 'Стоматология',
    subtitle: 'Dental Training',
    color: '#7EBDB8',
    colorBg: 'rgba(126,189,184,0.10)',
    items: [
      'Имплантология',
      'Эстетическая стоматология и виниры',
      'Цифровая стоматология (CAD/CAM, 3D planning)',
    ],
    certificate: null,
    footer: 'Ведущие стоматологические центры Турции',
    image: '/stomotolog_3d.png',
    imageDesc:
      'Стоматологическая лаборатория: CAD/CAM машина фрезерует протез, монитор с 3D-моделью зуба, чистый технологичный интерьер клиники',
  },
  {
    id: 'ivf',
    title: 'Гинекология и ЭКО',
    subtitle: 'Reproductive Medicine & IVF',
    color: '#C89563',
    colorBg: 'rgba(200,149,99,0.10)',
    items: [
      'Протоколы стимуляции, ICSI, cryo, донорские программы',
      'Лабораторные стандарты и эмбриология',
      'Работа с пациентами с низким овариальным резервом',
    ],
    certificate: null,
    footer: 'Сертифицированные IVF-центры',
    image: '/embrio.png',
    imageDesc:
      'Эмбриолог в чистой лаборатории работает с микроскопом — крио-контейнеры с жидким азотом на фоне, стерильная белая обстановка IVF-клиники',
  },
  {
    id: 'management',
    title: 'Для руководителей клиник',
    subtitle: 'Clinic Management & Strategy',
    color: '#2C5F5D',
    colorBg: 'rgba(44,95,93,0.10)',
    items: [
      'Стратегическое управление и JCI-стандарты',
      'Международный маркетинг и работа с пациентами',
      'Мотивация персонала и построение команды',
    ],
    certificate: null,
    format: 'Лекции, визиты в госпитали, мастер-классы',
    footer: null,
    image: '/rukovodstvo.png',
    imageDesc:
      'Конференц-зал в JCI-аккредитованной больнице Стамбула: 5–6 руководителей за столом переговоров, экран с данными по стандартам качества',
  },
  {
    id: 'mixed',
    title: 'Комбинированные программы',
    subtitle: 'Mixed Modules',
    color: '#967259',
    colorBg: 'rgba(150,114,89,0.10)',
    items: [
      '«Doctor Experience in Istanbul»',
      '«Aesthetic & Hair Transplant Week»',
      '«Management & Marketing for Clinics»',
    ],
    certificate: 'Сертификат + сотрудничество с клиниками-партнёрами',
    footer: null,
    image: '/doctors_basfor.png',
    imageDesc:
      'Группа из 5–6 международных врачей перед панорамой Стамбула — Босфор и мечети на фоне, живая профессиональная атмосфера',
  },
];

function CheckIcon({ color }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill={color} fillOpacity="0.15" />
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

function ProgramCard({ program, index, cardRef }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: 'white',
        border: `1px solid ${hovered ? program.color + '40' : 'rgba(74,59,44,0.08)'}`,
        boxShadow: hovered
          ? `0 20px 56px ${program.color}22, 0 4px 16px rgba(74,59,44,0.06)`
          : '0 4px 20px rgba(74,59,44,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Colored top strip */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${program.color} 0%, ${program.color}70 100%)`,
        }}
      />

      {/* Image area */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '168px',
          background: `linear-gradient(135deg, ${program.colorBg} 0%, ${program.color}18 100%)`,
        }}
      >
        {program.image ? (
          <>
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${program.color}55 0%, transparent 60%)` }}
            />
          </>
        ) : (
          <>
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle, ${program.color} 1.5px, transparent 1.5px)`,
                backgroundSize: '22px 22px',
              }}
            />
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5"
                style={{
                  background: `${program.color}20`,
                  border: `1px solid ${program.color}40`,
                }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={program.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p
                className="text-xs leading-relaxed italic"
                style={{ color: `${program.color}90`, fontFamily: "'DM Sans', sans-serif" }}
              >
                {program.imageDesc}
              </p>
            </div>
          </>
        )}

        {/* Index watermark */}
        <div
          className="absolute bottom-1 right-3 text-7xl font-black leading-none pointer-events-none select-none"
          style={{
            fontFamily: "'Fraunces', serif",
            color: program.color,
            opacity: 0.06,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.12em] mb-3 self-start"
          style={{
            background: program.colorBg,
            color: program.color,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {program.subtitle}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-[#4A3B2C] mb-4 leading-snug"
          style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
        >
          {program.title}
        </h3>

        {/* Items list */}
        <ul className="space-y-2.5 flex-1">
          {program.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckIcon color={program.color} />
              <span
                className="text-sm text-[#4A3B2C]/70 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Format note */}
        {program.format && (
          <div
            className="flex items-center gap-2 mt-4 px-3 py-2.5 rounded-xl"
            style={{
              background: `${program.color}0D`,
              border: `1px solid ${program.color}20`,
            }}
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: program.color }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <span
              className="text-xs"
              style={{ color: program.color, fontFamily: "'DM Sans', sans-serif" }}
            >
              {program.format}
            </span>
          </div>
        )}

        {/* Footer */}
        <div
          className="pt-4 mt-4 border-t flex items-center gap-2"
          style={{ borderColor: 'rgba(74,59,44,0.08)' }}
        >
          {program.certificate ? (
            <>
              <svg
                className="w-4 h-4 flex-shrink-0"
                style={{ color: program.color }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span
                className="text-xs font-semibold"
                style={{ color: program.color, fontFamily: "'DM Sans', sans-serif" }}
              >
                {program.certificate}
              </span>
            </>
          ) : program.footer ? (
            <>
              <svg
                className="w-4 h-4 flex-shrink-0 text-[#4A3B2C]/35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span
                className="text-xs text-[#4A3B2C]/55"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {program.footer}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPrograms() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 87%',
            once: true,
          },
          opacity: 0,
          y: 44,
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
      style={{
        background: 'linear-gradient(180deg, #FEFBF6 0%, #FAF7F0 50%, #FEFBF6 100%)',
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #4A3B2C 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(95,168,163,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
            style={{
              background: 'rgba(95,168,163,0.08)',
              borderColor: 'rgba(95,168,163,0.28)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3]" />
            <span
              className="text-[#2C5F5D] text-xs uppercase tracking-[0.18em] font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Программы обучения
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-[#4A3B2C] mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            6 специализированных направлений
          </h2>
          <p
            className="text-base md:text-lg text-[#4A3B2C]/60 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Каждая программа разработана совместно с ведущими клиниками Турции и включает
            практическую составляющую
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {PROGRAMS.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              cardRef={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
