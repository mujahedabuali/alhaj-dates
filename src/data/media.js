const galleryFiles = [
  "still-01.jpg",
  "still-02.jpg",
  "still-03.jpg",
  "still-04.jpg",
  "still-05.jpg",
  "still-06.jpg",
  "still-07.jpg",
  "still-08.jpg",
  "still-09.jpg",
  "still-10.jpg",
  "still-11.jpg",
  "still-12.jpg",
  "still-13.jpg",
  "still-14.jpg",
  "still-15.jpg",
  "still-16.jpg",
  "still-17.jpg",
  "still-18.jpg",
  "still-19.jpg",
  "still-20.jpg",
  "still-21.jpg",
  "gallary1.jpeg",
  "gallary2.jpeg",
  "gallary3.jpeg",
  "gallary4.jpeg",
  "gallary5.jpeg",
  "gallary6.jpeg",
  "gallary7.jpeg",
];

export const galleryPath = (filename) => `/gallary/${filename}`;

export const galleryImages = galleryFiles.map((file, index) => ({
  id: `g-${index}`,
  file,
  src: galleryPath(file),
  type: "image",
  poster: galleryPath(file),
}));

export const videos = {
  /** Full quality source (gallery lightbox only — do not autoplay on mobile) */
  heroFull: "/videos/IMG_5418.MOV",
  /** Compressed hero for autoplay (~0.8MB) */
  hero: "/videos/hero-mobile.mp4",
  farm: "/videos/video1.mp4",
  farmMobile: "/videos/video1-mobile.mp4",
  about: "/videos/video2.mp4",
  aboutMobile: "/videos/video2-mobile.mp4",
};

/** Videos shown inside the gallery page (with image posters). */
export const galleryVideos = [
  {
    id: "v-hero",
    type: "video",
    src: videos.hero,
    srcFull: videos.heroFull,
    poster: galleryPath("gallary1.jpeg"),
    mime: ["video/mp4"],
  },
  {
    id: "v-farm",
    type: "video",
    src: videos.farmMobile,
    srcFull: videos.farm,
    poster: galleryPath("gallary3.jpeg"),
    mime: ["video/mp4"],
  },
  {
    id: "v-about",
    type: "video",
    src: videos.aboutMobile,
    srcFull: videos.about,
    poster: galleryPath("gallary5.jpeg"),
    mime: ["video/mp4"],
  },
];

/** Full gallery media: videos first, then all photos. */
export const galleryItems = [...galleryVideos, ...galleryImages];

/** Shuffle array copy (Fisher–Yates). */
export const shuffle = (items) => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Build home hero slides.
 * Mobile/lite: fewer images + compressed hero mp4 (never the 51MB MOV).
 */
export const buildHeroSlides = ({ imageCount = 6, preferLite = false } = {}) => {
  const count = preferLite ? Math.min(4, imageCount) : imageCount;
  const picks = shuffle(galleryImages).slice(0, count);
  const imageSlides = picks.map((img) => ({
    id: img.id,
    type: "image",
    src: img.src,
  }));

  // On very constrained devices, images-only is smoothest
  if (preferLite && typeof navigator !== "undefined") {
    const conn = navigator.connection;
    if (conn?.saveData || ["slow-2g", "2g"].includes(conn?.effectiveType || "")) {
      return imageSlides;
    }
  }

  return [
    {
      id: "hero-video",
      type: "video",
      src: videos.hero,
      poster: picks[0]?.src || galleryPath("gallary1.jpeg"),
    },
    ...imageSlides,
  ];
};
