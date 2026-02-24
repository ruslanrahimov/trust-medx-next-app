'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutTeam({ dict }) {
  const sectionRef = useRef(null);
  const membersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate team members
      membersRef.current.forEach((member, index) => {
        if (member) {
          gsap.from(member, {
            scrollTrigger: {
              trigger: member,
              start: 'top 85%',
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Gradient colors for placeholder avatars
  const gradients = [
    'from-[#5FA8A3] to-[#4A9691]',
    'from-[#D4A574] to-[#C89A6B]',
    'from-[#7EBDB8] to-[#5FA8A3]',
    'from-[#E8C9A0] to-[#D4A574]',
    'from-[#4A9691] to-[#2C5F5D]',
    'from-[#C89A6B] to-[#B8895B]',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#FAF8F0] via-white to-[#FEFBF6]"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-bl from-[#D4A574]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-gradient-to-tr from-[#5FA8A3]/10 to-transparent rounded-full blur-3xl" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#5FA8A3]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
            <span className="text-sm font-medium text-[#4A3B2C]/80 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
              {dict.aboutPage.team.badge}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-4"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
            }}
          >
            {dict.aboutPage.team.title}
          </h2>

          <p className="text-lg text-[#4A3B2C]/60 max-w-3xl mx-auto font-[family-name:var(--font-dm-sans)]">
            {dict.aboutPage.team.subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {dict.aboutPage.team.members.map((member, index) => (
            <div
              key={index}
              ref={(el) => (membersRef.current[index] = el)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-[#4A3B2C]/10 shadow-lg shadow-[#4A3B2C]/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#5FA8A3]/10 hover:-translate-y-3">
                {/* Avatar/Photo Placeholder */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
                  />

                  {/* Decorative circles */}
                  <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

                  {/* User silhouette icon */}
                  <div className="absolute inset-0 flex items-end justify-center pb-8">
                    <svg
                      className="w-32 h-32 text-white/30"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B2C]/40 via-transparent to-transparent" />

                  {/* "Photo Placeholder" label */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs text-white/60 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm font-[family-name:var(--font-dm-sans)]">
                      Photo Placeholder
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="relative p-6">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5FA8A3]/0 to-[#D4A574]/0 group-hover:from-[#5FA8A3]/5 group-hover:to-[#D4A574]/5 transition-all duration-500 pointer-events-none rounded-b-3xl" />

                  {/* Name */}
                  <h3
                    className="relative text-2xl font-bold text-[#4A3B2C] mb-2"
                    style={{
                      fontFamily: "'Crimson Pro', Georgia, serif",
                    }}
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="relative text-[#5FA8A3] font-semibold mb-2 font-[family-name:var(--font-dm-sans)]">
                    {member.role}
                  </p>

                  {/* Specialty */}
                  <p className="relative text-sm text-[#4A3B2C]/60 font-[family-name:var(--font-dm-sans)]">
                    {member.specialty}
                  </p>

                  {/* Decorative accent line */}
                  <div className="relative mt-4 w-16 h-1 bg-gradient-to-r from-[#5FA8A3] to-[#D4A574] rounded-full opacity-60 group-hover:w-24 group-hover:opacity-100 transition-all duration-500" />
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-[#5FA8A3]/0 group-hover:border-[#5FA8A3]/20 transition-all duration-500 pointer-events-none" />
              </div>

              {/* Shadow element */}
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-[#5FA8A3]/5 to-[#D4A574]/5 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-[#4A3B2C]/60 mb-6 font-[family-name:var(--font-dm-sans)]">
            Join our growing team of healthcare professionals
          </p>
          <a
            href="#careers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#5FA8A3] to-[#4A9691] text-white font-semibold shadow-lg shadow-[#5FA8A3]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#5FA8A3]/40 hover:-translate-y-1 font-[family-name:var(--font-dm-sans)]"
          >
            View Open Positions
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
