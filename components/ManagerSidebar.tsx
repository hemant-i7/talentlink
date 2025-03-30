"use client";

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
  Upload,
  Users,
  VideoIcon,
} from "lucide-react";
import { IconJoinBevel, IconShoppingBagDiscount } from "@tabler/icons-react";
import { FaRobot } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Post Campaigns",
    icon: Upload,
    href: "/manager/addbrand",
    color: "text-blue-500",
  },
  {
    label: "Manage Campaigns",
    icon: FolderKanban,
    href: "/manager/manage",
    color: "text-green-500",
  },
  {
    label: "AI Tools",
    icon: BriefcaseBusiness,
    href: "/manager/ai",
    color: "text-purple-500",
  },

  {
    label: "Trending ",
    icon: LineChart,
    href: "/manager/trending",
    color: "text-yellow-500",
  },

];

const ManagerSidebar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="space-y-4 py-4 pt-14 flex flex-col h-full bg-zinc-900 text-white">
      <div className="px-6 py-2 flex-1">
        <div style={{ pointerEvents: "none" }} />
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            {/* <Image fill alt="Logo" src="/logo.png" /> */}
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            BrandManager
          </h1>
        </Link>

        {isAuthenticated && session.user && (
          <div className="flex items-center mb-8 pl-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
              <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{session.user.name || "User"}</p>
              <p className="text-xs text-zinc-400">{session.user.email || ""}</p>
            </div>
          </div>
        )}

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
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-lg group 
              flex p-5 gap-3 w-full justify-start 
              font-medium cursor-pointer
               hover:text-white bg-white/5 hover:bg-white/10 
               rounded-lg transition"
          variant="ghost"
        >
          <LogOut className={cn("h-7 w-9 mr-3", "text-zinc-100")} />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default ManagerSidebar;
