import React from "react";
import Image from "next/image"; // Importing Next.js Image component
import Link from "next/link";
import { Button } from "./button";
import { SignIn, SignInButton } from "@clerk/nextjs";
import { CircleDollarSign, User } from "lucide-react";

const Hero = () => {
  return (
    <div className="mx-auto mt-20 lg:mt-24 max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-24">
      {/* Logo added at the top of the Hero section */}
      <div className="absolute top-0 left-12"></div>

      <p className="mx-auto -mt-4 max-w-2xl text-lg lg:text-xl tracking-tight text-slate-700 sm:mt-6 dark:text-white">
        <span className="border-b border-dotted border-slate-300 dark:text-white">
          Manage your users and brands efficiently
        </span>
      </p>

      <h1 className="mx-auto max-w-4xl font-display text-6xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        <span className="inline-block dark:text-white">
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative text-9xl font-bold mt-8">
              {" "}
              TalentLink{" "}
            </span>
          </span>
        </span>
        <span className="inline-block ml-2 dark:text-white"></span>
      </h1>

      <p className="mx-auto mt-9 lg:mt-11 max-w-2xl lg:text-lg tracking-tight text-slate-700 dark:text-white">
        <span>
          Centralized platform to manage users, brands, and access permissions
          seamlessly. Create, edit, and manage brand portfolios with ease.
        </span>
      </p>

      <div className="mt-20 lg:mt-12 flex flex-col justify-center gap-y-5 sm:mt-10 sm:flex-row sm:gap-y-0 sm:gap-x-6">
        {/* Button for Influencer Dashboard */}
        <Link href="/sign-up">
          <Button variant="outline" className="flex items-center px-10 py-7 text-lg rounded-3xl">
            <CircleDollarSign className="mr-2" /> {/* Adjust the icon as needed */}
            Find a Brand
          </Button>
        </Link>

        {/* Button for Brand Manager Dashboard */}
        <Link href="/sign-up">
          <Button variant="outline" className="flex items-center px-10 py-7 text-lg rounded-3xl">
            <User className="mr-2" /> {/* Adjust the icon as needed */}
            Find an Influencer
          </Button>
        </Link>
      </div>

      <div className="mt-8"></div>
    </div>
  );
};

export default Hero;
