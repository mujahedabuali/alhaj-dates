import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale } from "../../i18n/LocaleContext";

const Story = () => {
  const { t, isAr } = useLocale();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="section-pad overflow-hidden bg-cream-soft" aria-labelledby="story-heading">
      <div
        className="container-narrow grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className={isAr ? "md:order-2" : ""}
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {t.story.eyebrow}
          </p>
          <h2 id="story-heading" className="text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
            {t.story.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
            {t.story.p1}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
            {t.story.p2}
          </p>
        </motion.div>

        <motion.div
          className={`relative ${isAr ? "md:order-1" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <img
            src="/gallary/gallary3.jpeg"
            alt={t.story.imageAlt}
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] md:aspect-[4/5]"
            loading="lazy"
          />
          <div className="absolute -bottom-4 inset-inline-start-0 max-w-[200px] bg-primary p-4 text-cream sm:-bottom-5 sm:max-w-[220px] sm:p-5">
            <p className="text-xl text-primary-light sm:text-2xl">{t.story.badgeTitle}</p>
            <p className="mt-1 text-xs text-cream/85 sm:text-sm">{t.story.badgeText}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
