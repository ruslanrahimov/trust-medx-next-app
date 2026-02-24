'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactMap({ dict }) {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map container animation
      gsap.from(mapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
      });

      // Badge animation
      gsap.from('.map-badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Baku, Azerbaijan coordinates
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.42118888483!2d49.70883659999999!3d40.394606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s";

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-b from-[#FEFBF6] to-white overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/3 w-96 h-96 bg-gradient-to-br from-[#5FA8A3]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-gradient-to-tl from-[#D4A574]/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Map Container */}
        <div ref={mapRef} className="group relative">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 border border-[#4A3B2C]/10">
            {/* Map Embed */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-[#F5F3EE]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TrustMedX Location"
                className="grayscale-[30%] contrast-[1.1] brightness-[0.98]"
              />

              {/* Overlay gradient for aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B2C]/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Info Card */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 max-w-sm">
              <div className="map-badge relative p-5 md:p-6 bg-white/95 backdrop-blur-md rounded-3xl border border-[#4A3B2C]/10 shadow-xl shadow-black/10">
                {/* Icon */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5FA8A3] to-[#4A9691] shadow-lg shadow-[#5FA8A3]/30">
                    <MapPin className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>

                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold text-[#4A3B2C] mb-1"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      {dict.map.title}
                    </h3>
                    <p className="text-sm text-[#4A3B2C]/70 font-[family-name:var(--font-dm-sans)]">
                      {dict.map.description}
                    </p>
                  </div>
                </div>

                {/* Decorative pulse */}
                <div className="absolute -top-1 -right-1 w-4 h-4">
                  <div className="absolute inset-0 bg-[#5FA8A3] rounded-full animate-ping opacity-75" />
                  <div className="relative w-4 h-4 bg-[#5FA8A3] rounded-full" />
                </div>
              </div>
            </div>

            {/* Get Directions Button - Bottom Right */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
              <a
                href="https://maps.google.com/?q=Baku,Azerbaijan"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-[#D4A574] to-[#C89A6B] text-white font-semibold shadow-lg shadow-[#D4A574]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4A574]/50 hover:-translate-y-0.5 font-[family-name:var(--font-dm-sans)]"
              >
                <Navigation className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-12" />
                <span className="hidden md:inline">Get Directions</span>
                <span className="md:hidden">Directions</span>
              </a>
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#5FA8A3]/20 to-transparent rounded-[2rem] -z-10 blur-2xl" />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-tl from-[#D4A574]/20 to-transparent rounded-[2rem] -z-10 blur-2xl" />
        </div>
      </div>

      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
