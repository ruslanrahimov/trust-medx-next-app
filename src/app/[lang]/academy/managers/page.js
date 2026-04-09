import AgentsHero from '@/components/AgentsHero';
import AgentsModules from '@/components/AgentsModules';
import AgentsHowToJoin from '@/components/AgentsHowToJoin';
import AgentsCTA from '@/components/AgentsCTA';

export default async function ManagersPage() {
  return (
    <main className="min-h-screen">
      <AgentsHero />
      <AgentsModules />
      <AgentsHowToJoin />
      <AgentsCTA />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata() {
  return {
    title: 'Программа для специалистов медицинского туризма — TrustMedX Академия',
    description:
      'Обучение консультантов и координаторов в сфере медицинского туризма. 6 модулей: основы, работа с пациентами, маркетинг, юридические вопросы, управление сетью агентов. Сертификат по завершении.',
  };
}
