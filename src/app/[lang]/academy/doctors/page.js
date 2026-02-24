import { getDictionary } from '@/lib/i18n';

export default async function DoctorsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#00ADB5] via-[#048A8F] to-[#006D75] flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.96 0L15 8" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: '"Fraunces", serif' }}>
          {dict.academy.programs.doctors.title}
        </h1>
        
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm mb-8">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white font-medium">
            {dict.academy.programs.doctors.badge}
          </span>
        </div>
        
        <p className="text-xl text-white/90 mb-8" style={{ fontFamily: '"DM Sans", sans-serif' }}>
          {dict.academy.programs.doctors.description}
        </p>
        
        <div className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <p className="text-white/70 text-lg" style={{ fontFamily: '"DM Sans", sans-serif' }}>
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
    title: `${dict.academy.programs.doctors.title} - ${dict.pages.academy.title}`,
    description: dict.academy.programs.doctors.description,
  };
}
