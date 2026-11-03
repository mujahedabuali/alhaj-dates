import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale } from "../../i18n/LocaleContext";

const Highlights = () => {
  const { t } = useLocale();
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section className="surface-primary section-pad" aria-labelledby="highlights-heading">
      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-8 max-w-2xl sm:mb-10 md:mb-12"
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary-light uppercase">
            {t.highlights.eyebrow}
          </p>
          <h2
            id="highlights-heading"
            className="text-2xl font-semibold text-cream sm:text-3xl md:text-4xl"
          >
            {t.highlights.title}
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8">
          {t.highlights.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="border-t border-primary-light/50 pt-5 sm:pt-6"
            >
              <h3 className="text-lg text-primary-light sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/85 sm:mt-3 sm:text-base">
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
