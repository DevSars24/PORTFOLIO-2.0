/* --------------------------------------------------------------------------
   About.jsx — Noir Aurora Pro (Violet × Pink × Cyan Glow)
   Designed & Refined by Saurabh Singh Rajput | IIIT Bhagalpur
   Inspired by modern UI/UX portfolios (Framer, Dribbble, Vercel)
   -------------------------------------------------------------------------- */

   import { motion } from "framer-motion";
   import { Button } from "@/components/ui/button";
   import { Github, Linkedin, Code, Award, BookOpen, Brain } from "lucide-react";
   import profile from "../assets/profile.png";
   
   const About = () => {
     // Animations
     const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { 
          staggerChildren: 0.01,   // was 0.25 — tighter now
          delayChildren: 0.001,     // was 0.05 — starts quicker
        },
      },
    };
    
    const fadeIn = {
      hidden: { opacity: 0, y: 20 }, // smaller offset for smoother entrance
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" }, // was 0.6 — snappier
      },
    };
    
    const float = {
      hidden: { opacity: 0, scale: 0.96 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 15, 
          duration: 0.3, // subtle bounce
        },
      },
    };
    
    const typing = {
      hidden: { opacity: 0, x: -5 }, // smaller shift
      visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.015, duration: 0.1 }, // faster typing effect
      }),
    };
    
    const blink = {
      blink: { 
        opacity: [1, 0, 1], 
        transition: { duration: 0.4, repeat: Infinity } // quicker blink rate
      },
    };
    
  
     const MotionButton = motion.create(Button);
   
     const headingText = "About Me";
     const nameText = "Saurabh Singh Rajput";
     const quoteText =
       "Designing intelligent, expressive, and efficient systems through curiosity, code, and creativity — blending logic with aesthetics for digital innovation.";
   
     return (
       <section
         id="about"
         className="relative min-h-screen flex items-center justify-center overflow-hidden
         bg-[radial-gradient(circle_at_30%_20%,#030014_0%,#0A0118_100%)]
         text-[#E2E8F0] px-6 sm:px-10 md:px-12 py-20"
       >
         {/* --- Ambient Glow Layers --- */}
         <motion.div
           className="absolute -top-40 right-[-15%] w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-500/20 via-violet-500/20 to-transparent blur-[160px]"
           animate={{ opacity: [0.4, 0.6, 0.4], y: [0, 30, 0] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div
           className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tr from-cyan-400/20 via-pink-400/15 to-transparent blur-[180px]"
           animate={{ scale: [1, 1.05, 1] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
         />
   
         <motion.div
           className="relative z-10 max-w-6xl w-full"
           variants={containerVariants}
           initial="hidden"
           animate="visible"
         >
           {/* Heading */}
           <motion.h2
             className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center 
             bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-tight"
           >
             {headingText.split("").map((char, i) => (
               <motion.span key={i} custom={i} variants={typing}>
                 {char}
               </motion.span>
             ))}
             <motion.span
               variants={blink}
               animate="blink"
               className="inline-block w-1 h-6 bg-pink-400 ml-1"
             />
           </motion.h2>
   
           {/* Profile Grid */}
           <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
             {/* --- Image --- */}
             <motion.div
               variants={float}
               className="flex justify-center md:justify-start relative"
             >
               <div className="group relative">
                 <motion.div
                   className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-400/25 via-pink-400/20 to-transparent blur-3xl"
                   animate={{ opacity: [0.3, 0.6, 0.3] }}
                   transition={{ duration: 6, repeat: Infinity }}
                 />
                 <img
                   src={profile}
                   alt="Saurabh Singh Rajput"
                   className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover 
                   border-4 border-violet-500/40 shadow-[0_0_60px_rgba(168,85,247,0.4)]
                   group-hover:shadow-[0_0_90px_rgba(236,72,153,0.5)] transition-all duration-700"
                 />
               </div>
             </motion.div>
   
             {/* --- Info --- */}
             <motion.div variants={fadeIn} className="text-center md:text-left space-y-6">
               <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                 {nameText.split("").map((char, i) => (
                   <motion.span key={i} custom={i} variants={typing}>
                     {char}
                   </motion.span>
                 ))}
                 <motion.span
                   variants={blink}
                   animate="blink"
                   className="inline-block w-1 h-6 bg-fuchsia-400 ml-1"
                 />
               </h3>
   
               <motion.blockquote
                 className="text-slate-300/90 text-base sm:text-lg md:text-xl italic font-light border-l-4 border-fuchsia-400 pl-5 leading-relaxed relative"
                 variants={fadeIn}
               >
                 <motion.div
                   className="absolute inset-0 bg-fuchsia-500/5 rounded-md"
                   animate={{ opacity: [0.3, 0.6, 0.3] }}
                   transition={{ duration: 3, repeat: Infinity }}
                 />
                 {quoteText}
               </motion.blockquote>
   
               <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                 I’m a 2nd-year CSE student at{" "}
                 <span className="text-fuchsia-400 font-medium">IIIT Bhagalpur</span>, building
                 modern web experiences using the{" "}
                 <span className="text-violet-400 font-medium">MERN Stack</span> and exploring{" "}
                 <span className="text-cyan-400 font-medium">GenAI</span>. Passionate about{" "}
                 <span className="text-pink-400 font-medium">System Design</span>, backend, and
                 DevOps — turning abstract ideas into beautiful, functional systems.
               </p>
   
               {/* Skills */}
               <motion.div variants={fadeIn}>
                 <h4 className="text-lg sm:text-xl font-semibold mb-3 text-fuchsia-400 flex items-center gap-2">
                   <Brain className="w-5 h-5" /> Skills & Expertise
                 </h4>
                 <ul className="space-y-2 text-slate-300/90 text-sm sm:text-base">
                   {[
                     "Full Stack Development (MERN Stack)",
                     "Generative AI & Machine Learning",
                     "System Design & Backend Engineering",
                     "DevOps & Cloud Infrastructure",
                     "Competitive Programming (LeetCode, GFG)",
                   ].map((skill, i) => (
                     <motion.li
                       key={i}
                       custom={i}
                       variants={fadeIn}
                       whileHover={{
                         x: 6,
                         color: "#EC4899",
                         transition: { type: "spring", stiffness: 150 },
                       }}
                       className="flex items-center gap-2"
                     >
                       • {skill}
                     </motion.li>
                   ))}
                 </ul>
               </motion.div>
             </motion.div>
           </div>
   
           {/* --- Social Links --- */}
           <motion.div variants={fadeIn} className="mt-16">
             <h4 className="text-center text-2xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-8">
               Connect With Me
             </h4>
             <motion.div
               className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 justify-center"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
             >
               {[
                 { href: "https://github.com/DevSars24", icon: Github, label: "GitHub" },
                 { href: "https://codolio.com/profile/sars", icon: Code, label: "Codolio" },
                 { href: "http://linkedin.com/in/saurabh-singh-rajput-25639a306", icon: Linkedin, label: "LinkedIn" },
                 { href: "https://www.geeksforgeeks.org/user/saurabhsinvqv3/", icon: Award, label: "GFG" },
                 { href: "https://leetcode.com/u/VXGxeHwq/", icon: Code, label: "LeetCode" },
                 { href: "https://hashnode.com/@saurabh465", icon: BookOpen, label: "Hashnode" },
               ].map(({ href, icon: Icon, label }, i) => (
                 <MotionButton
                   key={i}
                   asChild
                   variant="outline"
                   whileHover={{
                     scale: 1.08,
                     y: -3,
                     boxShadow: "0 8px 25px rgba(236,72,153,0.35)",
                   }}
                   whileTap={{ scale: 0.95 }}
                   className="flex flex-col items-center justify-center gap-2 h-auto py-6 bg-[#12001E]/50 
                   backdrop-blur-lg border border-fuchsia-400/40 hover:bg-fuchsia-500/15 
                   hover:border-fuchsia-400/60 text-slate-200 hover:text-fuchsia-400 
                   rounded-xl transition-all duration-300"
                 >
                   <a href={href} target="_blank" rel="noopener noreferrer">
                     <Icon className="w-6 h-6 mb-1 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                     <span className="text-sm font-medium">{label}</span>
                   </a>
                 </MotionButton>
               ))}
             </motion.div>
           </motion.div>
         </motion.div>
       </section>
     );
   };
   
   export default About;
   