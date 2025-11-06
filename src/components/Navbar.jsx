// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setOpen(!open);

  // ✅ Detect scroll for dynamic background / shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Framer Motion variants
  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", duration: 1 } },
  };

  const linkHover =
    "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 via-orange-400 to-yellow-400 transition-all duration-300";

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 border-b border-purple-500/10 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0B1220]/80 shadow-[0_2px_20px_rgba(80,0,255,0.15)] scale-[0.98]"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      {/* Brand / Logo */}
      <motion.h1
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text tracking-wider cursor-pointer"
      >
        Saurabh.dev
      </motion.h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-sm tracking-wide">
        {["home", "about", "projects", "contact"].map((link) => (
          <motion.li key={link} whileHover={{ scale: 1.05 }}>
            <a
              href={`#${link}`}
              className={`text-slate-300 ${linkHover}`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleMenu}
        className="md:hidden text-slate-300 hover:text-purple-400 focus:outline-none transition-colors duration-300"
        aria-label="Toggle menu"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-[#0B1220]/95 backdrop-blur-lg border-t border-purple-500/20 md:hidden shadow-lg"
          >
            <ul className="flex flex-col items-center gap-4 py-6 text-sm">
              {["home", "about", "projects", "contact"].map((link) => (
                <motion.li key={link} whileHover={{ scale: 1.05 }}>
                  <a
                    onClick={() => setOpen(false)}
                    href={`#${link}`}
                    className={`text-slate-300 ${linkHover}`}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
