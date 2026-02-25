'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection({ dict }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const sliderRef = useRef(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = dict.testimonials.items;
  const testimonialsDict = dict.pages.homePage.testimonials;
  const totalPages = Math.max(1, Math.ceil(testimonials.length / cardsPerView));
  const activePage = Math.min(currentPage, totalPages - 1);
  const startIndex = activePage * cardsPerView;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + cardsPerView);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
        return;
      }
      if (window.innerWidth < 1024) {
        setCardsPerView(2);
        return;
      }
      setCardsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const changePage = (nextPage) => {
    if (isAnimating || nextPage === activePage || !sliderRef.current) return;

    setIsAnimating(true);
    gsap.to(sliderRef.current, {
      opacity: 0,
      y: 14,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentPage(nextPage);
        gsap.fromTo(
          sliderRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power3.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-badge', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.testimonials-title', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 30, duration: 0.8, delay: 0.15, ease: 'power3.out',
      });
      gsap.from('.testimonials-subtitle', {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: 'power3.out',
      });
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 60, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      });
      gsap.to('.float-quote-bg', {
        y: -18, rotation: -6, duration: 4, ease: 'sine.inOut',
        repeat: -1, yoyo: true, stagger: { each: 1.2, from: 'random' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 60%, #1e3533 100%)' }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-gradient-to-br from-[#5FA8A3]/18 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[560px] h-[560px] bg-gradient-to-tl from-[#D4A574]/14 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#5FA8A3]/6 to-transparent rounded-full blur-3xl" />
        <Quote className="float-quote-bg absolute top-24 left-12 w-28 h-28 text-white/4" />
        <Quote className="float-quote-bg absolute top-1/3 right-16 w-36 h-36 text-white/4 rotate-180" />
        <Quote className="float-quote-bg absolute bottom-28 left-1/3 w-20 h-20 text-white/4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="testimonials-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-7">
            <Star className="w-4 h-4" style={{ color: '#D4A574', fill: '#D4A574' }} />
            <span className="text-xs font-semibold text-white uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {testimonialsDict.badge}
            </span>
          </div>

          <h2 className="testimonials-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
            {testimonialsDict.title}
          </h2>

          <p className="testimonials-subtitle text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.6)' }}>
            {testimonialsDict.subtitle}
          </p>
        </div>

        {/* Slider */}
        <div ref={sliderRef}>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${startIndex + index}-${testimonial.name}`}
              className="testimonial-card group relative rounded-2xl p-8 flex flex-col cursor-default min-h-[430px] md:min-h-[460px] lg:min-h-[500px]"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            >
              {/* Teal opening quote */}
              <span
                className="absolute top-5 left-6 text-5xl leading-none select-none"
                style={{
                  fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif",
                  color: 'rgba(95,168,163,0.40)', lineHeight: 1,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5 mt-2">
                {[...Array(testimonial.rating ?? 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ color: '#D4A574', fill: '#D4A574' }} />
                ))}
              </div>

              {/* Quote text */}
              <blockquote
                className="flex-1 text-lg leading-relaxed mb-6 italic"
                style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif", color: 'rgba(255,255,255,0.90)' }}
              >
                {testimonial.text}
              </blockquote>

              {/* Separator */}
              <div className="w-full h-px mb-6" style={{ background: 'rgba(255,255,255,0.10)' }} />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center shadow-md"
                  style={{ background: 'linear-gradient(135deg, #5FA8A3 0%, #D4A574 100%)' }}
                >
                  <span className="text-lg font-bold text-white"
                    style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
                    {testimonial.name.charAt(0)}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-white text-sm truncate"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {testimonial.name}
                  </div>
                  <div className="text-xs truncate mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.50)' }}>
                    {testimonial.location}{testimonial.treatment ? ` · ${testimonial.treatment}` : ''}
                  </div>
                  {testimonial.date && (
                    <div className="text-xs mt-1"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.30)' }}>
                      {testimonial.date}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {testimonials.length > cardsPerView && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => changePage((activePage - 1 + totalPages) % totalPages)}
              disabled={isAnimating}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-300 hover:bg-white/20"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  onClick={() => changePage(pageIndex)}
                  disabled={isAnimating}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activePage === pageIndex ? 'w-8 bg-[#5FA8A3]' : 'w-2.5 bg-white/35 hover:bg-white/55'
                  }`}
                  aria-label={`Go to testimonials page ${pageIndex + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => changePage((activePage + 1) % totalPages)}
              disabled={isAnimating}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-300 hover:bg-white/20"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
