'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileText, MapPin, Sparkles, Download } from 'lucide-react';

// Icon mapping for each guide type
const guideIcons = {
  surgery: FileText,
  turkey: MapPin,
  korea: MapPin,
  china: MapPin,
};


function GuideCard({ guide, index, isRTL }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = guideIcons[guide.type] || Sparkles;

  const handlePreview = () => {
    // Open PDF in new tab for preview
    const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const pdfUrl = base + (guide.pdfPath || `/guides/${guide.type}-guide.pdf`);
    window.open(pdfUrl, '_blank');
  };

  return (
    <div
      className="group h-full"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${index * 0.12}s forwards`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-3xl border border-[#2C5F5D]/15 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(44,95,93,0.15)] hover:-translate-y-2 hover:border-[#2C5F5D]/30">

        {/* Image header */}
        <div className="relative h-44 overflow-hidden">
          {guide.image ? (
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F5D]/20 via-[#967259]/15 to-transparent" />
          )}

          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/5 pointer-events-none" />

          {/* Floating icon badge — overlaps into content area */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2C5F5D] to-[#2C5F5D]/80 shadow-[0_8px_32px_rgba(44,95,93,0.35)] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Icon className="w-9 h-9 text-white transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-2xl bg-[#2C5F5D] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 pb-8 px-6">
          <h3 className="text-xl md:text-2xl font-serif text-[#2D3748] mb-3 text-center transition-colors duration-300 group-hover:text-[#2C5F5D]">
            {guide.title}
          </h3>

          <p className="text-sm md:text-base text-[#718096] leading-relaxed text-center mb-6 min-h-[4rem]">
            {guide.description}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#2C5F5D]/30 to-transparent" />
            <div className="mx-2 w-1.5 h-1.5 rounded-full bg-[#2C5F5D]/50" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#2C5F5D]/30 to-transparent" />
          </div>

          {/* Button */}
          <button
            onClick={handlePreview}
            className="group/btn relative w-full px-6 py-3.5 bg-gradient-to-r from-[#2D3748] to-[#2C5F5D] text-white rounded-2xl font-medium transition-all duration-500 hover:shadow-[0_8px_30px_rgba(44,95,93,0.4)] hover:scale-105 active:scale-100 overflow-hidden"
          >
            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Download className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
              <span>{guide.buttonText}</span>
            </span>

            {/* Shine animation on hover */}
            <span className="absolute inset-0 overflow-hidden rounded-2xl">
              <span className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out" />
            </span>

            {/* Button border glow */}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#2C5F5D] to-[#967259] opacity-0 group-hover/btn:opacity-100 blur-xl -z-10 transition-opacity duration-500" />
          </button>
        </div>

        {/* Bottom decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2C5F5D] via-[#967259] to-[#2C5F5D] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}

export default function UsefulInfo({ dict, lang }) {
  const mounted = true;
  const isRTL = lang === 'ar';

  // Guide data with fallback
  const guides = dict?.usefulInfo?.guides || [
    {
      type: 'surgery',
      title: 'Подготовка к операции',
      description: 'Полное руководство по подготовке к хирургическому вмешательству',
      buttonText: 'Получить гайд',
      pdfPath: '/guides/surgery-preparation.pdf',
    },
    {
      type: 'turkey',
      title: 'Всё о Турции',
      description: 'Информация о лечении, клиниках и проживании в Турции',
      buttonText: 'Получить гайд',
      pdfPath: '/guides/turkey-guide.pdf',
    },
    {
      type: 'korea',
      title: 'Всё о Корее',
      description: 'Всё, что нужно знать о медицинском туризме в Южной Корее',
      buttonText: 'Получить гайд',
      pdfPath: '/guides/korea-guide.pdf',
    },
    {
      type: 'china',
      title: 'Всё о Китае',
      description: 'Руководство по лечению и медицинским услугам в Китае',
      buttonText: 'Получить гайд',
      pdfPath: '/guides/china-guide.pdf',
    },
  ];

  const sectionTitle = dict?.usefulInfo?.title || 'Полезная информация';
  const sectionSubtitle = dict?.usefulInfo?.subtitle || 'Загрузите наши подробные гайды для успешного лечения за рубежом';
  return (
    <section className={`relative py-16 md:py-24 px-4 md:px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFBF6] via-[#FAF8F0] to-[#FEFBF6]" />

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-[#2C5F5D] rounded-full blur-[140px] opacity-[0.06]" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[#967259] rounded-full blur-[140px] opacity-[0.06]" />

      {/* Geometric grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #2C5F5D 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Vertical accent lines */}
      <div className="absolute top-0 left-[20%] w-px h-48 bg-gradient-to-b from-transparent via-[#2C5F5D]/20 to-transparent" />
      <div className="absolute bottom-0 right-[25%] w-px h-56 bg-gradient-to-t from-transparent via-[#967259]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: 0,
            animation: mounted ? 'fadeInUp 0.8s ease-out forwards' : 'none',
          }}
        >
          {/* Decorative element above title */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2C5F5D]/40" />
            <div className="mx-3 flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#967259] animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#2C5F5D]/40" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2D3748] mb-4 tracking-tight">
            {sectionTitle}
          </h2>

          <p className="text-base md:text-lg text-[#718096] max-w-2xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guides.map((guide, index) => (
            <GuideCard
              key={guide.type}
              guide={guide}
              index={index}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <div
          className="mt-16 flex items-center justify-center"
          style={{
            opacity: 0,
            animation: mounted ? 'fadeInUp 0.8s ease-out 0.8s forwards' : 'none',
          }}
        >
          <div className="relative">
            <div className="h-px w-32 bg-gradient-to-r from-[#2C5F5D]/40 via-[#967259]/40 to-[#2C5F5D]/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-[#2C5F5D] to-[#967259] shadow-[0_0_12px_rgba(44,95,93,0.5)]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
