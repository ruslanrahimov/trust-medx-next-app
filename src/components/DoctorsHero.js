'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function DoctorsHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.dh-badge', { opacity: 0, y: 20, duration: 0.6 })
        .from('.dh-title-1', { opacity: 0, y: 50, duration: 0.9 }, '-=0.3')
        .from('.dh-title-2', { opacity: 0, y: 50, duration: 0.9 }, '-=0.65')
        .from('.dh-desc', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
        .from('.dh-stat', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .from('.dh-visual', { opacity: 0, x: 50, duration: 1.0 }, '-=1.0');

      // Floating orbs
      gsap.to('.dh-orb-1', { y: -28, x: 14, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.dh-orb-2', { y: 22, x: -12, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.dh-orb-3', { y: -18, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Floating visual cards
      gsap.to('.dh-float-1', { y: -9, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.dh-float-2', { y: 9, duration: 4.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // ECG line draw
      const ecgPath = document.querySelector('.dh-ecg-path');
      if (ecgPath) {
        const len = ecgPath.getTotalLength();
        gsap.set(ecgPath, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(ecgPath, { strokeDashoffset: 0, duration: 2.8, ease: 'power2.inOut', delay: 0.5 });
        // loop: fade out then redraw
        gsap.to(ecgPath, {
          strokeDashoffset: -len,
          duration: 2.8,
          ease: 'power2.inOut',
          delay: 4,
          repeat: -1,
          repeatDelay: 1.5,
          onRepeat() {
            gsap.set(ecgPath, { strokeDashoffset: len });
          },
        });
      }

      // Surgical target rings pulse
      gsap.to('.dh-target-ring-1', { scale: 1.06, opacity: 0.04, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.dh-target-ring-2', { scale: 1.04, opacity: 0.03, duration: 5.0, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

      // Molecular nodes pulse
      gsap.utils.toArray('.dh-mol-node').forEach((node, i) => {
        gsap.to(node, { opacity: 0.45, scale: 1.5, duration: 1.4 + i * 0.25, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.35 });
      });

      // Molecular bonds draw in
      gsap.utils.toArray('.dh-mol-bond').forEach((line, i) => {
        const len = line.getTotalLength ? line.getTotalLength() : 150;
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out', delay: 1.2 + i * 0.15 });
      });

      // DNA strands slow drift
      gsap.to('.dh-dna-strand', { y: -20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { num: '6', label: 'специализаций' },
    { num: '4–6', label: 'чел. в группе' },
    { num: '100%', label: 'сертификация' },
    { num: 'TOP', label: 'клиники Турции' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 55%, #2a4a47 100%)' }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.024] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* Orbs */}
      <div
        className="dh-orb-1 absolute top-1/4 right-1/3 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(95,168,163,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="dh-orb-2 absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="dh-orb-3 absolute top-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(126,189,184,0.10) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ECG / heartbeat line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute bottom-[14%] left-0 w-full"
          viewBox="0 0 1440 140"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: '140px', opacity: 0.22 }}
        >
          <path
            className="dh-ecg-path"
            d="M0,70 L120,70 L150,70 L165,14 L180,126 L195,14 L210,126 L225,70 L270,70 L300,70 L320,70 L340,24 L355,116 L368,24 L382,116 L395,70 L440,70 L480,70 L500,70 L518,30 L530,110 L542,30 L554,110 L566,70 L620,70 L680,70 L700,70 L716,18 L728,122 L740,18 L752,122 L764,70 L820,70 L880,70 L900,70 L916,10 L930,130 L944,10 L958,130 L972,70 L1040,70 L1100,70 L1120,70 L1136,28 L1148,112 L1160,28 L1172,112 L1184,70 L1260,70 L1320,70 L1340,70 L1356,16 L1368,124 L1380,16 L1392,124 L1404,70 L1440,70"
            stroke="#7EBDB8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* === Elegant medical geometric composition === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Surgical target — top right, precision crosshair */}
        <svg className="absolute -top-16 -right-16 dh-target-ring-1" width="480" height="480" viewBox="0 0 480 480" fill="none" style={{ opacity: 0.07 }}>
          <circle cx="240" cy="240" r="220" stroke="#7EBDB8" strokeWidth="0.8" strokeDasharray="2 8"/>
          <circle cx="240" cy="240" r="160" stroke="#7EBDB8" strokeWidth="0.8" strokeDasharray="3 6"/>
          <circle cx="240" cy="240" r="100" stroke="#D4A574" strokeWidth="0.7" strokeDasharray="2 5"/>
          <circle cx="240" cy="240" r="40" stroke="#D4A574" strokeWidth="0.7" fill="none"/>
          {/* Crosshair lines */}
          <line x1="240" y1="20" x2="240" y2="80" stroke="#7EBDB8" strokeWidth="0.6" opacity="0.5"/>
          <line x1="240" y1="400" x2="240" y2="460" stroke="#7EBDB8" strokeWidth="0.6" opacity="0.5"/>
          <line x1="20" y1="240" x2="80" y2="240" stroke="#7EBDB8" strokeWidth="0.6" opacity="0.5"/>
          <line x1="400" y1="240" x2="460" y2="240" stroke="#7EBDB8" strokeWidth="0.6" opacity="0.5"/>
        </svg>

        {/* Molecular structure — left side */}
        <svg className="absolute top-[10%] left-[2%] w-full h-full" viewBox="0 0 600 700" fill="none" style={{ maxWidth: '380px', opacity: 1 }}>
          {/* Bonds */}
          <line className="dh-mol-bond" x1="80" y1="200" x2="160" y2="300" stroke="#7EBDB8" strokeWidth="0.7" opacity="0.18"/>
          <line className="dh-mol-bond" x1="160" y1="300" x2="80" y2="400" stroke="#7EBDB8" strokeWidth="0.7" opacity="0.18"/>
          <line className="dh-mol-bond" x1="80" y1="400" x2="160" y2="500" stroke="#7EBDB8" strokeWidth="0.7" opacity="0.18"/>
          <line className="dh-mol-bond" x1="160" y1="300" x2="260" y2="300" stroke="#D4A574" strokeWidth="0.6" opacity="0.14"/>
          <line className="dh-mol-bond" x1="80" y1="400" x2="180" y2="380" stroke="#D4A574" strokeWidth="0.6" opacity="0.14"/>
          <line className="dh-mol-bond" x1="260" y1="300" x2="320" y2="200" stroke="#7EBDB8" strokeWidth="0.5" opacity="0.12"/>
          <line className="dh-mol-bond" x1="260" y1="300" x2="320" y2="400" stroke="#7EBDB8" strokeWidth="0.5" opacity="0.12"/>
          {/* Nodes */}
          <circle className="dh-mol-node" cx="80" cy="200" r="4" fill="#7EBDB8" opacity="0.3"/>
          <circle className="dh-mol-node" cx="160" cy="300" r="5.5" fill="#7EBDB8" opacity="0.3"/>
          <circle className="dh-mol-node" cx="80" cy="400" r="4" fill="#D4A574" opacity="0.28"/>
          <circle className="dh-mol-node" cx="160" cy="500" r="3.5" fill="#7EBDB8" opacity="0.25"/>
          <circle className="dh-mol-node" cx="260" cy="300" r="4.5" fill="#D4A574" opacity="0.28"/>
          <circle className="dh-mol-node" cx="180" cy="380" r="3" fill="#D4A574" opacity="0.22"/>
          <circle className="dh-mol-node" cx="320" cy="200" r="3.5" fill="#7EBDB8" opacity="0.22"/>
          <circle className="dh-mol-node" cx="320" cy="400" r="3" fill="#7EBDB8" opacity="0.20"/>
          {/* Outer rings on key nodes */}
          <circle cx="160" cy="300" r="14" stroke="#7EBDB8" strokeWidth="0.5" opacity="0.12" fill="none"/>
          <circle cx="260" cy="300" r="12" stroke="#D4A574" strokeWidth="0.5" opacity="0.10" fill="none"/>
        </svg>

        {/* DNA double helix — right edge, elegant curves */}
        <svg className="dh-dna-strand absolute top-[8%] right-[2%]" width="60" height="500" viewBox="0 0 60 500" fill="none" style={{ opacity: 0.14 }}>
          <path d="M10,0 C10,0 50,50 50,125 C50,200 10,250 10,250 C10,250 50,300 50,375 C50,450 10,500 10,500" stroke="#7EBDB8" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M50,0 C50,0 10,50 10,125 C10,200 50,250 50,250 C50,250 10,300 10,375 C10,450 50,500 50,500" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          {[62,125,188,250,312,375,438].map((y, i) => (
            <line key={i} x1="10" y1={y} x2="50" y2={y} stroke={i % 2 === 0 ? '#7EBDB8' : '#D4A574'} strokeWidth="0.8" opacity="0.5"/>
          ))}
        </svg>

        {/* Elegant concentric arcs — bottom left */}
        <svg className="absolute -bottom-10 -left-10 dh-target-ring-2" width="420" height="420" viewBox="0 0 420 420" fill="none" style={{ opacity: 0.06 }}>
          <path d="M420,420 A400,400 0 0,0 20,420" stroke="#D4A574" strokeWidth="0.8"/>
          <path d="M420,420 A310,310 0 0,0 110,420" stroke="#D4A574" strokeWidth="0.7"/>
          <path d="M420,420 A220,220 0 0,0 200,420" stroke="#7EBDB8" strokeWidth="0.6"/>
          <path d="M420,420 A130,130 0 0,0 290,420" stroke="#7EBDB8" strokeWidth="0.5"/>
        </svg>

        {/* Thin horizontal scan line */}
        <svg className="absolute left-0 w-full" style={{ top: '42%', height: '1px', opacity: 0.07 }}>
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#7EBDB8" strokeWidth="1" strokeDasharray="100 30"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div
              className="dh-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A574] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4A574]" />
              </span>
              <span
                className="text-white/85 text-xs uppercase tracking-[0.18em] font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Обучающие программы для докторов
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 leading-[1.08]" style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
              <span className="dh-title-1 block text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                TrustMedX
              </span>
              <span
                className="dh-title-2 block text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(110deg, #D4A574 0%, #C89563 45%, #7EBDB8 100%)' }}
              >
                Академия
              </span>
            </h1>

            {/* Description */}
            <p
              className="dh-desc text-lg text-white/72 leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Международная платформа, объединяющая врачей и клиники со всего мира. Программы
              профессионального развития и стажировки в ведущих клиниках Турции — практический
              опыт и международные сертификаты.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="dh-stat text-center p-3.5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-0.5"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      color: i % 2 === 0 ? '#D4A574' : '#7EBDB8',
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="text-[11px] text-white/50 uppercase tracking-wide"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="dh-visual hidden lg:block">
            <div className="relative">
              {/* Main image */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  border: '1px solid rgba(255,255,255,0.13)',
                }}
              >
                <Image
                  src="/doctors_edu_hero.png"
                  alt="Обучение докторов в клиниках Турции"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#1a3a38]/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Location tag */}
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.30)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span
                    className="text-white text-xs font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Istanbul, Turkey
                  </span>
                </div>
              </div>

              {/* Floating card 1 — bottom left */}
              <div
                className="dh-float-1 absolute -bottom-5 -left-6 px-5 py-4 rounded-2xl"
                style={{
                  background: 'rgba(26,58,56,0.96)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  className="text-2xl font-bold text-white mb-0.5"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  200+
                </div>
                <div
                  className="text-xs text-white/55"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  врачей прошли обучение
                </div>
              </div>

              {/* Floating card 2 — top right */}
              <div
                className="dh-float-2 absolute -top-5 -right-5 flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Сертификат
                  </div>
                  <div
                    className="text-white/70 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    международного образца
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: '80px' }}
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1360,20 1440,30 L1440,80 L0,80 Z"
            fill="#FEFBF6"
          />
        </svg>
      </div>
    </section>
  );
}
