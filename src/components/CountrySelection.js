'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CountrySelection({ dict, lang }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const isRTL = lang === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const countries = [
    {
      name: dict.treatmentAbroad.countries.turkey.name,
      flag: '🇹🇷',
      slug: 'turkey',
      description: dict.treatmentAbroad.countries.turkey.description,
      treatments: dict.treatmentAbroad.countries.turkey.treatments,
      accentColor: '#E30A17',
      gradient: 'from-[#E30A17]/10 to-[#E30A17]/5',
    },
    {
      name: dict.treatmentAbroad.countries.southKorea.name,
      flag: '🇰🇷',
      slug: 'south-korea',
      description: dict.treatmentAbroad.countries.southKorea.description,
      treatments: dict.treatmentAbroad.countries.southKorea.treatments,
      accentColor: '#0047A0',
      gradient: 'from-[#0047A0]/10 to-[#0047A0]/5',
    },
    {
      name: dict.treatmentAbroad.countries.china.name,
      flag: '🇨🇳',
      slug: 'china',
      description: dict.treatmentAbroad.countries.china.description,
      treatments: dict.treatmentAbroad.countries.china.treatments,
      accentColor: '#DE2910',
      gradient: 'from-[#DE2910]/10 to-[#DE2910]/5',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#FEFBF6] via-[#FAF8F0] to-[#FEFBF6] overflow-hidden"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-6 font-[family-name:var(--font-fraunces)]">
            {dict.treatmentAbroad.countrySelection.title}
          </h2>
          <p className="text-lg md:text-xl text-[#4A3B2C]/70 max-w-3xl mx-auto font-[family-name:var(--font-dm-sans)]">
            {dict.treatmentAbroad.countrySelection.subtitle}
          </p>

          {/* Minimalist divider */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
            <div className="w-1 h-1 rounded-full bg-[#4A3B2C]/30" />
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
          </div>
        </div>

        {/* Country Cards Grid - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {countries.map((country, index) => (
            <Link
              key={country.slug}
              href={`/${lang}/treatment-abroad/${country.slug}`}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative"
            >
              <div
                className="relative h-full p-8 rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-sm"
                style={{
                  boxShadow: `
                    0 8px 30px -8px ${country.accentColor}20,
                    0 0 0 1px ${country.accentColor}15,
                    inset 0 1px 0 0 rgba(255,255,255,0.9)
                  `,
                }}
              >
                {/* Gradient background overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${country.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Flag + Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                      {country.flag}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="w-5 h-5 text-[#4A3B2C]" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Country Name */}
                  <h3 className="text-2xl md:text-3xl font-bold text-[#4A3B2C] mb-3 font-[family-name:var(--font-fraunces)] group-hover:text-[#2a2520] transition-colors duration-300">
                    {country.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#4A3B2C]/70 mb-6 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                    {country.description}
                  </p>

                  {/* Treatments Tags */}
                  <div className="flex flex-wrap gap-2">
                    {country.treatments.slice(0, 3).map((treatment, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#4A3B2C]/5 text-[#4A3B2C]/70 group-hover:bg-white/60 transition-all duration-500 font-[family-name:var(--font-dm-sans)]"
                        style={{
                          transitionDelay: `${i * 50}ms`,
                        }}
                      >
                        {treatment}
                      </span>
                    ))}
                  </div>

                  {/* Accent underline */}
                  <div
                    className="mt-6 h-1 w-0 rounded-full transition-all duration-700 group-hover:w-16"
                    style={{ backgroundColor: country.accentColor }}
                  />
                </div>

                {/* Glow effect */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 opacity-0 transition-opacity duration-700 group-hover:opacity-20 blur-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${country.accentColor}, transparent)`,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
