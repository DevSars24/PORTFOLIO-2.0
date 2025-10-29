import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // FIXED: Import Badge from Shadcn/UI
import { Github, ChevronRight, FolderOpen, Star, BookOpen, Brain, Code, Zap } from "lucide-react";
import categories from "../data/categories.json"; // NEW: Import categories from JSON for easy future updates

const colorMap = {
  "cyan-400": "text-cyan-400",
  "emerald-400": "text-emerald-400",
  "pink-400": "text-pink-400",
  "purple-400": "text-purple-400",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }, // Slightly longer duration for smoother feel
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

const searchBarVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: { width: "100%", opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const learningCardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProjectCard = React.memo(({ project, color }) => (
  <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.03, rotate: 1 }} className="group">
    <Card className={`relative h-full bg-slate-800/70 backdrop-blur-md border ${project.featured ? 'border-yellow-500/50' : 'border-slate-700/40'} hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 p-6 lg:p-8`}> {/* FIXED: Increased padding for larger cards */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
      <div className="relative z-10 flex flex-col h-full">
        <CardHeader className="p-0 flex items-center justify-between pb-4">
          <CardTitle className="text-lg lg:text-xl font-semibold text-slate-200 leading-tight"> {/* Larger title */}
            {project.title}
          </CardTitle>
          {project.featured && <Star className="w-5 h-5 text-yellow-500" aria-label="Featured Project" />}
        </CardHeader>
        <CardContent className="flex-grow p-0 pb-4 text-slate-300 text-sm lg:text-base leading-relaxed"> {/* Larger text */}
          <p>{project.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2"> {/* Increased mt for breathing room */}
            {project.techStack.map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="bg-slate-700/50 text-slate-300 text-xs lg:text-sm"> {/* FIXED: Badge now imported/defined */}
                {tech}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-xs lg:text-sm text-slate-400">Status: <span className={`font-medium ${colorMap[color]}`}>{project.status}</span></p>
          <p className="text-xs lg:text-sm text-slate-400">Last Updated: {project.lastUpdated}</p>
          <p className="text-xs lg:text-sm text-slate-400">Difficulty: {project.difficulty}</p>
        </CardContent>
        <CardFooter className="p-0 pt-4 flex gap-2">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs lg:text-sm shadow-sm hover:shadow-cyan-500/25 focus-visible:ring-2 focus-visible:ring-cyan-400" // Larger text
            aria-label={`View ${project.title} on GitHub`}
          >
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center">
              <Github className="w-4 h-4 mr-2" />
              GitHub
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          {project.demoLink !== "#" && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60 text-xs lg:text-sm focus-visible:ring-2 focus-visible:ring-cyan-400" // Larger text
              aria-label={`View live demo of ${project.title}`}
            >
              <a href={project.demoLink} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  </motion.div>
));

const LearningCard = ({ learning, icon: Icon, color }) => (
  <motion.div variants={learningCardVariants} className="group" whileHover={{ y: -2, scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
    <Card className={`bg-slate-800/50 backdrop-blur-md border border-slate-700/40 hover:border-${color}-500/50 transition-all duration-300 shadow-md hover:shadow-${color}-500/20 p-4 lg:p-6 overflow-hidden`}> {/* Larger padding */}
      <div className="flex items-start gap-3">
        <motion.div 
          className={`p-2 rounded-lg bg-gradient-to-br from-${color}-500/10 to-${color}-500/20 flex-shrink-0 relative overflow-hidden`}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Icon className={`w-5 h-5 ${colorMap[color]}`} />
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-r from-${color}-400/20 to-transparent`}
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <motion.p 
          className="text-sm lg:text-base text-slate-300 leading-relaxed flex-grow group-hover:text-white transition-colors"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {learning.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.1 }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <motion.span
            className="inline-block w-0.5 h-4 bg-slate-300 ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.p>
      </div>
    </Card>
  </motion.div>
);

export default function Projects() {
  const [activeCategory, setActiveCategory] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");

  const filteredProjects = activeCategory
    ? activeCategory.projects.filter(
        (project) =>
          (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))) &&
          (statusFilter === "All" || project.status === statusFilter)
      )
    : [];

  const allLearnings = categories.map(cat => ({ ...cat, filteredLearnings: cat.learnings.filter(l => 
    l.toLowerCase().includes(searchQuery.toLowerCase())
  ) })).filter(cat => cat.filteredLearnings.length > 0);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
      role="main"
      aria-label="Projects Section"
    >
      {/* Animated background with particles */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Header */}
      <motion.header
        className="text-center mb-8 sm:mb-10 md:mb-12 px-3 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        variants={containerVariants}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-slate-200 via-cyan-300 to-purple-300 bg-clip-text text-transparent tracking-tight text-shadow-sm">
          My Projects
        </h1>
        <p className="mt-2 sm:mt-3 text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Explore my journey across Frontend, Backend, GenAI, and ML — crafted with precision & creativity.
        </p>
      </motion.header>

    
      {/* Category Selector */}
      {!activeCategory && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {categories
            .filter(
              (cat) =>
                cat.projects.some(
                  (project) =>
                    (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))) &&
                    (statusFilter === "All" || project.status === statusFilter)
                )
            )
            .map((cat) => (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                className="cursor-pointer group"
                role="button"
                aria-label={`Select ${cat.title} category`}
              >
                <Card className="relative bg-slate-800/70 backdrop-blur-md border border-slate-700/40 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 p-4 sm:p-6 text-center">
                  <FolderOpen className={`mx-auto w-8 sm:w-10 h-8 sm:h-10 mb-2 sm:mb-3 ${colorMap[cat.color]}`} />
                  <h2 className={`text-base sm:text-lg md:text-xl font-semibold ${colorMap[cat.color]}`}>
                    {cat.title}
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">{cat.description}</p>
                  <p className="text-xs text-slate-500 mt-1">({cat.projects.length} projects)</p>
                </Card>
              </motion.div>
            ))}
        </motion.div>
      )}

      {/* Projects for Selected Category */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-6xl mt-8 sm:mt-10"
          >
            {/* Back Button */}
            <Button
              onClick={() => setActiveCategory(null)}
              variant="outline"
              className="mb-6 sm:mb-8 bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60 text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Back to project categories"
            >
              ← Back to Categories
            </Button>

            {/* Category Header with Typing Animation */}
            <motion.h2
              className={`text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 ${colorMap[activeCategory.color]} flex items-center justify-center`}
              aria-label={activeCategory.title}
            >
              {activeCategory.title.split("").map((char, index) => (
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

            {/* Category Description */}
            <motion.p
              className="text-sm sm:text-base text-slate-300 text-center max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory.description} ({filteredProjects.length} projects)
            </motion.p>

            {/* Project Cards - Larger Grid Gap */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" // FIXED: Increased gaps for more space
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} color={activeCategory.color} />
                ))
              ) : (
                <p className="text-center text-slate-400 col-span-full">No projects match your search or filter.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INNOVATIVE: Enhanced Global Learnings Section with Typing Animations & Dynamic Effects */}
      <motion.section
        className="relative z-10 w-full max-w-6xl mt-12 sm:mt-16 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 bg-gradient-to-r from-slate-200 via-emerald-300 to-purple-300 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <BookOpen className="inline-block w-8 h-8 mr-2 mb-1 animate-pulse" />
          What I Learned
          <motion.span
            className="inline-block ml-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            ✨
          </motion.span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {allLearnings.map((cat, catIdx) => (
            <motion.div 
              key={cat.id} 
              variants={cardVariants}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`bg-slate-800/50 backdrop-blur-md border border-slate-700/40 p-6 lg:p-8 rounded-2xl overflow-hidden relative`}>
                {/* Category Header with Glow Effect */}
                <motion.div 
                  className="flex items-center gap-3 mb-4 relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-br from-${cat.color}-500/10 to-${cat.color}-500/20 relative overflow-hidden flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {cat.id === "frontend" && <Code className={`w-6 h-6 ${colorMap[cat.color]} relative z-10`} />}
                    {cat.id === "backend" && <Zap className={`w-6 h-6 ${colorMap[cat.color]} relative z-10`} />}
                    {cat.id === "genai" && <Brain className={`w-6 h-6 ${colorMap[cat.color]} relative z-10`} />}
                    {cat.id === "ml" && <Zap className={`w-6 h-6 ${colorMap[cat.color]} relative z-10`} />}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r from-${cat.color}-400/30 to-transparent rounded-xl`}
                      animate={{ x: ["-100%", "100%", "-100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  <motion.h3 
                    className={`text-lg lg:text-xl font-semibold ${colorMap[cat.color]} relative`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {cat.title}
                    <motion.span
                      className={`inline-block w-2 h-2 bg-${cat.color}-400 rounded-full ml-2`}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.h3>
                </motion.div>
                {/* Staggered Learning Cards with Typing */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    className="space-y-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                      hidden: {}
                    }}
                  >
                    {cat.filteredLearnings.map((learning, idx) => (
                      <LearningCard
                        key={`${cat.id}-${idx}`}
                        learning={learning}
                        icon={cat.id === "frontend" ? Code : cat.id === "backend" ? Zap : Brain}
                        color={cat.color.replace("-400", "")}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
                {cat.filteredLearnings.length === 0 && (
                  <motion.p 
                    className="text-center text-slate-400 italic mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    No learnings match your search. Try broadening it!
                  </motion.p>
                )}
                {/* Innovative Floating Elements */}
                <motion.div 
                  className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-full blur-xl"
                  animate={{ 
                    rotate: [0, 360], 
                    scale: [1, 1.2, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ zIndex: 0 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </section>
  );
}