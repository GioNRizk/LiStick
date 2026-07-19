import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BatteryCharging,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Cloud,
  Cpu,
  FlaskConical,
  Globe2,
  Layers3,
  MapPin,
  Navigation,
  Network,
  PackageCheck,
  Radio,
  Rocket,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Vibrate,
  Wrench,
} from "lucide-react";
import Hero from "../components/features/Hero";
import Roadmap from "../components/features/Roadmap";
import type { RoadmapItem } from "../components/features/Roadmap";
import CTA from "../components/common/CTA";
import Footer from "../components/common/Footer";
import BackToTop from "../components/ui/BackToTop";
import Section from "../components/ui/Section";
import liIcon from "../assets/images/Li-stick icon.png";

type InfoCard = {
  title: string;
  points: string[];
  icon: LucideIcon;
  status?: string;
};

type PlannedCard = {
  title: string;
  description: string;
  status: "Planned" | "In Progress" | "In Progress / Planned";
  icon: LucideIcon;
  points?: string[];
};

const EVOLUTION_STAGES = [
  {
    name: "Li-Stick V1",
    label: "Archived University Prototype",
    status: "Archived — Implemented and Verified",
    description:
      "The first Li-Stick prototype validated the connected smart-cane concept, obstacle detection, emergency controls, GPS and the initial caregiver application.",
    icon: FlaskConical,
  },
  {
    name: "Li-Stick V2",
    label: "Current Commercial MVP",
    status: "Implemented — Validation Ongoing",
    description:
      "The active V2 platform combines independent ESP32 safety, Raspberry Pi AI and voice guidance, directional vibration, connected caregiver support and a role-based mobile ecosystem.",
    icon: ShieldCheck,
    current: true,
  },
  {
    name: "Li-Stick V3",
    label: "Future Production Platform",
    status: "Future Direction",
    description:
      "The future production generation will focus on custom hardware, manufacturing readiness, wider connectivity, certification and scaled deployment.",
    icon: Rocket,
  },
];

const DELIVERED_CARDS: InfoCard[] = [
  {
    title: "Adaptive Embedded Safety",
    points: ["Three sensing zones", "Sweep-aware detection", "Speed-adaptive thresholds", "Directional vibration"],
    icon: Vibrate,
    status: "Implemented and Verified",
  },
  {
    title: "AI Vision and Voice",
    points: ["Raspberry Pi 5", "Pi Camera V2 NOIR", "Local YOLO recognition", "Offline spoken guidance"],
    icon: Brain,
    status: "Implemented — Optimization and Validation Ongoing",
  },
  {
    title: "Emergency and Motion Safety",
    points: ["Staged fall detection", "SOS emergency flow", "Head-level hazard pattern", "Local safety continues offline"],
    icon: Activity,
    status: "Implemented — Validation Ongoing",
  },
  {
    title: "Connected Caregiver Ecosystem",
    points: ["Live location", "Alerts", "Online/offline awareness", "Activity history"],
    icon: MapPin,
    status: "Implemented — Validation Ongoing",
  },
  {
    title: "Dual Mobile Experience",
    points: ["Visually impaired interface", "Caregiver interface", "Speech and haptics", "Role-based access"],
    icon: Smartphone,
    status: "Implemented — Validation Ongoing",
  },
  {
    title: "Multi-User Architecture",
    points: ["Multi-caregiver", "Multi-cane", "Invite-code access", "QR linking"],
    icon: Users,
    status: "Implemented — Validation Ongoing",
  },
  {
    title: "Wi-Fi Setup and Cloud Integration",
    points: ["Captive-portal provisioning", "Stored credentials", "Automatic reconnect", "Cloudflare and Firebase"],
    icon: Cloud,
    status: "Implemented — Validation Ongoing",
  },
];

const VALIDATION_ITEMS = [
  "Optimizing AI inference speed",
  "Validating AI detection accuracy in the field",
  "Stabilizing navigation instructions",
  "Testing voice quality and speaker output",
  "Calibrating staged fall detection",
  "Tuning ultrasonic warning thresholds",
  "Tuning sweep and walking-speed thresholds",
  "Testing power consumption",
  "Validating battery runtime",
  "Testing indoor, outdoor and crowded environments",
  "Testing app login, logout, linking and access removal",
  "Validating mobile accessibility",
  "Validating Firebase authorization and security",
  "Refining the physical enclosure and wiring",
];

const V2_ROADMAP: PlannedCard[] = [
  {
    title: "LTE and Enhanced GNSS",
    description: "Integrate LTE fallback and finalize a production-ready GNSS/connectivity module.",
    status: "Planned",
    icon: Radio,
  },
  {
    title: "Real Battery Telemetry",
    description: "Replace temporary battery assumptions with measured battery level and runtime information.",
    status: "Planned",
    icon: BatteryCharging,
  },
  {
    title: "Persistent Offline Buffer",
    description: "Store critical unsent events in flash and resend them safely after connectivity returns.",
    status: "Planned",
    icon: Cloud,
  },
  {
    title: "Hardware Integration",
    description: "Move from prototype wiring toward a cleaner, compact electronics architecture.",
    status: "Planned",
    icon: CircuitBoard,
    points: ["PCB development", "Reduced wiring", "Improved connectors", "Production enclosure"],
  },
  {
    title: "Power Optimization",
    description: "Reduce Raspberry Pi and system power consumption while preserving safety functionality.",
    status: "In Progress / Planned",
    icon: BatteryCharging,
  },
  {
    title: "AI Performance Improvement",
    description: "Increase local inference speed and improve model performance through optimized models, resolution and deployment formats.",
    status: "In Progress",
    icon: Cpu,
  },
  {
    title: "Wider User Validation",
    description: "Run structured trials with more visually impaired users and caregivers across varied environments.",
    status: "Planned",
    icon: Users,
  },
  {
    title: "Device Authentication",
    description: "Strengthen production device identity and secure cane-to-cloud authentication.",
    status: "Planned",
    icon: ShieldCheck,
  },
  {
    title: "Pilot Deployment",
    description: "Prepare a controlled pilot with partner organizations and collect structured operational feedback.",
    status: "Planned",
    icon: PackageCheck,
  },
  {
    title: "Regulatory Preparation",
    description: "Prepare product safety, privacy, accessibility and applicable regulatory documentation.",
    status: "Planned",
    icon: CheckCircle2,
  },
];

const V3_DIRECTIONS: InfoCard[] = [
  {
    title: "Integrated Hardware",
    points: ["Custom production-grade electronics", "Compact integrated enclosure", "Modular sensor architecture", "More sustainable materials"],
    icon: CircuitBoard,
    status: "Future Direction",
  },
  {
    title: "Connectivity and Compute",
    points: ["Production LTE/GNSS", "Improved AI accelerator or optimized compute module", "Enhanced low-light vision"],
    icon: Network,
    status: "Future Direction",
  },
  {
    title: "Personalized Assistance",
    points: ["Optional health-monitoring add-ons", "Route personalization", "Predictive mobility assistance"],
    icon: Navigation,
    status: "Future Direction",
  },
  {
    title: "Production and Scale",
    points: ["Improved battery efficiency", "Manufacturing and certification readiness", "Scaled EU and MENA deployment"],
    icon: Globe2,
    status: "Future Direction",
  },
];

const ROADMAP_STAGES: RoadmapItem[] = [
  {
    title: "Stage 1 — V1 Concept Validation",
    desc: "The university prototype established and verified the original smart-cane, emergency, GPS and connected-care concepts.",
    badge: "Completed",
    icon: <CheckCircle2 />,
  },
  {
    title: "Stage 2 — V2 Embedded Safety and Mobile Platform",
    desc: "Independent embedded safety and the role-based mobile ecosystem are built and are moving through integrated validation.",
    badge: "Implemented",
    icon: <ShieldCheck />,
  },
  {
    title: "Stage 3 — AI Vision and Voice Integration",
    desc: "Local vision, navigation decisions and offline spoken guidance are integrated while performance and field behavior are refined.",
    badge: "Implemented — Optimization Ongoing",
    icon: <Brain />,
  },
  {
    title: "Stage 4 — Integrated MVP Validation",
    desc: "Hardware, safety behavior, cloud services, mobile access and accessibility are being tested together across real environments.",
    badge: "In Progress",
    icon: <ScanLine />,
  },
  {
    title: "Stage 5 — LTE, Battery and Hardware Refinement",
    desc: "Connectivity fallback, measured battery telemetry and compact hardware integration remain on the V2 roadmap.",
    badge: "Planned",
    icon: <Wrench />,
  },
  {
    title: "Stage 6 — Pilot Deployment and Regulatory Preparation",
    desc: "A controlled partner pilot and the supporting safety, privacy, accessibility and regulatory documentation are planned.",
    badge: "Planned",
    icon: <PackageCheck />,
  },
  {
    title: "Stage 7 — V3 Production Platform",
    desc: "Longer-term production directions remain subject to technical, user, manufacturing and regulatory validation.",
    badge: "Future",
    icon: <Rocket />,
  },
];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
    <h2 className="bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text pb-1 text-4xl font-black leading-[1.1] text-transparent sm:text-5xl">
      {title}
    </h2>
    <p className="mx-auto mt-5 max-w-3xl text-lg font-light leading-relaxed text-gray-600 md:text-xl">
      {subtitle}
    </p>
  </div>
);

const StatusLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
    {children}
  </span>
);

const FuturePlansPage: React.FC = () => {
  const dynamicTitles = ["Safer", "Smarter", "Connected", "Refined", "Scalable"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTitleIndex((previousIndex) => (previousIndex + 1) % dynamicTitles.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [dynamicTitles.length]);

  return (
    <div className="overflow-x-hidden bg-white text-gray-800">
      <Hero
        badge={<img src={liIcon} alt="Li-Stick" className="h-20 w-auto sm:h-20" />}
        title={
          <div className="leading-[1.15]">
            <span className="mb-2 block sm:mb-3 md:mb-4">Building the Next Chapter.</span>
            <span className="block">
              Becoming{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={dynamicTitles[currentTitleIndex]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                  className="inline bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 bg-clip-text align-baseline text-transparent"
                >
                  {dynamicTitles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        }
        subtitle={
          <p className="mt-4 sm:mt-6 md:mt-8">
            See what V2 delivers today, what is being validated now, and what may shape the future production platform.
          </p>
        }
        showScrollHint
        scrollTargetId="product-evolution"
      />

      <Section id="product-evolution" className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <SectionHeading
          title="From Prototype to Production"
          subtitle="Li-Stick is evolving through clearly defined lifecycle stages, with V2 serving as the current commercial MVP."
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {EVOLUTION_STAGES.map(({ name, label, status, description, icon: Icon, current }) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className={
                current
                  ? "relative rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 p-6 text-white shadow-xl ring-2 ring-blue-300 sm:p-8"
                  : "rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8"
              }
            >
              {current && (
                <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">
                  Current Stage
                </span>
              )}
              <div className={current ? "mb-5 inline-flex rounded-xl bg-white/15 p-3" : "mb-5 inline-flex rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 p-3"}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className={current ? "text-2xl font-black text-white" : "text-2xl font-black text-gray-900"}>{name}</h3>
              <p className={current ? "mt-1 font-semibold text-blue-50" : "mt-1 font-semibold text-blue-700"}>{label}</p>
              <div className="mt-4">
                {current ? (
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">{status}</span>
                ) : (
                  <StatusLabel>{status}</StatusLabel>
                )}
              </div>
              <p className={current ? "mt-5 leading-relaxed text-white/90" : "mt-5 leading-relaxed text-gray-600"}>{description}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section className="bg-white py-16 sm:py-20">
        <SectionHeading
          title="What We Have Already Built"
          subtitle="These capabilities are part of Li-Stick V2 today. They are presented as implemented, with validation status shown where refinement continues."
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DELIVERED_CARDS.map(({ title, points, icon: Icon, status }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-2xl bg-gray-50/75 p-6 shadow-sm ring-1 ring-gray-200/60"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="inline-flex shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  {status && <div className="mt-2"><StatusLabel>{status}</StatusLabel></div>}
                </div>
              </div>
              <ul className="space-y-2 text-gray-600">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <SectionHeading
          title="Currently Being Refined"
          subtitle="The V2 platform is implemented. Current work is focused on refining, validating, tuning, optimizing and testing the integrated MVP."
        />
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 p-3">
                <ScanLine className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Integrated V2 Validation</h3>
            </div>
            <StatusLabel>Implemented — Validation Ongoing</StatusLabel>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
            {VALIDATION_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-white py-16 sm:py-20">
        <SectionHeading
          title="Next Steps for V2"
          subtitle="These are the remaining V2 roadmap items. Planned work is kept separate from capabilities already delivered in the current MVP."
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {V2_ROADMAP.map(({ title, description, status, icon: Icon, points }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
              className="rounded-2xl bg-gray-50/75 p-6 ring-1 ring-gray-200/60 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <StatusLabel>{status}</StatusLabel>
                  </div>
                  <p className="mt-3 leading-relaxed text-gray-600">{description}</p>
                  {points && (
                    <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-r from-blue-50 to-teal-50 py-16 sm:py-20">
        <SectionHeading
          title="Li-Stick V3 — Future Production Platform"
          subtitle="V3 is a longer-term vision rather than a current V2 commitment. These directions may be evaluated and remain subject to technical, user, manufacturing and regulatory validation."
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {V3_DIRECTIONS.map(({ title, points, icon: Icon, status }) => (
            <article key={title} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/60">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 p-3">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              {status && <div className="mt-3"><StatusLabel>{status}</StatusLabel></div>}
              <p className="mt-4 text-sm leading-relaxed text-gray-500">This future platform may include:</p>
              <ul className="mt-3 space-y-2 text-gray-600">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Layers3 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-gray-50 to-white pb-2 pt-16 sm:pt-20">
        <SectionHeading
          title="Roadmap Timeline"
          subtitle="A status-based view of Li-Stick’s evolution, without unapproved completion dates or fixed delivery claims."
        />
      </Section>
      <Roadmap items={ROADMAP_STAGES} />

      <CTA
        title="Co-build the next chapter of Li-Stick"
        subtitle="Interested in pilots, research, or distribution partnerships? Let’s team up."
        primary={{ label: "Join a Pilot", href: "/about" }}
        secondary={{ label: "Contact Partnerships", href: "/about" }}
      />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default FuturePlansPage;
