import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale } from "../../i18n/LocaleContext";
import LocaleLink from "../LocaleLink";

const Cta = () => {
  const { t } = useLocale();
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <section className="relative overflow-hidden" aria-labelledby="cta-heading" ref={ref}>
      <img
        src="/alhaj-background.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/70" />
      <motion.div
        className="relative z-10 px-4 py-16 text-center sm:px-5 sm:py-20 md:py-24"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <h2
          id="cta-heading"
          className="text-2xl font-semibold text-cream sm:text-3xl md:text-4xl lg:text-5xl"
        >
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-cream/85 sm:text-base">
          {t.cta.subtitle}
        </p>
        <LocaleLink to="/contact" className="btn-primary mt-7 sm:mt-8">
          {t.cta.button}
        </LocaleLink>
      </motion.div>
    </section>
  );
};

export default Cta;
