'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircle,
  ClipboardList,
  UserCheck,
  Check,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [MessageCircle, ClipboardList, UserCheck];

/* ─── StepNode ─── */
function StepNode({ number, gold = false }) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center z-10 relative ring-4 ring-[#FEFBF6]"
        style={{
          background: gold
            ? 'linear-gradient(135deg, #D4A574, #C89563)'
            : 'linear-gradient(135deg, #2C5F5D, #4A9691)',
          boxShadow: gold
            ? '0 6px 24px rgba(212,165,116,0.35)'
            : '0 6px 24px rgba(44,95,93,0.3)',
        }}
      >
        <span
          className="text-white font-bold text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {number}
        </span>
      </div>
      <div
        className="absolute inset-0 rounded-full opacity-20 animate-ping"
        style={{
          background: gold
            ? 'linear-gradient(135deg, #D4A574, #C89563)'
            : 'linear-gradient(135deg, #2C5F5D, #4A9691)',
          animationDuration: gold ? '3s' : '2.8s',
        }}
      />
    </div>
  );
}

/* ─── Desktop: Step 01 — compact top-left light card ─── */
function DesktopCard01({ step }) {
  const Icon = STEP_ICONS[0];

  return (
    <div className="hww-card-01 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-5">
        <StepNode number={step.number} />
        {step.badge && (
          <span
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: 'linear-gradient(135deg, #2C5F5D, #4A9691)',
              color: '#fff',
              boxShadow: '0 3px 12px rgba(44,95,93,0.3)',
            }}
          >
            {step.badge}
          </span>
        )}
      </div>

      <div
        className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-[#2C5F5D]/12
          p-6 flex-1 flex flex-col hover:shadow-[0_20px_56px_rgba(44,95,93,0.12)]
          hover:border-[#2C5F5D]/22 transition-all duration-500"
      >
        {/* Watermark */}
        <div
          className="absolute top-3 right-4 text-8xl font-bold leading-none select-none pointer-events-none"
          style={{
            fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
            color: '#2C5F5D',
            opacity: 0.04,
          }}
        >
          {step.number}
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C5F5D]/10
              to-[#D4A574]/08 border border-[#2C5F5D]/12 flex items-center justify-center
              group-hover:scale-105 transition-transform duration-300"
          >
            <Icon className="w-5 h-5 text-[#2C5F5D]" />
          </div>
          <h3
            className="text-xl font-bold text-[#2D3748] leading-tight pt-0.5"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
          >
            {step.title}
          </h3>
        </div>

        {step.description && (
          <p
            className="text-[#718096] leading-relaxed mb-4 text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {step.description}
          </p>
        )}

        {step.points && step.points.length > 0 && (
          <ul className="space-y-2 mb-4">
            {step.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
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

        {step.note && (
          <div className="p-3.5 rounded-xl bg-[#2C5F5D]/05 border border-[#2C5F5D]/10 mb-3">
            <p
              className="text-sm text-[#4A5568] leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step.note}
            </p>
          </div>
        )}

        {step.result && (
          <div className="mt-auto pt-4">
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-gradient-to-r from-[#2C5F5D]/06 to-transparent border-l-2 border-[#5FA8A3]/50">
              <ChevronRight className="w-4 h-4 text-[#D4A574] flex-shrink-0 mt-0.5" />
              <p
                className="text-sm text-[#718096] italic leading-relaxed"
                style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
              >
                {step.result}
              </p>
            </div>
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl
            bg-gradient-to-r from-[#2C5F5D] via-[#D4A574] to-[#2C5F5D]
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </div>
  );
}

/* ─── Desktop: Step 02 — dark featured top-right ─── */
function DesktopCard02({ step }) {
  const Icon = STEP_ICONS[1];

  return (
    <div className="hww-card-02 flex flex-col">
      <div className="flex items-center gap-4 mb-5">
        <StepNode number={step.number} gold />
        <div className="h-px flex-1 bg-gradient-to-r from-[#D4A574]/30 to-transparent" />
      </div>

      <div
        className="relative rounded-2xl overflow-hidden p-7 flex flex-col"
        style={{ background: 'linear-gradient(160deg, #1a3a38 0%, #2C5F5D 55%, #1e4340 100%)' }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Orbs */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(95,168,163,0.15)' }}
        />
        <div
          className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(212,165,116,0.08)' }}
        />
        {/* Watermark */}
        <div
          className="absolute top-4 right-5 text-8xl font-bold leading-none select-none pointer-events-none"
          style={{
            fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
            color: '#fff',
            opacity: 0.04,
          }}
        >
          {step.number}
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#7EBDB8]" />
            </div>
            <h3
              className="text-xl xl:text-2xl font-bold text-white leading-tight pt-0.5"
              style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
            >
              {step.title}
            </h3>
          </div>

          {step.description && (
            <p
              className="text-white/65 leading-relaxed mb-5 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step.description}
            </p>
          )}

          {step.points && step.points.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 mb-5">
              {step.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#5FA8A3]/20 border border-[#5FA8A3]/35 flex items-center justify-center mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#7EBDB8]" />
                  </div>
                  <span
                    className="text-sm text-white/75 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Pricing */}
          {step.pricingTiers && step.pricingTiers.length > 0 && (
            <div className="pt-5 border-t border-white/10">
              {step.pricingLabel && (
                <p
                  className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-widest"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.pricingLabel}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {step.pricingTiers.map((tier, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border"
                    style={{
                      background: i === 0 ? 'rgba(95,168,163,0.12)' : 'rgba(212,165,116,0.10)',
                      borderColor: i === 0 ? 'rgba(95,168,163,0.25)' : 'rgba(212,165,116,0.25)',
                    }}
                  >
                    <span
                      className="font-bold text-2xl block mb-1"
                      style={{
                        fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                        color: i === 0 ? '#7EBDB8' : '#D4A574',
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      className="font-medium text-sm text-white/80 block mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {tier.label}
                    </span>
                    {tier.note && (
                      <p
                        className="text-xs text-white/45 leading-snug"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {tier.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {step.pricingFootnote && (
                <p
                  className="text-xs text-white/40 mt-3 italic"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.pricingFootnote}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Desktop: Step 03 — wide bottom card (horizontal layout) ─── */
function DesktopCard03({ step }) {
  const Icon = STEP_ICONS[2];

  return (
    <div className="hww-card-03">
      <div className="flex items-center gap-4 mb-5">
        <StepNode number={step.number} />
        {step.badge && (
          <span
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: 'linear-gradient(135deg, #D4A574, #C89563)',
              color: '#fff',
              boxShadow: '0 3px 12px rgba(212,165,116,0.3)',
            }}
          >
            {step.badge}
          </span>
        )}
        <div className="h-px flex-1 bg-gradient-to-r from-[#2C5F5D]/20 to-transparent" />
      </div>

      <div
        className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-[#2C5F5D]/12
          p-6 hover:shadow-[0_20px_56px_rgba(44,95,93,0.11)] hover:border-[#2C5F5D]/22
          transition-all duration-500"
      >
        {/* Watermark */}
        <div
          className="absolute top-3 right-5 text-8xl font-bold leading-none select-none pointer-events-none"
          style={{
            fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
            color: '#D4A574',
            opacity: 0.05,
          }}
        >
          {step.number}
        </div>

        {/* Horizontal interior layout */}
        <div className="relative z-10 grid grid-cols-[1fr_auto] gap-8 items-start">
          {/* Left: icon + title + description + points */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A574]/12
                  to-[#C89563]/06 border border-[#D4A574]/18 flex items-center justify-center
                  group-hover:scale-105 transition-transform duration-300"
              >
                <Icon className="w-5 h-5 text-[#967259]" />
              </div>
              <h3
                className="text-xl font-bold text-[#2D3748] leading-tight pt-0.5"
                style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
              >
                {step.title}
              </h3>
            </div>

            {step.description && (
              <p
                className="text-[#718096] leading-relaxed mb-4 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.description}
              </p>
            )}

            {step.points && step.points.length > 0 && (
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {step.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C89563] flex-shrink-0 mt-0.5" />
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
          </div>

          {/* Right: pricing (vertical, compact) */}
          {step.pricingTiers && step.pricingTiers.length > 0 && (
            <div className="flex-shrink-0 w-56">
              {step.pricingLabel && (
                <p
                  className="text-xs font-semibold text-[#2D3748] mb-3 uppercase tracking-wide"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.pricingLabel}
                </p>
              )}
              <div className="space-y-3">
                {step.pricingTiers.map((tier, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border border-[#D4A574]/20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,165,116,0.08) 0%, rgba(150,114,89,0.04) 100%)',
                    }}
                  >
                    <span
                      className="font-bold text-2xl block mb-0.5"
                      style={{
                        fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                        color: '#967259',
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      className="font-medium text-sm text-[#4A5568] block"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {tier.label}
                    </span>
                    {tier.note && (
                      <p
                        className="text-xs text-[#718096] mt-1 leading-snug"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {tier.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {step.pricingFootnote && (
                <p
                  className="text-xs text-[#718096] mt-2.5 italic"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.pricingFootnote}
                </p>
              )}
            </div>
          )}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl
            bg-gradient-to-r from-[#D4A574] via-[#2C5F5D] to-[#D4A574]
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </div>
  );
}

/* ─── Mobile step card ─── */
function MobileStepCard({ step, index, isLast }) {
  const Icon = STEP_ICONS[index] || MessageCircle;
  const isFeatured = index === 1;

  return (
    <div className="hww-step-mobile relative flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: isFeatured
              ? 'linear-gradient(135deg, #D4A574, #C89563)'
              : 'linear-gradient(135deg, #2C5F5D, #4A9691)',
            boxShadow: isFeatured
              ? '0 6px 20px rgba(212,165,116,0.35)'
              : '0 6px 20px rgba(44,95,93,0.28)',
          }}
        >
          <span
            className="text-white font-bold text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {step.number}
          </span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-[#2C5F5D]/30 to-transparent mt-2" />
        )}
      </div>

      <div className="flex-1 pb-8">
        {step.badge && (
          <span
            className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold border mb-3"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: index === 2
                ? 'rgba(212,165,116,0.10)'
                : 'rgba(44,95,93,0.08)',
              color: index === 2 ? '#967259' : '#2C5F5D',
              borderColor: index === 2 ? 'rgba(212,165,116,0.22)' : 'rgba(44,95,93,0.18)',
            }}
          >
            {step.badge}
          </span>
        )}

        <div
          className={`group relative rounded-2xl p-6 ${
            isFeatured
              ? 'overflow-hidden'
              : 'bg-white/70 backdrop-blur-sm border border-[#2C5F5D]/15 hover:shadow-[0_20px_60px_rgba(44,95,93,0.13)] hover:border-[#2C5F5D]/28 transition-all duration-500'
          }`}
          style={
            isFeatured
              ? { background: 'linear-gradient(160deg, #1a3a38 0%, #2C5F5D 60%, #1e4340 100%)' }
              : {}
          }
        >
          {isFeatured && (
            <>
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(95,168,163,0.15)' }}
              />
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
            </>
          )}

          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  isFeatured
                    ? 'bg-white/10 border border-white/15'
                    : 'bg-gradient-to-br from-[#2C5F5D]/10 to-[#D4A574]/10 border border-[#2C5F5D]/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${isFeatured ? 'text-[#7EBDB8]' : 'text-[#2C5F5D]'}`} />
              </div>
              <h3
                className={`text-xl font-bold leading-tight pt-1 ${isFeatured ? 'text-white' : 'text-[#2D3748]'}`}
                style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
              >
                {step.title}
              </h3>
            </div>

            {step.description && (
              <p
                className={`leading-relaxed mb-4 text-sm ${isFeatured ? 'text-white/65' : 'text-[#718096]'}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.description}
              </p>
            )}

            {step.points && step.points.length > 0 && (
              <ul className="space-y-2 mb-4">
                {step.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    {isFeatured ? (
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#5FA8A3]/20 border border-[#5FA8A3]/35 flex items-center justify-center mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#7EBDB8]" />
                      </div>
                    ) : (
                      <Check className="w-4 h-4 text-[#5FA8A3] flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm leading-relaxed ${isFeatured ? 'text-white/75' : 'text-[#4A5568]'}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {step.note && (
              <div
                className={`p-3.5 rounded-xl mb-4 ${
                  isFeatured
                    ? 'bg-white/06 border border-white/10'
                    : 'bg-[#2C5F5D]/05 border border-[#2C5F5D]/10'
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${isFeatured ? 'text-white/65' : 'text-[#4A5568]'}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.note}
                </p>
              </div>
            )}

            {step.result && (
              <div className="flex items-start gap-2 mt-1 mb-4">
                <ChevronRight className="w-4 h-4 text-[#D4A574] flex-shrink-0 mt-0.5" />
                <p
                  className={`text-sm italic leading-relaxed ${isFeatured ? 'text-white/55' : 'text-[#718096]'}`}
                  style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}
                >
                  {step.result}
                </p>
              </div>
            )}

            {/* Mobile pricing */}
            {step.pricingTiers && step.pricingTiers.length > 0 && (
              <div className={`mt-4 pt-4 ${isFeatured ? 'border-t border-white/10' : 'border-t border-[#2C5F5D]/12'}`}>
                {step.pricingLabel && (
                  <p
                    className={`text-xs font-semibold mb-2.5 uppercase tracking-wide ${isFeatured ? 'text-white/50' : 'text-[#2D3748]'}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {step.pricingLabel}
                  </p>
                )}
                <div className="space-y-2.5">
                  {step.pricingTiers.map((tier, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border"
                      style={
                        isFeatured
                          ? {
                              background: i === 0 ? 'rgba(95,168,163,0.12)' : 'rgba(212,165,116,0.10)',
                              borderColor: i === 0 ? 'rgba(95,168,163,0.25)' : 'rgba(212,165,116,0.25)',
                            }
                          : {
                              background: 'linear-gradient(135deg, rgba(212,165,116,0.08) 0%, rgba(150,114,89,0.04) 100%)',
                              borderColor: 'rgba(212,165,116,0.18)',
                            }
                      }
                    >
                      <span
                        className={`font-medium text-sm ${isFeatured ? 'text-white/80' : 'text-[#4A5568]'}`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {tier.label}
                      </span>
                      <span
                        className="font-bold text-lg whitespace-nowrap flex-shrink-0"
                        style={{
                          fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                          color: isFeatured
                            ? i === 0 ? '#7EBDB8' : '#D4A574'
                            : '#967259',
                        }}
                      >
                        {tier.price}
                      </span>
                    </div>
                  ))}
                </div>
                {step.pricingFootnote && (
                  <p
                    className={`text-xs mt-2.5 italic ${isFeatured ? 'text-white/40' : 'text-[#718096]'}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {step.pricingFootnote}
                  </p>
                )}
              </div>
            )}
          </div>

          {!isFeatured && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl
                bg-gradient-to-r from-[#2C5F5D] via-[#D4A574] to-[#2C5F5D]
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function HowWeWork({ dict, lang }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isRTL = lang === 'ar';

  const data = dict?.pages?.forPatients?.howWeWork || {};
  const badge = data.badge || 'Как мы работаем';
  const title = data.title || 'Как мы работаем';
  const subtitle = data.subtitle || '';
  const steps = data.steps || [];
  const importantTitle = data.importantTitle || 'Важно';
  const importantItems = data.importantItems || [];

  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hww-header-inner', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 86%', once: true },
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.hww-title', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 83%', once: true },
        opacity: 0, y: 30, duration: 0.8, delay: 0.15, ease: 'power3.out',
      });
      gsap.from('.hww-subtitle', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: 'power3.out',
      });

      gsap.utils.toArray('.hww-step-mobile').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
          opacity: 0, x: -40, duration: 0.75, delay: i * 0.08, ease: 'power3.out',
        });
      });

      gsap.from('.hww-card-01', {
        scrollTrigger: { trigger: '.hww-desktop-top', start: 'top 78%', once: true },
        opacity: 0, x: -50, duration: 0.85, ease: 'power3.out',
      });
      gsap.from('.hww-card-02', {
        scrollTrigger: { trigger: '.hww-desktop-top', start: 'top 78%', once: true },
        opacity: 0, x: 50, duration: 0.85, delay: 0.1, ease: 'power3.out',
      });
      gsap.from('.hww-card-03', {
        scrollTrigger: { trigger: '.hww-card-03', start: 'top 82%', once: true },
        opacity: 0, y: 50, duration: 0.85, ease: 'power3.out',
      });

      gsap.from('.hww-important', {
        scrollTrigger: { trigger: '.hww-important', start: 'top 82%', once: true },
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 px-4 md:px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFBF6] via-[#F7F3EC] to-[#FEFBF6]" />
      <div className="absolute top-1/4 left-[5%] w-[480px] h-[480px] bg-[#2C5F5D] rounded-full blur-[160px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[480px] h-[480px] bg-[#D4A574] rounded-full blur-[160px] opacity-[0.05] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #2C5F5D 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <div className="hww-header-inner flex items-center justify-center mb-5">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#2C5F5D]/40" />
            <div className="mx-3 flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574] animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse" style={{ animationDelay: '300ms' }} />
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
            className="hww-title text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#2D3748] mb-5 leading-tight"
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

        {/* ── DESKTOP layout ── */}
        {steps.length >= 3 && (
          <div className="hidden md:flex flex-col gap-6">
            {/* Row 1: step01 (left, narrow) + step02 (right, wide) */}
            <div className="hww-desktop-top grid gap-6" style={{ gridTemplateColumns: '1fr 1.65fr' }}>
              {step1 && <DesktopCard01 step={step1} />}
              {step2 && <DesktopCard02 step={step2} />}
            </div>

            {/* Row 2: step03 full width */}
            {step3 && <DesktopCard03 step={step3} />}
          </div>
        )}

        {/* ── MOBILE layout ── */}
        <div className="md:hidden flex flex-col">
          {steps.map((step, index) => (
            <MobileStepCard
              key={index}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Important callout */}
        {importantItems.length > 0 && (
          <div className="hww-important mt-14 md:mt-20">
            <div
              className="relative rounded-2xl overflow-hidden p-8 md:p-10"
              style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 65%, #1e3533 100%)' }}
            >
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#5FA8A3]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#D4A574]/10 rounded-full blur-3xl pointer-events-none" />
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
