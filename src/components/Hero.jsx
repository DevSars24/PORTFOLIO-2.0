/* --------------------------------------------------------------------------
   Hero.jsx — Modern Dark + Glass Theme (Image Left + Text Right)
   Hand-crafted by Saurabh Singh Rajput | IIIT Bhagalpur
   -------------------------------------------------------------------------- */

   import { motion } from "framer-motion";
   import { Github, Linkedin, Eye } from "lucide-react";
   import { Button } from "@/components/ui/button";
   import { useEffect, useState } from "react";
   import { Link } from "react-router-dom";
   
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
     const { totalViews, incrementViews, loading } = useStats();
   
     const skills = [html, css, js, react, node, express, mongo, tailwind, framer, python, git];
   
     const quotes = [
       `if (life.isHard()) {
     keepGoing();
     console.log("Every bug is fixable.");
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
       }, 6000);
       return () => clearInterval(timer);
     }, []);
   
     useEffect(() => {
       if (!loading) incrementViews().catch(console.error);
     }, [loading, incrementViews]);
   
     if (loading)
       return (
         <div className="min-h-screen flex items-center justify-center text-indigo-400 font-medium">
           Loading stats...
         </div>
       );
   
     // Animation Preset
     const fadeIn = {
       hidden: { opacity: 0, y: 25 },
       visible: (delay = 0) => ({
         opacity: 1,
         y: 0,
         transition: { duration: 0.8, delay, ease: "easeOut" },
       }),
     };
   
     return (
       <section
         id="hero"
         className="relative flex flex-col justify-center items-center text-center overflow-hidden
                    bg-gradient-to-br from-[#0B1220] via-[#121826] to-[#0B1220] text-[#E2E8F0]
                    pt-16 sm:pt-20 md:pt-24 pb-12 min-h-[calc(100vh-4rem)]"
       >
         {/* Background Effects */}
         <div className="absolute inset-0 overflow-hidden">
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute rounded-full"
               style={{
                 width: `${100 + i * 40}px`,
                 height: `${100 + i * 40}px`,
                 background: `radial-gradient(circle, rgba(147,197,253,0.12) 0%, transparent 70%)`,
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
               }}
               animate={{
                 x: [0, -15 + i * 5, 0],
                 y: [0, 25 - i * 4, 0],
                 opacity: [0.2, 0.5, 0.2],
               }}
               transition={{
                 duration: 20 + i * 3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: i,
               }}
             />
           ))}
         </div>
   
         {/* Main Container */}
         <motion.div
           className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-12"
           initial="hidden"
           animate="visible"
         >
           {/* Left: Profile Image */}
           <motion.div
             className="flex justify-center flex-1"
             variants={fadeIn}
             custom={0.5}
             initial="hidden"
             animate="visible"
           >
             <div className="relative group">
               <img
                 src={profile}
                 alt="Saurabh Singh Rajput"
                 className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover
                            border-4 border-yellow-400/40 shadow-2xl ring-2 ring-yellow-500/20 
                            group-hover:ring-yellow-400/60 transition-all"
               />
             </div>
           </motion.div>
   
           {/* Right: Intro Text */}
           <motion.div
             className="text-center md:text-left flex-1"
             variants={fadeIn}
             custom={0.3}
             initial="hidden"
             animate="visible"
           >
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
               Hi, I’m <span className="text-yellow-400">Saurabh Singh Rajput</span>
             </h1>
   
             <p className="text-base sm:text-lg text-slate-300 mb-6 leading-relaxed">
               A passionate <span className="text-yellow-400 font-medium">Full Stack Developer</span> &{" "}
               <span className="text-yellow-400 font-medium">AI Enthusiast</span> from IIIT Bhagalpur.  
               Turning ideas into modern, scalable web experiences & exploring GenAI 🚀
             </p>
   
             <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
               <Button
                 asChild
                 size="lg"
                 className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow-lg shadow-yellow-500/30"
               >
                 <Link to="/projects">View Projects</Link>
               </Button>
   
               <Button
                 variant="outline"
                 size="lg"
                 className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
               >
                 <a
                   href="https://linkedin.com/in/saurabh-singh-rajput-25639a306"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   Contact Me
                 </a>
               </Button>
             </div>
   
             {/* Social Icons */}
             <div className="flex gap-6 justify-center md:justify-start">
               <a
                 href="https://github.com/DevSars24"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:scale-110 transition"
               >
                 <Github className="w-6 h-6 text-slate-300 hover:text-yellow-400" />
               </a>
               <a
                 href="https://linkedin.com/in/saurabh-singh-rajput-25639a306"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:scale-110 transition"
               >
                 <Linkedin className="w-6 h-6 text-slate-300 hover:text-yellow-400" />
               </a>
             </div>
           </motion.div>
         </motion.div>
   
         {/* Quote Section */}
         <motion.div
           key={currentQuoteIndex}
           className="relative z-10 mt-12 w-[90%] sm:w-[80%] md:w-[70%] backdrop-blur-xl bg-white/5 
                      border border-white/10 rounded-2xl p-5 sm:p-6 font-mono text-slate-300 shadow-lg"
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
         >
           <pre className="whitespace-pre-wrap text-xs sm:text-sm md:text-base leading-relaxed">
             {quotes[currentQuoteIndex]}
           </pre>
         </motion.div>
   
         {/* Tech Stack */}
         <motion.div
           className="relative z-10 mt-10 w-[95%] sm:w-[85%] md:w-[75%] backdrop-blur-md bg-[#0F1724]/60 
                      border border-yellow-400/10 rounded-xl py-6 px-4"
           variants={fadeIn}
           custom={1.2}
           initial="hidden"
           animate="visible"
         >
           <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-6 text-center">
             ⚡ My Tech Stack
           </h2>
           <div className="relative flex overflow-x-hidden">
             <motion.div
               className="flex gap-10 py-2"
               animate={{ x: ["0%", "-100%"] }}
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             >
               {[...skills, ...skills].map((icon, index) => (
                 <img
                   key={index}
                   src={icon}
                   alt="tech-icon"
                   className="w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-transform duration-300"
                 />
               ))}
             </motion.div>
           </div>
         </motion.div>
   
         {/* Stats Chip */}
         <motion.div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
           <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-lg 
                           bg-white/10 border border-white/20 rounded-full shadow-md">
             <Eye className="w-4 h-4 text-yellow-400" />
             <span className="text-sm text-slate-200">
               {totalViews.toLocaleString()} Views
             </span>
           </div>
         </motion.div>
       </section>
     );
   };
   
   export default Hero;
   