/**
 * The above TypeScript React code defines a functional component called CTA (Call to Action) that
 * displays a title, subtitle, and primary/secondary action buttons in a styled section.
 * @property {string} title - The `title` property in the CTA component represents the main heading or
 * title of the Call to Action section. It is a required property and must be a string value. This
 * title is typically displayed prominently at the top of the CTA section to grab the user's attention
 * and convey the main message
 * @property {string} subtitle - The `subtitle` property in the `CTA` component is a string that
 * represents an optional additional text displayed below the main title. It provides further context
 * or information related to the call-to-action being presented on the component.
 * @property primary - The `primary` property in the CTA component represents the primary
 * call-to-action button or link that can be displayed. It includes the following attributes:
 * @property secondary - The `secondary` property in the CTA component is an optional object that can
 * have the following properties:
 */
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
