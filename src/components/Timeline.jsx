import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

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
          <div
            key={index}
            className="flex justify-start pt-12 md:pt-40 md:gap-10"
          >
            {/* Sticky label — left column */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Dot */}
              <div className="h-10 w-10 absolute left-3 md:left-3 rounded-full bg-offwhite border-2 border-offwhite-dark flex items-center justify-center flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-red-dark" />
              </div>
              {/* Label */}
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-red-dark font-heading leading-tight">
                {item.title}
              </h3>
            </div>

            {/* Content — right column */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-red-dark font-heading">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
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
