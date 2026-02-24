'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutStory({ dict }) {
  const sectionRef = useRef(null);
  const timelineItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline items
      timelineItemsRef.current.forEach((item, index) => {
        if (item) {
          const isEven = index % 2 === 0;

          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
            opacity: 0,
            x: isEven ? -60 : 60,
            y: 30,
            duration: 1,
            ease: 'power3.out',
          });

          // Animate the connecting line
          const line = item.querySelector('.timeline-line');
          if (line) {
            gsap.from(line, {
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
              },
              scaleY: 0,
              duration: 0.8,
              ease: 'power2.out',
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#FAF8F0] via-[#FEFBF6] to-white"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-[#D4A574]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-[#5FA8A3]/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#5FA8A3]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
            <span className="text-sm font-medium text-[#4A3B2C]/80 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.story.badge}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-4 font-[family-name:var(--font-fraunces)]"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
            }}
          >
            {dict.aboutPage.story.title}
          </h2>

          <p className="text-lg text-[#4A3B2C]/60 max-w-2xl mx-auto font-[family-name:var(--font-dm-sans)]">
            {dict.aboutPage.story.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5FA8A3]/20 via-[#D4A574]/20 to-[#5FA8A3]/20 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {dict.aboutPage.story.timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (timelineItemsRef.current[index] = el)}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-[#4A3B2C]/10 shadow-lg shadow-[#4A3B2C]/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                      {/* Year Badge */}
                      <div className="inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-[#5FA8A3] to-[#4A9691] shadow-md">
                        <span
                          className="text-xl font-bold text-white"
                          style={{
                            fontFamily: "'Crimson Pro', Georgia, serif",
                          }}
                        >
                          {item.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-2xl md:text-3xl font-bold text-[#4A3B2C] mb-3"
                        style={{
                          fontFamily: "'Crimson Pro', Georgia, serif",
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                        {item.description}
                      </p>

                      {/* Decorative gradient */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5FA8A3]/0 to-[#D4A574]/0 group-hover:from-[#5FA8A3]/5 group-hover:to-[#D4A574]/5 transition-all duration-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex w-2/12 justify-center relative">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-[#5FA8A3] shadow-lg z-10">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5FA8A3] to-[#4A9691]" />
                    </div>

                    {/* Connecting line */}
                    {index < dict.aboutPage.story.timeline.length - 1 && (
                      <div
                        className="timeline-line absolute top-16 left-1/2 w-0.5 h-24 bg-gradient-to-b from-[#5FA8A3]/30 to-transparent -translate-x-1/2"
                        style={{ transformOrigin: 'top' }}
                      />
                    )}
                  </div>

                  {/* Image Placeholder */}
                  <div className="w-full md:w-5/12">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#5FA8A3]/20 to-[#D4A574]/20 shadow-lg">
                      {/* Placeholder pattern */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          {/* Decorative circles */}
                          <div
                            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${
                                index % 2 === 0 ? '#5FA8A3' : '#D4A574'
                              }40, transparent)`,
                            }}
                          />
                          <div
                            className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full"
                            style={{
                              background: `linear-gradient(225deg, ${
                                index % 2 === 0 ? '#D4A574' : '#5FA8A3'
                              }30, transparent)`,
                            }}
                          />

                          {/* Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-white/40"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Text overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#4A3B2C]/20 to-transparent">
                        <span className="text-white/60 text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                          Image Placeholder
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
