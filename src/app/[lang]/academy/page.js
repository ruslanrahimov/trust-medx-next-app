import { getDictionary } from '@/lib/i18n';
import AcademyHero from '@/components/AcademyHero';
import AcademyBenefits from '@/components/AcademyBenefits';
import ProgramCards from '@/components/ProgramCards';
import AcademyCTA from '@/components/AcademyCTA';

export default async function AcademyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <AcademyHero dict={dict} />
      <ProgramCards dict={dict} lang={lang} />
      <AcademyBenefits dict={dict} />
      <AcademyCTA dict={dict} lang={lang} />
    </main>
  );
}

// Генерация статических параметров для всех языков
export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}

// Метаданные для SEO
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.pages.academy.title,
    description: dict.pages.academy.description,
  };
}
