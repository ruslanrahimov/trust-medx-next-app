'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function AgentsHero({ dict = {} }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.ah-badge', { opacity: 0, y: 20, duration: 0.6 })
        .from('.ah-title-1', { opacity: 0, y: 50, duration: 0.9 }, '-=0.3')
        .from('.ah-title-2', { opacity: 0, y: 50, duration: 0.9 }, '-=0.65')
        .from('.ah-desc', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
        .from('.ah-path', { opacity: 0, x: -20, duration: 0.5, stagger: 0.12 }, '-=0.5')
        .from('.ah-visual', { opacity: 0, x: 50, duration: 1.0 }, '-=0.9');

      // Orb float
      gsap.to('.ah-orb-1', { y: -30, x: -14, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.ah-orb-2', { y: 20, x: 16, duration: 7.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.ah-orb-3', { y: -22, x: -8, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Float cards
      gsap.to('.ah-float-1', { y: -10, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.ah-float-2', { y: 8, duration: 4.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Route line draw
      const routePath = document.querySelector('.ah-route-path');
      if (routePath) {
        const len = routePath.getTotalLength();
        gsap.set(routePath, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(routePath, { strokeDashoffset: 0, duration: 3.2, ease: 'power2.inOut', delay: 0.6 });
        gsap.to(routePath, {
          strokeDashoffset: -len,
          duration: 3.2,
          ease: 'power2.inOut',
          delay: 5,
          repeat: -1,
          repeatDelay: 2,
          onRepeat() { gsap.set(routePath, { strokeDashoffset: len }); },
        });
      }

      // Radar rings pulse
      gsap.to('.ah-radar-ring-1', { scale: 1.08, opacity: 0.04, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.ah-radar-ring-2', { scale: 1.06, opacity: 0.03, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });
      gsap.to('.ah-radar-ring-3', { scale: 1.04, opacity: 0.025, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 });

      // Network nodes pulse
      gsap.utils.toArray('.ah-node').forEach((node, i) => {
        gsap.to(node, { opacity: 0.5, scale: 1.4, duration: 1.2 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4 });
      });

      // Network lines draw in
      gsap.utils.toArray('.ah-net-line').forEach((line, i) => {
        const len = line.getTotalLength ? line.getTotalLength() : 200;
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.out', delay: 1 + i * 0.2 });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const pathLabels = dict.paths || ['Карьера в медтуризме', 'Личный бренд агента', 'Реальные кейсы'];
  const paths = pathLabels.map((label) => ({ label, icon: '→' }));

  const statAccents = ['#D4A574', '#7EBDB8', '#D4A574', '#7EBDB8'];
  const rawStats = dict.stats || [
    { num: '6', label: 'модулей' },
    { num: 'Online', label: '+ очно' },
    { num: '360°', label: 'обучение' },
    { num: '★', label: 'сертификат' },
  ];
  const stats = rawStats.map((s, i) => ({ ...s, accent: statAccents[i] }));

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #162e2c 0%, #2C5F5D 45%, #1e4b48 80%, #1a3a38 100%)' }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.024] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      {/* === Elegant geometric composition === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Radar / sonar rings — anchored bottom-left */}
        <svg className="absolute -bottom-32 -left-32 ah-radar-ring-1" width="600" height="600" viewBox="0 0 600 600" fill="none" style={{ opacity: 0.06 }}>
          <circle cx="300" cy="300" r="280" stroke="#7EBDB8" strokeWidth="0.8" strokeDasharray="3 6"/>
        </svg>
        <svg className="absolute -bottom-32 -left-32 ah-radar-ring-2" width="600" height="600" viewBox="0 0 600 600" fill="none" style={{ opacity: 0.05 }}>
          <circle cx="300" cy="300" r="200" stroke="#7EBDB8" strokeWidth="0.8" strokeDasharray="2 8"/>
        </svg>
        <svg className="absolute -bottom-32 -left-32 ah-radar-ring-3" width="600" height="600" viewBox="0 0 600 600" fill="none" style={{ opacity: 0.04 }}>
          <circle cx="300" cy="300" r="120" stroke="#D4A574" strokeWidth="0.8" strokeDasharray="2 6"/>
        </svg>

        {/* Global route network — full width */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700" fill="none" preserveAspectRatio="xMidYMid slice">
          {/* Connection lines */}
          <line className="ah-net-line" x1="180" y1="180" x2="520" y2="320" stroke="#7EBDB8" strokeWidth="0.6" opacity="0.18"/>
          <line className="ah-net-line" x1="520" y1="320" x2="880" y2="200" stroke="#7EBDB8" strokeWidth="0.6" opacity="0.18"/>
          <line className="ah-net-line" x1="880" y1="200" x2="1240" y2="360" stroke="#7EBDB8" strokeWidth="0.6" opacity="0.18"/>
          <line className="ah-net-line" x1="180" y1="180" x2="340" y2="480" stroke="#D4A574" strokeWidth="0.5" opacity="0.14"/>
          <line className="ah-net-line" x1="340" y1="480" x2="700" y2="540" stroke="#D4A574" strokeWidth="0.5" opacity="0.14"/>
          <line className="ah-net-line" x1="700" y1="540" x2="1060" y2="460" stroke="#D4A574" strokeWidth="0.5" opacity="0.14"/>
          <line className="ah-net-line" x1="1060" y1="460" x2="1240" y2="360" stroke="#D4A574" strokeWidth="0.5" opacity="0.14"/>
          <line className="ah-net-line" x1="520" y1="320" x2="700" y2="540" stroke="#7EBDB8" strokeWidth="0.4" opacity="0.10"/>
          <line className="ah-net-line" x1="880" y1="200" x2="1060" y2="460" stroke="#7EBDB8" strokeWidth="0.4" opacity="0.10"/>
          <line className="ah-net-line" x1="340" y1="480" x2="520" y2="320" stroke="#D4A574" strokeWidth="0.4" opacity="0.09"/>

          {/* Network nodes */}
          <circle className="ah-node" cx="180" cy="180" r="3" fill="#7EBDB8" opacity="0.35"/>
          <circle className="ah-node" cx="520" cy="320" r="4" fill="#7EBDB8" opacity="0.35"/>
          <circle className="ah-node" cx="880" cy="200" r="3.5" fill="#D4A574" opacity="0.35"/>
          <circle className="ah-node" cx="1240" cy="360" r="3" fill="#7EBDB8" opacity="0.35"/>
          <circle className="ah-node" cx="340" cy="480" r="2.5" fill="#D4A574" opacity="0.30"/>
          <circle className="ah-node" cx="700" cy="540" r="3" fill="#D4A574" opacity="0.30"/>
          <circle className="ah-node" cx="1060" cy="460" r="2.5" fill="#7EBDB8" opacity="0.30"/>

          {/* Node outer rings */}
          <circle cx="520" cy="320" r="10" stroke="#7EBDB8" strokeWidth="0.5" opacity="0.15" fill="none"/>
          <circle cx="880" cy="200" r="8" stroke="#D4A574" strokeWidth="0.5" opacity="0.15" fill="none"/>
          <circle cx="700" cy="540" r="8" stroke="#D4A574" strokeWidth="0.5" opacity="0.12" fill="none"/>
        </svg>

        {/* Elegant arc — top right corner */}
        <svg className="absolute -top-20 -right-20" width="500" height="500" viewBox="0 0 500 500" fill="none" style={{ opacity: 0.07 }}>
          <path d="M500,0 A500,500 0 0,0 0,500" stroke="#D4A574" strokeWidth="0.8"/>
          <path d="M500,80 A420,420 0 0,0 80,500" stroke="#D4A574" strokeWidth="0.6"/>
          <path d="M500,160 A340,340 0 0,0 160,500" stroke="#7EBDB8" strokeWidth="0.5"/>
        </svg>

        {/* Longitude/latitude-style subtle grid — centre */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="700" height="500" viewBox="0 0 700 500" fill="none" style={{ opacity: 0.04 }}>
          {[100,200,300,400,500,600].map(x => (
            <ellipse key={x} cx="350" cy="250" rx={x/2} ry={x/3.5} stroke="#7EBDB8" strokeWidth="0.6"/>
          ))}
          <line x1="350" y1="0" x2="350" y2="500" stroke="#7EBDB8" strokeWidth="0.5"/>
          <line x1="0" y1="250" x2="700" y2="250" stroke="#7EBDB8" strokeWidth="0.5"/>
          <line x1="90" y1="50" x2="610" y2="450" stroke="#7EBDB8" strokeWidth="0.4"/>
          <line x1="610" y1="50" x2="90" y2="450" stroke="#7EBDB8" strokeWidth="0.4"/>
        </svg>

        {/* Thin horizontal scan line */}
        <svg className="absolute left-0 w-full" style={{ top: '38%', height: '1px', opacity: 0.08 }}>
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#7EBDB8" strokeWidth="1" strokeDasharray="120 40"/>
        </svg>
      </div>

      {/* Orbs — placed differently from DoctorsHero */}
      <div
        className="ah-orb-1 absolute -top-24 right-0 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.16) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />
      <div
        className="ah-orb-2 absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(95,168,163,0.14) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="ah-orb-3 absolute top-1/2 -left-24 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(126,189,184,0.10) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.88fr] gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            {/* Badge */}
            <div
              className="ah-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
              style={{
                background: 'rgba(212,165,116,0.12)',
                border: '1px solid rgba(212,165,116,0.28)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A574] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4A574]" />
              </span>
              <span
                className="text-[#D4A574] text-xs uppercase tracking-[0.18em] font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {dict.badge || 'Специалисты медицинского туризма'}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 leading-[1.08]" style={{ fontFamily: "'Fraunces', 'Crimson Pro', Georgia, serif" }}>
              <span className="ah-title-1 block text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                {dict.titleLine1 || 'TrustMedX'}
              </span>
              <span
                className="ah-title-2 block text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(110deg, #5FA8A3 0%, #4A9691 45%, #D4A574 100%)' }}
              >
                {dict.titleLine2 || 'Академия'}
              </span>
            </h1>

            {/* Description */}
            <p
              className="ah-desc text-lg text-white/72 leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {dict.description || 'Обучаем консультантов и координаторов, которые хотят развиваться в индустрии медицинского туризма. Делимся опытом, инструментами и реальными кейсами.'}
            </p>

            {/* Path bullets */}
            <div className="flex flex-col gap-2.5 mb-10">
              {paths.map((p, i) => (
                <div
                  key={i}
                  className="ah-path inline-flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,165,116,0.20)', border: '1px solid rgba(212,165,116,0.35)' }}
                  >
                    <svg className="w-2.5 h-2.5 text-[#D4A574]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6h8M6 2l4 4-4 4" />
                    </svg>
                  </div>
                  <span
                    className="text-sm text-white/75"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2.5">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="text-center p-3 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="text-xl font-bold mb-0.5 leading-none"
                    style={{ fontFamily: "'Fraunces', serif", color: s.accent }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-[10px] text-white/48 uppercase tracking-wide"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="ah-visual hidden lg:block">
            <div className="relative">
              {/* Main image */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Image
                  src="/agent-hero.png"
                  alt={dict.imageAlt || 'Обучение агентов медицинского туризма'}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#162e2c]/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Format badge */}
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.30)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span
                    className="text-white text-xs font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {dict.formatBadge || 'Online + On-site'}
                  </span>
                </div>
              </div>

              {/* Float card 1 — bottom left */}
              <div
                className="ah-float-1 absolute -bottom-5 -left-6 px-5 py-4 rounded-2xl"
                style={{
                  background: 'rgba(26,58,56,0.96)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  className="text-2xl font-bold text-white mb-0.5"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {dict.floatCard1Number || '100+'}
                </div>
                <div
                  className="text-xs text-white/55"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {dict.floatCard1Label || 'агентов прошли обучение'}
                </div>
              </div>

              {/* Float card 2 — top right */}
              <div
                className="ah-float-2 absolute -top-5 -right-5 flex items-center gap-3 px-4 py-3 rounded-2xl"
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
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {dict.floatCard2Title || 'Сертификат'}
                  </div>
                  <div
                    className="text-white/70 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {dict.floatCard2Subtitle || 'по завершении курса'}
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
            d="M0,30 C300,70 600,10 900,45 C1100,65 1300,20 1440,40 L1440,80 L0,80 Z"
            fill="#FEFBF6"
          />
        </svg>
      </div>
    </section>
  );
}
