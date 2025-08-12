// src/components/common/CTA.tsx
import React from "react";
import Section from "../ui/Section";

type Props = {
  title: string;
  subtitle?: string;
  primary?: { label: string; onClick?: () => void; href?: string };
  secondary?: { label: string; onClick?: () => void; href?: string };
};

const CTA: React.FC<Props> = ({ title, subtitle, primary, secondary }) => {
  const Primary = () =>
    primary ? (
      primary.href ? (
        <a href={primary.href} className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
          {primary.label}
        </a>
      ) : (
        <button onClick={primary.onClick} className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
          {primary.label}
        </button>
      )
    ) : null;

  const Secondary = () =>
    secondary ? (
      secondary.href ? (
        <a href={secondary.href} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
          {secondary.label}
        </a>
      ) : (
        <button onClick={secondary.onClick} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
          {secondary.label}
        </button>
      )
    ) : null;

  return (
    <Section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white" container>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
        {subtitle && <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Primary />
          <Secondary />
        </div>
      </div>
    </Section>
  );
};

export default CTA;
