import { useEffect } from "react";
import { absoluteUrl, company } from "../data/company";
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

const upsertJsonLd = (id, data) => {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

/**
 * Per-page SEO. WhatsApp/Facebook crawlers mainly read index.html,
 * so keep absolute OG tags there too — this updates title/meta for browsers
 * and for crawlers that execute JS / prerender.
 */
const Seo = ({
  title,
  description,
  path = "/",
  image = company.shareImagePath,
  imageAlt,
  jsonLd,
}) => {
  const { lang, t } = useLocale();

  useEffect(() => {
    const fullTitle =
      title.includes(t.brand) || title.includes("Al-Haj") || title.includes("تمور")
        ? title
        : `${title} | ${t.brand}`;
    document.title = fullTitle;

    const enUrl = absoluteUrl(localizePath(path, "en"));
    const arUrl = absoluteUrl(localizePath(path, "ar"));
    const pageUrl = lang === "ar" ? arUrl : enUrl;
    const absoluteImage = absoluteUrl(image);
    const alt = imageAlt || `${t.brand} — ${title}`;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Al-Haj Dates");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:image", absoluteImage);
    upsertMeta("property", "og:image:secure_url", absoluteImage);
    upsertMeta(
      "property",
      "og:image:type",
      absoluteImage.endsWith(".png") ? "image/png" : "image/jpeg"
    );
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", alt);
    upsertMeta("property", "og:locale", lang === "ar" ? "ar_PS" : "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteImage);
    upsertMeta("name", "twitter:image:alt", alt);

    upsertLink("canonical", pageUrl);
    upsertLink("alternate", enUrl, "en");
    upsertLink("alternate", arUrl, "ar");
    upsertLink("alternate", enUrl, "x-default");

    upsertJsonLd("page-jsonld", jsonLd || null);
  }, [title, description, path, image, imageAlt, jsonLd, lang, t.brand]);

  return null;
};

export default Seo;
