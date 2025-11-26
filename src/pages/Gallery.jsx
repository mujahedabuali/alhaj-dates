import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const images = [
  "/gallary1.jpeg",
  "/gallary2.jpeg",
  "/gallary3.jpeg",
  "/gallary4.jpeg",
  "/gallary5.jpeg",
  "/gallary6.jpeg",
  "/gallary7.jpeg",
];

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div className="bg-[#FFF9F0] min-h-screen pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-[#A17D23] mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
        >
          <span className="block" dir="rtl">
            معرض الصور
          </span>
          <span className="text-2xl md:text-3xl font-light text-[#D3B159]">
            Photo Gallery
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          dir="rtl"
        >
          لقطات مختارة من مزارع ومنتجات تمور الحج، لتعيش أجواء التمر عن قرب
          وبجودة عالية.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {images.map((src, index) => (
            <motion.div
              key={src}
              className="relative overflow-hidden rounded-3xl shadow-2xl bg-white"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 90 },
                },
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={src}
                alt={`Al-Haj Gallery ${index + 1}`}
                className="w-full h-[380px] md:h-[430px] lg:h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p
                  className="text-white text-sm md:text-base lg:text-lg p-4 w-full text-right"
                  dir="rtl"
                ></p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery;
