import React from 'react';
import { LoginButton } from "@/components/ui/auth/login-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesIcon, UsersIcon, ArrowRightIcon, HomeIcon } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import LampDemo from '@/components/ui/lamp';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <BackgroundBeams />
      
      {/* Hero Section with Lamp Effect */}
      <section className="relative">
        <LampDemo />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <TextGenerateEffect words="Connect Influencers with Brand Managers" className="text-4xl md:text-6xl font-bold mb-4" />
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Revolutionize your influencer marketing strategy
          </p>
          <div className="flex space-x-4">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <Card className="bg-slate-900 border-cyan-500">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-500">
              <SparklesIcon className="w-6 h-6 mr-2" />
              Smart Matching
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            Our AI-powered algorithm connects influencers with the perfect brand opportunities.
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-cyan-500">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-500">
              <UsersIcon className="w-6 h-6 mr-2" />
              Influencer Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            Manage your campaigns, track performance, and grow your influence all in one place.
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-cyan-500">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-500">
              <HomeIcon className="w-6 h-6 mr-2" />
              Brand Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            Discover top influencers, launch campaigns, and measure ROI with ease.
          </CardContent>
        </Card>
      </section>

      {/* Global Network Visualization */}
      <section className="relative h-[40rem] w-full">
        
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-center text-cyan-500">Our Global Network</h2>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="text-center py-16 relative">
        <BackgroundBeams />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-cyan-500">Ready to Transform Your Marketing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of influencers and brands already succeeding on our platform.
          </p>
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black">
            Sign Up Now <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}