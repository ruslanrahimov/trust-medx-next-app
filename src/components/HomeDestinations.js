'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import DestinationCard from './DestinationCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const COUNTRY_SLUGS = ['turkey', 'south-korea', 'china'];

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
            <div key={index} ref={(el) => (cardsRef.current[index] = el)} className="h-full">
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
