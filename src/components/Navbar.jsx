import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems } from "../data/company";
import { useLocale, stripLocale } from "../i18n/LocaleContext";
import LocaleLink from "./LocaleLink";

const Navbar = () => {
  const location = useLocation();
  const { t, switchLanguage, lang } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const current = stripLocale(location.pathname);
  const isHome = current === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed top-0 inset-inline-start-0 z-50 w-full transition-all duration-300 ${
        solid
          ? "bg-brand-deep text-cream shadow-[0_8px_30px_rgba(10,22,18,0.35)]"
          : "bg-transparent text-white"
      }`}
    >
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <div className="container-narrow flex h-[4.5rem] items-center justify-between gap-3 px-4 sm:px-5 md:h-[5.25rem] md:px-6">
        <LocaleLink to="/" className="brand-lockup" aria-label={t.brand}>
          <img src="/al-haj.png" alt="" />
          <div className="brand-lockup-text">
            <p className="brand-lockup-title">Al-Haj Dates</p>
            <p className="brand-lockup-sub" dir="rtl" lang="ar">
              تمور الحاج
            </p>
          </div>
        </LocaleLink>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = current === item.path;
            return (
              <LocaleLink
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  active
                    ? "text-primary-light"
                    : solid
                      ? "text-cream/85 hover:text-primary-light"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {t.nav[item.key]}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-primary-light"
                  />
                )}
              </LocaleLink>
            );
          })}
          <button
            type="button"
            onClick={switchLanguage}
            className={`ms-2 px-3 py-2 text-sm font-semibold transition ${
              solid ? "text-cream hover:text-primary-light" : "text-white hover:text-primary-light"
            }`}
            aria-label={t.langSwitchLabel}
          >
            {t.langSwitch}
          </button>
          <LocaleLink
            to="/contact"
            className={`ms-2 px-4 py-2 text-sm font-semibold transition ${
              solid
                ? "bg-primary text-cream hover:bg-primary-light hover:text-ink"
                : "bg-primary-light text-ink hover:bg-cream"
            }`}
          >
            {t.nav.inquire}
          </LocaleLink>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={switchLanguage}
            className="min-h-10 px-2.5 text-sm font-semibold"
            aria-label={t.langSwitchLabel}
          >
            {lang === "en" ? "ع" : "EN"}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t.menuClose : t.menuOpen}</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`h-0.5 w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-brand-deep lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-5">
              {navItems.map((item) => (
                <LocaleLink
                  key={item.path}
                  to={item.path}
                  className={`rounded-sm px-2 py-3 text-base ${
                    current === item.path ? "bg-white/10 text-primary-light" : "text-cream/90"
                  }`}
                >
                  {t.nav[item.key]}
                </LocaleLink>
              ))}
              <LocaleLink
                to="/contact"
                className="mt-2 bg-primary px-3 py-3 text-center text-sm font-semibold text-cream"
              >
                {t.nav.inquire}
              </LocaleLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
