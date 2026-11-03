import { useEffect, useState } from "react";

const readPerf = () => {
  if (typeof window === "undefined") {
    return { isMobile: false, preferLite: false, reduceMotion: false };
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile =
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(conn?.saveData);
  const slowNet = ["slow-2g", "2g", "3g"].includes(conn?.effectiveType || "");

  return {
    isMobile,
    preferLite: isMobile || saveData || slowNet || reduceMotion,
    reduceMotion,
  };
};

/** Detect mobile / Save-Data / slow network for lighter video delivery. */
export const useMediaPerf = () => {
  const [perf, setPerf] = useState(readPerf);

  useEffect(() => {
    const update = () => setPerf(readPerf());
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    mqMobile.addEventListener?.("change", update);
    mqMotion.addEventListener?.("change", update);
    navigator.connection?.addEventListener?.("change", update);
    window.addEventListener("resize", update);

    update();
    return () => {
      mqMobile.removeEventListener?.("change", update);
      mqMotion.removeEventListener?.("change", update);
      navigator.connection?.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return perf;
};
