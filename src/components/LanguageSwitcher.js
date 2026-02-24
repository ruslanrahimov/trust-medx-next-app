'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n, languages } from '@/lib/i18n';
import './LanguageSwitcher.css';

export default function LanguageSwitcher({ currentLang, isMobileMenu = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const switchLanguage = (newLang) => {
    if (!pathname) return;

    // Replace current language with new one in URL
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');

    // Save language choice in cookie
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;

    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage = languages[currentLang];
  const showDropdown = isMobileMenu || isOpen;

  return (
    <div className="language-switcher">
      {!isMobileMenu && (
        <button
          className="language-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Select language"
          aria-expanded={isOpen}
        >
          <svg
            className="globe-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="language-text">{currentLanguage.name}</span>
        </button>
      )}

      {showDropdown && (
        <>
          <div className="language-dropdown" ref={dropdownRef}>
            {i18n.locales.map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`language-option ${currentLang === lang ? 'language-option-active' : ''}`}
                aria-label={`Switch to ${languages[lang].nativeName}`}
              >
                <span className="language-option-name">{languages[lang].name}</span>
                <span className="language-option-native">{languages[lang].nativeName}</span>
                {currentLang === lang && !isMobileMenu && (
                  <svg
                    className="check-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          {!isMobileMenu && (
            <div
              className="language-backdrop"
              onClick={() => setIsOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
