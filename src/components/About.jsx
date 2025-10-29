import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Code, Award, BookOpen, Brain } from "lucide-react";
import profile from "../assets/profile.png";

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const imageVariants = {
    hidden: { x: -50, opacity: 0, scale: 0.8, rotate: -5 },
    visible: { x: 0, opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 100, duration: 0.3 } },
  };
  const typingVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.03, duration: 0.2, ease: "easeOut" },
    }),
  };
  const cursorVariants = {
    blink: { opacity: [1, 0, 1], transition: { duration: 0.5, repeat: Infinity, ease: "linear" } },
  };
  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  const headingText = "About Me";
  const nameText = "Saurabh Singh Rajput";
  const quoteText = "Crafting innovative solutions with code and curiosity – turning ideas into reality through full-stack development, GenAI exploration, and system design mastery.";

  // Create a motion version of Button
  const MotionButton = motion.create(Button);

  return (
    <section
      id="about"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-black min-h-screen flex items-center overflow-hidden"
      role="main"
      aria-label="About Section"
    >
      {/* Background Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        {[...Array(5)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute w-2 h-2 bg-cyan-400/50 rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="max-w-full sm:max-w-6xl mx-auto w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        {/* Main Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-12 text-center bg-gradient-to-r from-slate-200 via-cyan-300 to-purple-300 bg-clip-text text-transparent leading-tight text-shadow-sm"
          aria-live="polite"
        >
          {headingText.split("").map((char, index) => (
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
        </motion.h2>

        {/* Profile Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start mb-8 sm:mb-12 md:mb-16">
          {/* Profile Image */}
          <motion.div
            variants={imageVariants}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative group">
              <img
                src={profile}
                alt="Saurabh Singh Rajput"
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover border-4 border-slate-700/50 backdrop-blur-sm bg-slate-800/20 shadow-xl ring-2 ring-cyan-400/40 group-hover:ring-cyan-400/60 transition-all duration-300"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            variants={childVariants}
            className="space-y-4 sm:space-y-6 text-center md:text-left"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200" aria-live="polite">
              {nameText.split("").map((char, index) => (
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
            <motion.blockquote
              className="text-sm sm:text-base md:text-lg lg:text-xl italic text-slate-300 border-l-4 border-cyan-400 pl-4 leading-relaxed relative"
              variants={childVariants}
              aria-live="polite"
            >
              <motion.div
                className="absolute inset-0 bg-cyan-400/5 rounded-md"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              {quoteText.split("").map((char, index) => (
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
            </motion.blockquote>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed"
              variants={childVariants}
            >
              I’m a 2nd-year CSE student at IIIT Bhagalpur and a self-taught developer. I love building real-world web apps using the MERN stack, and exploring GenAI & system design. Passionate about backend, DevOps, and sharing knowledge on system design through my Hashnode articles.
            </motion.p>
            {/* Skills & Expertise */}
            <motion.div variants={childVariants}>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-400 flex items-center gap-2">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                Skills & Expertise
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-slate-300">
                {[
                  "Full Stack Development (MERN Stack)",
                  "Generative AI & Machine Learning",
                  "System Design & Backend Engineering",
                  "DevOps & Cloud Infrastructure",
                  "Competitive Programming (LeetCode, GFG)",
                ].map((skill, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={skillVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 5, color: "#22d3ee" }}
                    className="flex items-center gap-2 group"
                  >
                    • {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          variants={childVariants}
          className="max-w-full sm:max-w-4xl mx-auto"
        >
          <h4 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight text-shadow-sm">
            Connect With Me
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { href: "https://github.com/DevSars24", icon: Github, label: "GitHub" },
              { href: "https://codolio.com/profile/sars", icon: Code, label: "Codolio" },
              { href: "http://linkedin.com/in/saurabh-singh-rajput-25639a306", icon: Linkedin, label: "LinkedIn" },
              { href: "https://www.geeksforgeeks.org/user/saurabhsinvqv3/", icon: Award, label: "GFG" },
              { href: "https://leetcode.com/u/VXGxeHwq/", icon: Code, label: "LeetCode" },
              { href: "https://hashnode.com/@saurabh465", icon: BookOpen, label: "Hashnode" },
            ].map(({ href, icon: Icon, label }, idx) => (
              <MotionButton
                key={idx}
                asChild
                variant="outline"
                className="flex flex-col items-center justify-center gap-2 h-auto py-4 sm:py-6 bg-slate-800/20 backdrop-blur-sm border-slate-700/50 hover:bg-cyan-500/20 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-400 transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-12"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whiletap={{ scale: 0.95 }}
                aria-label={`Visit my ${label} profile`}
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />
                  <span className="text-xs sm:text-sm font-medium">{label}</span>
                </a>
              </MotionButton>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;