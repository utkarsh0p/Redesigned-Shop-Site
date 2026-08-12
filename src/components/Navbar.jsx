import { useState, useRef, useEffect } from "react";
import { logoBrown, logoCream } from "../constants";
import { Home, Store, UtensilsCrossed, Phone, Info, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import AnimeNavBar from "./AnimeNavBar";
import SkyToggle from "./SkyToggle";
import { useTheme } from "../context/ThemeContext";

const BOTTOM_TABS = [
  { title: "Home",       to: "/",         icon: Home },
  { title: "Menu",       to: "/menu",     icon: UtensilsCrossed },
  { title: "Our Stores", to: "/store",    icon: Store },
  { title: "Contact",    to: "/contact",  icon: Phone },
  { title: "About Us",   to: "/aboutus",  icon: Info },
  { title: "Franchise",  to: "/franchise", icon: Users },
];

const tabVariants = {
  animate: (isSelected) => ({
    gap: isSelected ? "0.4rem" : 0,
    paddingLeft: isSelected ? "1rem" : "0.6rem",
    paddingRight: isSelected ? "1rem" : "0.6rem",
  }),
};

const labelVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit:    { width: 0, opacity: 0 },
};

const springTransition = { delay: 0.05, type: "spring", bounce: 0, duration: 0.5 };

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const dockRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const logo = isDark ? logoCream : logoBrown;

  // Collapse expanded tab on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setSelectedTab(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current < 10) { setNavVisible(true); return; }
      if (Math.abs(current - lastScrollY.current) < 8) return;
      setNavVisible(current < lastScrollY.current);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeRoute = BOTTOM_TABS.find((t) =>
    t.to === "/" ? location.pathname === "/" : location.pathname.startsWith(t.to)
  );

  return (
    <>
      {/* ── Desktop top bar ── */}
      <motion.div
        animate={{ y: navVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex fixed top-0 left-0 right-0 z-[9998] items-center justify-between px-8 py-3 pt-[calc(0.75rem_+_env(safe-area-inset-top))] bg-white shadow-md overflow-visible">
        <img src={logo} alt="CrushBurg" className="w-24 h-auto object-contain" />
        <AnimeNavBar />
        <div className="flex items-center gap-4">
          <SkyToggle />
        </div>
      </motion.div>

      {/* ── Mobile top bar ── */}
      <motion.nav
        animate={{ y: navVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden fixed top-0 left-0 right-0 z-[9998] bg-white shadow-md text-ink flex items-center justify-between px-4 py-3 pt-[calc(0.75rem_+_env(safe-area-inset-top))] font-body">
        <div className="w-20 flex-shrink-0">
          <img src={logo} alt="CrushBurg" className="w-full h-auto object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <SkyToggle />
        </div>
      </motion.nav>

      {/* ── Mobile Bottom Dock ── */}
      {/* bottom offset adds the safe-area inset so the dock clears the iOS home
          indicator / Android gesture bar. Resolves to plain 1rem elsewhere. */}
      <div className="fixed bottom-[calc(1rem_+_env(safe-area-inset-bottom))] left-0 right-0 flex justify-center md:hidden z-50">
        <div
          ref={dockRef}
          className="flex items-center gap-1 rounded-2xl border border-cream-dark bg-white p-1.5 shadow-lg"
        >
          {BOTTOM_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeRoute?.to === tab.to;
            const isExpanded = selectedTab === tab.to || isActive;

            return (
              <motion.button
                key={tab.to}
                variants={tabVariants}
                initial={false}
                animate="animate"
                custom={isExpanded}
                transition={springTransition}
                onClick={() => {
                  setSelectedTab(tab.to);
                  navigate(tab.to);
                }}
                className={[
                  "relative flex items-center rounded-xl py-2 text-sm font-semibold transition-colors duration-300",
                  isActive
                    ? "bg-cream text-brand"
                    : "text-muted hover:bg-cream hover:text-brand",
                ].join(" ")}
              >
                <Icon size={20} />
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.span
                      variants={labelVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={springTransition}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {tab.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
