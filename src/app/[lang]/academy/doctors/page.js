import DoctorsHero from '@/components/DoctorsHero';
import DoctorsPrograms from '@/components/DoctorsPrograms';
import DoctorsHowToJoin from '@/components/DoctorsHowToJoin';
import DoctorsCTA from '@/components/DoctorsCTA';

export default async function DoctorsPage({ params }) {
  return (
    <main className="min-h-screen">
      <DoctorsHero />
      <DoctorsPrograms />
      <DoctorsHowToJoin />
      <DoctorsCTA />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata() {
  return {
    title: 'Обучающие программы для докторов — TrustMedX Академия',
    description:
      'Профессиональное развитие и стажировки для врачей в ведущих клиниках Турции. 6 специализаций: трансплантация волос, пластическая хирургия, стоматология, ЭКО, менеджмент клиник. Международные сертификаты.',
  };
}
