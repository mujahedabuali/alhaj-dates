import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative text-white py-16 pl-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12"
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Text Content */}
        <motion.div
          className="flex-[2] space-y-6 z-10 mt-[70px]"
          variants={containerVariants}
        >
          <motion.h2
            className="text-[24px] font-extrabold uppercase font-inter leading-[1] text-black w-fit"
            variants={itemVariants}
          >
            About us
          </motion.h2>
          <motion.p
            className="text-[16px] font-medium font-inter text-black leading-[1.5]"
            variants={itemVariants}
          >
            Tamour Al-Woroud is a proud Palestinian company specializing in the
            cultivation and production of premium dates. Located in the historic
            city of Jericho – one of the oldest inhabited cities in the world –
            our farms benefit from the region’s fertile soil and unique climate,
            allowing us to grow some of the finest dates in the region. Our
            signature product, "AL HAJ DATES", is more than just a brand — it is
            a symbol of purity, heritage, and hospitality. Carefully cultivated
            and handpicked, our dates are processed and packaged under the
            highest standards of hygiene and quality, ensuring a natural,
            delicious experience in every bite.
          </motion.p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-[1] relative w-full max-w-[616px] h-[409px] hidden md:block"
          variants={imageVariants}
        >
          <motion.img
            src="/gallary3.jpeg"
            alt="About Al-Haj"
            className="absolute right-[-150px] top-0 w-full h-full object-cover rounded-[24px]"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
