import React from "react";
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";
import { Leaf, Handshake, Landmark } from "lucide-react";

// SDG images (put files in src/assets/images/sdgs/)
import sdg3 from "../assets/images/sdgs/sdg3.png";
import sdg9 from "../assets/images/sdgs/sdg9.png";
import sdg10 from "../assets/images/sdgs/sdg10.png";
import sdg11 from "../assets/images/sdgs/sdg11.png";
import sdg17 from "../assets/images/sdgs/sdg17.png";

type SDG = {
  id: number;
  title: string;
  img: string;
  desc: string;
};

const SDGS: SDG[] = [
  { id: 3,  title: "Good Health & Well-Being", img: sdg3,  desc: "Enhancing safety and independence for the visually impaired." },
  { id: 9,  title: "Industry, Innovation & Infrastructure", img: sdg9,  desc: "Building resilient, accessible assistive technology solutions." },
  { id: 10, title: "Reduced Inequalities", img: sdg10, desc: "Empowering underserved and marginalized communities." },
  { id: 11, title: "Sustainable Cities & Communities", img: sdg11, desc: "Supporting inclusive mobility and urban accessibility." },
  { id: 17, title: "Partnerships for the Goals", img: sdg17, desc: "Collaborating with academia, industry, and healthcare." },
];

const ImpactPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO */}
      <Hero
        badge="Impact & Responsibility"
        title={
          <>
            Social and Environmental <span className="text-teal-300">Impact</span>
          </>
        }
        subtitle="LiStick actively contributes to the UN Sustainable Development Goals (SDGs) by promoting inclusive, safe, and sustainable innovation."
        showScrollHint
      />

      {/* INTRO + BULLETS */}
      <Section className="py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Our SDG Alignment
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              We design with people and the planet in mind—prioritizing accessibility,
              safety, and long-term sustainability.
            </p>

            <ul className="space-y-3 text-gray-700 leading-relaxed">
              <li>
                <span className="font-semibold">Goal 3:</span> Good Health and Well-Being — Enhancing safety and independence for the visually impaired.
              </li>
              <li>
                <span className="font-semibold">Goal 9:</span> Industry, Innovation and Infrastructure — Advancing resilient, accessible technology solutions.
              </li>
              <li>
                <span className="font-semibold">Goal 10:</span> Reduced Inequalities — Empowering underserved and marginalized communities.
              </li>
              <li>
                <span className="font-semibold">Goal 11:</span> Sustainable Cities and Communities — Supporting inclusive urban mobility and accessibility.
              </li>
              <li>
                <span className="font-semibold">Goal 17:</span> Partnerships for the Goals — Collaborating with academia, industry, and healthcare providers to scale impact.
              </li>
            </ul>

            <div className="mt-6 flex items-start gap-5 text-gray-600">
              <Leaf className="h-6 w-6 text-green-600 shrink-0" />
              <p>
                We also prioritize eco-friendly materials, recycling programs, and sustainable
                manufacturing practices to minimize our environmental footprint.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SDG GALLERY */}
      <Section className="py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {SDGS.map((g) => (
            <article
              key={g.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 hover:shadow-xl transition-all"
            >
              <img
                src={g.img}
                alt={`SDG ${g.id}: ${g.title}`}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">SDG {g.id}: {g.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{g.desc}</p>
              </div>

              {/* Glow border on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-xl"></div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* PARTNERSHIP STRIP */}
      <Section className="py-14 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Handshake className="h-6 w-6 text-teal-600" />
              <h4 className="font-semibold">Collaborative Pilots</h4>
            </div>
            <p className="text-gray-600">
              Field-testing with NGOs, clinics, and universities to refine user safety and comfort.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Landmark className="h-6 w-6 text-blue-700" />
              <h4 className="font-semibold">Policy & Accessibility</h4>
            </div>
            <p className="text-gray-600">
              Sharing findings with public bodies to support inclusive urban mobility standards.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="h-6 w-6 text-green-700" />
              <h4 className="font-semibold">Sustainable Lifecycle</h4>
            </div>
            <p className="text-gray-600">
              Durable design, modular parts, and recycling programs to extend product life.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTA
        title="Partner with us to scale accessible mobility"
        subtitle="Let’s co-create pilots, research, and standards that move cities—and people—forward."
        primary={{ label: "Start a Pilot", href: "#" }}
        secondary={{ label: "Contact the Team", href: "#" }}
      />
    </div>
  );
};

export default ImpactPage;
