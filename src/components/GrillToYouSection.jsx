import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

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
            strokeOpacity={0.06 + path.id * 0.018}
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

const bullets = [
  "Fresh burgers, sandwiches, wraps & more",
  "Easy franchise setup & full support",
  "Proven business growth model",
  "Strong marketing & brand presence",
];

const titleWords = "From Our Grill to Your Plate".split(" ");

const GrillToYouSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-cream overflow-hidden h-full p-10 primary-color flex flex-col justify-center">
      {/* Floating paths background */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="para font-primary text-brand font-semibold uppercase tracking-widest text-sm mb-3"
        >
          Fresh & Bold
        </motion.p>

        {/* Title with letter-by-letter animation */}
        <h1 className="font-sans font-bold text-3xl md:text-4xl text-ink uppercase tracking-tight leading-tight mb-4">
          {titleWords.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2 last:mr-0">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: wordIndex * 0.08 + letterIndex * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="para mb-6"
        >
          Join the Crushburg family and be a part of the fastest-growing burger,
          sandwich &amp; wrap brand.
        </motion.p>

        {/* Bullets */}
        <ul className="para space-y-2 mb-6">
          {bullets.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          onClick={() => navigate("/franchise")}
          className="mt-2 bg-brand py-2 text-white px-6 md:py-3 rounded-full font-semibold w-fit cursor-pointer para hover:bg-brand-light transition-colors duration-200 shadow-md"
        >
          Apply For A Franchise
        </motion.button>
      </div>
    </div>
  );
};

export default GrillToYouSection;
