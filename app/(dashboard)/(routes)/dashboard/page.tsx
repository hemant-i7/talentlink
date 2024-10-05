/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// pages/dashboard.tsx
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { FloatingNavDemo } from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import brands from "../brand/brands";

const Dashboard: React.FC = () => {
  return <div className="pt-40 px-24">This is the dashboard page UI</div>;
};

export default Dashboard;
