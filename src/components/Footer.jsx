'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, ChevronUp } from 'lucide-react';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';

export default function Footer({ dict, lang }) {
  const isRTL = lang === 'ar';

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ── Labels ─────────────────────────────────────────────────── */
  const siteMapLabel =
    lang === 'ru' ? 'Карта сайта' : lang === 'en' ? 'Site Map' : 'خريطة الموقع';
  const legalLabel =
    lang === 'ru' ? 'Правовая' : lang === 'en' ? 'Legal' : 'قانوني';
  const backToTopLabel =
    lang === 'ru' ? 'НАВЕРХ' : lang === 'en' ? 'BACK TO TOP' : 'العودة للأعلى';
  const tagline =
    lang === 'ru'
      ? 'Ваш надёжный партнёр в медицинском туризме. Сопровождаем на каждом этапе — от консультации до возвращения домой.'
      : lang === 'en'
      ? 'Your trusted partner in medical tourism. Guiding you every step — from consultation to recovery.'
      : 'شريكك الموثوق في السياحة العلاجية. نرافقك في كل خطوة من الاستشارة حتى العودة إلى المنزل.';

  /* ── Navigation ─────────────────────────────────────────────── */
  const siteMapLinks = [
    {
      label: lang === 'ru' ? 'Главная' : lang === 'en' ? 'Homepage' : 'الرئيسية',
      href: `/${lang}`,
    },
    {
      label: lang === 'ru' ? 'О нас' : lang === 'en' ? 'About' : 'عن الشركة',
      href: `/${lang}/about`,
    },
    {
      label:
        lang === 'ru'
          ? 'Лечение за рубежом'
          : lang === 'en'
          ? 'Treatment Abroad'
          : 'العلاج في الخارج',
      href: `/${lang}/treatment-abroad`,
    },
    {
      label:
        lang === 'ru' ? 'Для пациентов' : lang === 'en' ? 'For Patients' : 'للمرضى',
      href: `/${lang}/for-patients`,
    },
    {
      label: 'TrustMedX Academy',
      href: `/${lang}/academy`,
    },
    {
      label:
        lang === 'ru' ? 'Контакты' : lang === 'en' ? 'Contact Us' : 'اتصل بنا',
      href: `/${lang}/contacts`,
    },
  ];

  const legalLinks = [
    { label: dict.footer.legal.privacyPolicy, href: `/${lang}/privacy-policy` },
    {
      label: dict.footer.legal.termsAndConditions,
      href: `/${lang}/terms-and-conditions`,
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/trustmedx' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/trustmedx' },
    { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/994XXXXXXXXX' },
    { name: 'Telegram', icon: FaTelegram, href: 'https://t.me/trustmedx' },
  ];

  return (
    <footer
      className={`relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, #162e2c 0%, #1e4b48 45%, #1b3c39 100%)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Background Logo Watermark ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Desktop: right-aligned */}
        <div
          className="absolute hidden lg:block -right-16 top-1/2 -translate-y-1/2"
          style={{ width: '52%', aspectRatio: '1 / 1' }}
        >
          <Image
            src="/footer-bg-logo.png"
            alt=""
            fill
            className="object-contain"
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.045 }}
            priority={false}
          />
        </div>

        {/* Mobile: centered, larger */}
        <div
          className="absolute lg:hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: '85%', aspectRatio: '1 / 1' }}
        >
          <Image
            src="/footer-bg-logo.png"
            alt=""
            fill
            className="object-contain"
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.018 }}
            priority={false}
          />
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 md:px-12 pt-12 md:pt-14 pb-8 md:pb-10">

        {/* ── Desktop Layout ───────────────────────────────────── */}
        <div
          className={`hidden lg:grid grid-cols-[2.4fr_1fr_1.1fr] gap-6 ${
            isRTL ? 'text-right' : ''
          }`}
        >
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href={`/${lang}`} className="inline-block">
              <Image
                src="/trustmedx-logo.png"
                alt="TrustMedX"
                width={200}
                height={50}
                className="h-auto w-auto max-w-[190px]"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }}
                priority={false}
              />
            </Link>
            <p
              className="text-white/65 text-[14.5px] leading-[1.7] max-w-[280px] font-light"
              style={{ letterSpacing: '0.01em' }}
            >
              {tagline}
            </p>
            <div className={`flex items-center gap-5 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-white/70 hover:text-white transition-colors duration-200 inline-flex"
                  >
                    <IconComponent size={22} />
                  </a>
                );
              })}
            </div>
            <div className="mt-3">
              <button
                onClick={scrollToTop}
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/35 text-white/80 text-[11px] font-semibold tracking-[0.18em] uppercase hover:border-white/70 hover:text-white transition-all duration-300 ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <ChevronUp size={14} strokeWidth={2.5} />
                {backToTopLabel}
              </button>
            </div>
          </div>

          {/* Site Map Column */}
          <div>
            <h3
              className="text-white text-[15px] font-semibold mb-5"
              style={{ letterSpacing: '0.01em' }}
            >
              {siteMapLabel}
            </h3>
            <ul className="flex flex-col gap-[13px]">
              {siteMapLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-white/72 hover:text-white text-[14.5px] font-light transition-colors duration-200 ${
                      index === 0
                        ? 'underline underline-offset-[5px] decoration-white/50 hover:decoration-white/80'
                        : ''
                    }`}
                    style={{ letterSpacing: '0.005em' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3
              className="text-white text-[15px] font-semibold mb-5"
              style={{ letterSpacing: '0.01em' }}
            >
              {legalLabel}
            </h3>
            <ul className="flex flex-col gap-[13px]">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/72 hover:text-white text-[14.5px] font-light transition-colors duration-200"
                    style={{ letterSpacing: '0.005em' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Mobile Layout ─────────────────────────────────────── */}
        <div className={`flex lg:hidden flex-col items-center gap-0 ${isRTL ? 'text-right' : 'text-center'}`}>

          {/* Logo */}
          <Link href={`/${lang}`} className="inline-block mb-2">
            <Image
              src="/trustmedx-logo-mobile.png"
              alt="TrustMedX"
              width={200}
              height={200}
              className="h-auto w-auto max-w-[180px]"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }}
              priority={false}
            />
          </Link>

          {/* Tagline */}
          <p
            className="text-white/60 text-[13.5px] leading-[1.75] max-w-[300px] font-light mb-6"
            style={{ letterSpacing: '0.01em' }}
          >
            {tagline}
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-white/65 hover:text-white transition-colors duration-200 inline-flex p-1"
                >
                  <IconComponent size={22} />
                </a>
              );
            })}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white/75 text-[10.5px] font-semibold tracking-[0.18em] uppercase hover:border-white/60 hover:text-white transition-all duration-300 mb-8 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <ChevronUp size={13} strokeWidth={2.5} />
            {backToTopLabel}
          </button>

          {/* Divider */}
          <div className="w-full border-t border-white/10 mb-7" />

          {/* Legal — centered */}
          <div className="flex flex-col items-center gap-3">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 text-[13px] font-light transition-colors duration-200 active:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gold Copyright Bar ────────────────────────────────── */}
      <div
        className="relative py-2 text-center"
        style={{ background: '#D1A170' }}
      >
        <p
          className="text-[#2a1a08]/75 text-[12px] md:text-[13px] font-medium px-4"
          style={{ letterSpacing: '0.02em' }}
        >
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
