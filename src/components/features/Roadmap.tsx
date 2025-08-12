import React from "react";
import Section from "../ui/Section";
import { motion } from "framer-motion";

export type RoadmapItem = {
  title: string;
  subtitle?: string;
  desc: string;
  icon?: React.ReactNode;
  badge?: string; // e.g., "R&D", "2025"
};

type Props = {
  items: RoadmapItem[];
};

const Roadmap: React.FC<Props> = ({ items }) => {
  return (
    <Section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-4xl">
        <ol className="relative border-l border-gray-200 pl-5 sm:pl-6">
          {items.map((it, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="mb-10 ml-2"
            >
              {/* dot */}
              <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-white ring-2 ring-blue-600" />
              <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  {it.icon && <div className="mt-0.5">{it.icon}</div>}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{it.title}</h3>
                      {it.badge && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1">
                          {it.badge}
                        </span>
                      )}
                    </div>
                    {it.subtitle && (
                      <p className="text-sm text-gray-500 mt-0.5">{it.subtitle}</p>
                    )}
                    <p className="text-gray-700 mt-2 leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Roadmap;
