// Конфигурация языков
export const i18n = {
  defaultLocale: 'ru',
  locales: ['ru', 'en', 'ar'],
};

// Информация о языках
export const languages = {
  ru: {
    name: 'Русский',
    nativeName: 'Русский',
    dir: 'ltr',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl', // Right-to-left для арабского
  },
};

// Функция для получения словаря
export async function getDictionary(locale) {
  try {
    return (await import(`@/dictionaries/${locale}.json`)).default;
  } catch (error) {
    // Если словарь не найден, возвращаем русский по умолчанию
    return (await import(`@/dictionaries/${i18n.defaultLocale}.json`)).default;
  }
}

// Проверка валидности языка
export function isValidLocale(locale) {
  return i18n.locales.includes(locale);
}

// Получение направления текста для языка
export function getTextDirection(locale) {
  return languages[locale]?.dir || 'ltr';
}
