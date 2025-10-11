/* The above code is a TypeScript React component for a Contact Page of a website. It includes sections
for Hero, Our Story, Team Members, Partners & Supporters, Contact Details, Follow Us, Press & Media,
and a Contact Form. */
import React from "react";
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import liIcon from "../assets/images/Li-stick icon.png";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Users,
  Heart,
  Handshake,
  Download,
} from "lucide-react";
import CTA from "../components/common/CTA";
import Footer from "../components/common/Footer";
import BackToTop from "../components/ui/BackToTop";

// Team photos
import gioImg from "../assets/images/team_pic/gio.jpg";
import marcImg from "../assets/images/team_pic/marc.jpg";
import rimaImg from "../assets/images/team_pic/teamli.jpg";

// Partner logos
import usekSoeLogo from "../assets/images/partners/Usek SOE logo.jpg";
import acieLogo from "../assets/images/partners/ACIE-Logo.png";
import ttoLogo from "../assets/images/partners/Usek TTO logo .png";
import usekLogo from "../assets/images/partners/usek-logo-new.png";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useLocation } from "react-router-dom";

import { db } from "../../firebaseConfig";
import { collection, serverTimestamp } from "firebase/firestore";
import { doc, setDoc, getDocs } from "firebase/firestore";

/* ----------------------------- team members ----------------------------- */
const teamMembers = [
  {
    name: "Gio Rizk",
    role: "Co-Founder, Software Lead",
    image: gioImg,
    subtitle: "Head of Li-Stick Software Department",
    cropStyle: "object-center",
    linkedin: "#",
  },
  {
    name: "Rima Mghames",
    role: "Co-Founder, Health & User Research",
    image: rimaImg,
    subtitle: "Head of Li-Stick Health Department",
    cropStyle: "object-[center_15%] scale-150",
    linkedin: "#",
  },
  {
    name: "Marc Salameh",
    role: "Co-Founder, Hardware & Systems",
    image: marcImg,
    subtitle: "Computer Engineer - Functional Consultant",
    cropStyle: "object-center",
    linkedin: "#",
  },
];

/* ------------------------------ animations ------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ---------------------------- country options --------------------------- */
const ContactPage: React.FC = () => {
  const dynamicTitles = ["Innovation", "Impact", "Accessibility", "Collaboration"];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // form states
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(8); // seconds to return to the form

  const [, setCountryCode] = useState("+961"); // dial
  const [countryIso2, setCountryIso2] = useState("LB");   // ISO2 for the flag
  const [countryName, setCountryName] = useState("Lebanon");
  const [phone, setPhone] = useState("");


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % dynamicTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dynamicTitles.length]);

  // success timer
  useEffect(() => {
    if (!submitted) {
      return;
    }
    setCountdown(8);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          setSubmitted(false); // back to form
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  // Smooth-scroll to #hash targets (e.g., /about#contact)
  const location = useLocation();
  useEffect(() => {
    // run on mount & whenever hash changes
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        // if you have a fixed header, adjust with scrollMarginTop via CSS:
        // #contact { scroll-margin-top: 96px; }
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);


  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO */}
      <Hero
        badge={<img src={liIcon} alt="LiStick" className="h-20 sm:h-20 w-auto" />}
        title={
          <div className="leading-[1.15] text-balance">
            <span className="block mb-2 sm:mb-3 md:mb-4">Let’s Shape the Future of Mobility.</span>
            <span className="block">
              Together in{" "}
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
          <p className="mt-4 sm:mt-6 md:mt-8 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Whether you’re a researcher, partner, or accessibility advocate — we’d love to hear from you.
            Let’s collaborate to make Li-Stick’s vision of safe, intelligent mobility reach more lives.
          </p>
        }
        showScrollHint
        scrollTargetId="story"
      />

      {/* OUR STORY */}
      <Section id="story" className="py-20 sm:py-24">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl mb-8">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-transparent leading-tight tracking-wide pb-1">
            Our Story
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
            LiStick began as a university project with a simple yet profound goal:
            to empower visually impaired individuals with unprecedented freedom
            through safe, reliable, and intelligent navigation technology.
          </p>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            What started in a lab has grown into a mission. Today, we're a
            dedicated team collaborating with NGOs, universities, and the BVI
            community to turn that vision into a reality. Every sensor we test,
            every line of code we write, and every design decision we make is
            driven by our users' independence and peace of mind.
          </p>
        </motion.div>
      </Section>

      {/* TEAM */}
      <Section
        id="solution"
        className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden"
      >
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
            Meet the Innovators
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
            Passionate engineers, visionary designers, and dedicated accessibility advocates
            working together to reshape the future of assistive technology.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeInUp}
              className="group relative rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-3xl ring-4 ring-gray-100 group-hover:ring-blue-300 transition-all duration-500 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${member.cropStyle}`}
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-lg font-semibold text-teal-600">
                    {member.role}
                  </p>
                  <p className="text-gray-600 font-medium">
                    {member.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* PARTNERS */}
      <Section
        id="partners"
        className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl mb-8 shadow-md">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-teal-800 to-emerald-800 bg-clip-text text-transparent leading-tight pb-1">
              Our Partners & Supporters
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We are proud to be supported by leading institutions that champion
              innovation and entrepreneurship.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[usekLogo, usekSoeLogo, acieLogo, ttoLogo].map((src, i) => (
              <motion.a
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="group relative flex items-center justify-center rounded-2xl overflow-hidden transition-transform duration-700 hover:-translate-y-2 hover:scale-105"
              >
                <img
                  src={src}
                  alt="Partner Logo"
                  className="w-48 h-36 object-contain rounded-2xl transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-100/0 via-transparent to-teal-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-transparent leading-tight pb-1">
              Get in Touch
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Whether you have questions, feedback, or partnership ideas, we’d love to hear from you.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* LEFT - INFO */}
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h3>
                <div className="space-y-3 text-gray-700">
                  <a href="mailto:hello@li-stick.com" className="flex items-center gap-3 hover:text-blue-600">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span>hello@li-stick.com</span>
                  </a>
                  <a href="tel:+96181699932" className="flex items-center gap-3 hover:text-blue-600">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span>+961 81 699 932</span>
                  </a>
                  <p className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>Beirut, Lebanon</span>
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-500 hover:text-blue-700"><Linkedin /></a>
                  <a href="#" className="text-gray-500 hover:text-pink-600"><Instagram /></a>
                  <a href="#" className="text-gray-500 hover:text-red-600"><Youtube /></a>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Press & Media</h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 hover:bg-gray-100"
                >
                  <Download className="h-4 w-4" />
                  Download Press Kit
                </a>
              </div>
            </motion.div>

            {/* RIGHT - FORM / SUCCESS */}
            <motion.div
              className="lg:col-span-2 rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 p-6 sm:p-8"
              variants={fadeInUp}
            >
              {/* SUCCESS STATE */}
              {submitted ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 ring-1 ring-green-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Message received!</h3>
                  <p className="mt-2 text-gray-600 max-w-xl">
                    Thanks for reaching out. We’ll be in touch shortly. Returning to the form in{" "}
                    <span className="font-semibold text-gray-900">{countdown}</span> seconds…
                  </p>
                  <button
                    className="mt-6 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 font-semibold text-white shadow hover:opacity-95"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* FORM */
                <form
                  className="grid grid-cols-1 gap-5"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitError(null);

                    const form = e.currentTarget as HTMLFormElement;
                    const nameEl = form.elements.namedItem("name") as HTMLInputElement;
                    const emailEl = form.elements.namedItem("email") as HTMLInputElement;
                    const phoneEl = form.elements.namedItem("phone") as HTMLInputElement;
                    const messageEl = form.elements.namedItem("message") as HTMLTextAreaElement;

                    const name = nameEl.value.trim();
                    const email = emailEl.value.trim();
                    const phone = phoneEl.value.trim();
                    const message = messageEl.value.trim();

                    // basic guard
                    if (!name || !email || !phone || !message) {
                      setSubmitError("Please fill in all fields.");
                      return;
                    }

                    // phone pattern: 6–15 digits (ignore spaces/dashes)
                    const digitsOnly = phone.replace(/[^\d]/g, "");
                    if (digitsOnly.length < 6 || digitsOnly.length > 15) {
                      setSubmitError("Please enter a valid phone number (6–15 digits).");
                      return;
                    }

                    try {
                      setLoading(true);
                      // Fetch all docs to compute counter
                      const snapshot = await getDocs(collection(db, "contactRequests"));
                      const count = snapshot.size + 1; // 👈 next number in order

                      // Format document ID: "1 - Marc Salameh"
                      const docId = `${count} - ${name}`;

                      // Save the document with your custom ID
                      await setDoc(doc(db, "contactRequests", docId), {
                        name,
                        email,
                        phone: `+${phone.replace(/[^\d]/g, "")}`,
                        countryIso2,
                        countryName,
                        message,
                        createdAt: serverTimestamp(),
                      });


                      form.reset();
                      setPhone("");
                      // keep country code selection
                      setSubmitted(true);
                    } catch (error) {
                      console.error("Error saving message:", error);
                      setSubmitError("Something went wrong while sending your message. Please try again.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {/* inline error */}
                  {submitError && (
                    <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 ring-1 ring-red-200">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g., Gio R"
                      className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  {/* PHONE FIELD */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>

                    <div className="relative">
                      <PhoneInput
                        country={"lb"}
                        value={phone}
                        // ⬇️ Keep this function — ensures Firestore gets correct country info
                        onChange={(val: string, country: { dialCode?: string; countryCode?: string; name?: string }) => {
                          setCountryCode(`+${country.dialCode || ""}`);
                          setCountryIso2((country.countryCode || "").toUpperCase());
                          setCountryName(country.name || "");
                          setPhone(val.replace(`+${country.dialCode || ""}`, "").trim());
                        }}
                        inputProps={{
                          name: "phone", // 👈 ensures it’s part of the <form> and form.elements.namedItem("phone") works again
                          required: true,
                        }}
                        inputClass="!w-full !rounded-xl !border !border-gray-200 !pl-14 !pr-4 !py-3 !text-gray-800 !focus:ring-2 !focus:ring-blue-600"
                        buttonClass="!absolute !left-2 !top-1/2 !-translate-y-1/2 !border-none !bg-transparent !p-0 !focus:ring-0"
                        containerClass="!relative !w-full"
                        dropdownClass="!rounded-xl !border-gray-200 !shadow-lg !bg-white"
                        searchClass="!rounded-lg !border-gray-200 !p-2"
                        placeholder="81699932"
                        enableSearch
                      />
                    </div>
                  </div>


                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us how we can help…"
                      className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`mt-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 font-semibold text-white shadow hover:opacity-95 ${loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* CTA + FOOTER */}
      <CTA
        title="Let's build an accessible future together"
        subtitle="Interested in pilots, research, or distribution partnerships? We’d love to team up."
        primary={{ label: "Partner With Us", href: "#contact" }}
        secondary={{ label: "Request a Demo", href: "#contact" }}
      />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ContactPage;
