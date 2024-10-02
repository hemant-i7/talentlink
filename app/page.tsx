import React from "react";
import { LoginButton } from "@/components/ui/auth/login-button";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/ui/HeroSection";
import { SpotlightPreview } from "@/components/ui/SpotLight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SparklesIcon,
  UsersIcon,
  ArrowRightIcon,
  HomeIcon,
} from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import LampDemo from "@/components/ui/lamp";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 sm:m-h-[100dvh]  lg:h-[100vh]  w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]  flex flex-col justify-center">
      <BackgroundBeams />
      
      <HeroSection />
    </div>
  );
}
