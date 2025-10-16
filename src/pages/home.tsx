// src/pages/About.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Eye, Navigation, Users, Heart, Shield, Zap, Target, Award, AlertTriangle, Globe, DollarSign, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard, { NumberCounter } from "../components/features/StatCard";
import { easeOut } from "framer-motion"; 
import Footer from "../components/common/Footer";

// shared components
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";

// gallery images
import pic1 from "../assets/images/cane_pic/pic1.jpg"
import pic2 from "../assets/images/cane_pic/pic2.jpg";
import pic3 from "../assets/images/cane_pic/pic3.jpg";
// import pic4 from "../assets/images/cane_pic/pic4.png";
import liIcon from "../assets/images/Li-stick icon.png";

// team photos
import gioImg from "../assets/images/team_pic/gio.jpg";
import marcImg from "../assets/images/team_pic/marc.jpg";
import jennyImg from "../assets/images/team_pic/jenny.png";

// ADD your images (replace with your real paths)
import uec1 from "../assets/images/awards/uec1.jpg";
import uec2 from "../assets/images/awards/uec2.jpg";
import uec3 from "../assets/images/awards/uec3.jpg";

import yce1 from "../assets/images/awards/yce1.jpg";
import yce2 from "../assets/images/awards/yce2.jpg";
import yce3 from "../assets/images/awards/yce3.jpg";
import BackToTop from "../components/ui/BackToTop";

const gridVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.18, // spacing between cards
            delayChildren: 0.12,   // wait before first card
            when: "beforeChildren",
        },
    },
};

const tileVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

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

const teamGridVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.18, // spacing between cards
            delayChildren: 0.12,   // wait before first card
            when: "beforeChildren",
        },
    },
};

const teamTileVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

const missionGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,   // delay between left & right column
      delayChildren: 0.15,    // wait before first starts
      when: "beforeChildren",
    },
  },
};

const missionTileVariants = {
  hidden: { opacity: 0, y: 40 },  // start lower
  show:   { opacity: 1, y: 0, transition: { duration: 1.0, ease: easeOut } },
};

const impactGridVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.12,
            when: "beforeChildren",
        },
    },
};

const impactTileVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};


// Small helper so each tile controls its own inView state
const ImpactStatTile: React.FC<{
    kind: "count" | "text";
    value?: number;
    decimals?: number;
    suffix?: string;
    text?: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string; // tailwind gradient e.g. "from-red-400 to-red-500"
}> = ({ kind, value = 0, decimals = 0, suffix = "", text = "", label, icon: Icon, color }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

    return (
        <motion.div
            ref={ref}
            variants={impactTileVariants}
            className="group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
        >
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${color} rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
            </div>

            <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                {kind === "count" ? (
                    <NumberCounter
                        value={value}
                        duration={1.2}     // tweak to taste
                        decimals={decimals}
                        suffix={suffix}
                        start={inView}     // ← starts when the tile is in view
                    />
                ) : (
                    text
                )}
            </div>

            <div className="text-gray-300 text-lg font-medium">{label}</div>
        </motion.div>
    );
};



// TS-friendly animated Link
const MotionLink = motion(Link);

const teamMembers = [
{
        name: "Marc Salameh",
        role: "Co-Founder, Hardware & Systems",
        image: marcImg,
        subtitle: "Computer Engineer - Functional Consultant",
        cropStyle: "object-center",
        linkedin: "#",
    },
    {
        name: "Gio Rizk",
        role: "Co-Founder, Software Lead",
        image: gioImg,
        subtitle: "Head of Li-Stick Software Department",
        cropStyle: "object-center",
        linkedin: "#",
    },
    {
        name: "Jenny Attieh",
        role: "Co-Founder, Telecom & Li-Fi",
        image: jennyImg,
        subtitle: "Telecommunication Engineer",
        cropStyle: "object-center",
        linkedin: "#",
    },
];

// Small helper component (put it in the same file)
const CompetitionCard: React.FC<{
    title: string;
    subtitle: string;
    images: string[];
    accentFrom: string; // e.g. "from-blue-500"
    accentTo: string;   // e.g. "to-indigo-500"
    href?: string;
}> = ({ title, subtitle, images, accentFrom, accentTo, href }) => {
    const [idx, setIdx] = React.useState(0);

    // Auto-rotate images every 2.5s
    React.useEffect(() => {
        const t = setInterval(() => {
            setIdx((i) => (i + 1) % images.length);
        }, 2500);
        return () => clearInterval(t);
    }, [images.length]);

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white/80 backdrop-blur-sm shadow-xl"
        >
            {/* top ribbon */}
            <div
                className={`absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${accentFrom} ${accentTo}`}
            />
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="text-2xl font-extrabold text-gray-900">{title}</h4>
                        <p className="text-gray-600">{subtitle}</p>
                    </div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${accentFrom} ${accentTo} shadow-md`}>
                        <Award className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            {/* image area */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={idx}
                        src={images[idx]}
                        alt={`${title} photo ${idx + 1}`}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 h-full w-full object-contain bg-black"
                    />
                </AnimatePresence>

                {/* subtle gradient & caption */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* dots */}
                        <div className="flex items-center gap-1">
                            {images.map((_, i) => (
                                <span
                                    key={i}
                                    className={`h-2 w-2 rounded-full transition-all ${i === idx ? "scale-110 bg-white" : "bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    {href && (
                        <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 shadow hover:bg-white"
                        >
                            View post <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Home: React.FC = () => {
    const dynamicTitles = ["Safety", "Guidance", "Confidence", "Reliability", "Accessibility", "Precision"];
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    // top of the file
    type ProductItem = {
        id: number;
        image: string;
        title: string;
        subtitle: string;
        to?: string; // defaults to "/features"
    };

    const productImages: ProductItem[] = [
        {
            id: 1,
            image: pic1,
            title: "Overhead hazard detection",
            subtitle: "Ultrasonic and water level sensor fusion",
            to: "/features",
        },
        {
            id: 2,
            image: pic2,
            title: "Seamless guidance",
            subtitle: "Buzzer and audio",
            to: "/features",
        },
        {
            id: 3,
            image: pic3,
            title: "Emergency-ready",
            subtitle: "Li-Fi, GPS, and caregiver mobile app",
            to: "/features",
        },
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % dynamicTitles.length);
        }, 3000); // Change title every 3 seconds

        return () => clearInterval(interval);
    }, [dynamicTitles.length]);

    return (
        <div className="bg-white text-gray-800 overflow-x-hidden">
            {/* HERO — shared component, consistent height with other pages */}
            <Hero
                badge={<img src={liIcon} alt="LiStick" className="h-20 sm:h-20 w-auto" />}
                title="VISION-POWERED"
                highlight="FREEDOM"
                rotatingWords={
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={dynamicTitles[currentTitleIndex]}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="inline-block text-3xl sm:text-4xl md:text-5xl font-extrabold
                 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500
                 bg-clip-text text-transparent leading-[1.15] pb-1"
                        >
                            {dynamicTitles[currentTitleIndex]}
                        </motion.span>
                    </AnimatePresence>
                }

                subtitle="LiStick empowers the visually impaired with safer, smarter, and more confident navigation."
                showScrollHint
                scrollTargetId="problem"
            />

            {/* Problem Section */}
            <Section id="problem" className="scroll-mt-28 md:scroll-mt-32 py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto max-w-6xl px-6">
                    {/* Title */}
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
                            Daily Mobility is Breaking Under{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                                Obstacles
                            </span>

                            .
                        </h2>
                        <p className="mt-5 text-lg text-gray-600">
                            Streets, stairs, and buses hide <em>head-level hazards</em> that white canes often miss. For people with
                            vision loss, this turns routine trips into risky missions.
                        </p>
                    </div>

                    {/* Neon highlight card */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto mt-10 max-w-4xl rounded-3xl 
           bg-gradient-to-b from-[#0a1a3f] via-[#0d2c6c] to-[#123b8c]
           px-6 py-7 text-center text-white 
           shadow-[0_12px_40px_-10px_rgba(0,0,0,0.45)]"

                    >
                        <p className="text-xl sm:text-2xl font-black leading-tight">
                            “Millions face avoidable collisions from <span className="underline">undetected</span> overhead obstacles.”
                        </p>
                        <p className="mt-2 text-sm text-white-800/80">to add link of the report claiming from canva pitch</p>
                    </motion.div>

                    {/* Animated stats */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        <StatCard
                            icon={<Eye className="h-5 w-5 text-gray-700" />}
                            label="People who are blind (global)"
                            value={43_000_000}
                            duration={1.6}
                            href="https://example.com/paper-global-blindness"
                            hoverTitle="Read the source"
                            hoverSubtitle="Global blindness estimate"
                        />
                        <StatCard
                            icon={<Eye className="h-5 w-5 text-gray-700" />}
                            label="Moderate-to-severe visual impairment"
                            value={300_000_000}
                            duration={1.6}
                            href="https://example.com/paper-msvi"
                            hoverTitle="Read the source"
                            hoverSubtitle="Prevalence & methodology"
                        />
                        <StatCard
                            icon={<AlertTriangle className="h-5 w-5 text-gray-700" />}
                            label="Collisions from head-level obstacles"
                            value={40}
                            suffix="%"
                            duration={1.2}
                            decimals={0}
                            href="https://example.com/paper-head-level-collisions"
                            hoverTitle="Read the source"
                            hoverSubtitle="Head-level hazard data"
                        />
                    </div>
                    {/* CTA */}
                    <div className="mt-10 flex justify-center">
                        <a
                            href="#solution"
                            className="rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90"
                        >
                            Meet the solution
                        </a>
                    </div>
                </div>
            </Section>

            {/* Product Showcase */}
            <Section id='solution' className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/30 to-transparent rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl mb-6">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-transparent">
                            Meet Li-Stick
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                            A revolutionary assistive device meticulously engineered for reliability, accessibility, and seamless daily use.
                        </p>
                    </div>
                    {/* Gallery grid */}
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={gridVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {productImages.map((item, index) => (
                                <MotionLink
                                    key={item.id}
                                    to={item.to ?? "/features"}
                                    aria-label={`${item.title} — learn more`}
                                    className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 bg-white/80 backdrop-blur-sm border border-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    // keep if you still want the old CSS delay; otherwise remove:
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    variants={tileVariants}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5" />
                                    <img
                                        src={item.image}
                                        alt={`Li-Stick showcase: ${item.title}`}
                                        className="w-full h-full object-contain p-4 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                                        loading="lazy"
                                    />

                                    {/* darken on hover */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* subtle border glow on hover */}
                                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500" />

                                    {/* Hover overlay content (per-card) */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-white font-semibold text-lg">{item.title}</p>
                                        <p className="text-white/80 text-sm">{item.subtitle}</p>
                                    </div>
                                </MotionLink>
                            ))}
                        </motion.div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/features"
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            aria-label="Explore Li-Stick features"
                        >
                            Explore all features
                        </Link>
                    </div>
                </div>
            </Section>



            {/* Feature Highlights */}
            <Section className="py-20 bg-white relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Revolutionary Features</h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
                        Every component of LiStick is meticulously crafted to enhance independence, safety, and confidence.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    variants={featuresGridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {[
                        {
                            icon: Eye,
                            title: "Advanced Obstacle Detection",
                            description:
                                "Real-time ultrasonic sensing technology with 360° awareness keeps you informed of potential hazards ahead.",
                            color: "from-blue-500 to-blue-600",
                            bgColor: "from-blue-50 to-blue-100/50",
                        },
                        {
                            icon: Navigation,
                            title: "Precise GPS Tracking",
                            description:
                                "Military-grade location services with real-time caregiver visibility for ultimate peace of mind.",
                            color: "from-teal-500 to-teal-600",
                            bgColor: "from-teal-50 to-teal-100/50",
                        },
                        {
                            icon: Zap,
                            title: "Li-Fi Communication",
                            description:
                                "Lightning-fast, ultra-secure light-based data transfer between your cane and smart hub.",
                            color: "from-purple-500 to-purple-600",
                            bgColor: "from-purple-50 to-purple-100/50",
                        },
                        {
                            icon: Shield,
                            title: "Safety-First Design",
                            description:
                                "Triple-redundant safety systems with crystal-clear audio alerts inspire complete user confidence.",
                            color: "from-green-500 to-green-600",
                            bgColor: "from-green-50 to-green-100/50",
                        },
                        {
                            icon: Target,
                            title: "Precision Navigation",
                            description:
                                "Seamless indoor-outdoor guidance with centimeter-level accuracy and intuitive waypoint system.",
                            color: "from-orange-500 to-orange-600",
                            bgColor: "from-orange-50 to-orange-100/50",
                        },
                        {
                            icon: Heart,
                            title: "Ergonomic Excellence",
                            description:
                                "Thoughtfully designed grip with haptic feedback and intuitive controls for comfortable all-day use.",
                            color: "from-rose-500 to-rose-600",
                            bgColor: "from-rose-50 to-rose-100/50",
                        },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            variants={featureTileVariants}
                            className={`group relative bg-gradient-to-br ${f.bgColor} border border-gray-100/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/30 to-transparent rounded-full blur-2xl" />
                            <div
                                className={`inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r ${f.color} rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                            >
                                <f.icon className="w-9 h-9 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                                {f.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg font-light group-hover:text-gray-700 transition-colors duration-300">
                                {f.description}
                            </p>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-400 transition-all duration-500" />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <Link
                        to="/future"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label="Explore Li-Stick features"
                    >
                        Explore our future plans
                    </Link>
                </div>
            </Section>

            {/* Team */} {/* Moved this section up */}
            <Section id='solution' className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Meet the Innovators</h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
                        Passionate engineers, visionary designers, and dedicated accessibility advocates working together to reshape the future of assistive technology.
                    </p>
                </div>

                <motion.div
                    className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
                    variants={teamGridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {[teamMembers[0], teamMembers[2], teamMembers[1]].map((member) => (
                        <motion.div
                            key={member.name}
                            variants={teamTileVariants}
                            className="group relative rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden"
                        >
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-2xl" />

                            <div className="relative z-10">
                                <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-3xl ring-4 ring-gray-100 group-hover:ring-blue-300 transition-all duration-500 mb-6">
                                    <img
                                        src={member.image}
                                        alt={`${member.name} - ${member.role}`}
                                        className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${member.cropStyle}`}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-lg font-semibold text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
                                        {member.role}
                                    </p>
                                    {member.subtitle && (
                                        <p className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                                            {member.subtitle}
                                        </p>
                                    )}
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl flex items-end p-6">
                                    <div className="text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        <p className="font-semibold text-lg mb-1">{member.name}</p>
                                        <p className="text-blue-100 text-sm">{member.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label="Explore Li-Stick features"
                    >
                        Learn more about us
                    </Link>
                </div>
            </Section>

            {/* Mission */} {/* This section is now after Team */}
            <Section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-teal-50 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-200/30 to-transparent rounded-full blur-3xl" />

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10"
                    variants={missionGridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* LEFT column: Mission card */}
                    <motion.div className="order-2 lg:order-1" variants={missionTileVariants}>
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 rounded-3xl blur-3xl" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50">
                                <div className="flex items-center mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mr-6">
                                        <Heart className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-gray-900">Our Mission</h2>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-xl text-gray-700 leading-relaxed font-light">
                                        LiStick was born from a simple yet profound vision: to empower visually impaired individuals with unprecedented freedom through safe, reliable, and intelligent navigation technology.
                                    </p>
                                    <p className="text-xl text-gray-700 leading-relaxed font-light">
                                        We are committed to delivering cutting-edge assistive solutions that don't just address mobility challenges, they eliminate barriers and unlock possibilities, providing peace of mind for users and their families.
                                    </p>
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-100">
                                    <p className="text-lg font-semibold text-blue-800 mb-2">"Technology with Purpose"</p>
                                    <p className="text-gray-700 italic">
                                        Every line of code, every sensor calibration, every design decision is made with our users' independence in mind.
                                    </p>
                                </div>

                                <div className="mt-10 flex justify-center">
                                    <Link
                                        to="/about"
                                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        aria-label="Explore Li-Stick features"
                                    >
                                        Discover our story
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT column: Circle + floating icons */}
                    <motion.div className="order-1 lg:order-2" variants={missionTileVariants}>
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/40 via-purple-300/30 to-teal-300/40 rounded-full blur-3xl animate-pulse" />
                            <div className="relative w-96 h-96 bg-gradient-to-br from-blue-500 via-indigo-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                                <Users className="w-40 h-40 text-white animate-pulse" />
                            </div>

                            {/* Floating elements */}
                            <div
                                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce"
                                style={{ animationDelay: "0.5s" }}
                            >
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <div
                                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce"
                                style={{ animationDelay: "1s" }}
                            >
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Section>



            {/* Impact */}
            <Section className="py-20 bg-gradient-to-br from-[#4367B0] via-[#4F86C6] to-[#56ABD7] text-white relative overflow-hidden">
                {/* Background patterns */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/30 via-transparent to-transparent" />

                <div className="text-center mb-16 relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-6">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black leading-relaxed mb-3 bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent">
                        Making a Real Impact
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light">
                        LiStick isn't just a product—it's a movement toward universal accessibility and independence.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto relative z-10"
                    variants={impactGridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <ImpactStatTile
                        kind="count"
                        value={5}
                        decimals={0}
                        suffix=""
                        label="Targeted SDGs"
                        icon={Globe}
                        color="from-red-400 to-red-500"
                    />

                    <ImpactStatTile
                        kind="count"
                        value={99.9}
                        decimals={1}
                        suffix="%"
                        label="Accuracy Rate"
                        icon={Target}
                        color="from-teal-400 to-teal-500"
                    />

                    <ImpactStatTile
                        kind="text"
                        text="24/7"
                        label="Support Available"
                        icon={Shield}
                        color="from-purple-400 to-purple-500"
                    />
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label="Explore Li-Stick features"
                    >
                        Learn more about us
                    </Link>
                </div>
            </Section>





            {/* Business Model & Funding */}
            <Section className="py-20 bg-white relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                        <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Business Model & Funding</h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
                        Sustainable impact through responsible pricing, strategic partnerships, and diversified funding.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    variants={featuresGridVariants}   // ← reuse existing
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {[
                        {
                            icon: Target,
                            title: "Revenue Model",
                            description: "One-time device sale plus optional caregiver app subscription.",
                            color: "from-blue-500 to-blue-600",
                            bgColor: "from-blue-50 to-blue-100/50",
                        },
                        {
                            icon: Award,
                            title: "Pricing Tiers",
                            description: "Basic (safety), Plus (navigation), Care (family features).",
                            color: "from-teal-500 to-teal-600",
                            bgColor: "from-teal-50 to-teal-100/50",
                        },
                        {
                            icon: Globe,
                            title: "Funding Sources",
                            description: "Grants, CSR programs, impact investors, and community pre-orders.",
                            color: "from-purple-500 to-purple-600",
                            bgColor: "from-purple-50 to-purple-100/50",
                        },
                        {
                            icon: Users,
                            title: "Partnerships",
                            description: "NGOs, clinics, mobility schools, and municipal accessibility programs.",
                            color: "from-green-500 to-green-600",
                            bgColor: "from-green-50 to-green-100/50",
                        },
                        {
                            icon: Zap,
                            title: "Pilots & Validation",
                            description: "University studies and city pilots to validate outcomes and refine design.",
                            color: "from-pink-500 to-pink-600",
                            bgColor: "from-pink-50 to-pink-100/50",
                        },
                        {
                            icon: Navigation,
                            title: "Scaling Plan",
                            description: "Local assembly → contract manufacturing to lower unit economics over time.",
                            color: "from-indigo-500 to-indigo-600",
                            bgColor: "from-indigo-50 to-indigo-100/50",
                        },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            variants={featureTileVariants}  // ← reuse existing
                            className={`group relative bg-gradient-to-br ${f.bgColor} border border-gray-100/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/30 to-transparent rounded-full blur-2xl" />

                            <div className={`inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r ${f.color} rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                <f.icon className="w-9 h-9 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                                {f.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg font-light group-hover:text-gray-700 transition-colors duration-300">
                                {f.description}
                            </p>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-400 transition-all duration-500" />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <Link
                        to="/future"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label="Explore Li-Stick features"
                    >
                        Explore our Business Model & Future Plans
                    </Link>
                </div>
            </Section>

            {/* Award highlight */}
            <Section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-white/90 backdrop-blur-sm shadow-2xl p-12"
                        variants={featureTileVariants}       // ← reuse same tile animation
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl mb-8 shadow-lg">
                                <Award className="w-10 h-10 text-white" />
                            </div>

                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                                🏆 Champions of Innovation
                            </h3>

                            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-10">
                                Recognized for our groundbreaking approach to assistive technology and our unwavering commitment to meaningful impact.
                            </p>
                        </div>

                        {/* Two animated photo cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CompetitionCard
                                title="UEC25 - Usek Entrepreneurship Challenge"
                                subtitle="#1 - Winners"
                                images={[uec1, uec2, uec3]}
                                accentFrom="from-blue-500"
                                accentTo="to-indigo-500"
                            />
                            <CompetitionCard
                                title="YCE25 - Youth Competition Entrepreneurship"
                                subtitle="#1 - Winners"
                                images={[yce1, yce2, yce3]}
                                accentFrom="from-teal-500"
                                accentTo="to-emerald-500"
                            />
                        </div>

                        {/* Decorative background elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />

                        <div className="mt-10 flex justify-center">
                            <Link
                                to="/impact/#traction"
                                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                aria-label="Explore Li-Stick features"
                            >
                                Discover our Achievements
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </Section>


            {/* CTA */}
            <CTA
                title="Ready to Experience True Freedom?"
                subtitle="Join thousands of users worldwide who have discovered independence, safety, and confidence with LiStick's revolutionary assistive technology."
                primary={{ label: "Get LiStick Today", href: "/contact" }}
                secondary={{ label: "Schedule a Demo", href: "/contact" }}
            />
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Home;
