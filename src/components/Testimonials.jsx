'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';

// Hook for responsive items per page
function useResponsiveItemsPerPage(defaultItemsPerPage) {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile
        setItemsPerPage(1);
      } else if (width < 1024) {
        // Tablet
        setItemsPerPage(2);
      } else {
        // Desktop
        setItemsPerPage(defaultItemsPerPage);
      }
    };

    // Set initial value
    updateItemsPerPage();

    // Add event listener
    window.addEventListener('resize', updateItemsPerPage);

    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [defaultItemsPerPage]);

  return itemsPerPage;
}

// Star Rating Component
function StarRating({ rating, maxStars = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }).map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 transition-all duration-300 ${
            index < rating
              ? 'fill-[#967259] text-[#967259]'
              : 'fill-none text-[#2C5F5D]/20'
          }`}
        />
      ))}
    </div>
  );
}

// Avatar Component - displays image or initials
function Avatar({ src, name, size = 'md' }) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 md:w-16 md:h-16 text-base md:text-lg',
    lg: 'w-20 h-20 text-xl',
  };

  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  if (src && !imageError) {
    return (
      <div className={`${sizeClasses[size]} relative rounded-2xl overflow-hidden ring-4 ring-white/80 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 768px) 40px, (max-width: 1024px) 56px, 80px"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-[#2C5F5D] to-[#967259] flex items-center justify-center text-white font-bold ring-4 ring-white/80 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
      {getInitials(name)}
    </div>
  );
}

// Single Testimonial Card
function TestimonialCard({ testimonial, index, isRTL }) {
  return (
    <div
      className="group h-full"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
      }}
    >
      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl border border-[#2C5F5D]/15 p-6 md:p-8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(44,95,93,0.15)] hover:-translate-y-2 hover:border-[#2C5F5D]/30 hover:bg-white overflow-hidden">

        {/* Decorative quote mark */}
        <div className="absolute top-6 right-6 opacity-[0.06] transition-all duration-500 group-hover:opacity-[0.1] group-hover:scale-110">
          <Quote className="w-20 h-20 md:w-24 md:h-24 text-[#2C5F5D]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header with Avatar and Info */}
          <div className="flex items-center gap-4 mb-5">
            <Avatar
              src={testimonial.avatar}
              name={testimonial.name}
              size="md"
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-base md:text-lg font-semibold text-[#2D3748] mb-1 truncate">
                {testimonial.name}
              </h4>
              <p className="text-xs md:text-sm text-[#718096] truncate">
                {testimonial.location}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={testimonial.rating} />
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-sm md:text-base text-[#4A5568] leading-relaxed mb-4 relative">
            <span className="text-2xl text-[#2C5F5D]/30 absolute -left-2 -top-2">&ldquo;</span>
            <p className={`${isRTL ? 'pr-4' : 'pl-4'}`}>
              {testimonial.text}
            </p>
          </blockquote>

          {/* Date or Treatment Type */}
          {testimonial.date && (
            <div className="flex items-center justify-between pt-4 border-t border-[#2C5F5D]/10">
              <span className="text-xs md:text-sm text-[#718096]">
                {testimonial.date}
              </span>
              {testimonial.treatment && (
                <span className="text-xs px-3 py-1 rounded-full bg-[#2C5F5D]/10 text-[#2C5F5D] font-medium">
                  {testimonial.treatment}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F5D]/5 via-transparent to-[#967259]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2C5F5D] via-[#967259] to-[#2C5F5D] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
      </div>
    </div>
  );
}

// Main Testimonials Component
export default function Testimonials({
  testimonials = [],
  title,
  subtitle,
  lang = 'en',
  showTitle = true,
  itemsPerPage: defaultItemsPerPage = 3,
  autoPlay = true,
  autoPlayInterval = 5000,
  showWriteButton = true,
  onWriteReview,
  className = '',
}) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isRTL = lang === 'ar';

  // Use responsive items per page
  const itemsPerPage = useResponsiveItemsPerPage(defaultItemsPerPage);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const totalPages = Math.ceil(displayTestimonials.length / itemsPerPage);

  // Reset to first page when itemsPerPage changes (e.g., on resize)
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalPages]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalPages]);

  const goToPage = useCallback((pageIndex) => {
    if (isTransitioning || pageIndex === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(pageIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalPages <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext, totalPages]);

  // Get current page testimonials
  const getCurrentPageTestimonials = () => {
    const startIndex = currentIndex * itemsPerPage;
    return displayTestimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentTestimonials = getCurrentPageTestimonials();

  // Handle write review button
  const handleWriteReview = () => {
    if (onWriteReview) {
      onWriteReview();
    } else {
      // Default behavior - scroll to contact or open modal
      console.log('Write review clicked');
    }
  };

  // Default testimonials if none provided
  const defaultTestimonials = [
    {
      id: 1,
      name: 'Мария Иванова',
      location: 'Москва, Россия',
      avatar: '',
      rating: 5,
      text: 'TrustMedX помогли мне организовать лечение в Турции. Всё прошло идеально - от первой консультации до возвращения домой. Профессиональная команда!',
      date: 'Декабрь 2025',
      treatment: 'Кардиология',
    },
    {
      id: 2,
      name: 'Ahmed Al-Rashid',
      location: 'Dubai, UAE',
      avatar: '',
      rating: 5,
      text: 'Excellent service! They handled everything professionally and made the entire treatment process smooth and stress-free.',
      date: 'November 2025',
      treatment: 'Oncology',
    },
    {
      id: 3,
      name: 'Elena Schmidt',
      location: 'Berlin, Germany',
      avatar: '',
      rating: 4,
      text: 'Very satisfied with the support provided throughout my medical journey. The team was always available to answer questions.',
      date: 'October 2025',
      treatment: 'Orthopedics',
    },
  ];

  return (
    <section className={`relative py-16 md:py-24 px-4 md:px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'} ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFBF6] via-[#FAF8F0] to-[#FEFBF6]" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-[#2C5F5D] rounded-full blur-[140px] opacity-[0.06]" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[#967259] rounded-full blur-[140px] opacity-[0.06]" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #2C5F5D 1px, transparent 0)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Decorative accent lines */}
      <div className="absolute top-0 left-1/3 w-px h-40 bg-gradient-to-b from-transparent via-[#2C5F5D]/20 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-px h-48 bg-gradient-to-t from-transparent via-[#967259]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        {showTitle && (
          <div
            className="text-center mb-12 md:mb-16"
            style={{
              opacity: 0,
              animation: mounted ? 'fadeInUp 0.8s ease-out forwards' : 'none',
            }}
          >
            {/* Decorative top element */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2C5F5D]/40" />
              <div className="mx-3 flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#967259] animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F5D] animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#2C5F5D]/40" />
            </div>

            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2D3748] mb-4 tracking-tight">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-base md:text-lg text-[#718096] max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-500 ease-out"
              style={{
                opacity: isTransitioning ? 0.5 : 1,
                transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              {currentTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${currentIndex}-${testimonial.id || index}`}
                  testimonial={testimonial}
                  index={index}
                  isRTL={isRTL}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrev}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 lg:-translate-x-12 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-[#2C5F5D]/20 text-[#2C5F5D] flex items-center justify-center transition-all duration-300 hover:bg-[#2C5F5D] hover:text-white hover:border-[#2C5F5D] hover:shadow-[0_8px_30px_rgba(44,95,93,0.3)] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#2C5F5D] group"
                aria-label={lang === 'ru' ? 'Предыдущий' : lang === 'ar' ? 'السابق' : 'Previous'}
              >
                <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 lg:translate-x-12 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-[#2C5F5D]/20 text-[#2C5F5D] flex items-center justify-center transition-all duration-300 hover:bg-[#2C5F5D] hover:text-white hover:border-[#2C5F5D] hover:shadow-[0_8px_30px_rgba(44,95,93,0.3)] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#2C5F5D] group"
                aria-label={lang === 'ru' ? 'Следующий' : lang === 'ar' ? 'التالي' : 'Next'}
              >
                <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-center gap-2 mt-8 md:mt-12"
            style={{
              opacity: 0,
              animation: mounted ? 'fadeInUp 0.8s ease-out 0.6s forwards' : 'none',
            }}
          >
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-[#2C5F5D] to-[#967259]'
                    : 'w-2 h-2 bg-[#2C5F5D]/20 hover:bg-[#2C5F5D]/40'
                } disabled:cursor-not-allowed`}
                aria-label={`${lang === 'ru' ? 'Страница' : lang === 'ar' ? 'صفحة' : 'Page'} ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Write Review Button */}
        {showWriteButton && (
          <div
            className="mt-12 flex justify-center"
            style={{
              opacity: 0,
              animation: mounted ? 'fadeInUp 0.8s ease-out 0.8s forwards' : 'none',
            }}
          >
            <button
              onClick={handleWriteReview}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2D3748] to-[#2C5F5D] text-white rounded-full font-medium transition-all duration-500 hover:shadow-[0_8px_40px_rgba(44,95,93,0.4)] hover:scale-105 active:scale-100 overflow-hidden"
            >
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <Edit3 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-base md:text-lg">
                  {lang === 'ru' && 'Написать отзыв'}
                  {lang === 'en' && 'Write a Review'}
                  {lang === 'ar' && 'اكتب تقييمًا'}
                </span>
              </span>

              {/* Shine animation */}
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </span>

              {/* Glow effect */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2C5F5D] to-[#967259] opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-500" />
            </button>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
