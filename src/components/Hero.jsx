/* --------------------------------------------------------------------------
   Hero.jsx — Aurora Dark Theme (Navy + Teal Glow + Typing Animation)
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
   
   /* --------------------------------------------------------------------------
      Typing Animation Component
   -------------------------------------------------------------------------- */
   const TypeAnimation = () => {
     const roles = [
       "Web Developer",
       "System Design Enthusiast",
       "exploring GenAI & Agentic AI",
       "learning DevOps",
       "an Aspiring SDE 🚀",
     ];
   
     const [index, setIndex] = useState(0);
     const [displayText, setDisplayText] = useState("");
     const [deleting, setDeleting] = useState(false);
   
     useEffect(() => {
       const current = roles[index];
       let typingSpeed = deleting ? 50 : 100;
   
       const typing = setTimeout(() => {
         setDisplayText((prev) =>
           deleting
             ? current.substring(0, prev.length - 1)
             : current.substring(0, prev.length + 1)
         );
   
         if (!deleting && displayText === current) {
           setTimeout(() => setDeleting(true), 1500);
         } else if (deleting && displayText === "") {
           setDeleting(false);
           setIndex((prev) => (prev + 1) % roles.length);
         }
       }, typingSpeed);
   
       return () => clearTimeout(typing);
     }, [displayText, deleting, index]);
   
     return (
       <span className="text-emerald-300 font-semibold">{displayText}</span>
     );
   };
   
   /* --------------------------------------------------------------------------
      Hero Section
   -------------------------------------------------------------------------- */
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
         <div className="min-h-screen flex items-center justify-center text-emerald-400 font-medium">
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
   
     const particles = Array.from({ length: 25 }).map((_, i) => ({
       id: i,
       top: `${Math.random() * 100}%`,
       left: `${Math.random() * 100}%`,
       size: 3 + Math.random() * 3,
       delay: Math.random() * 8,
     }));
   
     return (
       <section
         id="hero"
         className="relative flex flex-col justify-center items-center text-center overflow-hidden
         bg-[radial-gradient(ellipse_at_top,_#020617_0%,_#01030a_100%)]
         before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-10
         text-[#E2E8F0] pt-16 sm:pt-20 md:pt-24 pb-12 min-h-[calc(100vh-4rem)]"
       >
         {/* ---------------- Background Glows ---------------- */}
         <motion.div
           className="absolute -top-40 -right-32 w-96 h-96 rounded-full 
           bg-gradient-to-tr from-teal-400/20 to-emerald-400/20 blur-[120px]"
           animate={{ rotate: 360 }}
           transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
         />
         <motion.div
           className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full 
           bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 blur-[140px]"
           animate={{ rotate: -360 }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
         />
   
         {/* ---------------- Floating Particles ---------------- */}
         <div className="absolute inset-0 overflow-hidden">
           {particles.map((p) => (
             <motion.span
               key={p.id}
               className="absolute rounded-full bg-teal-300/30 blur-[2px]"
               style={{
                 width: `${p.size}px`,
                 height: `${p.size}px`,
                 top: p.top,
                 left: p.left,
               }}
               animate={{
                 y: ["0%", "-20%", "0%"],
                 x: ["0%", "10%", "-10%", "0%"],
                 opacity: [0.1, 0.6, 0.1],
                 scale: [1, 1.3, 1],
               }}
               transition={{
                 duration: 10 + Math.random() * 8,
                 repeat: Infinity,
                 delay: p.delay,
                 ease: "easeInOut",
               }}
             />
           ))}
         </div>
   
         {/* ---------------- Main Section ---------------- */}
         <motion.div
           className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-12"
           initial="hidden"
           animate="visible"
         >
           {/* Left - Profile */}
           <motion.div
             className="flex justify-center flex-1"
             variants={fadeIn}
             custom={0.5}
             initial="hidden"
             animate="visible"
           >
             <div className="relative group">
               <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400/20 to-emerald-400/20 blur-xl opacity-70 group-hover:opacity-90 transition" />
               <img
                 src={profile}
                 alt="Saurabh Singh Rajput"
                 className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover
                 border-4 border-teal-400/40 shadow-[0_0_25px_rgba(20,184,166,0.4)]
                 group-hover:shadow-[0_0_40px_rgba(20,184,166,0.6)]
                 transition-all duration-500"
               />
             </div>
           </motion.div>
   
           {/* Right - Text */}
           <motion.div
             className="text-center md:text-left flex-1"
             variants={fadeIn}
             custom={0.3}
             initial="hidden"
             animate="visible"
           >
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 flex flex-col items-center md:items-start">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
               >
                 Hi, I’m{" "}
                 <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">
                   Saurabh Singh Rajput
                 </span>
               </motion.div>
   
               <motion.div
                 key="typing"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8, duration: 1 }}
                 className="mt-3 text-lg sm:text-xl text-emerald-300 font-semibold h-6 sm:h-8"
               >
                 <TypeAnimation />
               </motion.div>
             </h1>
   
             <p className="text-base sm:text-lg text-slate-300 mb-6 leading-relaxed">
               A passionate{" "}
               <span className="text-emerald-300 font-medium">Full Stack Developer</span> &{" "}
               <span className="text-cyan-300 font-medium">AI Enthusiast</span> from{" "}
               <span className="text-emerald-400 font-medium">IIIT Bhagalpur</span>.
               Turning ideas into scalable web experiences & exploring GenAI 🚀
             </p>
   
             <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
               <Button
                 asChild
                 size="lg"
                 className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400
                 text-black font-semibold shadow-[0_0_15px_rgba(20,184,166,0.4)]
                 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]
                 hover:scale-[1.03] transition-transform duration-300"
               >
                 <Link to="/projects">View Projects</Link>
               </Button>
   
               <Button
                 variant="outline"
                 size="lg"
                 className="border-teal-400 text-teal-300 hover:bg-teal-400/10
                 hover:border-teal-300/80 transition-all"
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
   
             <div className="flex gap-6 justify-center md:justify-start">
               <a
                 href="https://github.com/DevSars24"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:scale-110 transition"
               >
                 <Github className="w-6 h-6 text-slate-300 hover:text-teal-300" />
               </a>
               <a
                 href="https://linkedin.com/in/saurabh-singh-rajput-25639a306"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:scale-110 transition"
               >
                 <Linkedin className="w-6 h-6 text-slate-300 hover:text-emerald-300" />
               </a>
             </div>
           </motion.div>
         </motion.div>
   
         {/* Quote Section */}
         <motion.div
           key={currentQuoteIndex}
           className="relative z-10 mt-12 w-[90%] sm:w-[80%] md:w-[70%] 
           backdrop-blur-2xl bg-gradient-to-br from-white/5 to-white/10
           border border-teal-300/20 rounded-2xl p-5 sm:p-6 font-mono text-slate-300
           shadow-[0_0_25px_rgba(20,184,166,0.2)]"
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
           className="relative z-10 mt-10 w-[95%] sm:w-[85%] md:w-[75%] 
           backdrop-blur-md bg-[#0F1724]/60 border border-teal-400/10 
           rounded-xl py-6 px-4 shadow-[0_0_20px_rgba(20,184,166,0.1)]"
           variants={fadeIn}
           custom={1.2}
           initial="hidden"
           animate="visible"
         >
           <h2 className="text-lg sm:text-xl font-semibold text-emerald-300 mb-6 text-center">
             ⚡ My Tech Stack
           </h2>
           <div className="relative flex overflow-x-hidden">
             <motion.div
               className="flex gap-10 py-2"
               animate={{ x: ["0%", "-100%"] }}
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             >
               {[...skills, ...skills].map((icon, index) => (
                 <motion.img
                   key={index}
                   src={icon}
                   alt="tech-icon"
                   className="w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-transform duration-300"
                   animate={{ y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
                   transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                 />
               ))}
             </motion.div>
           </div>
         </motion.div>
   
         {/* Stats Chip */}
         <motion.div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
           <div
             className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-lg 
             bg-gradient-to-r from-[#1E293B]/70 to-[#0F172A]/70
             border border-teal-400/30 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)]"
           >
             <Eye className="w-4 h-4 text-teal-300 animate-pulse" />
             <span className="text-sm text-emerald-100">
               {totalViews.toLocaleString()} Views
             </span>
           </div>
         </motion.div>
       </section>
     );
   };
   
   export default Hero;
   