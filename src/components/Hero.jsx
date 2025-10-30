/* --------------------------------------------------------------------------
   Hero.jsx  —  Enhanced Modern Dark + Glass/Frosted Theme with Dynamic Background
   by Saurabh Singh Rajput | IIIT Bhagalpur
   -------------------------------------------------------------------------- */

   import { motion } from "framer-motion";
   import { Github, Linkedin, Eye } from "lucide-react";
   import { Button } from "@/components/ui/button";
   import { useEffect, useState } from "react";
   import profile from "../assets/profile.png";
   import { Link } from "react-router-dom";
   
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
   
     const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
   
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
    ;
   
     useEffect(() => {
       const timer = setInterval(() => {
         setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
       }, 5000);
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
   
     // --- Animation Variants ---
     const containerVariants = {
       hidden: { opacity: 0 },
       visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
     };
   
     const childVariants = {
       hidden: { opacity: 0, y: 20 },
       visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
     };
   
     const imageVariants = {
       hidden: { scale: 0.8, rotate: -5 },
       visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 100, duration: 0.3 } },
     };
   
     return (
       <section
         id="hero"
         className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#121826] to-[#0B1220] text-[#E2E8F0]"
       >
         {/* --- Innovative Animated Background --- */}
         <div className="absolute inset-0 overflow-hidden">
           {/* Animated blobs */}
           {[...Array(6)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute rounded-full"
               style={{
                 width: `${80 + i * 20}px`,
                 height: `${80 + i * 20}px`,
                 background: `radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)`,
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
               }}
               animate={{
                 x: [0, -20 + i * 5, 0],
                 y: [0, 15 - i * 3, 0],
                 scale: [1, 1.3, 1],
                 opacity: [0.3, 0.6, 0.3],
               }}
               transition={{
                 duration: 15 + i * 2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: i,
               }}
             />
           ))}
           {/* Particle rain */}
           {[...Array(40)].map((_, i) => (
             <motion.div
               key={`particle-${i}`}
               className="absolute w-1 h-1 bg-indigo-400 rounded-full"
               style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
               animate={{ y: ["0%", "110%"] }}
               transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
             />
           ))}
         </div>
   
         <motion.div
           className="relative z-10 max-w-full sm:max-w-5xl mx-auto px-4 sm:px-6 md:px-8"
           initial="hidden"
           animate="visible"
           variants={containerVariants}
         >
           {/* Profile Image */}
           <motion.div variants={imageVariants} className="mb-6 sm:mb-8">
             <div className="relative group">
               <img
                 src={profile}
                 alt="Saurabh Singh Rajput"
                 className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover 
                 border-4 border-[#1E293B]/40 bg-[#0F1724]/40 backdrop-blur-md shadow-2xl
                 ring-2 ring-indigo-500/40 group-hover:ring-indigo-400/70 transition-all"
               />
               {/* Floating tech orbit */}
               {skills.map((tech, idx) => (
                 <motion.img
                   key={idx}
                   src={tech}
                   alt="tech-icon"
                   className="absolute w-8 h-8 md:w-10 md:h-10 rounded-full"
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{
                     rotate: [0, 360],
                     x: [0, 50, 0],
                     y: [0, -40, 0],
                     opacity: [0, 1, 0],
                     scale: [0, 1, 0.8],
                   }}
                   transition={{ duration: 12 + idx, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                   style={{
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                   }}
                 />
               ))}
             </div>
           </motion.div>
   
           {/* Intro Text */}
           <motion.h1
             variants={childVariants}
             className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r 
             from-indigo-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
           >
             Hi, I’m <span className="text-indigo-400">Saurabh Singh Rajput</span>
           </motion.h1>
   
           <motion.p
             variants={childVariants}
             className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-6"
           >
             A passionate Full Stack Developer & AI enthusiast from IIIT Bhagalpur 🚀  
             Crafting ideas into code, exploring GenAI, and designing scalable systems ⚙️
           </motion.p>
   
           {/* Buttons */}
           <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
             <Button
               asChild
               size="lg"
               className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 
               text-white font-medium text-sm sm:text-base shadow-lg shadow-indigo-500/20"
             >
               <Link to="/projects">View Projects</Link>
             </Button>
   
             <Button
               variant="outline"
               size="lg"
               className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
             >
               <a
                 href="http://linkedin.com/in/saurabh-singh-rajput-25639a306"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Contact Me
               </a>
             </Button>
           </motion.div>
   
           {/* Socials */}
           <motion.div variants={childVariants} className="flex gap-6 justify-center mb-10">
             <a href="https://github.com/DevSars24" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
               <Github className="w-7 h-7 text-slate-300 hover:text-indigo-400" />
             </a>
             <a href="http://linkedin.com/in/saurabh-singh-rajput-25639a306" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
               <Linkedin className="w-7 h-7 text-slate-300 hover:text-indigo-400" />
             </a>
           </motion.div>
   
           {/* Developer Quote Card */}
           <motion.div
             key={currentQuoteIndex}
             variants={childVariants}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mx-auto mb-12 w-full sm:w-[85%] md:w-[75%] lg:w-[70%]
             backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl text-left
             p-6 sm:p-8 font-mono text-slate-200"
           >
             <pre className="whitespace-pre-wrap text-xs sm:text-sm md:text-base leading-relaxed">
               {quotes[currentQuoteIndex]}
             </pre>
           </motion.div>
   
           {/* Tech Stack Marquee */}
           <motion.div
             variants={childVariants}
             className="relative w-full overflow-hidden py-8 backdrop-blur-md bg-[#0F1724]/60 border border-indigo-500/10 rounded-xl"
           >
             <h2 className="text-xl font-semibold text-indigo-400 mb-6">⚡ My Tech Stack</h2>
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
   
           {/* Stats (Glass Chip) */}
           <motion.div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
             <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-lg bg-white/10 border border-white/20 rounded-full shadow-md">
               <Eye className="w-4 h-4 text-indigo-400" />
               <span className="text-sm text-slate-200">{totalViews.toLocaleString()} Views</span>
             </div>
           </motion.div>
         </motion.div>
       </section>
     );
   };
   
   export default Hero;
   