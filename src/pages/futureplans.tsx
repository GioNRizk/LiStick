import React from "react";
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";
import Roadmap from "../components/features/Roadmap";
import type { RoadmapItem } from "../components/features/Roadmap";
import { Brain, Activity, Globe2, Puzzle, Rocket, Sparkles } from "lucide-react";

const ITEMS: RoadmapItem[] = [
  {
    title: "AI-Powered 3D Vision Navigation",
    subtitle: "Depth sensing • Real-time scene understanding",
    desc:
      "Integrate 3D cameras with on-device AI to detect obstacles, curbs, stairs, moving objects, and free-space with higher confidence—especially in cluttered or low-light environments.",
    icon: <Brain className="h-6 w-6 text-blue-600" />,
    badge: "R&D 2025",
  },
  {
    title: "Health Monitoring Suite",
    subtitle: "Heart rate • Activity • Fall detection",
    desc:
      "Add lightweight sensors to track vitals and motion. Abnormal readings or potential falls trigger subtle alerts to the user and optional notifications to caregivers.",
    icon: <Activity className="h-6 w-6 text-rose-600" />,
    badge: "Pilot",
  },
  {
    title: "MENA & Underserved Markets Expansion",
    subtitle: "Local partnerships • Arabic UI • Support network",
    desc:
      "Partner with NGOs, clinics, and universities to run accessibility pilots, train local support teams, and tailor UX (language, voice prompts) for regional needs.",
    icon: <Globe2 className="h-6 w-6 text-emerald-600" />,
    badge: "Go-to-Market",
  },
  {
    title: "Modular Premium Editions",
    subtitle: "Add-on ecosystem",
    desc:
      "Design a modular accessory rail with snap-in add-ons like extra battery, haptic handle, Li-Fi beacon, or indoor positioning module—so users only pay for what they need.",
    icon: <Puzzle className="h-6 w-6 text-indigo-600" />,
    badge: "Design",
  },
];

const FuturePlansPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO */}
      <Hero
        badge="Roadmap"
        title={
          <>
            Future <span className="text-teal-300">Plans</span>
          </>
        }
        subtitle="A glimpse at what we’re building next—smarter navigation, proactive health insights, and wider access."
        showScrollHint
      />

      {/* INTRO CARD */}
      <Section className="py-10 sm:py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Rocket className="h-7 w-7 text-blue-600 shrink-0" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  What’s coming to LiStick
                </h2>
                <p className="text-gray-600">
                  Our roadmap focuses on impact and reliability. We’re evolving LiStick into
                  an intelligent companion—with spatial awareness, wellness insights, and
                  modular hardware options tailored to different budgets and needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ROADMAP TIMELINE */}
      <Roadmap items={ITEMS} />

      {/* HIGHLIGHTS STRIP */}
      <Section className="py-12 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h4 className="font-semibold">On-Device AI</h4>
            </div>
            <p className="text-gray-600">
              Edge models tuned for low power, fast wake-up, and privacy-preserving inference.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Globe2 className="h-6 w-6 text-emerald-600" />
              <h4 className="font-semibold">Regional Adaptation</h4>
            </div>
            <p className="text-gray-600">
              Language packs, right-to-left layouts, and local voices for natural guidance.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Puzzle className="h-6 w-6 text-indigo-600" />
              <h4 className="font-semibold">Modular Ecosystem</h4>
            </div>
            <p className="text-gray-600">
              Accessories and APIs so communities can extend LiStick for new use cases.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTA
        title="Co-build the next chapter of LiStick"
        subtitle="Interested in pilots, research, or distribution partnerships? Let’s team up."
        primary={{ label: "Join a Pilot", href: "#" }}
        secondary={{ label: "Contact Partnerships", href: "#" }}
      />
    </div>
  );
};

export default FuturePlansPage;
