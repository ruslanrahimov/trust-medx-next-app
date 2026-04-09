import { getDictionary } from '@/lib/i18n';
import DoctorsHero from '@/components/DoctorsHero';
import DoctorsPrograms from '@/components/DoctorsPrograms';
import DoctorsHowToJoin from '@/components/DoctorsHowToJoin';
import DoctorsCTA from '@/components/DoctorsCTA';

export default async function DoctorsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const doctorsDict = dict?.pages?.academy?.doctors || {};

  return (
    <main className="min-h-screen">
      <DoctorsHero dict={doctorsDict.hero} />
      <DoctorsPrograms dict={doctorsDict.programs} />
      <DoctorsHowToJoin dict={doctorsDict.howToJoin} />
      <DoctorsCTA dict={doctorsDict.cta} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const meta = dict?.pages?.academy?.doctors?.meta || {};
  return {
    title: meta.title || 'Обучающие программы для докторов — TrustMedX Академия',
    description: meta.description || 'Профессиональное развитие и стажировки для врачей в ведущих клиниках Турции.',
  };
}
