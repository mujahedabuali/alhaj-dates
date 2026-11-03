import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations } from "./translations";

const LocaleContext = createContext(null);

export const getLocaleFromPath = (pathname) =>
  pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";

/** Build a localized path. `path` is language-agnostic, e.g. "/", "/about". */
export const localizePath = (path, lang) => {
  const clean = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (lang === "ar") return clean ? `/ar${clean}` : "/ar";
  return clean || "/";
};

/** Strip /ar prefix to get the shared route key. */
export const stripLocale = (pathname) => {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname || "/";
};

export const LocaleProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = getLocaleFromPath(location.pathname);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo(
    () => ({
      lang,
      dir,
      t,
      isAr: lang === "ar",
      path: (p) => localizePath(p, lang),
      switchLanguage: () => {
        const base = stripLocale(location.pathname);
        const nextLang = lang === "ar" ? "en" : "ar";
        navigate(localizePath(base, nextLang) + location.search + location.hash);
      },
    }),
    [lang, dir, t, location.pathname, location.search, location.hash, navigate]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
};
