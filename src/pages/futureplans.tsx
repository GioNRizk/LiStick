/* The above code is a TypeScript React component that represents a page for showcasing future plans
for a project called LiStick. Here is a breakdown of what the code is doing: */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";
import Roadmap from "../components/features/Roadmap";
import type { RoadmapItem } from "../components/features/Roadmap";
import liIcon from "../assets/images/Li-stick icon.png";
import {
  Brain,
  Globe2,
  Puzzle,
  Wifi,
  AlertTriangle,
  Speaker,
  Battery,
  HeartPulse,
  Smartphone,
  Lightbulb,
  Rocket,
  Sparkles,
  DollarSign,
  Target,
  PieChart,
  MapPin,
  Tv,
  Megaphone,
  Users,
  Wrench,
  Handshake,
  ShoppingBag,
} from "lucide-react";
import Footer from "../components/common/Footer";
import BackToTop from "../components/ui/BackToTop";


const ITEMS: RoadmapItem[] = [
  {
    title: "Vision-Based Obstacle Detection",
    subtitle: "OCULI smart sensor • AI scene analysis • Dual-camera setup",
    desc:
      "Replace traditional ultrasonic sensors with intelligent vision sensors capable of detecting both ground-level and head-level obstacles. The onboard AI interprets scenes and guides the user through audio or tactile feedback for safer navigation.",
    icon: <Brain />,
    badge: "Core MVP",
  },
  {
    title: "Li-Fi, GSM/LTE, and Wi-Fi Connectivity",
    subtitle: "Indoor + outdoor communication • Real-time alerts",
    desc:
      "Expand beyond Li-Fi by adding GSM/LTE and Wi-Fi modules, ensuring continuous location tracking, SOS alerts, and cloud connectivity even when the user moves outside Li-Fi coverage zones.",
    icon: <Wifi />,
    badge: "Connectivity",
  },
  {
    title: "Smart Voice & Audio Feedback System",
    subtitle: "Dual speakers • Bluetooth earphones • Accessibility voice prompts",
    desc:
      "Upgrade from basic MP3 alerts to intelligent voice feedback that adapts to context. Includes Bluetooth audio for private listening, and verbal notifications like 'Obstacle ahead' or 'Battery low'.",
    icon: <Speaker />,
    badge: "UX Upgrade",
  },
  {
    title: "Emergency & Safety Intelligence",
    subtitle: "Double-press SOS • Caregiver call sequence • App alert",
    desc:
      "Improve the existing emergency button so a single press sends location alerts, while a double press automatically calls caregivers in preset order if unanswered—offering faster response during crises.",
    icon: <AlertTriangle />,
    badge: "Safety",
  },
  {
    title: "Fall & Health Monitoring",
    subtitle: "Gyroscope + Heart-Rate sensors • Real-time alerts",
    desc:
      "Add fall detection and heart-rate monitoring using motion and biosensors. The system automatically notifies caregivers with the user’s live location and timestamp when irregularities are detected.",
    icon: <HeartPulse />,
    badge: "Health",
  },
  {
    title: "Enhanced GPS & Location Awareness",
    subtitle: "Accurate live tracking • Self-location voice mode",
    desc:
      "Integrate a faster GPS chip and app-based live tracking. The cane announces its location at startup, and users can request a voice-spoken update anytime (‘You are in Beirut Downtown, 10:30 AM’).",
    icon: <Globe2 />,
    badge: "Navigation",
  },
  {
    title: "LED Visibility & Flashlight System",
    subtitle: "Night safety • Camera lighting support",
    desc:
      "Add high-power LED indicators for better visibility at night and an integrated flashlight to improve camera performance in dark environments, inspired by aircraft wing lights.",
    icon: <Lightbulb />,
    badge: "Visibility",
  },
  {
    title: "Upgraded Power & Battery Design",
    subtitle: "High-capacity 20 000 mAh • Smart energy routing",
    desc:
      "Upgrade to a robust, rechargeable PD power bank capable of supporting Raspberry Pi 5, ESP32, sensors, and LEDs simultaneously, ensuring long operation without frequent charging.",
    icon: <Battery />,
    badge: "Hardware",
  },
  {
    title: "App Ecosystem Expansion",
    subtitle: "Caregiver dashboard • Live camera view • Alerts & history",
    desc:
      "Expand the mobile app to show real-time map tracking, emergency pins, and camera feed from the cane. Introduce caregiver multi-device management and a premium subscription tier.",
    icon: <Smartphone />,
    badge: "Software",
  },
  {
    title: "Modular Premium Editions",
    subtitle: "Snap-in accessories • Custom configurations",
    desc:
      "Design a modular cane with an accessory rail that allows add-ons like extended batteries, Li-Fi beacon modules, or haptic handles. Users can personalize features based on their budget and lifestyle.",
    icon: <Puzzle />,
    badge: "Design",
  },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix?: string }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500; // 1.5 seconds
    const increment = (end - start) / (duration / 16);

    const step = () => {
      start += increment;
      if (start < end) {
        setCount(parseFloat(start.toFixed(1)));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
  }, [value]);

  return (
    <span>
      ${count.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      })}
      {suffix}
    </span>
  );
};


const FuturePlansPage: React.FC = () => {
  const dynamicTitles = ["Smarter", "Safer", "Healthier", "Modular", "Global"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % dynamicTitles.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, [dynamicTitles.length]);

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO */}
      <Hero
        badge={<img src={liIcon} alt="LiStick" className="h-20 sm:h-20 w-auto" />}
        title={
          <div className="leading-[1.15]">
            <span className="block mb-2 sm:mb-3 md:mb-4">Building a Future.</span>
            <span className="block">
              That's{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={dynamicTitles[currentTitleIndex]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                  className="inline align-baseline bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 bg-clip-text text-transparent"
                >
                  {dynamicTitles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        }
        subtitle={
          <p className="mt-4 sm:mt-6 md:mt-8">
            A glimpse at what we’re building next—smarter navigation, proactive
            health insights, and wider access.
          </p>
        }
        showScrollHint
        scrollTargetId="roadmap-intro"

      />

      {/* INTRO CARD */}
      <Section id="roadmap-intro" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl mb-6">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-transparent leading-[1.1] pb-1">
            What’s Coming to LiStick
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            Our roadmap focuses on impact and reliability. We’re evolving LiStick
            into an intelligent companion—with spatial awareness, wellness
            insights, and modular hardware options tailored to different budgets
            and needs.
          </p>
        </div>
      </Section>

      {/* STRATEGY & MARKET SECTION */}
      <Section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* HEADER */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-transparent leading-[1.1] pb-1">
              Strategy & Market Opportunity
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              We're building a sustainable business by addressing a critical global need with a scalable, hybrid revenue model and a focused go-to-market strategy.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BUSINESS MODEL CARD */}
            <div className="rounded-2xl bg-gray-50/75 ring-1 ring-gray-200/50 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl text-white">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Business Model</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Our business model is built on four complementary revenue streams designed for accessibility and long-term sustainability:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-blue-500">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">B2C:</strong> Direct device sales through online and retail stores, reaching individual visually impaired users.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-teal-500">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">B2B:</strong> Partnerships with hospitals, pharmacies, NGOs, and associations for the visually impaired.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-purple-500">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">Subscription Model:</strong> AI-powered mobile app features for caregivers, including tracking, alerts, and analytics.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-amber-500">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">Maintenance:</strong> Li-Stick hardware maintenance and periodic service plans to ensure reliability and customer trust.
                  </div>
                </li>
              </ul>
            </div>

            {/* GO-TO-MARKET CARD */}
            <div className="rounded-2xl bg-gray-50/75 ring-1 ring-gray-200/50 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl text-white">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Go-To-Market Strategy</h3>
              </div>
              <p className="text-gray-600 mb-6">
                We’re launching regionally with a strong community-driven and partnership-based approach:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-blue-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">Pilot Programs:</strong> Launch in Lebanon through blind associations and medical centers before scaling to MENA and global markets.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-teal-500">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">Social Media & Awareness:</strong> Campaigns leveraging influencer partnerships, NGOs, and accessibility communities.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-purple-500">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">CSR & Sponsorship:</strong> Collaborations with corporations, foundations, and institutions promoting inclusion.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-amber-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-semibold">Direct Sales & Partnerships:</strong> Community onboarding, referral incentives, and retail expansion.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* MARKET OPPORTUNITY (with animated counters) */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-blue-800 to-teal-800 bg-clip-text text-transparent leading-[1.1] pb-1">
                Market Opportunity
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                The global assistive technology market exceeds $31B, with a $5–6B segment focused on visual impairment.
                Our initial focus is the MENA region, representing 37.2 million visually impaired individuals.
                With a 2% market penetration goal, we aim to reach 744,000 users — a $223M opportunity.
              </p>
            </div>

            {/* Animated Counter Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {/* TAM */}
              <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
                <Globe2 className="mx-auto h-7 w-7 text-blue-500 mb-2" />
                <h4 className="font-bold text-gray-800">TAM</h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-2xl font-black text-blue-900 mt-1"
                >
                  <AnimatedCounter value={31} suffix="B" />
                </motion.p>
                <p className="text-xs text-gray-500 mt-1">Global Assistive Technology Market</p>
              </div>

              {/* SAM */}
              <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
                <Target className="mx-auto h-7 w-7 text-teal-600 mb-2" />
                <h4 className="font-bold text-gray-800">SAM</h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-2xl font-black text-teal-900 mt-1"
                >
                  <AnimatedCounter value={5.5} suffix="B" />
                </motion.p>
                <p className="text-xs text-gray-500 mt-1">Global Visual Impairment AT Market</p>
              </div>

              {/* SOM */}
              <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
                <PieChart className="mx-auto h-7 w-7 text-purple-600 mb-2" />
                <h4 className="font-bold text-gray-800">SOM</h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-2xl font-black text-purple-900 mt-1"
                >
                  <AnimatedCounter value={223.2} suffix="M" />
                </motion.p>
                <p className="text-xs text-gray-500 mt-1">
                  MENA Region (~37.2M visually impaired, 2% penetration → 744K users)
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
        primary={{ label: "Join a Pilot", href: "/about" }}
        secondary={{ label: "Contact Partnerships", href: "/about" }}
      />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default FuturePlansPage;
