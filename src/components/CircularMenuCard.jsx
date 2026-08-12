import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// How far the two peeking side cards sit from the active one.
//
// This used to return a flat 68px for anything narrower than 1024px, which is
// fine on a laptop but not on a phone: the cards are `w-full`, so at a ~330px
// container a side card's right edge lands at 0.925*W + 68 — roughly 43px past
// the container and off the side of the screen. Below the desktop breakpoint the
// offset now scales with the container so the peek stays inside it.
function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 68;
  const maxGap = 94;
  if (width <= minWidth) return Math.max(18, Math.min(minGap, width * 0.11));
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const CircularMenuCard = ({ items, autoplay = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);

  const imageContainerRef = useRef(null);
  const autoplayRef = useRef(null);

  const length = useMemo(() => items.length, [items]);
  const active = useMemo(() => items[activeIndex], [activeIndex, items]);

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current)
        setContainerWidth(imageContainerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((p) => (p + 1) % length);
      }, 2000);
    }
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, length]);

  const handleNext = useCallback(() => {
    clearInterval(autoplayRef.current);
    setActiveIndex((p) => (p + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    clearInterval(autoplayRef.current);
    setActiveIndex((p) => (p - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + length) % length === index;
    const isRight = (activeIndex + 1) % length === index;

    if (isActive)
      return {
        zIndex: 3, opacity: 1, pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    if (isLeft)
      return {
        zIndex: 2, opacity: 1, pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    if (isRight)
      return {
        zIndex: 2, opacity: 1, pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    // overflow-x-clip: the peeking side cards are transformed sideways, so this
    // backstops any spill past the viewport (which widens the page and drags the
    // fixed navbar/dock with it). Not `hidden` — that would create a scroll
    // container and break the sticky elements elsewhere on the page.
    <div className="w-full max-w-4xl mx-auto px-4 py-6 overflow-x-clip">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">

        {/* Images */}
        <div
          ref={imageContainerRef}
          className="relative w-full h-72 md:h-96"
          style={{ perspective: "1000px" }}
        >
          {items.map((item, index) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.name}
              className="absolute w-full h-full object-cover rounded-3xl shadow-2xl border-[3px] border-brand"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Content
            min-h reserves the tallest slide. Autoplay swaps a 177–222 char
            description every 2s, so the block wrapped to 4 lines or 5 depending
            on the item, and `AnimatePresence mode="wait"` unmounts it entirely
            for the 0.3s crossover. Both changed the section height, which
            reflowed the page on a 2s cycle and made the fixed dock and navbar
            jump. Reserving the space keeps the height constant. */}
        <div className="flex flex-col justify-between min-h-[330px] md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-2"
            >
              {/* Price badge */}
              <span className="inline-block bg-gold text-on-gold text-xs font-bold px-3 py-1 rounded-full w-fit uppercase tracking-wide">
                {active.badge}
              </span>

              {/* Name */}
              <h3 className="heading font-heading font-bold text-2xl md:text-3xl text-ink mt-1">
                {active.name}
              </h3>

              {/* Category */}
              <p className="para font-primary text-brand font-semibold text-sm">
                {active.category}
              </p>

              {/* Description — word-by-word blur-in */}
              <motion.p className="para font-primary text-ink-soft leading-relaxed mt-2 min-h-[140px] md:min-h-[132px]">
                {active.description.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows + dot indicator */}
          <div className="flex items-center gap-4 pt-8">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer border-none"
              style={{ backgroundColor: hoverPrev ? "#804632" : "#5F3425" }}
              aria-label="Previous item"
            >
              <ArrowLeft size={20} color="#fff" strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer border-none"
              style={{ backgroundColor: hoverNext ? "#804632" : "#5F3425" }}
              aria-label="Next item"
            >
              <ArrowRight size={20} color="#fff" strokeWidth={2.5} />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5 ml-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { clearInterval(autoplayRef.current); setActiveIndex(i); }}
                  className={`rounded-full transition-all duration-300 cursor-pointer border-none ${
                    i === activeIndex ? "w-5 h-2 bg-brand" : "w-2 h-2 bg-cream-dark"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularMenuCard;
