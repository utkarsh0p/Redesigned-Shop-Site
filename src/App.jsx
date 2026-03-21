import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider>
    <div>
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
