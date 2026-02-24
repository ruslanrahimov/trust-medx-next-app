'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, MessageCircle, Send } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SocialMedia({ dict, footer }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.from('.social-badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // Title animation
      gsap.from('.social-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
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
            y: 30,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      name: footer.socialMedia.facebook,
      icon: Facebook,
      href: 'https://facebook.com/trustmedx',
    },
    {
      name: footer.socialMedia.instagram,
      icon: Instagram,
      href: 'https://instagram.com/trustmedx',
    },
    {
      name: footer.socialMedia.whatsapp,
      icon: MessageCircle,
      href: 'https://wa.me/994XXXXXXXXX',
    },
    {
      name: footer.socialMedia.telegram,
      icon: Send,
      href: 'https://t.me/trustmedx',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-b from-[#FAF8F0] via-white to-[#FEFBF6] overflow-hidden"
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="social-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#4A3B2C]/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4A3B2C]/40" />
            <span className="text-xs font-medium text-[#4A3B2C]/70 uppercase tracking-[0.2em] font-[family-name:var(--font-dm-sans)]">
              {dict.socialMedia.badge}
            </span>
          </div>

          <h2
            className="social-title text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A3B2C] mb-2"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {dict.socialMedia.title}
          </h2>
          <p className="text-sm md:text-base text-[#4A3B2C]/50 font-[family-name:var(--font-dm-sans)]">
            {dict.socialMedia.description}
          </p>
        </div>

        {/* Social Links Grid - Minimalist */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#4A3B2C]/8 transition-all duration-300 hover:bg-white/80 hover:border-[#4A3B2C]/15 hover:shadow-sm">
                  {/* Icon Container - Minimalist outline */}
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-[#4A3B2C]/15 bg-[#4A3B2C]/[0.02] transition-all duration-300 group-hover:border-[#4A3B2C]/25 group-hover:bg-[#4A3B2C]/[0.04] group-hover:scale-105">
                      <Icon className="w-5 h-5 text-[#4A3B2C]/60" strokeWidth={1.5} />
                    </div>

                    {/* Name */}
                    <span
                      className="text-xs font-medium text-[#4A3B2C]/60 text-center uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {social.name}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Optional: Subtle divider line */}
        <div className="mt-10 pt-8 border-t border-[#4A3B2C]/5">
          <p className="text-center text-xs text-[#4A3B2C]/40 font-[family-name:var(--font-dm-sans)]">
            Мы всегда на связи
          </p>
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
