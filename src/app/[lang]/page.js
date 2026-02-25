import { getDictionary } from '@/lib/i18n';
import Hero from '@/components/Hero';
import HomeServices from '@/components/HomeServices';
import HomeWhyUs from '@/components/HomeWhyUs';
import HomeProcess from '@/components/HomeProcess';
import HomeAbout from '@/components/HomeAbout';
import HomeDestinations from '@/components/HomeDestinations';
import TestimonialsSection from '@/components/TestimonialsSection';
import ConsultationCTA from '@/components/ConsultationCTA';

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <Hero dict={dict} lang={lang} />

      {/* Services Section */}
      <HomeServices dict={dict} lang={lang} />

      {/* Why Choose Us Section */}
      <HomeWhyUs dict={dict} />

      {/* Process/How We Work Section */}
      <HomeProcess dict={dict} />

      {/* About Us Summary Section */}
      <HomeAbout dict={dict} lang={lang} />

      {/* Featured Destinations Section */}
      <HomeDestinations dict={dict} lang={lang} />

      {/* Testimonials Section */}
      <TestimonialsSection dict={dict} />

      {/* Final CTA Section */}
      <ConsultationCTA dict={dict} lang={lang} />
    </main>
  );
}

// Генерация статических параметров для всех языков
export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}
