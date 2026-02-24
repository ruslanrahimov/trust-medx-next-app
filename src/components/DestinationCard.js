'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Building2, TrendingDown, ArrowRight, Camera } from 'lucide-react';

// Per-index color scheme — mirrors the palette from HomeDestinations
const CARD_STYLES = [
  {
    color: '#5FA8A3',
    tagBg: 'rgba(95,168,163,0.10)',
    tagText: '#5FA8A3',
    borderHover: '#5FA8A3',
    placeholderBg: 'linear-gradient(145deg, #2d6b67 0%, #3d8a85 38%, #5FA8A3 68%, #4A9691 100%)',
    // Diamond lattice — light on teal
    patternSvg: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M20 2 L38 20 L20 38 L2 20 Z' fill='none' stroke='rgba(255,255,255,0.13)' stroke-width='1'/></svg>`,
  },
  {
    color: '#D4A574',
    tagBg: 'rgba(212,165,116,0.10)',
    tagText: '#D4A574',
    borderHover: '#D4A574',
    placeholderBg: 'linear-gradient(145deg, #7a5028 0%, #b07840 38%, #D4A574 68%, #C89563 100%)',
    // Circle mesh — light on gold
    patternSvg: `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='13' fill='none' stroke='rgba(255,255,255,0.11)' stroke-width='1'/></svg>`,
  },
  {
    color: '#8C7B6E',
    tagBg: 'rgba(74,59,44,0.08)',
    tagText: '#6B5848',
    borderHover: '#8C7B6E',
    placeholderBg: 'linear-gradient(145deg, #1e160f 0%, #3a2d21 38%, #5a4535 68%, #7a6050 100%)',
    // Cross-hatch — light on dark brown
    patternSvg: `<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22'><line x1='0' y1='0' x2='22' y2='22' stroke='rgba(255,255,255,0.09)' stroke-width='1.5'/><line x1='22' y1='0' x2='0' y2='22' stroke='rgba(255,255,255,0.09)' stroke-width='1.5'/></svg>`,
  },
];

function ImageHeader({ imageSrc, imageAlt, countryName, style, exploreLabel }) {
  return (
    <div className="relative h-[160px] overflow-hidden">
      {/* ── Background: real image OR rich placeholder ── */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt || countryName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: style.placeholderBg }}>
          {/* SVG texture pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(style.patternSvg)}")`,
              backgroundRepeat: 'repeat',
            }}
          />
          {/* Subtle placeholder icon — signals "photo goes here" without being intrusive */}
          <Camera
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 text-white/[0.12]"
            strokeWidth={1}
          />
        </div>
      )}

      {/* ── Dark overlay — heavy at bottom for text legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.68) 100%)',
        }}
      />

      {/* ── Country name ── */}
      <h3
        className="absolute bottom-0 left-0 right-0 px-8 pb-5 text-4xl md:text-5xl font-bold text-white leading-none tracking-tight drop-shadow-sm"
        style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
      >
        {countryName}
      </h3>

      {/* ── Explore arrow — top right ── */}
      <span
        className="absolute top-5 right-6 z-10 flex items-center gap-1 text-white/80 text-sm font-medium transition-all duration-300 group-hover:text-white group-hover:gap-2"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        aria-hidden="true"
      >
        {exploreLabel} <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>
    </div>
  );
}

/**
 * DestinationCard — reusable destination/country card.
 *
 * @param {object}   country               — { name, description, specialties[], stats: { clinics, savings } }
 * @param {number}   index                 — 0 | 1 | 2  (controls color scheme)
 * @param {string}   lang                  — locale prefix, e.g. "ru"
 * @param {string}   slug                  — URL slug, e.g. "turkey"
 * @param {string}  [imageSrc]             — Next.js-compatible image src; omit to show placeholder
 * @param {string}  [imageAlt]             — alt text for the image
 * @param {boolean} [isHovered=false]      — lift + glow effect when true
 * @param {Function}[onMouseEnter]
 * @param {Function}[onMouseLeave]
 * @param {object}  [labels]               — i18n overrides for UI strings
 * @param {string}  [labels.explore]       — top-right "Explore" text (default: "Explore")
 * @param {string}  [labels.specialties]   — specialties heading (default: "Специализации")
 * @param {string}  [labels.clinicsUnit]   — unit after clinic count (default: "клиник")
 * @param {string}  [labels.cta]           — bottom CTA text (default: "Подробнее")
 */
export default function DestinationCard({
  country,
  index = 0,
  lang,
  slug,
  imageSrc,
  imageAlt,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  labels = {},
}) {
  const style = CARD_STYLES[index % CARD_STYLES.length];

  const {
    explore = 'Explore',
    specialties: specialtiesLabel = 'Специализации',
    clinicsUnit = 'клиник',
    cta = 'Подробнее',
  } = labels;

  return (
    <Link
      href={`/${lang}/treatment-abroad/${slug}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group flex flex-col h-full"
    >
      <article
        className="relative bg-white rounded-3xl overflow-hidden border border-[#4A3B2C]/8 transition-all duration-500 flex flex-col h-full"
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered
            ? `0 32px 64px rgba(74,59,44,0.13), 0 0 0 1.5px ${style.borderHover}40`
            : '0 8px 32px rgba(74,59,44,0.07)',
        }}
      >
        <ImageHeader
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          countryName={country.name}
          style={style}
          exploreLabel={explore}
        />

        {/* ── Card body ── */}
        <div className="p-8 flex flex-col flex-1">
          <p
            className="text-[#4A3B2C]/60 text-sm leading-relaxed mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {country.description}
          </p>

          {/* Stats row — rendered only when stats are provided */}
          {country.stats && (
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Building2
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: style.color }}
                  strokeWidth={1.75}
                />
                <span
                  className="text-xs font-semibold text-[#4A3B2C]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {country.stats.clinics} {clinicsUnit}
                </span>
              </div>
              <div className="w-px h-4 bg-[#4A3B2C]/15" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <TrendingDown
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: style.color }}
                  strokeWidth={1.75}
                />
                <span
                  className="text-xs font-semibold text-[#4A3B2C]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {country.stats.savings}
                </span>
              </div>
            </div>
          )}

          {/* Specialties */}
          <div className="mb-7">
            <p
              className="text-[10px] font-semibold text-[#4A3B2C]/40 uppercase tracking-[0.18em] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {specialtiesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {country.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: style.tagBg,
                    color: style.tagText,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-3 mt-auto"
            style={{ color: style.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            {cta}
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.25}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
