"use client";

import Link from "next/link";
import { Button } from "../button";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return <div><Button className="text-center items-center" variant={"secondary"}asChild>
    <Link href={href}>
    {label}
    </Link>
  </Button></div>;
};
