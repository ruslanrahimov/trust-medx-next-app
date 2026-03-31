'use client';

import { CheckCircle2, Phone, MessageCircle } from 'lucide-react';

export default function ContactForm({ dict }) {

  const cta = dict?.pages?.homePage?.finalCta;

  return (
    <div className="h-full flex flex-col gap-5">
      {/* Badge */}
      <div className="cta-card-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#5FA8A3]/25 self-start"
        style={{ background: 'rgba(95,168,163,0.08)' }}>
        <span className="relative flex h-2 w-2">
          <span className="cta-badge-dot absolute inline-flex h-full w-full rounded-full" style={{ background: '#5FA8A3' }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#5FA8A3' }} />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: '#5FA8A3' }}>
          {cta?.badge || 'Начните прямо сейчас'}
        </span>
      </div>

      {/* CTA Card */}
      <div
        className="relative bg-white rounded-[2rem] border overflow-hidden"
        style={{ borderColor: 'rgba(74,59,44,0.08)', boxShadow: '0 25px 60px rgba(74,59,44,0.10)' }}
      >
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-[5px]"
          style={{ background: 'linear-gradient(to right, #5FA8A3, #D4A574)', borderRadius: '2rem 2rem 0 0' }} />

        {/* Ornamental watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]" aria-hidden="true">
          <div className="relative w-64 h-64">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 rounded-full" style={{ background: '#4A3B2C' }} />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 rounded-full" style={{ background: '#4A3B2C' }} />
          </div>
        </div>

        <div className="relative z-10 p-8 md:p-10 flex flex-col gap-6">
          {/* Title + subtitle */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold leading-snug mb-2"
              style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif", color: '#4A3B2C' }}>
              {cta?.title || 'Готовы начать ваш путь к здоровью?'}
            </h3>
            <p className="text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,59,44,0.55)' }}>
              {cta?.subtitle || 'Получите бесплатную консультацию и узнайте, какие возможности лечения доступны для вас'}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

          {/* Benefits */}
          <div className="flex flex-col gap-2.5">
            {(cta?.benefits || []).map((benefit, i) => (
              <div key={i} className="cta-benefit-item flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 cursor-default"
                style={{ borderColor: 'rgba(74,59,44,0.08)', boxShadow: '0 1px 3px rgba(74,59,44,0.05)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(95,168,163,0.30)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(74,59,44,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(74,59,44,0.08)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(74,59,44,0.05)';
                }}
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#5FA8A3' }} strokeWidth={2.2} />
                <span className="text-sm font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: '#4A3B2C' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: 'rgba(74,59,44,0.07)' }} />

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            {/* Primary */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-consultation-modal'))}
              className="group relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 100%)',
                boxShadow: '0 8px 24px rgba(44,95,93,0.35)',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(44,95,93,0.50)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,95,93,0.35)'; }}
            >
              <span className="btn-shine pointer-events-none absolute inset-y-0 w-1/3 -translate-x-full skew-x-[-20deg]"
                style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)' }} />
              <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
              <span>{cta?.ctaPrimary || 'Получить консультацию'}</span>
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/994XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold bg-white border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              style={{ fontFamily: "'DM Sans', sans-serif", borderColor: 'rgba(74,59,44,0.20)', color: '#4A3B2C' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.40)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,59,44,0.20)'; }}
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#25D366' }} strokeWidth={2} />
              <span>{cta?.ctaSecondary || 'Связаться в WhatsApp'}</span>
            </a>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,59,44,0.40)' }}>
            ✓ Бесплатная консультация&nbsp;&nbsp;·&nbsp;&nbsp;✓ Ответ за 2 часа
          </p>
        </div>
      </div>
    </div>
  );
}
