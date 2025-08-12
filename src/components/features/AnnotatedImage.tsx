// src/components/features/AnnotatedImage.tsx
import React from "react";
import Section from "../ui/Section";

export type Hotspot = {
  x: string; // "%" left
  y: string; // "%" top
  label: string;
  icon?: React.ReactNode;
};

type Props = {
  image: string;
  title?: string;
  description?: string;
  bullets?: Array<{ icon?: React.ReactNode; title: string; desc?: string }>;
  hotspots: Hotspot[];
  imageMaxWidth?: number; // px
};

const AnnotatedImage: React.FC<Props> = ({
  image,
  title = "Hardware at a Glance",
  description = "Hover or focus the markers to learn about each module.",
  bullets = [],
  hotspots,
  imageMaxWidth = 560,
}) => {
  return (
    <Section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-8">{description}</p>

          <ul className="space-y-4">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 flex items-center justify-center">{b.icon}</div>
                <div>
                  <p className="font-semibold">{b.title}</p>
                  {b.desc && <p className="text-gray-600">{b.desc}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="relative mx-auto" style={{ maxWidth: imageMaxWidth }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/15 to-teal-500/15 rounded-3xl blur-2xl"></div>
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl">
              <img src={image} alt="Annotated device" className="w-full h-auto object-contain" />
              {hotspots.map((h, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: h.x, top: h.y, transform: "translate(-50%, -50%)" }}
                >
                  <div className="group relative">
                    <button
                      className="h-4 w-4 rounded-full bg-white shadow ring-2 ring-blue-500 hover:scale-110 transition-transform focus:outline-none focus:ring-4"
                      aria-label={h.label}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-6 z-10 w-max -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="rounded-xl bg-gray-900 text-white text-xs px-3 py-2 shadow-lg whitespace-nowrap flex items-center gap-2">
                        {h.icon}
                        <span>{h.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Don’t line up perfectly? Tweak the <code>x</code>/<code>y</code> percentages.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AnnotatedImage;
