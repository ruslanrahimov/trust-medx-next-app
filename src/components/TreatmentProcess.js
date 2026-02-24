'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TreatmentProcess({ dict, lang }) {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);
  const stepsRef = useRef([]);
  const dotsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated progress line
      gsap.to(progressLineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        scaleY: 1,
        ease: 'none',
      });

      // Animate dots and cards
      stepsRef.current.forEach((step, index) => {
        if (step && dotsRef.current[index]) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              onEnter: () => setActiveStep(index),
            },
          });

          // Dot animation
          tl.from(dotsRef.current[index], {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          });

          // Card animation - alternate from left/right
          tl.from(
            step,
            {
              opacity: 0,
              x: index % 2 === 0 ? -50 : 50,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.3'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      ),
      title: dict.treatmentAbroad.process.steps[0].title,
      description: dict.treatmentAbroad.process.steps[0].description,
      color: '#5FA8A3',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      title: dict.treatmentAbroad.process.steps[1].title,
      description: dict.treatmentAbroad.process.steps[1].description,
      color: '#D4A574',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: dict.treatmentAbroad.process.steps[2].title,
      description: dict.treatmentAbroad.process.steps[2].description,
      color: '#5FA8A3',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: dict.treatmentAbroad.process.steps[3].title,
      description: dict.treatmentAbroad.process.steps[3].description,
      color: '#D4A574',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-[#F8F5EE] to-[#FAF8F0] overflow-hidden"
    >
      {/* Organic blob background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-[50%_60%_70%_40%/60%_30%_50%_70%] bg-gradient-to-br from-[#5FA8A3]/6 to-[#D4A574]/4 blur-3xl animate-breathe" />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle, #4A3B2C 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B2C] mb-6 font-[family-name:var(--font-fraunces)]">
            {dict.treatmentAbroad.process.title}
          </h2>
          <p className="text-lg md:text-xl text-[#4A3B2C]/70 max-w-2xl mx-auto font-[family-name:var(--font-dm-sans)]">
            {dict.treatmentAbroad.process.subtitle}
          </p>

          {/* Minimalist divider */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
            <div className="w-1 h-1 rounded-full bg-[#4A3B2C]/30" />
            <div className="w-16 h-px bg-[#4A3B2C]/10" />
          </div>
        </div>

        {/* Roadmap */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block">
            {/* Base line */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5FA8A3]/20 via-[#D4A574]/20 to-[#5FA8A3]/20" />
            {/* Animated progress line */}
            <div
              ref={progressLineRef}
              className="absolute inset-0 bg-gradient-to-b from-[#5FA8A3] via-[#D4A574] to-[#5FA8A3] origin-top scale-y-0"
            />
          </div>

          {/* Mobile line (left side) */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 md:hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#5FA8A3]/20 via-[#D4A574]/20 to-[#5FA8A3]/20" />
            <div
              ref={progressLineRef}
              className="absolute inset-0 bg-gradient-to-b from-[#5FA8A3] via-[#D4A574] to-[#5FA8A3] origin-top scale-y-0"
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`relative flex items-center gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Card */}
                <div
                  className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="group relative p-6 md:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#4A3B2C]/10 hover:border-[#5FA8A3]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    {/* Gradient overlay on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}08 0%, transparent 100%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Step number badge */}
                      <div
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 font-bold text-white shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                        }}
                      >
                        <span className="font-[family-name:var(--font-dm-sans)]">
                          {index + 1}
                        </span>
                      </div>

                      {/* Icon container */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundColor: `${step.color}15`,
                          border: `2px solid ${step.color}30`,
                        }}
                      >
                        <div style={{ color: step.color }}>{step.icon}</div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl md:text-3xl font-bold text-[#4A3B2C] mb-3 font-[family-name:var(--font-fraunces)]">
                        {step.title}
                      </h3>
                      <p className="text-base text-[#4A3B2C]/70 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative corner */}
                    <div
                      className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </div>

                {/* Center dot */}
                <div
                  ref={(el) => (dotsRef.current[index] = el)}
                  className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-white shadow-lg z-10"
                  style={{
                    backgroundColor: activeStep >= index ? step.color : '#E5E5E5',
                  }}
                >
                  {/* Pulse effect */}
                  {activeStep === index && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: step.color, opacity: 0.4 }}
                    />
                  )}
                </div>

                {/* Spacer for opposite side on desktop */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.8;
          }
        }

        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
