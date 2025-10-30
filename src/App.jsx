// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { StatsProvider } from "./context/StatsContext";
import PageTransition from "./components/PageTransition";

// ✅ Lazy-loaded components
const Layout = lazy(() => import("./components/ui/Layout"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/AICompanion"));
const WelcomeScreen = lazy(() => import("./components/WelcomeScreen"));

/* ------------------------------- ScrollToTop ------------------------------- */
// ⚡ Keeps the scroll position consistent when navigating routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // No UI needed
}

/* ------------------------------- AppContent ------------------------------- */
function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true);

  // ✅ Preload route chunks when browser is idle (smooth transitions)
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        import("./components/Projects");
        import("./components/About");
        import("./components/AICompanion");
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        import("./components/Projects");
        import("./components/About");
        import("./components/AICompanion");
      }, 1500);
    }
  }, []);

  // ✅ Simple loader
  const Loader = () => (
    <div className="flex items-center justify-center h-screen text-white bg-[#0B1220]">
      <p className="animate-pulse text-lg tracking-wide">Loading...</p>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <Suspense fallback={<Loader />}>
          <WelcomeScreen key="welcome" onFinish={() => setShowWelcome(false)} />
        </Suspense>
      ) : (
        <BrowserRouter>
          <ScrollToTop /> {/* ✅ Inline function now handled locally */}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <Layout />
                  </Suspense>
                }
              >
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Hero />
                    </PageTransition>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PageTransition>
                      <About />
                    </PageTransition>
                  }
                />
                <Route
                  path="/projects/:id?"
                  element={
                    <PageTransition>
                      <Projects />
                    </PageTransition>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------- App Wrapper ------------------------------- */
function App() {
  return (
    <StatsProvider>
      <AppContent />
    </StatsProvider>
  );
}

export default App;
