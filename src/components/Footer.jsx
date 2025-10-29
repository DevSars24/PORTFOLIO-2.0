import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

// --- Internal Badge component (avoids external import/build issues) ---
const Badge = ({ children, className }) => (
  <span className={`px-2 py-1 rounded-md bg-slate-700/50 text-slate-300 text-xs lg:text-sm ${className || ""}`}>
    {children}
  </span>
);

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  // Typing animation for name
  const typingVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.03, duration: 0.2, ease: "easeOut" },
    }),
  };
  const cursorVariants = {
    blink: {
      opacity: [1, 0, 1],
      transition: { duration: 0.5, repeat: Infinity, ease: "linear" },
    },
  };

  const name = "Saurabh Singh Rajput";

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-8 sm:py-12 lg:px-8 bg-gradient-to-t from-slate-900 via-slate-800 to-black backdrop-blur-xl border-t border-cyan-400/30 shadow-xl overflow-hidden"
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Animated background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-cyan-500/5 via-cyan-400/5 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-l from-purple-500/5 via-purple-400/5 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Brand & Copyright */}
          <motion.div
            variants={childVariants}
            className="text-center sm:text-left"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold mb-2 bg-gradient-to-r from-slate-200 via-cyan-300 to-purple-300 bg-clip-text text-transparent leading-tight text-shadow-sm">
              {name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={typingVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                variants={cursorVariants}
                animate="blink"
                className="inline-block w-1 h-5 sm:h-6 bg-cyan-400 ml-1"
                aria-hidden="true"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Passionate Full Stack Developer & AI Enthusiast. Building innovative solutions with code and curiosity.
            </p>
            <p className="text-xs text-slate-500 mt-3 sm:mt-4">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            variants={childVariants}
            className="text-center sm:text-left"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-200">Core Skills</h4>
            <div className="space-y-2">
              {[
                { label: "Full Stack (MERN)" },
                { label: "Generative AI" },
                { label: "System Design" },
                { label: "DevOps & Backend" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <Badge
                    className="bg-slate-800/20 border-cyan-400/30 text-slate-300 hover:bg-cyan-500/30 transition-all duration-300"
                  >
                    {skill.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={childVariants}
            className="text-center sm:text-right"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-200">Connect</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4">
              {[
                { href: "https://github.com/DevSars24", icon: Github, label: "GitHub" },
                { href: "http://linkedin.com/in/saurabh-singh-rajput-25639a306", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:saurabh@example.com", icon: Mail, label: "Email" },
                { href: "https://twitter.com/yourhandle", icon: Twitter, label: "Twitter" },
              ].map(({ href, icon: Icon, label }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="group relative"
                  aria-label={`Visit my ${label} profile`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-cyan-400 transition-all duration-300" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Stay Updated */}
          <motion.div
            variants={childVariants}
            className="text-center sm:text-right"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-200">Stay Updated</h4>
            <p className="text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4 leading-relaxed">
              Follow for updates on AI, DevOps, and system design insights.
            </p>
            <a
              href="https://hashnode.com/@saurabh465"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-slate-200 transition-colors duration-300 text-xs sm:text-sm"
              aria-label="Read my Hashnode articles"
            >
              Read My Articles
            </a>
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent my-6 sm:my-8" />

        {/* Final Copyright */}
        <motion.p
          variants={childVariants}
          className="text-center text-xs text-slate-500"
        >
          Built with ❤️ using React, Tailwind, and shadcn/ui. 
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;