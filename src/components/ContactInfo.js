'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconStyles = [
  {
    bg: 'from-[#5FA8A3] to-[#3D8F8A]',
    shadow: 'shadow-[#5FA8A3]/30',
    ring: 'ring-[#5FA8A3]/15',
    glow: 'from-[#5FA8A3]/15 to-transparent',
  },
  {
    bg: 'from-[#D4A574] to-[#C08A55]',
    shadow: 'shadow-[#D4A574]/30',
    ring: 'ring-[#D4A574]/15',
    glow: 'from-[#D4A574]/15 to-transparent',
  },
  {
    bg: 'from-[#4A9691] to-[#2C5F5D]',
    shadow: 'shadow-[#4A9691]/30',
    ring: 'ring-[#4A9691]/15',
    glow: 'from-[#4A9691]/12 to-transparent',
  },
  {
    bg: 'from-[#C89563] to-[#A8753F]',
    shadow: 'shadow-[#C89563]/30',
    ring: 'ring-[#C89563]/15',
    glow: 'from-[#C89563]/15 to-transparent',
  },
];

export default function ContactInfo({ dict, lang }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-badge', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 20, duration: 0.6,
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            opacity: 0, y: 30, duration: 0.7,
            delay: index * 0.1, ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    { icon: Phone, data: dict.contactInfo.phone },
    { icon: MapPin, data: dict.contactInfo.address },
    { icon: Clock,  data: dict.contactInfo.hours },
    { icon: Mail,   data: dict.contactInfo.email },
  ];

  return (
    <div ref={sectionRef} className="h-full flex flex-col gap-5">
      {/* Badge */}
      <div className="contact-info-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#5FA8A3]/20 self-start">
        <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
        <span className="text-xs font-medium text-[#4A3B2C]/70 uppercase tracking-[0.2em] font-[family-name:var(--font-dm-sans)]">
          {dict.contactInfo.badge}
        </span>
      </div>

      {/* Cards — flex-1 so they fill remaining height equally */}
      <div className="flex flex-col gap-3 flex-1">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const style = iconStyles[index];
          return (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative flex-1"
            >
              <div className="relative h-full p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#4A3B2C]/8 transition-all duration-300 hover:bg-white/90 hover:shadow-lg overflow-hidden flex items-center gap-4">
                {/* Glow */}
                <div className={`absolute top-0 left-0 w-28 h-28 bg-gradient-to-br ${style.glow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none`} />

                {/* Icon */}
                <div className={`relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${style.bg} shadow-md ${style.shadow} ring-4 ${style.ring} transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="relative min-w-0">
                  <p
                    className="text-[10px] font-semibold text-[#4A3B2C]/40 mb-0.5 uppercase tracking-widest leading-none"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.data.title}
                  </p>
                  <p
                    className="text-base font-bold text-[#4A3B2C] leading-snug"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    dir={lang === 'ar' ? 'ltr' : 'auto'}
                  >
                    {item.data.value}
                  </p>
                  {item.data.description && (
                    <p className="text-xs text-[#4A3B2C]/45 mt-0.5 font-[family-name:var(--font-dm-sans)]">
                      {item.data.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
