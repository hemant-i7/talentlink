"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  LogIn,
  Building2,
  Users,
  Briefcase,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Bell,
  Mail,
  Calendar,
  DollarSign,
  BarChart3,
  Activity,
  Award,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSession, signIn } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Stats {
  totalApplications: number;
  activeCollaborations: number;
  pendingRequests: number;
  completedProjects: number;
  earnings: number;
  rating: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'collaboration' | 'message' | 'application' | 'payment';
  read: boolean;
}

const Dashboard: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isManager, setIsManager] = useState(true);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Mock data for demonstration
  const stats: Stats = {
    totalApplications: 24,
    activeCollaborations: 5,
    pendingRequests: 3,
    completedProjects: 16,
    earnings: 12500,
    rating: 4.8,
  };

  const recentNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Collaboration Request',
      message: 'Nike has sent you a collaboration request for their summer campaign',
      time: '2 hours ago',
      type: 'collaboration',
      read: false,
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of $2,500 received from Adidas campaign',
      time: '5 hours ago',
      type: 'payment',
      read: false,
    },
    {
      id: '3',
      title: 'Application Update',
      message: 'Your application for Puma campaign has been shortlisted',
      time: '1 day ago',
      type: 'application',
      read: true,
    },
  ];

  const upcomingDeadlines = [
    {
      brand: 'Nike',
      project: 'Summer Collection Launch',
      deadline: '2024-04-15',
      status: 'In Progress',
    },
    {
      brand: 'Adidas',
      project: 'Sportswear Campaign',
      deadline: '2024-04-20',
      status: 'Not Started',
    },
  ];

  useEffect(() => {
    setIsManager(pathname === "/manager/dashboard");
  }, [pathname]);

  const toggleDashboard = () => {
    const newIsManager = !isManager;
    setIsManager(newIsManager);
    router.push(newIsManager ? "/manager/dashboard" : "/influencer/dashboard");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'collaboration':
        return <Briefcase className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'application':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100 flex items-center">
              <Building2 className="w-6 h-6 mr-2 text-zinc-400" />
              Influencer Dashboard
            </h1>
            <p className="text-zinc-400 mt-1">Welcome back, {session?.user?.name || 'Guest'}</p>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && session.user ? (
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative h-9 w-9 border-zinc-700 bg-zinc-800/50">
                  <Bell className="h-4 w-4 text-zinc-400" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Avatar className="h-9 w-9 border-2 border-zinc-700">
                  <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                  <AvatarFallback className="bg-zinc-800 text-zinc-100">
                    {session.user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 bg-zinc-800/50 text-zinc-100 hover:bg-zinc-800"
                onClick={() => signIn('google')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-zinc-100">{stats.totalApplications}</div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Active Collaborations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-zinc-100">{stats.activeCollaborations}</div>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                  <Activity className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-zinc-100">${stats.earnings.toLocaleString()}</div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  <DollarSign className="w-3 h-3 mr-1" />
                  This Month
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-zinc-100">{stats.rating}</div>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  <Star className="w-3 h-3 mr-1" />
                  Excellent
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-zinc-800/50 border-zinc-700/50">
            <CardHeader>
              <CardTitle className="text-zinc-100">Recent Activity</CardTitle>
              <CardDescription className="text-zinc-400">Your latest notifications and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 p-3 rounded-lg bg-zinc-800 border border-zinc-700/50"
                >
                  <div className={`p-2 rounded-full ${
                    notification.read ? 'bg-zinc-700/50' : 'bg-blue-500/20'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-zinc-100">{notification.title}</p>
                    <p className="text-xs text-zinc-400">{notification.message}</p>
                    <p className="text-xs text-zinc-500">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">New</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader>
              <CardTitle className="text-zinc-100">Upcoming Deadlines</CardTitle>
              <CardDescription className="text-zinc-400">Your scheduled deliverables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-zinc-100">{deadline.brand}</h4>
                    <Badge
                      variant="outline"
                      className={deadline.status === 'In Progress' 
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}
                    >
                      {deadline.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-400">{deadline.project}</p>
                  <div className="flex items-center text-xs text-zinc-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    Due {new Date(deadline.deadline).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Button
            variant="outline"
            className="h-auto py-4 px-6 bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
            onClick={() => router.push('/collaborations')}
          >
            <div className="flex flex-col items-center text-center">
              <Briefcase className="h-6 w-6 mb-2 text-zinc-400" />
              <span className="text-sm font-medium">View Applications</span>
              <span className="text-xs text-zinc-400 mt-1">Check your application status</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 px-6 bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
            onClick={() => router.push('/messages')}
          >
            <div className="flex flex-col items-center text-center">
              <MessageSquare className="h-6 w-6 mb-2 text-zinc-400" />
              <span className="text-sm font-medium">Messages</span>
              <span className="text-xs text-zinc-400 mt-1">Chat with brands</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 px-6 bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
            onClick={() => router.push('/analytics')}
          >
            <div className="flex flex-col items-center text-center">
              <BarChart3 className="h-6 w-6 mb-2 text-zinc-400" />
              <span className="text-sm font-medium">Analytics</span>
              <span className="text-xs text-zinc-400 mt-1">View your performance</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 px-6 bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
            onClick={() => router.push('/settings')}
          >
            <div className="flex flex-col items-center text-center">
              <Award className="h-6 w-6 mb-2 text-zinc-400" />
              <span className="text-sm font-medium">Profile</span>
              <span className="text-xs text-zinc-400 mt-1">Update your details</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
