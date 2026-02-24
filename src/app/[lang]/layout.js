import { Geist, Geist_Mono, Fraunces, DM_Sans } from "next/font/google";
import "../globals.css";
import { i18n, getTextDirection, getDictionary } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HtmlAttrs from '@/components/HtmlAttrs';
import '@/components/Navbar.css';
import '@/components/LanguageSwitcher.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "TrustMedX",
  description: "Медицинская платформа мирового уровня",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const dir = getTextDirection(lang);
  const dict = await getDictionary(lang);

  return (
    <div
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${dmSans.variable} antialiased flex flex-col min-h-screen`}
    >
      <HtmlAttrs lang={lang} dir={dir} />
      <Navbar lang={lang} dict={dict} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
