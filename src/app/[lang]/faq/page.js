import { getDictionary } from '@/lib/i18n';
import FAQ from '@/components/FAQ';

export const metadata = {
  title: 'FAQs - TrustMedX',
  description: 'Frequently asked questions about TrustMedX medical services',
};

export default async function FAQPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <FAQ dict={dict} lang={lang} />
    </main>
  );
}
