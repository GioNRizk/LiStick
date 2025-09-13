import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Check } from "lucide-react";

export type SlideItem = {
    src: string;
    title?: string;
    caption?: string;
    alt?: string;
    bullets?: string[]; // optional: extra feature points
};

type Props = {
    items: SlideItem[];
    interval?: number;          // autoplay interval (ms)
    autoPlay?: boolean;         // default true
    pauseOnHover?: boolean;     // pause when hovering image area
    showAutoPlayToggle?: boolean;
    className?: string;         // wrapper width control (e.g., max-w-6xl)
};

const SplitFeatureSlider: React.FC<Props> = ({
    items: rawItems,
    interval = 5000,
    autoPlay = true,
    pauseOnHover = true,
    showAutoPlayToggle = true,
    className
}) => {
    // keep array stable across re-renders
    // replace the ref usage with:
    const items = rawItems;


    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState<1 | -1>(1);
    const [isPaused, setIsPaused] = useState(false);

    // Respect prefers-reduced-motion for the initial autoplay state
    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const [autoOn, setAutoOn] = useState<boolean>(() => !prefersReducedMotion && autoPlay);
    // NEW: shows whether it's actually playing (not paused by hover/visibility)
    const isPlaying = autoOn && !isPaused;

    const count = items.length;

    const go = (d: 1 | -1) => {
        setDir(d);
        setIndex((p) => (p + d + count) % count);
    };
    const goTo = (i: number) => {
        setDir(i > index ? 1 : -1);
        setIndex(i);
    };

    // swipe
    const startX = useRef<number | null>(null);
    const onPointerDown = (e: React.PointerEvent) => { startX.current = e.clientX; };
    const onPointerUp = (e: React.PointerEvent) => {
        if (startX.current == null) return;
        const dx = e.clientX - startX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        startX.current = null;
    };

    // autoplay
    // REPLACE your current autoplay effect with this:
    useEffect(() => {
        if (!isPlaying || count <= 1) return;
        const t = setInterval(() => go(1), interval);
        return () => clearInterval(t);
    }, [isPlaying, interval, index, count]);


    // pause when tab hidden
    useEffect(() => {
        const onVis = () => setIsPaused(document.hidden);
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    // If user toggles OS setting to reduced motion, turn autoplay off
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setAutoOn(false);
        };
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const current = items[index];

    const imgVariants = {
        enter: (d: 1 | -1) => ({ x: d === 1 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: 1 | -1) => ({ x: d === 1 ? -60 : 60, opacity: 0 })
    };

    const textVariants = {
        enter: (d: 1 | -1) => ({ y: d === 1 ? 16 : -16, opacity: 0 }),
        center: { y: 0, opacity: 1 },
        exit: (d: 1 | -1) => ({ y: d === 1 ? -16 : 16, opacity: 0 })
    };

    return (
        <section
            role="region"
            aria-roledescription="carousel"
            aria-label="Li-Stick app feature gallery"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
                if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
                if (e.key === " ") { e.preventDefault(); setAutoOn((v) => !v); } // Space toggles autoplay
            }}
            className={["w-full mx-auto", className].filter(Boolean).join(" ")}
        >
            {/* hidden live region to announce slides to screen readers */}
            <p className="sr-only" aria-live="polite">
                {current.title ? `${current.title} — ` : ""}Slide {index + 1} of {count}
            </p>

            <div className="grid gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2 items-center">
                {/* LEFT: Text panel */}
                <div className="order-2 lg:order-1">
                    <AnimatePresence mode="popLayout" custom={dir}>
                        <motion.div
                            key={current.src + "-text"}
                            custom={dir}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                                {current.title ?? "Feature"}
                            </h3>
                            {current.caption && (
                                <p className="mt-3 text-lg text-gray-600">{current.caption}</p>
                            )}

                            {current.bullets?.length ? (
                                <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                                    {current.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <Check className="mt-0.5 h-5 w-5 shrink-0" />
                                            <span className="leading-relaxed">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}

                            <div className="mt-6 text-sm text-gray-500">
                                {index + 1} / {count}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT: Image panel */}
                <div className="order-1 lg:order-2">
                    {/* Shared wrapper => both frame + dots have identical width + center */}
                    <div className="mx-auto w-[min(92vw,420px)]">
                        <div
                            className="relative w-full aspect-[9/19] max-h-[80vh] rounded-3xl border border-white/50 shadow-2xl bg-slate-100 overflow-hidden"
                            onPointerDown={onPointerDown}
                            onPointerUp={onPointerUp}
                            onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
                            onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <AnimatePresence mode="popLayout" custom={dir}>
                                    <motion.img
                                        key={current.src}
                                        custom={dir}
                                        variants={imgVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.28, ease: "easeOut" }}
                                        src={current.src}
                                        alt={current.alt ?? current.title ?? "Slide"}
                                        className="max-h-full max-w-full object-contain select-none"
                                        draggable={false}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* arrows */}
                            <button
                                type="button"
                                aria-label="Previous"
                                onClick={() => go(-1)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-2xl bg-white/90 hover:bg-white shadow-md border border-gray-200 p-2"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next"
                                onClick={() => go(1)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-2xl bg-white/90 hover:bg-white shadow-md border border-gray-200 p-2"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>

                            {/* autoplay toggle */}
                            {showAutoPlayToggle && (
                                <button
                                    type="button"
                                    aria-label={isPlaying ? "Turn autoplay off" : "Turn autoplay on"}
                                    onClick={() => setAutoOn((v) => !v)}
                                    className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-xl bg-white/90 hover:bg-white shadow-md border border-gray-200 px-3 py-1.5 text-xs font-medium"
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    {isPlaying ? "Autoplay: On" : "Autoplay: Off"}
                                </button>
                            )}
                        </div>

                        {/* dots: now centered under the same wrapper width */}
                        <div className="mt-4 flex justify-center gap-2">
                            {items.map((_, i) => (
                                <button
                                    key={i}
                                    aria-label={`Go to slide ${i + 1}`}
                                    onClick={() => goTo(i)}
                                    className={[
                                        "h-2.5 w-2.5 rounded-full transition",
                                        i === index ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
                                    ].join(" ")}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SplitFeatureSlider;
