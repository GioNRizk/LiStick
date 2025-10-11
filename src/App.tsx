// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import ScrollToTop from "./components/common/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"; // ✅ function import

// Pages
import HomePage from "./pages/home";
import About from "./pages/About";
import FeaturesPage from "./pages/features";
import ImpactPage from "./pages/impact";
import FuturePlansPage from "./pages/futureplans";

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <Header />
    <main data-scroll-root>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/future" element={<FuturePlansPage />} />
        <Route path="/contact" element={<Navigate to="/about#contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>

    {/* ✅ Run analytics + speed insights only in production */}
    {import.meta.env.MODE === "production" && (
      <>
        <Analytics />
        {SpeedInsights({})} {/* ✅ TypeScript-safe call */}
      </>
    )}
  </Router>
);

export default App;
