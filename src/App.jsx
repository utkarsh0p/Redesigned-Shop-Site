import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    // Jump through Lenis so its internal target stays in sync — a raw
    // window.scrollTo leaves Lenis thinking we're still on the old position,
    // which snaps the page back on the next wheel tick.
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);
  return null;
}
import AboutUs from "./pages/AboutUs.jsx";
import HomePage from "./pages/HomePage.jsx";
import Menu from "./pages/Menu.jsx";
import Contacts from "./pages/Contacts.jsx";
import Store from "./pages/Store.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Franchise from "./pages/Franchise.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import FAQ from "./pages/FAQ.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Snappier than Lenis' default lerp of 0.1, which leaves a long floaty tail.
// Touch is left native (syncTouch: false) so mobile feels like the OS.
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const lenisOptions = {
  lerp: 0.15,
  wheelMultiplier: 1,
  smoothWheel: !prefersReducedMotion,
  syncTouch: false,
  autoRaf: true,
};

function App() {
  return (
    <ThemeProvider>
    <ReactLenis root options={lenisOptions}>
    <div>
      <ScrollToTop />
      <Navbar />
      {/* bottom padding clears the mobile dock, including its safe-area offset */}
      <div className="md:pt-[88px] pb-[calc(5rem_+_env(safe-area-inset-bottom))] md:pb-0">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/termsofuse" element={<TermsOfUse />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      </div>
      <Footer />
    </div>
    </ReactLenis>
    </ThemeProvider>
  );
}

export default App;
