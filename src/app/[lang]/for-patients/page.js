import { getDictionary } from '@/lib/i18n';
import PageHeader from '@/components/PageHeader';
import FAQ from '@/components/FAQ';
import UsefulInfo from '@/components/UsefulInfo';
import HowWeWork from '@/components/HowWeWork';
import TestimonialsSection from '@/components/TestimonialsSection';
import ConsultationCTA from '@/components/ConsultationCTA';

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
			<HowWeWork dict={dict} lang={lang} />
			<UsefulInfo dict={dict} lang={lang} />
			<TestimonialsSection dict={dict} />
			<FAQ dict={dict} lang={lang} />
			<ConsultationCTA dict={dict} lang={lang} />
		</main>
	);
}

export async function generateStaticParams() {
	return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}
