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
import { crusburgBrandingCard, ceoBanner } from "../constants";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Constants ─────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "+919511450700";
const MANUAL_LINK =
  "https://drive.google.com/file/d/1FGfZy2JUqgZp2jP0cWlCOVk1jX9fyQaw/view?usp=sharing";

const pillars = [
  {
    icon: Handshake,
    title: "FICO Model",
    desc: "Franchisor manages all operations — you invest and earn as a profit partner, stress-free.",
  },
  {
    icon: TrendingUp,
    title: "Guaranteed Returns",
    desc: "Minimum guaranteed returns based on your investment — you earn even in slow months.",
  },
  {
    icon: Target,
    title: "One-Time Investment",
    desc: "No recurring franchise fees. One investment, five-year tenure, structured returns.",
  },
  {
    icon: Award,
    title: "Award-Winning Brand",
    desc: "IGA Rising Star Brand 2025 with 98% success ratio. Featured in Icons of India magazine.",
  },
  {
    icon: CheckCircle,
    title: "DPIIT Recognized",
    desc: "Government-certified by DPIIT — a trusted, credible brand you can invest in with confidence.",
  },
];

const investmentModels = [
  {
    title: "Café Model",
    subtitle: "500 sq.ft. · Mall Food Courts",
    featured: false,
    items: [
      { label: "Total Investment", value: "₹25,00,000" },
      { label: "Franchise Fee", value: "₹5,00,000 + GST" },
      { label: "Tenure", value: "5 Years" },
      { label: "Min. Guaranteed Returns", value: "1.5% of invest. OR 7% gross" },
    ],
  },
  {
    title: "Cafeteria Model",
    subtitle: "1500 sq.ft. · Malls & IT Parks",
    featured: true,
    badge: "Most Popular",
    items: [
      { label: "Total Investment", value: "₹50,00,000" },
      { label: "Franchise Fee", value: "₹10,00,000 + GST" },
      { label: "Tenure", value: "5 Years" },
      { label: "Min. Guaranteed Returns", value: "2% of invest. OR 10% gross" },
    ],
  },
  {
    title: "Drive Cafeteria",
    subtitle: "2500 sq.ft. · Highways & Prime Roads",
    featured: false,
    items: [
      { label: "Total Investment", value: "₹1,00,00,000" },
      { label: "Franchise Fee", value: "₹15,00,000 + GST" },
      { label: "Tenure", value: "5 Years" },
      { label: "Min. Guaranteed Returns", value: "2% of invest. OR 15% gross" },
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
  { name: "Suraj Kumar Rai", role: "Chairman & Managing Director", initials: "SK" },
];

const stats = [
  { value: 18, suffix: "+", label: "Outlets & Growing" },
  { value: 25, suffix: "+", label: "Franchise Partners" },
  { value: 2, suffix: "", label: "Cities Operational" },
  { value: 100, suffix: "", label: "Outlets Target by 2026" },
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

// ── Franchise Inquiry Form ────────────────────────────────────────────────────

const FranchiseForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", model: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(
        "service_c81x8y8",
        "template_5o6opax",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Franchise Inquiry — ${form.model || "General"} | ${form.city}`,
          message: `City: ${form.city}\nPreferred Model: ${form.model || "Not specified"}\n\n${form.message}`,
        },
        "-cfQhhFo2N8W-jub7"
      );
      toast.success("Enquiry sent! Our team will contact you shortly.");
      setForm({ name: "", email: "", phone: "", city: "", model: "", message: "" });
    } catch {
      toast.error("Failed to send. Please try WhatsApp or email directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-offwhite-dark bg-offwhite px-4 py-2.5 text-sm font-primary text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-dark transition";
  const labelClass = "block text-sm font-medium font-primary text-gray-700 mb-1.5";

  return (
    <section className="relative z-10 padding-responsive py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
            Get Started
          </p>
          <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
            Send an <span className="text-red-dark">Enquiry</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mt-3">
            Fill in your details and our franchise team will reach out within 24 hours.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl border border-offwhite-dark shadow-sm p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Full Name</label>
                <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input name="phone" placeholder="10-digit Mobile No." value={form.phone} onChange={handleChange} maxLength={10} required className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Email</label>
                <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City (Where you want to open)</label>
                <input name="city" placeholder="e.g. Lucknow, Bengaluru..." value={form.city} onChange={handleChange} required className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Preferred Model</label>
              <select name="model" value={form.model} onChange={handleChange} className={inputClass}>
                <option value="">Select a model</option>
                <option value="Café Model (500 sq.ft. — ₹25L)">Café Model (500 sq.ft. — ₹25L)</option>
                <option value="Cafeteria Model (1500 sq.ft. — ₹50L)">Cafeteria Model (1500 sq.ft. — ₹50L)</option>
                <option value="Drive Cafeteria (2500 sq.ft. — ₹1Cr)">Drive Cafeteria (2500 sq.ft. — ₹1Cr)</option>
                <option value="Not sure yet">Not sure yet — need guidance</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Message (Optional)</label>
              <textarea name="message" placeholder="Any specific questions or requirements..." value={form.message} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-dark hover:bg-red-light text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : <><ArrowRight className="w-4 h-4" /> Submit Enquiry</>}
              </button>
              <p className="text-gray-400 text-[12px] text-center sm:text-left">
                Or reach us directly at{" "}
                <a href="mailto:hello@crushburg.com" className="text-red-dark hover:underline">hello@crushburg.com</a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const Franchise = () => {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div ref={pageRef} className="min-h-screen bg-offwhite overflow-x-hidden">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />

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
            className="para text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            India's fastest-growing QSR burger brand — delivering consistent quality,
            guaranteed returns, and a fully managed franchise model.
            Join us and turn entrepreneurship into your best investment.
          </motion.p>

          <motion.p
            className="text-[12px] text-gray-400 font-medium mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            Operated by <span className="text-gray-600 font-semibold">Crushburg Private Limited</span> · Backed by <span className="text-gray-600 font-semibold">RAI Group</span> · DPIIT Recognized
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
          ₹25L INVESTMENT &nbsp;•&nbsp; GUARANTEED RETURNS &nbsp;•&nbsp; FULL SUPPORT &nbsp;•&nbsp; FICO MODEL &nbsp;•&nbsp; DPIIT RECOGNIZED &nbsp;•&nbsp;
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

      {/* ── FICO Model Explainer ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              How It Works
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              The <span className="text-red-dark">FICO Model</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mt-3 leading-relaxed">
              FICO (Franchisor Invested Company Operated) is our unique franchise structure — you invest once, we run the business, and you earn guaranteed returns.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Flow diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center">
              {[
                {
                  step: "01",
                  title: "You Invest",
                  desc: "One-time investment. No recurring fees. You choose your model — Café, Cafeteria, or Drive Cafeteria.",
                  color: "bg-offwhite border-offwhite-dark",
                  textColor: "text-gray-900",
                },
                {
                  step: "02",
                  title: "We Operate",
                  desc: "CrushBurg's team handles staffing, training, supply chain, quality control, and daily operations entirely.",
                  color: "bg-red-dark",
                  textColor: "text-white",
                  descColor: "text-white/75",
                },
                {
                  step: "03",
                  title: "You Earn",
                  desc: "Receive guaranteed minimum returns every month, based on your investment — regardless of sales volume.",
                  color: "bg-offwhite border-offwhite-dark",
                  textColor: "text-gray-900",
                },
              ].map(({ step, title, desc, color, textColor, descColor }, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    className={`relative rounded-2xl p-7 border ${color} text-center shadow-sm`}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <span className={`text-5xl font-bold font-heading opacity-10 absolute top-4 right-5 ${textColor}`}>{step}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm ${color.includes("red") ? "bg-white/20 text-white" : "bg-red-dark/10 text-red-dark"}`}>
                      {step}
                    </div>
                    <h4 className={`font-bold text-lg mb-2 font-heading ${textColor}`}>{title}</h4>
                    <p className={`text-[13px] leading-relaxed ${descColor || "text-gray-500"}`}>{desc}</p>
                  </motion.div>
                  {i < 2 && (
                    <div className="hidden md:flex items-center justify-center text-red-dark/40">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-6 bg-yellow-light/20 border border-yellow-light rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 font-medium">
                All major operational expenses are borne by CrushBurg — as a franchise partner, your role is <strong>investment and profit participation only.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Investment Models ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 bg-offwhite">
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
                stat: "MG",
                title: "Guaranteed Returns",
                desc: "Minimum guaranteed returns on your investment — MG model ensures you earn regardless of sales fluctuations.",
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
                Lucknow (Antas Mall, Meena Market, Crown Mall) and Bengaluru (15+ outlets across MG Road, Indiranagar, Koramangala & more).
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

      {/* ── Expansion Roadmap ── */}
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
              Where We're Headed
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              Growth <span className="text-red-dark">Roadmap</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-offwhite-dark md:-translate-x-1/2" />

            <div className="flex flex-col gap-8">
              {[
                { year: "2026", milestone: "100 Outlets", desc: "Rapid expansion across Tier 1 & Tier 2 cities in India with 100 operational outlets.", active: true },
                { year: "2027", milestone: "200 Outlets", desc: "Double the network — deeper penetration into Tier 2 & Tier 3 cities, building a nationwide presence.", active: false },
                { year: "2028", milestone: "International Expansion", desc: "Crossing borders — CrushBurg enters international markets, carrying Indian QSR excellence abroad.", active: false },
                { year: "2030", milestone: "Largest Indian QSR Brand", desc: "The vision: become the largest and fastest growing Indian brand in the Quick Service Restaurant industry.", active: false },
              ].map(({ year, milestone, desc, active }, i) => (
                <motion.div
                  key={year}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Content — mobile always left, desktop alternating */}
                  <div className={`flex-1 pl-14 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className={`inline-block bg-offwhite rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow ${active ? "border-red-dark/30" : "border-offwhite-dark"}`}>
                      <span className={`text-xs font-bold uppercase tracking-widest ${active ? "text-red-dark" : "text-gray-400"}`}>{year}</span>
                      <h4 className="font-heading font-bold text-gray-900 text-base mt-1 mb-1">{milestone}</h4>
                      <p className="text-gray-500 text-[13px] leading-relaxed">{desc}</p>
                    </div>
                  </div>

                  {/* Dot — mobile left edge, desktop center */}
                  <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center z-10 ${active ? "bg-red-dark border-red-dark" : "bg-white border-offwhite-dark"}`}>
                    {active && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  {/* Empty spacer for alternating desktop layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Awards & Recognition ── */}
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
              Credibility
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              Awards & <span className="text-red-dark">Recognition</span>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {[
              {
                icon: Award,
                title: "Rising Star Brand",
                subtitle: "IGA — Indian Glory Award",
                desc: "Awarded at New Delhi, Dec 2025. Recognized as fastest growing brand with 98% success ratio.",
              },
              {
                icon: Star,
                title: "CEO Excellence Award",
                subtitle: "QSR Industry",
                desc: "CrushBurg CEO recognized for exceptional leadership in the Quick Service Restaurant industry.",
              },
              {
                icon: FileText,
                title: "Icons of India",
                subtitle: "IOI Magazine · 4th Position",
                desc: "Featured among India's top emerging brands in the Icons of India magazine ranking.",
              },
              {
                icon: CheckCircle,
                title: "DPIIT Certified",
                subtitle: "Govt. of India Recognition",
                desc: "Certificate of Recognition from the Department for Promotion of Industry and Internal Trade.",
              },
            ].map(({ icon: Icon, title, subtitle, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-offwhite-dark hover:border-red-dark/20 hover:shadow-md transition-all duration-300 group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-11 h-11 bg-red-dark/8 rounded-xl flex items-center justify-center mb-4 text-red-dark group-hover:bg-red-dark/15 transition-colors duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-red-dark transition-colors duration-200">{title}</h4>
                <p className="text-red-dark text-[11px] font-semibold uppercase tracking-wide mb-2">{subtitle}</p>
                <p className="text-gray-500 text-[13px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="relative z-10 padding-responsive py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">

          {/* Section label */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
              The Visionary
            </p>
            <h2 className="heading font-sans font-bold text-gray-900 uppercase tracking-tight">
              Meet Our <span className="text-red-dark">Founder</span>
            </h2>
            <motion.div
              className="h-1 bg-red-dark rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* CEO Card */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10 bg-offwhite rounded-3xl border border-offwhite-dark p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Photo */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg ring-4 ring-red-dark/10">
                <img
                  src={ceoBanner}
                  alt="Suraj Kumar Rai — Chairman & Managing Director, CrushBurg"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Red accent strip */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-dark" />
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2">
                Chairman &amp; Managing Director
              </p>
              <h3 className="font-sans font-bold text-gray-900 text-3xl md:text-4xl tracking-tight mb-1">
                Suraj Kumar Rai
              </h3>
              <div className="w-10 h-0.5 bg-red-dark rounded-full mb-5 mx-auto md:mx-0" />

              <blockquote className="text-gray-700 text-[15px] md:text-[16px] italic leading-relaxed mb-6 border-l-4 border-red-dark/30 pl-4">
                "We are not here to compete, we are here to redefine standards."
              </blockquote>

              <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  "Legacy-Driven Brand",
                  "Franchise Profit Ecosystem",
                  "Customer-First Experience",
                  "Scalable Expansion",
                  "Innovation in QSR",
                ].map((tag) => (
                  <li
                    key={tag}
                    className="bg-white border border-offwhite-dark text-gray-700 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Franchise Inquiry Form ── */}
      <FranchiseForm />

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
              <a href="tel:+919511450700" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" /> +91 95114 50700
              </a>
              <span className="hidden sm:block text-white/30">•</span>
              <a href="mailto:hello@crushburg.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" /> hello@crushburg.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Franchise;
