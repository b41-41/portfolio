import { useState, useEffect } from "react";

export function useScroll() {
    const [yOffset, setYOffset] = useState(0);

    const listener = e => {
        setYOffset(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    return yOffset;
};