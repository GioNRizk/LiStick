// src/components/common/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/images/Li-stick icon.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" }, // add video of stick, screenshots of mobile app and video of mobile app at the end see the future plans
  { name: "Impact", href: "/impact" },  // correct the SDG impact, add the traction that we have of the competitions
  { name: "Future Plans", href: "/future" },  // what we will build the new cane with the features and mobile app new features
  { name: "About Us", href: "/about" },  // add about how the story started with simple contact form, email, social media links
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "px-4 sm:px-6 py-1 transition-all duration-300 ease-out",
          "bg-white/85 backdrop-blur-md border-b border-black/5",
          isScrolled ? "shadow-md" : "shadow-none",
        ].join(" ")}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between">

          <Link
            to="/"
            className="group flex flex-shrink-0 items-center gap-0"
          >
            <img
              src={logo}
              alt="LiStick Logo"
              className="block h-10 w-auto -mr-3 sm:h-12 md:h-14 lg:h-16 transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="
      leading-none tracking-tight text-gray-800 font-bold whitespace-nowrap
      text-xl sm:text-2xl md:text-3xl lg:text-3xl
    "
            >
              Li-Stick
            </span>
          </Link>



          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group relative py-2 font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-blue-500 to-teal-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="relative h-10 w-10 rounded-full bg-gray-100/80 transition-colors duration-300 hover:bg-gray-200/80 lg:hidden"
            aria-label="Toggle menu"
          >
            <FiMenu
              className={`absolute inset-0 m-auto h-5 w-5 text-gray-700 transition-all duration-300 ${
                isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <FiX
              className={`absolute inset-0 m-auto h-5 w-5 text-gray-700 transition-all duration-300 ${
                isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu (links only) */}
      <div
        className={[
          "fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0",
          "flex items-center justify-center p-4",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={[
            "relative w-full max-w-sm rounded-2xl bg-white/90 p-6 shadow-xl transition-all duration-500 ease-out",
            "overflow-y-auto max-h-[90vh]",
            isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          ].join(" ")}
        >
          <div className="mb-8 text-center">
            <h3 className="text-xl font-bold text-gray-800">Navigation</h3>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500" />
          </div>

          <nav className="flex flex-col items-center space-y-3">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => {
                  // Close menu and scroll to top instantly when navigating
                  setIsMenuOpen(false);
                  navigate(link.href);
                  window.scrollTo(0, 0);
                }}
                className="w-full rounded-lg py-3 text-center text-lg font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

    </>
  );
};

export default Header;
