import { motion } from "framer-motion";
import { useLocale } from "../../i18n/LocaleContext";
import LocaleLink from "../LocaleLink";
import MediaSlider from "./MediaSlider";

const Hero = () => {
  const { t } = useLocale();

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden sm:min-h-[640px]"
      aria-label="Hero"
    >
      <MediaSlider />

      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_40%,rgba(0,0,0,0.78)_100%)]" />

      <div className="relative z-20 flex h-full items-end pb-14 sm:pb-16 md:items-center md:pb-0">
        <div className="container-narrow w-full px-4 sm:px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl bg-black/35 p-5 backdrop-blur-[2px] sm:p-6 md:bg-transparent md:p-0 md:backdrop-blur-0"
          >
            <p className="text-xs font-semibold tracking-[0.22em] text-primary-light uppercase sm:text-sm">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl leading-[1.12] font-semibold text-white drop-shadow-md sm:text-4xl md:mt-5 md:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/95 sm:mt-4 sm:text-base md:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <LocaleLink to="/gallery" className="btn-primary w-full sm:w-auto">
                {t.hero.ctaGallery}
              </LocaleLink>
              <LocaleLink to="/contact" className="btn-ghost w-full bg-black/25 sm:w-auto">
                {t.hero.ctaContact}
              </LocaleLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
