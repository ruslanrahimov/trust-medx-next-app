'use client';

import { useState, useEffect } from 'react';
import { MapPin, Globe, Users, TrendingUp, Star, Award } from 'lucide-react';
import Image from 'next/image';

const countryConfig = {
  turkey: {
    accentColor: '#E30A17',
    flag: '🇹🇷',
    imagePlaceholder: '/countries/turkey-landscape.jpg',
  },
  'south-korea': {
    accentColor: '#0047A0',
    flag: '🇰🇷',
    imagePlaceholder: '/countries/south-korea-landscape.jpg',
  },
  china: {
    accentColor: '#DE2910',
    flag: '🇨🇳',
    imagePlaceholder: '/countries/china-landscape.jpg',
  },
};

function HighlightCard({ icon: Icon, title, description, delay, accentColor }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="relative group h-full"
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        animation: isVisible ? `fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none',
      }}
    >
      <div className="flex items-start gap-4 p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-[#4A3B2C]/10 hover:border-[#4A3B2C]/20 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg h-full">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
          }}
        >
          <Icon size={22} strokeWidth={2} style={{ color: accentColor }} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4
            className="text-lg font-bold text-[#4A3B2C] mb-1"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {title}
          </h4>
          <p
            className="text-sm text-[#4A3B2C]/70 leading-relaxed"
            style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CountryDescription({ dict, lang, country }) {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const config = countryConfig[country] || countryConfig.turkey;

  const getCountryName = (country) => {
    const names = {
      turkey: { ru: 'Турция', en: 'Turkey', ar: 'تركيا' },
      'south-korea': { ru: 'Южная Корея', en: 'South Korea', ar: 'كوريا الجنوبية' },
      china: { ru: 'Китай', en: 'China', ar: 'الصين' },
    };
    return names[country]?.[lang] || names[country]?.ru || 'Turkey';
  };

  const countryInfo = {
    turkey: {
      name: getCountryName('turkey'),
      description: {
        main: lang === 'ru'
          ? 'Турция занимает лидирующие позиции в мировом медицинском туризме благодаря уникальному сочетанию передовых технологий, высококвалифицированных специалистов и доступных цен. Страна привлекает более 1 миллиона медицинских туристов ежегодно.'
          : lang === 'en'
          ? 'Turkey holds a leading position in global medical tourism thanks to a unique combination of advanced technologies, highly qualified specialists and affordable prices. The country attracts more than 1 million medical tourists annually.'
          : 'تحتل تركيا مكانة رائدة في السياحة الطبية العالمية بفضل مزيج فريد من التقنيات المتقدمة والمتخصصين المؤهلين تأهيلاً عالياً والأسعار المعقولة. يجذب البلد أكثر من مليون سائح طبي سنوياً.',
        secondary: lang === 'ru'
          ? 'Турецкие клиники оснащены новейшим оборудованием и работают по международным стандартам качества. Врачи имеют образование и опыт работы в ведущих медицинских центрах Европы и США. Особенно развиты направления пластической хирургии, стоматологии, трансплантации волос и кардиологии.'
          : lang === 'en'
          ? 'Turkish clinics are equipped with the latest equipment and operate according to international quality standards. Doctors have education and work experience in leading medical centers in Europe and USA. Particularly developed areas are plastic surgery, dentistry, hair transplantation and cardiology.'
          : 'العيادات التركية مجهزة بأحدث المعدات وتعمل وفقاً للمعايير الدولية للجودة. الأطباء لديهم تعليم وخبرة عمل في المراكز الطبية الرائدة في أوروبا والولايات المتحدة. المجالات المتطورة بشكل خاص هي الجراحة التجميلية وطب الأسنان وزراعة الشعر وأمراض القلب.',
      },
      highlights: [
        {
          icon: 'globe',
          title: lang === 'ru' ? 'Международное признание' : lang === 'en' ? 'International Recognition' : 'الاعتراف الدولي',
          description: lang === 'ru' ? 'Более 50 клиник с аккредитацией JCI, что подтверждает соответствие мировым стандартам' : lang === 'en' ? 'More than 50 clinics with JCI accreditation, confirming compliance with world standards' : 'أكثر من 50 عيادة معتمدة من JCI، مما يؤكد الامتثال للمعايير العالمية',
        },
        {
          icon: 'award',
          title: lang === 'ru' ? 'Опытные специалисты' : lang === 'en' ? 'Experienced Specialists' : 'متخصصون ذوو خبرة',
          description: lang === 'ru' ? 'Врачи с международным образованием и многолетним опытом работы' : lang === 'en' ? 'Doctors with international education and years of experience' : 'أطباء بتعليم دولي وسنوات من الخبرة',
        },
        {
          icon: 'trending',
          title: lang === 'ru' ? 'Лидер медтуризма' : lang === 'en' ? 'Medical Tourism Leader' : 'رائد السياحة الطبية',
          description: lang === 'ru' ? '№1 в Европе по количеству медицинских туристов' : lang === 'en' ? '#1 in Europe in terms of medical tourists' : 'رقم 1 في أوروبا من حيث السياح الطبيين',
        },
        {
          icon: 'star',
          title: lang === 'ru' ? 'Доступность' : lang === 'en' ? 'Affordability' : 'القدرة على تحمل التكاليف',
          description: lang === 'ru' ? 'Цены на 50-70% ниже европейских при том же качестве' : lang === 'en' ? 'Prices 50-70% lower than European with the same quality' : 'الأسعار أقل بنسبة 50-70٪ من الأسعار الأوروبية بنفس الجودة',
        },
      ],
    },
    'south-korea': {
      name: getCountryName('south-korea'),
      description: {
        main: lang === 'ru'
          ? 'Южная Корея является мировым лидером в области инновационных медицинских технологий и эстетической медицины. Страна известна своими достижениями в роботизированной хирургии, трансплантологии и косметологии.'
          : lang === 'en'
          ? 'South Korea is a world leader in innovative medical technologies and aesthetic medicine. The country is known for its achievements in robotic surgery, transplantology and cosmetology.'
          : 'كوريا الجنوبية هي رائدة عالمية في التقنيات الطبية المبتكرة والطب التجميلي. تشتهر البلاد بإنجازاتها في الجراحة الروبوتية وزراعة الأعضاء والتجميل.',
        secondary: lang === 'ru'
          ? 'Корейские врачи проходят одну из самых строгих систем медицинского образования в мире. Клиники оснащены самым современным оборудованием, включая роботов Da Vinci последнего поколения. Особое внимание уделяется индивидуальному подходу к каждому пациенту и комфорту во время лечения.'
          : lang === 'en'
          ? 'Korean doctors undergo one of the strictest medical education systems in the world. Clinics are equipped with state-of-the-art equipment, including the latest generation Da Vinci robots. Special attention is paid to an individual approach to each patient and comfort during treatment.'
          : 'يخضع الأطباء الكوريون لواحد من أكثر أنظمة التعليم الطبي صرامة في العالم. العيادات مجهزة بأحدث المعدات، بما في ذلك روبوتات دافنشي من أحدث جيل. يتم إيلاء اهتمام خاص للنهج الفردي لكل مريض والراحة أثناء العلاج.',
      },
      highlights: [
        {
          icon: 'award',
          title: lang === 'ru' ? 'Технологическое превосходство' : lang === 'en' ? 'Technological Excellence' : 'التفوق التكنولوجي',
          description: lang === 'ru' ? 'Одна из самых технологически развитых систем здравоохранения в мире' : lang === 'en' ? 'One of the most technologically advanced healthcare systems in the world' : 'واحد من أكثر أنظمة الرعاية الصحية تطوراً تكنولوجياً في العالم',
        },
        {
          icon: 'star',
          title: lang === 'ru' ? 'Высочайшие стандарты' : lang === 'en' ? 'Highest Standards' : 'أعلى المعايير',
          description: lang === 'ru' ? 'Строгая система контроля качества и безопасности' : lang === 'en' ? 'Strict quality and safety control system' : 'نظام صارم لمراقبة الجودة والسلامة',
        },
        {
          icon: 'globe',
          title: lang === 'ru' ? 'Мировое признание' : lang === 'en' ? 'Global Recognition' : 'الاعتراف العالمي',
          description: lang === 'ru' ? 'Лидер в области пластической хирургии и косметологии' : lang === 'en' ? 'Leader in plastic surgery and cosmetology' : 'رائد في الجراحة التجميلية والتجميل',
        },
        {
          icon: 'users',
          title: lang === 'ru' ? 'Индивидуальный подход' : lang === 'en' ? 'Individual Approach' : 'النهج الفردي',
          description: lang === 'ru' ? 'Персонализированные программы лечения для каждого пациента' : lang === 'en' ? 'Personalized treatment programs for each patient' : 'برامج علاج مخصصة لكل مريض',
        },
      ],
    },
    china: {
      name: getCountryName('china'),
      description: {
        main: lang === 'ru'
          ? 'Китай предлагает уникальное сочетание древних традиций восточной медицины и передовых достижений современной науки. Традиционная китайская медицина (ТКМ) с её тысячелетней историей эффективно дополняет западные методы лечения.'
          : lang === 'en'
          ? 'China offers a unique combination of ancient traditions of Eastern medicine and advanced achievements of modern science. Traditional Chinese Medicine (TCM) with its thousand-year history effectively complements Western treatment methods.'
          : 'تقدم الصين مزيجاً فريداً من التقاليد القديمة للطب الشرقي والإنجازات المتقدمة للعلم الحديث. الطب الصيني التقليدي (TCM) بتاريخه الذي يمتد لآلاف السنين يكمل بفعالية طرق العلاج الغربية.',
        secondary: lang === 'ru'
          ? 'Китайские клиники активно интегрируют методы ТКМ (акупунктура, траволечение, массаж) с современными западными технологиями. Это позволяет достигать отличных результатов в лечении хронических заболеваний, неврологических и ортопедических проблем. Страна также развивает передовые направления онкологии и кардиохирургии.'
          : lang === 'en'
          ? 'Chinese clinics actively integrate TCM methods (acupuncture, herbal medicine, massage) with modern Western technologies. This allows achieving excellent results in treating chronic diseases, neurological and orthopedic problems. The country is also developing advanced areas of oncology and cardiac surgery.'
          : 'تقوم العيادات الصينية بدمج طرق الطب الصيني التقليدي (الوخز بالإبر، الأعشاب الطبية، التدليك) بنشاط مع التقنيات الغربية الحديثة. هذا يسمح بتحقيق نتائج ممتازة في علاج الأمراض المزمنة والمشاكل العصبية والعظمية. تطور البلاد أيضاً مجالات متقدمة في علم الأورام وجراحة القلب.',
      },
      highlights: [
        {
          icon: 'star',
          title: lang === 'ru' ? 'Уникальная медицина' : lang === 'en' ? 'Unique Medicine' : 'طب فريد',
          description: lang === 'ru' ? 'Сочетание традиционной китайской и современной западной медицины' : lang === 'en' ? 'Combination of traditional Chinese and modern Western medicine' : 'مزيج من الطب الصيني التقليدي والطب الغربي الحديث',
        },
        {
          icon: 'award',
          title: lang === 'ru' ? 'Древние традиции' : lang === 'en' ? 'Ancient Traditions' : 'التقاليد القديمة',
          description: lang === 'ru' ? 'Методики, проверенные тысячелетиями практического применения' : lang === 'en' ? 'Methods proven by millennia of practical application' : 'طرق مثبتة من خلال آلاف السنين من التطبيق العملي',
        },
        {
          icon: 'globe',
          title: lang === 'ru' ? 'Современные технологии' : lang === 'en' ? 'Modern Technologies' : 'التقنيات الحديثة',
          description: lang === 'ru' ? 'Инвестиции в передовое оборудование и исследования' : lang === 'en' ? 'Investment in advanced equipment and research' : 'الاستثمار في المعدات والأبحاث المتقدمة',
        },
        {
          icon: 'trending',
          title: lang === 'ru' ? 'Комплексный подход' : lang === 'en' ? 'Comprehensive Approach' : 'النهج الشامل',
          description: lang === 'ru' ? 'Лечение причины заболевания, а не только симптомов' : lang === 'en' ? 'Treating the cause of disease, not just symptoms' : 'علاج سبب المرض وليس الأعراض فقط',
        },
      ],
    },
  };

  const info = countryInfo[country] || countryInfo.turkey;

  const iconMap = {
    globe: Globe,
    award: Award,
    trending: TrendingUp,
    star: Star,
    users: Users,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAF8F0] to-white" />

      {/* Decorative gradient */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: config.accentColor }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: 0,
            animation: mounted ? 'fadeInUp 1s ease-out forwards' : 'none',
          }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A3B2C] mb-4"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {lang === 'ru' && `О медицинском туризме в ${info.name}`}
            {lang === 'en' && `About Medical Tourism in ${info.name}`}
            {lang === 'ar' && `حول السياحة الطبية في ${info.name}`}
          </h2>

          <p
            className="text-lg text-[#4A3B2C]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
          >
            {lang === 'ru' && 'Узнайте больше о преимуществах лечения в этой стране'}
            {lang === 'en' && 'Learn more about the benefits of treatment in this country'}
            {lang === 'ar' && 'تعرف على المزيد حول فوائد العلاج في هذا البلد'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Image */}
          <div
            style={{
              opacity: 0,
              transform: 'translateX(-30px)',
              animation: mounted ? 'slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' : 'none',
            }}
          >
            <div className="relative group">
              {/* Image container with premium styling */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#4A3B2C]/10 shadow-2xl">
                {/* Placeholder background with gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#FAF8F0] via-[#F5F1E8] to-[#FAF8F0]"
                  style={{
                    background: `linear-gradient(135deg, ${config.accentColor}10, transparent, ${config.accentColor}05)`,
                  }}
                />

                {/* Icon placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MapPin
                    size={80}
                    strokeWidth={1.5}
                    className="mb-4 opacity-20"
                    style={{ color: config.accentColor }}
                  />
                  <span
                    className="text-4xl mb-4"
                  >
                    {config.flag}
                  </span>
                  <p
                    className="text-[#4A3B2C]/40 text-sm"
                    style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                  >
                    {lang === 'ru' && 'Изображение страны'}
                    {lang === 'en' && 'Country Image'}
                    {lang === 'ar' && 'صورة الدولة'}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-40 h-40 opacity-30 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${config.accentColor}, transparent)`,
                  }}
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-[#4A3B2C]/10"
                style={{
                  opacity: 0,
                  animation: mounted ? 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards' : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}dd)`,
                    }}
                  >
                    <Star className="text-white" size={24} />
                  </div>
                  <div>
                    <div
                      className="text-xs text-[#4A3B2C]/60"
                      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
                    >
                      {lang === 'ru' && 'Рейтинг'}
                      {lang === 'en' && 'Rating'}
                      {lang === 'ar' && 'التقييم'}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'Crimson Pro', Georgia, serif",
                        color: config.accentColor,
                      }}
                    >
                      4.9/5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Description */}
          <div
            style={{
              opacity: 0,
              transform: 'translateX(30px)',
              animation: mounted ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' : 'none',
            }}
          >
            {/* Main description */}
            <p
              className="text-lg text-[#4A3B2C] leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
            >
              {info.description.main}
            </p>

            {/* Secondary description */}
            <p
              className="text-base text-[#4A3B2C]/70 leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
            >
              {info.description.secondary}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="h-px flex-1 rounded-full"
                style={{ background: `linear-gradient(to right, ${config.accentColor}40, transparent)` }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: config.accentColor }}
              />
              <div
                className="h-px flex-1 rounded-full"
                style={{ background: `linear-gradient(to left, ${config.accentColor}40, transparent)` }}
              />
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <button
                className="group relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}dd)`,
                  fontFamily: "'DM Sans', -apple-system, sans-serif",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">
                  {lang === 'ru' && 'Узнать подробнее'}
                  {lang === 'en' && 'Learn More'}
                  {lang === 'ar' && 'اعرف المزيد'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {info.highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              icon={iconMap[highlight.icon]}
              title={highlight.title}
              description={highlight.description}
              delay={400 + index * 100}
              accentColor={config.accentColor}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
