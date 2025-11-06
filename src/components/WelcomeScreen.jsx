// src/components/WelcomeScreen.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import devGif from "../assets/DeveloperFrontEnd.gif";

const WelcomeScreen = ({ onFinish }) => {
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const codeTimer = setTimeout(() => setShowCode(true), 500); // show code after heading
    const finishTimer = setTimeout(() => onFinish(), 8000); // total duration
    return () => {
      clearTimeout(codeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col justify-center items-center h-screen 
      bg-[radial-gradient(circle_at_30%_20%,#030014_0%,#0A0118_100%)]
      text-white text-center overflow-hidden relative"
    >
      {/* --- Gradient Glow --- */}
      <motion.div
        className="absolute -top-40 right-[-10%] w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-500/20 via-violet-500/20 to-transparent blur-[160px]"
        animate={{ opacity: [0.4, 0.7, 0.4], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tr from-cyan-400/15 via-pink-400/10 to-transparent blur-[180px]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 💻 Developer Animation */}
      <motion.img
        src={devGif}
        alt="Developer Animation"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, -10, 0], opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="w-40 h-40 md:w-52 md:h-52 mb-5 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
      />

      
{!showCode ? (
  <motion.h1
    key="boot"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.1 }}
    className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 pt-2 
    bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 text-transparent bg-clip-text"
  >
    <motion.span
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      Initializing Developer Environment...
    </motion.span>
  </motion.h1>
) : (
  <motion.pre
    key="code"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="font-mono text-sm sm:text-base text-left text-slate-300 bg-[#0B021A]/40 
    backdrop-blur-lg border border-fuchsia-400/20 px-5 py-4 rounded-xl 
    shadow-[0_0_20px_rgba(236,72,153,0.15)] leading-relaxed whitespace-pre-wrap 
    max-w-[90%] sm:max-w-[60%] mt-2"
  >
    <Typewriter
      options={{
        strings: [
`while (life.running()) {
  code();
  learn();
  adapt();
  console.log("Keep creating ");
}`,
        ],
        autoStart: true,
        loop: false,
        delay: 35,
      }}
    />
  </motion.pre>
)}

{/* 🪶 Footer Signature */}
<motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 5.8, duration: 0.8 }}
  className="text-xs sm:text-sm text-gray-400 mt-8 italic"
>
  — Crafted with <span className="text-pink-400">logic</span> &{" "}
  <span className="text-cyan-400">imagination</span> by{" "}
  <span className="text-violet-400">Saurabh Singh Rajput</span>
</motion.p>

    </motion.div>
  );
};

export default WelcomeScreen;
