import { useState, useRef, useEffect } from "react";
import { logoBrown, logoCream } from "../constants";
import { Home, Store, UtensilsCrossed, Phone, Info, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import AnimeNavBar from "./AnimeNavBar";
import SkyToggle from "./SkyToggle";
import { useTheme } from "../context/ThemeContext";

// `title` is the dock label. Six tabs plus an expanded label is a tight fit on a
// 360px phone, so these are kept short — "Our Stores"/"About Us" overflowed.
const BOTTOM_TABS = [
  { title: "Home",      to: "/",          icon: Home },
  { title: "Menu",      to: "/menu",      icon: UtensilsCrossed },
  { title: "Stores",    to: "/store",     icon: Store },
  { title: "Contact",   to: "/contact",   icon: Phone },
  { title: "About",     to: "/aboutus",   icon: Info },
  { title: "Franchise", to: "/franchise", icon: Users },
];

const tabVariants = {
  animate: (isSelected) => ({
    gap: isSelected ? "0.35rem" : 0,
    paddingLeft: isSelected ? "0.75rem" : "0.5rem",
    paddingRight: isSelected ? "0.75rem" : "0.5rem",
  }),
};

const labelVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit:    { width: 0, opacity: 0 },
};

const springTransition = { delay: 0.05, type: "spring", bounce: 0, duration: 0.5 };

const Navbar = () => {
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const logo = isDark ? logoCream : logoBrown;

  // env(safe-area-inset-bottom) is re-evaluated live while the mobile browser
  // toolbar retracts (notably Chrome Android under viewport-fit=cover), so
  // anything anchored to it slides during scroll. Sample it once on mount and
  // pin the dock to the frozen value instead.
  useEffect(() => {
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;left:-9999px;bottom:0;width:0;height:env(safe-area-inset-bottom,0px);";
    document.body.appendChild(probe);
    const inset = probe.getBoundingClientRect().height;
    probe.remove();
    document.documentElement.style.setProperty("--sab", `${inset}px`);
  }, []);

  // Hide on scroll down, show on scroll up.
  // THRESHOLD must sit well above Lenis' momentum wobble. At the old 8px, the
  // tail of a smooth-scroll flick kept crossing it in alternating directions,
  // so the bar (and the theme toggle in it) slid in and out repeatedly — that
  // was the "bouncing". rAF-batched so a burst of scroll events costs at most
  // one state update per frame.
  useEffect(() => {
    const THRESHOLD = 56;
    let ticking = false;

    const update = () => {
      ticking = false;
      // Only the desktop bar hides, so on mobile skip the state update entirely
      // rather than re-rendering the dock on every scroll frame.
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const y = window.scrollY;
      if (y < 80) {
        setNavVisible(true);
        lastScrollY.current = y;
        return;
      }
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) < THRESHOLD) return;
      setNavVisible(delta < 0);
      lastScrollY.current = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
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
        <Link to="/" aria-label="CrushBurg home">
          <img src={logo} alt="CrushBurg" className="w-24 h-auto object-contain" />
        </Link>
        <AnimeNavBar />
        <div className="flex items-center gap-4">
          <SkyToggle />
        </div>
      </motion.div>

      {/* ── Mobile top bar ── */}
      {/* Deliberately NOT hide-on-scroll. On mobile the browser toolbar already
          shows/hides as you scroll, which shifts every fixed element; sliding
          this bar on top of that made the theme toggle visibly bounce. Mobile
          navigation lives in the bottom dock anyway, so the bar just stays put. */}
      <nav
        className="md:hidden fixed top-0 left-0 right-0 z-[9998] bg-white shadow-md text-ink flex items-center justify-between px-4 py-3 pt-[calc(0.75rem_+_env(safe-area-inset-top))] font-body">
        <Link to="/" aria-label="CrushBurg home" className="w-20 flex-shrink-0">
          <img src={logo} alt="CrushBurg" className="w-full h-auto object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <SkyToggle />
        </div>
      </nav>

      {/* ── Mobile Bottom Dock ── */}
      {/* bottom offset adds the safe-area inset so the dock clears the iOS home
          indicator / Android gesture bar. Resolves to plain 1rem elsewhere. */}
      {/* transform-gpu keeps the dock on its own compositor layer so it isn't
          re-rastered with the page during scroll */}
      <div className="fixed bottom-[calc(1rem_+_var(--sab,0px))] left-0 right-0 flex justify-center px-3 md:hidden z-50 transform-gpu">
        <div className="flex items-center gap-0.5 rounded-2xl border border-cream-dark bg-white p-1.5 shadow-lg max-w-full">
          {BOTTOM_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeRoute?.to === tab.to;

            return (
              <motion.button
                key={tab.to}
                variants={tabVariants}
                initial={false}
                animate="animate"
                custom={isActive}
                transition={springTransition}
                onClick={() => navigate(tab.to)}
                aria-label={tab.title}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative flex min-w-0 shrink items-center justify-center rounded-xl min-h-11 text-sm font-semibold transition-colors duration-300",
                  isActive
                    ? "bg-cream text-brand"
                    : "text-muted hover:bg-cream hover:text-brand",
                ].join(" ")}
              >
                <Icon size={20} className="shrink-0" />
                <AnimatePresence initial={false}>
                  {isActive && (
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
