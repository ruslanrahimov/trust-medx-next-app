import { getDictionary } from '@/lib/i18n';
import PageHeader from '@/components/PageHeader';
import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';
import SocialMedia from '@/components/SocialMedia';
import ContactMap from '@/components/ContactMap';

export default async function ContactsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="overflow-hidden">
      {/* Page Header */}
      <PageHeader
        subtitle={dict.pages.contacts.pageHeader.subtitle}
        title={dict.pages.contacts.pageHeader.title}
        description={dict.pages.contacts.pageHeader.description}
      />

      {/* Main Contact Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#FEFBF6] to-[#FAF8F0]">
        {/* Decorative background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-[#5FA8A3]/10 to-[#7EBDB8]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-[#D4A574]/10 to-[#E8C9A0]/5 rounded-full blur-3xl" />

          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #4A3B2C 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start">
            {/* Left Column - Contact Info */}
            <ContactInfo dict={dict.pages.contacts} lang={lang} />

            {/* Right Column - Contact Form */}
            <ContactForm dict={dict} lang={lang} />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMedia dict={dict.pages.contacts} footer={dict.footer} />

      {/* Map Section */}
      <ContactMap dict={dict.pages.contacts} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'ar' }];
}
