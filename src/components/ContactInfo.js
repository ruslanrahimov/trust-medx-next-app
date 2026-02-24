'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactInfo({ dict, lang }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.from('.contact-info-badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
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
            y: 40,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      icon: Phone,
      data: dict.contactInfo.phone,
    },
    {
      icon: MapPin,
      data: dict.contactInfo.address,
    },
    {
      icon: Clock,
      data: dict.contactInfo.hours,
    },
    {
      icon: Mail,
      data: dict.contactInfo.email,
    },
  ];

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Badge */}
      <div className="contact-info-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#4A3B2C]/10">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4A3B2C]/40" />
        <span className="text-xs font-medium text-[#4A3B2C]/70 uppercase tracking-[0.2em] font-[family-name:var(--font-dm-sans)]">
          {dict.contactInfo.badge}
        </span>
      </div>

      {/* Contact Cards */}
      <div className="space-y-3">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative"
            >
              <div className="relative p-5 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#4A3B2C]/8 transition-all duration-300 hover:bg-white/80 hover:border-[#4A3B2C]/12 hover:shadow-sm">
                <div className="relative flex items-start gap-4">
                  {/* Icon - Minimalist outline style */}
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border border-[#4A3B2C]/15 bg-[#4A3B2C]/[0.02] transition-all duration-300 group-hover:border-[#4A3B2C]/25 group-hover:bg-[#4A3B2C]/[0.04]">
                    <Icon className="w-5 h-5 text-[#4A3B2C]/60" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-sm font-semibold text-[#4A3B2C]/50 mb-1 uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.data.title}
                    </h3>
                    <p
                      className="text-base font-medium text-[#4A3B2C] mb-0.5"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                      dir={lang === 'ar' ? 'ltr' : 'auto'}
                    >
                      {item.data.value}
                    </p>
                    {item.data.description && (
                      <p className="text-sm text-[#4A3B2C]/50 font-[family-name:var(--font-dm-sans)]">
                        {item.data.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
