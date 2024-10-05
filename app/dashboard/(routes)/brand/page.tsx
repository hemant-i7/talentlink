/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// pages/dashboard.tsx
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { FloatingNavDemo } from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import brands from "./brands";

const Dashboard: React.FC = () => {
  return (
    <div className="pt-40 px-24">
      <h1>this is a brand page</h1>
      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="p-4 border items-center rounded-lg hover:text-white bg-white/5 hover:bg-white/10 mx-auto w-full sm:w-5/6 md:w-4/5 lg:w-3/4"
          >
            <img
              src={brand.imageUrl}
              alt={`${brand.name} logo`}
              className="w-16 h-16 mb-4 object-cover rounded-full"
            />

            <h3 className="text-lg font-semibold">{brand.name}</h3>

            <p className="text-sm text-gray-400">{brand.description}</p>

            <p className="text-sm font-bold text-green-500 mt-2">
              Sponsorship: {brand.moneyOffered}
            </p>

            <Button className="mt-4" disabled={!brand.sponsorshipAvailable}>
              {brand.sponsorshipAvailable
                ? "Apply for Sponsorship"
                : "Sponsorship Unavailable"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
