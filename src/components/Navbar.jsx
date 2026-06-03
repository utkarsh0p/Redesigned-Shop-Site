import { useState, useRef, useEffect } from "react";
import { logoMain } from "../constants";
import { Home, Store, UtensilsCrossed, Phone, Info, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import DiscoverButton from "./DiscoverButton";
import AnimeNavBar from "./AnimeNavBar";
import SkyToggle from "./SkyToggle";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const dockRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  const activeRoute = BOTTOM_TABS.find((t) =>
    t.to === "/" ? location.pathname === "/" : location.pathname.startsWith(t.to)
  );

  return (
    <>
      {/* ── Desktop top bar ── */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-[9998] items-center justify-between px-8 py-3 bg-white shadow-md overflow-visible">
        <img src={logoMain} alt="logo" className="w-24 h-auto object-contain" />
        <AnimeNavBar />
        <div className="flex items-center gap-4">
          <SkyToggle />
          <DiscoverButton />
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-[9998] bg-white shadow-md text-black flex items-center justify-between px-4 py-3 font-body">
        <div className="w-20 flex-shrink-0">
          <img src={logoMain} alt="logo" className="w-full h-auto object-contain" />
        </div>
        <div className="flex items-center gap-3">
          {!searchOpen && <SkyToggle />}
          <DiscoverButton onSearchToggle={setSearchOpen} />
        </div>
      </nav>

      {/* ── Mobile Bottom Dock ── */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center md:hidden z-50">
        <div
          ref={dockRef}
          className="flex items-center gap-1 rounded-2xl border border-offwhite-dark bg-white p-1.5 shadow-lg"
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
                    ? "bg-offwhite text-red-dark"
                    : "text-gray-500 hover:bg-offwhite hover:text-red-dark",
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
