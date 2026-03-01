'use client';

import { useState } from 'react';
import { Send, Phone, Mail, MessageCircle, ArrowRight, CheckCircle, AlertCircle, Heart, Activity, Bone, Smile, Sparkles, Stethoscope } from 'lucide-react';
import PhoneInputField from './PhoneInputField';

const countryConfig = {
  turkey: { accentColor: '#C06558', flag: '🇹🇷' },
  'south-korea': { accentColor: '#4E7EA6', flag: '🇰🇷' },
  china: { accentColor: '#9E4D4D', flag: '🇨🇳' },
};

export default function CountryCTA({ dict, lang, country }) {
  const mounted = true;
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    description: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [phoneKey, setPhoneKey] = useState(0);
  const config = countryConfig[country] || countryConfig.turkey;

  const specialties = [
    { value: 'cardiology', label: dict?.consultationModal?.specialties?.cardiology || 'Кардиология', icon: Heart },
    { value: 'oncology', label: dict?.consultationModal?.specialties?.oncology || 'Онкология', icon: Activity },
    { value: 'orthopedics', label: dict?.consultationModal?.specialties?.orthopedics || 'Ортопедия', icon: Bone },
    { value: 'dentistry', label: dict?.consultationModal?.specialties?.dentistry || 'Стоматология', icon: Smile },
    { value: 'plastic', label: dict?.consultationModal?.specialties?.plastic || 'Пластическая хирургия', icon: Sparkles },
    { value: 'general', label: dict?.consultationModal?.specialties?.general || 'Общая консультация', icon: Stethoscope },
  ];

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      const success = Math.random() > 0.1;
      setStatus(success ? 'success' : 'error');
      if (success) {
        setTimeout(() => {
          setFormState({ firstName: '', lastName: '', email: '', phone: '', specialty: '', description: '' });
          setPhoneKey(k => k + 1);
          setStatus('idle');
        }, 3000);
      } else {
        setTimeout(() => setStatus('idle'), 4000);
      }
    }, 1500);
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
            <div className="relative bg-[#FEFBF6] rounded-3xl p-8 md:p-10 shadow-2xl border border-[#D4A574]/20 overflow-hidden">
              {/* Decorative gradients */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D4A574]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#5FA8A3]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Form Title */}
              <div className="text-center mb-6 relative">
                <h3
                  className="text-2xl font-bold text-[#4A3B2C] mb-1"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {dict?.consultationModal?.title || (
                    <>
                      {lang === 'ru' && 'Получите экспертную консультацию'}
                      {lang === 'en' && 'Get Expert Consultation'}
                      {lang === 'ar' && 'احصل على استشارة متخصصة'}
                    </>
                  )}
                </h3>
                <p
                  className="text-sm text-[#4A3B2C]/60"
                  style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                >
                  {dict?.consultationModal?.subtitle || (
                    <>
                      {lang === 'ru' && 'Заполните форму, и наш специалист свяжется с вами в ближайшее время'}
                      {lang === 'en' && 'Fill the form and our specialist will contact you shortly'}
                      {lang === 'ar' && 'املأ النموذج وسيتصل بك أخصائيونا قريباً'}
                    </>
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="cta-firstName"
                      className="block text-xs font-semibold text-[#4A3B2C] mb-1"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    >
                      {dict?.consultationModal?.fields?.firstName || (lang === 'ru' ? 'Имя' : lang === 'en' ? 'First Name' : 'الاسم')} <span className="text-[#D4A574]">*</span>
                    </label>
                    <input
                      type="text"
                      id="cta-firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      required
                      placeholder={dict?.consultationModal?.placeholders?.firstName || (lang === 'ru' ? 'Введите имя' : lang === 'en' ? 'Enter first name' : 'أدخل الاسم')}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#4A3B2C]/10 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#D4A574] focus:bg-white focus:shadow-lg focus:shadow-[#D4A574]/20 hover:border-[#4A3B2C]/20 text-sm"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cta-lastName"
                      className="block text-xs font-semibold text-[#4A3B2C] mb-1"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    >
                      {dict?.consultationModal?.fields?.lastName || (lang === 'ru' ? 'Фамилия' : lang === 'en' ? 'Last Name' : 'اللقب')} <span className="text-[#D4A574]">*</span>
                    </label>
                    <input
                      type="text"
                      id="cta-lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      required
                      placeholder={dict?.consultationModal?.placeholders?.lastName || (lang === 'ru' ? 'Введите фамилию' : lang === 'en' ? 'Enter last name' : 'أدخل اللقب')}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#4A3B2C]/10 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#D4A574] focus:bg-white focus:shadow-lg focus:shadow-[#D4A574]/20 hover:border-[#4A3B2C]/20 text-sm"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="cta-email"
                      className="block text-xs font-semibold text-[#4A3B2C] mb-1"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    >
                      {dict?.consultationModal?.fields?.email || 'Email'} <span className="text-[#D4A574]">*</span>
                    </label>
                    <input
                      type="email"
                      id="cta-email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder={dict?.consultationModal?.placeholders?.email || 'example@mail.com'}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#4A3B2C]/10 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#D4A574] focus:bg-white focus:shadow-lg focus:shadow-[#D4A574]/20 hover:border-[#4A3B2C]/20 text-sm"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#4A3B2C] mb-1"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    >
                      {dict?.consultationModal?.fields?.phone || (lang === 'ru' ? 'Телефон' : lang === 'en' ? 'Phone' : 'الهاتف')} <span className="text-[#D4A574]">*</span>
                    </label>
                    <PhoneInputField
                      key={phoneKey}
                      onChange={(val) => setFormState(prev => ({ ...prev, phone: val }))}
                      required
                    />
                  </div>
                </div>

                {/* Specialty Selection */}
                <div>
                  <label
                    className="block text-xs font-semibold text-[#4A3B2C] mb-2"
                    style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                  >
                    {dict?.consultationModal?.fields?.specialty || (lang === 'ru' ? 'Направление консультации' : lang === 'en' ? 'Consultation Type' : 'نوع الاستشارة')} <span className="text-[#D4A574]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {specialties.map((spec) => {
                      const Icon = spec.icon;
                      const isSelected = formState.specialty === spec.value;
                      return (
                        <button
                          key={spec.value}
                          type="button"
                          onClick={() => setFormState({ ...formState, specialty: spec.value })}
                          className={`relative p-2 rounded-xl border-2 transition-all duration-300 text-left group/spec ${
                            isSelected
                              ? 'border-[#D4A574] bg-gradient-to-br from-[#D4A574]/20 to-[#D4A574]/5 shadow-lg shadow-[#D4A574]/20'
                              : 'border-[#4A3B2C]/10 bg-white/60 hover:border-[#D4A574]/50 hover:bg-white/80'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1 text-center">
                            <div
                              className={`p-1 rounded-lg transition-all duration-300 ${
                                isSelected
                                  ? 'bg-[#D4A574] text-white shadow-md'
                                  : 'bg-[#4A3B2C]/5 text-[#4A3B2C]/60 group-hover/spec:bg-[#D4A574]/20 group-hover/spec:text-[#D4A574]'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <p
                              className={`text-[10px] font-semibold leading-tight transition-colors duration-300 ${
                                isSelected ? 'text-[#D4A574]' : 'text-[#4A3B2C] group-hover/spec:text-[#D4A574]'
                              }`}
                              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                            >
                              {spec.label}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="cta-description"
                    className="block text-xs font-semibold text-[#4A3B2C] mb-1"
                    style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                  >
                    {dict?.consultationModal?.fields?.description || (lang === 'ru' ? 'Краткое описание проблемы' : lang === 'en' ? 'Brief Description' : 'وصف مختصر')} <span className="text-[#D4A574]">*</span>
                  </label>
                  <textarea
                    id="cta-description"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder={dict?.consultationModal?.placeholders?.description || (lang === 'ru' ? 'Опишите вашу ситуацию или вопрос...' : lang === 'en' ? 'Describe your situation or question...' : 'صف وضعك أو سؤالك...')}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#4A3B2C]/10 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#D4A574] focus:bg-white focus:shadow-lg focus:shadow-[#D4A574]/20 hover:border-[#4A3B2C]/20 resize-none text-sm"
                    style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending' || !formState.specialty}
                  className="group relative w-full px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, #1a3a38, #2C5F5D)',
                    fontFamily: "'DM Sans', -apple-system, sans-serif",
                    boxShadow: '0 8px 30px rgba(44,95,93,0.3)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {dict?.consultationModal?.sending || (lang === 'ru' ? 'Отправка...' : lang === 'en' ? 'Sending...' : 'جارٍ الإرسال...')}
                      </>
                    ) : (
                      <>
                        {dict?.consultationModal?.submit || (lang === 'ru' ? 'Отправить заявку' : lang === 'en' ? 'Submit Request' : 'إرسال الطلب')}
                        <Send size={16} />
                      </>
                    )}
                  </span>
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <div
                    className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200/60"
                    style={{ animation: 'successPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-green-900 mb-0.5" style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
                        {dict?.consultationModal?.successTitle || (lang === 'ru' ? 'Заявка успешно отправлена!' : lang === 'en' ? 'Request submitted successfully!' : 'تم إرسال الطلب بنجاح!')}
                      </p>
                      <p className="text-sm text-green-700" style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
                        {dict?.consultationModal?.success || (lang === 'ru' ? 'Мы свяжемся с вами в ближайшее время.' : lang === 'en' ? 'We will contact you shortly.' : 'سنتواصل معك قريباً.')}
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200/60"
                    style={{ animation: 'shake 0.5s ease-in-out' }}
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-red-900 mb-0.5" style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
                        {dict?.consultationModal?.errorTitle || (lang === 'ru' ? 'Произошла ошибка' : lang === 'en' ? 'An error occurred' : 'حدث خطأ')}
                      </p>
                      <p className="text-sm text-red-700" style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
                        {dict?.consultationModal?.error || (lang === 'ru' ? 'Пожалуйста, попробуйте еще раз.' : lang === 'en' ? 'Please try again.' : 'يرجى المحاولة مرة أخرى.')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Privacy note */}
                <p
                  className="text-xs text-center text-[#4A3B2C]/50"
                  style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                >
                  {dict?.consultationModal?.privacy || (
                    <>
                      {lang === 'ru' && 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности'}
                      {lang === 'en' && 'By clicking the button, you agree to the privacy policy'}
                      {lang === 'ar' && 'بالنقر على الزر، فإنك توافق على سياسة الخصوصية'}
                    </>
                  )}
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

        @keyframes successPop {
          0% { opacity: 0; transform: scale(0.8); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
