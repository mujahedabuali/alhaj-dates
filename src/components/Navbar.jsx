import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`${
        atTop ? "absolute" : "sticky"
      } top-0 left-0 w-full z-50 backdrop-blur-xs transition-all duration-500 ${
        atTop
          ? ""
          : "bg-gradient-to-r from-[#A17D23] via-[#D3B159] to-[#F8F4E8] shadow-xl bg-opacity-90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center group">
            <motion.h1
              className="text-2xl font-bold text-[#2C2C2C] group-hover:text-white transition-colors duration-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Al-haj
              <motion.span
                className="text-[#D3B159] ml-1 group-hover:text-[#A17D23] transition-colors duration-500"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                .
              </motion.span>
            </motion.h1>
          </Link>

          {/* Nav Links with enhanced animations */}
          <nav className="flex items-center space-x-1 sm:space-x-4 md:space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`relative px-3 py-2 text-sm md:text-base font-medium ${
                    location.pathname === link.path
                      ? "text-[#999999] font-semibold"
                      : "text-[#c5c5c5] hover:text-[#999999]"
                  } transition-colors duration-300 group`}
                >
                  {link.name}
                  {location.pathname === link.path ? (
                    <motion.span
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-white"
                      layoutId="underline"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                    />
                  ) : (
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
