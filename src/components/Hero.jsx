/* --------------------------------------------------------------------------
   Hero.jsx — Professional Developer Dark Theme + Subtle Particle Animation
   Crafted by Saurabh Singh Rajput | IIIT Bhagalpur
   -------------------------------------------------------------------------- */

   import { motion } from "framer-motion";
   import { Github, Linkedin, Eye } from "lucide-react";
   import { Button } from "@/components/ui/button";
   import { useEffect, useState } from "react";
   // import { Link } from "react-router-dom"; 
   import profile from "../assets/profile.png";
   
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
   
   /* ----------------------------- Type Animation ---------------------------- */
   const TypeAnimation = () => {
     const roles = [
       "Full Stack Developer",
       "System Design Enthusiast",
       "Building GenAI & Agentic Tools",
       "Learning DevOps",
       "An Aspiring SDE 🚀",
     ];
     const [index, setIndex] = useState(0);
     const [displayText, setDisplayText] = useState("");
     const [deleting, setDeleting] = useState(false);
   
     useEffect(() => {
       const current = roles[index];
       const speed = deleting ? 50 : 100;
       const timeout = setTimeout(() => {
         setDisplayText((prev) =>
           deleting
             ? current.substring(0, prev.length - 1)
             : current.substring(0, prev.length + 1)
         );
         if (!deleting && displayText === current)
           setTimeout(() => setDeleting(true), 1200);
         else if (deleting && displayText === "") {
           setDeleting(false);
           setIndex((prev) => (prev + 1) % roles.length);
         }
       }, speed);
       return () => clearTimeout(timeout);
     }, [displayText, deleting, index]);
   
     return (
       <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-400 to-cyan-400 font-semibold">
         {displayText}
       </motion.span>
     );
   };
   
   /* ----------------------------- Particle Layer ---------------------------- */
   const ParticleLayer = () => {
     const particles = Array.from({ length: 25 }); // 25 subtle particles
     return (
       <div className="absolute inset-0 overflow-hidden z-0">
         {particles.map((_, i) => {
           const size = Math.random() * 5 + 2; // 2–7px
           const top = Math.random() * 100;
           const left = Math.random() * 100;
           const duration = 10 + Math.random() * 10; // 10–20s
           const delay = Math.random() * 5;
   
           return (
             <motion.div
               key={i}
               className="absolute rounded-full bg-blue-400/30 blur-[2px]"
               style={{
                 width: `${size}px`,
                 height: `${size}px`,
                 top: `${top}%`,
                 left: `${left}%`,
               }}
               animate={{
                 y: ["0%", "10%", "0%"],
                 x: ["0%", "5%", "0%"],
                 opacity: [0.3, 0.8, 0.3],
               }}
               transition={{
                 duration,
                 delay,
                 repeat: Infinity,
                 ease: "easeInOut",
               }}
             />
           );
         })}
       </div>
     );
   };
   
   /* ------------------------------- Hero Section ---------------------------- */
   const Hero = () => {
     const { totalViews, loading } = useStats(); // ✅ Removed incrementViews to avoid error
     const skills = [html, css, js, react, node, express, mongo, tailwind, framer, python, git];
   
     // ✅ Removed useEffect that called incrementViews()
   
     if (loading)
       return (
         <div className="min-h-screen flex items-center justify-center text-orange-400 font-medium">
           Loading stats...
         </div>
       );
   
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
         bg-gradient-to-br from-orange-50/20 via-slate-900 to-blue-900/50 text-[#E5E7EB] pt-24 pb-16 min-h-[calc(100vh-4rem)]"
       >
         {/* Particle Background Layer */}
         <ParticleLayer />
   
         {/* Minimal gradient ambience – adjusted for light orange-blue theme */}
         <motion.div
           className="absolute -top-40 right-[-10%] w-[25rem] h-[25rem]
           bg-gradient-to-tr from-orange-500/20 via-blue-500/20 to-cyan-400/20 blur-[120px]"
           animate={{ opacity: [0.3, 0.4, 0.3], y: [0, 20, 0] }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div
           className="absolute bottom-[-10%] left-[-10%] w-[25rem] h-[25rem]
           bg-gradient-to-tr from-blue-400/20 via-orange-400/20 to-yellow-400/20 blur-[120px]"
           animate={{ scale: [1, 1.03, 1] }}
           transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
         />
   
         {/* Main Content */}
         <motion.div
           className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-12"
           initial="hidden"
           animate="visible"
         >
           {/* Profile – Professional circle */}
           <motion.div
             className="flex justify-center flex-1"
             variants={fadeIn}
             custom={0.4}
           >
             <img
               src={profile}
               alt="Saurabh Singh Rajput"
               className="w-50 h-50 sm:w-55 sm:h-55 md:w-100 md:h-100 rounded-full object-cover 
               border-2 border-orange-500/50 shadow-[0_0_30px_rgba(251,146,60,0.3)]
               hover:shadow-[0_0_50px_rgba(251,146,60,0.5)] transition-all duration-700"
             />
           </motion.div>
   
           {/* Text */}
           <motion.div
             className="text-center md:text-left flex-1"
             variants={fadeIn}
             custom={0.2}
           >
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
               <motion.span className="block bg-gradient-to-r from-orange-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
                 Hi, I’m Saurabh Singh Rajput
               </motion.span>
             </h1>
             <p className="text-lg sm:text-xl font-medium mb-3 text-slate-300">
               <TypeAnimation />
             </p>
             <p className="text-base sm:text-lg text-slate-200 mb-8 leading-relaxed max-w-xl">
               I’m a <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text font-medium">Full Stack Developer</span> &{" "}
               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text font-medium">AI Enthusiast</span> from{" "}
               <span className="bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text font-medium">IIIT Bhagalpur</span>. 
               I build scalable and elegant web systems with focus on performance & design.
             </p>
   
             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
               <Button
                 asChild
                 size="lg"
                 className="bg-gradient-to-r from-orange-600 via-blue-600 to-cyan-500 text-white font-semibold 
                 shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)] 
                 hover:scale-[1.03] transition-all duration-300"
               >
                 {/* ✅ Changed to <a href="#projects"> for SPA hash scrolling */}
                 <a href="#projects">✨ View Projects</a>
               </Button>
   
               <Button
                 variant="outline"
                 size="lg"
                 className="border-orange-500 text-orange-300 hover:bg-orange-500/10 transition-all hover:scale-[1.02]"
               >
                 <a
                   href="https://linkedin.com/in/saurabh-singh-rajput-25639a306"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   Connect on LinkedIn
                 </a>
               </Button>
             </div>
   
             <div className="flex gap-6 mt-8 justify-center md:justify-start">
               <a href="https://github.com/DevSars24" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition">
                 <Github className="w-6 h-6 text-slate-400 hover:text-orange-400" />
               </a>
               <a href="https://linkedin.com/in/saurabh-singh-rajput-25639a306" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition">
                 <Linkedin className="w-6 h-6 text-slate-400 hover:text-blue-400" />
               </a>
             </div>
           </motion.div>
         </motion.div>
   
         {/* Tech Stack */}
         <motion.div
           className="relative z-10 mt-16 w-[90%] sm:w-[80%] md:w-[70%]
           backdrop-blur-lg bg-white/10 border border-orange-500/30 rounded-xl py-6 px-4
           shadow-[0_0_20px_rgba(251,146,60,0.15)]"
           variants={fadeIn}
           custom={1.2}
         >
           <h2 className="text-lg sm:text-xl font-semibold text-slate-200 mb-6 text-center">
             ⚡ Tech Stack
           </h2>
           <div className="relative flex overflow-x-hidden">
             <motion.div
               className="flex gap-10 py-2"
               animate={{ x: ["0%", "-100%"] }}
               transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
             >
               {[...skills, ...skills].map((icon, i) => (
                 <motion.img
                   key={i}
                   src={icon}
                   alt="tech-icon"
                   className="w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100 filter drop-shadow-lg"
                 />
               ))}
             </motion.div>
           </div>
         </motion.div>
   
         {/* Stats Chip */}
         <motion.div
           className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
         >
           <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl
           bg-white/10 border border-orange-500/30 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.2)]">
             <Eye className="w-4 h-4 text-orange-400 animate-pulse" />
             <span className="text-sm text-slate-200">
               {totalViews.toLocaleString()} Views
             </span>
           </div>
         </motion.div>
       </section>
     );
   };
   
   export default Hero;