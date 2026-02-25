'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AsYouType } from 'libphonenumber-js';
import { ChevronDown, Search } from 'lucide-react';

function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

const PRIORITY_CODES = ['RU', 'AE', 'TR', 'DE', 'US', 'GB'];

const ALL_COUNTRIES = [
  { code: 'AE', name: 'ОАЭ',               dial: '971', example: '50 123 4567' },
  { code: 'AM', name: 'Армения',            dial: '374', example: '77 123456' },
  { code: 'AT', name: 'Австрия',            dial: '43',  example: '664 123456' },
  { code: 'AU', name: 'Австралия',          dial: '61',  example: '412 345 678' },
  { code: 'AZ', name: 'Азербайджан',        dial: '994', example: '40 123 45 67' },
  { code: 'BE', name: 'Бельгия',            dial: '32',  example: '470 12 34 56' },
  { code: 'BH', name: 'Бахрейн',            dial: '973', example: '3600 0000' },
  { code: 'BY', name: 'Беларусь',           dial: '375', example: '29 491-19-11' },
  { code: 'CA', name: 'Канада',             dial: '1',   example: '(506) 234-5678' },
  { code: 'CH', name: 'Швейцария',          dial: '41',  example: '78 123 45 67' },
  { code: 'CN', name: 'Китай',              dial: '86',  example: '131 2345 6789' },
  { code: 'CZ', name: 'Чехия',              dial: '420', example: '601 123 456' },
  { code: 'DE', name: 'Германия',           dial: '49',  example: '151 23456789' },
  { code: 'EG', name: 'Египет',             dial: '20',  example: '100 123 4567' },
  { code: 'ES', name: 'Испания',            dial: '34',  example: '612 34 56 78' },
  { code: 'FR', name: 'Франция',            dial: '33',  example: '6 12 34 56 78' },
  { code: 'GB', name: 'Великобритания',     dial: '44',  example: '7400 123456' },
  { code: 'GE', name: 'Грузия',             dial: '995', example: '555 12 34 56' },
  { code: 'IL', name: 'Израиль',            dial: '972', example: '50-234-5678' },
  { code: 'IN', name: 'Индия',              dial: '91',  example: '81234 56789' },
  { code: 'IT', name: 'Италия',             dial: '39',  example: '312 345 6789' },
  { code: 'JO', name: 'Иордания',           dial: '962', example: '7 9012 3456' },
  { code: 'JP', name: 'Япония',             dial: '81',  example: '90-1234-5678' },
  { code: 'KG', name: 'Кыргызстан',         dial: '996', example: '700 123 456' },
  { code: 'KR', name: 'Южная Корея',        dial: '82',  example: '10-2000-0000' },
  { code: 'KW', name: 'Кувейт',             dial: '965', example: '500 12345' },
  { code: 'KZ', name: 'Казахстан',          dial: '7',   example: '701 234 56 78' },
  { code: 'LB', name: 'Ливан',              dial: '961', example: '71 123 456' },
  { code: 'MD', name: 'Молдова',            dial: '373', example: '62 100 100' },
  { code: 'NL', name: 'Нидерланды',         dial: '31',  example: '6 12345678' },
  { code: 'OM', name: 'Оман',               dial: '968', example: '9212 3456' },
  { code: 'PL', name: 'Польша',             dial: '48',  example: '512 345 678' },
  { code: 'PT', name: 'Португалия',         dial: '351', example: '912 345 678' },
  { code: 'QA', name: 'Катар',              dial: '974', example: '3312 3456' },
  { code: 'RU', name: 'Россия',             dial: '7',   example: '912 345-67-89' },
  { code: 'SA', name: 'Саудовская Аравия',  dial: '966', example: '51 234 5678' },
  { code: 'SE', name: 'Швеция',             dial: '46',  example: '70-123 45 67' },
  { code: 'TJ', name: 'Таджикистан',        dial: '992', example: '917 12 3456' },
  { code: 'TM', name: 'Туркменистан',       dial: '993', example: '66 123456' },
  { code: 'TR', name: 'Турция',             dial: '90',  example: '501 234 56 89' },
  { code: 'UA', name: 'Украина',            dial: '380', example: '50 123 4567' },
  { code: 'US', name: 'США',                dial: '1',   example: '(201) 555-0123' },
  { code: 'UZ', name: 'Узбекистан',         dial: '998', example: '90 123 45 67' },
];

const priorityCountries = PRIORITY_CODES
  .map(c => ALL_COUNTRIES.find(x => x.code === c))
  .filter(Boolean);

const otherCountries = ALL_COUNTRIES
  .filter(c => !PRIORITY_CODES.includes(c.code))
  .sort((a, b) => a.name.localeCompare(b.name, 'ru'));

function formatPhoneAsYouType(digits, countryCode) {
  if (!digits) return '';
  const formatter = new AsYouType(countryCode);
  let result = '';
  for (const d of digits) {
    result = formatter.input(d);
  }
  return result;
}

export default function PhoneInputField({ onChange, required }) {
  const [selectedCountry, setSelectedCountry] = useState(
    ALL_COUNTRIES.find(c => c.code === 'RU')
  );
  const [displayValue, setDisplayValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState({});

  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const closeDropdown = () => {
    setIsOpen(false);
    setSearch('');
  };

  // Focus search field when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => searchRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e) => {
      const dropdown = document.getElementById('phone-country-dropdown');
      if (
        containerRef.current?.contains(e.target) ||
        dropdown?.contains(e.target)
      ) return;
      closeDropdown();
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  // Close dropdown on scroll outside the dropdown (so it doesn't drift)
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = (e) => {
      const dropdown = document.getElementById('phone-country-dropdown');
      if (dropdown && dropdown.contains(e.target)) return;
      closeDropdown();
    };
    document.addEventListener('scroll', handleScroll, true);
    return () => document.removeEventListener('scroll', handleScroll, true);
  }, [isOpen]);

  const openDropdown = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownMaxH = 260;

    if (spaceBelow >= dropdownMaxH) {
      setDropdownStyle({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        maxHeight: dropdownMaxH,
      });
    } else {
      setDropdownStyle({
        bottom: window.innerHeight - rect.top + 4,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(dropdownMaxH, rect.top - 8),
      });
    }
    setIsOpen(true);
    setSearch('');
  };

  const handlePhoneInput = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    const formatted = formatPhoneAsYouType(digits, selectedCountry.code);
    setDisplayValue(formatted);
    onChange(formatted ? `+${selectedCountry.dial} ${formatted}` : '');
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDisplayValue('');
    onChange('');
    closeDropdown();
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const filteredList = search.trim()
    ? ALL_COUNTRIES
        .filter(c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.startsWith(search.replace(/\D/g, ''))
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
    : null;

  const listItems = filteredList
    ? filteredList
    : [...priorityCountries, null, ...otherCountries];

  return (
    <>
      <div
        ref={containerRef}
        className="flex rounded-lg border-2 border-[#4A3B2C]/10 bg-white/60 transition-all duration-300 focus-within:border-[#D4A574] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-[#D4A574]/20 hover:border-[#4A3B2C]/20"
      >
        {/* Country selector button */}
        <button
          type="button"
          onClick={isOpen ? closeDropdown : openDropdown}
          className="flex items-center gap-1 pl-2.5 pr-2 py-1.5 sm:py-2 border-r border-[#4A3B2C]/10 hover:bg-[#D4A574]/8 transition-colors duration-200 rounded-l-[6px] flex-shrink-0 cursor-pointer"
          aria-label="Выбрать страну"
        >
          <span className="text-base leading-none select-none">{getFlagEmoji(selectedCountry.code)}</span>
          <span
            className="text-xs font-semibold text-[#4A3B2C]/80 tabular-nums"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            +{selectedCountry.dial}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-[#4A3B2C]/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Phone number input */}
        <input
          ref={inputRef}
          type="tel"
          value={displayValue}
          onChange={handlePhoneInput}
          placeholder={selectedCountry.example}
          required={required}
          className="flex-1 min-w-0 px-2.5 py-1.5 sm:py-2 bg-transparent text-[#4A3B2C] placeholder-[#4A3B2C]/40 focus:outline-none text-sm sm:text-base rounded-r-[6px]"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
          dir="ltr"
        />
      </div>

      {/* Dropdown — rendered via portal to escape transform stacking context */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          id="phone-country-dropdown"
          style={{
            position: 'fixed',
            top: dropdownStyle.top,
            bottom: dropdownStyle.bottom,
            left: dropdownStyle.left,
            width: dropdownStyle.width,
            maxHeight: dropdownStyle.maxHeight,
            zIndex: 999999,
          }}
          className="flex flex-col bg-[#FEFBF6] border border-[#D4A574]/25 rounded-xl shadow-2xl shadow-[#4A3B2C]/15 overflow-hidden"
        >
          {/* Search */}
          <div className="flex-shrink-0 p-2 border-b border-[#4A3B2C]/8">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/70 border border-[#4A3B2C]/10">
              <Search className="w-3.5 h-3.5 text-[#4A3B2C]/40 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск страны..."
                className="flex-1 bg-transparent text-xs text-[#4A3B2C] placeholder-[#4A3B2C]/40 focus:outline-none"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              />
            </div>
          </div>

          {/* Country list */}
          <div className="overflow-y-auto flex-1">
            {listItems.map((country, idx) => {
              if (country === null) {
                return <div key="sep" className="mx-3 my-0.5 h-px bg-[#4A3B2C]/8" />;
              }
              const isSelected = selectedCountry.code === country.code;
              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors duration-100 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4A574]/15 text-[#C89563]'
                      : 'hover:bg-[#4A3B2C]/5 text-[#4A3B2C]'
                  }`}
                >
                  <span className="text-sm leading-none select-none flex-shrink-0">
                    {getFlagEmoji(country.code)}
                  </span>
                  <span
                    className="flex-1 text-xs font-medium truncate"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {country.name}
                  </span>
                  <span
                    className="text-[10px] text-[#4A3B2C]/50 flex-shrink-0 tabular-nums"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    +{country.dial}
                  </span>
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
