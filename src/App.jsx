// src/App.jsx (Updated AppContent)
import React, { Suspense, lazy, useState, useEffect, useLayoutEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { StatsProvider } from "./context/StatsContext";
import PageTransition from "./components/PageTransition";

// Lazy components (unchanged)
const Layout = lazy(() => import("./components/ui/Layout"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/AICompanion"));
const WelcomeScreen = lazy(() => import("./components/WelcomeScreen"));

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [contentMounted, setContentMounted] = useState(false);
  const mainRef = useRef(null); // NEW: Ref for height stability check

  // Preload (unchanged)
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        import("./components/About");
        import("./components/Projects");
        import("./components/AICompanion");
      });
    } else {
      setTimeout(() => {
        import("./components/About");
        import("./components/Projects");
        import("./components/AICompanion");
      }, 1500);
    }
  }, []);

  // UPDATED: Enhanced mount check – poll for stable document height (no more jumps)
  useEffect(() => {
    if (!showWelcome && mainRef.current) {
      let prevHeight = 0;
      let stableCount = 0;
      const checkStability = () => {
        const currentHeight = document.documentElement.scrollHeight;
        if (Math.abs(currentHeight - prevHeight) < 1) { // Height unchanged
          stableCount++;
          if (stableCount >= 3) { // 3 polls stable
            setContentMounted(true);
            return;
          }
        } else {
          stableCount = 0;
        }
        prevHeight = currentHeight;
      };
      checkStability();
      const interval = setInterval(checkStability, 50); // Poll ~200ms max
      return () => clearInterval(interval);
    }
  }, [showWelcome]);

  // UPDATED: Sync scroll post-stabilization (useLayoutEffect + instant behavior)
  useLayoutEffect(() => {
    if (!showWelcome && contentMounted) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // Force snap recalc (if CSS snap is active)
      if (mainRef.current) {
        mainRef.current.style.scrollSnapType = "y mandatory";
      }
    }
  }, [showWelcome, contentMounted]);

  const Loader = () => (
    <div className="flex items-center justify-center h-screen text-white bg-[#0B1220]">
      <p className="animate-pulse text-lg tracking-wide">Loading...</p>
    </div>
  );

  return (
    <AnimatePresence mode={contentMounted ? "popLayout" : "wait"} initial={false}> {/* Fallback to popLayout post-mount */}
      {showWelcome ? (
        <Suspense fallback={<Loader />}>
          <WelcomeScreen key="welcome" onFinish={() => setShowWelcome(false)} />
        </Suspense>
      ) : (
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Layout key="main">
              <PageTransition>
                <main 
                  ref={mainRef}
                  className="scroll-smooth relative h-full" // Ensure full height context
                >
                  <section id="home" className="snap-start min-h-screen"> {/* Added min-h-screen for consistency */}
                    <Hero />
                  </section>
                  <section id="about" className="min-h-screen snap-start">
                    <About />
                  </section>
                  <section id="projects" className="min-h-screen snap-start">
                    <Projects />
                  </section>
                  <section id="contact" className="min-h-screen snap-start">
                    <Contact />
                  </section>
                </main>
              </PageTransition>
            </Layout>
          </BrowserRouter>
        </Suspense>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <StatsProvider>
      <AppContent />
    </StatsProvider>
  );
}

export default App;