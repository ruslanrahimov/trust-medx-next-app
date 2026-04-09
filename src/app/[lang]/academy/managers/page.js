import { getDictionary } from '@/lib/i18n';
import AgentsHero from '@/components/AgentsHero';
import AgentsModules from '@/components/AgentsModules';
import AgentsHowToJoin from '@/components/AgentsHowToJoin';
import AgentsCTA from '@/components/AgentsCTA';

export default async function ManagersPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const agentsDict = dict?.pages?.academy?.agents || {};

  return (
    <main className="min-h-screen">
      <AgentsHero dict={agentsDict.hero} />
      <AgentsModules dict={agentsDict.modules} />
      <AgentsHowToJoin dict={agentsDict.howToJoin} />
      <AgentsCTA dict={agentsDict.cta} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const meta = dict?.pages?.academy?.agents?.meta || {};
  return {
    title: meta.title || 'Программа для специалистов медицинского туризма — TrustMedX Академия',
    description: meta.description || 'Обучение консультантов и координаторов в сфере медицинского туризма.',
  };
}
