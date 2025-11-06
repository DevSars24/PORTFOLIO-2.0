// src/components/ui/Layout.jsx
import React from "react";
import Navbar from "../Navbar"; // Assuming you import it here

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B1220]"> {/* Dark bg for consistency */}
      <Navbar />
      <div className="pt-20 md:pt-16"> {/* ✅ pt-20 for mobile (taller nav + safe), pt-16 desktop. Adjust based on your nav height (py-4 ~4rem + borders) */}
        {children}
      </div>
      {/* Optional: Footer here if not in a separate component */}
    </div>
  );
}