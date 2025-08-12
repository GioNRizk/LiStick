// src/components/features/Hero.tsx
import React from "react";
import Section from "../ui/Section";
import { ShieldCheck, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  badge?: React.ReactNode;         // <-- was string
  title: React.ReactNode;
  subtitle?: React.ReactNode;      // (optional) accept ReactNode too
  showScrollHint?: boolean;
};

const Hero: React.FC<Props> = ({ badge, title, subtitle, showScrollHint }) => {
  return (
    <Section
      className="relative min-h-[62vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
      container={false}
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {badge && (
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 mb-6 backdrop-blur">
            {typeof badge === "string" ? (
              <>
                <ShieldCheck className="h-5 w-5 text-teal-300" />
                <span className="text-sm text-white/80">{badge}</span>
              </>
            ) : (
              // if you passed a custom element (like your Eye icon block), render it
              <>{badge}</>
            )}
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3">{title}</h1>
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>

      {showScrollHint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/70" />
        </div>
      )}
    </Section>
  );
};

export default Hero;
