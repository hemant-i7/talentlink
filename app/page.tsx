import React from "react";
import { LoginButton } from "@/components/ui/auth/login-button";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/ui/HeroSection";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FloatingNavDemo } from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar";
import FallingStars from "./falling-stars";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 sm:m-h-[100dvh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] overflow-hidden">
      <FallingStars />
      <HeroSection />
      <FloatingNavDemo />
      {/* <Sidebar/> */}
    </div>
  );
}
