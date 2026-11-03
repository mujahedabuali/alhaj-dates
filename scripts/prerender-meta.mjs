/**
 * Write static HTML shells for key routes so WhatsApp/Facebook/Telegram
 * crawlers (no JS) get correct absolute Open Graph tags per page.
 * The SPA JS still boots from the same bundle.
 */
import fs from "node:fs";
import path from "node:path";

const siteUrl = (process.env.VITE_SITE_URL || "https://www.alhaj-dates.com").replace(
  /\/$/,
  ""
);
const dist = path.resolve("dist");
const templatePath = path.join(dist, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html missing — run vite build first");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");

const pages = [
  {
    out: "index.html",
    url: "/",
    title: "Al-Haj Dates | Premium Dates from Jericho",
    description:
      "Al-Haj Dates — premium Palestinian dates cultivated in Jericho.",
    image: "/og-cover.jpg",
    imageType: "image/jpeg",
    imageW: "1200",
    imageH: "630",
    locale: "en_US",
  },
  {
    out: "ar/index.html",
    url: "/ar",
    title: "تمور الحاج | تمور فاخرة من أريحا",
    description:
      "تمور الحاج — تمور فلسطينية فاخرة من أريحا. جودة وتراث للمنزل والضيافة.",
    image: "/og-cover.jpg",
    imageType: "image/jpeg",
    imageW: "1200",
    imageH: "630",
    locale: "ar_PS",
    lang: "ar",
    dir: "rtl",
  },
  {
    out: "gallery/index.html",
    url: "/gallery",
    title: "Gallery | Al-Haj Dates",
    description:
      "Photos and videos of Al-Haj Dates — Jericho farms, harvest, and premium packaging.",
    image: "/gallary/gallary1.jpeg",
    imageType: "image/jpeg",
    imageW: "1200",
    imageH: "1600",
    locale: "en_US",
  },
  {
    out: "ar/gallery/index.html",
    url: "/ar/gallery",
    title: "المعرض | تمور الحاج",
    description:
      "صور وفيديوهات تمور الحاج — مزارع أريحا والحصاد والتعبئة الفاخرة.",
    image: "/gallary/gallary1.jpeg",
    imageType: "image/jpeg",
    imageW: "1200",
    imageH: "1600",
    locale: "ar_PS",
    lang: "ar",
    dir: "rtl",
  },
  {
    out: "about/index.html",
    url: "/about",
    title: "About | Al-Haj Dates",
    description:
      "Learn about Al-Haj Dates — Palestinian dates from Jericho.",
    image: "/og-cover.jpg",
    imageType: "image/jpeg",
    imageW: "1200",
    imageH: "630",
    locale: "en_US",
  },
  {
    out: "ar/about/index.html",
    url: "/ar/about",
    title: "من نحن | تمور الحاج",
    description:
      "تعرّف على شركة تمور الحاج — تمور فلسطينية من أريحا.",
    image: "/og-cover.jpg",
    imageType: "image/jpeg",
    imageW: "1200",
    imageH: "630",
    locale: "ar_PS",
    lang: "ar",
    dir: "rtl",
  },
  {
    out: "contact/index.html",
    url: "/contact",
    title: "Contact | Al-Haj Dates",
    description:
      "Contact Al-Haj Dates in Philadelphia for wholesale and retail.",
    image: "/og-logo.png",
    imageType: "image/png",
    imageW: "512",
    imageH: "512",
    locale: "en_US",
  },
  {
    out: "ar/contact/index.html",
    url: "/ar/contact",
    title: "تواصل | تمور الحاج",
    description:
      "تواصل مع تمور الحاج في فيلادلفيا — هاتف وبريد وخريطة.",
    image: "/og-logo.png",
    imageType: "image/png",
    imageW: "512",
    imageH: "512",
    locale: "ar_PS",
    lang: "ar",
    dir: "rtl",
  },
];

const replaceMeta = (html, propertyOrName, attr, value) => {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${propertyOrName}["'][^>]*>`,
    "i"
  );
  const tag = `<meta ${attr}="${propertyOrName}" content="${value}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
};

const writePage = (page) => {
  const pageUrl = `${siteUrl}${page.url === "/" ? "/" : page.url}`;
  const imageUrl = `${siteUrl}${page.image}`;

  let html = template;
  if (page.lang) {
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.lang}"`);
  }
  if (page.dir) {
    html = html.replace(/<html([^>]*)>/, `<html$1 dir="${page.dir}">`);
  }

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`);

  html = replaceMeta(html, "description", "name", page.description);
  html = replaceMeta(html, "og:title", "property", page.title);
  html = replaceMeta(html, "og:description", "property", page.description);
  html = replaceMeta(html, "og:url", "property", pageUrl);
  html = replaceMeta(html, "og:locale", "property", page.locale);
  html = replaceMeta(html, "twitter:title", "name", page.title);
  html = replaceMeta(html, "twitter:description", "name", page.description);
  html = replaceMeta(html, "twitter:image", "name", imageUrl);

  // Replace first og:image (cover) with page image; keep logo as secondary if present
  html = html.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${imageUrl}" />`
  );
  html = html.replace(
    /<meta property="og:image:secure_url" content="[^"]*" \/>/,
    `<meta property="og:image:secure_url" content="${imageUrl}" />`
  );
  html = html.replace(
    /<meta property="og:image:type" content="[^"]*" \/>/,
    `<meta property="og:image:type" content="${page.imageType}" />`
  );
  html = html.replace(
    /<meta property="og:image:width" content="[^"]*" \/>/,
    `<meta property="og:image:width" content="${page.imageW}" />`
  );
  html = html.replace(
    /<meta property="og:image:height" content="[^"]*" \/>/,
    `<meta property="og:image:height" content="${page.imageH}" />`
  );

  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${pageUrl}" />`
  );

  const outPath = path.join(dist, page.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log("prerender meta:", page.out);
};

for (const page of pages) writePage(page);
console.log(`Open Graph shells ready for ${siteUrl}`);
