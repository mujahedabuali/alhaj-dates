import { useEffect, useRef, useState } from "react";
import { useMediaPerf } from "../hooks/useMediaPerf";

/**
 * Lazy, mobile-aware background video.
 * - Compressed mobile source on phones / Save-Data
 * - Plays only when in view
 * - Poster-first; skips video when reduced-motion
 */
const BackgroundVideo = ({ src, mobileSrc, poster, className = "" }) => {
  const { preferLite, reduceMotion } = useMediaPerf();
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const activeSrc = preferLite && mobileSrc ? mobileSrc : src;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.4], rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const t = setTimeout(() => setShouldLoad(true), preferLite ? 150 : 0);
    return () => clearTimeout(t);
  }, [inView, reduceMotion, preferLite]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, shouldLoad, activeSrc]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      {shouldLoad && !reduceMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          loop
          preload="metadata"
          poster={poster}
          src={activeSrc}
        />
      )}
    </div>
  );
};

export default BackgroundVideo;
