import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildHeroSlides } from "../../data/media";
import { useMediaPerf } from "../../hooks/useMediaPerf";

const IMAGE_DURATION_MS = 5000;
const VIDEO_MAX_MS = 12000;

const MediaSlider = () => {
  const { preferLite, reduceMotion } = useMediaPerf();
  const slides = useMemo(
    () => buildHeroSlides({ imageCount: preferLite ? 4 : 6, preferLite }),
    [preferLite]
  );
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const current = slides[index] || slides[0];
  const goNext = () => setIndex((i) => (i + 1) % Math.max(slides.length, 1));

  // Delay first video load slightly so first paint stays fast
  useEffect(() => {
    const t = setTimeout(() => setReady(true), preferLite ? 120 : 0);
    return () => clearTimeout(t);
  }, [preferLite]);

  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!current || !ready) return undefined;

    if (reduceMotion || current.type === "image") {
      timerRef.current = setTimeout(goNext, IMAGE_DURATION_MS);
      return () => clearTimeout(timerRef.current);
    }

    const video = videoRef.current;
    if (!video) {
      timerRef.current = setTimeout(goNext, IMAGE_DURATION_MS);
      return () => clearTimeout(timerRef.current);
    }

    const onEnded = () => goNext();
    const play = () => {
      video.play().catch(() => {
        timerRef.current = setTimeout(goNext, IMAGE_DURATION_MS);
      });
    };

    video.addEventListener("ended", onEnded);
    timerRef.current = setTimeout(goNext, VIDEO_MAX_MS);

    if (video.readyState >= 2) play();
    else {
      const onMeta = () => play();
      video.addEventListener("loadeddata", onMeta, { once: true });
      // Force load metadata quickly
      video.load();
    }

    return () => {
      video.removeEventListener("ended", onEnded);
      video.pause();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, current, ready, reduceMotion, slides.length]);

  if (!current) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      {/* Instant poster so hero isn't blank while video buffers */}
      <img
        src={current.type === "image" ? current.src : current.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: preferLite ? 0.45 : 0.8, ease: "easeOut" }}
        >
          {current.type === "video" && ready && !reduceMotion ? (
            <video
              ref={videoRef}
              key={current.src}
              className="h-full w-full object-cover"
              muted
              playsInline
              preload="metadata"
              poster={current.poster}
              src={current.src}
            />
          ) : (
            <motion.img
              src={current.src || current.poster}
              alt=""
              className="h-full w-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: preferLite ? 1.03 : 1.06 }}
              transition={{
                duration: IMAGE_DURATION_MS / 1000,
                ease: "linear",
              }}
              loading="eager"
              decoding="async"
            />
          )}
        </motion.div>
      </AnimatePresence>

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
