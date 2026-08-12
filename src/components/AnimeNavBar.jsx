import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Store, UtensilsCrossed, Info, Phone, Briefcase } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home",       to: "/",          icon: Home },
  { name: "Our Stores", to: "/store",     icon: Store },
  { name: "Menu",       to: "/menu",      icon: UtensilsCrossed },
  { name: "About Us",   to: "/aboutus",   icon: Info },
  { name: "Contact Us", to: "/contact",   icon: Phone },
  { name: "Franchise",  to: "/franchise", icon: Briefcase },
];

export function AnimeNavBar() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const activeItem =
    NAV_ITEMS.find((item) =>
      item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
    ) || NAV_ITEMS[0];

  return (
    <motion.div
      className="flex items-center gap-1 bg-brand border border-brand-light/30 py-1.5 px-2 rounded-full shadow-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeItem.name === item.name;
        const isHovered = hoveredTab === item.name;

        return (
          <NavLink
            key={item.name}
            to={item.to}
            onMouseEnter={() => setHoveredTab(item.name)}
            onMouseLeave={() => setHoveredTab(null)}
            className="relative cursor-pointer text-sm font-bold px-5 py-2 rounded-full transition-colors duration-300 text-white"
          >
            {/* Active glow layers */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.04, 1],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-md" />
                  <div className="absolute inset-[-4px] bg-gold/15 rounded-full blur-xl" />
                  <div className="absolute inset-[-8px] bg-gold-dark/10 rounded-full blur-2xl" />
                  {/* Shine sweep */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0"
                    style={{ animation: "shine 3s ease-in-out infinite" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover bg */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                />
              )}
            </AnimatePresence>

            <span className="relative z-10">{item.name}</span>

            {/* Diamond pointer above active tab */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute -top-4 left-1/2 w-4 h-4 -translate-x-1/2 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  animate={
                    isHovered
                      ? { opacity: 1, scale: 1, y: [0, -6, 0], transition: { y: { duration: 0.25, repeat: Infinity, repeatType: "reverse" } } }
                      : { opacity: 1, scale: 1, y: [0, -3, 0], transition: { y: { duration: 0.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 } } }
                  }
                >
                  <div className="w-full h-full bg-white rotate-45 transform origin-center shadow-sm" style={{ border: "1.5px solid #D6D0CA" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </NavLink>
        );
      })}
    </motion.div>
  );
}

export default AnimeNavBar;
