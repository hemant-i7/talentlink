import React from 'react';
import { Spotlight } from "@/components/ui/auth/spotlight";

export function SpotlightPreview() {
    return (
        <div className="lg:h-[40rem] h-[25rem] w-full lg:rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden pt-10">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Unveil the Hidden <br /> with IPGuard Pro.
                </h1>
                <p className="mt-5 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    IPGuard Pro empowers cybersecurity professionals and law enforcement agencies to bypass Cloudflare protections, uncover real IP addresses, retrieve detailed hosting information, and pinpoint website locations with precise geographical coordinates. Equip yourself with the essential tools to identify and neutralize potential cyber threats effectively.
                </p>
            </div>
        </div>
    );
}

const IPGuardSpotlight = () => {
    return (
        <div className="mt-10"> 
            <SpotlightPreview />
        </div>
    );
}

export default IPGuardSpotlight;
