
import Hero from './Hero';
import { FeaturesSectionGENX } from './FeatureSection';
import { Button } from './button';
import Link from 'next/link';
import { BackgroundBeams } from './background-beams';
export function GridBackgroundDemo() {
    return (
        <>
            <div className="sm:m-h-[100dvh]  bg-dot-white/[0.2] bg-dot-black/[0.2]  flex flex-col justify-center">
                {/* Radial gradient for the container to give a faded look */}
                {/* <div className="absolute   pointer-events-none inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] lg:inset-0 lg:flex items-center justify-center dark:bg-black bg-white lg:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
                <Hero />
             
            
                <FeaturesSectionGENX />
                
            
            </div>
            
                
            
        </>

    );
}

const HeroSection = () => {
    return (
        <div>
            <GridBackgroundDemo />
        </div>
    );
}

export default HeroSection
