'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', sans-serif";

export default function ContactsHero({ dict }) {
  const heroRef = useRef(null);
  const contacts = dict.pages.contacts;
  const ph = contacts.pageHeader;
  const info = contacts.contactInfo;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ch-label', { opacity: 0, y: 18, duration: 0.7 })
        .from('.ch-title-1', { opacity: 0, y: 56, duration: 1.05 }, '-=0.4')
        .from('.ch-title-2', { opacity: 0, y: 56, duration: 1.05 }, '-=0.75')
        .from('.ch-desc', { opacity: 0, y: 24, duration: 0.8 }, '-=0.55')
        .from('.ch-info-item', { opacity: 0, y: 14, duration: 0.5, stagger: 0.12 }, '-=0.45')
        .from('.ch-visual', { opacity: 0, x: 30, duration: 1.2 }, '-=1.4');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const infoItems = [
    { icon: Phone, value: info.phone.value, label: info.phone.title },
    { icon: Mail, value: info.email.value, label: info.email.title },
    { icon: Clock, value: info.hours.value, label: info.hours.title },
  ];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#FEFBF6' }}
    >
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 min-h-[92dvh]">
        {/* ── LEFT ── */}
        <div className="flex flex-col justify-center px-6 lg:pl-14 xl:pl-20 lg:pr-12 py-24 lg:py-0">
          {/* Section label */}
          <div className="ch-label flex items-center gap-3 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5FA8A3] shrink-0" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#4A3B2C]/50"
              style={{ fontFamily: BODY_FONT }}
            >
              {ph.subtitle}
            </span>
          </div>

          {/* Headline */}
          <div className="mb-8 overflow-hidden">
            <h1
              className="ch-title-1 text-[3rem] md:text-[4rem] lg:text-[3.6rem] xl:text-[4.5rem] font-bold text-[#4A3B2C] leading-[1.04] tracking-tight"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              {ph.title}
            </h1>
            <h2
              className="ch-title-2 text-[3rem] md:text-[4rem] lg:text-[3.6rem] xl:text-[4.5rem] font-bold leading-[1.04] tracking-tight"
              style={{
                fontFamily: DISPLAY_FONT,
                background: 'linear-gradient(110deg, #5FA8A3 0%, #4A9691 55%, #7EBDB8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TrustMedX
            </h2>
          </div>

          {/* Lead text */}
          <p
            className="ch-desc max-w-md text-base md:text-[1.05rem] text-[#4A3B2C]/58 leading-relaxed mb-14"
            style={{ fontFamily: BODY_FONT }}
          >
            {ph.description}
          </p>

          {/* Contact info row */}
          <div className="flex flex-col gap-4 border-t border-[#4A3B2C]/10 pt-8">
            {infoItems.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="ch-info-item flex items-center gap-4">
                <div
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #5FA8A3, #4A9691)' }}
                >
                  <Icon className="text-white" size={16} />
                </div>
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.14em] text-[#4A3B2C]/42"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-semibold text-[#4A3B2C]"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — visual ── */}
        <div className="ch-visual relative h-[52dvh] min-h-[300px] lg:h-auto">
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(150deg, #F0E8DE 0%, #E6D8CB 40%, #D9CCBC 70%, #D0C4B0 100%)' }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #4A3B2C 0px, #4A3B2C 1px, transparent 0px, transparent 44px)' }}
            />

            {/* Accent circles */}
            <div className="absolute top-12 right-12 w-36 h-36 rounded-full opacity-18" style={{ background: 'radial-gradient(circle, #5FA8A3 0%, transparent 70%)' }} />
            <div className="absolute top-28 left-16 w-24 h-24 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }} />
            <div className="absolute bottom-24 right-[25%] w-20 h-20 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7EBDB8 0%, transparent 70%)' }} />

            {/* Central map-pin illustration */}
            <div className="relative flex flex-col items-center">
              {/* Outer ring */}
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(95,168,163,0.10)', border: '1.5px solid rgba(95,168,163,0.22)' }}
              >
                {/* Inner ring */}
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(95,168,163,0.14)', border: '1.5px solid rgba(95,168,163,0.30)' }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #5FA8A3, #4A9691)', boxShadow: '0 8px 24px rgba(95,168,163,0.35)' }}
                  >
                    <MapPin className="text-white" size={28} strokeWidth={1.8} />
                  </div>
                </div>
              </div>

              {/* Floating contact cards */}
              <div
                className="absolute -top-8 -right-20 flex items-center gap-2 rounded-xl border border-[#4A3B2C]/10 bg-white px-3 py-2"
                style={{ boxShadow: '0 8px 28px rgba(74,59,44,0.10)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #5FA8A3, #4A9691)' }}>
                  <Phone className="text-white" size={12} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#4A3B2C]/40" style={{ fontFamily: BODY_FONT }}>{info.phone.title}</p>
                  <p className="text-[11px] font-semibold text-[#4A3B2C]" style={{ fontFamily: BODY_FONT }}>{info.phone.value}</p>
                </div>
              </div>

              <div
                className="absolute -bottom-10 -left-24 flex items-center gap-2 rounded-xl border border-[#4A3B2C]/10 bg-white px-3 py-2"
                style={{ boxShadow: '0 8px 28px rgba(74,59,44,0.10)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #D4A574, #C89563)' }}>
                  <Mail className="text-white" size={12} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#4A3B2C]/40" style={{ fontFamily: BODY_FONT }}>{info.email.title}</p>
                  <p className="text-[11px] font-semibold text-[#4A3B2C]" style={{ fontFamily: BODY_FONT }}>{info.email.value}</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(74,59,44,0.14) 0%, transparent 48%)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
