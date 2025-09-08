// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";

// Pages
import HomePage from './pages/Home';
import About from "./pages/About";
import FeaturesPage from "./pages/features";
import ImpactPage from "./pages/impact";
import FuturePlansPage from "./pages/futureplans";

const App: React.FC = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        {/* Home is now "/" */}
        <Route path="/" element={<HomePage />} />

        {/* Core pages */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/future" element={<FuturePlansPage />} />

        {/* Contact is now part of About → jump to #contact */}
        <Route path="/contact" element={<Navigate to="/about#contact" replace />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </Router>
);

export default App;
