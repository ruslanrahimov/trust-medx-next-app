'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutStats({ dict }) {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [animatedNumbers, setAnimatedNumbers] = useState([]);

  useEffect(() => {
    // Initialize animated numbers
    setAnimatedNumbers(dict.aboutPage.stats.items.map(() => 0));

    const ctx = gsap.context(() => {
      // Animate each stat card
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          // Card entrance animation
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
          });

          // Number counter animation
          const targetNumber = parseInt(dict.aboutPage.stats.items[index].number);

          ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(
                {},
                {
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function () {
                    const progress = this.progress();
                    const currentNumber = Math.floor(targetNumber * progress);
                    setAnimatedNumbers((prev) => {
                      const newNumbers = [...prev];
                      newNumbers[index] = currentNumber;
                      return newNumbers;
                    });
                  },
                }
              );
            },
            once: true,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [dict]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C5F5D 0%, #4A3B2C 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#5FA8A3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl" />

        {/* Geometric pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #5FA8A3 12%, transparent 12.5%, transparent 87%, #5FA8A3 87.5%, #5FA8A3),
              linear-gradient(150deg, #5FA8A3 12%, transparent 12.5%, transparent 87%, #5FA8A3 87.5%, #5FA8A3),
              linear-gradient(30deg, #5FA8A3 12%, transparent 12.5%, transparent 87%, #5FA8A3 87.5%, #5FA8A3),
              linear-gradient(150deg, #5FA8A3 12%, transparent 12.5%, transparent 87%, #5FA8A3 87.5%, #5FA8A3)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
            <span className="text-sm font-medium text-white/90 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.stats.badge}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
            }}
          >
            {dict.aboutPage.stats.title}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dict.aboutPage.stats.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#5FA8A3]/20">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5FA8A3]/0 to-[#D4A574]/0 group-hover:from-[#5FA8A3]/10 group-hover:to-[#D4A574]/10 transition-all duration-500 pointer-events-none" />

                {/* Number */}
                <div className="relative mb-2">
                  <span
                    className="text-5xl md:text-6xl font-bold text-white"
                    style={{
                      fontFamily: "'Crimson Pro', Georgia, serif",
                    }}
                  >
                    {animatedNumbers[index]?.toLocaleString() || 0}
                  </span>
                  <span
                    className="text-4xl md:text-5xl font-bold text-[#5FA8A3]"
                    style={{
                      fontFamily: "'Crimson Pro', Georgia, serif",
                    }}
                  >
                    {item.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3
                  className="text-xl md:text-2xl font-semibold text-white mb-2"
                  style={{
                    fontFamily: "'Crimson Pro', Georgia, serif",
                  }}
                >
                  {item.label}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm font-[family-name:var(--font-dm-sans)]">
                  {item.description}
                </p>

                {/* Decorative corner glow */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-tl from-[#5FA8A3]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon decoration */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    {index === 0 && (
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    )}
                    {index === 1 && (
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                        clipRule="evenodd"
                      />
                    )}
                    {index === 2 && (
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    )}
                    {index === 3 && (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
