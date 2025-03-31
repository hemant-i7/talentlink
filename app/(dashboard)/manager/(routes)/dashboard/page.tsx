// pages/dashboard.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, LogIn, LogOut } from "lucide-react"; // For icons
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerificationModal } from '@/components/ui/VerificationModal';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      // Check if user is verified (you'll need to implement this check based on your database)
      // For now, we'll show the verification modal
      setShowVerification(true);
    }
  }, [status, router]);

  const handleVerifyEmail = async (email: string) => {
    try {
      const response = await fetch('/api/verify-business-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to verify email');
      }

      // Here you would typically update your database to mark the user as verified
      // For now, we'll just close the modal
      setShowVerification(false);
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: '/' // This will redirect to the landing page after sign out
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">

      {/* Main Content */}
      <div className="flex-1 p-8  px-20 space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold"></h1>
          {session && session.user ? (
            <Avatar>
              <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
              <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => signIn('google')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Introduction Section */}
        <Card className="bg-gradient-to-r px from-blue-500 via-teal-400 to-green-500 text-white shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-4xl font-bold">Connecting Influencers with Brands</h2>
            <p className="mt-4 text-lg">
              TalentLink is your go-to platform for managing sponsorships and posting influencer job
              openings. Our mission is to bridge the gap between brands and talented influencers,
              helping them create valuable collaborations.
            </p>
            <Button variant="outline" size="lg" className="mt-6">
              Learn More
              <ArrowRight className="ml-2" />
            </Button>
          </CardContent>
        </Card>


        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold">Manage Sponsorships</h3>
              <Separator className="my-4" />
              <p className="text-muted-foreground">
                Simplify your sponsorship process with automated tracking and insightful data on influencer engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold">Post Job Openings</h3>
              <Separator className="my-4" />
              <p className="text-muted-foreground">
                Post new job roles for influencers and content creators, and get the best talent aligned with your brand.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold">Collaborate Effectively</h3>
              <Separator className="my-4" />
              <p className="text-muted-foreground">
                Use our platform's tools to easily communicate and collaborate with influencers for impactful campaigns.
              </p>
            </CardContent>
          </Card>
        </div>


      </div>

      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerifyEmail}
      />
    </div>
  );
};

export default Dashboard;
