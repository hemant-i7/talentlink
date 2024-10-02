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
            name: "Domain Info",
            link: "/project",
            icon: <IconChecklist className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Hosting Info",
            link: "/interview",
            icon: (
                <IconDeviceImac className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),},
        {
            name: "IP finder",
            link: "/interview",
            icon: (
                <IconDeviceImac className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];
    return (
        <div className="relative w-full ">
            <Link href="/" passHref>
                <LogoComponent isDarkMode={isDarkMode} />
            </Link>
            <FloatingNav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} navItems={navItems} />
        </div>
    );
}

