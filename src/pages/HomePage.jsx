import React from "react";
import {
  bannerBurger,
  shopAiImage,
  shopAiImage2,
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
import { ContainerScroll } from "../components/ContainerScroll.jsx";
import { useNavigate } from "react-router-dom";

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

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage primary-color">
      <MinimalistHero imageSrc={bannerBurger} />

      {/* Marquee */}
      <div className="flex flex-col gap-0 py-3 bg-offwhite overflow-hidden">
        <MarqueeAnimation
          direction="left"
          baseVelocity={0.5}
          className="text-white bg-red-dark py-2.5 tracking-widest"
        >
          BURGERS &nbsp;•&nbsp; WRAPS &nbsp;•&nbsp; SANDWICHES &nbsp;•&nbsp; FRIES &nbsp;•&nbsp; BEVERAGES &nbsp;•&nbsp;
        </MarqueeAnimation>
        <MarqueeAnimation
          direction="right"
          baseVelocity={0.5}
          className="text-black bg-yellow-light py-2.5 tracking-widest"
        >
          CRUSHBURG &nbsp;•&nbsp; 100% VEG &nbsp;•&nbsp; FRESH DAILY &nbsp;•&nbsp; BOLD FLAVORS &nbsp;•&nbsp; LUCKNOW &nbsp;•&nbsp;
        </MarqueeAnimation>
      </div>

      {/* section one — welcome with scroll animation */}
      <section className="bg-offwhite overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="padding-responsive">
              <p className="para font-primary text-red-dark font-semibold uppercase tracking-widest text-sm mb-3">
                Lucknow's Favourite
              </p>
              <h1 className="heading font-sans font-bold text-4xl md:text-6xl text-gray-900 uppercase tracking-tight leading-none mb-4">
                Welcome to <span className="text-red-dark">CrushBurg</span>
              </h1>
              <p className="para font-primary text-gray-600 max-w-2xl mx-auto mb-6">
                Every bite is built to impress. From crispy burgers and smoky
                wraps to grilled sandwiches and bold sides — comfort food done
                right.
              </p>
              <ul className="flex flex-wrap justify-center gap-3 text-sm font-semibold mb-10 md:mb-16">
                {["100% Veg", "Fresh Daily", "Bold Flavors", "10+ Varieties"].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="bg-yellow-light text-black px-4 py-1 rounded-full"
                    >
                      {tag}
                    </li>
                  )
                )}
              </ul>
            </div>
          }
        >
          <img
            src={shopAiImage}
            alt="CrushBurg store"
            className="w-full h-full object-contain md:object-cover object-center rounded-2xl"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* menu section */}
      <section className="w-full padding-responsive py-14 bg-offwhite">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 max-w-4xl mx-auto">
          <div>
            <p className="para font-primary text-red-dark font-semibold uppercase tracking-widest text-sm mb-2">
              What We Serve
            </p>
            <h1 className="heading font-heading font-bold text-3xl md:text-5xl text-gray-900">
              Our <span className="text-red-dark">Menu</span>
            </h1>
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="self-start md:self-end bg-red-dark text-white px-6 py-2.5 rounded-full font-semibold para font-primary hover:bg-red-light transition-colors duration-200 shadow-md whitespace-nowrap"
          >
            View Full Menu →
          </button>
        </div>

        <CircularMenuCard items={featuredItems} autoplay={true} />
      </section>

      {/* stores section */}
      <section className="w-full">
        <StoreGallery onLocateClick={() => navigate("/store")} />

        <div className="mt-8 md:mt-24">
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1  overflow-hidden md:h-[80vh]">
            {/* Left Text Section */}
            <GrillToYouSection />
            {/* Right Image Section */}
            <div className="relative">
              <img
                src={shopAiImage2}
                alt="Crushburg Shop"
                className="w-full h-full object-fit"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
