import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import About from "./pages/About";
import FeaturesPage from "./pages/features";
import ImpactPage from "./pages/impact";
import FuturePlansPage from "./pages/futureplans";
import ContactPage from "./pages/contact";

const App: React.FC = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        {/* send root to About */}
        <Route path="/" element={<Navigate to="/about" replace />} />

        <Route path="/about" element={<About />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/future" element={<FuturePlansPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* catch-all → About */}
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </main>
  </Router>
);

export default App;
