import React, { useRef } from "react";
import {
  bannerBurger,
  modelImage,
  modelImage2,
  kingFusionBurger,
  paneerWrap,
  royalSandwich,
  oreoShake,
  hazelnutShake,
} from "../constants";
import { MarqueeAnimation } from "../components/MarqueeAnimation.jsx";
import CircularMenuCard from "../components/CircularMenuCard.jsx";
import StoreGallery from "../components/StoreGallery.jsx";
import MinimalistHero from "../components/MinimalistHero.jsx";
import GrillToYouSection from "../components/GrillToYouSection.jsx";
import { TestimonialsSection } from "../components/ui/testimonials-with-marquee";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "motion/react";

const featuredItems = [
  {
    src: kingFusionBurger,
    name: "Burgers",
    category: "Starting ₹39",
    badge: "10 varieties",
    description:
      "From light and simple to stacked and indulgent — our burgers are built with crispy patties, melted cheese, fresh veggies and bold house sauces. Every bite is the kind of flavour that makes you close your eyes for a second.",
  },
  {
    src: paneerWrap,
    name: "Wraps",
    category: "Starting ₹79",
    badge: "3 varieties",
    description:
      "Soft tortillas loaded with smoky spiced fillings, crunchy veggies and tangy sauces — all rolled up into a handheld meal that is filling, flavourful and absolutely impossible to put down.",
  },
  {
    src: royalSandwich,
    name: "Sandwiches",
    category: "Starting ₹79",
    badge: "4 varieties",
    description:
      "Golden-toasted on the outside, generously stuffed on the inside — our sandwiches bring together melted cheese, seasoned veggies and zesty chutney in every warm, satisfying bite.",
  },
  {
    src: oreoShake,
    name: "Shakes",
    category: "Starting ₹99",
    badge: "5 varieties",
    description:
      "Thick, creamy and impossibly good — our shakes are blended to perfection in flavours like Oreo, Mango, Chocolate and more. The sweetest way to finish off your CrushBurg experience.",
  },
  {
    src: hazelnutShake,
    name: "Cold Coffee",
    category: "Starting ₹99",
    badge: "4 varieties",
    description:
      "Chilled, frothy and richly aromatic — our cold coffees blend bold espresso with flavours like hazelnut and vanilla for a smooth, refreshing sip that is as satisfying as the meal itself.",
  },
];

const testimonials = [
  {
    author: {
      name: "Priya Sharma",
      handle: "Hazratganj, Lucknow",
      avatar: "https://images.unsplash.com/photo-1767607740661-05e668190cdc?w=150&h=150&fit=facearea&facepad=3&q=80",
    },
    text: "The King Fusion Burger is absolutely mind-blowing! Never thought a veg burger could taste this good. We drive all the way from Hazratganj just for this.",
  },
  {
    author: {
      name: "Rajesh Gupta",
      handle: "Indira Nagar, Lucknow",
      avatar: "https://images.unsplash.com/photo-1766162689608-b14a572cf9d4?w=150&h=150&fit=facearea&facepad=3&q=80",
    },
    text: "CrushBurg is our family's go-to every weekend. The Crunchy Tandoori Burger is my son's favourite — he refuses to eat anywhere else now!",
  },
  {
    author: {
      name: "Ananya Verma",
      handle: "Aliganj, Lucknow",
      avatar: "https://images.unsplash.com/photo-1759840278511-f73a3d62fb9f?w=150&h=150&fit=facearea&facepad=3&q=80",
    },
    text: "Genuinely the best veg burger I've had in Lucknow. Fresh, crispy, and the sauces are on another level. The fries are addictive too!",
  },
  {
    author: {
      name: "Vikram Sinha",
      handle: "Gomti Nagar, Lucknow",
      avatar: "https://images.unsplash.com/photo-1757744705465-ea08b0ddc38a?w=150&h=150&fit=facearea&facepad=3&q=80",
    },
    text: "Took my whole office team here for a treat and everyone loved it. The Paneer Wrap and the cold coffee are a deadly combo. Will definitely come back!",
  },
  {
    author: {
      name: "Neha Agarwal",
      handle: "Mahanagar, Lucknow",
      avatar: "https://images.unsplash.com/photo-1725611224180-4a50ef13a0e8?w=150&h=150&fit=facearea&facepad=3&q=80",
    },
    text: "Super clean, fast service, and the food is consistently amazing every visit. Love how they keep everything fresh and vegetarian!",
  },
  {
    author: {
      name: "Arjun Mishra",
      handle: "Alambagh, Lucknow",
      avatar: "https://images.unsplash.com/photo-1629301085063-215c20bae215?w=150&h=150&fit=facearea&facepad=3&q=80",
    },
    text: "The atmosphere is great and the staff is so friendly. Best place to chill with friends after college — affordable and incredibly delicious.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  // model section — scroll parallax + entrance
  const modelRef = useRef(null);
  const isModelInView = useInView(modelRef, { once: true, amount: 0.25 });
  const { scrollYProgress: modelScroll } = useScroll({
    target: modelRef,
    offset: ["start end", "end start"],
  });
  // per-badge floating transforms — each drifts in a unique direction
  const badge1Y = useTransform(modelScroll, [0, 1], [30, -55]);
  const badge1X = useTransform(modelScroll, [0, 1], [10, -22]);
  const badge2Y = useTransform(modelScroll, [0, 1], [20, -65]);
  const badge2X = useTransform(modelScroll, [0, 1], [-8, 25]);
  const badge3Y = useTransform(modelScroll, [0, 1], [50, -30]);
  const badge3X = useTransform(modelScroll, [0, 1], [15, -28]);
  const badge4Y = useTransform(modelScroll, [0, 1], [40, -40]);
  const badge4X = useTransform(modelScroll, [0, 1], [-12, 20]);

  // grill section image — scroll tilt
  const grillImageRef = useRef(null);
  const { scrollYProgress: grillScroll } = useScroll({
    target: grillImageRef,
    offset: ["start end", "end start"],
  });
  const grillRotate = useTransform(grillScroll, [0, 0.5], [20, 0]);
  const grillScale = useTransform(grillScroll, [0, 0.5], [1.05, 1]);

  return (
    <div className="homepage primary-color">
      <MinimalistHero imageSrc={bannerBurger} />

      {/* Marquee */}
      <div className="flex flex-col gap-0 py-3 bg-cream overflow-hidden">
        <MarqueeAnimation
          direction="left"
          baseVelocity={0.5}
          className="text-white bg-brand py-2.5 tracking-widest"
        >
          BURGERS &nbsp;•&nbsp; WRAPS &nbsp;•&nbsp; SANDWICHES &nbsp;•&nbsp; FRIES &nbsp;•&nbsp; BEVERAGES &nbsp;•&nbsp;
        </MarqueeAnimation>
        <MarqueeAnimation
          direction="right"
          baseVelocity={0.5}
          className="text-on-gold bg-gold py-2.5 tracking-widest"
        >
          CRUSHBURG &nbsp;•&nbsp; 100% VEG &nbsp;•&nbsp; FRESH DAILY &nbsp;•&nbsp; BOLD FLAVORS &nbsp;•&nbsp; LUCKNOW &nbsp;•&nbsp;
        </MarqueeAnimation>
      </div>

      {/* section one — welcome */}
      <section className="bg-cream overflow-hidden">
        {/* heading + para + tags — unchanged */}
        <div className="padding-responsive pt-16 pb-0 text-center">
          <p className="para font-primary text-brand font-semibold uppercase tracking-widest text-sm mb-3">
            Lucknow's Favourite
          </p>
          <h1 className="heading font-sans font-bold text-4xl md:text-6xl text-ink uppercase tracking-tight leading-none mb-4">
            Welcome to <span className="text-brand">CrushBurg</span>
          </h1>
          <p className="para font-primary text-ink-soft max-w-2xl mx-auto mb-6">
            Every bite is built to impress. From crispy burgers and smoky
            wraps to fresh sandwiches and bold sides — comfort food done
            right.
          </p>
          <ul className="flex flex-wrap justify-center gap-3 text-sm font-semibold mb-10 md:mb-16">
            {["100% Veg", "Fresh Daily", "Bold Flavors", "10+ Varieties"].map(
              (tag) => (
                <li
                  key={tag}
                  className="bg-gold text-on-gold px-4 py-1 rounded-full"
                >
                  {tag}
                </li>
              )
            )}
          </ul>
        </div>

        {/* model showcase */}
        <div
          ref={modelRef}
          className="relative flex justify-center items-end min-h-[480px] md:min-h-[640px] overflow-hidden"
        >
          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent z-20 pointer-events-none" />
          {/* top fade */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cream to-transparent z-20 pointer-events-none" />

          {/* soft yellow glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[280px] h-[280px] md:w-[520px] md:h-[520px] rounded-full bg-gold/50 blur-[90px]" />
          </div>

          {/* concentric circle golds */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={isModelInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] md:w-[560px] md:h-[560px] rounded-full border-[3px] border-brand/20 pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={isModelInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full border-[2px] border-gold-dark/30 pointer-events-none"
          />

          {/* badge — top left */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isModelInView ? { x: 0, opacity: 1 } : {}}
            style={{ y: badge1Y, x: badge1X }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-2 md:left-[12%] top-[28%] bg-white shadow-md rounded-xl md:rounded-2xl px-2.5 py-2 md:px-4 md:py-3 z-20"
          >
            <p className="text-[8px] md:text-[10px] font-semibold text-muted-light uppercase tracking-widest">
              Always Fresh
            </p>
            <p className="text-sm md:text-lg font-bold text-ink leading-tight">
              🌿 100% Veg
            </p>
          </motion.div>

          {/* badge — top right: Zomato */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isModelInView ? { x: 0, opacity: 1 } : {}}
            style={{ y: badge2Y, x: badge2X }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-2 md:right-[12%] top-[22%] bg-[#E23744] text-white rounded-xl md:rounded-2xl px-2.5 py-2 md:px-4 md:py-3 z-20 shadow-lg"
          >
            <p className="text-[8px] md:text-[10px] font-semibold opacity-70 uppercase tracking-widest">
              Order On
            </p>
            <p className="text-sm md:text-lg font-bold leading-tight">
              🍽 Zomato
            </p>
          </motion.div>

          {/* badge — bottom left: ⭐ Rating */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isModelInView ? { y: 0, opacity: 1 } : {}}
            style={{ y: badge3Y, x: badge3X }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-2 md:left-[14%] bottom-[10%] bg-white shadow-md rounded-xl md:rounded-2xl px-2.5 py-2 md:px-4 md:py-3 z-20"
          >
            <p className="text-[8px] md:text-[10px] font-semibold text-muted-light uppercase tracking-widest">
              Customer Love
            </p>
            <p className="text-sm md:text-lg font-bold text-ink leading-tight">
              ⭐ 4.8 Rating
            </p>
          </motion.div>

          {/* badge — bottom right: Swiggy */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isModelInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: badge4Y, x: badge4X }}
            className="absolute right-2 md:right-[14%] bottom-[10%] bg-[#FC8019] text-white rounded-xl md:rounded-2xl px-2.5 py-2 md:px-4 md:py-3 z-20 shadow-md"
          >
            <p className="text-[8px] md:text-[10px] font-semibold opacity-70 uppercase tracking-widest">
              Order On
            </p>
            <p className="text-sm md:text-lg font-bold leading-tight">
              🛵 Swiggy
            </p>
          </motion.div>

          {/* model — entrance only */}
          <motion.img
            src={modelImage}
            alt="CrushBurg crew member"
            draggable={false}
            initial={{ y: 80, opacity: 0 }}
            animate={isModelInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 h-[400px] md:h-[600px] w-auto object-contain drop-shadow-2xl select-none"
          />
        </div>
      </section>

      {/* menu section */}
      <section className="w-full padding-responsive py-14 bg-cream">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 max-w-4xl mx-auto">
          <div>
            <p className="para font-primary text-brand font-semibold uppercase tracking-widest text-sm mb-2">
              What We Serve
            </p>
            <h1 className="heading font-heading font-bold text-3xl md:text-5xl text-ink">
              Our <span className="text-brand">Menu</span>
            </h1>
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="self-start md:self-end bg-brand text-white px-6 py-2.5 rounded-full font-semibold para font-primary hover:bg-brand-light transition-colors duration-200 shadow-md whitespace-nowrap"
          >
            View Full Menu →
          </button>
        </div>

        <CircularMenuCard items={featuredItems} autoplay={true} />
      </section>

      {/* stores section */}
      <section className="w-full">
        <StoreGallery onLocateClick={() => navigate("/store")} />

        <div className="mt-8 md:mt-24 relative">
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 overflow-hidden md:h-[80vh]">
            {/* Left Text Section */}
            <GrillToYouSection />
            {/* Right Image Section — scroll tilt */}
            <div
              ref={grillImageRef}
              className="relative bg-cream overflow-hidden flex items-center justify-center min-h-[80vw] md:min-h-0"
              style={{ perspective: "1000px" }}
            >
              {/* bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-cream via-cream/60 to-transparent z-20 pointer-events-none" />
              {/* top fade */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cream to-transparent z-20 pointer-events-none" />
              {/* left fade */}
              <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />

              {/* yellow radial glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-gold/40 blur-[80px]" />
              </div>

              {/* concentric rings */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border-[2px] border-brand/15 pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full border-[2px] border-gold-dark/25 pointer-events-none"
              />

              {/* rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute w-[340px] h-[340px] md:w-[540px] md:h-[540px] rounded-full border-[1.5px] border-dashed border-brand/10 pointer-events-none"
              />

              {/* floating dot golds */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] left-[12%] w-3 h-3 rounded-full bg-gold shadow-md pointer-events-none"
              />
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-[20%] right-[14%] w-2 h-2 rounded-full bg-brand/60 pointer-events-none"
              />
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute bottom-[18%] left-[16%] w-2.5 h-2.5 rounded-full bg-gold-dark/70 pointer-events-none"
              />
              <motion.div
                animate={{ y: [7, -7, 7] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute bottom-[22%] right-[12%] w-2 h-2 rounded-full bg-brand/40 pointer-events-none"
              />

              {/* image */}
              <motion.img
                src={modelImage2}
                alt="Crushburg Shop"
                className="relative z-10 w-full h-full object-cover"
                style={{ rotateX: grillRotate, scale: grillScale }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <TestimonialsSection
        title={<>What Our <span className="text-brand">Guests Say</span></>}
        description="Real reviews from real CrushBurg fans across Lucknow — see why they keep coming back."
        testimonials={testimonials}
      />
    </div>
  );
};

export default HomePage;
