"use client";
import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/auth/floating-navbar";
import { IconHome, IconDeviceImac, IconChecklist } from "@tabler/icons-react";
import LogoComponent from "./LogoComponent";
import Link from "next/link";
export function FloatingNavDemo() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/aboutus",
      icon: (
        <IconChecklist className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Influencer",
      link: "/manager/dashboard",
      icon: (
        <IconDeviceImac className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Brand",
      link: "/dashboard",
      icon: (
        <IconDeviceImac className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="flex w-full justify-end">
      <Link href="/" passHref>
        <LogoComponent isDarkMode={isDarkMode} />
      </Link>
      <FloatingNav
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        navItems={navItems}
      />
    </div>
  );
}
