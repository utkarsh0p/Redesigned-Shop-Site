import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Utensils,
  Coffee,
  Leaf,
  Building2,
  Users,
  Calendar,
  MapPin,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  CheckCircle,
  Heart,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "motion/react";
import { shopAiImage, crusburgBrandingCard } from "../constants";

// ── data ──────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <Flame className="w-6 h-6" />,
    secondaryIcon: (
      <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-gold" />
    ),
    title: "Signature Burgers",
    description:
      "From the Lite Burger at ₹39 to the King Fusion Burger at ₹179 — every patty is built with fresh ingredients, bold spices, and a whole lot of love in every bite.",
    position: "left",
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    secondaryIcon: (
      <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-gold" />
    ),
    title: "Wraps & Sandwiches",
    description:
      "Loaded with paneer, corn, and crisp veggies, our wraps and sandwiches bring full restaurant-quality taste to every handheld bite — dine-in or takeaway.",
    position: "left",
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    secondaryIcon: (
      <Star className="w-4 h-4 absolute -top-1 -right-1 text-gold" />
    ),
    title: "Fries & Beverages",
    description:
      "Golden, crispy fries and refreshing drinks complete every CrushBurg meal. Because great sides and cool sips turn a good meal into a great memory.",
    position: "left",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    secondaryIcon: (
      <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-gold" />
    ),
    title: "100% Vegetarian",
    description:
      "Every single item on our menu is completely vegetarian — no exceptions, no compromises. Pure plant-based goodness crafted for people who love bold, real flavors.",
    position: "right",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    secondaryIcon: (
      <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-gold" />
    ),
    title: "Fresh Every Day",
    description:
      "We never take shortcuts. Every order is freshly prepared with quality ingredients because our customers deserve nothing but the best — consistently, every single time.",
    position: "right",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    secondaryIcon: (
      <Star className="w-4 h-4 absolute -top-1 -right-1 text-gold" />
    ),
    title: "Grow With Us",
    description:
      "CrushBurg is more than a restaurant — it's an opportunity. Partner with us as a franchise owner and bring the CrushBurg experience to your city with full support.",
    position: "right",
  },
];

const stats = [
  { icon: <MapPin />, value: 10, label: "Outlets & Growing", suffix: "+" },
  { icon: <Users />, value: 25, label: "Happy Customers", suffix: "K+" },
  { icon: <Calendar />, value: 4, label: "Years of Passion", suffix: "" },
  { icon: <Leaf />, value: 100, label: "Pure Veg Promise", suffix: "%" },
];

// ── sub-components ─────────────────────────────────────────────────────────────

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-brand bg-brand/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-brand/20 relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-ink group-hover:text-brand transition-colors duration-300 font-sub-heading">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-ink-soft leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center text-brand text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

function StatCounter({ icon, value, label, suffix, delay }) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300 shadow-sm"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center mb-4 text-brand group-hover:bg-brand/10 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-ink flex items-center font-heading">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-muted text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-brand mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}

// ── main page ──────────────────────────────────────────────────────────────────

const AboutUs = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full pt-28 pb-24 px-4 md:py-24 bg-gradient-to-b from-cream to-white text-ink overflow-hidden relative"
    >
      {/* Decorative background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand/5 blur-3xl pointer-events-none"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-brand/30 pointer-events-none"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-gold/40 pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="inline-flex items-center gap-2 text-brand font-semibold uppercase tracking-widest text-[11px] mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-3.5 h-3.5" />
            Discover Our Story
          </motion.span>
          <h2 className="heading font-sans font-bold text-ink uppercase tracking-tight mb-4 text-center">
            About <span className="text-brand">CrushBurg</span>
          </h2>
          <motion.div
            className="h-1 bg-brand rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-center max-w-2xl mx-auto mb-16 text-ink-soft leading-relaxed"
          variants={itemVariants}
        >
          At CrushBurg, we believe in serving more than just food — we serve experiences. From fresh
          ingredients to bold flavors, every bite is crafted with love and passion for the people who
          crave something real.
        </motion.p>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left column */}
          <div className="space-y-16">
            {services
              .filter((s) => s.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src={shopAiImage}
                  alt="CrushBurg Restaurant"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Link to="/menu">
                    <motion.span
                      className="bg-white text-ink px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Menu <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Offset border frame */}
              <motion.div
                className="absolute inset-0 border-4 border-gold rounded-2xl -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Floating gold circles */}
              <motion.div
                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-brand/10 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-gold/20 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand pointer-events-none"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold pointer-events-none"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-16">
            {services
              .filter((s) => s.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div
          className="mt-16 bg-brand text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-1 font-heading">
              Ready to taste the difference?
            </h3>
            <p className="text-white/80">
              Visit your nearest CrushBurg or start your own franchise today.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link to="/store">
              <motion.span
                className="bg-white text-brand px-6 py-3 rounded-full flex items-center gap-2 font-semibold text-sm cursor-pointer hover:bg-cream transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find a Store <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link to="/franchise">
              <motion.span
                className="bg-gold text-on-gold px-6 py-3 rounded-full flex items-center gap-2 font-semibold text-sm cursor-pointer hover:bg-gold-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Franchise Enquiry <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
