import React, { useRef } from "react";
import { MapPin, Clock, ExternalLink, Utensils, ShoppingBag, Star, ArrowRight, Phone } from "lucide-react";
import { Timeline } from "../components/Timeline";
import StoreGallery from "../components/StoreGallery";

import { shop1, shop4, shopCrownMall } from "../constants";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Link } from "react-router-dom";

/* ── Open/Closed status helper ─────────────────────────────────── */
const isOpenNow = (hoursStr) => {
  const now = new Date();
  const h = now.getHours();
  const match = hoursStr.match(/(\d+)(am|pm)\s*[–-]\s*(\d+)(am|pm)/i);
  if (!match) return null;
  let open = parseInt(match[1]);
  let close = parseInt(match[3]);
  if (match[2].toLowerCase() === "pm" && open !== 12) open += 12;
  if (match[4].toLowerCase() === "pm" && close !== 12) close += 12;
  return h >= open && h < close;
};

/* ── Store badge helper ────────────────────────────────────────── */
const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 bg-gold text-on-gold text-xs font-semibold px-3 py-1 rounded-full">
    {children}
  </span>
);

/* ── Store content card ────────────────────────────────────────── */
const StoreCard = ({ store }) => {
  const open = isOpenNow(store.hours);

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Hero image */}
      <div className="relative w-full h-64 md:h-[420px] rounded-2xl overflow-hidden shadow-lg group">
        <img
          src={store.img}
          alt={store.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Open / Closed pill */}
        {open !== null && (
          <div className="absolute top-4 right-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shadow ${
                open
                  ? "bg-green-500 text-white"
                  : "bg-panel/80 text-muted-light"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${open ? "bg-white animate-pulse" : "bg-muted-light"}`}
              />
              {open ? "Open Now" : "Closed"}
            </span>
          </div>
        )}

        {/* Store name over image */}
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="heading font-sans font-bold text-white text-2xl md:text-3xl drop-shadow-lg leading-tight">
            {store.name}
          </h2>
        </div>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-cream-dark rounded-2xl p-5 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-brand/10 p-2.5 rounded-full flex-shrink-0">
            <MapPin size={18} className="text-brand" />
          </div>
          <div>
            <p className="font-sans font-semibold text-xs text-muted-light mb-1 uppercase tracking-wider">
              Address
            </p>
            <p className="para font-primary text-ink leading-snug text-sm">
              {store.address}
            </p>
          </div>
        </div>

        <div className="bg-white border border-cream-dark rounded-2xl p-5 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-brand/10 p-2.5 rounded-full flex-shrink-0">
            <Clock size={18} className="text-brand" />
          </div>
          <div>
            <p className="font-sans font-semibold text-xs text-muted-light mb-1 uppercase tracking-wider">
              Hours
            </p>
            <p className="para font-primary text-ink text-sm">{store.hours}</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Badge><Utensils size={12} /> Dine-in</Badge>
        <Badge><ShoppingBag size={12} /> Takeaway</Badge>
        <Badge><Star size={12} /> 100% Vegetarian</Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <a
          href={store.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand-light transition-colors shadow-md"
        >
          <ExternalLink size={15} />
          Get Directions
        </a>
      </div>
    </div>
  );
};

/* ── Franchise teaser card ─────────────────────────────────────── */
const FranchiseCard = () => (
  <div className="flex flex-col gap-6 pb-10">
    {/* Banner */}
    <div className="relative w-full rounded-2xl overflow-hidden bg-brand p-8 md:p-12 shadow-lg">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gold/20" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-gold-dark/20" />
      <div className="absolute top-1/2 right-16 w-20 h-20 rounded-full bg-white/5" />

      <div className="relative z-10 max-w-lg">
        <span className="inline-block bg-gold text-on-gold text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Coming Soon
        </span>
        <h2 className="heading font-sans font-bold text-white text-2xl md:text-4xl mb-4 leading-tight">
          CrushBurg is Expanding Across India!
        </h2>
        <p className="para font-primary text-white/80 text-sm md:text-base leading-relaxed mb-6">
          We're on a mission to bring bold, fresh vegetarian burgers to every
          city. Want to be part of the revolution? Open a CrushBurg in your
          community and build something extraordinary.
        </p>
        <Link
          to="/franchise"
          className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-white hover:text-brand transition"
        >
          Explore Franchise <ArrowRight size={16} />
        </Link>
      </div>
    </div>

    {/* Stats row — one card split into three cells rather than three separate
        cards. Inside the timeline's narrow mobile column (~250px) three cards
        each carrying p-5 left only ~33px of usable text width, so the values
        spilled outside their card. Dropping the per-card padding and gaps gives
        each cell ~70px instead.

        Note: no `heading`/`para` classes here. Both are custom utilities in
        index.css and are emitted AFTER Tailwind's size utilities, so they
        silently override them — `heading text-2xl` rendered at 36px and
        `para text-xs` at 14px, which is what caused the overflow. */}
    <div className="bg-white border border-cream-dark rounded-2xl shadow-sm grid grid-cols-3 divide-x divide-cream-dark overflow-hidden">
      {[
        { label: "Outlets", value: "18+" },
        { label: "Cities", value: "2" },
        { label: "Happy Customers", value: "50K+" },
      ].map((stat) => (
        <div key={stat.label} className="px-1.5 py-4 text-center">
          <p className="font-sans font-bold text-lg md:text-2xl text-brand leading-none">
            {stat.value}
          </p>
          <p className="font-sans text-muted text-[10px] md:text-xs mt-1.5 uppercase tracking-wide leading-tight">
            {stat.label}
          </p>
        </div>
      ))}
    </div>

    {/* Coming Soon */}
    <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm">
      <p className="font-sans font-semibold text-xs text-muted-light mb-3 uppercase tracking-wider">Coming Soon in Lucknow</p>
      <div className="flex flex-wrap gap-2">
        {["Phoenix United Mall", "Lulu Mall", "& more locations"].map((loc) => (
          <span key={loc} className="inline-flex items-center gap-1.5 bg-gold/40 text-ink text-xs font-semibold px-3 py-1 rounded-full border border-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {loc}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ── Timeline data ─────────────────────────────────────────────── */
const stores = [
  {
    name: "CrushBurg — Crown Mall",
    address:
      "Crown Mall, Ayodhya Road, Chinhat, Lucknow, Uttar Pradesh 226028",
    // isOpenNow() parses whole hours only — "10:30am" would misparse and blank
    // the Open/Closed badge.
    hours: "Mon–Sun: 10am – 10pm",
    img: shopCrownMall,
    link: "https://www.google.com/maps/search/?api=1&query=Crown+Mall+Ayodhya+Road+Chinhat+Lucknow",
  },
  {
    name: "CrushBurg — Antas Mall",
    address:
      "Antas Shopping Mall & Multiplex, 1/23, Vardan Khand, Sector 1, Gomti Nagar, Makhdoom Pur, Lucknow, Uttar Pradesh 226010",
    hours: "Mon–Sun: 10am – 10pm",
    img: shop4,
    link: "https://maps.app.goo.gl/F8Yws6k11H64R5Qi9",
  },
  {
    name: "CrushBurg — Indira Nagar",
    address:
      "UGF, Bhawani, Meena Market, Liberty Colony Park, Indira Nagar, Lucknow, Uttar Pradesh 226016",
    hours: "Mon–Sun: 11am – 11pm",
    img: shop1,
    link: "https://maps.app.goo.gl/mNM34hANXA2bq9u37",
  },
];

const timelineData = [
  ...stores.map((store) => ({
    title: store.name.replace("CrushBurg — ", ""),
    content: <StoreCard store={store} />,
  })),
  {
    title: "What's Next",
    content: <FranchiseCard />,
  },
];


/* ── Page ──────────────────────────────────────────────────────── */
const Store = () => {
  const timelineRef = useRef(null);
  const lenis = useLenis();

  const scrollToTimeline = () => {
    const el = timelineRef.current;
    if (!el) return;
    // Lenis drives the scroll; native scrollIntoView stutters against it.
    if (lenis) lenis.scrollTo(el, { duration: 0.9 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-cream">

      {/* ── Hero ── */}
      <div className="padding-responsive pt-28 pb-20 md:py-32 relative overflow-hidden">
        {/* Decorative bg blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/15 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="para font-primary text-brand font-semibold uppercase tracking-widest text-sm mb-3">
              Find Us Near You
            </p>
            <h1 className="heading font-sans font-bold text-5xl md:text-7xl text-ink leading-none">
              Our <span className="text-brand">Stores</span>
            </h1>
            <p className="para font-primary text-muted-light mt-3 text-sm font-semibold uppercase tracking-widest">
              Lucknow & Bengaluru — 18+ Locations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col items-start md:items-end gap-4"
          >
            <p className="para font-primary text-ink-soft max-w-sm leading-relaxed md:text-right text-sm md:text-base">
              18+ locations across Lucknow and Bengaluru, all serving the boldest,
              freshest vegetarian burgers — every single day.
            </p>
            <button
              onClick={scrollToTimeline}
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-brand-light transition-colors shadow-md"
            >
              Explore Locations <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* Divider with dot */}
        <div className="max-w-7xl mx-auto mt-12 flex items-center gap-4 relative z-10">
          <div className="flex-1 h-px bg-cream-dark" />
          <div className="w-2 h-2 rounded-full bg-brand" />
          <div className="flex-1 h-px bg-cream-dark" />
        </div>
      </div>

      {/* ── Store Gallery (draggable photo spread) ── */}
      <StoreGallery onLocateClick={scrollToTimeline} />

      {/* ── Timeline ── */}
      <div className="padding-responsive" ref={timelineRef}>
        <div className="max-w-7xl mx-auto">
          <Timeline data={timelineData} />
        </div>
      </div>

      {/* ── Bottom CTA strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="padding-responsive py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-panel px-8 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-brand/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-gold/10 translate-x-1/4 translate-y-1/4 pointer-events-none" />

            <div className="relative z-10 text-center md:text-left">
              <p className="para font-primary text-gold font-semibold uppercase tracking-widest text-sm mb-3">
                Ready to Crush Your Hunger?
              </p>
              <h2 className="heading font-sans font-bold text-3xl md:text-5xl text-white leading-tight">
                Visit Us Today
              </h2>
              <p className="para font-primary text-muted-light mt-3 max-w-md text-sm md:text-base">
                All our stores open 7 days a week. Walk in or call ahead — we're always ready to serve.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToTimeline}
                className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-brand-light transition-colors shadow-lg"
              >
                <MapPin size={16} /> Find a Store
              </button>
              <a
                href="tel:+919511450700"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:border-white transition-colors"
              >
                <Phone size={16} /> +91 95114 50700
              </a>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Store;
