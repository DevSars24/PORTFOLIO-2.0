import { motion } from "framer-motion";
import { Github, Linkedin, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import profile from "../assets/profile.png";

// Tech icons
import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import node from "../assets/node.png";
import express from "../assets/express.png";
import mongo from "../assets/mongo.png";
import tailwind from "../assets/tailwind.png";
import framer from "../assets/framer.png";
import python from "../assets/python.png";
import git from "../assets/git.png";

import { useStats } from "../context/StatsContext";

const Hero = () => {
  const { totalLikes, totalViews, incrementViews, loading } = useStats();

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
    hidden: { scale: 0.8, rotate: -5 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 100, duration: 0.3 } },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.5 },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "easeInOut" } },
  };

  const skills = [html, css, js, react, node, express, mongo, tailwind, framer, python, git];

  const quotes = [
    `if (life.isHard()) {
  keepGoing();
  console.log("Every bug is fixable — even the ones inside you.");
}`,
    `for (let day of life) {
  learn(day);
  grow(day);
  commit("self improvement");
}`,
    `if (failure) {
  debugMistakes();
} else {
  console.log("Deploy confidence 🚀");
}`,
    `while (dreams.notAchieved()) {
  code();
  sleep();
  repeat();
}`,
    `if (youBelieveInYourself) {
  console.log("return success;");
} else {
  throw new Error("LackOfFaithException");
}`,
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // every 5s switch
    return () => clearInterval(timer);
  }, [quotes.length]);

  // Increment views
  useEffect(() => {
    if (!loading) incrementViews().catch((err) => console.error("View increment failed:", err));
  }, [loading, incrementViews]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading stats...
      </div>
    );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-5 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 max-w-full sm:max-w-5xl mx-auto px-4 sm:px-6 md:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Profile image */}
        <motion.div variants={imageVariants} className="mb-6 sm:mb-8">
          <div className="relative group">
            <img
              src={profile}
              alt="Saurabh Singh Rajput"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-slate-700/50 backdrop-blur-sm bg-slate-800/20 shadow-xl ring-2 ring-cyan-400/40 group-hover:ring-cyan-400/60 transition-all"
            />
          </div>
        </motion.div>

        {/* Intro */}
        <motion.h1
          variants={childVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-200 via-cyan-300 to-purple-300 bg-clip-text text-transparent"
        >
          Hi, I’m <span className="text-cyan-400">Saurabh Singh Rajput</span>
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-6"
        >
          A passionate Full Stack Developer & AI enthusiast from IIIT Bhagalpur 🚀  
          Crafting ideas into code, exploring GenAI, and designing systems that scale ⚙️
        </motion.p>

       {/* Buttons */}
<motion.div
  variants={childVariants}
  className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
>
  {/* View Projects → GitHub */}
  <Button
    asChild
    size="lg"
    className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm sm:text-base"
  >
    <a
      href="https://github.com/DevSars24"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Projects
    </a>
  </Button>

  {/* Contact Me → LinkedIn */}
  <Button
    variant="outline"
    size="lg"
    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
  >
    <a
      href="https://www.linkedin.com/in/saurabh-singh-25639a306/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Contact Me
    </a>
  </Button>
</motion.div>


        {/* Social icons */}
        <motion.div variants={childVariants} className="flex gap-6 justify-center mb-10">
          <a
            href="https://github.com/DevSars24"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
          >
            <Github className="w-7 h-7 text-slate-300 hover:text-cyan-400" />
          </a>
          <a
            href="https://www.linkedin.com/in/saurabh-singh-25639a306/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
          >
            <Linkedin className="w-7 h-7 text-slate-300 hover:text-cyan-400" />
          </a>
        </motion.div>

        {/* 💻 Developer Life Quote Card */}
        <motion.div
          key={currentQuoteIndex}
          variants={quoteVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-12 w-full sm:w-[85%] md:w-[75%] lg:w-[70%] bg-slate-900/60 border border-cyan-400/30 rounded-2xl shadow-2xl backdrop-blur-md text-left p-6 sm:p-8 font-mono text-slate-200"
        >
          <pre className="whitespace-pre-wrap text-xs sm:text-sm md:text-base leading-relaxed">
            {quotes[currentQuoteIndex]}
          </pre>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          variants={childVariants}
          className="relative w-full overflow-hidden py-8 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30"
        >
          <h2 className="text-xl font-semibold text-cyan-400 mb-6">⚡ My Tech Stack</h2>
          <div className="relative flex overflow-x-hidden">
            <motion.div
              className="flex gap-10 py-2 animate-marquee"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              {[...skills, ...skills].map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt="tech-icon"
                  className="w-12 h-12 sm:w-14 sm:h-14 hover:scale-110 transition-transform duration-300"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
        variants={statsVariants}
        initial="hidden"
        animate="visible"
      >
       
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-full">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-200">{totalViews.toLocaleString()} Views</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
