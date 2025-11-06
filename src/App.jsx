// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { StatsProvider } from "./context/StatsContext";
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

  // ✅ Preload other sections in background
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

  // ✅ Loader Component (global for smoother feel)
  const Loader = () => (
    <div className="flex items-center justify-center h-screen text-white bg-[#0B1220]">
      <p className="animate-pulse text-lg tracking-wide">Loading...</p>
    </div>
  );

  return (
    <AnimatePresence mode="wait" initial={false}> {/* ✅ initial={false} prevents duplicate entry anims */}
      {showWelcome ? (
        <Suspense fallback={<Loader />}>
          <WelcomeScreen key="welcome" onFinish={() => setShowWelcome(false)} />
        </Suspense>
      ) : (
        <Suspense fallback={<Loader />}>
          <BrowserRouter> {/* ✅ Move inside if needed, but keep here for full-app routing */}
            <Layout key="main"> {/* ✅ Key ensures clean unmount/remount */}
              <PageTransition>
                <main className="scroll-smooth relative"> {/* ✅ relative for any abs pos inside */}
                  {/* ✅ Full-page scrollable structure – add snap if wanted */}
                  <section id="home" className="snap-start"> {/* snap-start for smooth scroll-snaps */}
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

/* ------------------------------- App Wrapper ------------------------------- */
function App() {
  return (
    <StatsProvider>
      <AppContent />
    </StatsProvider>
  );
}

export default App;