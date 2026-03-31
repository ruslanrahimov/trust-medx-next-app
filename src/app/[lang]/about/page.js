import { getDictionary } from '@/lib/i18n';
import AboutHero from '@/components/AboutHero';
import AboutIntro from '@/components/AboutIntro';
import AboutSystem from '@/components/AboutSystem';
import AboutApproach from '@/components/AboutApproach';
import AboutPhilosophy from '@/components/AboutPhilosophy';
import AboutValues from '@/components/AboutValues';
import FounderSection from '@/components/FounderSection';
import AboutStats from '@/components/AboutStats';
import ConsultationCTA from '@/components/ConsultationCTA';

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* Hero Section */}
      <AboutHero dict={dict} lang={lang} />

      {/* Company Introduction */}
      <AboutIntro dict={dict} />

      {/* System of Verification */}
      <AboutSystem dict={dict} />

      {/* Our Approach */}
      <AboutApproach dict={dict} />

      {/* Philosophy */}
      <AboutPhilosophy dict={dict} />

      {/* Why Choose TrustMedX */}
      <AboutValues dict={dict} />

      {/* Founder Section */}
      <FounderSection dict={dict} />

      {/* Statistics */}
      <AboutStats dict={dict} />

      {/* Call to Action */}
      <ConsultationCTA dict={dict} lang={lang} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}
