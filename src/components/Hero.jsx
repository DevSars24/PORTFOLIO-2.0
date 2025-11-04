/* --------------------------------------------------------------------------
   Hero.jsx — Aurora Pro Dark UI/UX Theme (Violet + Indigo + Cyan Glow)
   Crafted by Saurabh Singh Rajput | IIIT Bhagalpur
   -------------------------------------------------------------------------- */

   import { motion } from "framer-motion";
   import { Github, Linkedin, Eye } from "lucide-react";
   import { Button } from "@/components/ui/button";
   import { useEffect, useState } from "react";
   import { Link } from "react-router-dom";
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
   
   /* --------------------------------------------------------------------------
      Typing Animation Component
   -------------------------------------------------------------------------- */
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
         if (!deleting && displayText === current) setTimeout(() => setDeleting(true), 1500);
         else if (deleting && displayText === "") {
           setDeleting(false);
           setIndex((prev) => (prev + 1) % roles.length);
         }
       }, speed);
       return () => clearTimeout(timeout);
     }, [displayText, deleting, index]);
   
     return (
       <motion.span
         className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 font-semibold"
         animate={{ opacity: [0.8, 1, 0.8] }}
         transition={{ duration: 2, repeat: Infinity }}
       >
         {displayText}
       </motion.span>
     );
   };
   
   /* --------------------------------------------------------------------------
      Hero Section (Violet + Indigo Glow Theme)
   -------------------------------------------------------------------------- */
   const Hero = () => {
     const { totalViews, incrementViews, loading } = useStats();
     const skills = [html, css, js, react, node, express, mongo, tailwind, framer, python, git];
   
     useEffect(() => {
       if (!loading) incrementViews().catch(console.error);
     }, [loading, incrementViews]);
   
     if (loading)
       return (
         <div className="min-h-screen flex items-center justify-center text-cyan-400 font-medium">
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
         bg-[radial-gradient(circle_at_30%_20%,#030014_0%,#0a0118_100%)]
         text-[#E5E7EB] pt-24 pb-16 min-h-[calc(100vh-4rem)]"
       >
         {/* -- Ambient Gradient Lights -- */}
         <motion.div
           className="absolute -top-40 right-[-10%] w-[30rem] h-[30rem] bg-gradient-to-tr from-violet-500/30 via-indigo-400/20 to-transparent blur-[150px]"
           animate={{ opacity: [0.4, 0.6, 0.4], y: [0, 30, 0] }}
           transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div
           className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tr from-cyan-400/25 to-indigo-500/15 blur-[160px]"
           animate={{ scale: [1, 1.05, 1] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
         />
   
         {/* -- Main Content -- */}
         <motion.div
           className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-12"
           initial="hidden"
           animate="visible"
         >
           {/* Profile */}
           <motion.div
             className="flex justify-center flex-1"
             variants={fadeIn}
             custom={0.4}
             initial="hidden"
             animate="visible"
           >
             <div className="relative group">
               <motion.div
                 className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-400/25 via-cyan-400/15 to-transparent blur-2xl opacity-70 group-hover:opacity-100 transition-all"
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               />
               <img
                 src={profile}
                 alt="Saurabh Singh Rajput"
                 className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full object-cover 
                 border-4 border-indigo-400/40 shadow-[0_0_50px_rgba(139,92,246,0.5)]
                 group-hover:shadow-[0_0_80px_rgba(139,92,246,0.7)] transition-all duration-700"
               />
             </div>
           </motion.div>
   
           {/* Text Section */}
           <motion.div
             className="text-center md:text-left flex-1"
             variants={fadeIn}
             custom={0.2}
             initial="hidden"
             animate="visible"
           >
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
               <motion.span
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1 }}
                 className="block bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 text-transparent bg-clip-text"
               >
                 Hi, I’m Saurabh Singh Rajput
               </motion.span>
             </h1>
   
             <motion.p
               className="text-lg sm:text-xl font-medium mb-3 text-slate-300"
               animate={{ opacity: [0.7, 1, 0.7] }}
               transition={{ duration: 3, repeat: Infinity }}
             >
               <TypeAnimation />
             </motion.p>
   
             <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
               I’m a <span className="text-violet-300 font-medium">Full Stack Developer</span> &{" "}
               <span className="text-cyan-300 font-medium">AI Enthusiast</span> from{" "}
               <span className="text-indigo-300 font-medium">IIIT Bhagalpur</span>. I craft
               immersive digital experiences blending design, software, and intelligence.
             </p>
   
             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
               <Button
                 asChild
                 size="lg"
                 className="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 text-white font-semibold 
                 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] 
                 hover:scale-[1.05] transition-all duration-300"
               >
                 <Link to="/projects">✨ View Projects</Link>
               </Button>
   
               <Button
                 variant="outline"
                 size="lg"
                 className="border-violet-400 text-violet-300 hover:bg-violet-500/10 transition-all hover:scale-[1.03]"
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
               <a
                 href="https://github.com/DevSars24"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:scale-125 transition"
               >
                 <Github className="w-6 h-6 text-slate-400 hover:text-violet-400" />
               </a>
               <a
                 href="https://linkedin.com/in/saurabh-singh-rajput-25639a306"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:scale-125 transition"
               >
                 <Linkedin className="w-6 h-6 text-slate-400 hover:text-indigo-300" />
               </a>
             </div>
           </motion.div>
         </motion.div>
   
         {/* Floating Tech Stack Carousel */}
         <motion.div
           className="relative z-10 mt-16 w-[90%] sm:w-[80%] md:w-[70%] backdrop-blur-lg bg-[#0B021A]/60 
           border border-violet-400/10 rounded-xl py-6 px-4 shadow-[0_0_25px_rgba(139,92,246,0.15)]"
           variants={fadeIn}
           custom={1.2}
           initial="hidden"
           animate="visible"
         >
           <h2 className="text-lg sm:text-xl font-semibold text-violet-300 mb-6 text-center">
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
                   className="w-10 h-10 sm:w-12 sm:h-12 hover:scale-125 transition-transform duration-300 opacity-80 hover:opacity-100"
                   animate={{ y: [0, -4, 0], rotate: [0, 3, -3, 0] }}
                   transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
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
           <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-[#1E1B4B]/80 to-[#312E81]/70 border border-violet-400/30 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]">
             <Eye className="w-4 h-4 text-violet-300 animate-pulse" />
             <span className="text-sm text-violet-100">{totalViews.toLocaleString()} Views</span>
           </div>
         </motion.div>
       </section>
     );
   };
   
   export default Hero;
   
   