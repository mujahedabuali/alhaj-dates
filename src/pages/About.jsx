import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Seo from "../components/Seo";
import LocaleLink from "../components/LocaleLink";
import { useLocale } from "../i18n/LocaleContext";

const About = () => {
  const { t, isAr } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="page-shell bg-cream-soft">
      <Seo
        title={t.about.seoTitle}
        description={t.about.seoDescription}
        path="/about"
      />

      <section className="relative h-[58svh] min-h-[380px] overflow-hidden sm:h-[65svh] sm:min-h-[440px] md:h-[70svh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/aboutImg.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/video2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.4)_45%,rgba(0,0,0,0.72)_100%)]" />
        <div className="relative z-10 flex h-full items-end">
          <div className="container-narrow w-full px-4 pb-10 sm:px-5 sm:pb-12 md:px-6 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary-light uppercase sm:mb-3">
                {t.about.eyebrow}
              </p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {t.about.heroTitle}
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/90 sm:mt-4 sm:text-base md:text-lg">
                {t.about.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-pad" ref={ref}>
        <div className="container-narrow grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={isAr ? "md:order-2" : ""}
          >
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
              {t.about.heritageTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
              {t.about.heritageP1}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              {t.about.heritageP2}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className={isAr ? "md:order-1" : ""}
          >
            <img
              src="/aboutImg.png"
              alt={t.about.heritageImageAlt}
              className="aspect-[5/4] w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-cream section-pad">
        <div className="container-narrow">
          <img
            src="/tmrImg.png"
            alt={t.about.processImageAlt}
            className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
            loading="lazy"
          />
        </div>
      </section>

      <section className="surface-primary section-pad" aria-labelledby="values-heading">
        <div className="container-narrow">
          <h2
            id="values-heading"
            className="mb-8 text-center text-2xl font-semibold text-cream sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl"
          >
            {t.about.valuesTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-10">
            {t.about.values.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t border-primary-light/40 pt-5 text-center sm:pt-6"
              >
                <h3 className="text-lg text-primary-light sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/85 sm:mt-3">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad text-center">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
          {t.about.ctaTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:mt-4 sm:text-base">
          {t.about.ctaText}
        </p>
        <LocaleLink
          to="/contact"
          className="btn-primary mt-6 bg-primary text-cream hover:bg-primary-light hover:text-ink sm:mt-8"
        >
          {t.about.ctaButton}
        </LocaleLink>
      </section>
    </div>
  );
};

export default About;
