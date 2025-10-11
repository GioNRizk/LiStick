/* The above code is a TypeScript React component for a footer section of a website. Here is a
breakdown of what the code is doing: */
// src/components/common/Footer.tsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    Mail, Phone, MapPin, ArrowUp,
    Linkedin, Instagram, Youtube
} from "lucide-react";
import logo from "../../assets/images/Li-stick icon.png"; // adjust path if needed
import { db } from "../../../firebaseConfig";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";

const nav = {
    product: [
        { label: "Features", to: "/features" },
        { label: "Impact", to: "/impact" },
        { label: "Future Plans", to: "/future" },
    ],
    company: [
        { label: "About Us", to: "/about#story" }, // normalized route (lowercase)
        { label: "Contact", to: "/about#contact" },
        // { label: "Careers", to: "/careers" },
    ],
    resources: [
        { label: "Blog", to: "/blog" },
        { label: "Support", to: "/support" },
        { label: "FAQ", to: "/faq" },
    ],
};

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    // Add these new states near your other useState hooks
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");

    // (Optional) simple email format check
    const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    // state + refs (near your other hooks)
    const successRef = useRef<HTMLDivElement | null>(null);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Normalize email for document ID (prevent Gmail-dot duplicates & illegal chars)
    const normalizeEmail = (e: string) =>
        e.trim().toLowerCase().replace(/\./g, "∙");

    // Handle form submission
    const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !isValidEmail(email)) {
            setStatus("error");
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            setStatus("idle");

            const id = normalizeEmail(email);
            const ref = doc(db, "newsletter_subscribers", id);
            const existing = await getDoc(ref);

            // ✅ Check if the email already exists
            if (existing.exists()) {
                setStatus("error");
                setErrorMsg("You’re already subscribed with this email!");
                return;
            }

            // 🆕 Otherwise, create the new record
            await setDoc(
                ref,
                {
                    email: email.trim().toLowerCase(),
                    createdAt: serverTimestamp(),
                    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
                    source: "website_footer",
                },
                { merge: true }
            );

            setEmail("");
            setStatus("success");

            // Focus on the success message (for accessibility)
            setTimeout(() => successRef.current?.focus(), 0);

            // Auto-dismiss after 4 seconds
            window.setTimeout(() => setStatus("idle"), 4000);
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <footer className="relative bg-slate-950 text-slate-300">
            {/* Top gradient accent line */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />

            {/* Main footer */}
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-flex items-center gap-3">
                            <img
                                src={logo}
                                alt="Li-Stick logo"
                                className="h-9 w-9 rounded-2xl object-contain"
                            />
                            <span className="text-xl font-semibold text-white">Li-Stick</span>
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Empowering visually-impaired users with safe, smart, and
                            confident mobility — combining AI vision, precise sensing,
                            and thoughtful design.
                        </p>

                        {/* Contact */}
                        <div className="mt-6 space-y-2 text-sm">
                            <a
                                href="mailto:hello@li-stick.com"
                                className="inline-flex items-center gap-2 hover:text-white"
                            >
                                <Mail className="h-4 w-4" /> hello@li-stick.com
                            </a>
                            <a href="tel:+96181699932" className="block hover:text-white">
                                <span className="inline-flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> +961 81 699 932
                                </span>
                            </a>
                            <p className="inline-flex items-center gap-2 text-slate-400">
                                <MapPin className="h-4 w-4" /> Beirut, Lebanon
                            </p>
                        </div>

                        {/* Socials */}
                        <div className="mt-4 flex gap-3">
                            <a
                                aria-label="LinkedIn"
                                href="#"
                                className="rounded-lg p-2 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                rel="noopener noreferrer"
                            >
                                <Linkedin className="h-5 w-5 text-white" />
                            </a>
                            <a
                                aria-label="Instagram"
                                href="#"
                                className="rounded-lg p-2 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-5 w-5 text-white" />
                            </a>
                            <a
                                aria-label="YouTube"
                                href="#"
                                className="rounded-lg p-2 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                rel="noopener noreferrer"
                            >
                                <Youtube className="h-5 w-5 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Nav columns */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Product</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            {nav.product.map((i) => (
                                <li key={i.label}>
                                    <Link to={i.to} className="hover:text-white">{i.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            {nav.company.map((i) => (
                                <li key={i.label}>
                                    <Link to={i.to} className="hover:text-white">{i.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Resources</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            {nav.resources.map((i) => (
                                <li key={i.label}>
                                    <Link to={i.to} className="hover:text-white">{i.label}</Link>
                                </li>
                            ))}
                        </ul>

                        {/* Newsletter */}
                        {/* Newsletter */}
                        <div className="mt-6">
                            <label htmlFor="newsletter-email" className="text-sm text-slate-400">
                                Get updates &amp; early access
                            </label>

                            {/* SUCCESS STATE */}
                            {status === "success" ? (
                                <div
                                    ref={successRef}
                                    tabIndex={-1}
                                    className="mt-3 flex items-start gap-3 rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-400/30 outline-none transition
               animate-[fadeIn_200ms_ease-out,scaleIn_200ms_ease-out]"
                                    role="status"
                                    aria-live="polite"
                                >
                                    {/* Checkmark icon */}
                                    <svg className="mt-0.5 h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="text-sm text-emerald-200">
                                        Thanks — you’re on the list! 🎉
                                        <button
                                            type="button"
                                            className="ml-2 rounded-lg px-2 py-0.5 text-xs text-emerald-100 hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                            onClick={() => setStatus("idle")}
                                            aria-label="Subscribe with another email"
                                            title="Subscribe with another email"
                                        >
                                            Add another
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // FORM (idle or error)
                                <form className="mt-2" onSubmit={handleNewsletterSubmit} noValidate>
                                    <div className="flex gap-2">
                                        <input
                                            id="newsletter-email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (status === "error") {
                                                    setStatus("idle");
                                                }
                                            }}
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-emerald-400"
                                            aria-invalid={status === "error" ? true : undefined}
                                            aria-describedby={status === "error" ? "newsletter-error" : undefined}
                                        />
                                        <button
                                            type="submit"
                                            disabled={loading || !email || !isValidEmail(email)}
                                            className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-4 text-sm font-medium text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60"
                                        >
                                            {loading ? "Saving…" : "Join"}
                                        </button>

                                    </div>

                                    {status === "error" && (
                                        <p
                                            id="newsletter-error"
                                            className="mt-2 text-xs text-rose-300"
                                            role="alert"
                                            aria-live="polite"
                                        >
                                            {errorMsg}
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>

                    </div>
                </div>

                {/* Bottom row */}
                <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
                    <p>© {year} Li-Stick. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/privacy" className="hover:text-white">Privacy</Link>
                        <Link to="/terms" className="hover:text-white">Terms</Link>
                        <Link to="/accessibility" className="hover:text-white">Accessibility</Link>
                        <button
                            onClick={scrollTop}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                            aria-label="Back to top"
                            title="Back to top"
                        >
                            <ArrowUp className="h-4 w-4" /> Top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
