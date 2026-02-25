'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AcademyCTA({ dict, lang }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const [particlePositions] = useState(() =>
    Array.from({ length: 12 }, () => Math.random() * 100)
  );

  const scrollToPrograms = () => {
    const programsSection = document.getElementById('choose-path');
    if (programsSection) {
      programsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance animation
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Button pulse animation
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          boxShadow: '0 20px 60px rgba(95, 168, 163, 0.4)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Button hover setup
        buttonRef.current.addEventListener('mouseenter', () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
          gsap.to('.button-arrow', {
            x: 6,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        buttonRef.current.addEventListener('mouseleave', () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to('.button-arrow', {
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }

      // Floating particles animation
      gsap.utils.toArray('.cta-particle').forEach((particle, i) => {
        gsap.to(particle, {
          y: -100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: i * 0.5,
          ease: 'none',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#2C5F5D] via-[#3A7270] to-[#2C5F5D]"
    >
      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#5FA8A3]/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#D4A574]/10 blur-3xl" />
      </div>

      {/* Animated diagonal lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0M-10 10L10 -10M30 50L50 30" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((position, i) => (
          <div
            key={i}
            className="cta-particle absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${position}%`,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div ref={contentRef}>
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight font-[family-name:var(--font-fraunces)]">
            {dict.academy.cta.title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-dm-sans)]">
            {dict.academy.cta.description}
          </p>

          {/* CTA Button - Matching Program Cards Style */}
          <button
            onClick={scrollToPrograms}
            className="inline-block group"
          >
            <div
              ref={buttonRef}
              className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-500 group-hover:gap-4 group-hover:px-7 md:group-hover:px-9 font-[family-name:var(--font-dm-sans)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #D4A574dd 100%)',
                color: 'white',
                boxShadow: '0 6px 20px rgba(212, 165, 116, 0.4)',
              }}
            >
              <span>{dict.academy.cta.button}</span>
              <svg
                className="button-arrow w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>

        </div>
      </div>

    </section>
  );
}
