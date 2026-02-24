'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Search, Plane, HeartPulse, Headphones, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS = [MessageSquare, Search, Plane, HeartPulse, Headphones];
const STEP_COLORS = ['#5FA8A3', '#D4A574', '#4A3B2C', '#5FA8A3', '#D4A574'];
const STEP_BACKGROUNDS = [
  'rgba(255, 255, 255, 0.94)',
  'rgba(255, 255, 255, 0.94)',
  'rgba(255, 255, 255, 0.94)',
];

const getStepColor = (index) => STEP_COLORS[index % STEP_COLORS.length];
const getStepIcon = (index) => ICONS[index % ICONS.length];
const getStepBackground = (index) => STEP_BACKGROUNDS[index % STEP_BACKGROUNDS.length];

export default function ProcessSteps({ dict }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepRefs = useRef([]);
  const connectorRef = useRef(null);
  const desktopCardRefs = useRef([]);
  const mobileCardRefs = useRef([]);
  const [equalHeights, setEqualHeights] = useState({ desktop: null, mobile: null });
  const process = dict.howWeWork;
  const badgeLabel = process.badge || 'Процесс работы';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 48, duration: 0.9, ease: 'power3.out',
      });

      if (connectorRef.current) {
        gsap.from(connectorRef.current, {
          scrollTrigger: { trigger: connectorRef.current, start: 'top 75%', once: true },
          scaleX: 0, transformOrigin: 'left center',
          duration: 1.4, ease: 'power2.inOut',
        });
      }

      const validSteps = stepRefs.current.filter(Boolean);
      if (validSteps.length) {
        gsap.from(validSteps, {
          scrollTrigger: { trigger: validSteps[0], start: 'top 80%', once: true },
          opacity: 0, y: 56, duration: 0.75, stagger: 0.14, ease: 'power3.out',
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const getMaxHeight = (elements) => {
      const heights = elements.filter(Boolean).map((el) => el.offsetHeight || 0);
      return heights.length ? Math.max(...heights) : null;
    };

    const measure = () => {
      const desktopMax = getMaxHeight(desktopCardRefs.current);
      const mobileMax = getMaxHeight(mobileCardRefs.current);

      setEqualHeights((prev) => {
        if (prev.desktop === desktopMax && prev.mobile === mobileMax) return prev;
        return { desktop: desktopMax, mobile: mobileMax };
      });
    };

    measure();
    window.addEventListener('resize', measure);

    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure);
      desktopCardRefs.current.filter(Boolean).forEach((el) => observer.observe(el));
      mobileCardRefs.current.filter(Boolean).forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener('resize', measure);
      if (observer) observer.disconnect();
    };
  }, [process.steps]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEFBF6 0%, #F8F5EE 100%)' }}
    >
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(95,168,163,0.22) 0%, rgba(95,168,163,0) 70%)' }}
      />
      <div
        className="absolute -bottom-28 -right-28 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.24) 0%, rgba(212,165,116,0) 72%)' }}
      />

      <span
        className="absolute top-0 right-8 font-bold leading-none select-none pointer-events-none z-0"
        style={{
          fontSize: '12rem', color: 'rgba(74, 59, 44, 0.04)',
          fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
        }}
      >
        03
      </span>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-20 md:mb-28">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 border"
            style={{ background: 'rgba(95, 168, 163, 0.10)', borderColor: 'rgba(95, 168, 163, 0.25)' }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#5FA8A3' }} strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#5FA8A3', fontFamily: "'DM Sans', sans-serif" }}>
              {badgeLabel}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{ color: '#4A3B2C', fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
            {process.title}
          </h2>

          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(74, 59, 44, 0.58)', fontFamily: "'DM Sans', sans-serif" }}>
            {process.subtitle}
          </p>
        </div>

        <div className="hidden lg:block relative">
          <div
            ref={connectorRef}
            className="absolute z-0"
            style={{
              top: '28px',
              left: 'calc(10% + 26px)',
              right: 'calc(10% + 26px)',
              height: '3px',
              background: 'linear-gradient(90deg, #5FA8A3 0%, #D4A574 50%, #5FA8A3 100%)',
              opacity: 0.28,
              borderRadius: '999px',
            }}
          />
          <div className="absolute left-[10%] right-[10%] top-[24px] h-[10px] z-0 flex items-center justify-between px-3">
            {process.steps.map((_, index) => (
              <span
                key={`dot-${index}`}
                className="w-3.5 h-3.5 rounded-full border-2"
                style={{
                  background: '#FEFBF6',
                  borderColor: getStepColor(index),
                  boxShadow: `0 0 0 4px ${getStepColor(index)}20`,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-3 relative z-10 items-start">
            {process.steps.map((step, index) => {
              const Icon = getStepIcon(index);
              const circleColor = getStepColor(index);
              return (
                <div
                  key={index}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="group flex flex-col items-center text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg mb-5 shrink-0 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(140deg, ${circleColor} 0%, ${circleColor}cc 100%)`,
                      boxShadow: `0 10px 24px ${circleColor}40`,
                    }}
                  >
                    <span className="text-base font-bold text-white"
                      style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
                      {index + 1}
                    </span>
                  </div>

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-105"
                    style={{
                      background: `${circleColor}1F`,
                      boxShadow: `inset 0 0 0 1px ${circleColor}26`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: circleColor }} strokeWidth={1.75} />
                  </div>

                  <div
                    ref={(el) => (desktopCardRefs.current[index] = el)}
                    className="relative w-full rounded-2xl px-5 py-6 transition-all duration-500 cursor-default border overflow-hidden group-hover:-translate-y-1 min-h-[210px] h-full flex flex-col"
                    style={{
                      height: equalHeights.desktop ? `${equalHeights.desktop}px` : undefined,
                      borderColor: `${circleColor}26`,
                      background: getStepBackground(index),
                      boxShadow: `0 10px 28px ${circleColor}14`,
                    }}
                  >
                    <span className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `${circleColor}40` }} />
                    <h3 className="text-lg xl:text-xl font-bold mb-2 leading-snug"
                      style={{ color: '#4A3B2C', fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1"
                      style={{ color: 'rgba(74, 59, 44, 0.60)', fontFamily: "'DM Sans', sans-serif" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:hidden relative">
          <div
            className="absolute left-[1.4rem] top-6 bottom-6 w-[3px] rounded-full"
            style={{ background: 'linear-gradient(180deg, #5FA8A3 0%, #D4A574 50%, #5FA8A3 100%)', opacity: 0.25 }}
          />

          <div className="space-y-7">
            {process.steps.map((step, index) => {
              const Icon = getStepIcon(index);
              const circleColor = getStepColor(index);
              return (
                <div key={index}
                  ref={(el) => { if (!stepRefs.current[index]) stepRefs.current[index] = el; }}
                  className="flex items-start gap-5 relative"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-md shrink-0 z-10"
                    style={{
                      background: `linear-gradient(140deg, ${circleColor} 0%, ${circleColor}d6 100%)`,
                      boxShadow: `0 8px 20px ${circleColor}38`,
                    }}
                  >
                    <span className="text-base font-bold text-white"
                      style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
                      {index + 1}
                    </span>
                  </div>

                  <div
                    ref={(el) => (mobileCardRefs.current[index] = el)}
                    className="flex-1 rounded-2xl px-5 py-5 border overflow-hidden min-h-[180px] h-full flex flex-col"
                    style={{
                      height: equalHeights.mobile ? `${equalHeights.mobile}px` : undefined,
                      borderColor: `${circleColor}22`,
                      background: getStepBackground(index),
                      boxShadow: `0 6px 22px ${circleColor}14`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${circleColor}1F`, boxShadow: `inset 0 0 0 1px ${circleColor}24` }}>
                        <Icon className="w-4 h-4" style={{ color: circleColor }} strokeWidth={1.75} />
                      </div>
                      <h3 className="text-xl font-bold leading-snug"
                        style={{ color: '#4A3B2C', fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed flex-1"
                      style={{ color: 'rgba(74, 59, 44, 0.60)', fontFamily: "'DM Sans', sans-serif" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
