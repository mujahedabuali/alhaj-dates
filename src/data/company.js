const siteUrl = (
  import.meta.env.VITE_SITE_URL || "https://www.alhaj-dates.com"
).replace(/\/$/, "");

export const company = {
  brand: "Al-Haj Dates",
  brandAr: "تمور الحاج",
  companyName: "Al-Haj Dates Company, Ltd",
  companyNameAr: "شركة تمور الحاج",
  phone: "+1 215-416-0563",
  phoneHref: "tel:+12154160563",
  email: "abualharth@me.com",
  emailHref: "mailto:abualharth@me.com",
  address: "1900 N 5th St, Philadelphia, PA 19122, United States",
  addressAr:
    "١٩٠٠ شارع الخامس الشمالي، فيلادلفيا، بنسلفانيا ١٩١٢٢، الولايات المتحدة الأمريكية",
  hours: "Sunday–Thursday: 8AM – 4PM",
  hoursAr: "الأحد–الخميس: ٨ صباحاً – ٤ مساءً",
  mapEmbed:
    "https://www.google.com/maps?q=1900+N+5th+St,+Philadelphia,+PA+19122,+United+States&output=embed",
  siteUrl,
  logoUrl: `${siteUrl}/og-logo.png`,
  shareImage: `${siteUrl}/og-cover.jpg`,
  logoPath: "/og-logo.png",
  shareImagePath: "/og-cover.jpg",
};

export const navItems = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
];

export const absoluteUrl = (path = "/") => {
  if (!path) return company.siteUrl;
  if (path.startsWith("http")) return path;
  return `${company.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
