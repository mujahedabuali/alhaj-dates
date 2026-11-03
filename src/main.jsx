import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import { LocaleProvider } from "./i18n/LocaleContext.jsx";

const Shell = ({ children }) => (
  <LocaleProvider>
    <Navbar />
    <main id="main">{children}</main>
    <Footer />
  </LocaleProvider>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Shell>
        <Routes>
          {/* English (default) — no prefix */}
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          {/* Arabic — /ar prefix */}
          <Route path="/ar" element={<App />} />
          <Route path="/ar/about" element={<About />} />
          <Route path="/ar/gallery" element={<Gallery />} />
          <Route path="/ar/contact" element={<Contact />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  </StrictMode>
);
