import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FlowerImg = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.div
      className="flex justify-center items-center py-16"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            }
          : {}
      }
    >
      <motion.img
        src="/goldenFlower.png"
        alt="Golden Flower Decoration"
        className=""
        whileHover={{
          rotate: [0, -5, 5, -5, 0],
          scale: 1.05,
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
        animate={
          inView
            ? {
                rotate: [0, 2, -2, 0],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }
            : {}
        }
      />
    </motion.div>
  );
};

export default FlowerImg;
