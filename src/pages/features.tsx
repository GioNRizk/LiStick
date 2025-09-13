// src/pages/FeaturesPage.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { type SlideItem as BaseSlideItem } from "../components/features/GallerySlider";
import { Link } from "react-router-dom";

import Hero from "../components/features/Hero";
import AnnotatedImage, { type Hotspot } from "../components/features/AnnotatedImage";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";
import Footer from "../components/common/Footer";
import BackToTop from "../components/ui/BackToTop";

import {
  ExternalLink,
  Zap,
  // Hardware bullets
  Siren,
  BellRing,
  Volume2,
  SatelliteDish,
  Waves,
  Droplets,
  Wifi,
  BatteryCharging,
  // Feature Highlights cards
  HelpCircle,
  ChevronDown,
  Smartphone
} from "lucide-react";

import pic4 from "../assets/images/cane_pic/pic4.png";
import liIcon from "../assets/images/Li-stick icon.png";

import apppic1 from "../assets//images/app_pic/app pic (1).png";
import apppic2 from "../assets//images/app_pic/app pic (2).png";
import apppic3 from "../assets//images/app_pic/app pic (3).png";
import apppic4 from "../assets//images/app_pic/app pic (4).png";
import apppic5 from "../assets//images/app_pic/app pic (5).png";
import apppic6 from "../assets//images/app_pic/app pic (6).png";
import apppic7 from "../assets//images/app_pic/app pic (7).png";
import apppic8 from "../assets//images/app_pic/app pic (8).png";
import apppic9 from "../assets//images/app_pic/app pic (9).png";
import apppic10 from "../assets//images/app_pic/app pic (10).png";
import apppic11 from "../assets//images/app_pic/app pic (11).png";
import apppic12 from "../assets//images/app_pic/app pic (12).png";
import SplitFeatureSlider from "../components/features/SplitFeatureSlider";

const HOTSPOTS: Hotspot[] = [ // This is a constant, so it should be outside the component
  { x: "11%", y: "4%", label: "Emergency Button", icon: <Siren className="h-4 w-4" /> },
  { x: "14%", y: "10%", label: "Mute Button", icon: <BellRing className="h-4 w-4" /> },
  { x: "8%", y: "28%", label: "Buzzer", icon: <Volume2 className="h-4 w-4" /> },
  { x: "16%", y: "50%", label: "Ultrasonic Sensors", icon: <Waves className="h-4 w-4" /> },
  { x: "47%", y: "20%", label: "Speaker 1", icon: <Volume2 className="h-4 w-4" /> },
  { x: "47%", y: "30%", label: "Speaker 2", icon: <Volume2 className="h-4 w-4" /> },
  { x: "78%", y: "30%", label: "GPS", icon: <SatelliteDish className="h-4 w-4" /> },
  { x: "45%", y: "94%", label: "Water Sensor", icon: <Droplets className="h-4 w-4" /> },
];

type SlideWithBullets = BaseSlideItem & { bullets?: string[] };

// Keep this array OUTSIDE of render (module scope or useMemo) to avoid recreating it:
const ITEMS: SlideWithBullets[] = [
  {
    src: apppic12,
    title: "Secure Login",
    caption: "Sign in to monitor the stick and access caregiver tools.",
    bullets: ["Email + password", "Forgot password flow", "Link to create account"]
  },
  {
    src: apppic11,
    title: "Create Account",
    caption: "Register a caregiver profile in a few quick steps.",
    bullets: ["Name, username, email", "Password setup", "Age & gender selection"]
  },
  {
    src: apppic2,
    title: "Account Profile",
    caption: "Review personal details and manage access.",
    bullets: ["Edit profile info", "Reset password", "Logout anytime", "Delete account"]
  },
  {
    src: apppic10,
    title: "Location History",
    caption: "See every recorded location at a glance.",
    bullets: ["Google Maps link per entry", "Date & time stamps", "Requester/Caregiver shown", "Offline/Online Status", "Location export options", "Filter records", "Map view per location"]
  },
  {
    src: apppic9,
    title: "Map View",
    caption: "Power tools right on the map toolbar to view location histories on a map",
    bullets: ["Full Screen Button", "My Location view", " Maps navigation options", "Location export options"]
  },
  {
    src: apppic7,
    title: "Map View — Standard in full screen mode",
    caption: "Visualize recorded locations on a clean map.",
    bullets: ["Pin clustering", "Pan & zoom", "Quick overview of movement", "My Location view", "Switch map style button"]
  },
  {
    src: apppic8,
    title: "Map View — Satellite in full scree mode",
    caption: "Switch to satellite imagery for more context.",
    bullets: ["Terrain details", "Landmarks visible", "Same pins, richer view", "My Location view", "Switch map style button"]
  },
  {
    src: apppic6,
    title: "Location Details",
    caption: "Open precise directions or share instantly or toggle between locations",
    bullets: ["Exact date & time", "Requester type", "Open in Google Maps (Driving Mode)", "Share location"]
  },
  {
    src: apppic5,
    title: "Filter Records",
    caption: "Narrow results to what matters now.",
    bullets: ["Date & time range", "Requester filter", "Ascending / descending order"]
  },
  {
    src: apppic3,
    title: "Export Single Entry",
    caption: " Download or share just one location record.",
    bullets: ["Choose format per item", "Lightweight, focused export", "Quick share to your contacts to get to the visually impaired"]
  },
  {
    src: apppic4,
    title: "Export Options",
    caption: "Take the data with you in the format you prefer.",
    bullets: ["Excel (.xlsx)", "PDF (.pdf)", "Text file (.txt)", "Text message"]

  },
  {
    src: apppic1,
    title: "Offline Message",
    caption: "Get a clear notice when you try to request a location and Li-Stick was offline.",
    bullets: ["Explains the issue", "Prompts to try again when online"]
  }
];

const featuresGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16, // spacing between tiles
      delayChildren: 0.12,   // wait before first tile starts
      when: "beforeChildren",
    },
  },
};
const featureTileVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

// Reusable accordion item
const AccordionItem: React.FC<{ q: string; a: string; defaultOpen?: boolean }> = ({ q, a, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100 rounded-3xl p-0 hover:shadow-xl transition-all duration-700 overflow-hidden">
      {/* soft highlight blob */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/30 to-transparent rounded-full blur-2xl pointer-events-none" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
          {q}
        </span>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "tween", duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.span>
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
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
};

const FeaturesPage: React.FC = () => {
  // Define dynamicTitles and currentTitleIndex within the component or import them if they are global
  const dynamicTitles = ["Safety", "Guidance", "Confidence", "Reliability", "Accessibility", "Precision"]; // Example definition
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0); // Example definition

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % dynamicTitles.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (

    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO — shared component, consistent height with other pages */}
      <Hero
        badge={<img src={liIcon} alt="LiStick" className="h-20 sm:h-20 w-auto" />}
        title={
          <div className="leading-[1.15]">
            {/* Line 1 */}
            <span className="block mb-2 sm:mb-3 md:mb-4">
              Built-in Intelligence.
            </span>

            {/* Line 2 */}
            <span className="block">
              Every day{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={dynamicTitles[currentTitleIndex]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                  className="
            inline align-baseline
            bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500
            bg-clip-text text-transparent
          "
                >
                  {dynamicTitles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        }

        subtitle={
          <p className="mt-4 sm:mt-6 md:mt-8">
            Explore the hardware and software that power LiStick—engineered for
            independence, safety, and confidence.
          </p>
        }
        showScrollHint
        scrollTargetId="hardware"


      />

      <Section id="intro" className="py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Li-Stick blends smart hardware with a companion mobile app to deliver safer, more confident mobility.
            Explore the on-cane modules, live alerts, GPS-based SOS, and a clean, accessible app experience.
          </p>
        </div>
      </Section>


      {/* Hardware Section */}
      <Section id='hardware'>
        <AnnotatedImage
          image={pic4}
          hotspots={HOTSPOTS}
          description="Hover the markers to learn about each component. These modules work together to detect obstacles, share location and communicate with the app."
          bullets={[
            { icon: <Siren className="h-6 w-6 text-blue-600" />, title: "Emergency Button", desc: "Instant SOS with live GPS for caregivers. The speaker will play 'Location sent successfully' if the cane was connected to the internet." },
            { icon: <BellRing className="h-6 w-6 text-blue-600" />, title: "Mute Button", desc: "Pause motion feedback for safe stops and conversation with others." },
            { icon: <Volume2 className="h-6 w-6 text-blue-600" />, title: "Dual Speakers & Buzzer", desc: "Clear audio alerts for hazards." },
            { icon: <SatelliteDish className="h-6 w-6 text-blue-600" />, title: "GPS Module", desc: "Reliable positioning for tracking & SOS." },
            { icon: <Waves className="h-6 w-6 text-blue-600" />, title: "Ultrasonic Sensors", desc: "Detects near/mid-range obstacles in 5 directions." },
            { icon: <Droplets className="h-6 w-6 text-blue-600" />, title: "Water Sensor", desc: "Warns on puddles/flooded areas. The speaker will play 'Water is detected'." },
            { icon: <Wifi className="h-6 w-6 text-blue-600" />, title: "Li-Fi Module", desc: "Infrared Li-Fi for ultra-fast, low-power communication with the app and smart modules. In app online/offline status triggering." },
            { icon: <BatteryCharging className="h-6 w-6 text-blue-600" />, title: "Rechargeable Battery", desc: "Long-lasting power with USB-C fast charging." },
          ]}
        />
      </Section>

      {/* Demo Video */}
      <Section id="demo" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/30 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-transparent">
              Watch the Li-Stick Demo
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              A quick walkthrough of the cane in action—navigation alerts, SOS & Speakers. The cane will alert faster each time an ultrasonic sensor detects an obstacle.
            </p>
          </div>

          {/* Responsive video frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/6ahg3lh4aWM?rel=0&modestbranding=1"
                title="Li-Stick Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Helper text + external link */}
            <div className="mt-4 text-center text-sm text-gray-500">
              <a
                href="https://www.youtube.com/watch?v=6ahg3lh4aWM"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 mt-1 text-gray-700 hover:text-gray-900 underline underline-offset-4"
              >
                Open on YouTube
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </Section>


      {/* App Screenshots Slider */}
      <Section
        id="app-gallery"
        className="col-span-full py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      >
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Mobile App</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
            Explore the Li-Stick companion app—clean UI, fast pairing, and real-time safety.
          </p>
        </div>

        <SplitFeatureSlider
          items={ITEMS}
          interval={4000}
          autoPlay
          pauseOnHover
          showAutoPlayToggle
          className="max-w-6xl"
        />
      </Section>



      {/* Mobile App Demo */}
      <Section id="app-demo" className="py-20 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              Watch the Mobile App Demo
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              See pairing, live tracking, SOS alerts, and real-time notifications in action.
            </p>
          </div>

          {/* Responsive video frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/7qM2Hq3_vYI?rel=0&modestbranding=1"
                title="Li-Stick Mobile App Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Helper text + external link */}
            <div className="mt-4 text-center text-sm text-gray-500">
              <a
                href="https://www.youtube.com/watch?v=7qM2Hq3_vYI"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 mt-1 text-gray-700 hover:text-gray-900 underline underline-offset-4"
              >
                Open on YouTube
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Feature Highlights*/}
      <Section
        id="why-different"
        className="py-20 bg-gradient-to-br from-[#4367B0] via-[#4F86C6] to-[#56ABD7] text-white relative overflow-hidden"
      >
        {/* Background patterns (same style) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/30 via-transparent to-transparent" />

        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-6">
            <span className="text-white text-xl font-extrabold tracking-wide">VS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black leading-relaxed mb-3 bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent">
            Why Li-Stick is Different?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light">
            Built for real-world use: fast setup, clear guidance, and caregiver peace of mind.
          </p>
        </div>

        {/* Comparison table */}
        <div className="max-w-6xl mx-auto overflow-x-auto relative z-10">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-lg text-white/80">
                <th className="px-4 py-2 font-semibold">Feature</th>
                <th className="px-4 py-2 font-semibold">Li-Stick</th>
                <th className="px-4 py-2 font-semibold">WeWALK Smart Cane 2</th>
                <th className="px-4 py-2 font-semibold">Ray Electronic Aid</th>
                <th className="px-4 py-2 font-semibold">Glidance (Glide)</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  k: "Connectivity",
                  a: "Li-Fi",
                  b: "Bluetooth only (phone app)",
                  c: "Standalone (no GPS/app)",
                  d: "Bluetooth + onboard compute"
                },
                {
                  k: "GPS / Navigation",
                  a: "Built-in GPS + caregiver tracking",
                  b: "Phone/app GPS turn-by-turn",
                  c: "No GPS",
                  d: "Onboard AI path guidance"
                },
                {
                  k: "Obstacle Detection",
                  a: "Ultrasonic + Overhead + Buzzer alerts",
                  b: "Ultrasonic ground + overhead (~1.5 m)",
                  c: "Ultrasound up to ~2.8 m",
                  d: "Vision + LIDAR + drop-off"
                },
                {
                  k: "SOS button",
                  a: "GPS SOS + caregiver link",
                  b: "App alerts only",
                  c: "Alerts only",
                  d: "Safety steering + alerts"
                },
                {
                  k: "Silent button",
                  a: "Yes",
                  b: "No",
                  c: "No",
                  d: "No"
                },
                {
                  k: "Mobile App Integration",
                  a: "Native caregiver app",
                  b: "Companion navigation app",
                  c: "None",
                  d: "Companion setup/app"
                },
                {
                  k: "Water / Puddle Detection",
                  a: "Yes",
                  b: "No",
                  c: "No",
                  d: "No (weather-resistant only)"
                },
                {
                  k: "Price Range (USD)",
                  a: "$250-300 (target)",
                  b: "$850",
                  c: "$300",
                  d: "$1,499+"
                }
              ].map((row, i) => (
                <tr
                  key={i}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{row.k}</td>
                  <td className="px-4 py-3 text-gray-800">{row.a}</td>
                  <td className="px-4 py-3 text-gray-800">{row.b}</td>
                  <td className="px-4 py-3 text-gray-800">{row.c}</td>
                  <td className="px-4 py-3 text-gray-800">{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 flex justify-center">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Explore Li-Stick features"
            >
              Explore future plans
            </Link>
          </div>

        </div>

      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-20 bg-white relative">
        {/* Header (kept identical style) */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
            Answers to common questions about Li-Stick’s use, accessibility, and support.
          </p>
        </div>

        {/* Accordion grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={featuresGridVariants}     // reuse your existing variants
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              q: "Does Li-Stick work offline?",
              a: "Yes. Core guidance and obstacle detection work without internet. Only SOS tracking needs connectivity.",
            },
            {
              q: "How long does the battery last?",
              a: "A full day of typical use. It recharges quickly via USB-C fast charging.",
            },
            {
              q: "Is the mobile app accessible?",
              a: "Yes. It includes large text, haptic feedback, voice prompts, and high-contrast design.",
            },
            {
              q: "Can caregivers receive alerts?",
              a: "With permission, caregivers can receive SOS notifications and live GPS location updates.",
            },
            {
              q: "Is my data private?",
              a: "Yes. You control what is shared. Li-Stick minimizes data collection and prioritizes privacy.",
            },
            {
              q: "Is Li-Stick water resistant?",
              a: "Yes. It is designed to handle daily outdoor use, including rain and puddles.",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={featureTileVariants}>
              <AccordionItem q={item.q} a={item.a} />
            </motion.div>
          ))}
        </motion.div>
      </Section>





      {/* CTA */}
      <CTA
        title="Ready to Experience True Li-Stick?"
        subtitle="Pair powerful hardware with a smart app to unlock safer, more independent travel."
        primary={{ label: "Get a demo", href: "/contact" }}
        secondary={{ label: "Contact Sales", href: "/contact" }}
      />
      <Footer />
      <BackToTop />
    </div>

  );
};

export default FeaturesPage;
