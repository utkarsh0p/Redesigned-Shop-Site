import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
import Lenis from "lenis";
import gsap from "gsap";

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
    <div>
      <ScrollToTop />
      <Navbar />
      <div className="md:pt-[88px] pb-20 md:pb-0 overflow-x-hidden">
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
    </ThemeProvider>
  );
}

export default App;
