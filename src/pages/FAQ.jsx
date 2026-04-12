import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqCategories = [
  {
    category: "General",
    items: [
      {
        question: "What are your opening hours?",
        answer: "All CrushBurg outlets are open daily from 10:00 AM to 10:00 PM. Hours may vary slightly by location — check the Store page for specific outlet timings.",
      },
      {
        question: "Do you deliver?",
        answer: "Yes! You can order through Swiggy or Zomato from your nearest CrushBurg outlet. Walk-ins and takeaways are always welcome too.",
      },
      {
        question: "Is CrushBurg 100% vegetarian?",
        answer: "Yes — CrushBurg is a 100% vegetarian brand. We use separate equipment and preparation zones to ensure there is absolutely no cross-contamination. Every item on our menu is pure veg.",
      },
      {
        question: "How can I cancel or modify an order?",
        answer: "Orders placed in-store or via delivery platforms can be canceled within 5 minutes of placement. After that, please contact the store directly or reach out to us at hello@crushburg.com.",
      },
      {
        question: "Where are your outlets located?",
        answer: "We currently operate 18+ outlets across Lucknow (Antas Mall, Meena Market, Crown Mall) and Bengaluru (MG Road, Indiranagar, Koramangala, Whitefield, and more). New locations are opening regularly — check our Store page for the full list.",
      },
    ],
  },
  {
    category: "Franchise",
    items: [
      {
        question: "What is the FICO model?",
        answer: "FICO stands for Franchisor Invested Company Operated. Under this model, you invest in the outlet and CrushBurg's team handles everything — operations, staffing, supply chain, and day-to-day management. You act as a profit partner, earning guaranteed minimum returns without the stress of running day-to-day operations.",
      },
      {
        question: "What are the three franchise models available?",
        answer: "CrushBurg offers three models: (1) Café Model — 500 sq.ft. ideal for mall food courts, investment ₹25L; (2) Cafeteria Model — 1500 sq.ft. for malls and IT parks, investment ₹50L; (3) Drive Cafeteria Model — 2500 sq.ft. for prime roadside/highway locations, investment ₹1 Cr. All three operate under the FICO model.",
      },
      {
        question: "What does 'Minimum Guaranteed Returns' mean?",
        answer: "Every CrushBurg franchise model comes with a Minimum Guaranteed (MG) return. This means you earn a guaranteed percentage on your investment every month — regardless of sales fluctuations. For example, the Café Model offers MG 1.5% of investment OR 7% of gross sales, whichever is higher.",
      },
      {
        question: "Is the franchise fee a recurring cost?",
        answer: "No. CrushBurg follows a one-time investment model. You pay the franchise fee once for a 5-year tenure. There are no recurring royalty fees deducted from your earnings.",
      },
      {
        question: "What happens after the 5-year tenure?",
        answer: "At the end of the 5-year tenure, both parties can mutually agree to renew the franchise agreement. CrushBurg is committed to long-term relationships with its franchise partners and will provide renewal terms well in advance.",
      },
      {
        question: "What does the franchise fee cover?",
        answer: "The franchise fee covers brand licensing, access to proprietary recipes and SOPs, initial training for staff, marketing support, supply chain onboarding, and ongoing operational support from the CrushBurg team throughout your tenure.",
      },
      {
        question: "Who manages day-to-day operations?",
        answer: "Under the FICO model, CrushBurg's operations team manages the outlet entirely — from hiring and training staff to managing inventory, quality checks, and daily reporting. As a franchise partner, you receive regular performance reports and profit distributions.",
      },
      {
        question: "Is CrushBurg recognized by the government?",
        answer: "Yes. CrushBurg holds a Certificate of Recognition from DPIIT (Department for Promotion of Industry and Internal Trade), Government of India. The brand also won the IGA Rising Star Brand & CEO Excellence Award in December 2025, with a 98% success ratio across outlets.",
      },
      {
        question: "Who is behind CrushBurg?",
        answer: "CrushBurg is operated by Crushburg Private Limited, backed by the Resplendent Adishakti Imperium Group (RAI Group), which provides strategic leadership, financial structuring, and expansion strategy. The leadership team includes CMD Suraj Kumar Rai, CEO Vikash Rai, Head Chef Karan Agrawal, and COO Vivek Singh.",
      },
      {
        question: "How do I apply for a franchise?",
        answer: "Simply visit our Franchise page and reach out via WhatsApp or the enquiry form. Our team will schedule an introductory call, walk you through the franchise manual, and help you choose the right model for your location and budget.",
      },
    ],
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 hover:bg-red-dark/5 transition-colors"
      onClick={onToggle}
    >
      <span className="font-heading font-semibold text-gray-900 text-sm md:text-base leading-snug">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 text-red-dark"
      >
        <ChevronDown size={20} />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-5 pt-1 bg-white para text-gray-600 font-primary leading-relaxed text-sm md:text-base">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (key) => setOpenItem(openItem === key ? null : key);

  return (
    <section className="bg-offwhite min-h-screen pt-28 pb-20 padding-responsive">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-3">
            Got Questions?
          </p>
          <h1 className="heading text-red-dark font-heading font-bold text-4xl md:text-5xl mb-4">
            FAQs
          </h1>
          <p className="para font-primary text-gray-600 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about CrushBurg — from our menu to our franchise opportunity.
          </p>
        </div>

        {/* FAQ categories */}
        <div className="flex flex-col gap-10">
          {faqCategories.map(({ category, items }) => (
            <div key={category}>
              <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-gray-400 mb-4 pl-1">
                {category}
              </h2>
              <div className="flex flex-col gap-3">
                {items.map((item, idx) => {
                  const key = `${category}-${idx}`;
                  return (
                    <FAQItem
                      key={key}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItem === key}
                      onToggle={() => toggle(key)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 bg-red-dark rounded-2xl p-8 text-center text-white">
          <p className="font-heading font-bold text-lg mb-2">Still have questions?</p>
          <p className="text-white/75 text-sm mb-5 leading-relaxed">
            Our team is happy to help — reach out via WhatsApp or visit the contact page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919511450700?text=Hi%20CrushBurg%2C%20I%20have%20a%20question."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              Contact Page
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
