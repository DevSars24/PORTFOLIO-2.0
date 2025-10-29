// src/App.jsx (Integrated LearningLab Route)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/ui/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/AICompanion"; // Aliased import - works with <Contact /> in route
 // NEW: Import LearningLab
import WelcomeScreen from "./components/WelcomeScreen";

// Updated import for global stats state
import { StatsProvider } from "./context/StatsContext";

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <WelcomeScreen key="welcome" onFinish={() => setShowWelcome(false)} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects/:id?" element={<Projects />} />
              <Route path="/contact" element={<Contact />} /> {/* Path stays /contact; component is AICompanion */}
           {/*  <Route path="/learning-lab" element={<LearningLab />} /> /* NEW: LearningLab Route */}
            </Route>
          </Routes>
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