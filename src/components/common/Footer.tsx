import React from "react";
import { Link } from "react-router-dom";
import {
    Mail, Phone, MapPin, ArrowUp,
    Linkedin, Instagram, Youtube
} from "lucide-react";
import logo from "../../assets/images/Li-stick icon.png"; // adjust path


const nav = {
    product: [
        { label: "Features", to: "/features" },
        { label: "Impact", to: "/impact" },
        { label: "Future Plans", to: "/future" },
    ],
    company: [
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
        // { label: "Careers", to: "/careers" }, // add later or hide if unused
    ],
    resources: [
        { label: "Blog", to: "/blog" },
        { label: "Support", to: "/support" },
        { label: "FAQ", to: "/faq" },
    ],
};

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-slate-950 text-slate-300">
            {/* Top gradient accent line */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />

            {/* CTA strip (optional)
            <div className="border-b border-white/5">
                <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-300/90">
                        Ready to experience independent navigation with Li-Stick?
                    </p>
                    <div className="flex gap-3">
                        <Link
                            to="/contact"
                            className="inline-flex items-center rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                        >
                            Schedule a Demo
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                        >
                            Get Li-Stick
                        </Link>
                    </div>
                </div>
            </div> */}

            {/* Main footer */}
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-flex items-center gap-3">
                            {/* Logo image */}
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
                            <a href="mailto:hello@li-stick.com" className="inline-flex items-center gap-2 hover:text-white">
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
                            <a aria-label="LinkedIn" href="#" className="rounded-lg p-2 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                                <Linkedin className="h-5 w-5 text-white" />
                            </a>
                            <a aria-label="Instagram" href="#" className="rounded-lg p-2 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                                <Instagram className="h-5 w-5 text-white" />
                            </a>
                            <a aria-label="YouTube" href="#" className="rounded-lg p-2 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
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
                        <form
                            className="mt-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Thanks! We’ll keep you posted.");
                            }}
                        >
                            <label htmlFor="email" className="text-sm text-slate-400">
                                Get updates & early access
                            </label>
                            <div className="mt-2 flex gap-2">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-emerald-400"
                                />
                                <button
                                    type="submit"
                                    className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-4 text-sm font-medium text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                >
                                    Join
                                </button>

                            </div>
                        </form>
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
