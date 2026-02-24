'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import DestinationCard from './DestinationCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const COUNTRY_SLUGS = ['turkey', 'south-korea', 'china'];

export default function CountrySelection({ dict, lang }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const raw = dict.treatmentAbroad.countries;

  const countries = [
    {
      name: raw.turkey.name,
      image: raw.turkey.image,
      description: raw.turkey.description,
      specialties: raw.turkey.treatments,
    },
    {
      name: raw.southKorea.name,
      image: raw.southKorea.image,
      description: raw.southKorea.description,
      specialties: raw.southKorea.treatments,
    },
    {
      name: raw.china.name,
      image: raw.china.image,
      description: raw.china.description,
      specialties: raw.china.treatments,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#FEFBF6] via-[#FAF8F0] to-[#FEFBF6] overflow-hidden"
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-6"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            {dict.treatmentAbroad.countrySelection.title}
          </h2>
          <p
            className="text-lg md:text-xl text-[#4A3B2C]/70 max-w-3xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {dict.treatmentAbroad.countrySelection.subtitle}
          </p>

          {/* Minimalist divider */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
            <div className="w-1 h-1 rounded-full bg-[#4A3B2C]/30" />
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {countries.map((country, index) => (
            <div key={COUNTRY_SLUGS[index]} ref={(el) => (cardsRef.current[index] = el)} className="h-full">
              <DestinationCard
                country={country}
                index={index}
                lang={lang}
                slug={COUNTRY_SLUGS[index]}
                imageSrc={country.image}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
