'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Globe, Award, TrendingUp, Star, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const countryConfig = {
  turkey: { accent: '#C06558', flag: '🇹🇷', image: '/turkiye.jpg' },
  'south-korea': { accent: '#4E7EA6', flag: '🇰🇷', image: '/korea.jpg' },
  china: { accent: '#9E4D4D', flag: '🇨🇳', image: '/china.jpg' },
};

const DISPLAY_FONT = "'Fraunces', 'Crimson Pro', Georgia, serif";
const BODY_FONT = "'DM Sans', -apple-system, sans-serif";

const iconMap = { globe: Globe, award: Award, trending: TrendingUp, star: Star, users: Users };

export default function CountryDescription({ dict, lang, country }) {
  const sectionRef = useRef(null);
  const config = countryConfig[country] || countryConfig.turkey;

  const getCountryName = (c) => {
    const names = {
      turkey: { ru: 'Турция', en: 'Turkey', ar: 'تركيا' },
      'south-korea': { ru: 'Южная Корея', en: 'South Korea', ar: 'كوريا الجنوبية' },
      china: { ru: 'Китай', en: 'China', ar: 'الصين' },
    };
    return names[c]?.[lang] || names[c]?.ru || 'Turkey';
  };

  const countryInfo = {
    turkey: {
      name: getCountryName('turkey'),
      description: {
        main: lang === 'ru' ? 'Турция занимает лидирующие позиции в мировом медицинском туризме благодаря уникальному сочетанию передовых технологий, высококвалифицированных специалистов и доступных цен. Страна привлекает более 1 миллиона медицинских туристов ежегодно.' : lang === 'en' ? 'Turkey holds a leading position in global medical tourism thanks to a unique combination of advanced technologies, highly qualified specialists and affordable prices. The country attracts more than 1 million medical tourists annually.' : 'تحتل تركيا مكانة رائدة في السياحة الطبية العالمية بفضل مزيج فريد من التقنيات المتقدمة والمتخصصين المؤهلين والأسعار المعقولة.',
        secondary: lang === 'ru' ? 'Турецкие клиники оснащены новейшим оборудованием и работают по международным стандартам качества. Особенно развиты направления пластической хирургии, стоматологии, трансплантации волос и кардиологии.' : lang === 'en' ? 'Turkish clinics are equipped with the latest equipment and operate according to international quality standards. Particularly developed areas include plastic surgery, dentistry, hair transplantation and cardiology.' : 'العيادات التركية مجهزة بأحدث المعدات وتعمل وفقاً للمعايير الدولية للجودة. المجالات المتطورة بشكل خاص هي الجراحة التجميلية وطب الأسنان.',
      },
      highlights: [
        { icon: 'globe', title: lang === 'ru' ? 'Международное признание' : lang === 'en' ? 'International Recognition' : 'الاعتراف الدولي', description: lang === 'ru' ? 'Более 50 клиник с аккредитацией JCI, что подтверждает соответствие мировым стандартам' : lang === 'en' ? 'More than 50 clinics with JCI accreditation, confirming compliance with world standards' : 'أكثر من 50 عيادة معتمدة من JCI' },
        { icon: 'award', title: lang === 'ru' ? 'Опытные специалисты' : lang === 'en' ? 'Experienced Specialists' : 'متخصصون ذوو خبرة', description: lang === 'ru' ? 'Врачи с международным образованием и многолетним опытом работы' : lang === 'en' ? 'Doctors with international education and years of experience' : 'أطباء بتعليم دولي وسنوات من الخبرة' },
        { icon: 'trending', title: lang === 'ru' ? 'Лидер медтуризма' : lang === 'en' ? 'Medical Tourism Leader' : 'رائد السياحة الطبية', description: lang === 'ru' ? '№1 в Европе по количеству медицинских туристов' : lang === 'en' ? '#1 in Europe in terms of medical tourists' : 'رقم 1 في أوروبا من حيث السياح الطبيين' },
        { icon: 'star', title: lang === 'ru' ? 'Доступность' : lang === 'en' ? 'Affordability' : 'القدرة على تحمل التكاليف', description: lang === 'ru' ? 'Цены на 50–70% ниже европейских при том же качестве' : lang === 'en' ? 'Prices 50–70% lower than European with the same quality' : 'الأسعار أقل بنسبة 50-70٪ من الأسعار الأوروبية' },
      ],
    },
    'south-korea': {
      name: getCountryName('south-korea'),
      description: {
        main: lang === 'ru' ? 'Южная Корея является мировым лидером в области инновационных медицинских технологий и эстетической медицины. Страна известна своими достижениями в роботизированной хирургии, трансплантологии и косметологии.' : lang === 'en' ? 'South Korea is a world leader in innovative medical technologies and aesthetic medicine. The country is known for its achievements in robotic surgery, transplantology and cosmetology.' : 'كوريا الجنوبية هي رائدة عالمية في التقنيات الطبية المبتكرة والطب التجميلي.',
        secondary: lang === 'ru' ? 'Корейские врачи проходят одну из самых строгих систем медицинского образования в мире. Клиники оснащены самым современным оборудованием, включая роботов Da Vinci. Особое внимание уделяется индивидуальному подходу к каждому пациенту.' : lang === 'en' ? 'Korean doctors undergo one of the strictest medical education systems in the world. Clinics are equipped with state-of-the-art equipment, including the latest Da Vinci robots. Special attention is paid to personalized care.' : 'يخضع الأطباء الكوريون لواحد من أكثر أنظمة التعليم الطبي صرامة في العالم.',
      },
      highlights: [
        { icon: 'award', title: lang === 'ru' ? 'Технологическое превосходство' : lang === 'en' ? 'Technological Excellence' : 'التفوق التكنولوجي', description: lang === 'ru' ? 'Одна из самых технологически развитых систем здравоохранения в мире' : lang === 'en' ? 'One of the most technologically advanced healthcare systems in the world' : 'واحد من أكثر أنظمة الرعاية الصحية تطوراً تكنولوجياً' },
        { icon: 'star', title: lang === 'ru' ? 'Высочайшие стандарты' : lang === 'en' ? 'Highest Standards' : 'أعلى المعايير', description: lang === 'ru' ? 'Строгая система контроля качества и безопасности' : lang === 'en' ? 'Strict quality and safety control system' : 'نظام صارم لمراقبة الجودة والسلامة' },
        { icon: 'globe', title: lang === 'ru' ? 'Мировое признание' : lang === 'en' ? 'Global Recognition' : 'الاعتراف العالمي', description: lang === 'ru' ? 'Лидер в области пластической хирургии и косметологии' : lang === 'en' ? 'Leader in plastic surgery and cosmetology' : 'رائد في الجراحة التجميلية والتجميل' },
        { icon: 'users', title: lang === 'ru' ? 'Индивидуальный подход' : lang === 'en' ? 'Individual Approach' : 'النهج الفردي', description: lang === 'ru' ? 'Персонализированные программы лечения для каждого пациента' : lang === 'en' ? 'Personalized treatment programs for each patient' : 'برامج علاج مخصصة لكل مريض' },
      ],
    },
    china: {
      name: getCountryName('china'),
      description: {
        main: lang === 'ru' ? 'Китай предлагает уникальное сочетание древних традиций восточной медицины и передовых достижений современной науки. Традиционная китайская медицина с её тысячелетней историей эффективно дополняет западные методы лечения.' : lang === 'en' ? 'China offers a unique combination of ancient traditions of Eastern medicine and advanced achievements of modern science. Traditional Chinese Medicine with its thousand-year history effectively complements Western treatment methods.' : 'تقدم الصين مزيجاً فريداً من التقاليد القديمة للطب الشرقي والإنجازات المتقدمة للعلم الحديث.',
        secondary: lang === 'ru' ? 'Китайские клиники активно интегрируют методы ТКМ (акупунктура, траволечение, массаж) с современными западными технологиями. Страна также развивает передовые направления онкологии и кардиохирургии.' : lang === 'en' ? 'Chinese clinics actively integrate TCM methods (acupuncture, herbal medicine, massage) with modern Western technologies. The country is also developing advanced areas of oncology and cardiac surgery.' : 'تقوم العيادات الصينية بدمج طرق الطب الصيني التقليدي بنشاط مع التقنيات الغربية الحديثة.',
      },
      highlights: [
        { icon: 'star', title: lang === 'ru' ? 'Уникальная медицина' : lang === 'en' ? 'Unique Medicine' : 'طب فريد', description: lang === 'ru' ? 'Сочетание традиционной китайской и современной западной медицины' : lang === 'en' ? 'Combination of traditional Chinese and modern Western medicine' : 'مزيج من الطب الصيني التقليدي والطب الغربي الحديث' },
        { icon: 'award', title: lang === 'ru' ? 'Древние традиции' : lang === 'en' ? 'Ancient Traditions' : 'التقاليد القديمة', description: lang === 'ru' ? 'Методики, проверенные тысячелетиями практического применения' : lang === 'en' ? 'Methods proven by millennia of practical application' : 'طرق مثبتة من خلال آلاف السنين من التطبيق العملي' },
        { icon: 'globe', title: lang === 'ru' ? 'Современные технологии' : lang === 'en' ? 'Modern Technologies' : 'التقنيات الحديثة', description: lang === 'ru' ? 'Инвестиции в передовое оборудование и исследования' : lang === 'en' ? 'Investment in advanced equipment and research' : 'الاستثمار في المعدات والأبحاث المتقدمة' },
        { icon: 'trending', title: lang === 'ru' ? 'Комплексный подход' : lang === 'en' ? 'Comprehensive Approach' : 'النهج الشامل', description: lang === 'ru' ? 'Лечение причины заболевания, а не только симптомов' : lang === 'en' ? 'Treating the cause of disease, not just symptoms' : 'علاج سبب المرض وليس الأعراض فقط' },
      ],
    },
  };

  const info = countryInfo[country] || countryInfo.turkey;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // immediateRender: false — prevents GSAP from hiding elements before
      // the ScrollTrigger fires (avoids blank sections if trigger is missed)
      gsap.from('.cdesc-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        immediateRender: false,
      });
      gsap.from('.cdesc-visual', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        opacity: 0, x: -40, duration: 1.1, ease: 'power3.out', delay: 0.1,
        immediateRender: false,
      });
      gsap.from('.cdesc-text', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        opacity: 0, x: 40, duration: 1.1, ease: 'power3.out', delay: 0.15,
        immediateRender: false,
      });
      gsap.from('.cdesc-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#FEFBF6' }}>
      {/* Subtle warm gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FEFBF6 0%, #FAF7EF 50%, #FEFBF6 100%)' }} />

      {/* Country accent orb */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${config.accent}14` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="cdesc-header text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white/60 backdrop-blur-sm mb-5"
            style={{ borderColor: `${config.accent}30` }}
          >
            <span className="text-base">{config.flag}</span>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: BODY_FONT, color: config.accent }}
            >
              {lang === 'ru' ? 'О стране' : lang === 'en' ? 'About' : 'عن البلد'}
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4A3B2C] mb-4 leading-tight"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {lang === 'ru' && `О медицинском туризме в ${info.name}`}
            {lang === 'en' && `About Medical Tourism in ${info.name}`}
            {lang === 'ar' && `حول السياحة الطبية في ${info.name}`}
          </h2>
          <p
            className="text-lg text-[#4A3B2C]/60 max-w-xl mx-auto"
            style={{ fontFamily: BODY_FONT }}
          >
            {lang === 'ru' && 'Узнайте больше о преимуществах лечения в этой стране'}
            {lang === 'en' && 'Learn more about the benefits of treatment in this country'}
            {lang === 'ar' && 'تعرف على المزيد حول فوائد العلاج في هذا البلد'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">
          {/* Country image */}
          <div className="cdesc-visual">
            <div className="relative group">
              <div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/50"
                style={{ boxShadow: '0 8px 40px rgba(74,59,44,0.08), inset 0 1px 0 rgba(255,255,255,0.7)' }}
              >
                <Image
                  src={config.image}
                  alt={info.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Bottom accent gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${config.accent}30, transparent)`,
                  }}
                />
              </div>

              {/* Rating floating card */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 border border-white/70" style={{ boxShadow: '0 8px 32px rgba(74,59,44,0.11), inset 0 1px 0 rgba(255,255,255,1)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${config.accent}, ${config.accent}dd)` }}
                  >
                    <Star className="text-white" size={20} fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#4A3B2C]/50 uppercase tracking-wider mb-0.5" style={{ fontFamily: BODY_FONT }}>
                      {lang === 'ru' ? 'Рейтинг' : lang === 'en' ? 'Rating' : 'التقييم'}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ fontFamily: DISPLAY_FONT, color: config.accent }}
                    >
                      4.9 / 5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="cdesc-text">
            <p
              className="text-lg text-[#4A3B2C] leading-relaxed mb-5"
              style={{ fontFamily: BODY_FONT }}
            >
              {info.description.main}
            </p>
            <p
              className="text-base text-[#4A3B2C]/65 leading-relaxed mb-8"
              style={{ fontFamily: BODY_FONT }}
            >
              {info.description.secondary}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 rounded-full" style={{ background: `linear-gradient(to right, ${config.accent}40, transparent)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.accent }} />
              <div className="h-px flex-1 rounded-full" style={{ background: `linear-gradient(to left, ${config.accent}40, transparent)` }} />
            </div>

            <button
              className="group relative px-6 py-3 rounded-xl font-medium text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg text-sm"
              style={{
                background: `linear-gradient(135deg, ${config.accent}, ${config.accent}dd)`,
                fontFamily: BODY_FONT,
                boxShadow: `0 4px 16px ${config.accent}35`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">
                {lang === 'ru' && 'Узнать подробнее'}
                {lang === 'en' && 'Learn More'}
                {lang === 'ar' && 'اعرف المزيد'}
              </span>
            </button>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="cdesc-cards grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {info.highlights.map((h, i) => {
            const Icon = iconMap[h.icon];
            return (
              <div
                key={i}
                className="cdesc-card group flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 hover:bg-white/95 hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: '0 2px 16px rgba(74,59,44,0.06), inset 0 1px 0 rgba(255,255,255,0.9)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${config.accent}18, ${config.accent}08)` }}
                >
                  {Icon && <Icon size={20} strokeWidth={2} style={{ color: config.accent }} />}
                </div>
                <div className="flex-1">
                  <h4
                    className="text-base font-semibold text-[#4A3B2C] mb-1"
                    style={{ fontFamily: DISPLAY_FONT }}
                  >
                    {h.title}
                  </h4>
                  <p
                    className="text-xs text-[#4A3B2C]/60 leading-relaxed"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    {h.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
