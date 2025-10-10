// src/components/common/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function instantScrollToTop() {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;

    // 1) Temporarily disable smooth behavior globally
    root.style.scrollBehavior = "auto";

    // 2) Scroll the usual suspects
    window.scrollTo(0, 0);
    document.scrollingElement?.scrollTo?.(0, 0);
    document.body?.scrollTo?.(0, 0);

    // 3) If your app uses a custom scroll container, scroll it too
    const custom = document.querySelector<HTMLElement>("[data-scroll-root]");
    if (custom) {
      custom.scrollTop = 0;
    }

    // 4) Restore previous behavior after the next frame
    requestAnimationFrame(() => {
        root.style.scrollBehavior = prev || "";
    });
}

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        instantScrollToTop();
    }, [pathname]);

    return null;
};

export default ScrollToTop;
