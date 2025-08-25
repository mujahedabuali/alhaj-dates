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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative text-white py-16 pr-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12"
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* الصورة */}
        <motion.div
          className="flex-[1] relative w-full max-w-[616px] h-[409px] hidden md:block"
          variants={imageVariants}
        >
          <motion.img
            src="/tmrImg.png"
            alt="About Al-Haj"
            className="absolute left-[-50px] top-0 w-full h-full object-cover rounded-[24px]"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </motion.div>

        {/* المحتوى النصي */}
        <motion.div
          className="flex-[2] space-y-6 z-10 mt-[70px] text-right"
          variants={containerVariants}
        >
          <motion.h2
            className="text-[24px] font-extrabold uppercase font-inter leading-[1] text-black text-right w-full"
            variants={textVariants}
          >
            من نحن
          </motion.h2>
          <motion.p
            className="text-[16px] font-inter text-black leading-[1.5] text-right font-bold"
            variants={textVariants}
          >
            تمور الورود هي شركة فلسطينية رائدة في زراعة وإنتاج التمور، تتخذ من
            مدينة أريحا – أقدم مدن العالم – موطنًا لمزارعها الخصبة. بخبرة
            متجذّرة في الأرض وعناية دقيقة بكل نخلة، ننتج بكل فخر تمورنا المميزة
            تحت اسم علامتنا الخاصة "تمور الحج"، التي تمثل رمزًا للجودة والبركة،
            وهدية تعبق بروح الأرض المقدسة. نؤمن بأن التمر ليس مجرد ثمرة، بل هو
            إرث وهوية وكرم. لذلك، نحرص في "تمور الورود" على زراعة أجود أنواع
            التمور باستخدام أساليب زراعية مدروسة، ونهتم بعمليات القطاف،
            والتجفيف، والتغليف وفق أعلى معايير الجودة والنظافة.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
