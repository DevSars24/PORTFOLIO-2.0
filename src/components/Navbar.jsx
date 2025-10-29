// src/components/Navbar.jsx (Cleaned & Fixed)
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "AI Companion" },
  ];
  // { to: "/learning-lab", label: "Learning Lab" } // Future Learning Lab nav item

  return (
    <>
      {/* ✨ Floating Gradient Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/70 via-slate-900/70 to-black/70 backdrop-blur-lg border-b border-cyan-400/10 shadow-[0_2px_15px_rgba(0,255,255,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* 🌟 Logo */}
            <Link
              to="/"
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-wide"
            >
              Portfolio
            </Link>

            {/* 💻 Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className={`font-medium tracking-wide transition-all duration-300 ${
                      location.pathname === item.to
                        ? "text-cyan-400 scale-105"
                        : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* 📱 Mobile Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden text-gray-300 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col items-center space-y-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-all duration-300 ${
                    location.pathname === item.to
                      ? "text-cyan-400 scale-105"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md hover:shadow-cyan-400/30 transition-all duration-300 rounded-full"
                asChild
              >
                <a
                  href="https://github.com/DevSars24"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seamless Spacer / Floating Gradient Shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-16 sm:h-20 md:h-24 bg-gradient-to-br from-gray-900 via-slate-900 to-black/50 backdrop-blur-lg border-b border-cyan-400/10 shadow-[0_2px_15px_rgba(0,255,255,0.08)] overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-2 left-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl"
            animate={{ y: [0, -5, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-2 right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
            animate={{ x: [0, 5, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
