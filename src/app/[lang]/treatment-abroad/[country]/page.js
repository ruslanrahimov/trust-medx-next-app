import { getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import CountryHero from '@/components/CountryHero';
import CountryDescription from '@/components/CountryDescription';
import CountryTreatments from '@/components/CountryTreatments';
import CountryAccommodation from '@/components/CountryAccommodation';
import CountryCTA from '@/components/CountryCTA';

// Valid country slugs
const VALID_COUNTRIES = ['turkey', 'south-korea', 'china'];

export default async function CountryPage({ params }) {
  const { lang, country } = await params;

  // Validate country slug
  if (!VALID_COUNTRIES.includes(country)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <CountryHero dict={dict} lang={lang} country={country} />
      <CountryDescription dict={dict} lang={lang} country={country} />
      <CountryTreatments dict={dict} lang={lang} country={country} />
      <CountryAccommodation dict={dict} lang={lang} country={country} />
      <CountryCTA dict={dict} lang={lang} country={country} />
    </main>
  );
}

export async function generateStaticParams() {
  const langs = ['ru', 'en', 'ar'];
  const countries = VALID_COUNTRIES;

  return langs.flatMap(lang =>
    countries.map(country => ({
      lang,
      country,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { lang, country } = await params;
  const dict = await getDictionary(lang);

  const countryNames = {
    'turkey': dict.treatmentAbroad?.countries?.turkey?.name || 'Turkey',
    'south-korea': dict.treatmentAbroad?.countries?.southKorea?.name || 'South Korea',
    'china': dict.treatmentAbroad?.countries?.china?.name || 'China',
  };

  return {
    title: `${dict.pages?.treatmentAbroad?.title || 'Treatment'} - ${countryNames[country]}`,
    description: dict.pages?.treatmentAbroad?.description || 'Medical treatment abroad',
  };
}
