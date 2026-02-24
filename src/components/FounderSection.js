'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Lightbulb, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FounderSection({ dict }) {
  const sectionRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sections animation
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
            opacity: 0,
            y: 60,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-[#FEFBF6] to-white"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-bl from-[#D4A574]/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-gradient-to-tr from-[#5FA8A3]/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#5FA8A3]/30 shadow-lg mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5FA8A3] animate-pulse" />
            <span className="text-sm font-semibold text-[#4A3B2C]/80 uppercase tracking-wider">
              {dict.aboutPage.founder.badge}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C]"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {dict.aboutPage.founder.title}
          </h2>
        </div>

        {/* Intro Card */}
        <div
          ref={(el) => (sectionsRef.current[0] = el)}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="relative p-10 md:p-12 bg-white rounded-[2.5rem] border border-[#4A3B2C]/10 shadow-xl">
            {/* Name and Title */}
            <div className="flex items-start gap-6 mb-8">
              {/* Avatar Placeholder */}
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] shadow-lg flex items-center justify-center">
                <Users className="w-10 h-10 text-white" strokeWidth={2} />
              </div>

              {/* Name Info */}
              <div className="flex-1">
                <h3
                  className="text-3xl md:text-4xl font-bold text-[#4A3B2C] mb-2"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {dict.aboutPage.founder.name}
                </h3>
                <p className="text-lg text-[#5FA8A3] font-semibold mb-1">
                  {dict.aboutPage.founder.role}
                </p>
                <p className="text-sm text-[#D4A574] font-medium">
                  {dict.aboutPage.founder.experience}
                </p>
              </div>
            </div>

            {/* Intro Text */}
            <p className="text-lg text-[#4A3B2C]/80 leading-relaxed">
              {dict.aboutPage.founder.intro}
            </p>

            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#5FA8A3]/20 to-transparent rounded-[2rem] -z-10 blur-xl" />
          </div>
        </div>

        {/* Story Section - Two Column */}
        <div
          ref={(el) => (sectionsRef.current[1] = el)}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Story */}
            <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#FEFBF6] to-white rounded-[2rem] border border-[#4A3B2C]/10 shadow-lg">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#5FA8A3]/20 mb-6">
                <Heart className="w-4 h-4 text-[#5FA8A3]" />
                <span className="text-sm font-semibold text-[#5FA8A3] uppercase tracking-wider">
                  История создания
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-base text-[#4A3B2C]/70 leading-relaxed">
                  {dict.aboutPage.founder.story}
                </p>
                <p className="text-base text-[#4A3B2C]/70 leading-relaxed">
                  {dict.aboutPage.founder.motivation}
                </p>
              </div>
            </div>

            {/* Right - Approach */}
            <div className="relative p-8 md:p-10 bg-gradient-to-br from-white to-[#FEFBF6] rounded-[2rem] border border-[#4A3B2C]/10 shadow-lg">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D4A574]/20 mb-6">
                <Lightbulb className="w-4 h-4 text-[#D4A574]" />
                <span className="text-sm font-semibold text-[#D4A574] uppercase tracking-wider">
                  Подход к работе
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-base text-[#4A3B2C]/70 leading-relaxed">
                  {dict.aboutPage.founder.approach}
                </p>
                <p className="text-base text-[#4A3B2C]/70 leading-relaxed">
                  {dict.aboutPage.founder.today}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy - Feature Card */}
        <div
          ref={(el) => (sectionsRef.current[2] = el)}
          className="max-w-5xl mx-auto"
        >
          <div className="relative p-10 md:p-14 bg-gradient-to-br from-[#5FA8A3]/10 via-white to-[#D4A574]/10 rounded-[2.5rem] border-2 border-[#4A3B2C]/10 shadow-2xl overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#5FA8A3]/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#D4A574]/20 to-transparent rounded-full blur-3xl" />

            {/* Icon */}
            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] shadow-xl">
              <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            {/* Title */}
            <h3
              className="relative text-2xl md:text-3xl font-bold text-[#4A3B2C] mb-6"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Философия работы
            </h3>

            {/* Philosophy Text */}
            <p className="relative text-lg md:text-xl text-[#4A3B2C]/80 leading-relaxed font-medium">
              {dict.aboutPage.founder.philosophy}
            </p>

            {/* Decorative line */}
            <div className="relative w-24 h-1 bg-gradient-to-r from-[#5FA8A3] to-[#D4A574] rounded-full mt-8" />
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
