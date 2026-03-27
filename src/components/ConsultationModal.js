'use client';

import { useState, useEffect } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { X, Send, CheckCircle, AlertCircle, Heart, Activity, Bone, Smile, Sparkles, Stethoscope } from 'lucide-react';
import PhoneInputField from './PhoneInputField';

export default function ConsultationModal({ isOpen, onClose, dict, lang }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    description: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [isClosing, setIsClosing] = useState(false);
  const [phoneKey, setPhoneKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Specialties with icons
  const specialties = [
    { value: 'cardiology', label: dict?.consultationModal?.specialties?.cardiology || 'Кардиология', icon: Heart },
    { value: 'oncology', label: dict?.consultationModal?.specialties?.oncology || 'Онкология', icon: Activity },
    { value: 'orthopedics', label: dict?.consultationModal?.specialties?.orthopedics || 'Ортопедия', icon: Bone },
    { value: 'dentistry', label: dict?.consultationModal?.specialties?.dentistry || 'Стоматология', icon: Smile },
    { value: 'plastic', label: dict?.consultationModal?.specialties?.plastic || 'Пластическая хирургия', icon: Sparkles },
    { value: 'general', label: dict?.consultationModal?.specialties?.general || 'Общая консультация', icon: Stethoscope },
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      // Reset form after modal closes
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialty: '',
        description: '',
      });
      setStatus('idle');
      setPhoneKey(k => k + 1);
      setErrors({});
      setTouched({});
    }, 300);
  };

  const validate = (fields) => {
    const e = {};
    if (!fields.firstName.trim()) {
      e.firstName = 'Введите имя';
    } else if (fields.firstName.trim().length < 2) {
      e.firstName = 'Минимум 2 символа';
    }
    if (!fields.lastName.trim()) {
      e.lastName = 'Введите фамилию';
    } else if (fields.lastName.trim().length < 2) {
      e.lastName = 'Минимум 2 символа';
    }
    if (!fields.email.trim()) {
      e.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = 'Некорректный email';
    }
    if (!fields.phone) {
      e.phone = 'Введите телефон';
    } else {
      try {
        if (!isValidPhoneNumber(fields.phone)) {
          e.phone = 'Неверный номер телефона';
        }
      } catch {
        e.phone = 'Неверный номер телефона';
      }
    }
    if (!fields.specialty) {
      e.specialty = 'Выберите направление';
    }
    if (!fields.description.trim()) {
      e.description = 'Опишите вашу ситуацию';
    } else if (fields.description.trim().length < 10) {
      e.description = 'Минимум 10 символов';
    }
    return e;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formState);
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newState = { ...formState, [name]: value };
    setFormState(newState);
    if (touched[name]) {
      const fieldErrors = validate(newState);
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = validate(formState);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setTouched({ firstName: true, lastName: true, email: true, phone: true, specialty: true, description: true });
      return;
    }

    setStatus('sending');

    const specialtyLabel = specialties.find(s => s.value === formState.specialty)?.label || formState.specialty || '—';

    const message = [
      '🏥 *Новая заявка на консультацию*',
      '',
      `👤 *Имя:* ${formState.firstName} ${formState.lastName}`,
      `📧 *Email:* ${formState.email}`,
      `📱 *Телефон:* ${formState.phone || '—'}`,
      `🩺 *Специальность:* ${specialtyLabel}`,
      `📝 *Описание:*\n${formState.description}`,
    ].join('\n');

    try {
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus('success');
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        console.error('Telegram error:', data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#4A3B2C]/40 backdrop-blur-md transition-all duration-300"
        onClick={handleClose}
        style={{
          animation: isClosing ? 'fadeOut 0.3s ease-out' : 'fadeIn 0.3s ease-out',
        }}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full sm:max-w-lg flex flex-col transition-all duration-500 ${
          isClosing ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
        }`}
        style={{
          maxHeight: 'calc(100dvh - 1rem)',
          animation: isClosing
            ? 'modalOut 0.3s cubic-bezier(0.4, 0, 1, 1)'
            : 'modalIn 0.5s cubic-bezier(0, 0, 0.2, 1)',
        }}
      >
        {/* Modal Card */}
        <div className="relative bg-[#FEFBF6]/98 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-[#D4A574]/20 overflow-hidden flex flex-col min-h-0">
          {/* Floating decoration elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D4A574]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#5FA8A3]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-[#4A3B2C]/10 text-[#4A3B2C] hover:bg-[#D4A574]/20 hover:border-[#D4A574] hover:text-[#D4A574] transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-lg"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Scrollable Content */}
          <div className="relative overflow-y-auto overscroll-contain custom-scrollbar flex-1 min-h-0">
          <div className="p-4 sm:p-5 md:p-6">
            {/* Header */}
            <div className="text-center mb-3 sm:mb-4 space-y-1" style={{ animation: 'slideDown 0.6s ease-out 0.1s both' }}>
              {/* Title */}
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4A3B2C] leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {dict?.consultationModal?.title || 'Получите экспертную консультацию'}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#4A3B2C]/70 max-w-xl mx-auto leading-snug" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {dict?.consultationModal?.subtitle || 'Заполните форму, и наш специалист свяжется с вами в ближайшее время'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
              {/* Name Fields - Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3" style={{ animation: 'slideUp 0.6s ease-out 0.2s both' }}>
                {/* First Name */}
                <div className="group/field">
                  <label
                    htmlFor="firstName"
                    className="block text-xs sm:text-sm font-semibold text-[#4A3B2C] mb-1"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {dict?.consultationModal?.fields?.firstName || 'Имя'} <span className="text-[#D4A574]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={dict?.consultationModal?.placeholders?.firstName || 'Введите ваше имя'}
                    className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg hover:border-[#4A3B2C]/20 text-sm sm:text-base ${
                      touched.firstName && errors.firstName
                        ? 'border-red-400 focus:border-red-400 focus:shadow-red-200/50'
                        : 'border-[#4A3B2C]/10 focus:border-[#D4A574] focus:shadow-[#D4A574]/20'
                    }`}
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-0.5 text-[11px] text-red-500" style={{ fontFamily: 'var(--font-dm-sans)' }}>{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="group/field">
                  <label
                    htmlFor="lastName"
                    className="block text-xs sm:text-sm font-semibold text-[#4A3B2C] mb-1"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {dict?.consultationModal?.fields?.lastName || 'Фамилия'} <span className="text-[#D4A574]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={dict?.consultationModal?.placeholders?.lastName || 'Введите вашу фамилию'}
                    className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg hover:border-[#4A3B2C]/20 text-sm sm:text-base ${
                      touched.lastName && errors.lastName
                        ? 'border-red-400 focus:border-red-400 focus:shadow-red-200/50'
                        : 'border-[#4A3B2C]/10 focus:border-[#D4A574] focus:shadow-[#D4A574]/20'
                    }`}
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-0.5 text-[11px] text-red-500" style={{ fontFamily: 'var(--font-dm-sans)' }}>{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contact Fields - Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3" style={{ animation: 'slideUp 0.6s ease-out 0.3s both' }}>
                {/* Email */}
                <div className="group/field">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-[#4A3B2C] mb-1"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {dict?.consultationModal?.fields?.email || 'Email'} <span className="text-[#D4A574]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={dict?.consultationModal?.placeholders?.email || 'example@mail.com'}
                    className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg hover:border-[#4A3B2C]/20 text-sm sm:text-base ${
                      touched.email && errors.email
                        ? 'border-red-400 focus:border-red-400 focus:shadow-red-200/50'
                        : 'border-[#4A3B2C]/10 focus:border-[#D4A574] focus:shadow-[#D4A574]/20'
                    }`}
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                    dir="ltr"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-0.5 text-[11px] text-red-500" style={{ fontFamily: 'var(--font-dm-sans)' }}>{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="group/field">
                  <label
                    className="block text-xs sm:text-sm font-semibold text-[#4A3B2C] mb-1"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {dict?.consultationModal?.fields?.phone || 'Телефон'} <span className="text-[#D4A574]">*</span>
                  </label>
                  <PhoneInputField
                    key={phoneKey}
                    onChange={(val) => {
                      setFormState(prev => ({ ...prev, phone: val }));
                      if (touched.phone) {
                        const fe = validate({ ...formState, phone: val });
                        setErrors(prev => ({ ...prev, phone: fe.phone }));
                      }
                    }}
                    onBlur={() => {
                      setTouched(prev => ({ ...prev, phone: true }));
                      const fe = validate(formState);
                      setErrors(prev => ({ ...prev, phone: fe.phone }));
                    }}
                    hasError={!!(touched.phone && errors.phone)}
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-0.5 text-[11px] text-red-500" style={{ fontFamily: 'var(--font-dm-sans)' }}>{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Specialty Selection */}
              <div style={{ animation: 'slideUp 0.6s ease-out 0.4s both' }}>
                <label
                  htmlFor="specialty"
                  className="block text-xs sm:text-sm font-semibold text-[#4A3B2C] mb-1.5"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {dict?.consultationModal?.fields?.specialty || 'Направление консультации'} <span className="text-[#D4A574]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {specialties.map((spec) => {
                    const Icon = spec.icon;
                    const isSelected = formState.specialty === spec.value;
                    return (
                      <button
                        key={spec.value}
                        type="button"
                        onClick={() => {
                          setFormState({ ...formState, specialty: spec.value });
                          setTouched(prev => ({ ...prev, specialty: true }));
                          setErrors(prev => ({ ...prev, specialty: undefined }));
                        }}
                        className={`relative p-2 rounded-lg border-2 transition-all duration-300 text-left group/spec ${
                          isSelected
                            ? 'border-[#D4A574] bg-gradient-to-br from-[#D4A574]/20 to-[#D4A574]/5 shadow-lg shadow-[#D4A574]/20'
                            : touched.specialty && errors.specialty
                            ? 'border-red-300 bg-white/60 hover:border-[#D4A574]/50 hover:bg-white/80'
                            : 'border-[#4A3B2C]/10 bg-white/60 hover:border-[#D4A574]/50 hover:bg-white/80'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1 text-center">
                          <div
                            className={`p-1 rounded-md transition-all duration-300 ${
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
                            style={{ fontFamily: 'var(--font-dm-sans)' }}
                          >
                            {spec.label}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {touched.specialty && errors.specialty && (
                  <p className="mt-1 text-[11px] text-red-500" style={{ fontFamily: 'var(--font-dm-sans)' }}>{errors.specialty}</p>
                )}
              </div>

              {/* Description */}
              <div style={{ animation: 'slideUp 0.6s ease-out 0.5s both' }}>
                <label
                  htmlFor="description"
                  className="block text-xs sm:text-sm font-semibold text-[#4A3B2C] mb-1"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {dict?.consultationModal?.fields?.description || 'Краткое описание проблемы'} <span className="text-[#D4A574]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={2}
                  placeholder={dict?.consultationModal?.placeholders?.description || 'Опишите вашу ситуацию или вопрос...'}
                  className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 bg-white/60 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg resize-none hover:border-[#4A3B2C]/20 text-sm sm:text-base ${
                    touched.description && errors.description
                      ? 'border-red-400 focus:border-red-400 focus:shadow-red-200/50'
                      : 'border-[#4A3B2C]/10 focus:border-[#D4A574] focus:shadow-[#D4A574]/20'
                  }`}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                />
                {touched.description && errors.description && (
                  <p className="mt-0.5 text-[11px] text-red-500" style={{ fontFamily: 'var(--font-dm-sans)' }}>{errors.description}</p>
                )}
              </div>

              {/* Submit Button */}
              <div style={{ animation: 'slideUp 0.6s ease-out 0.6s both' }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group/btn w-full relative overflow-hidden px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-br from-[#1a3a38] to-[#2C5F5D] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#2C5F5D]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#2C5F5D]/40 hover:-translate-y-0.5 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-3">
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {dict?.consultationModal?.sending || 'Отправка...'}
                      </>
                    ) : (
                      <>
                        {dict?.consultationModal?.submit || 'Отправить заявку'}
                        <Send className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div
                  className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200/60"
                  style={{ animation: 'successPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-green-900 mb-0.5" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      {dict?.consultationModal?.successTitle || 'Заявка успешно отправлена!'}
                    </p>
                    <p className="text-sm text-green-700" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      {dict?.consultationModal?.success || 'Мы свяжемся с вами в ближайшее время.'}
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div
                  className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200/60"
                  style={{ animation: 'shake 0.5s ease-in-out' }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-900 mb-0.5" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      {dict?.consultationModal?.errorTitle || 'Произошла ошибка'}
                    </p>
                    <p className="text-sm text-red-700" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      {dict?.consultationModal?.error || 'Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.'}
                    </p>
                  </div>
                </div>
              )}
            </form>

            {/* Privacy Notice */}
            <p
              className="text-[10px] sm:text-xs text-[#4A3B2C]/50 text-center mt-1.5"
              style={{ fontFamily: 'var(--font-dm-sans)', animation: 'fadeIn 0.6s ease-out 0.7s both' }}
            >
              {dict?.consultationModal?.privacy || 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности'}
            </p>
          </div>
          </div>{/* end scrollable content */}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes modalOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        /* Custom scrollbar for modal */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4A574;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c89864;
        }
      `}</style>
    </div>
  );
}
