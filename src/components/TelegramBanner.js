'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BODY_FONT = "'DM Sans', sans-serif";
const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";

function TelegramIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export default function TelegramBanner({ dict, lang }) {
  const stripRef = useRef(null);
  const data = dict.pages.homePage.telegramBanner;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tgb-inner', {
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 94%',
          once: true,
        },
        opacity: 0,
        y: 12,
        duration: 0.65,
        ease: 'power3.out',
      });

      gsap.from('.tgb-cta', {
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 92%',
          once: true,
        },
        opacity: 0,
        x: lang === 'ar' ? -20 : 20,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.18,
      });

      // Repeating shimmer sweep
      gsap.to('.tgb-shimmer', {
        x: '110vw',
        duration: 3.2,
        ease: 'none',
        repeat: -1,
        repeatDelay: 4.5,
      });

      // Subtle pulse on the live dot
      gsap.to('.tgb-dot-ring', {
        scale: 1.5,
        opacity: 0,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        transformOrigin: 'center center',
      });
    }, stripRef);

    return () => ctx.revert();
  }, [lang]);

  const isRTL = lang === 'ar';

  return (
    <div
      ref={stripRef}
      className="relative w-full overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(100deg, #162e2c 0%, #1e4a47 40%, #2C5F5D 70%, #1a3a38 100%)',
        borderTop: '2px solid rgba(255,255,255,0.25)',
        borderBottom: '2px solid rgba(255,255,255,0.25)',
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Gold accent line at top */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,165,116,0.5) 30%, rgba(212,165,116,0.7) 50%, rgba(212,165,116,0.5) 70%, transparent 100%)',
        }}
      />

      {/* Shimmer sweep */}
      <div
        className="tgb-shimmer absolute inset-y-0 w-32 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent)',
          transform: 'translateX(-100%)',
          left: 0,
        }}
      />

      {/* Gold accent line at bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,165,116,0.25) 50%, transparent 100%)',
        }}
      />

      {/* Main content */}
      <div className="tgb-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Mobile: 2-row layout ── Desktop: single row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6">

          {/* Row 1 (both): Live badge + ticker */}
          <div className="flex items-center gap-3 overflow-hidden py-3 sm:py-3.5 sm:flex-1 sm:min-w-0">

            {/* Live badge */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span
                  className="tgb-dot-ring absolute inset-0 rounded-full"
                  style={{ background: '#7EBDB8' }}
                />
                <span
                  className="relative flex h-2 w-2 rounded-full"
                  style={{ background: '#5FA8A3' }}
                />
              </span>
              <span
                className="text-[10px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: '#7EBDB8', fontFamily: BODY_FONT }}
              >
                {data.liveLabel}
              </span>
            </div>

            {/* Separator */}
            <div
              className="h-3.5 w-px shrink-0"
              style={{ background: 'rgba(95,168,163,0.35)' }}
            />

            {/* Scrolling ticker */}
            <div className="overflow-hidden flex-1" aria-hidden="true">
              <div
                className="tgb-ticker-track flex gap-0 whitespace-nowrap"
                style={{ animation: 'tgb-ticker 28s linear infinite' }}
              >
                {[...data.items, ...data.items].map((item, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm shrink-0"
                    style={{ color: 'rgba(254,251,246,0.65)', fontFamily: BODY_FONT }}
                  >
                    {item}
                    <span
                      className="mx-3 sm:mx-4"
                      style={{ color: 'rgba(95,168,163,0.6)' }}
                    >
                      ·
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile-only divider */}
          <div
            className="sm:hidden h-px mx-0"
            style={{ background: 'rgba(95,168,163,0.18)' }}
          />

          {/* Row 2 (mobile) / Right block (desktop): CTA + button */}
          <div
            className="tgb-cta flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 py-3 sm:py-3.5"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            {/* CTA text — visible on mobile too */}
            <div className="flex flex-col gap-0.5">
              <span
                className="text-sm font-medium leading-tight"
                style={{ color: 'rgba(254,251,246,0.92)', fontFamily: BODY_FONT }}
              >
                {data.cta}
              </span>
              <span
                className="text-[11px] leading-tight"
                style={{ color: 'rgba(126,189,184,0.65)', fontFamily: BODY_FONT }}
              >
                {data.ctaSub}
              </span>
            </div>

            {/* Subscribe button */}
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 sm:py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #5FA8A3 0%, #4A9691 100%)',
                color: '#FEFBF6',
                fontFamily: BODY_FONT,
                boxShadow: '0 3px 14px rgba(74,150,145,0.4)',
              }}
            >
              <TelegramIcon size={15} />
              <span>{data.btnLabel}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ticker keyframe */}
      <style>{`
        @keyframes tgb-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 639px) {
          .tgb-ticker-track {
            animation-duration: 14s !important;
          }
        }
      `}</style>
    </div>
  );
}
