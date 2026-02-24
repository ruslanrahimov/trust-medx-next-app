'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { MapPin, Building2, TrendingDown, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const COUNTRY_SLUGS = ['turkey', 'south-korea', 'china'];

const COUNTRY_STYLES = [
  { gradientFrom: '#5FA8A3', gradientTo: '#4A9691', color: '#5FA8A3', tagBg: 'rgba(95,168,163,0.10)', tagText: '#5FA8A3', borderHover: '#5FA8A3' },
  { gradientFrom: '#D4A574', gradientTo: '#C89563', color: '#D4A574', tagBg: 'rgba(212,165,116,0.10)', tagText: '#D4A574', borderHover: '#D4A574' },
  { gradientFrom: '#4A3B2C', gradientTo: '#6B5848', color: '#4A3B2C', tagBg: 'rgba(74,59,44,0.08)', tagText: '#4A3B2C', borderHover: '#4A3B2C' },
];

function DiagonalPattern() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diag" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diag)" />
    </svg>
  );
}

function DestinationCard({ country, index, lang, hoveredIndex, onMouseEnter, onMouseLeave }) {
  const style = COUNTRY_STYLES[index];
  const slug = COUNTRY_SLUGS[index];
  const isHovered = hoveredIndex === index;

  return (
    <Link
      href={`/${lang}/treatment-abroad/${slug}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group block"
    >
      <article
        className="relative bg-white rounded-3xl overflow-hidden border border-[#4A3B2C]/8 transition-all duration-500"
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered
            ? `0 32px 64px rgba(74,59,44,0.13), 0 0 0 1.5px ${style.borderHover}40`
            : '0 8px 32px rgba(74,59,44,0.07)',
        }}
      >
        {/* Colored header band */}
        <div
          className="relative h-[140px] flex items-end px-8 pb-6 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${style.gradientFrom} 0%, ${style.gradientTo} 100%)` }}
        >
          <DiagonalPattern />
          <h3
            className="relative z-10 text-4xl md:text-5xl font-bold text-white leading-none tracking-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            {country.name}
          </h3>
          <span
            className="absolute top-5 right-6 z-10 flex items-center gap-1 text-white/80 text-sm font-medium transition-all duration-300 group-hover:text-white group-hover:gap-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            aria-hidden="true"
          >
            Explore <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, ${style.gradientTo}60)` }} />
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-[#4A3B2C]/60 text-sm leading-relaxed mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {country.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: style.color }} strokeWidth={1.75} />
              <span className="text-xs font-semibold text-[#4A3B2C]/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {country.stats.clinics} клиник
              </span>
            </div>
            <div className="w-px h-4 bg-[#4A3B2C]/15" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 flex-shrink-0" style={{ color: style.color }} strokeWidth={1.75} />
              <span className="text-xs font-semibold text-[#4A3B2C]/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {country.stats.savings}
              </span>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-7">
            <p className="text-[10px] font-semibold text-[#4A3B2C]/40 uppercase tracking-[0.18em] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Специализации
            </p>
            <div className="flex flex-wrap gap-2">
              {country.specialties.map((spec, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: style.tagBg, color: style.tagText, fontFamily: "'DM Sans', sans-serif" }}>
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
            style={{ color: style.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            Подробнее
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function HomeDestinations({ dict, lang }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
      });
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 74%', once: true },
        opacity: 0, y: 36, duration: 0.85, delay: 0.15, ease: 'power3.out',
      });
      gsap.from(subtitleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: 'power2.out',
      });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          opacity: 0, y: 80, rotateY: -10,
          duration: 0.95, delay: index * 0.14, ease: 'power3.out',
        });
      });
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
          opacity: 0, y: 28, duration: 0.75, ease: 'power2.out',
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const destinations = dict.pages.homePage.destinations;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: '#F0EDE6' }}
    >
      {/* Dot grid texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{ backgroundImage: `radial-gradient(circle, #4A3B2C 1.5px, transparent 0)`, backgroundSize: '40px 40px' }}
        aria-hidden="true" />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-10 right-[8%] w-[480px] h-[480px] rounded-full blur-3xl opacity-30 z-0"
        style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.15), transparent 70%)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-20 left-[4%] w-[540px] h-[540px] rounded-full blur-3xl opacity-25 z-0"
        style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.15), transparent 70%)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-[#4A3B2C]/10 shadow-sm mb-7">
            <MapPin className="w-3.5 h-3.5 text-[#5FA8A3]" strokeWidth={2.5} />
            <span className="text-[11px] font-semibold text-[#4A3B2C]/70 uppercase tracking-[0.2em]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {destinations.badge}
            </span>
          </div>

          <h2 ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-5 leading-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
            {destinations.title}
          </h2>

          <p ref={subtitleRef}
            className="text-base md:text-lg text-[#4A3B2C]/55 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {destinations.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 md:gap-8" style={{ perspective: '1200px' }}>
          {destinations.countries.map((country, index) => (
            <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
              <DestinationCard
                country={country}
                index={index}
                lang={lang}
                hoveredIndex={hoveredIndex}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="text-center mt-14 md:mt-16">
          <Link
            href={`/${lang}/treatment-abroad`}
            className="group inline-flex items-center gap-2.5 rounded-xl border px-6 py-3 text-sm font-semibold uppercase text-[#2F8F89] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#256F6A]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.07em',
              borderColor: 'rgba(95,168,163,0.45)',
              background: 'rgba(95,168,163,0.08)',
              boxShadow: '0 6px 20px rgba(95,168,163,0.14)',
            }}
          >
            <span>Смотреть все направления</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
