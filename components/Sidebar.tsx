import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Bot,
  BriefcaseBusiness,
  Building,
  File,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  LineChart,
  LogOut,
  MessageSquare,
  Music,
  PencilLine,
  Settings,
  Users,
  VideoIcon,
} from "lucide-react";
import { User } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { IconJoinBevel, IconShoppingBagDiscount } from "@tabler/icons-react";
import { FaRobot } from "react-icons/fa";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Get Brands",
    icon: Building, // Make sure to replace this with your actual icon
    href: "/brand",
    color: "text-purple-500",
  },
  {
    label: "My Collaborations",
    icon: Users, // Replace with the actual icon
    href: "/collaborations",
    color: "text-indigo-600",
  },
  {
    label: "Ai Tools",
    icon: Bot, // Replace with the actual icon
    href: "/analytics",
    color: "text-yellow-500",
  },
  // New section for brand managers
  {
    label: "Recruitment",
    icon: BriefcaseBusiness, // Replace with the actual icon
    href: "/recruitemnt",
    color: "text-red-500",
  },
  {
    label: "Manage",
    icon: PencilLine, // Replace with the actual icon
    href: "/manage",
    color: "text-teal-600",
  },
];

const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 pt-14 flex flex-col h-full bg-zinc-900 text-white">
      <div className="px-6 py-2 flex-1 ">
        <div style={{ pointerEvents: "none" }} />
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            {/* <Image fill alt="Logo" src="/logo.png" /> */}
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            TalentLink
          </h1>
        </Link>
        <div className="space-y-7">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="text-lg group 
              flex p-5  gap-3 w-full justify-start 
              font-medium cursor-pointer
               hover:text-white bg-white/5 hover:bg-white/10 
               rounded-lg transition "
            >
              <div style={{ pointerEvents: "none" }}></div>
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-7 w-9 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-4">
        <Link
          href="/"
          key="/"
          className="text-lg group 
              flex p-5  gap-3 w-full justify-start 
              font-medium cursor-pointer
               hover:text-white bg-white/5 hover:bg-white/10 
               rounded-lg transition "
        >
          <LogOut className={cn("h-7 w-9 mr-3", "text-zinc-100")} />
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
