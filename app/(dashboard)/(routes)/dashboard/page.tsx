"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ToggleLeft, ToggleRight, LogIn } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSession, signIn } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isManager, setIsManager] = useState(true);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    // Set initial state based on the current route
    setIsManager(pathname === "/manager/dashboard");
  }, [pathname]);

  const toggleDashboard = () => {
    const newIsManager = !isManager;
    setIsManager(newIsManager);

    // Redirect to the appropriate dashboard
    if (newIsManager) {
      router.push("/manager/dashboard");
    } else {
      router.push("/influencer/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Main Content */}
      <div className="flex-1 p-8 px-20 space-y-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">
            {isManager ? "Manager Dashboard" : "Influencer Dashboard"}
          </h1>
          <div className="flex items-center space-x-4">
            
            {isAuthenticated && session.user ? (
              <Avatar className="ring-2 ring-zinc-700 hover:ring-zinc-600 transition-all">
                <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                <AvatarFallback className="bg-zinc-800 text-zinc-100">{session.user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="ml-2 hover:bg-zinc-800 transition-colors border-zinc-700 text-zinc-100"
                onClick={() => signIn('google')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Introduction Section */}
        <Card className="bg-zinc-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-zinc-700">
          <CardContent className="p-8">
            <h2 className="text-4xl font-bold tracking-tight">
              Connecting Influencers with Brands
            </h2>
            <p className="mt-4 text-lg text-zinc-300">
              TalentLink is your go-to platform for managing sponsorships and
              posting influencer job openings. Our mission is to bridge the gap
              between brands and talented influencers, helping them create
              valuable collaborations.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="mt-6 bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600 hover:border-zinc-500 transition-all"
            >
              Learn More
              <ArrowRight className="ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-800 border-zinc-700">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold text-white">Manage Sponsorships</h3>
              <Separator className="my-4 bg-zinc-700" />
              <p className="text-zinc-300">
                Simplify your sponsorship process with automated tracking and
                insightful data on influencer engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-800 border-zinc-700">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold text-white">Post Job Openings</h3>
              <Separator className="my-4 bg-zinc-700" />
              <p className="text-zinc-300">
                Post new job roles for influencers and content creators, and get
                the best talent aligned with your brand.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-800 border-zinc-700">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold text-white">
                Collaborate Effectively
              </h3>
              <Separator className="my-4 bg-zinc-700" />
              <p className="text-zinc-300">
                Use our platform's tools to easily communicate and collaborate
                with influencers for impactful campaigns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
