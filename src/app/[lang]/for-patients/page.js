import { getDictionary } from '@/lib/i18n';
import PageHeader from '@/components/PageHeader';
import FAQ from '@/components/FAQ';
import UsefulInfo from '@/components/UsefulInfo';
import Testimonials from '@/components/Testimonials';

export default async function ForPatientsPage({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<main>
			<PageHeader
				subtitle={dict.pages.forPatients.pageHeader.subtitle}
				title={dict.pages.forPatients.pageHeader.title}
				description={dict.pages.forPatients.pageHeader.description}
			/>
			<UsefulInfo dict={dict} lang={lang} />
			<Testimonials
				testimonials={dict.testimonials.items}
				title={dict.testimonials.title}
				subtitle={dict.testimonials.subtitle}
				lang={lang}
			/>
			<FAQ dict={dict} lang={lang} />
		</main>
	);
}

export async function generateStaticParams() {
	return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}
