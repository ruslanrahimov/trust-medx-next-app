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
          start: 'top 85%',
          once: true,
        },
        immediateRender: false,
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Button hover setup
      if (buttonRef.current) {
        buttonRef.current.addEventListener('mouseenter', () => {
          gsap.to(buttonRef.current, {
            scale: 1.03,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
          gsap.to('.button-arrow', {
            x: 5,
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
      className="relative py-16 md:py-20 overflow-hidden bg-[#FEFBF6]"
    >
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#5FA8A3]/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#D4A574]/8 blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((position, i) => (
          <div
            key={i}
            className="cta-particle absolute w-2 h-2 bg-[#5FA8A3]/20 rounded-full"
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A3B2C] mb-5 leading-tight font-[family-name:var(--font-fraunces)]">
            {dict.academy.cta.title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-[#4A3B2C]/70 mb-8 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-dm-sans)]">
            {dict.academy.cta.description}
          </p>

          {/* CTA Button — Secondary style */}
          <button
            ref={buttonRef}
            onClick={scrollToPrograms}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#4A3B2C]/20 bg-white/80 text-[#4A3B2C] font-semibold backdrop-blur-sm transition-all duration-300 hover:border-[#5FA8A3] hover:bg-white hover:-translate-y-1 hover:shadow-lg font-[family-name:var(--font-dm-sans)] cursor-pointer"
          >
            <span>{dict.academy.cta.button}</span>
            <svg
              className="button-arrow w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>

    </section>
  );
}
