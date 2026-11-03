import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo";
import { useLocale } from "../i18n/LocaleContext";
import { absoluteUrl, company } from "../data/company";
import { galleryImages, galleryItems, galleryVideos, videos } from "../data/media";

const swipeConfidence = 9000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const PlayBadge = ({ label }) => (
  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-cream shadow-lg ring-2 ring-cream/35 sm:h-14 sm:w-14">
      <svg viewBox="0 0 24 24" className="ms-0.5 h-5 w-5 fill-current" aria-hidden>
        <path d="M8 5.14v13.72L19 12 8 5.14z" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  </span>
);

const Gallery = () => {
  const { t, isAr } = useLocale();
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef(null);
  const thumbsRef = useRef(null);

  const items = useMemo(() => {
    if (filter === "photos") return galleryImages;
    if (filter === "videos") return galleryVideos;
    return galleryItems;
  }, [filter]);

  const galleryJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: t.gallery.title,
      description: t.gallery.seoDescription,
      url: absoluteUrl(isAr ? "/ar/gallery" : "/gallery"),
      isPartOf: {
        "@type": "WebSite",
        name: company.brand,
        url: company.siteUrl,
      },
      image: galleryImages.slice(0, 12).map((img) => absoluteUrl(img.src)),
    }),
    [t.gallery.title, t.gallery.seoDescription, isAr]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setActive(null);
  }, [filter]);

  const close = () => setActive(null);

  const showAt = useCallback((next, dir) => {
    setDirection(dir);
    setActive(next);
  }, []);

  const showPrev = useCallback(() => {
    if (active === null || !items.length) return;
    showAt((active - 1 + items.length) % items.length, -1);
  }, [active, items.length, showAt]);

  const showNext = useCallback(() => {
    if (active === null || !items.length) return;
    showAt((active + 1) % items.length, 1);
  }, [active, items.length, showAt]);

  useEffect(() => {
    if (active === null) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") (isAr ? showNext : showPrev)();
      if (e.key === "ArrowRight") (isAr ? showPrev : showNext)();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, isAr, showNext, showPrev]);

  useEffect(() => {
    if (active === null || !thumbsRef.current) return;
    const el = thumbsRef.current.querySelector(`[data-thumb="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const item = items[active];
    if (item?.type !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [active, items]);

  const filters = [
    { id: "all", label: t.gallery.filterAll, count: galleryItems.length },
    { id: "photos", label: t.gallery.filterPhotos, count: galleryImages.length },
    { id: "videos", label: t.gallery.filterVideos, count: galleryVideos.length },
  ];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 70 : -70, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir < 0 ? 70 : -70, opacity: 0, scale: 0.97 }),
  };

  const current = active !== null ? items[active] : null;

  return (
    <div className="page-shell bg-cream-soft">
      <Seo
        title={t.gallery.seoTitle}
        description={t.gallery.seoDescription}
        path="/gallery"
        image="/gallary/gallary1.jpeg"
        imageAlt={t.gallery.title}
        jsonLd={galleryJsonLd}
      />

      <section className="relative h-[38svh] min-h-[240px] overflow-hidden sm:h-[44svh] sm:min-h-[300px] md:h-[48svh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={galleryVideos[0].poster}
        >
          <source src={videos.farm} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.72)_100%)]" />
        <div className="relative z-10 flex h-full items-end">
          <div className="container-narrow w-full px-4 pb-8 sm:px-5 sm:pb-10 md:px-6">
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary-light uppercase">
              {t.gallery.eyebrow}
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              {t.gallery.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
              {t.gallery.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container-narrow sticky top-16 z-30 -mt-5 px-4 sm:top-20 sm:px-5 md:px-6">
        <div className="flex flex-wrap gap-2 bg-cream/95 p-2 shadow-[0_10px_30px_rgba(161,125,35,0.12)] backdrop-blur-md">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`min-h-10 flex-1 px-3 text-sm font-semibold transition sm:flex-none sm:px-5 ${
                filter === f.id
                  ? "bg-primary text-cream"
                  : "bg-transparent text-ink hover:bg-primary/10"
              }`}
            >
              {f.label}
              <span className="ms-1.5 opacity-70">({f.count})</span>
            </button>
          ))}
        </div>
      </div>

      {filter === "all" && (
        <section className="container-narrow mt-8 px-4 sm:mt-10 sm:px-5 md:px-6">
          <h2 className="mb-4 text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            {t.gallery.featured}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {galleryVideos.map((video) => {
              const idx = galleryItems.findIndex((i) => i.id === video.id);
              return (
                <button
                  key={video.id}
                  type="button"
                  className="group relative aspect-video overflow-hidden bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => {
                    if (idx >= 0) showAt(idx, 0);
                  }}
                >
                  <img
                    src={video.poster}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <PlayBadge label={t.gallery.play} />
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section
        className="container-narrow mt-8 px-4 pb-16 sm:mt-10 sm:px-5 sm:pb-20 md:px-6"
        aria-label={t.gallery.eyebrow}
      >
        <p className="mb-4 text-sm text-muted">
          {items.length} {filter === "videos" ? t.gallery.filterVideos : filter === "photos" ? t.gallery.filterPhotos : t.gallery.filterAll}
        </p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:gap-4">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`group relative overflow-hidden bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                item.type === "video" ? "col-span-2 aspect-video sm:col-span-1 sm:aspect-square md:col-span-1" : "aspect-square"
              }`}
              onClick={() => showAt(index, 0)}
            >
              <img
                src={item.type === "video" ? item.poster : item.src}
                alt={`${t.brand} ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading={index < 8 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
              {item.type === "video" && <PlayBadge label={t.gallery.play} />}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active !== null && current && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${t.brand} ${active + 1}`}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <p className="text-sm text-cream/75">
                {active + 1} {t.gallery.of} {items.length}
                {current.type === "video" ? ` · ${t.gallery.filterVideos}` : ""}
              </p>
              <button
                type="button"
                className="min-h-10 bg-white/10 px-4 text-sm font-medium text-cream hover:bg-white/20"
                onClick={close}
              >
                {t.gallery.close}
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-10 sm:px-16">
              <button
                type="button"
                className="absolute inset-y-0 inset-inline-start-0 z-20 flex w-10 items-center justify-center text-cream/75 hover:text-white sm:w-14"
                onClick={showPrev}
                aria-label={t.gallery.prev}
              >
                <span className="text-4xl leading-none">{isAr ? "›" : "‹"}</span>
              </button>
              <button
                type="button"
                className="absolute inset-y-0 inset-inline-end-0 z-20 flex w-10 items-center justify-center text-cream/75 hover:text-white sm:w-14"
                onClick={showNext}
                aria-label={t.gallery.next}
              >
                <span className="text-4xl leading-none">{isAr ? "‹" : "›"}</span>
              </button>

              <div className="relative flex h-full max-h-[70vh] w-full max-w-5xl items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  {current.type === "video" ? (
                    <motion.div
                      key={current.id}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <video
                        ref={videoRef}
                        key={current.src}
                        className="max-h-[70vh] max-w-full bg-black object-contain"
                        controls
                        playsInline
                        poster={current.poster}
                        autoPlay
                      >
                        {(current.mime || ["video/mp4"]).map((type) => (
                          <source key={type} src={current.src} type={type} />
                        ))}
                      </video>
                    </motion.div>
                  ) : (
                    <motion.img
                      key={current.id}
                      src={current.src}
                      alt={`${t.brand} ${active + 1}`}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.8}
                      onDragEnd={(_, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidence) showNext();
                        else if (swipe > swipeConfidence) showPrev();
                      }}
                      className="max-h-[70vh] max-w-full cursor-grab object-contain active:cursor-grabbing"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div
              ref={thumbsRef}
              className="flex gap-2 overflow-x-auto px-4 py-4 sm:px-6"
              style={{ scrollbarWidth: "thin" }}
            >
              {items.map((item, index) => (
                <button
                  key={`thumb-${item.id}`}
                  type="button"
                  data-thumb={index}
                  onClick={() => showAt(index, index > active ? 1 : -1)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden sm:h-16 sm:w-24 ${
                    index === active ? "ring-2 ring-primary-light" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.type === "video" ? item.poster : item.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {item.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-cream">
                        <path d="M8 5.14v13.72L19 12 8 5.14z" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
