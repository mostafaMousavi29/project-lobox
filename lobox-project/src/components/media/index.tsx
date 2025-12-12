import React, { useEffect, useState } from "react";
import Desktop from "./desktop";
import Mobile from "./mobile";

const Media = () => {
    const getSize = () => {
        const w = window.innerWidth;

        if (w <= 640) return <Mobile />;
        if (w <= 1024) return <Mobile />;
        return <Desktop />;
    };

    const [device, setDevice] = useState(getSize());

    useEffect(() => {
        const handleResize = () => setDevice(getSize());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return device;
};

export default Media;
