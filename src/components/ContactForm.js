'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactForm({ dict, lang }) {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.from('.contact-form-badge', {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // Form card animation
      gsap.from('.contact-form-card', {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 60,
        x: 20,
        rotation: 1,
        duration: 1,
        ease: 'power3.out',
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      // In production, replace with actual API call
      const success = Math.random() > 0.2; // 80% success rate for demo
      setStatus(success ? 'success' : 'error');

      if (success) {
        setFormState({ name: '', email: '', phone: '', message: '' });
      }

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div ref={formRef} className="space-y-6">
      {/* Badge */}
      <div className="contact-form-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#D4A574]/20">
        <div className="w-2 h-2 rounded-full bg-[#D4A574] animate-pulse" />
        <span className="text-sm font-medium text-[#4A3B2C]/80 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
          {dict.contactForm.badge}
        </span>
      </div>

      {/* Form Card */}
      <div className="contact-form-card group relative">
        <div className="relative p-8 md:p-10 bg-white/95 backdrop-blur-sm rounded-[2.5rem] border border-[#4A3B2C]/10 shadow-2xl shadow-[#D4A574]/10 transition-all duration-500">
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#D4A574]/0 to-[#D4A574]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Title */}
          <h3
            className="relative text-2xl md:text-3xl font-bold text-[#4A3B2C] mb-2"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {dict.contactForm.title}
          </h3>
          <p className="relative text-[#4A3B2C]/70 mb-8 font-[family-name:var(--font-dm-sans)]">
            {dict.contactForm.description}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative space-y-5">
            {/* Name Field */}
            <div className="group/field">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#4A3B2C] mb-2 font-[family-name:var(--font-dm-sans)]"
              >
                {dict.contactForm.fields.name.label}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                placeholder={dict.contactForm.fields.name.placeholder}
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-[#4A3B2C]/10 bg-white/50 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#5FA8A3] focus:bg-white focus:shadow-lg focus:shadow-[#5FA8A3]/10 font-[family-name:var(--font-dm-sans)]"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Email & Phone Fields - Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Email Field */}
              <div className="group/field">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#4A3B2C] mb-2 font-[family-name:var(--font-dm-sans)]"
                >
                  {dict.contactForm.fields.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder={dict.contactForm.fields.email.placeholder}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-[#4A3B2C]/10 bg-white/50 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#5FA8A3] focus:bg-white focus:shadow-lg focus:shadow-[#5FA8A3]/10 font-[family-name:var(--font-dm-sans)]"
                  dir="ltr"
                />
              </div>

              {/* Phone Field */}
              <div className="group/field">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-[#4A3B2C] mb-2 font-[family-name:var(--font-dm-sans)]"
                >
                  {dict.contactForm.fields.phone.label}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder={dict.contactForm.fields.phone.placeholder}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-[#4A3B2C]/10 bg-white/50 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#5FA8A3] focus:bg-white focus:shadow-lg focus:shadow-[#5FA8A3]/10 font-[family-name:var(--font-dm-sans)]"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="group/field">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-[#4A3B2C] mb-2 font-[family-name:var(--font-dm-sans)]"
              >
                {dict.contactForm.fields.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={dict.contactForm.fields.message.placeholder}
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-[#4A3B2C]/10 bg-white/50 text-[#4A3B2C] placeholder-[#4A3B2C]/40 transition-all duration-300 focus:outline-none focus:border-[#5FA8A3] focus:bg-white focus:shadow-lg focus:shadow-[#5FA8A3]/10 resize-none font-[family-name:var(--font-dm-sans)]"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group/btn w-full relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] text-white font-semibold shadow-lg shadow-[#5FA8A3]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#5FA8A3]/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed font-[family-name:var(--font-dm-sans)]"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A9691] to-[#5FA8A3] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

              <span className="relative flex items-center justify-center gap-2">
                {status === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {dict.contactForm.sending}
                  </>
                ) : (
                  <>
                    {dict.contactForm.submit}
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </>
                )}
              </span>
            </button>

            {/* Success/Error Messages */}
            {status === 'success' && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-green-50 border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800 font-[family-name:var(--font-dm-sans)]">
                  {dict.contactForm.success}
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-[family-name:var(--font-dm-sans)]">
                  {dict.contactForm.error}
                </p>
              </div>
            )}
          </form>

          {/* Decorative corner element */}
          <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-bl from-[#D4A574]/20 to-transparent rounded-[2rem] -z-10 blur-xl" />
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
