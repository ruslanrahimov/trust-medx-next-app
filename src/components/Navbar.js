'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import ConsultationModal from './ConsultationModal';
import './Navbar.css';

export default function Navbar({ lang, dict }) {
        const [isScrolled, setIsScrolled] = useState(false);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

        useEffect(() => {
                const handleScroll = () => {
                        setIsScrolled(window.scrollY > 10);
                };

                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        // Allow opening consultation modal from other components (e.g. Home CTA)
        useEffect(() => {
                const openModal = () => {
                        setIsMenuOpen(false);
                        setIsConsultationModalOpen(true);
                };

                window.addEventListener('open-consultation-modal', openModal);
                return () => window.removeEventListener('open-consultation-modal', openModal);
        }, []);

        // Lock body scroll when mobile menu is open
        useEffect(() => {
                if (isMenuOpen) {
                        document.body.style.overflow = 'hidden';
                } else {
                        document.body.style.overflow = '';
                }

                return () => {
                        document.body.style.overflow = '';
                };
        }, [isMenuOpen]);

        const navItems = [
                {
                        label: dict?.nav?.treatmentAbroad || 'Treatment Abroad',
                        href: `/${lang}/treatment-abroad`,
                        hasDropdown: false
                },
                {
                        label: dict?.nav?.forPatients || 'For Patients',
                        href: `/${lang}/for-patients`,
                        hasDropdown: false
                },
                {
                        label: dict?.nav?.academy || 'Academy',
                        href: `/${lang}/academy`,
                        hasDropdown: false
                },
                {
                        label: dict?.nav?.about || 'About',
                        href: `/${lang}/about`,
                        hasDropdown: false
                },
                {
                        label: dict?.nav?.contacts || 'Contacts',
                        href: `/${lang}/contacts`,
                        hasDropdown: false
                }
        ];

        return (
                <>
                        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                                <div className="navbar-container">
                                        {/* Logo */}
                                        <Link href={`/${lang}`} className="navbar-logo">
                                                <Image
                                                        src="/trustmedx-logo.png"
                                                        alt="TrustMedX"
                                                        width={140}
                                                        height={32}
                                                        priority
                                                        className="logo-desktop"
                                                />
                                                <Image
                                                        src="/trustmedx-logo-mobile.png"
                                                        alt="TrustMedX"
                                                        width={40}
                                                        height={32}
                                                        priority
                                                        className="logo-mobile"
                                                />
                                        </Link>

                                        {/* Desktop Navigation */}
                                        <div className="navbar-menu">
                                                {navItems.map((item, index) => (
                                                        <Link key={index} href={item.href} className="navbar-item font-bold">
                                                                {item.label}
                                                        </Link>
                                                ))}
                                        </div>

                                        {/* Right Side Actions */}
                                        <div className="navbar-actions">
                                                {/* Desktop Only - Language & Consultation */}
                                                <div className="navbar-desktop-actions">
                                                        <LanguageSwitcher currentLang={lang} />

                                                        <button
                                                                onClick={() => setIsConsultationModalOpen(true)}
                                                                className="group"
                                                        >
                                                                <div
                                                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-500 group-hover:gap-3 group-hover:px-6 cursor-pointer"
                                                                        style={{
                                                                                background: 'linear-gradient(135deg, #1a3a38 0%, #2C5F5D 100%)',
                                                                                color: 'white',
                                                                                boxShadow: '0 4px 12px rgba(44, 95, 93, 0.4)',
                                                                                fontFamily: 'var(--font-dm-sans)',
                                                                        }}
                                                                >
                                                                        <span>{(dict?.nav?.onlineConsultation || 'Online Consultation').toUpperCase()}</span>
                                                                        <svg
                                                                                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                        >
                                                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                                                        </svg>
                                                                </div>
                                                        </button>
                                                </div>

                                                {/* Mobile Menu Button */}
                                                <button
                                                        className="mobile-menu-button"
                                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                                        aria-label="Toggle menu"
                                                >
                                                        <div className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
                                                                <span></span>
                                                                <span></span>
                                                                <span></span>
                                                        </div>
                                                </button>
                                        </div>
                                </div>

                                {/* Mobile Menu - Fullscreen */}
                                <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
                                        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />

                                        <div className="mobile-menu-content">
                                                {/* Navigation Links */}
                                                <nav className="mobile-nav-links">
                                                        {navItems.map((item, index) => (
                                                                <Link
                                                                        key={index}
                                                                        href={item.href}
                                                                        className="mobile-menu-item"
                                                                        style={{ animationDelay: `${index * 0.08}s` }}
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                        <span className="mobile-menu-item-number">0{index + 1}</span>
                                                                        <span className="mobile-menu-item-text">{item.label}</span>
                                                                        <svg
                                                                                className="mobile-menu-item-arrow"
                                                                                width="24"
                                                                                height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                        >
                                                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                                                        </svg>
                                                                </Link>
                                                        ))}
                                                </nav>

                                                {/* Bottom Actions */}
                                                <div className="mobile-menu-bottom">
                                                        {/* Language Switcher */}
                                                        <div className="mobile-language-wrapper" style={{ animationDelay: `${navItems.length * 0.08}s` }}>
                                                                <LanguageSwitcher currentLang={lang} isMobileMenu={true} />
                                                        </div>

                                                        {/* Consultation Button */}
                                                        <button
                                                                onClick={() => {
                                                                        setIsMenuOpen(false);
                                                                        setIsConsultationModalOpen(true);
                                                                }}
                                                                className="mobile-consultation-cta"
                                                                style={{ animationDelay: `${(navItems.length + 1) * 0.08}s` }}
                                                        >
                                                                <span className="mobile-consultation-cta-text">
                                                                        {(dict?.nav?.onlineConsultation || 'Online Consultation').toUpperCase()}
                                                                </span>
                                                                <svg
                                                                        className="mobile-consultation-cta-arrow"
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                >
                                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                                </svg>
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        </nav>

                        {/* Backdrop */}
                        {isMenuOpen && (
                                <div
                                        className="mobile-backdrop"
                                        onClick={() => setIsMenuOpen(false)}
                                />
                        )}

                        {/* Consultation Modal */}
                        <ConsultationModal
                                isOpen={isConsultationModalOpen}
                                onClose={() => setIsConsultationModalOpen(false)}
                                dict={dict}
                                lang={lang}
                        />
                </>
        );
}
