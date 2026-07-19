import React, { useEffect, useState } from "react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BatteryCharging,
  BellRing,
  Check,
  ChevronDown,
  CircleAlert,
  Cloud,
  Droplets,
  ExternalLink,
  HelpCircle,
  Mic,
  Navigation,
  SatelliteDish,
  Shield,
  Smartphone,
  Siren,
  Target,
  Users,
  Volume2,
  Waves,
  Wifi,
  Zap,
} from "lucide-react";

import Hero from "../components/features/Hero";
import AnnotatedImage, { type Hotspot } from "../components/features/AnnotatedImage";
import SplitFeatureSlider from "../components/features/SplitFeatureSlider";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";
import Footer from "../components/common/Footer";
import BackToTop from "../components/ui/BackToTop";

import liStickV2Image from "../assets/images/cane_pic/li-stick-v2-prototype.png";
import pic4 from "../assets/images/cane_pic/pic4.png";
import liIcon from "../assets/images/Li-stick icon.png";
import {
  APP_ROLE_GROUPS,
  CONNECTED_SAFETY_ITEMS,
  V2_EMBEDDED_FEATURES,
  type V2FeatureBlock,
} from "./featuresData";

const V1_HOTSPOTS: Hotspot[] = [
  { x: "11%", y: "4%", label: "Emergency Button", icon: <Siren className="h-4 w-4" /> },
  { x: "14%", y: "10%", label: "Freeze Mode Control", icon: <BellRing className="h-4 w-4" /> },
  { x: "8%", y: "28%", label: "Buzzer", icon: <Volume2 className="h-4 w-4" /> },
  { x: "16%", y: "50%", label: "Five Ultrasonic Sensors", icon: <Waves className="h-4 w-4" /> },
  { x: "47%", y: "20%", label: "Speaker 1", icon: <Volume2 className="h-4 w-4" /> },
  { x: "47%", y: "30%", label: "Speaker 2", icon: <Volume2 className="h-4 w-4" /> },
  { x: "78%", y: "30%", label: "GPS", icon: <SatelliteDish className="h-4 w-4" /> },
  { x: "45%", y: "94%", label: "Water-Level Sensor", icon: <Droplets className="h-4 w-4" /> },
];

const featureGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

const featureTileVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

const v2IconMap: Record<V2FeatureBlock["icon"], LucideIcon> = {
  obstacle: Waves,
  vibration: Activity,
  motion: Navigation,
  sweep: Activity,
  adaptive: Target,
  urgency: CircleAlert,
  stable: Shield,
  head: CircleAlert,
  fall: Siren,
  sos: Siren,
  control: BellRing,
  local: Zap,
};

const V2FeatureGrid: React.FC<{ features: V2FeatureBlock[] }> = ({ features }) => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto"
    variants={featureGridVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
  >
    {features.map((feature) => {
      const Icon = v2IconMap[feature.icon];
      return (
        <motion.article
          key={feature.title}
          variants={featureTileVariants}
          className="group relative overflow-hidden rounded-3xl border border-gray-100/60 bg-gradient-to-br from-gray-50 to-white p-7 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-bl from-blue-100/70 to-transparent blur-2xl" />
          <div className="relative flex items-start gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 shadow-md transition-transform duration-500 group-hover:scale-105">
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                {feature.status && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                    {feature.status}
                  </span>
                )}
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed">{feature.description}</p>
              <ul className="mt-5 space-y-2">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-all duration-500 group-hover:via-blue-400" />
        </motion.article>
      );
    })}
  </motion.div>
);

const AccordionItem: React.FC<{ q: string; a: string; defaultOpen?: boolean }> = ({ q, a, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100/50 transition-all duration-700 hover:shadow-xl">
      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-bl from-white/30 to-transparent blur-2xl" />
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="text-xl font-bold text-gray-900 md:text-2xl">{q}</span>
        <ChevronDown className={`h-6 w-6 shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-lg font-light leading-relaxed text-gray-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
};

const FeaturesPage: React.FC = () => {
  const dynamicTitles = ["Safety", "Guidance", "Confidence", "Reliability", "Accessibility", "Precision"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [activeGroupId, setActiveGroupId] = useState<"blind" | "caregiver">("blind");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((index) => (index + 1) % dynamicTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dynamicTitles.length]);

  const activeGroup = APP_ROLE_GROUPS.find((group) => group.id === activeGroupId) ?? APP_ROLE_GROUPS[0];

  return (
    <div className="overflow-x-hidden bg-white text-gray-800">
      <Hero
        badge={<img src={liIcon} alt="LiStick" className="h-20 w-auto sm:h-20" />}
        title={
          <div className="leading-[1.15]">
            <span className="mb-2 block sm:mb-3 md:mb-4">Built-in Intelligence.</span>
            <span className="block">
              Every day{" "}
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
        subtitle={<p className="mt-4 sm:mt-6 md:mt-8">Explore Li-Stick V2, the archived V1 prototype and the two mobile experiences that connect the safety ecosystem.</p>}
        showScrollHint
        scrollTargetId="v2-mvp"
      />

      <Section id="v2-mvp" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-bl from-teal-200/30 to-transparent blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-blue-700">Current Active Version</p>
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-5xl font-black text-transparent md:text-6xl">
              Li-Stick V2 — Current Commercial MVP
            </h2>
            <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800">
              Implemented — Validation Ongoing
            </span>
            <p className="mt-6 text-xl font-light leading-relaxed text-gray-600">
              Li-Stick V2 is the active safety-first MVP. It combines an independent ESP32 safety controller, Raspberry Pi AI guidance, tactile and voice feedback, cloud connectivity and a role-based mobile ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-gray-700">
              {[
                "ESP32 local safety",
                "Raspberry Pi 5 guidance",
                "Two app roles",
                "Validation ongoing",
              ].map((label) => (
                <span key={label} className="rounded-full border border-blue-100 bg-white/80 px-3 py-2 shadow-sm">{label}</span>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-xl rounded-3xl border border-white/60 bg-white/75 p-6 shadow-2xl"
          >
            <div className="relative aspect-[780/708] overflow-hidden rounded-2xl bg-white">
              <img
                src={liStickV2Image}
                alt="Li-Stick V2 smart cane prototype with integrated electronic enclosure"
                className="h-full w-full object-contain"
                loading="eager"
                width="780"
                height="708"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="embedded-safety" className="py-20 bg-white">
        <div className="mb-14 text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500"><Shield className="h-6 w-6 text-white" /></div>
          <h2 className="mb-6 text-5xl font-black text-gray-900 md:text-6xl">Embedded Safety Intelligence</h2>
          <p className="mx-auto max-w-4xl text-xl font-light text-gray-600 md:text-2xl">Local sensing, motion context and accessible controls keep time-critical safety behavior close to the cane.</p>
        </div>
        <V2FeatureGrid features={V2_EMBEDDED_FEATURES} />
      </Section>

      <Section id="ai-guidance" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500"><Mic className="h-6 w-6 text-white" /></div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-purple-700">Implemented — Optimization and Validation Ongoing</p>
            <h2 className="mb-6 text-5xl font-black text-gray-900 md:text-6xl">Local AI and Voice Guidance</h2>
            <p className="text-xl font-light leading-relaxed text-gray-600">Raspberry Pi guidance complements the local ESP32 safety controller with environmental awareness and offline spoken feedback.</p>
          </div>
          <motion.div
            className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Raspberry Pi 5 co-processor",
                "Pi Camera V2 NOIR",
                "Local YOLO-based visual recognition",
                "Navigation command stabilization",
                "Offline text-to-speech",
                "Dual-speaker audio",
                "UART coordination with ESP32",
                "ESP32 authority for critical safety",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700"><Check className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section id="connected-safety" className="relative overflow-hidden bg-gradient-to-br from-[#4367B0] via-[#4F86C6] to-[#56ABD7] py-20 text-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/30 via-transparent to-transparent" />
        <div className="relative z-10">
          <div className="mb-14 text-center">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500"><Cloud className="h-6 w-6 text-white" /></div>
            <h2 className="mb-6 bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-5xl font-black text-transparent md:text-6xl">Connected Safety Ecosystem</h2>
            <p className="mx-auto max-w-4xl text-xl font-light text-white/80 md:text-2xl">Local safety remains active while the connected system shares the context caregivers need.</p>
          </div>

          <div className="mx-auto mb-12 flex max-w-5xl flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-center">
            {[
              { title: "Li-Stick", text: "Guidance + safety", icon: Shield },
              { title: "Mobile App", text: "Access + alerts", icon: Smartphone },
              { title: "Caregiver", text: "Location + history", icon: Users },
            ].map(({ title, text, icon: Icon }, index) => (
              <React.Fragment key={title}>
                <div className="min-w-0 flex-1 rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                  <Icon className="mx-auto h-8 w-8 text-white" aria-hidden="true" />
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-white/75">{text}</p>
                </div>
                {index < 2 && <span className="hidden text-3xl text-white/70 md:block" aria-hidden="true">→</span>}
              </React.Fragment>
            ))}
          </div>

          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            variants={featureGridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {CONNECTED_SAFETY_ITEMS.map((item) => (
              <motion.div key={item.title} variants={featureTileVariants} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <p className="mx-auto mt-8 max-w-5xl text-center text-sm text-white/70">Planned, not presented as implemented here: LTE fallback, production GNSS replacement, real battery telemetry and persistent offline flash buffering.</p>
        </div>
      </Section>

      <Section id="demo" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="relative z-10">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500"><Zap className="h-6 w-6 text-white" /></div>
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-5xl font-black text-transparent md:text-6xl">Watch the Li-Stick Demo</h2>
            <p className="mx-auto max-w-4xl text-xl font-light leading-relaxed text-gray-600 md:text-2xl">A walkthrough of the cane in action, including navigation alerts, SOS handling and audio guidance.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="mx-auto max-w-5xl">
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-2xl">
              <iframe className="absolute inset-0 h-full w-full" src="https://www.youtube.com/embed/6ahg3lh4aWM?rel=0&modestbranding=1" title="Li-Stick Demo Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            <div className="mt-4 text-center text-sm text-gray-500"><a href="https://www.youtube.com/watch?v=6ahg3lh4aWM" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gray-700 underline underline-offset-4 hover:text-gray-900">Open on YouTube <ExternalLink className="h-4 w-4" /></a></div>
          </motion.div>
        </div>
      </Section>

      <Section id="app-gallery" className="col-span-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500"><Smartphone className="h-6 w-6 text-white" /></div>
          <h2 className="mb-6 text-5xl font-black text-gray-900 md:text-6xl">Mobile Application</h2>
          <p className="mx-auto max-w-4xl text-xl font-light text-gray-600 md:text-2xl">Two connected experiences support independent users and the caregivers they choose to involve.</p>
        </div>

        <div className="mx-auto mb-10 flex max-w-2xl flex-wrap justify-center gap-3" role="tablist" aria-label="Li-Stick mobile application roles">
          {APP_ROLE_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={activeGroupId === group.id}
              aria-controls={`app-panel-${group.id}`}
              onClick={() => setActiveGroupId(group.id)}
              className={`rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeGroupId === group.id ? "bg-gray-900 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-white"}`}
            >
              {group.id === "blind" ? "Visually Impaired User" : "Caregiver"}
            </button>
          ))}
        </div>

        <div id={`app-panel-${activeGroup.id}`} role="tabpanel" aria-label={activeGroup.title}>
          <p className="sr-only" aria-live="polite">Showing {activeGroup.title}: {activeGroup.description}</p>
          <div className="mb-8 text-center"><h3 className="text-3xl font-extrabold text-gray-900 md:text-4xl">{activeGroup.title}</h3><p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">{activeGroup.description}</p></div>
          <SplitFeatureSlider items={activeGroup.slides} interval={4000} autoPlay pauseOnHover showAutoPlayToggle className="max-w-6xl" />
        </div>
      </Section>

      <Section id="app-demo" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent" />
        <div className="relative z-10">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500"><Smartphone className="h-6 w-6 text-white" /></div>
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-5xl font-black text-transparent md:text-6xl">Watch the Mobile App Demo</h2>
            <p className="mx-auto max-w-4xl text-xl font-light leading-relaxed text-gray-600 md:text-2xl">See pairing, live tracking, SOS alerts and real-time notifications in action.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="mx-auto max-w-5xl">
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-2xl"><iframe className="absolute inset-0 h-full w-full" src="https://www.youtube.com/embed/7qM2Hq3_vYI?rel=0&modestbranding=1" title="Li-Stick Mobile App Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
            <div className="mt-4 text-center text-sm text-gray-500"><a href="https://www.youtube.com/watch?v=7qM2Hq3_vYI" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gray-700 underline underline-offset-4 hover:text-gray-900">Open on YouTube <ExternalLink className="h-4 w-4" /></a></div>
          </motion.div>
        </div>
      </Section>

      <Section id="v1-archive" className="py-20 bg-white">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-gray-500 to-gray-700"><BatteryCharging className="h-6 w-6 text-white" /></div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-gray-600">Archived — Initial Academic Prototype</p>
          <h2 className="mb-6 text-5xl font-black text-gray-900 md:text-6xl">Li-Stick V1 — University Prototype Archive</h2>
          <p className="mx-auto max-w-4xl text-xl font-light leading-relaxed text-gray-600">Li-Stick V1 validated the original connected smart-cane concept and established the foundation for the current V2 platform.</p>
        </div>
        <AnnotatedImage
          image={pic4}
          hotspots={V1_HOTSPOTS}
          description="This annotated image belongs to the archived V1 university prototype. It is preserved for historical context and is not the current V2 architecture."
          bullets={[
            { icon: <Waves className="h-6 w-6 text-blue-600" />, title: "Five Ultrasonic Sensors", desc: "The original V1 prototype used five ultrasonic sensing positions." },
            { icon: <Droplets className="h-6 w-6 text-blue-600" />, title: "Water-Level Detection", desc: "Water-level sensing was part of the archived V1 concept." },
            { icon: <Wifi className="h-6 w-6 text-blue-600" />, title: "Infrared Li-Fi Experimentation", desc: "V1 explored infrared Li-Fi and early connected-module communication." },
            { icon: <SatelliteDish className="h-6 w-6 text-blue-600" />, title: "GPS and Early Alerts", desc: "GPS, speakers, a buzzer and SOS handling supported the original concept." },
            { icon: <BellRing className="h-6 w-6 text-blue-600" />, title: "Freeze Mode", desc: "The original caregiver workflow included an accessible Freeze Mode control." },
            { icon: <Users className="h-6 w-6 text-blue-600" />, title: "Original Caregiver Application", desc: "V1 established the early Firebase and IoT relationship between cane and caregiver app." },
          ]}
        />
      </Section>

      <Section id="why-different" className="relative overflow-hidden bg-gradient-to-br from-[#4367B0] via-[#4F86C6] to-[#56ABD7] py-20 text-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/30 via-transparent to-transparent" />
        <div className="relative z-10">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500"><Target className="h-6 w-6 text-white" /></div>
            <h2 className="mb-3 bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-5xl font-black text-transparent md:text-6xl">Current Capability Context</h2>
            <p className="mx-auto max-w-4xl text-xl font-light text-white/80 md:text-2xl">Li-Stick V2 remains an MVP under validation, so comparisons focus on documented current behavior rather than final-market promises.</p>
          </div>
          <div className="mx-auto max-w-6xl overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
              <thead><tr className="text-lg text-white/80"><th className="px-4 py-2 font-semibold">Capability</th><th className="px-4 py-2 font-semibold">Li-Stick V2</th><th className="px-4 py-2 font-semibold">Comparison references</th></tr></thead>
              <tbody>
                {[
                  ["Connectivity", "Wi-Fi setup + Cloudflare/Firebase services", "Not audited in this update"],
                  ["GPS / Navigation", "GPS, live location and accessible navigation support", "Not audited in this update"],
                  ["Obstacle Detection", "Three ultrasonic zones with local directional feedback", "Not audited in this update"],
                  ["SOS and fall handling", "Local event handling with caregiver alert flow", "Not audited in this update"],
                  ["Mobile application", "Separate visually impaired user and caregiver experiences", "Not audited in this update"],
                  ["Lifecycle", "Current Commercial MVP — Validation Ongoing", "Not a final production specification"],
                ].map(([capability, current, reference]) => (
                  <tr key={capability} className="bg-white/90 shadow-2xl">
                    <td className="px-4 py-3 font-medium text-gray-900">{capability}</td>
                    <td className="px-4 py-3 text-gray-800">{current}</td>
                    <td className="px-4 py-3 text-gray-600">{reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="faq" className="relative bg-white py-20">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500"><HelpCircle className="h-6 w-6 text-white" /></div>
          <h2 className="mb-6 text-5xl font-black text-gray-900 md:text-6xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-4xl text-xl font-light text-gray-600 md:text-2xl">Answers to common questions about Li-Stick’s current MVP, accessibility and connected support.</p>
        </div>
        <motion.div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2" variants={featureGridVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {[
            { q: "Does Li-Stick work offline?", a: "Local obstacle detection and vibration continue without internet. Cloud alerts, live location and caregiver synchronization depend on available connectivity and may be queued." },
            { q: "What is the current product status?", a: "Li-Stick V2 is the current Commercial MVP. Core capabilities are implemented, with optimization, testing and validation ongoing." },
            { q: "Is the mobile app split by role?", a: "Yes. The current app provides separate experiences for visually impaired users and caregivers, including navigation, voice actions, access management, alerts and history." },
            { q: "Can caregivers receive alerts?", a: "The connected workflow supports SOS, fall and cane-status events. Delivery and live location depend on available Wi-Fi or cloud connectivity." },
            { q: "How does privacy work?", a: "The current firmware includes camera privacy and pause controls, while access relationships determine which caregiver data can be viewed." },
            { q: "Is LTE or a production GNSS fallback implemented?", a: "No. LTE fallback and production GNSS replacement remain planned items rather than current V2 capabilities." },
          ].map((item) => <motion.div key={item.q} variants={featureTileVariants}><AccordionItem q={item.q} a={item.a} /></motion.div>)}
        </motion.div>
      </Section>

      <CTA
        title="Help us make independent mobility safer."
        subtitle="Explore the current MVP, review the archived prototype and connect with the Li-Stick team."
        primary={{ label: "Request a demo", href: "/contact" }}
        secondary={{ label: "Contact the team", href: "/contact" }}
      />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default FeaturesPage;
