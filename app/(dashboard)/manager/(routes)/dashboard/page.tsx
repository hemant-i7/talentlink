// pages/dashboard.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  LogIn, 
  LogOut, 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  Settings,
  Plus,
  Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerificationModal } from '@/components/ui/VerificationModal';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { useSession, signIn, signOut } from "next-auth/react";

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
    <div className="flex min-h-screen bg-zinc-950">
      {/* Main Content */}
      <div className="flex-1 p-8 px-20 space-y-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold text-white flex items-center">
              <Briefcase className="w-8 h-8 mr-3 text-zinc-400" />
              Manager Dashboard
            </h1>
            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
              Welcome back, {session?.user?.name}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                className="w-64 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
            </div>
            <Button variant="outline" size="icon" className="bg-zinc-800/50 border-zinc-700">
              <Bell className="h-5 w-5 text-zinc-400" />
            </Button>
            {session && session.user ? (
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
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 border-red-800 hover:border-red-700"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/70 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-zinc-400 tracking-wide">Total Applications</p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-3xl font-bold text-zinc-100">1,234</p>
                    <span className="text-sm text-green-400 font-medium">+12%</span>
                  </div>
                  <p className="text-xs text-zinc-500">vs. last month</p>
                </div>
                <div className="p-3 bg-zinc-700/50 rounded-xl group-hover:bg-zinc-600/50 transition-colors">
                  <Users className="h-6 w-6 text-zinc-400 group-hover:text-zinc-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/70 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-zinc-400 tracking-wide">Active Campaigns</p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-3xl font-bold text-zinc-100">45</p>
                    <span className="text-sm text-green-400 font-medium">+8%</span>
                  </div>
                  <p className="text-xs text-zinc-500">vs. last month</p>
                </div>
                <div className="p-3 bg-zinc-700/50 rounded-xl group-hover:bg-zinc-600/50 transition-colors">
                  <TrendingUp className="h-6 w-6 text-zinc-400 group-hover:text-zinc-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/70 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-zinc-400 tracking-wide">Total Revenue</p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-3xl font-bold text-zinc-100">$45,678</p>
                    <span className="text-sm text-green-400 font-medium">+15%</span>
                  </div>
                  <p className="text-xs text-zinc-500">vs. last month</p>
                </div>
                <div className="p-3 bg-zinc-700/50 rounded-xl group-hover:bg-zinc-600/50 transition-colors">
                  <DollarSign className="h-6 w-6 text-zinc-400 group-hover:text-zinc-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/70 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-zinc-400 tracking-wide">Pending Reviews</p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-3xl font-bold text-zinc-100">23</p>
                    <span className="text-sm text-yellow-400 font-medium">5 urgent</span>
                  </div>
                  <p className="text-xs text-zinc-500">needs attention</p>
                </div>
                <div className="p-3 bg-zinc-700/50 rounded-xl group-hover:bg-zinc-600/50 transition-colors">
                  <MessageSquare className="h-6 w-6 text-zinc-400 group-hover:text-zinc-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="bg-zinc-800/50 border-zinc-700/50 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-zinc-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100">
                <Briefcase className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
              <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100">
                <Users className="w-4 h-4 mr-2" />
                Review Applications
              </Button>
              <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-zinc-800/50 border-zinc-700/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-zinc-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-zinc-800/50">
                    <div className="p-2 rounded-full bg-zinc-700/50">
                      {index === 0 ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : index === 1 ? (
                        <XCircle className="h-5 w-5 text-red-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-100">
                        {index === 0
                          ? "New application received from Virat Kohli"
                          : index === 1
                          ? "Campaign 'Summer Collection' was rejected"
                          : "Pending review for 'Tech Gadgets' campaign"}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Introduction Section */}
        <Card className="bg-zinc-800/50 border-zinc-700/50">
          <CardContent className="p-8">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-100">Connecting Influencers with Brands</h2>
            <p className="mt-4 text-lg text-zinc-300">
              TalentLink is your go-to platform for managing sponsorships and posting influencer job
              openings. Our mission is to bridge the gap between brands and talented influencers,
              helping them create valuable collaborations.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="mt-6 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-600 hover:border-zinc-500 transition-all"
            >
              Learn More
              <ArrowRight className="ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-800/50 border-zinc-700/50 group">
            <CardContent className="text-center space-y-4">
              <div className="p-3 bg-zinc-700/50 rounded-xl w-fit mx-auto group-hover:bg-zinc-600/50 transition-colors">
                <Briefcase className="h-8 w-8 text-zinc-400 group-hover:text-zinc-300" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">Manage Sponsorships</h3>
              <Separator className="my-2 bg-zinc-700/50" />
              <p className="text-zinc-300 leading-relaxed">
                Streamline your sponsorship process with automated tracking and real-time insights on influencer engagement.
              </p>
              <Button variant="ghost" className="text-zinc-400 hover:text-zinc-300">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-800/50 border-zinc-700/50 group">
            <CardContent className="text-center space-y-4">
              <div className="p-3 bg-zinc-700/50 rounded-xl w-fit mx-auto group-hover:bg-zinc-600/50 transition-colors">
                <Users className="h-8 w-8 text-zinc-400 group-hover:text-zinc-300" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">Post Job Openings</h3>
              <Separator className="my-2 bg-zinc-700/50" />
              <p className="text-zinc-300 leading-relaxed">
                Connect with top-tier influencers and content creators who align perfectly with your brand values.
              </p>
              <Button variant="ghost" className="text-zinc-400 hover:text-zinc-300">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-800/50 border-zinc-700/50 group">
            <CardContent className="text-center space-y-4">
              <div className="p-3 bg-zinc-700/50 rounded-xl w-fit mx-auto group-hover:bg-zinc-600/50 transition-colors">
                <MessageSquare className="h-8 w-8 text-zinc-400 group-hover:text-zinc-300" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">Collaborate Effectively</h3>
              <Separator className="my-2 bg-zinc-700/50" />
              <p className="text-zinc-300 leading-relaxed">
                Leverage our powerful communication tools to create impactful campaigns with your influencers.
              </p>
              <Button variant="ghost" className="text-zinc-400 hover:text-zinc-300">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
