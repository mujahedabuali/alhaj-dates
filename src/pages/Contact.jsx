import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactItems = [
    {
      icon: <FaMapMarkerAlt className="text-3xl text-[#A17D23]" />,
      title: "العنوان / Address",
      content: (
        <>
          <p dir="rtl" className="mb-1">
            رام الله، الأراضي الفلسطينية، شارع الإرسال
          </p>
          <p dir="rtl">مبنى 18، الطابق الأول</p>
          <p className="mt-2">
            Ramallah, Palestinian Territories, Al-Irsal Street
          </p>
          <p>Building 18, 1st Floor</p>
        </>
      ),
    },
    {
      icon: <FaPhone className="text-3xl text-[#A17D23]" />,
      title: "هاتف / Phone",
      content: "+972 2 2986875",
    },
    {
      icon: <FaClock className="text-3xl text-[#A17D23]" />,
      title: "ساعات العمل / Working Hours",
      content: (
        <>
          <p dir="rtl">الأحد-الخميس: 8 صباحاً - 4 مساءً</p>
          <p>Sunday-Thursday: 8AM - 4PM</p>
        </>
      ),
    },
    {
      icon: <FaEnvelope className="text-3xl text-[#A17D23]" />,
      title: "البريد الإلكتروني / Email",
      content: "info@alworooddates.com",
    },
  ];

  return (
    <div className="bg-[#FFF9F0] min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="max-w-7xl min-w-full mb-20 text-center contact-hero relative flex flex-col items-center justify-center"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#A17D23] mb-4">
          <span className="block">تواصل معنا</span>
          <span className="text-2xl md:text-3xl font-light text-[#D3B159]">
            Contact Us
          </span>
        </h1>
        <p className="text-xl text-white max-w-3xl mx-auto">
          نحن هنا للإجابة على جميع استفساراتك وتلقي ملاحظاتك / We're here to
          answer your questions
        </p>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        className="max-w-7xl mx-auto mb-20 px-16"
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 100 },
                },
              }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-4 text-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#A17D23] mb-4 text-center border-b pb-2">
                {item.title}
              </h3>
              <div className="text-gray-700 text-center">{item.content}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="md:flex">
          <div className="md:w-1/2 bg-[#A17D23] p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              أرسل لنا رسالة / Send us a message
            </h2>
            <p className="mb-6">
              سنكون سعداء بالرد على استفساراتك في أقرب وقت ممكن / We'll be happy
              to reply as soon as possible
            </p>
            <div className="space-y-4">
              <div className="flex justify-center items-center">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <div className="text-center">
                  <p dir="rtl">رام الله، الأراضي الفلسطينية، شارع الإرسال</p>
                  <p dir="rtl">مبنى 18، الطابق الأول</p>
                  <p className="mt-2">Ramallah, Palestinian Territories</p>
                  <p>Al-Irsal Street, Building 18, 1st Floor</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <FaPhone className="mr-3 flex-shrink-0 " />
                <span className="">+972 2 2986875</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  الاسم / Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3B159]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  البريد الإلكتروني / Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3B159]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  الرسالة / Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3B159]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#A17D23] hover:bg-[#D3B159] text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                إرسال الرسالة / Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        className="max-w-7xl mx-auto mt-20 rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="p-4 bg-[#A17D23] text-white">
          <h3 className="text-xl font-bold text-center">
            موقعنا على الخريطة / Our Location on Map
          </h3>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.104722284006!2d35.2007223155992!3d31.8965639812467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDUzJzQ3LjYiTiAzNcKwMTInMDguOSJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Alworood Dates Location"
        ></iframe>
      </motion.section>
    </div>
  );
};

export default Contact;
