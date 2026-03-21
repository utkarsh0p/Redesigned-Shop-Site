import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

const StickyScroll = ({ content }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  // Track scroll progress relative to the whole container on the page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const panelGradients = [
    "linear-gradient(to bottom right, #D32F2F, #FF9800)",
    "linear-gradient(to bottom right, #F44336, #FFCA28)",
    "linear-gradient(to bottom right, #D32F2F, #FF9800)",
    "linear-gradient(to bottom right, #F44336, #FFCA28)",
  ];

  const [panelGradient, setPanelGradient] = useState(panelGradients[0]);

  useEffect(() => {
    setPanelGradient(panelGradients[activeCard % panelGradients.length]);
  }, [activeCard]);

  return (
    <div ref={containerRef} className="relative flex gap-12 lg:gap-20 items-start">

      {/* Left — full-page scrolling text */}
      <div className="w-full lg:w-1/2">
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="min-h-screen flex flex-col justify-center py-24"
          >
            <motion.h2
              animate={{ opacity: activeCard === index ? 1 : 0.25 }}
              className="heading font-heading font-bold text-2xl md:text-3xl text-red-dark mb-6"
            >
              {item.title}
            </motion.h2>
            <motion.div
              animate={{ opacity: activeCard === index ? 1 : 0.25 }}
              className="para font-primary text-gray-700 leading-relaxed space-y-4"
            >
              {item.description}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Right — sticky image panel, only on desktop */}
      <div className="hidden lg:block w-1/2">
        <div className="sticky top-24">
          <div
            style={{ background: panelGradient }}
            className="h-[520px] rounded-2xl overflow-hidden shadow-xl transition-all duration-700"
          >
            {content[activeCard].content ?? null}
          </div>
        </div>
      </div>

    </div>
  );
};

export default StickyScroll;
