import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="max-w-7xl pt-32 px-10 mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="flex flex-col items-center mb-12">
        
        <p className="text-lg text-center max-w-2xl">
          Welcome to TalentLink, where we bridge the gap between brands and
          influencers. Our mission is to empower brands to find the right
          influencers and facilitate meaningful partnerships. We believe in the
          power of collaboration and creativity.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg">
          To create a centralized platform that streamlines the process of
          influencer marketing, making it accessible and effective for brands of
          all sizes.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Integrity: We value honesty and transparency in all our
            partnerships.
          </li>
          <li>
            Innovation: We strive to stay ahead of the curve and embrace new
            ideas.
          </li>
          <li>
            Collaboration: We believe in the power of working together to
            achieve great results.
          </li>
        </ul>
      </section>

      <div className="text-center">
       
      </div>
    </div>
  );
};

export default AboutUs;
