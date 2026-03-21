import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useInView, AnimatePresence } from "motion/react";

/* ── Single timeline row ────────────────────────────────────────── */
const TimelineItem = ({ item }) => {
  const contentRef = useRef(null);

  // Title is "active" while the content block is between 10% from top and 40% from bottom of viewport
  const isInView = useInView(contentRef, {
    margin: "-10% 0px -40% 0px",
    once: false,
  });

  return (
    <div className="flex justify-start pt-12 md:pt-40 md:gap-10">
      {/* Sticky label — left column */}
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-28 self-start max-w-xs lg:max-w-sm md:w-full">
        {/* Dot — pulses when active */}
        <motion.div
          animate={
            isInView
              ? { scale: 1.15, borderColor: "var(--color-red-dark, #c0392b)" }
              : { scale: 1,    borderColor: "#d4c9bc" }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="h-10 w-10 absolute left-3 md:left-3 rounded-full bg-offwhite border-2 flex items-center justify-center flex-shrink-0"
        >
          <motion.div
            animate={isInView ? { scale: 1.4 } : { scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-3 w-3 rounded-full bg-red-dark"
          />
        </motion.div>

        {/* Desktop title — fades + slides in/out */}
        <AnimatePresence mode="popLayout">
          {isInView && (
            <motion.h3
              key={item.title}
              initial={{ opacity: 0, x: -28, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0,  filter: "blur(0px)" }}
              exit={{   opacity: 0, x: -24, filter: "blur(4px)",
                        transition: { duration: 0.22, ease: "easeIn" } }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-red-dark font-heading leading-tight"
            >
              {item.title}
            </motion.h3>
          )}
        </AnimatePresence>
      </div>

      {/* Content — right column */}
      <div className="relative pl-20 pr-4 md:pl-4 w-full" ref={contentRef}>
        <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-red-dark font-heading">
          {item.title}
        </h3>
        {item.content}
      </div>
    </div>
  );
};

/* ── Timeline container ─────────────────────────────────────────── */
export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-offwhite font-primary" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}

        {/* Animated vertical line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-offwhite-dark to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-red-dark via-yellow-dark to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
