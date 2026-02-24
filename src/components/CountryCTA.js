'use client';

import { useState, useEffect } from 'react';
import { Send, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';

const countryConfig = {
  turkey: { accentColor: '#E30A17', flag: '🇹🇷' },
  'south-korea': { accentColor: '#0047A0', flag: '🇰🇷' },
  china: { accentColor: '#DE2910', flag: '🇨🇳' },
};

export default function CountryCTA({ dict, lang, country }) {
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const config = countryConfig[country] || countryConfig.turkey;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formState);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: lang === 'ru' ? 'Телефон' : lang === 'en' ? 'Phone' : 'الهاتف',
      value: '+7 (999) 123-45-67',
      href: 'tel:+79991234567',
    },
    {
      icon: Mail,
      title: lang === 'ru' ? 'Email' : lang === 'en' ? 'Email' : 'البريد الإلكتروني',
      value: 'info@trustmedx.com',
      href: 'mailto:info@trustmedx.com',
    },
    {
      icon: MessageCircle,
      title: lang === 'ru' ? 'WhatsApp' : lang === 'en' ? 'WhatsApp' : 'واتساب',
      value: '+7 (999) 123-45-67',
      href: 'https://wa.me/79991234567',
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background with country accent */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${config.accentColor}05 0%, transparent 50%, ${config.accentColor}05 100%)`,
        }}
      />

      {/* Animated gradient orbs */}
      <div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: config.accentColor, animationDuration: '4s' }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse"
        style={{ background: config.accentColor, animationDuration: '5s', animationDelay: '1s' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div
            style={{
              opacity: 0,
              transform: 'translateX(-30px)',
              animation: mounted ? 'slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
            }}
          >
            {/* Flag badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border mb-6"
              style={{ borderColor: `${config.accentColor}30` }}
            >
              <span className="text-2xl">{config.flag}</span>
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: "'DM Sans', -apple-system, sans-serif",
                  color: config.accentColor,
                }}
              >
                {lang === 'ru' && 'Свяжитесь с нами'}
                {lang === 'en' && 'Contact Us'}
                {lang === 'ar' && 'اتصل بنا'}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A3B2C] mb-6"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {lang === 'ru' && 'Начните ваш путь к здоровью сегодня'}
              {lang === 'en' && 'Start Your Journey to Health Today'}
              {lang === 'ar' && 'ابدأ رحلتك نحو الصحة اليوم'}
            </h2>

            {/* Description */}
            <p
              className="text-lg text-[#4A3B2C]/70 mb-8 leading-relaxed"
              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
            >
              {lang === 'ru' && 'Получите бесплатную консультацию и индивидуальный план лечения от наших специалистов'}
              {lang === 'en' && 'Get free consultation and personalized treatment plan from our specialists'}
              {lang === 'ar' && 'احصل على استشارة مجانية وخطة علاج شخصية من المتخصصين لدينا'}
            </p>

            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="group flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#4A3B2C]/10 hover:border-[#4A3B2C]/20 hover:bg-white/80 transition-all duration-300 hover:-translate-x-2"
                  style={{
                    opacity: 0,
                    animation: mounted ? `fadeIn 0.6s ease-out ${index * 0.1 + 0.3}s forwards` : 'none',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${config.accentColor}15, ${config.accentColor}05)`,
                    }}
                  >
                    <method.icon size={20} style={{ color: config.accentColor }} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-xs text-[#4A3B2C]/50 mb-1"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    >
                      {method.title}
                    </div>
                    <div
                      className="font-semibold text-[#4A3B2C]"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    >
                      {method.value}
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-[#4A3B2C]/30 group-hover:text-[#4A3B2C] group-hover:translate-x-1 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              opacity: 0,
              transform: 'translateX(30px)',
              animation: mounted ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' : 'none',
            }}
          >
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-[#4A3B2C]/10">
              {/* Decorative gradient */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: config.accentColor }}
              />

              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Form Title */}
                <div className="text-center mb-6">
                  <h3
                    className="text-2xl font-bold text-[#4A3B2C] mb-2"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {lang === 'ru' && 'Запишитесь на консультацию'}
                    {lang === 'en' && 'Book a Consultation'}
                    {lang === 'ar' && 'احجز استشارة'}
                  </h3>
                  <p
                    className="text-sm text-[#4A3B2C]/60"
                    style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                  >
                    {lang === 'ru' && 'Ответим в течение 1 часа'}
                    {lang === 'en' && 'We will respond within 1 hour'}
                    {lang === 'ar' && 'سنرد في غضون ساعة واحدة'}
                  </p>
                </div>

                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={lang === 'ru' ? 'Ваше имя' : lang === 'en' ? 'Your name' : 'اسمك'}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 rounded-xl border border-[#4A3B2C]/10 focus:border-[#4A3B2C]/30 bg-white/50 backdrop-blur-sm transition-all duration-300 outline-none"
                    style={{
                      fontFamily: "'DM Sans', -apple-system, sans-serif",
                      borderColor: focusedField === 'name' ? config.accentColor : undefined,
                    }}
                  />
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder={lang === 'ru' ? 'Телефон' : lang === 'en' ? 'Phone' : 'الهاتف'}
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 rounded-xl border border-[#4A3B2C]/10 focus:border-[#4A3B2C]/30 bg-white/50 backdrop-blur-sm transition-all duration-300 outline-none"
                    style={{
                      fontFamily: "'DM Sans', -apple-system, sans-serif",
                      borderColor: focusedField === 'phone' ? config.accentColor : undefined,
                    }}
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder={lang === 'ru' ? 'Email' : lang === 'en' ? 'Email' : 'البريد الإلكتروني'}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 rounded-xl border border-[#4A3B2C]/10 focus:border-[#4A3B2C]/30 bg-white/50 backdrop-blur-sm transition-all duration-300 outline-none"
                    style={{
                      fontFamily: "'DM Sans', -apple-system, sans-serif",
                      borderColor: focusedField === 'email' ? config.accentColor : undefined,
                    }}
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    placeholder={lang === 'ru' ? 'Сообщение' : lang === 'en' ? 'Message' : 'الرسالة'}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border border-[#4A3B2C]/10 focus:border-[#4A3B2C]/30 bg-white/50 backdrop-blur-sm transition-all duration-300 outline-none resize-none"
                    style={{
                      fontFamily: "'DM Sans', -apple-system, sans-serif",
                      borderColor: focusedField === 'message' ? config.accentColor : undefined,
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}dd)`,
                    fontFamily: "'DM Sans', -apple-system, sans-serif",
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <span className="relative flex items-center justify-center gap-2">
                    {lang === 'ru' && 'Отправить заявку'}
                    {lang === 'en' && 'Submit Request'}
                    {lang === 'ar' && 'إرسال الطلب'}
                    <Send size={18} />
                  </span>
                </button>

                {/* Privacy note */}
                <p
                  className="text-xs text-center text-[#4A3B2C]/50"
                  style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                >
                  {lang === 'ru' && 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности'}
                  {lang === 'en' && 'By clicking the button, you agree to the privacy policy'}
                  {lang === 'ar' && 'بالنقر على الزر، فإنك توافق على سياسة الخصوصية'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
