// src/components/features/StatCard.tsx
import React, { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type StatCardProps = {
    icon: React.ReactNode;
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;   // count-up seconds
    decimals?: number;   // fraction digits
    href?: string;       // source link (enables overlay)
    hoverTitle?: string;
    hoverSubtitle?: string;
    className?: string;
    showOverlay?: boolean; // debug: force overlay visible
};

const NumberCounter: React.FC<{
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    start: boolean;
}> = ({ value, duration = 1.2, decimals = 0, prefix = "", suffix = "", start }) => {
    const mv = useMotionValue(0);
    const formatted = useTransform(mv, (v) =>
        `${prefix}${Number(v).toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        })}`
    );
    useEffect(() => {
        if (!start) return;
        const ctrl = animate(mv, value, { duration, ease: "easeOut" });
        return () => ctrl.stop();
    }, [start, value, duration]);
    return (
        <>
            <motion.span>{formatted}</motion.span>
            {suffix && <span className="ml-1 text-xl font-bold">{suffix}</span>}
        </>
    );
};

const StatCard: React.FC<StatCardProps> = ({
    icon,
    label,
    value,
    prefix,
    suffix,
    duration,
    decimals,
    href,
    hoverTitle = "Read the source",
    hoverSubtitle = "Opens in a new tab",
    className = "",
    showOverlay = false,
}) => {
    const ref = useRef<HTMLDivElement | HTMLAnchorElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

    const isLink = Boolean(href);

    const CardContent = (
        <div
            className={[
                "group relative block h-full min-h-[140px] overflow-hidden rounded-2xl bg-white p-6",
                "shadow-sm ring-1 ring-gray-200 transition hover:shadow-lg hover:-translate-y-0.5",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                "z-10",
                className,
            ].join(" ")}
        >
            {/* Main content */}
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    {icon}
                </div>

                <div className="min-w-0">
                    {/* FIX: Reserve same space for label across cards */}
                    <div className="min-h-[40px]">
                        <p className="text-[11px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide leading-snug">
                            {label}
                        </p>
                    </div>

                    {/* Align numbers across cards */}
                    <div className="mt-2 flex items-end min-h-[48px]">
                        <p className="text-3xl font-extrabold tracking-tight text-gray-900 whitespace-nowrap">
                            <NumberCounter
                                value={value}
                                prefix={prefix}
                                suffix={suffix}
                                duration={duration}
                                decimals={decimals}
                                start={inView}
                            />
                        </p>
                    </div>
                </div>
            </div>

            {/* Hover overlay (shows only if link) */}
            {isLink && (
                <div
                    className={[
                        "absolute inset-x-0 bottom-0 z-20",
                        showOverlay
                            ? "translate-y-0"
                            : "translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0",
                        "transition-transform duration-500 ease-out",
                    ].join(" ")}
                >
                    <div className="bg-gradient-to-t from-black/70 to-black/20 px-6 py-5">
                        <p className="text-white font-semibold text-lg flex items-center gap-2">
                            {hoverTitle}
                            <ArrowUpRight className="h-4 w-4 opacity-90" />
                        </p>
                        <p className="text-white/80 text-sm">{hoverSubtitle}</p>
                    </div>
                </div>
            )}
        </div>
    );

    return href ? (
        <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open source for: ${label}`}
            className="block"
        >
            {CardContent}
        </a>
    ) : (
        <div ref={ref as React.Ref<HTMLDivElement>} className="block">
            {CardContent}
        </div>
    );
};

export default StatCard;
