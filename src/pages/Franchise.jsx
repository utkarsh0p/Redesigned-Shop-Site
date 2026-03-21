import React, { useRef, useEffect, useState } from "react";
import {
  Users,
  Target,
  TrendingUp,
  MapPin,
  Award,
  PieChart,
  Rocket,
  Lightbulb,
  Globe,
  UserCheck,
  Handshake,
  FileText,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Zap,
  Building2,
  Phone,
  Mail,
  Star,
} from "lucide-react";
import { motion, useInView, useSpring, useTransform, useScroll } from "motion/react";
import { MarqueeAnimation } from "../components/MarqueeAnimation.jsx";
import { crusburgBrandingCard } from "../constants";

// ── Constants ─────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "+917619910103";
const MANUAL_LINK =
  "https://drive.google.com/file/d/1aUAn9DMq6G1CiqbuQyeLF6q-KbaQb6g3/view?usp=sharing";

const pillars = [
  {
    icon: Target,
    title: "Mass-Premium Pricing",
    desc: "Gourmet taste at youth budgets — bold flavors starting from ₹39.",
  },
  {
    icon: Globe,
    title: "Multi-Channel Engine",
    desc: "D2C app + Swiggy/Zomato + café and cafeteria outlets working together.",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Expansion",
    desc: "Rollouts near colleges, IT parks & malls with central kitchen support.",
  },
  {
    icon: Lightbulb,
    title: "Menu Innovation",
    desc: "AI-driven feedback to continuously scale only the bestsellers.",
  },
  {
    icon: Users,
    title: "Community-First DNA",
    desc: "Meme marketing, CrushCoins, campus clubs & youth-first activations.",
  },
];

const investmentModels = [
  {
    title: "Café Model",
    subtitle: "300 sq.ft.",
    featured: false,
    items: [
      { label: "Brand Fees (5 yrs)", value: "₹5,00,000" },
      { label: "Total Investment", value: "₹25,50,000" },
      { label: "Estimated ROI", value: "~71.1%" },
      { label: "Payback Period", value: "16.8 months" },
    ],
  },
  {
    title: "Cafeteria Model",
    subtitle: "600 sq.ft.",
    featured: true,
    badge: "Most Popular",
    items: [
      { label: "Brand Fees (5 yrs)", value: "₹5,00,000" },
      { label: "Total Investment", value: "₹36,75,000" },
      { label: "Estimated ROI", value: "~76.1%" },
      { label: "Payback Period", value: "15.7 months" },
    ],
  },
  {
    title: "FICO Model",
    subtitle: "Fully Company Operated",
    featured: false,
    items: [
      { label: "Revenue Share", value: "1% of invest. OR 15% gross" },
      { label: "Operations", value: "Company managed" },
      { label: "Inventory", value: "Partner funded (first time)" },
      { label: "Your Role", value: "Investor only" },
    ],
  },
];

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Reach Out",
    desc: "Contact us via WhatsApp or email. We'll schedule an introductory call.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Review Manual",
    desc: "Go through our franchise manual — investment, ROI, and support details.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Sign Agreement",
    desc: "Finalise your preferred model and sign the franchise agreement.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Grow",
    desc: "We handle training, marketing, and ops support. You open your store.",
  },
];

const team = [
  { name: "Suraj Kumar Rai", role: "Chief Executive Officer", initials: "SK" },
  { name: "Dhaneesh K Dixit", role: "Chief Finance Officer", initials: "DK" },
  { name: "Avinash Shukla", role: "Chief Operations Officer", initials: "AS" },
  { name: "Vikash Rai", role: "Chief Marketing Officer", initials: "VR" },
];

const stats = [
  { value: 19, suffix: "+", label: "Outlets & Growing" },
  { value: 25, suffix: "+", label: "Franchise Partners" },
  { value: 4, suffix: "", label: "Years of Passion" },
  { value: 76, suffix: "%", label: "Best ROI (Cafeteria)" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCounter({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [animated, setAnimated] = useState(false);
  const spring = useSpring(0, { stiffness: 50, damping: 12 });
  const display = useTransform(spring, (v) => Math.floor(v));

  useEffect(() => {
    if (isInView && !animated) {
      spring.set(value);
      setAnimated(true);
    } else if (!isInView && animated) {
      spring.set(0);
      setAnimated(false);
    }
  }, [isInView, value, spring, animated]);

  return (
    <motion.div
      ref={ref}
      className="text-center group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="text-4xl md:text-5xl font-bold text-red-dark font-heading flex items-center justify-center gap-1">
        <motion.span>{display}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-gray-600 text-sm mt-1 font-medium">{label}</p>
      <motion.div
        className="h-0.5 bg-red-dark rounded-full mx-auto mt-2 w-0 group-hover:w-10 transition-all duration-300"
      />
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const Franchise = () => {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div ref={pageRef} className="min-h-screen bg-offwhite overflow-x-hidden">

      {/* ── Decorative blobs ── */}
      <motion.div
        className="fixed top-20 -left-20 w-80 h-80 rounded-full bg-red-dark/5 blur-3xl pointer-events-none z-0"
        style={{ y: y1 }}
      />
      <motion.div
        className="fixed bottom-20 -right-20 w-96 h-96 rounded-full bg-yellow-light/10 blur-3xl pointer-events-none z-0"
        style={{ y: y2 }}
      />
      <motion.div
        className="fixed top-1/2 left-1/3 w-3 h-3 rounded-full bg-red-dark/20 pointer-events-none z-0"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-1/3 right-1/4 w-4 h-4 rounded-full bg-yellow-light/40 pointer-events-none z-0"
        animate={{ y: [0, 18, 0], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* ── Hero ── */}
      <section className="relative z-10 padding-responsive pt-28 pb-14 md:pt-28 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="inline-flex items-center gap-2 text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-3.5 h-3.5" /> Business Opportunity
          </motion.span>

          <motion.h1
            className="heading font-sans font-bold text-gray-900 uppercase tracking-tight mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Own a{" "}
            <span className="text-red-dark">CrushBurg</span>{" "}
            Franchise
          </motion.h1>

          <motion.p
            className="para text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            India's fastest-growing youth-first QSR chain — redefining fast food with
            Indian fusion flavors, smart pricing, and a community-driven brand.
            Join us and turn entrepreneurship into your best investment.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
                "Hi CrushBurg Team, I want to apply for a franchise."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-full font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
            <a
              href={MANUAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-offwhite-dark text-gray-800 hover:border-red-dark/30 hover:text-red-dark px-7 py-3 rounded-full font-semibold text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" /> View Franchise Manual
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="flex flex-col gap-0 overflow-hidden">
        <MarqueeAnimation direction="left" baseVelocity={0.45} className="text-white bg-red-dark py-2 tracking-widest">
          FRANCHISE &nbsp;•&nbsp; PARTNER WITH US &nbsp;•&nbsp; GROW YOUR BUSINESS &nbsp;•&nbsp; CRUSHBURG &nbsp;•&nbsp;
        </MarqueeAnimation>
        <MarqueeAnimation direction="right" baseVelocity={0.45} className="text-black bg-yellow-light py-2 tracking-widest">
          ₹25L INVESTMENT &nbsp;•&nbsp; 76% ROI &nbsp;•&nbsp; FULL SUPPORT &nbsp;•&nbsp; 15 MONTH PAYBACK &nbsp;•&nbsp;
        </MarqueeAnimation>
      </div>

      {/* ── Stats ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatCounter key={i} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── Business Pillars ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              What We Stand For
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              Our <span className="text-red-dark">Pillars</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-offwhite-dark hover:border-red-dark/20 transition-all duration-300 group text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-12 h-12 bg-red-dark/8 rounded-xl flex items-center justify-center mx-auto mb-4 text-red-dark group-hover:bg-red-dark/15 transition-colors duration-300"
                  whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.4 } }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-red-dark transition-colors duration-200">
                  {title}
                </h4>
                <p className="text-gray-500 text-[13px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Investment Models ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              Choose Your Path
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              Investment <span className="text-red-dark">Models</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {investmentModels.map((model, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  model.featured
                    ? "bg-red-dark text-white shadow-xl scale-[1.03]"
                    : "bg-offwhite border border-offwhite-dark hover:border-red-dark/25 hover:shadow-lg shadow-sm"
                }`}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {model.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-light text-black text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> {model.badge}
                    </span>
                  </div>
                )}
                <div className="p-7">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${model.featured ? "bg-white/20" : "bg-red-dark/8"}`}>
                    <Building2 className={`w-5 h-5 ${model.featured ? "text-white" : "text-red-dark"}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-0.5 font-heading ${model.featured ? "text-white" : "text-gray-900"}`}>
                    {model.title}
                  </h3>
                  <p className={`text-xs mb-5 ${model.featured ? "text-white/70" : "text-gray-500"}`}>
                    {model.subtitle}
                  </p>
                  <ul className="space-y-3">
                    {model.items.map((item, j) => (
                      <li
                        key={j}
                        className={`flex items-start justify-between gap-3 text-sm pb-3 border-b last:border-b-0 ${
                          model.featured ? "border-white/15" : "border-offwhite-dark"
                        }`}
                      >
                        <span className={model.featured ? "text-white/75" : "text-gray-500"}>
                          {item.label}
                        </span>
                        <strong className={`text-right ${model.featured ? "text-white" : "text-gray-900"}`}>
                          {item.value}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hi CrushBurg, I'm interested in the ${model.title}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      model.featured
                        ? "bg-yellow-light text-black hover:bg-yellow-dark"
                        : "bg-red-dark text-white hover:bg-red-light"
                    }`}
                  >
                    Enquire Now <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              Simple Process
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              How It <span className="text-red-dark">Works</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {steps.map(({ number, icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-offwhite-dark hover:border-red-dark/20 hover:shadow-md transition-all duration-300 group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="text-[52px] font-bold text-offwhite-dark leading-none select-none absolute top-4 right-5 font-heading">
                  {number}
                </span>
                <div className="w-11 h-11 bg-red-dark/8 rounded-xl flex items-center justify-center mb-4 text-red-dark group-hover:bg-red-dark/15 transition-colors duration-200 relative z-10">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-dark transition-colors duration-200">
                  {title}
                </h4>
                <p className="text-gray-500 text-[13px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Market Opportunity ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              Why Now
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              The <span className="text-red-dark">Opportunity</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {[
              {
                icon: TrendingUp,
                stat: "33%",
                title: "QSR Market Share",
                desc: "Burgers & sandwiches own a third of India's fast food market — and it's still growing.",
              },
              {
                icon: PieChart,
                stat: "~76%",
                title: "Estimated ROI",
                desc: "Cafeteria model delivers ~76% ROI with an average payback of just 15.7 months.",
              },
              {
                icon: Award,
                stat: "100%",
                title: "End-to-End Support",
                desc: "Training, marketing, operations, and supply chain — we handle it all alongside you.",
              },
            ].map(({ icon: Icon, stat, title, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-offwhite rounded-2xl p-8 border border-offwhite-dark hover:border-red-dark/20 hover:shadow-md transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 bg-red-dark/8 rounded-xl flex items-center justify-center flex-shrink-0 text-red-dark group-hover:bg-red-dark/15 transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-4xl font-bold text-red-dark font-heading leading-none">
                    {stat}
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-dark transition-colors duration-200">
                  {title}
                </h4>
                <p className="text-gray-500 text-[13px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Road Ahead ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              Expansion
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              The Road <span className="text-red-dark">Ahead</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl p-7 shadow-sm border border-offwhite-dark hover:shadow-md hover:border-red-dark/20 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-red-dark/8 rounded-xl flex items-center justify-center mb-4 text-red-dark">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Operating Cities</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                Lucknow (5+ outlets) and Bangalore (14+ outlets) — and growing every month.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl p-7 shadow-sm border border-offwhite-dark hover:shadow-md hover:border-red-dark/20 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-red-dark/8 rounded-xl flex items-center justify-center mb-4 text-red-dark">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Upcoming Expansion</h4>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Prayagraj", "Varanasi", "Gorakhpur", "Kanpur", "Noida", "Ayodhya", "Agra"].map((city) => (
                  <span key={city} className="bg-offwhite text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full border border-offwhite-dark">
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl p-7 shadow-sm border border-offwhite-dark hover:shadow-md hover:border-red-dark/20 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-red-dark/8 rounded-xl flex items-center justify-center mb-4 text-red-dark">
                <Handshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Partner Network</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                25+ active franchise partners and growing fast — join before your city fills up.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              The Founders
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              Leadership <span className="text-red-dark">Team</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {team.map(({ name, role, initials }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-offwhite rounded-2xl p-6 text-center border border-offwhite-dark hover:border-red-dark/20 hover:shadow-md transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-14 h-14 bg-red-dark rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg font-heading shadow-md group-hover:scale-110 transition-transform duration-300">
                  {initials}
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-red-dark transition-colors duration-200">
                  {name}
                </h3>
                <p className="text-gray-500 text-[12px]">{role}</p>
                <motion.div className="w-6 h-0.5 bg-red-dark rounded-full mx-auto mt-3 group-hover:w-10 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 pb-24">
        <motion.div
          className="max-w-5xl mx-auto bg-red-dark text-white rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/70 uppercase tracking-widest text-[11px] font-semibold mb-3">
              Ready to Begin?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
              Start Your Franchise Journey
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Join the CrushBurg family with full support — training, marketing, operations,
              and a proven business model built for real returns.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
                  "Hi CrushBurg Team, I am ready to start my franchise journey!"
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us Now
              </motion.a>
              <motion.a
                href={MANUAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-light hover:bg-yellow-dark text-black px-7 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <FileText className="w-4 h-4" /> View Franchise Manual
              </motion.a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/70">
              <a href="tel:+917619910103" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" /> +91 76199 10103
              </a>
              <span className="hidden sm:block text-white/30">•</span>
              <a href="mailto:connect@crushburg.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" /> connect@crushburg.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Franchise;
