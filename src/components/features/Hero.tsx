// src/components/features/Hero.tsx
import Section from "../ui/Section";
import { ShieldCheck, ChevronDown } from "lucide-react";
import ClickSplash from "../ui/ClickSplash";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
    badge?: React.ReactNode;
    title: React.ReactNode;
    highlight?: string;
    rotatingWords?: React.ReactNode; // 👈 CHANGED: ReactNode (not string[])
    subtitle?: React.ReactNode;
    ctaLabel?: string;
    ctaHref?: string;
    showScrollHint?: boolean;
    scrollTargetId?: string;           // NEW
};

const Hero: React.FC<Props> = ({
    badge,
    title,
    highlight,
    rotatingWords,
    subtitle,
    ctaLabel,
    ctaHref,
    showScrollHint,
    scrollTargetId,
}) => {
    // 🔹 Parallax motion values (hooks must be inside the component)
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const bgX = useTransform(mx, (v) => v * 12); // ±12px drift
    const bgY = useTransform(my, (v) => v * 12);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2;  // -1..1
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2;  // -1..1
        mx.set(px);
        my.set(py);
    };
    return (
        <Section
            onMouseMove={onMouseMove}   // if your Section forwards props; otherwise put this on the inner motion.div
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-gray-900 to-black text-white"
            container={false}
        >
            {/* Animated background layers */}
            <motion.div aria-hidden className="hero-animated-bg" style={{ x: bgX, y: bgY }} />
            <div aria-hidden className="hero-light-sweep" />
            <div aria-hidden className="hero-vignette" />

        <ClickSplash />


            <motion.div
                onMouseMove={onMouseMove}
                className="relative z-10 container mx-auto px-6 text-center -mt-10 sm:-mt-12 md:-mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Badge */}
                {badge && (
                    <div className="mb-5 flex justify-center">
                        {typeof badge === "string" ? (
                            // Text pill (unchanged behavior)
                            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                                <ShieldCheck className="h-5 w-5 text-teal-300" />
                                <span className="text-sm text-white/80">{badge}</span>
                            </div>
                        ) : (
                            // Icon-only (no background)
                            <div className="inline-flex items-center justify-center">
                                {badge}
                            </div>
                        )}
                    </div>
                )}


                {/* Main headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4">
                    {title}{" "}
                    {highlight && (
                        <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                            {highlight}
                        </span>
                    )}
                </h1>

                {/* 🔄 Rotating tagline passed from the page */}
                {rotatingWords && (
                    <div className="mt-6 mb-6">
                        <div className="min-h-[2.75rem] sm:min-h-[3.25rem] md:min-h-[3.75rem] flex items-center justify-center">
                            {rotatingWords}
                        </div>
                    </div>
                )}




                {/* Subtitle */}
                {subtitle && (
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-4">
                        {subtitle}
                    </p>
                )}

                {/* CTA */}
                {ctaLabel && ctaHref && (
                    <a
                        href={ctaHref}
                        className="mt-10 inline-block rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                    >
                        {ctaLabel}
                    </a>
                )}
            </motion.div>

            {/* Scroll hint */}
            {showScrollHint && (
                <a
                    href={`#${scrollTargetId ?? "problem"}`}
                    aria-label="Scroll to next section"
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce group"
                >
                    <ChevronDown className="w-6 h-6 text-white/70 group-hover:text-white" />
                    <span className="sr-only">Scroll to section</span>
                </a>
            )}


        </Section>
    );
};

export default Hero;
