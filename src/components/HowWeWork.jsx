'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ClipboardList, UserCheck, Check, ShieldCheck, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [MessageCircle, ClipboardList, UserCheck];

function PricingBlock({ step }) {
  if (!step.pricingTiers || step.pricingTiers.length === 0) return null;

  return (
    <div className="mt-5 pt-5 border-t border-[#2C5F5D]/10">
      {step.pricingLabel && (
        <p
          className="text-sm font-semibold text-[#2D3748] mb-3"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {step.pricingLabel}
        </p>
      )}
      <div className="space-y-3">
        {step.pricingTiers.map((tier, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3.5 rounded-xl border border-[#2C5F5D]/10"
            style={{
              background:
                i === 0
                  ? 'linear-gradient(135deg, rgba(44,95,93,0.06) 0%, rgba(95,168,163,0.04) 100%)'
                  : 'linear-gradient(135deg, rgba(212,165,116,0.07) 0%, rgba(150,114,89,0.04) 100%)',
            }}
          >
            <div
              className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5"
              style={{ background: i === 0 ? '#5FA8A3' : '#D4A574' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-0.5">
                <span
                  className="font-semibold text-sm text-[#2D3748]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tier.label}
                </span>
                <span
                  className="font-bold text-base"
                  style={{
                    fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                    color: i === 0 ? '#2C5F5D' : '#967259',
                  }}
                >
                  {tier.price}
                </span>
              </div>
              {tier.note && (
                <p
                  className="text-xs text-[#718096] leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tier.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {step.pricingFootnote && (
        <p
          className="text-xs text-[#718096] mt-3 italic"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {step.pricingFootnote}
        </p>
      )}
    </div>
  );
}

function StepCard({ step, index }) {
  const Icon = STEP_ICONS[index] || MessageCircle;
  const isRight = index % 2 !== 0;

  return (
    <div
      className={`hww-step relative flex flex-col ${
        isRight ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-start md:items-center gap-6 md:gap-0`}
    >
      {/* Center number bubble (desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
        <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#2C5F5D] to-[#4A9691] shadow-[0_8px_28px_rgba(44,95,93,0.35)] flex items-center justify-center ring-4 ring-[#FEFBF6]">
          <span
            className="text-white font-bold text-sm leading-none"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {step.number}
          </span>
        </div>
      </div>

      {/* Card — occupies one half, offset away from the center line */}
      <div className="w-full md:w-[calc(50%-42px)]">
        <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-[#2C5F5D]/15 p-7 md:p-8 hover:shadow-[0_20px_60px_rgba(44,95,93,0.13)] hover:border-[#2C5F5D]/28 transition-all duration-500">

          {/* Mobile: number + badge row */}
          <div className="md:hidden flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2C5F5D] to-[#4A9691] flex items-center justify-center flex-shrink-0">
              <span
                className="text-white font-bold text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.number}
              </span>
            </div>
            {step.badge && (
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: index === 0 ? 'rgba(44,95,93,0.08)' : 'rgba(212,165,116,0.10)',
                  color: index === 0 ? '#2C5F5D' : '#967259',
                  borderColor: index === 0 ? 'rgba(44,95,93,0.18)' : 'rgba(212,165,116,0.22)',
                }}
              >
                {step.badge}
              </span>
            )}
          </div>

          {/* Desktop badge pill */}
          {step.badge && (
            <div className="hidden md:block absolute -top-3.5 right-6 z-10">
              <span
                className="px-4 py-1.5 rounded-full text-xs font-semibold shadow-md"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background:
                    index === 0
                      ? 'linear-gradient(135deg, #2C5F5D, #4A9691)'
                      : 'linear-gradient(135deg, #D4A574, #C89563)',
                  color: '#fff',
                  boxShadow:
                    index === 0
                      ? '0 4px 14px rgba(44,95,93,0.35)'
                      : '0 4px 14px rgba(212,165,116,0.35)',
                }}
              >
                {step.badge}
              </span>
            </div>
          )}

          {/* Icon + title row */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#2C5F5D]/10 to-[#D4A574]/10 border border-[#2C5F5D]/10 flex items-center justify-center group-hover:from-[#2C5F5D]/16 group-hover:to-[#D4A574]/16 transition-all duration-300">
              <Icon className="w-5 h-5 text-[#2C5F5D]" />
            </div>
            <h3
              className="text-xl md:text-2xl font-bold text-[#2D3748] leading-tight pt-0.5"
              style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
            >
              {step.title}
            </h3>
          </div>

          {/* Description */}
          {step.description && (
            <p
              className="text-[#718096] leading-relaxed mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step.description}
            </p>
          )}

          {/* Bullet points */}
          {step.points && step.points.length > 0 && (
            <ul className="space-y-2 mb-4">
              {step.points.map((point, pi) => (
                <li key={pi} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#5FA8A3] flex-shrink-0 mt-0.5" />
                  <span
                    className="text-sm text-[#4A5568] leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Note box */}
          {step.note && (
            <div className="p-4 rounded-xl bg-[#2C5F5D]/5 border border-[#2C5F5D]/10 mb-4">
              <p
                className="text-sm text-[#4A5568] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.note}
              </p>
            </div>
          )}

          {/* Result line */}
          {step.result && (
            <div className="flex items-start gap-2 mt-1">
              <ChevronRight className="w-4 h-4 text-[#D4A574] flex-shrink-0 mt-0.5" />
              <p
                className="text-sm text-[#718096] italic leading-relaxed"
                style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
              >
                {step.result}
              </p>
            </div>
          )}

          {/* Pricing */}
          <PricingBlock step={step} />

          {/* Bottom hover accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl bg-gradient-to-r from-[#2C5F5D] via-[#D4A574] to-[#2C5F5D] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Empty spacer for the other half (desktop alternating layout) */}
      <div className="hidden md:block w-[calc(50%-42px)]" />
    </div>
  );
}

export default function HowWeWork({ dict, lang }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isRTL = lang === 'ar';

  const data = dict?.pages?.forPatients?.howWeWork || {};

  const badge = data.badge || 'Как мы работаем';
  const title = data.title || 'Как мы работаем';
  const subtitle =
    data.subtitle ||
    'Мы выстроили прозрачную и понятную систему сотрудничества, чтобы вы заранее понимали этапы работы, объём услуг и их стоимость.';
  const steps = data.steps || [];
  const importantTitle = data.importantTitle || 'Важно';
  const importantItems = data.importantItems || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hww-header-inner', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 86%', once: true },
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.from('.hww-title', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 83%', once: true },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
      });
      gsap.from('.hww-subtitle', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.hww-step').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          duration: 0.85,
          ease: 'power3.out',
        });
      });

      gsap.from('.hww-important', {
        scrollTrigger: { trigger: '.hww-important', start: 'top 82%', once: true },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-32 px-4 md:px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFBF6] via-[#F7F3EC] to-[#FEFBF6]" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-[5%] w-[480px] h-[480px] bg-[#2C5F5D] rounded-full blur-[160px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[480px] h-[480px] bg-[#D4A574] rounded-full blur-[160px] opacity-[0.05] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #2C5F5D 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Vertical accent lines */}
      <div className="absolute top-0 left-[18%] w-px h-48 bg-gradient-to-b from-transparent via-[#2C5F5D]/15 to-transparent" />
      <div className="absolute bottom-0 right-[22%] w-px h-48 bg-gradient-to-t from-transparent via-[#D4A574]/15 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <div className="hww-header-inner flex items-center justify-center mb-5">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#2C5F5D]/40" />
            <div className="mx-3 flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse" />
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#D4A574] animate-pulse"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse"
                style={{ animationDelay: '300ms' }}
              />
            </div>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#2C5F5D]/40" />
          </div>

          <div className="hww-header-inner inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2C5F5D]/8 border border-[#2C5F5D]/20 mb-5">
            <span
              className="text-xs font-semibold text-[#2C5F5D] uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {badge}
            </span>
          </div>

          <h2
            className="hww-title text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D3748] mb-5 leading-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            {title}
          </h2>

          <p
            className="hww-subtitle text-base md:text-lg text-[#718096] max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Center vertical connector line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#2C5F5D]/25 to-transparent pointer-events-none" />

          <div className="flex flex-col gap-10 md:gap-16">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Important callout */}
        {importantItems.length > 0 && (
          <div className="hww-important mt-16 md:mt-24">
            <div
              className="relative rounded-2xl overflow-hidden p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 65%, #1e3533 100%)',
              }}
            >
              {/* Orbs */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#5FA8A3]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#D4A574]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Grain overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#7EBDB8]" />
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-white"
                    style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
                  >
                    {importantTitle}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {importantItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5FA8A3]/25 border border-[#5FA8A3]/40 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-[#7EBDB8]" />
                      </div>
                      <p
                        className="text-sm text-white/80 leading-relaxed"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
