// src/components/Projects.jsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ChevronRight, FolderOpen, Star } from "lucide-react";
import categories from "../data/categories.json"; // ✅ Dynamic data import

// ---------------- Badge ----------------
const Badge = ({ children, className }) => (
  <span className={`px-2 py-1 rounded-md bg-slate-700/50 text-slate-300 text-xs lg:text-sm ${className || ""}`}>
    {children}
  </span>
);

const colorMap = {
  "cyan-400": "text-cyan-400",
  "emerald-400": "text-emerald-400",
  "pink-400": "text-pink-400",
  "purple-400": "text-purple-400",
};

// ---------------- Animations ----------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
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

// ---------------- Project Card ----------------
const ProjectCard = React.memo(({ project, color }) => (
  <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.03, rotate: 1 }} className="group">
    <Card className={`relative h-full bg-slate-800/70 backdrop-blur-md border ${project.featured ? 'border-yellow-500/50' : 'border-slate-700/40'} hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 p-6 lg:p-8`}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
      <div className="relative z-10 flex flex-col h-full">
        <CardHeader className="p-0 flex items-center justify-between pb-4">
          <CardTitle className="text-lg lg:text-xl font-semibold text-slate-200 leading-tight">
            {project.title}
          </CardTitle>
          {project.featured && <Star className="w-5 h-5 text-yellow-500" aria-label="Featured Project" />}
        </CardHeader>

        <CardContent className="flex-grow p-0 pb-4 text-slate-300 text-sm lg:text-base leading-relaxed">
          <p>{project.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <Badge key={idx}>{tech}</Badge>
            ))}
          </div>
          <p className="mt-3 text-xs lg:text-sm text-slate-400">
            Status: <span className={`font-medium ${colorMap[color]}`}>{project.status}</span>
          </p>
          <p className="text-xs lg:text-sm text-slate-400">Last Updated: {project.lastUpdated}</p>
          <p className="text-xs lg:text-sm text-slate-400">Difficulty: {project.difficulty}</p>
        </CardContent>

        <CardFooter className="p-0 pt-4 flex gap-2">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs lg:text-sm shadow-sm hover:shadow-cyan-500/25"
          >
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center">
              <Github className="w-4 h-4 mr-2" /> GitHub
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          {project.demoLink !== "#" && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60 text-xs lg:text-sm focus-visible:ring-2 focus-visible:ring-cyan-400"
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

// ---------------- Main Component ----------------
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

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-start py-12 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
      role="main"
      aria-label="Projects Section"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Header */}
      <motion.header
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        variants={containerVariants}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-200 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="mt-3 text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Explore my journey across Frontend, Backend, and GenAI — built with passion and precision.
        </p>
      </motion.header>

      {/* Category Grid */}
      {!activeCategory && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {categories
            .filter((cat) =>
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
                whileHover={{ y: -6, scale: 1.03 }}
                onClick={() => setActiveCategory(cat)}
                className="cursor-pointer group"
                role="button"
                aria-label={`Select ${cat.title} category`}
              >
                <Card className="bg-slate-800/70 backdrop-blur-md border border-slate-700/40 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 p-6 text-center">
                  <FolderOpen className={`mx-auto w-10 h-10 mb-3 ${colorMap[cat.color]}`} />
                  <h2 className={`text-lg md:text-xl font-semibold ${colorMap[cat.color]}`}>{cat.title}</h2>
                  <p className="text-slate-400 text-sm mt-2">{cat.description}</p>
                  <p className="text-xs text-slate-500 mt-1">({cat.projects.length} projects)</p>
                </Card>
              </motion.div>
            ))}
        </motion.div>
      )}

      {/* Active Category */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-6xl mt-10"
          >
            <Button
              onClick={() => setActiveCategory(null)}
              variant="outline"
              className="mb-6 bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60 text-sm"
            >
              ← Back to Categories
            </Button>

            <motion.h2
              className={`text-3xl font-bold text-center mb-8 ${colorMap[activeCategory.color]} flex items-center justify-center`}
            >
              {activeCategory.title.split("").map((char, index) => (
                <motion.span key={index} custom={index} variants={typingVariants} initial="hidden" animate="visible">
                  {char}
                </motion.span>
              ))}
              <motion.span
                variants={cursorVariants}
                animate="blink"
                className="inline-block w-1 h-6 bg-cyan-400 ml-1"
              />
            </motion.h2>

            <motion.p
              className="text-base text-slate-300 text-center max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory.description} ({filteredProjects.length} projects)
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} color={activeCategory.color} />
                ))
              ) : (
                <p className="text-center text-slate-400 col-span-full">
                  No projects match your search or filter.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
