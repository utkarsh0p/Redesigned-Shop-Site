import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useInView } from "motion/react";
import { shop1, shop2, shop3, shop4 } from "../constants";

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const Photo = ({ src, alt, direction, width, height }) => {
  const [rotation, setRotation] = useState(0);
  const x = useMotionValue(150);
  const y = useMotionValue(150);

  useEffect(() => {
    const r = getRandomInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(r);
  }, []);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className="relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(150); y.set(150); }}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg border-[3px] border-brand">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-2xl"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

const allPhotos = [
  { id: 1, order: 0, x: "-270px", y: "20px", zIndex: 40, direction: "left",  src: shop4, alt: "CrushBurg Store" },
  { id: 2, order: 1, x: "-90px",  y: "35px", zIndex: 30, direction: "left",  src: shop2, alt: "CrushBurg Store" },
  { id: 3, order: 2, x: "90px",   y: "12px", zIndex: 20, direction: "right", src: shop1, alt: "CrushBurg Store" },
  { id: 4, order: 3, x: "270px",  y: "28px", zIndex: 10, direction: "right", src: shop3, alt: "CrushBurg Store" },
];

const mobilePhotos = [
  { id: 1, order: 0, x: "-100px", y: "20px", zIndex: 30, direction: "left",  src: shop4, alt: "CrushBurg Store" },
  { id: 2, order: 1, x: "0px",   y: "35px", zIndex: 20, direction: "left",  src: shop2, alt: "CrushBurg Store" },
  { id: 3, order: 2, x: "100px", y: "12px", zIndex: 10, direction: "right", src: shop1, alt: "CrushBurg Store" },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const photoVariants = {
  hidden: () => ({ x: 0, y: 0, scale: 1 }),
  visible: (custom) => ({
    x: custom.x,
    y: custom.y,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 12,
      mass: 1,
      delay: custom.order * 0.15,
    },
  }),
};

const StoreGallery = ({ onLocateClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const photos = isMobile ? mobilePhotos : allPhotos;

  return (
    <div className="w-full py-10 md:py-16 bg-cream">
      {/* Heading */}
      <div className="flex flex-col items-center text-center padding-responsive mb-2">
        <p className="font-primary text-brand font-semibold uppercase tracking-widest text-xs md:text-sm mb-2">
          Our Stores
        </p>
        <h1 className="heading font-heading font-bold text-3xl md:text-5xl text-ink max-w-xl">
          Where Every Bite{" "}
          <span className="text-brand">Begins</span>
        </h1>
        <p className="para font-primary text-muted mt-3 max-w-md">
          Step in, sit down, and let us crush your hunger — find a CrushBurg near you.
        </p>
      </div>

      {/* Animated photo spread */}
      <div
        ref={ref}
        className="relative h-[320px] md:h-[380px] w-full flex items-center justify-center overflow-visible"
      >
        <motion.div
          className="relative mx-auto flex w-full max-w-5xl justify-center"
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute top-0"
                  style={{ zIndex: photo.zIndex, left: isMobile ? 30 : 10 }}
                  variants={photoVariants}
                  custom={{ x: photo.x, y: photo.y, order: photo.order }}
                >
                  <Photo
                    width={isMobile ? 160 : 200}
                    height={isMobile ? 180 : 220}
                    src={photo.src}
                    alt={photo.alt}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-4">
        <button
          onClick={onLocateClick}
          className="bg-brand text-white px-7 py-2.5 rounded-full font-semibold para font-primary hover:bg-brand-light transition-colors duration-200 shadow-md"
        >
          Locate Nearby Stores →
        </button>
      </div>
    </div>
  );
};

export default StoreGallery;
