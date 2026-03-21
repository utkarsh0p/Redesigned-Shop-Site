import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MarqueeAnimation } from "../components/MarqueeAnimation.jsx";
import {
  kingFusionBurger,
  crunchyVegBurger,
  crunchyTandooriBurger,
  makhniBurger,
  liteBurger,
  delightBurger,
  crunchyCheeseBurger,
  contWrap,
  paneerWrap,
  vegWrap,
  royalSandwich,
  cornAndCheeseSandwich,
  oreoShake,
  burbournShake,
  chocolateShake,
  mangoShake,
  hazelnutShake,
  classicShake,
  menu,
} from "../constants";

// ── Config ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "burgers",    label: "Burgers",      emoji: "🍔" },
  { id: "wraps",      label: "Wraps",        emoji: "🌯" },
  { id: "sandwiches", label: "Sandwiches",   emoji: "🥪" },
  { id: "fries",      label: "Fries",        emoji: "🍟" },
  { id: "sides",      label: "Sides",        emoji: "⭐" },
  { id: "shakes",     label: "Shakes",       emoji: "🥤" },
  { id: "coldCoffee", label: "Cold Coffee",  emoji: "☕" },
  { id: "softies",    label: "Softies",      emoji: "🍦" },
  { id: "others",     label: "Others",       emoji: "✨" },
];

// Categories that have product photos
const PHOTO_CATEGORIES = new Set(["burgers", "wraps", "sandwiches", "shakes", "coldCoffee"]);

const productImageMap = {
  "Lite Burger":                    liteBurger,
  "Delight Burger":                 delightBurger,
  "Makhani Burger":                 makhniBurger,
  "Crunchy Veg Burger":             crunchyVegBurger,
  "Crunchy Veg Double Patty Burger":crunchyVegBurger,
  "Crunchy Cheese Burger":          crunchyCheeseBurger,
  "Crunchy Tandoori Burger":        crunchyTandooriBurger,
  "Royal Paneer Burger":            makhniBurger,
  "Premium Veggie Burger":          delightBurger,
  "King Fusion Burger":             kingFusionBurger,
  "Veg Wrap":                       vegWrap,
  "Corn Wrap":                      contWrap,
  "Paneer Wrap":                    paneerWrap,
  "Veg Sandwich":                   cornAndCheeseSandwich,
  "Corn Sandwich":                  cornAndCheeseSandwich,
  "Cheese Corn Sandwich":           cornAndCheeseSandwich,
  "Tandoori Paneer Sandwich":       royalSandwich,
  "Vanilla Shake":                  classicShake,
  "Mango Shake":                    mangoShake,
  "Chocolate Shake":                chocolateShake,
  "Oreo Shake":                     oreoShake,
  "Burbourn Shake":                 burbournShake,
  "Classic Cold Coffee":            classicShake,
  "Hazelnut Cold Coffee":           hazelnutShake,
  "Vanilla Cold Coffee":            classicShake,
  "Mocha Cold Coffee":              hazelnutShake,
};

function formatPrice(prices) {
  if (!prices || prices.length === 0) return { type: "single", value: "—" };
  if (prices[0] === "MRP") return { type: "single", value: "MRP" };
  if (prices.length === 1) return { type: "single", value: `₹${prices[0]}` };
  return { type: "range", s: `₹${prices[0]}`, l: `₹${prices[1]}` };
}

// ── Animation Variants ────────────────────────────────────────────────────────

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function VegDot({ small = false }) {
  return (
    <div
      className={`flex-shrink-0 border border-green-600 flex items-center justify-center rounded-sm ${
        small ? "w-3.5 h-3.5" : "w-4 h-4"
      }`}
    >
      <div className={`rounded-full bg-green-600 ${small ? "w-1.5 h-1.5" : "w-2 h-2"}`} />
    </div>
  );
}

function PhotoCard({ item }) {
  const img = productImageMap[item.name];
  const price = formatPrice(item.prices);

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default"
    >
      {/* Image */}
      <div className="relative h-44 md:h-48 overflow-hidden bg-offwhite-dark">
        {img && (
          <img
            src={img}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        {/* Veg badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded p-0.5 shadow-sm">
          <VegDot small />
        </div>
        {/* Price badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-yellow-light text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            {price.type === "range" ? `from ${price.s}` : price.value}
          </span>
        </div>
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm md:text-[15px] leading-snug mb-2 line-clamp-2">
          {item.name}
        </h3>
        {price.type === "range" ? (
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-gray-500">
              S: <span className="text-red-dark font-bold">{price.s}</span>
            </span>
            <span className="text-offwhite-dark select-none">|</span>
            <span className="text-gray-500">
              L: <span className="text-red-dark font-bold">{price.l}</span>
            </span>
          </div>
        ) : (
          <p className="text-red-dark font-bold text-sm">{price.value}</p>
        )}
      </div>
    </motion.div>
  );
}

function PhotoGrid({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
      variants={gridVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {items.map((item) => (
        <PhotoCard key={item.name} item={item} />
      ))}
    </motion.div>
  );
}

function ListGrid({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
      variants={listVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {items.map((item) => {
        const price = formatPrice(item.prices);
        return (
          <motion.div
            key={item.name}
            variants={rowVariants}
            className="flex items-center justify-between bg-white/70 hover:bg-white px-5 py-4 rounded-xl border border-offwhite-dark hover:border-red-dark/20 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <VegDot />
              <span className="font-medium text-gray-800 text-sm md:text-[15px] truncate">
                {item.name}
              </span>
            </div>
            <div className="flex-shrink-0 ml-4 text-right">
              {price.type === "range" ? (
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-gray-500">{price.s}</span>
                  <span className="text-offwhite-dark">–</span>
                  <span className="text-red-dark font-semibold">{price.l}</span>
                </div>
              ) : (
                <span className="text-red-dark font-semibold text-sm">{price.value}</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function SectionHeader({ label, emoji }) {
  return (
    <div className="mb-8 md:mb-10">
      <motion.p
        className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-2"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {emoji}&nbsp;&nbsp;CrushBurg
      </motion.p>
      <motion.h2
        className="heading font-sans font-bold text-gray-900 uppercase tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {label}
      </motion.h2>
      <motion.div
        className="h-1 bg-red-dark rounded-full mt-3"
        initial={{ width: 0 }}
        whileInView={{ width: "3rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("burgers");
  const sectionRefs = useRef({});
  const tabsRef = useRef(null);

  const getSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  // Track which section is in view → update active tab
  useEffect(() => {
    const observers = [];
    CATEGORIES.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategory(id); },
        { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll active tab pill into view horizontally (no vertical scroll side-effects)
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const el = container.querySelector(`[data-id="${activeCategory}"]`);
    if (!el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const scrollLeft =
      container.scrollLeft +
      elRect.left -
      containerRect.left -
      containerRect.width / 2 +
      elRect.width / 2;
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeCategory]);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveCategory(id);
  };

  return (
    <div className="min-h-screen bg-offwhite relative overflow-x-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-red-dark/5 blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-yellow-light/10 blur-3xl pointer-events-none translate-x-1/3" />
      <motion.div
        className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-red-dark/25 pointer-events-none"
        animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 right-1/3 w-5 h-5 rounded-full bg-yellow-light/50 pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ── Hero ── */}
      <section className="relative z-10 padding-responsive pt-16 pb-10 md:pt-20 md:pb-12 text-center">
        <motion.p
          className="text-red-dark font-semibold uppercase tracking-widest text-[11px] mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          100% Vegetarian &nbsp;•&nbsp; Always Fresh
        </motion.p>
        <motion.h1
          className="heading font-sans font-bold text-gray-900 uppercase tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Our <span className="text-red-dark">Menu</span>
        </motion.h1>
        <motion.p
          className="para text-gray-600 max-w-xl mx-auto mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          From crispy burgers to creamy shakes — every item is crafted fresh,
          served hot, and priced right.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {["100% Veg", "Fresh Daily", "Bold Flavors", "Starting ₹39"].map((tag) => (
            <span
              key={tag}
              className="bg-yellow-light text-black px-4 py-1.5 rounded-full font-semibold text-xs"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <div className="flex flex-col gap-0 overflow-hidden">
        <MarqueeAnimation
          direction="left"
          baseVelocity={0.45}
          className="text-white bg-red-dark py-2 tracking-widest"
        >
          BURGERS &nbsp;•&nbsp; WRAPS &nbsp;•&nbsp; SANDWICHES &nbsp;•&nbsp; FRIES &nbsp;•&nbsp;
          SHAKES &nbsp;•&nbsp; COLD COFFEE &nbsp;•&nbsp; SOFTIES &nbsp;•&nbsp;
        </MarqueeAnimation>
        <MarqueeAnimation
          direction="right"
          baseVelocity={0.45}
          className="text-black bg-yellow-light py-2 tracking-widest"
        >
          CRUSHBURG &nbsp;•&nbsp; 100% VEG &nbsp;•&nbsp; ALWAYS FRESH &nbsp;•&nbsp; LUCKNOW
          &nbsp;•&nbsp; BOLD FLAVORS &nbsp;•&nbsp; MADE WITH LOVE &nbsp;•&nbsp;
        </MarqueeAnimation>
      </div>

      {/* ── Sticky Category Tabs ── */}
      <div className="sticky top-0 z-30 bg-offwhite/95 backdrop-blur-md border-b border-offwhite-dark shadow-sm">
        <div
          ref={tabsRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide padding-responsive py-3"
        >
          {CATEGORIES.map(({ id, label, emoji }) => (
            <button
              key={id}
              data-id={id}
              onClick={() => scrollToSection(id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                activeCategory === id
                  ? "bg-red-dark text-white shadow-md scale-[1.03]"
                  : "bg-white text-gray-600 border border-offwhite-dark hover:border-red-dark/30 hover:text-red-dark"
              }`}
            >
              <span className="text-sm">{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu Sections ── */}
      <div className="relative z-10 padding-responsive py-14 md:py-16 max-w-7xl mx-auto space-y-20 md:space-y-24">

        {/* Burgers */}
        <div id="burgers" ref={getSectionRef("burgers")} className="scroll-mt-28">
          <SectionHeader label="Burgers" emoji="🍔" />
          <PhotoGrid items={menu.burgers} />
        </div>

        {/* Wraps */}
        <div id="wraps" ref={getSectionRef("wraps")} className="scroll-mt-28">
          <SectionHeader label="Wraps" emoji="🌯" />
          <PhotoGrid items={menu.wraps} />
        </div>

        {/* Sandwiches */}
        <div id="sandwiches" ref={getSectionRef("sandwiches")} className="scroll-mt-28">
          <SectionHeader label="Sandwiches" emoji="🥪" />
          <PhotoGrid items={menu.sandwiches} />
        </div>

        {/* Fries */}
        <div id="fries" ref={getSectionRef("fries")} className="scroll-mt-28">
          <SectionHeader label="Fries" emoji="🍟" />
          <ListGrid items={menu.fries} />
        </div>

        {/* Sides */}
        <div id="sides" ref={getSectionRef("sides")} className="scroll-mt-28">
          <SectionHeader label="Sides & Snacks" emoji="⭐" />
          <ListGrid items={menu.sides} />
        </div>

        {/* Shakes */}
        <div id="shakes" ref={getSectionRef("shakes")} className="scroll-mt-28">
          <SectionHeader label="Shakes" emoji="🥤" />
          <PhotoGrid items={menu.shakes} />
        </div>

        {/* Cold Coffee */}
        <div id="coldCoffee" ref={getSectionRef("coldCoffee")} className="scroll-mt-28">
          <SectionHeader label="Cold Coffee" emoji="☕" />
          <PhotoGrid items={menu.coldCoffee} />
        </div>

        {/* Softies */}
        <div id="softies" ref={getSectionRef("softies")} className="scroll-mt-28">
          <SectionHeader label="Softies" emoji="🍦" />
          <ListGrid items={menu.softies} />
        </div>

        {/* Others */}
        <div id="others" ref={getSectionRef("others")} className="scroll-mt-28">
          <SectionHeader label="Others" emoji="✨" />
          <ListGrid items={menu.others} />
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="padding-responsive pb-20 max-w-7xl mx-auto">
        <motion.div
          className="bg-red-dark text-white p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-1 font-heading">
              Fresh · Affordable · Made with Love
            </h3>
            <p className="text-white/80 text-sm">
              Every bite at CrushBurg is built to crush your cravings.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link to="/store">
              <motion.span
                className="bg-white text-red-dark px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 cursor-pointer hover:bg-offwhite transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Find a Store <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link to="/franchise">
              <motion.span
                className="bg-yellow-light text-black px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 cursor-pointer hover:bg-yellow-dark transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Franchise Enquiry <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
