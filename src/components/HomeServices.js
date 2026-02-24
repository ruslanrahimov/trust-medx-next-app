'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, HeartPulse, Globe, GraduationCap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_ACCENTS = [
  { border: '#5FA8A3', icon: '#5FA8A3', iconBg: 'rgba(95,168,163,0.10)', IconComponent: HeartPulse },
  { border: '#D4A574', icon: '#D4A574', iconBg: 'rgba(212,165,116,0.10)', IconComponent: Globe },
  { border: '#4A3B2C', icon: '#4A3B2C', iconBg: 'rgba(74,59,44,0.08)', IconComponent: GraduationCap },
];

const WATERMARKS = ['01', '02', '03'];

export default function HomeServices({ dict, lang }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 18, duration: 0.6, ease: 'power2.out',
      });
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 77%', once: true },
        opacity: 0, y: 28, duration: 0.8, delay: 0.15, ease: 'power3.out',
      });
      gsap.from(subtitleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 74%', once: true },
        opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: 'power2.out',
      });
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 70 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          immediateRender: false,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = dict.pages.homePage.services;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEFBF6 0%, #F8F5EE 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-16 left-[8%] w-[420px] h-[420px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-24 right-[10%] w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="relative text-center mb-20 md:mb-24">
          {/* Large decorative watermark */}
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none pointer-events-none mx-auto text-center leading-none"
            style={{
              fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
              fontSize: '10rem', fontWeight: 700,
              color: 'rgba(95,168,163,0.07)', zIndex: 0,
            }}>
            01
          </span>

          <div ref={badgeRef} className="relative z-10 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border mb-7"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(74,59,44,0.10)',
              boxShadow: '0 4px 20px rgba(95,168,163,0.08)',
            }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#5FA8A3' }} />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,59,44,0.75)' }}>
              {services.badge}
            </span>
          </div>

          <h2 ref={titleRef}
            className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif", color: '#4A3B2C' }}>
            {services.title}
          </h2>

          <p ref={subtitleRef}
            className="relative z-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,59,44,0.58)' }}>
            {services.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.items.map((service, index) => {
            const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
            const IconComponent = accent.IconComponent;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative rounded-3xl overflow-hidden transition-all duration-500"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${isHovered ? accent.border + '55' : 'rgba(74,59,44,0.08)'}`,
                  boxShadow: isHovered
                    ? `0 24px 60px rgba(74,59,44,0.13), 0 4px 16px ${accent.border}22`
                    : '0 8px 30px rgba(74,59,44,0.07)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                {/* Left border accent strip */}
                <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent.border }} />

                {/* Watermark number */}
                <span className="absolute bottom-0 right-4 leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                    fontSize: '8rem', fontWeight: 700,
                    color: '#4A3B2C', opacity: 0.04, lineHeight: 1,
                  }}>
                  {WATERMARKS[index % WATERMARKS.length]}
                </span>

                {/* Card body */}
                <div className="relative z-10 p-8 md:p-9 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300"
                    style={{
                      background: accent.iconBg,
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}>
                    <IconComponent size={26} strokeWidth={1.6} style={{ color: accent.icon }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300"
                    style={{
                      fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                      color: isHovered ? accent.border : '#4A3B2C',
                      lineHeight: 1.2,
                    }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-7 leading-relaxed"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: 'rgba(74,59,44,0.65)', fontSize: '0.95rem',
                    }}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-9 flex-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} strokeWidth={2} className="flex-shrink-0 mt-0.5"
                          style={{ color: '#5FA8A3' }} />
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: 'rgba(74,59,44,0.70)', fontSize: '0.9rem', lineHeight: 1.55,
                        }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/${lang}${service.link}`}
                    className="group/cta inline-flex items-center gap-2 font-semibold transition-colors duration-300"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: isHovered ? accent.border : '#5FA8A3',
                      fontSize: '0.9rem',
                    }}>
                    <span>Узнать больше</span>
                    <ArrowRight size={16} strokeWidth={2.2}
                      className="transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
