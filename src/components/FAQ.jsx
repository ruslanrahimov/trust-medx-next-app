'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// Simple, performant FAQ Item using CSS transitions
function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <div
      className="group"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.5s ease-out ${index * 0.08}s forwards`
      }}
    >
      <div className="relative">
        {/* Question Button */}
        <button
          onClick={onToggle}
          className={`w-full text-left px-6 md:px-8 py-5 md:py-6 rounded-2xl border transition-all duration-300 ease-out ${
            isOpen
              ? 'bg-white border-[#2C5F5D]/30 shadow-[0_8px_30px_rgba(44,95,93,0.12)]'
              : 'bg-white/60 border-[#2C5F5D]/10 hover:border-[#2C5F5D]/30 hover:bg-white hover:shadow-[0_4px_20px_rgba(44,95,93,0.08)]'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className={`text-base md:text-lg font-medium transition-colors duration-300 ${
              isOpen ? 'text-[#2C5F5D]' : 'text-[#2D3748] group-hover:text-[#2C5F5D]'
            }`}>
              {item.question}
            </h3>

            {/* Animated Icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen
                  ? 'bg-[#2C5F5D] text-white rotate-180'
                  : 'bg-[#2C5F5D]/10 text-[#2C5F5D] group-hover:bg-[#2C5F5D]/20 rotate-0'
              }`}
            >
              {isOpen ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </div>
          </div>
        </button>

        {/* Answer with smooth height transition */}
        <div className={`grid transition-all duration-400 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="mt-1 px-6 md:px-8 py-5 md:py-6 bg-gradient-to-br from-[#2C5F5D]/5 to-transparent rounded-2xl border border-[#2C5F5D]/10">
              <p className="text-[#4A5568] leading-relaxed text-sm md:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative accent line */}
        <div
          className={`absolute left-4 top-6 w-1 bg-gradient-to-b from-[#2C5F5D] to-[#967259] rounded-full transition-all duration-300 origin-top ${
            isOpen ? 'h-8 opacity-100 scale-y-100' : 'h-0 opacity-0 scale-y-0'
          }`}
        />
      </div>
    </div>
  );
}

export default function FAQ({ dict, lang }) {
  const [activeTab, setActiveTab] = useState(0);
  const [openItems, setOpenItems] = useState(new Set());
  const mounted = true;

  const isRTL = lang === 'ar';

  // FAQ data structure
  const faqData = dict?.faq || {
    title: "FAQs",
    subtitle: "Everything you need to know about features, membership, and troubleshooting.",
    categories: [
      {
        name: "Getting Started",
        questions: [
          {
            question: "How do I sign up for an account?",
            answer: "Signing up is easy! Just download the app, click on 'Sign Up,' and follow the prompts. You can use your email address, Google, or Facebook to create an account."
          },
          {
            question: "Can I access the app from multiple devices?",
            answer: "Yes, you can access your account from multiple devices. Simply log in with your credentials on any device."
          },
          {
            question: "How do I borrow a book?",
            answer: "Browse our library, select the book you want, and click 'Borrow.' The book will be available in your library immediately."
          },
          {
            question: "Can I download books to read offline?",
            answer: "Yes, you can download books to read offline. Just tap the download icon on any book in your library."
          }
        ]
      },
      {
        name: "Members and Pricing",
        questions: [
          {
            question: "What membership plans are available?",
            answer: "We offer Basic (free), Premium ($9.99/month), and Family ($14.99/month) plans with different benefits."
          },
          {
            question: "Can I cancel my subscription anytime?",
            answer: "Yes, you can cancel your subscription at any time from your account settings. You'll retain access until the end of your billing period."
          }
        ]
      },
      {
        name: "Book Requests and Recommendations",
        questions: [
          {
            question: "How do I request a book?",
            answer: "Go to the Request section in the app, enter the book details, and submit. We'll notify you when it's available."
          },
          {
            question: "How does the recommendation system work?",
            answer: "Our AI analyzes your reading history and preferences to suggest books you'll love. The more you read, the better the recommendations."
          }
        ]
      },
      {
        name: "Account & Technical Issues",
        questions: [
          {
            question: "I forgot my password. How do I reset it?",
            answer: "Click 'Forgot Password' on the login screen, enter your email, and follow the reset instructions we send you."
          },
          {
            question: "Why is the app running slowly?",
            answer: "Try clearing your app cache, ensuring you have the latest version, and checking your internet connection."
          },
          {
            question: "How do I update my payment information?",
            answer: "Go to Account Settings > Billing > Payment Methods to update your card details securely."
          }
        ]
      }
    ],
    stillHaveQuestions: {
      title: "Still have questions?",
      description: "Contact our support team and we will make sure everything is clear and intuitive for you!",
      button: "Contact Support"
    }
  };

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className={`relative py-16 md:py-20 px-4 md:px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFBF6] via-[#FAF8F0] to-[#FEFBF6]" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#2C5F5D] rounded-full blur-[120px] opacity-[0.08]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#967259] rounded-full blur-[120px] opacity-[0.08]" />

      {/* Geometric Accent Lines */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#2C5F5D]/20 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-40 bg-gradient-to-t from-transparent via-[#967259]/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-left mb-12 md:mb-16"
          style={{
            opacity: 0,
            animation: mounted ? 'fadeInUp 0.8s ease-out forwards' : 'none'
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D3748] mb-4 tracking-tight">
            {faqData.title}
          </h2>
          <p className="text-base md:text-lg text-[#718096] max-w-2xl leading-relaxed">
            {faqData.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className="mb-10 md:mb-12"
          style={{
            opacity: 0,
            animation: mounted ? 'fadeInUp 0.8s ease-out 0.2s forwards' : 'none'
          }}
        >
          <div className="flex flex-wrap gap-2 md:gap-3">
            {faqData.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`group relative px-4 md:px-6 py-2.5 md:py-3 rounded-full border transition-all duration-300 ease-out ${
                  activeTab === index
                    ? 'bg-[#2D3748] text-[#FEFBF6] border-[#2D3748] shadow-[0_4px_20px_rgba(45,55,72,0.25)] scale-105'
                    : 'bg-transparent text-[#4A5568] border-[#2C5F5D]/20 hover:border-[#2C5F5D] hover:bg-[#2C5F5D]/5 hover:scale-102'
                }`}
              >
                <span className="relative z-10 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">
                  {category.name}
                </span>

                {/* Active tab glow */}
                {activeTab === index && (
                  <span className="absolute inset-0 rounded-full bg-[#2D3748] blur-xl opacity-20 -z-10 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3 md:space-y-4" key={activeTab}>
          {faqData.categories[activeTab].questions.map((item, qIndex) => {
            const isOpen = openItems.has(`${activeTab}-${qIndex}`);

            return (
              <FAQItem
                key={`${activeTab}-${qIndex}`}
                item={item}
                isOpen={isOpen}
                onToggle={() => toggleItem(activeTab, qIndex)}
                index={qIndex}
              />
            );
          })}
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

        .duration-400 {
          transition-duration: 400ms;
        }

        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}
