// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async"; // ✅ For SEO
import Layout from "./components/ui/Layout";
import { StatsProvider } from "./context/StatsContext";
import WelcomeScreen from "./components/WelcomeScreen";

// ✅ Lazy-loaded pages for faster initial load
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/AICompanion"));
// const LearningLab = lazy(() => import("./components/LearningLab")); // Uncomment if using later

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <WelcomeScreen key="welcome" onFinish={() => setShowWelcome(false)} />
      ) : (
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen text-cyan-400 text-xl animate-pulse">
                🚀 Loading Portfolio...
              </div>
            }
          >
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <>
                      <HelmetProvider>
                        <meta name="description" content="Saurabh Singh Rajput | MERN Developer and AI Enthusiast Portfolio" />
                        <title>Saurabh Singh Rajput | Portfolio</title>
                      </HelmetProvider>
                      <Hero />
                    </>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/projects/:id?" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                {/* <Route path="/learning-lab" element={<LearningLab />} /> */}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <StatsProvider>
        <AppContent />
      </StatsProvider>
    </HelmetProvider>
  );
}

export default App;
