import React from "react";
import Section from "../ui/Section";
import { motion, useInView } from "framer-motion";

export type RoadmapItem = {
  title: string;
  subtitle?: string; // e.g., "OCULI smart sensor • AI scene analysis"
  desc: string | React.ReactNode;
  icon?: React.ReactNode;
  badge?: string; // e.g., "R&D", "2025"
};

type Props = {
  items: RoadmapItem[];
};

// A single roadmap entry with animation controlled by its viewport visibility
const RoadmapEntry: React.FC<{ item: RoadmapItem; isLeft: boolean }> = ({ item, isLeft }) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };


  return (
    <li ref={ref} className="relative mb-10">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className={`flex items-start gap-4 sm:gap-6 ${isLeft ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Card */}
        <div className={`w-full lg:w-1/2 ${isLeft ? "lg:text-right" : ""}`}>
          <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 p-5 sm:p-6">
            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${isLeft ? "lg:justify-end" : ""}`}>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900">{item.title}</h3>
              {item.badge && (
                <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1">
                  {item.badge}
                </span>
              )}
            </div>
            {item.subtitle && (
              <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
            )}
            {typeof item.desc === "string" ? (
              <p className="text-gray-700 mt-3 leading-relaxed">{item.desc}</p>
            ) : (
              <div className="text-gray-700 mt-3 leading-relaxed">{item.desc}</div>
            )}
          </div>
        </div>

        {/* Timeline Connector */}
        <div className="hidden lg:flex w-1/2 items-center gap-4">
          <div className="h-0.5 w-full bg-gray-200" />
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-60" />
            <div className="relative h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 shadow-md flex items-center justify-center">
              {item.icon &&
                React.isValidElement(item.icon) &&
                React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                  className: "h-6 w-6 text-white",
                })}
            </div>
          </div>
        </div>

        {/* Mobile Icon (replaces timeline connector) */}
        <div className="lg:hidden shrink-0 mt-1">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-50" />
            <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 shadow-md flex items-center justify-center">
              {item.icon &&
                React.isValidElement(item.icon) &&
                React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                  className: "h-6 w-6 text-white",
                })}
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
};

const Roadmap: React.FC<Props> = ({ items }) => {
  return (
    <Section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative mx-auto max-w-5xl px-4">
        {/* Central timeline bar - visible on large screens */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-300 to-transparent hidden lg:block"
        />

        <ol className="relative">
          {items.map((it, i) => (
            <RoadmapEntry key={i} item={it} isLeft={i % 2 === 0} />
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Roadmap;
