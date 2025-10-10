// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
import HomePage from "./pages/home";
import About from "./pages/About";
import FeaturesPage from "./pages/features";
import ImpactPage from "./pages/impact";
import FuturePlansPage from "./pages/futureplans";

const App: React.FC = () => (
  <Router>
    <ScrollToTop /> {/* ensures INSTANT scroll to top on route changes */}
    <Header />
    {/* If your app uses a scrolling container, keep data-scroll-root */}
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
  </Router>
);

export default App;
