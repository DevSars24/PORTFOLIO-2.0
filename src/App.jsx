// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { StatsProvider } from "./context/StatsContext";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

// ✅ Lazy-loaded components
const Layout = lazy(() => import("./components/ui/Layout"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/AICompanion"));
const WelcomeScreen = lazy(() => import("./components/WelcomeScreen"));

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true);

  // ✅ Preload route chunks when browser is idle (for smoother route transitions)
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        import("./components/Projects");
        import("./components/About");
        import("./components/AICompanion");
      });
    } else {
      // fallback for older browsers
      setTimeout(() => {
        import("./components/Projects");
        import("./components/About");
        import("./components/AICompanion");
      }, 1500);
    }
  }, []);

  // ✅ Simple loader
  const Loader = () => (
    <div className="flex items-center justify-center h-screen text-white">
      Loading...
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
          <ScrollToTop /> {/* ✅ smooth scroll restore */}
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

function App() {
  return (
    <StatsProvider>
      <AppContent />
    </StatsProvider>
  );
}

export default App;
