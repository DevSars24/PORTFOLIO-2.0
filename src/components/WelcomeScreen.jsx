// src/components/WelcomeScreen.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import devGif from "../assets/DeveloperFrontEnd.gif"; // 👈 place your GIF inside /src/assets/

const WelcomeScreen = ({ onFinish }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timeout = setTimeout(() => onFinish(), 800);
      return () => clearTimeout(timeout);
    }
  }, [countdown, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center overflow-hidden"
    >
      {/* 💻 Animated GIF */}
      <motion.img
        src={devGif}
        alt="Developer Animation"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, -10, 0], opacity: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="w-48 h-48 md:w-56 md:h-56 mb-6"
      />

      {/* Greeting */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400"
      >
        👋 Welcome to My Portfolio
      </motion.h1>

      {/* Typing Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-lg md:text-2xl font-medium text-gray-300 mb-8"
      >
        <Typewriter
          options={{
            strings: [
              "💻 MERN Stack Developer",
              "🧠 GenAI & System Design Enthusiast",
              "🚀 Learning by Doing Everyday",
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 25,
          }}
        />
      </motion.div>

      {/* Countdown */}
      <motion.div
        key={countdown}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-extrabold text-cyan-500"
      >
        {countdown > 0 ? countdown : "🚀 Launching..."}
      </motion.div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="text-sm text-gray-400 mt-6"
      >
        “Crafted with passion & purpose by Saurabh Singh Rajput”
      </motion.p>
    </motion.div>
  );
};

export default WelcomeScreen;
