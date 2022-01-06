import { useState, useEffect } from "react";
import { sectionInfo } from '../component/sectionInfo';

export function useSetLayout() {

    const [layoutInfo, setLayoutInfo] = useState([{ height: 0 }, { height: 0 }, { height: 0 }]);

    const listener = e => {
        const layoutInfoLoop = [{ height: 0 }, { height: 0 }, { height: 0 }]
        for (let i = 0; i < sectionInfo.length; i++) {
            layoutInfoLoop[i].height = sectionInfo[i].heightScale * window.innerHeight;
        }
        setLayoutInfo(layoutInfoLoop);
    };

    useEffect(() => {
        listener();
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, []);

    return layoutInfo;
};