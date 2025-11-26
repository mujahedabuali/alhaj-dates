import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <motion.footer
      className="border-t-4 border-[#D3B159] text-white py-8 px-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* English Section */}
        <motion.div className="text-left" custom={0} variants={itemVariants}>
          <h3 className="text-[#A17D23] text-xl font-semibold mb-2">
            Alworood Dates Company, Ltd
          </h3>
          <p className="text-sm text-[#D3B159]">
            1943 N 6th St, Philadelphia, PA 19122, United States
            <br />
            Tel: +1 (215) 416-0563
          </p>
        </motion.div>

        {/* Arabic Section */}
        <motion.div
          className="text-right"
          dir="rtl"
          custom={1}
          variants={itemVariants}
        >
          <h3 className="text-[#A17D23] text-xl font-semibold mb-2">
            شركــة تمور الورود
          </h3>
          <p className="text-[#D3B159]">
            ١٩٤٣ شارع السادس الشمالي، فيلادلفيا، بنسلفانيا ١٩١٢٢، الولايات المتحدة الأمريكية
            <br />
            هاتــف: +1 (215) 416-0563
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
