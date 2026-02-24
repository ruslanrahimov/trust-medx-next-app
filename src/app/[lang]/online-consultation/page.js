import { getDictionary } from '@/lib/i18n';

export default async function OnlineConsultationPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      <h1>{dict.pages.onlineConsultation.title}</h1>
      <p>{dict.pages.onlineConsultation.description}</p>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}
