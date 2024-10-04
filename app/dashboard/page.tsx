// pages/dashboard.tsx
import React from "react";

import { UserButton } from "@clerk/nextjs";
import { FloatingNavDemo } from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const brands = [
  {
    id: 1,
    name: "Brand A",
    description: "Brand A is looking for influencers in the fashion niche.",
    sponsorshipAvailable: true,
  },
  {
    id: 2,
    name: "Brand B",
    description:
      "Brand B is interested in collaborations with beauty influencers.",
    sponsorshipAvailable: false,
  },
  {
    id: 3,
    name: "Brand C",
    description: "Brand C seeks influencers for a new product launch.",
    sponsorshipAvailable: true,
  },
  // Add more brands as needed
];

const Dashboard: React.FC = () => {
  return (
    <div className="pt-40 px-24">
     <div className="grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="p-2 border  items-center rounded-lg  hover:text-white bg-white/5 hover:bg-white/10  mx-auto w-full sm:w-5/6 md:w-4/5 lg:w-3/4" // Smaller width and lighter background
        >
          <h3 className="text-lg font-semibold">{brand.name}</h3>
          <p className="text-sm text-gray-400">{brand.description}</p>
          <Button
            className="mt-4"
            disabled={!brand.sponsorshipAvailable}
          >
            {brand.sponsorshipAvailable
              ? "Apply for Sponsorship"
              : "Sponsorship Unavailable"}
          </Button>
        </div>
      ))}
      
      {/* Add three more divs with content */}
      

    </div>
    </div>
  );
};

export default Dashboard;
