import React from "react";
import { motion } from "motion/react";

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#5F3425"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.015}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + (path.id % 7) * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const MinimalistHero = ({ imageSrc }) => {
  return (
    <div className="relative flex min-h-[90vh] w-full flex-col items-center justify-center bg-cream px-6 py-10 md:px-12 md:py-0 md:h-[90vh] md:overflow-hidden">
      {/* Floating paths background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl h-full grid-cols-1 items-center gap-6 md:gap-0 md:grid-cols-3">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          <p className="para mx-auto max-w-xs leading-relaxed text-ink/70 md:mx-0">
            Bold flavours. Fresh ingredients. 100% vegetarian. Every bite at
            CrushBurg is crafted to impress.
          </p>
          <a
            href="/menu"
            className="mt-4 inline-block text-sm font-semibold text-brand underline decoration-from-font hover:text-brand-light transition-colors"
          >
            View Menu →
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[260px] w-[260px] rounded-full bg-gold md:h-[340px] md:w-[340px] lg:h-[420px] lg:w-[420px]"
          />
          <motion.img
            src={imageSrc}
            alt="CrushBurg signature burger"
            className="relative z-10 h-auto w-[320px] object-contain md:w-[420px] lg:w-[520px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        {/* Right Overlay Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-end md:pl-8"
        >
          <h1 className="text-5xl font-extrabold text-ink uppercase tracking-tight font-sans leading-none md:text-4xl lg:text-5xl whitespace-nowrap">
            CRUSH<span className="text-brand">BURG</span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default MinimalistHero;
