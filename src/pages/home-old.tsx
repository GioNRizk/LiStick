// src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiShield,
  FiMapPin,
  FiWifi,
  FiActivity,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";

// Reused site components
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";

// Assets
import heroShot from "../assets/images/hero-stick.jpg";
import cane1 from "../assets/images/pic1.jpg";
import cane2 from "../assets/images/pic2.jpg";
import cane3 from "../assets/images/pic3.jpg";
import logo from "../assets/images/logo.png";

// Simple motion helpers
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px -10% 0px" },
  transition: { duration: 0.5, delay },
});

const HomePage: React.FC = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <Hero
        badge={
          <span className="inline-flex items-center gap-2">
            <img src={logo} alt="LiStick mini logo" className="h-4 w-4" />
            New: Li-Fi enabled mobility support
          </span>
        }
        title={
          <>
            Mobility, safety, and peace of mind—{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              in one smart cane.
            </span>
          </>
        }
        subtitle="LiStick helps visually impaired users navigate confidently with obstacle detection, GPS tracking, and Li-Fi communication—while caregivers stay informed in real time."
        showScrollHint
      />

      {/* HERO CONTENT (image + actions) */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp(0.05)}>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Started
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 hover:border-gray-300"
              >
                Explore Features
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
              <Badge line="CE-minded design" />
              <Badge line="Caregiver app" />
              <Badge line="24/7 support" />
            </div>
          </motion.div>

          <motion.div className="relative" {...fadeUp(0.1)}>
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-100 to-teal-100 blur-2xl opacity-60" />
            <img
              src={heroShot || cane2}
              alt="LiStick smart cane"
              className="relative rounded-3xl border border-gray-100 shadow-xl w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </Section>

      {/* PROBLEM / SOLUTION */}
      <Section className="py-14">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10">
          <motion.div className="rounded-2xl border border-gray-100 p-8 bg-white shadow-sm" {...fadeUp()}>
            <h2 className="text-2xl font-bold mb-3">The challenge</h2>
            <p className="text-gray-600">
              Navigating unfamiliar environments can be stressful and unsafe for visually
              impaired individuals. Traditional canes don’t offer detection beyond immediate
              contact, nor do they keep loved ones informed.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-gray-100 p-8 bg-gradient-to-br from-blue-50 to-teal-50 shadow-sm"
            {...fadeUp(0.05)}
          >
            <h2 className="text-2xl font-bold mb-3">Our solution</h2>
            <p className="text-gray-700">
              LiStick blends smart sensing, Li-Fi messaging, and GPS sharing into a familiar
              form factor. Users move confidently; caregivers gain peace of mind.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* FEATURE HIGHLIGHTS */}
      <Section className="bg-gray-50 border-y border-gray-100">
        <motion.div className="mx-auto max-w-7xl py-16" {...fadeUp()}>
          <h2 className="text-3xl font-extrabold text-center">Why LiStick</h2>
          <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
            A carefully engineered set of features focused on real-world mobility.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<FiActivity />} title="Obstacle Detection" desc="Detects hazards ahead to support safer, smoother navigation." />
            <FeatureCard icon={<FiMapPin />} title="GPS & Caregiver View" desc="Secure location sharing keeps loved ones in the loop when needed." />
            <FeatureCard icon={<FiWifi />} title="Li-Fi Communication" desc="Fast, low-interference optical data for on-device alerts and messages." />
            <FeatureCard icon={<FiShield />} title="Reliable & Robust" desc="Long battery life, durable build, and privacy-first architecture." />
          </div>
        </motion.div>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="py-16">
        <motion.h2 className="text-3xl font-extrabold text-center" {...fadeUp()}>
          How It Works
        </motion.h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <StepCard step="1" title="Sense">
            Ultrasonic/vision sensing monitors the path and flags obstacles in real time.
          </StepCard>
          <StepCard step="2" title="Inform">
            Haptic/LED cues guide the user; Li-Fi and Bluetooth share events to the app.
          </StepCard>
          <StepCard step="3" title="Support">
            GPS updates and emergency alerts notify caregivers only when needed.
          </StepCard>
        </div>
      </Section>

      {/* GALLERY */}
      <Section className="bg-white">
        <div className="mx-auto max-w-7xl py-12">
          <motion.h3 className="text-xl font-bold text-gray-800" {...fadeUp()}>
            Product Gallery
          </motion.h3>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[cane1, cane2, cane3].map((src, i) => (
              <motion.img
                key={i}
                {...fadeUp(0.03 * i)}
                src={src}
                alt={`LiStick product view ${i + 1}`}
                className="rounded-2xl border border-gray-100 shadow-sm object-cover h-80 w-full"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </Section>

      {/* IMPACT STATS */}
      <Section className="bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl py-14 grid sm:grid-cols-3 gap-6 text-center">
          <Stat value="92%" label="users report higher confidence" />
          <Stat value="3×" label="more caregiver awareness" />
          <Stat value="< 1s" label="alert latency end-to-end" />
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="py-16">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-6">
          <Testimonial quote="It feels like the cane is looking out for me." name="Maya A." role="Beta user" />
          <Testimonial quote="I can check on my dad without calling every hour." name="Karim S." role="Caregiver" />
          <Testimonial quote="Setup was simple and the guidance is subtle but helpful." name="Sara R." role="Occupational therapist" />
        </div>
      </Section>

      {/* CTA */}
      <CTA
        title="Ready to try LiStick?"
        subtitle="Join the early access program and help shape the future of assisted mobility."
        primary={{ label: "View Plans", href: "/future" }}
        secondary={{ label: "Learn More", href: "/about" }}
      />

      {/* FAQ */}
      <Section className="py-16">
        <h2 className="text-3xl font-extrabold text-center">FAQ</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Faq q="Does LiStick work offline?">
            Yes—local obstacle detection and guidance work fully offline. Connectivity features
            (location share, caregiver feed) sync when a connection is available.
          </Faq>
          <Faq q="How is my data protected?">
            We use secure channels and minimal data retention. Location sharing is opt-in and
            can be disabled at any time.
          </Faq>
          <Faq q="What is Li-Fi and why use it?">
            Li-Fi communicates with light instead of radio, enabling low-interference,
            precise short-range messaging—great for assistive guidance.
          </Faq>
          <Faq q="Battery life?">
            Typical full-day usage on a single charge, depending on sensing profile and alerts.
          </Faq>
        </div>
      </Section>
    </main>
  );
};

export default HomePage;

/* ---------- Tiny presentational components with smooth entrance ---------- */

const Badge: React.FC<{ line: string }> = ({ line }) => (
  <span className="flex items-center gap-2">
    <FiCheckCircle className="text-teal-600" /> {line}
  </span>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({
  icon,
  title,
  desc,
}) => (
  <motion.div
    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    {...fadeUp(0.05)}
  >
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
      <span className="text-xl text-blue-700">{icon}</span>
    </div>
    <h3 className="font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{desc}</p>
  </motion.div>
);

const StepCard: React.FC<{ step: string; title: string; children: React.ReactNode }> = ({
  step,
  title,
  children,
}) => (
  <motion.div
    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    {...fadeUp(0.05)}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-700">
        {step}
      </span>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="mt-3 text-gray-600 text-sm">{children}</p>
  </motion.div>
);

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <motion.div
    className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
    {...fadeUp(0.05)}
  >
    <div className="text-3xl font-extrabold text-gray-900">{value}</div>
    <div className="mt-1 text-sm text-gray-600">{label}</div>
  </motion.div>
);

const Testimonial: React.FC<{ quote: string; name: string; role: string }> = ({
  quote,
  name,
  role,
}) => (
  <motion.figure
    className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm"
    {...fadeUp(0.05)}
  >
    <FiHeart className="text-rose-500" />
    <blockquote className="mt-3 text-gray-700">“{quote}”</blockquote>
    <figcaption className="mt-3 text-sm text-gray-500">
      <span className="font-semibold text-gray-700">{name}</span> • {role}
    </figcaption>
  </motion.figure>
);

const Faq: React.FC<{ q: string; children: React.ReactNode }> = ({ q, children }) => (
  <motion.div
    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    {...fadeUp(0.05)}
  >
    <h3 className="font-semibold">{q}</h3>
    <p className="mt-2 text-sm text-gray-600">{children}</p>
  </motion.div>
);
