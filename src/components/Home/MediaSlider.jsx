import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildHeroSlides } from "../../data/media";

const IMAGE_DURATION_MS = 5500;

const MediaSlider = () => {
  const slides = useMemo(() => buildHeroSlides(6), []);
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const current = slides[index];
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (current.type === "image") {
      timerRef.current = setTimeout(goNext, IMAGE_DURATION_MS);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const video = videoRef.current;
    if (!video) return undefined;

    const onEnded = () => goNext();
    const onLoaded = () => {
      video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay blocked — advance after a short wait
        timerRef.current = setTimeout(goNext, IMAGE_DURATION_MS);
      });
    };

    video.addEventListener("ended", onEnded);
    // Cap long MOV so the slider keeps moving
    const maxVideoMs = 14000;
    timerRef.current = setTimeout(goNext, maxVideoMs);

    if (video.readyState >= 2) onLoaded();
    else video.addEventListener("loadeddata", onLoaded, { once: true });

    return () => {
      video.removeEventListener("ended", onEnded);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, current.type, current.src, slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {current.type === "video" ? (
            <video
              ref={videoRef}
              key={current.src}
              className="h-full w-full object-cover"
              muted
              playsInline
              autoPlay
              preload="auto"
              poster={slides.find((s) => s.type === "image")?.src}
            >
              <source src={current.src} type="video/mp4" />
              <source src={current.src} type="video/quicktime" />
            </video>
          ) : (
            <motion.img
              src={current.src}
              alt=""
              className="h-full w-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: IMAGE_DURATION_MS / 1000, ease: "linear" }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center gap-1.5 sm:bottom-7">
        {slides.map((slide, i) => (
          <span
            key={slide.id}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-primary-light" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaSlider;
