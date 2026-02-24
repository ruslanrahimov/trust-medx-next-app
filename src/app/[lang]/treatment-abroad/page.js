import { getDictionary } from '@/lib/i18n';
import TreatmentAbroadHero from '@/components/TreatmentAbroadHero';
import CountrySelection from '@/components/CountrySelection';
import ProcessSteps from '@/components/ProcessSteps';
import ConsultationCTA from '@/components/ConsultationCTA';

export default async function TreatmentAbroadPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <TreatmentAbroadHero dict={dict} lang={lang} />
      <CountrySelection dict={dict} lang={lang} />
      <ProcessSteps dict={dict} />
      <ConsultationCTA dict={dict} lang={lang} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.pages.treatmentAbroad.title,
    description: dict.pages.treatmentAbroad.description,
  };
}
