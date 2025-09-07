import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-50 flex items-center justify-center 
              h-12 w-12 rounded-full text-white shadow-lg transition-all
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              bg-blue-900
              bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
              from-blue-700/80 via-blue-800/90 to-blue-900
              hover:opacity-90`}
        >
            <ArrowUp className="h-5 w-5" />
        </button>

    );
};

export default BackToTop;
