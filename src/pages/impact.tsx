import React from "react";
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import { AnimatePresence, motion } from "framer-motion"; // Import motion and AnimatePresence
import CTA from "../components/common/CTA";
import { Leaf, Handshake, Landmark, Sparkles, Quote, Award, ExternalLink } from "lucide-react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";


// SDG images (place files in src/assets/images/sdgs/)
import sdg3 from "../assets/images/sdgs/sdg3.png";
import sdg9 from "../assets/images/sdgs/sdg9.png";
import sdg10 from "../assets/images/sdgs/sdg10.png";
import liIcon from "../assets/images/Li-stick icon.png"; // Import liIcon
import sdg11 from "../assets/images/sdgs/sdg11.png";
import sdg17 from "../assets/images/sdgs/sdg17.png";
import Footer from "../components/common/Footer";
import proto1 from "../assets/images/traction/proto1.jpg";
import proto2 from "../assets/images/traction/proto2.jpg";
import proto3 from "../assets/images/traction/proto3.jpg";

// adjust these paths to your project:
import uec1 from "../assets/images/awards/uec1.jpg";
import uec2 from "../assets/images/awards/uec2.jpg";
import uec3 from "../assets/images/awards/uec3.jpg";
import yce1 from "../assets/images/awards/yce1.jpg";
import yce2 from "../assets/images/awards/yce2.jpg";
import yce3 from "../assets/images/awards/yce3.jpg";


// --- Scroll reveal variants (same feel as Home) ---
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = (staggerChildren = 0.08, delayChildren = 0.1) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Lightweight wrapper to reveal on scroll
const Reveal: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);


// ---------- Types ----------

type SDG = {
  id: number;
  title: string;
  img: string;
  desc: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

// ---------- Content ----------

const SDGS: SDG[] = [
  { id: 3, title: "Good Health & Well‑Being", img: sdg3, desc: "Improves safety, confidence, and daily independence." },
  { id: 9, title: "Industry, Innovation & Infrastructure", img: sdg9, desc: "Accessible, resilient assistive tech built with users." },
  { id: 10, title: "Reduced Inequalities", img: sdg10, desc: "Closes mobility gaps for underserved communities." },
  { id: 11, title: "Sustainable Cities & Communities", img: sdg11, desc: "Inclusive urban mobility and barrier‑free navigation." },
  { id: 17, title: "Partnerships for the Goals", img: sdg17, desc: "Academia × NGOs × industry to scale impact responsibly." },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The prototype felt intuitive from the first try. Buzzer alerts helped me react quickly without overload.",
    author: "Early Pilot Participant",
    role: "BVI community member",
  },
  {
    quote:
      "This is the kind of practical innovation cities need to make accessibility real, not just aspirational.",
    author: "Accessibility Advocate",
    role: "Urban mobility NGO",
  },
  {
    quote:
      "Emergency alerts and location sharing are game changers for caregiver peace of mind.",
    author: "Caregiver",
    role: "Caregiver for BVI individual",
  },
  {
    quote:
      "The team’s dedication to user-centered design and sustainability is truly inspiring.",
    author: "Blind with Vision NGO",
    role: "NGO Partner director",
  },
];


// ---------- UI Snippets ----------


// Small helper component (put it in the same file)
const CompetitionCard: React.FC<{
  title: string;
  subtitle: string;
  images: string[];
  accentFrom: string; // e.g. "from-blue-500"
  accentTo: string;   // e.g. "to-indigo-500"
  href?: string;
  bullets?: string[]; // NEW: combined, animated text block (single card)
}> = ({ title, subtitle, images, accentFrom, accentTo, href, bullets }) => {
  const [idx, setIdx] = React.useState(0);
  const hasCarousel = images.length > 1;

  // Auto-rotate images every 2.5s (only if >1 image)
  React.useEffect(() => {
    if (!hasCarousel) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 2500);
    return () => clearInterval(t);
  }, [images.length, hasCarousel]);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white/80 backdrop-blur-sm shadow-xl"
      aria-label={title}
      role="article"
    >
      {/* top ribbon / soft glow */}
      <div
        className={`absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${accentFrom} ${accentTo}`}
        aria-hidden="true"
      />

      {/* header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-2xl font-extrabold text-gray-900">{title}</h4>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <div
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${accentFrom} ${accentTo} shadow-md`}
          >
            <Award className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* media */}
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
            className="absolute inset-0 h-full w-full object-contain bg-white" // ✅ use object-contain
          />
        </AnimatePresence>

        {/* overlay + controls */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* dots */}
            {hasCarousel && (
              <div className="flex items-center gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${i === idx ? "scale-110 bg-white" : "bg-white/50"
                      }`}
                  />
                ))}
              </div>
            )}
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

      {/* NEW: Combined animated text block (inside the SAME card) */}
      {bullets?.length ? (
        <motion.div
          className="px-6 pb-6 pt-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.05, duration: 0.35 }
            }
          }}
        >
          <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
            {bullets.map((line, i) => (
              <motion.p
                key={i}
                className="text-sm leading-relaxed text-gray-700"
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              >
                • {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
};


const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 ${className}`}>{children}</div>
);

type CarouselItem = { icon: React.ReactNode; title: string; text: string };

const CommunityCollaboration: React.FC<{ items: CarouselItem[] }> = ({ items }) => {
  // --- responsive cards per page ---
  const [itemsPerView, setItemsPerView] = React.useState(1);
  React.useEffect(() => {
    const calc = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);      // lg+
      else if (window.innerWidth >= 768) setItemsPerView(2); // md
      else setItemsPerView(1);                               // sm
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // --- split into pages & pad last page for tidy grid ---
  const pages = React.useMemo(() => {
    const chunks: (CarouselItem | null)[][] = [];
    for (let i = 0; i < items.length; i += itemsPerView) {
      chunks.push(items.slice(i, i + itemsPerView));
    }
    const last = chunks[chunks.length - 1];
    if (last && last.length < itemsPerView) {
      chunks[chunks.length - 1] = [...last, ...Array(itemsPerView - last.length).fill(null)];
    }
    return chunks;
  }, [items, itemsPerView]);

  const totalPages = Math.max(1, pages.length);

  // --- paging + autoplay controls ---
  const [page, setPage] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(true);

  // knobs: delay between pages & slide animation duration
  const [intervalMs] = React.useState(6000);  // increase for longer wait
  const [transitionMs] = React.useState(900); // increase for slower slide

  React.useEffect(() => {
    if (!autoPlay || totalPages <= 1) return;
    const id = setInterval(() => setPage((p) => (p + 1) % totalPages), intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, totalPages]);

  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <Section className="py-14 bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Community & Collaboration</h2>
          <p className="mt-3 text-gray-700">
            Partnerships, policies, sustainability—and the people who benefit.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* viewport */}
          <div className="overflow-hidden rounded-2xl">
            {/* track */}
            <div
              className="flex"
              style={{
                transform: `translateX(-${page * 100}%)`,
                transition: `transform ${transitionMs}ms`,
              }}
            >
              {pages.map((group, pageIndex) => (
                <div key={pageIndex} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 md:p-4">
                    {group.map((item, idx) => (
                      <div key={`${pageIndex}-${idx}`} className="h-full">
                        {item ? (
                          <div className="h-full rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                            <div className="flex items-start gap-3">
                              {item.icon}
                              <div>
                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                <p className="mt-2 text-gray-600 leading-relaxed">{item.text}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full rounded-2xl opacity-0 pointer-events-none" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows (outside, not overlapping) */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="hidden sm:inline-flex items-center justify-center
                       absolute -left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-10
                       h-10 w-10 rounded-full bg-white/90 hover:bg-white
                       shadow ring-1 ring-gray-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="hidden sm:inline-flex items-center justify-center
                       absolute -right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10
                       h-10 w-10 rounded-full bg-white/90 hover:bg-white
                       shadow ring-1 ring-gray-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Controls row: Play/Pause + dots */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setAutoPlay((v) => !v)}
              aria-label={autoPlay ? "Pause autoplay" : "Play autoplay"}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white
                         px-3 py-1.5 shadow ring-1 ring-gray-200 text-sm"
            >
              {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="hidden sm:inline">{autoPlay ? "Pause" : "Play"}</span>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={`h-2.5 rounded-full transition-all ${i === page ? "bg-teal-600 w-6" : "bg-teal-200 hover:bg-teal-300 w-2.5"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Optional tiny helpers to tune timings in dev (remove if not needed) */}
          {/* 
          <div className="mt-2 flex justify-center gap-3 text-xs text-gray-500">
            <button onClick={() => setIntervalMs((v) => Math.min(v + 1000, 12000))}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-white">+1s delay</button>
            <button onClick={() => setIntervalMs((v) => Math.max(v - 1000, 2000))}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-white">-1s delay</button>
            <button onClick={() => setTransitionMs((v) => Math.min(v + 200, 2000))}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-white">slower slide</button>
            <button onClick={() => setTransitionMs((v) => Math.max(v - 200, 200))}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-white">faster slide</button>
          </div>
          */}
        </div>
      </div>
    </Section>
  );
};



// ---------- Page ----------

const ImpactPage: React.FC = () => {

  // --- Combined carousel (Partnership + Beneficiaries) ---
  const carouselItems = React.useMemo(() => [
    {
      icon: <Handshake className="h-6 w-6 text-teal-600" />,
      title: "Collaborative Pilots",
      text: "Field-testing with NGOs, clinics, and universities to refine user safety and comfort.",
    },
    {
      icon: <Landmark className="h-6 w-6 text-blue-700" />,
      title: "Policy & Accessibility",
      text: "Sharing findings with public bodies to support inclusive urban mobility standards.",
    },
    {
      icon: <Leaf className="h-6 w-6 text-green-700" />,
      title: "Sustainable Lifecycle",
      text: "Durable design, modular parts, and recycling programs to extend product life.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-fuchsia-600" />,
      title: "User‑centered Access",
      text: "Co‑designed with BVI users to solve real mobility pain points.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-teal-600" />,
      title: "Caregiver Peace of Mind",
      text: "Optional app‑based location sharing and emergency alerts.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-600" />,
      title: "Community Inclusion",
      text: "Safer navigation supports education, employment, and social participation.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-600" />,
      title: "Scalable Pilots",
      text: "University/NGO partnerships enable responsible, measurable rollouts.",
    },
  ], []);

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO */}
      <Hero
        badge={<img src={liIcon} alt="LiStick" className="h-20 sm:h-20 w-auto" />}
        title={
          <div className="leading-[1.15]">
            <span className="block mb-2 sm:mb-3 md:mb-4">Built with Purpose.</span>
            <span className="block">
              Every day{" "}
              <motion.span
                key="Impact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                className="inline align-baseline bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 bg-clip-text text-transparent"
              >
                Impact
              </motion.span>
            </span>
          </div>
        }
        subtitle={
          <p className="mt-4 sm:mt-6 md:mt-8">
            LiStick actively contributes to the UN Sustainable Development Goals (SDGs) by promoting inclusive, safe, and sustainable innovation          </p>
        }
        showScrollHint
        scrollTargetId="sdg"
      />


      {/* SDG ALIGNMENT */}
      <Section id="sdg" className="py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">SDG Alignment</h2>
              <p className="mt-3 text-gray-600">
                Designing with people and planet in mind—accessibility, safety, & sustainability.
              </p>
            </div>
          </Reveal>

          {/* parent: stagger; children: fadeUp */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
            variants={stagger(0.06, 0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SDGS.map((g) => (
              <motion.article
                key={g.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 hover:shadow-xl transition-all"
                role="article"
                aria-label={`SDG ${g.id}: ${g.title}`}
              >
                <img
                  src={g.img}
                  alt={`SDG ${g.id}: ${g.title}`}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">
                    SDG {g.id}: {g.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{g.desc}</p>
                </div>

                {/* subtle glow on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/15 to-teal-500/15 blur-xl" />
                </div>
              </motion.article>
            ))}
          </motion.div>

          <Reveal>
            <Card className="mt-8 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Leaf className="h-7 w-7 text-green-700 shrink-0" />
                <p className="text-gray-700">
                  We favor durable, modular hardware and responsible material choices to lower lifecycle impact. End-of-life
                  plans include component reuse and recycling pathways.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>



      {/* COMBINED: Partnership + Beneficiaries (auto‑sliding) */}
      <CommunityCollaboration items={carouselItems} />


      {/* TRACTION */}
      <Section id='traction' className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* widen container a bit + add horizontal gutters */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            {/* Slim header (no giant wrapper card) */}
            <div className="text-center mb-10">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">
                Traction
              </h3>
              <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                Wins, programs, and grants that de-risk our roadmap.
              </p>
            </div>
          </Reveal>

          {/* Stagger the three cards in */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            variants={stagger(0.1, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeUp} className="h-full">

              <CompetitionCard
                title="UEC25 — USEK Entrepreneurship Challenge"
                subtitle="#1 — Winners - March 5th 2025"
                images={[uec1, uec2, uec3]}
                accentFrom="from-blue-500"
                accentTo="to-indigo-500"
                bullets={[
                  "1st place across 10+ teams",
                  "Judged by USEK Instructors + Babson faculty",
                  "Trip to Babson Build in USA",
                  "Seed perks + campus visibility",
                ]}
              // href="https://your-proof-link"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="h-full">
              <CompetitionCard
                title="YCE25 — Youth Competition Entrepreneur"
                subtitle="#1 — Winners - April 30th 2025"
                images={[yce1, yce2, yce3]}
                accentFrom="from-teal-500"
                accentTo="to-emerald-500"
                bullets={[
                  "1st place across 30+ teams",
                  "Judged by USEK, NDU and LAU Instructors + Industry Experts",
                  "Cash award of 1000$ + media coverage",
                  "Trip to Ville de Metz in France",
                ]}
              // href="https://your-proof-link"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="h-full">
              <div className="h-full">
                <CompetitionCard
                  title="Prototype V1 Validation"
                  subtitle="Field-tested with NGO - July 24th 2025"
                  images={[proto1, proto2, proto3]}
                  accentFrom="from-fuchsia-500"
                  accentTo="to-pink-500"
                  bullets={[
                    "12 end-user trials with 'Blind with Vision' NGO",
                    "Validated GPS tracking, emergency alerts, caregiver app and obstacle detection",
                    "Ergonomics + UX iterations from real-world feedback",
                  ]}
                // href="https://your-demo-or-press-link"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>


      {/* TESTIMONIALS */}
      <Section id="testimonials" className="py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
              <p className="mt-3 text-gray-600">
                Signals from our prototype validation and community partners.
              </p>
            </div>
          </Reveal>

          {/* Cards with staggered fade-up */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={stagger(0.08, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="p-6">
                  <Quote className="h-6 w-6 text-teal-600" />
                  <p className="mt-3 text-gray-800 italic">“{t.quote}”</p>
                  <div className="mt-4 text-sm">
                    <p className="font-semibold text-gray-900">{t.author}</p>
                    {t.role && <p className="text-gray-600">{t.role}</p>}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* NEW Partners Link */}
          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl text-center">
              <p className="text-gray-600">
                We collaborate with universities, NGOs, and industry to validate and
                scale responsible pilots.
                <a
                  href="/about#partners"
                  className="ml-2 font-semibold text-teal-700 hover:underline"
                >
                  See our partners →
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>



      {/* CTA */}
      <CTA
        title="Partner with us to scale accessible mobility"
        subtitle="Let’s co‑create pilots, research, and standards that move cities—and people—forward."
        primary={{ label: "Start a Pilot", href: "/about#contact" }}
        secondary={{ label: "Contact the Team", href: "/about#contact" }}
      />

      <Footer />
    </div>
  );
};

export default ImpactPage;
