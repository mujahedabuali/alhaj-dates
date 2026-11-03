import { useEffect } from "react";
import { company } from "../data/company";
import { useLocale, localizePath } from "../i18n/LocaleContext";

const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel, href, hreflang) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const Seo = ({ title, description, path = "/", image = "/alhaj-background.png" }) => {
  const { lang, t } = useLocale();

  useEffect(() => {
    const fullTitle = title.includes(t.brand) || title.includes("Al-Haj") || title.includes("تمور")
      ? title
      : `${title} | ${t.brand}`;
    document.title = fullTitle;

    const enUrl = `${company.siteUrl}${localizePath(path, "en")}`;
    const arUrl = `${company.siteUrl}${localizePath(path, "ar")}`;
    const pageUrl = lang === "ar" ? arUrl : enUrl;
    const absoluteImage = image.startsWith("http") ? image : `${company.siteUrl}${image}`;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:image", absoluteImage);
    upsertMeta("property", "og:locale", lang === "ar" ? "ar_PS" : "en_US");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    upsertLink("canonical", pageUrl);
    upsertLink("alternate", enUrl, "en");
    upsertLink("alternate", arUrl, "ar");
    upsertLink("alternate", enUrl, "x-default");
  }, [title, description, path, image, lang, t.brand]);

  return null;
};

export default Seo;
