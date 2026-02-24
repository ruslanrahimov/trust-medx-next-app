import { NextResponse } from 'next/server';
import { i18n } from './lib/i18n';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Проверяем, есть ли язык в URL
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Определяем язык из заголовка Accept-Language или используем язык по умолчанию
  const locale = getLocale(request) || i18n.defaultLocale;

  // Редирект на URL с языком
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

function getLocale(request) {
  // Проверяем cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Проверяем заголовок Accept-Language
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase())
      .find((lang) => {
        // Проверяем точное совпадение
        if (i18n.locales.includes(lang)) return true;
        // Проверяем совпадение по первой части (например, en-US -> en)
        const shortLang = lang.split('-')[0];
        return i18n.locales.includes(shortLang);
      });

    if (preferredLocale) {
      const locale = preferredLocale.split('-')[0];
      return i18n.locales.includes(locale) ? locale : null;
    }
  }

  return null;
}

export const config = {
  matcher: [
    // Пропускаем внутренние пути Next.js и статические файлы
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
};
