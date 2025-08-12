// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import "./styles/main.css";

// Pages
import About from "./pages/About";
import FeaturesPage from "./pages/features";       // ← make sure this file exists
import ImpactPage from "./pages/impact";           // ← make sure this file exists
import FuturePlansPage from "./pages/futureplans"; // ← corrected "future plans"
import ContactPage from "./pages/contact";         // ← new contact page

// Simple Home placeholder (replace when ready)


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/About" element={<About />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/future" element={<FuturePlansPage />} />      {/* Future Plans */}
            <Route path="/contact" element={<ContactPage />} />         {/* Contact Us */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
