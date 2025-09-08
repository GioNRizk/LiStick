import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export type SlideItem = {
    src: string;
    title?: string;
    caption?: string;
    alt?: string;
};

type Props = {
    items: SlideItem[];
    interval?: number;          // auto scroll interval (ms)
    autoPlay?: boolean;         // initial autoplay state (default ON)
    pauseOnHover?: boolean;     // pause autoplay when hovered
    showAutoPlayToggle?: boolean; // show the toggle button
    className?: string;
};

const GallerySlider: React.FC<Props> = ({
    items: rawItems,
    interval = 5000,
    autoPlay = true,             // initial default
    pauseOnHover = true,
    showAutoPlayToggle = true,
    className
}) => {
    // Keep items stable across renders so changing parents don't recreate the array
    const itemsRef = useRef(rawItems);
    const items = itemsRef.current;

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [isPaused, setIsPaused] = useState(false); // hover/visibility pause
    const [autoOn, setAutoOn] = useState<boolean>(autoPlay); // 🔁 user-toggleable autoplay

    const count = items.length;

    const go = (dir: 1 | -1) => {
        setDirection(dir);
        setIndex((prev) => {
            const next = prev + dir;
            if (next < 0) return count - 1;
            if (next >= count) return 0;
            return next;
        });
    };

    const goTo = (i: number) => {
        setDirection(i > index ? 1 : -1);
        setIndex(i);
    };

    // Framer variants
    const variants = {
        enter: (dir: 1 | -1) => ({ x: dir === 1 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: 1 | -1) => ({ x: dir === 1 ? -80 : 80, opacity: 0 })
    };

    // Simple swipe detection
    const startX = useRef<number | null>(null);
    const onPointerDown = (e: React.PointerEvent) => {
        startX.current = e.clientX;
    };
    const onPointerUp = (e: React.PointerEvent) => {
        if (startX.current == null) return;
        const dx = e.clientX - startX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        startX.current = null;
    };

    const current = items[index];

    // 🔄 Auto-scroll (uses user toggle + hover pause)
    useEffect(() => {
        if (!autoOn || isPaused || count <= 1) return;
        const t = setInterval(() => go(1), interval);
        return () => clearInterval(t);
        // include index so manual interaction feels like it resets the timer
    }, [autoOn, isPaused, interval, index, count]);

    // ⏸️ Pause on hover (optional)
    const hoverHandlers = pauseOnHover
        ? {
            onMouseEnter: () => setIsPaused(true),
            onMouseLeave: () => setIsPaused(false),
        }
        : {};

    // ⏸️ Pause when tab/window hidden; resume when visible
    useEffect(() => {
        const onVis = () => setIsPaused(document.hidden ? true : false);
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    return (
        <div className={["relative", className].filter(Boolean).join(" ")}>
            {/* Frame */}
            <div
                className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                {...hoverHandlers}
            >
                <AnimatePresence custom={direction} mode="popLayout">
                    <motion.img
                        key={current.src} // key only on the image, not the whole slider
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        src={current.src}
                        alt={current.alt ?? current.title ?? "Slide"}
                        className="absolute inset-0 h-full w-full object-cover"
                        draggable={false}
                    />
                </AnimatePresence>

                {/* 🔘 Autoplay toggle (user-facing) */}
                {showAutoPlayToggle && (
                    <button
                        type="button"
                        aria-label={autoOn ? "Turn autoplay off" : "Turn autoplay on"}
                        onClick={() => setAutoOn((v) => !v)}
                        className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-xl bg-white/90 hover:bg-white shadow-md border border-gray-200 px-3 py-1.5 text-xs font-medium"
                    >
                        {autoOn ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {autoOn ? "Autoplay: On" : "Autoplay: Off"}
                    </button>
                )}

                {/* Bottom gradient so text never overlays/blocks the image */}
                {(current.title || current.caption) && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent text-white">
                        {current.title && (
                            <h3 className="text-lg sm:text-xl font-semibold drop-shadow">{current.title}</h3>
                        )}
                        {current.caption && (
                            <p className="mt-1 text-sm sm:text-base opacity-90 drop-shadow">{current.caption}</p>
                        )}
                    </div>
                )}

                {/* Prev / Next */}
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
            </div>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
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
    );
};

export default GallerySlider;
