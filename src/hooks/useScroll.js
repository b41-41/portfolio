import { useState, useEffect } from "react";

export function useScroll() {
    const [yOffset, setYOffset] = useState(0);

    const listener = e => {
        if (window.pageYOffset < 0) {
            setYOffset(0);
        } else {
            setYOffset(window.pageYOffset);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    return yOffset;
};