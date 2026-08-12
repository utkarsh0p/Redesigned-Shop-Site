import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
} from "motion/react";

// replaces @motionone/utils wrap
function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function MarqueeAnimation({ children, className = "", direction = "left", baseVelocity = 10 }) {
  const wrapperRef = useRef(null);
  // Only run the frame loop while the marquee is actually on screen — otherwise
  // every instance keeps a rAF alive for the whole session and competes with
  // Lenis for the main thread.
  const inView = useInView(wrapperRef, { margin: "200px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    if (!inView) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (direction === "left") {
      directionFactor.current = 1;
    } else if (direction === "right") {
      directionFactor.current = -1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={wrapperRef} className="overflow-hidden max-w-full whitespace-nowrap flex relative">
      <motion.div
        className={`font-bold uppercase text-sm md:text-xl lg:text-2xl flex flex-nowrap whitespace-nowrap [&>span]:block [&>span]:mr-8 ${className}`}
        style={{ x }}
      >
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

export { MarqueeAnimation };
