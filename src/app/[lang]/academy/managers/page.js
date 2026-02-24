import { getDictionary } from '@/lib/i18n';

export default async function ManagersPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A2463] via-[#0D3B66] to-[#001D3D] flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-[#48CAE4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            <circle cx="21" cy="5" r="2" fill="currentColor" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: '"Fraunces", serif' }}>
          {dict.academy.programs.managers.title}
        </h1>
        
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00ADB5]/20 border border-[#00ADB5]/50 backdrop-blur-sm mb-8">
          <div className="w-2 h-2 rounded-full bg-[#48CAE4] animate-pulse" />
          <span className="text-[#48CAE4] font-medium">
            {dict.academy.programs.managers.badge}
          </span>
        </div>
        
        <p className="text-xl text-white/80 mb-8" style={{ fontFamily: '"DM Sans", sans-serif' }}>
          {dict.academy.programs.managers.description}
        </p>
        
        <div className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <p className="text-white/60 text-lg" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            Detailed program information coming soon...
          </p>
        </div>
      </div>
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
    title: `${dict.academy.programs.managers.title} - ${dict.pages.academy.title}`,
    description: dict.academy.programs.managers.description,
  };
}
