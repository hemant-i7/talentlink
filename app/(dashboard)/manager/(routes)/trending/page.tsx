"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Instagram,
  Twitter,
  Youtube,
  User,
  Users,
  UserPlus,
  UserCheck,
  Sparkles,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Influencer {
  id: number;
  name: string;
  avatar: string;
  followers: number;
  engagementRate: number;
  roi: number;
  platform: "instagram" | "youtube" | "twitter";
  email: string;
  phone: string;
  address: string;
}

const mockInfluencers: Influencer[] = [
  {
    id: 1,
    name: "Virat Kohli",
    avatar: "https://i.pravatar.cc/150?img=33",
    followers: 211000000,
    engagementRate: 2.5,
    roi: 8.7,
    platform: "instagram",
    email: "virat@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 2,
    name: "Priyanka Chopra",
    avatar: "https://i.pravatar.cc/150?img=5",
    followers: 83000000,
    engagementRate: 1.8,
    roi: 7.2,
    platform: "instagram",
    email: "priyanka@example.com",
    phone: "+91 98765 43211",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 3,
    name: "Amit Bhadana",
    avatar: "https://i.pravatar.cc/150?img=12",
    followers: 23700000,
    engagementRate: 5.2,
    roi: 9.1,
    platform: "youtube",
    email: "amit@example.com",
    phone: "+91 98765 43212",
    address: "New Delhi, India",
  },
  {
    id: 4,
    name: "Bhuvan Bam",
    avatar: "https://i.pravatar.cc/150?img=15",
    followers: 14900000,
    engagementRate: 4.8,
    roi: 8.9,
    platform: "youtube",
    email: "bhuvan@example.com",
    phone: "+91 98765 43213",
    address: "New Delhi, India",
  },
  {
    id: 5,
    name: "Kusha Kapila",
    avatar: "https://i.pravatar.cc/150?img=9",
    followers: 2900000,
    engagementRate: 3.7,
    roi: 7.8,
    platform: "instagram",
    email: "kusha@example.com",
    phone: "+91 98765 43214",
    address: "New Delhi, India",
  },
  {
    id: 6,
    name: "Ranveer Allahbadia",
    avatar: "https://i.pravatar.cc/150?img=11",
    followers: 3500000,
    engagementRate: 4.2,
    roi: 8.5,
    platform: "youtube",
    email: "ranveer@example.com",
    phone: "+91 98765 43215",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 7,
    name: "Prajakta Koli",
    avatar: "https://i.pravatar.cc/150?img=20",
    followers: 6800000,
    engagementRate: 3.9,
    roi: 8.1,
    platform: "instagram",
    email: "prajakta@example.com",
    phone: "+91 98765 43216",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 8,
    name: "Ashish Chanchlani",
    avatar: "https://i.pravatar.cc/150?img=22",
    followers: 28000000,
    engagementRate: 4.5,
    roi: 9.3,
    platform: "youtube",
    email: "ashish@example.com",
    phone: "+91 98765 43217",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 9,
    name: "Harsh Beniwal",
    avatar: "https://i.pravatar.cc/150?img=25",
    followers: 12000000,
    engagementRate: 4.1,
    roi: 8.6,
    platform: "youtube",
    email: "harsh@example.com",
    phone: "+91 98765 43218",
    address: "New Delhi, India",
  },
  {
    id: 10,
    name: "Dolly Singh",
    avatar: "https://i.pravatar.cc/150?img=29",
    followers: 1500000,
    engagementRate: 3.5,
    roi: 7.9,
    platform: "instagram",
    email: "dolly@example.com",
    phone: "+91 98765 43219",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 11,
    name: "Carry Minati",
    avatar: "https://i.pravatar.cc/150?img=30",
    followers: 32000000,
    engagementRate: 5.5,
    roi: 9.5,
    platform: "youtube",
    email: "carry@example.com",
    phone: "+91 98765 43220",
    address: "Delhi, India",
  },
  {
    id: 12,
    name: "Sejal Kumar",
    avatar: "https://i.pravatar.cc/150?img=31",
    followers: 1200000,
    engagementRate: 3.2,
    roi: 7.6,
    platform: "instagram",
    email: "sejal@example.com",
    phone: "+91 98765 43221",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 13,
    name: "Tanmay Bhat",
    avatar: "https://i.pravatar.cc/150?img=32",
    followers: 7000000,
    engagementRate: 4.7,
    roi: 8.8,
    platform: "youtube",
    email: "tanmay@example.com",
    phone: "+91 98765 43222",
    address: "Mumbai, Maharashtra, India",
  },
  {
    id: 14,
    name: "Ankush Bahuguna",
    avatar: "https://i.pravatar.cc/150?img=33",
    followers: 900000,
    engagementRate: 3.3,
    roi: 7.5,
    platform: "instagram",
    email: "ankush@example.com",
    phone: "+91 98765 43223",
    address: "Delhi, India",
  },
  {
    id: 15,
    name: "Mostly Sane",
    avatar: "https://i.pravatar.cc/150?img=34",
    followers: 4200000,
    engagementRate: 3.8,
    roi: 8.2,
    platform: "youtube",
    email: "mostlysane@example.com",
    phone: "+91 98765 43224",
    address: "Mumbai, Maharashtra, India",
  },
];

export default function Component() {
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const PlatformIcon = ({ platform }: { platform: Influencer["platform"] }) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-500" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-zinc-400" />
                Trending Influencers
              </h1>
              <p className="text-zinc-400">
                Connect with top performing creators in your industry
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-zinc-700 text-zinc-400 px-4 py-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Top 15 Creators
              </Badge>
            </div>
          </div>

          <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-zinc-400" />
                  Performance Metrics
                </div>
                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                  Live Rankings
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-zinc-800/50 border-zinc-700">
                    <TableHead className="text-zinc-400 font-medium">Influencer</TableHead>
                    <TableHead className="text-zinc-400 font-medium">Platform</TableHead>
                    <TableHead className="text-zinc-400 font-medium">Followers</TableHead>
                    <TableHead className="text-zinc-400 font-medium">Engagement Rate</TableHead>
                    <TableHead className="text-zinc-400 font-medium">ROI</TableHead>
                    <TableHead className="text-zinc-400 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInfluencers.map((influencer, index) => (
                    <TableRow
                      key={influencer.id}
                      className="hover:bg-zinc-800/50 border-zinc-700/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedInfluencer(influencer)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10 border-2 border-zinc-700/50">
                              <AvatarImage src={influencer.avatar} alt={influencer.name} />
                              <AvatarFallback className="bg-zinc-700 text-zinc-100">
                                {influencer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <Badge 
                              className="absolute -top-2 -left-2 h-5 w-5 p-0 flex items-center justify-center bg-white border-zinc-200 text-black font-medium"
                              variant="outline"
                            >
                              {index + 1}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-zinc-100 font-medium">{influencer.name}</p>
                            <p className="text-xs text-zinc-400">{influencer.address}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 rounded-md bg-zinc-800/50 border border-zinc-700/50">
                            <PlatformIcon platform={influencer.platform} />
                          </div>
                          <span className="text-zinc-300 capitalize">{influencer.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-zinc-400" />
                          <span className="text-zinc-300 font-medium">{formatNumber(influencer.followers)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${
                            influencer.engagementRate >= 4 
                              ? "border-green-500/50 text-green-400" 
                              : influencer.engagementRate >= 3
                              ? "border-yellow-500/50 text-yellow-400"
                              : "border-red-500/50 text-red-400"
                          }`}
                        >
                          {influencer.engagementRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${
                            influencer.roi >= 8.5 
                              ? "border-green-500/50 text-green-400" 
                              : influencer.roi >= 7.5
                              ? "border-yellow-500/50 text-yellow-400"
                              : "border-red-500/50 text-red-400"
                          }`}
                        >
                          {influencer.roi}x
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-700 text-zinc-100 hover:text-white"
                            >
                              <UserPlus className="w-4 h-4 mr-2" />
                              Connect
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-zinc-800 border-zinc-700">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-semibold text-zinc-100 flex items-center">
                                <UserCheck className="w-5 h-5 mr-2 text-zinc-400" />
                                Influencer Details
                              </DialogTitle>
                            </DialogHeader>
                            {selectedInfluencer && (
                              <div className="mt-6 space-y-6">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-16 w-16 border-2 border-zinc-700">
                                    <AvatarImage
                                      src={selectedInfluencer.avatar}
                                      alt={selectedInfluencer.name}
                                    />
                                    <AvatarFallback className="bg-zinc-700 text-zinc-100">
                                      {selectedInfluencer.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-sm font-medium text-zinc-400">Influencer Name</h3>
                                    <p className="text-lg font-semibold text-zinc-100">{selectedInfluencer.name}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2 bg-zinc-900/50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-zinc-400">Contact Information</h3>
                                    <div className="space-y-2">
                                      <p className="text-zinc-300 text-sm flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-zinc-400" />
                                        {selectedInfluencer.email}
                                      </p>
                                      <p className="text-zinc-300 text-sm flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-zinc-400" />
                                        {selectedInfluencer.phone}
                                      </p>
                                      <p className="text-zinc-300 text-sm flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-zinc-400" />
                                        {selectedInfluencer.address}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-2 bg-zinc-900/50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-zinc-400">Performance Metrics</h3>
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center">
                                        <span className="text-zinc-400 text-sm">Followers</span>
                                        <span className="text-zinc-100 font-medium">
                                          {formatNumber(selectedInfluencer.followers)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-zinc-400 text-sm">Engagement</span>
                                        <span className="text-zinc-100 font-medium">
                                          {selectedInfluencer.engagementRate}%
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-zinc-400 text-sm">ROI</span>
                                        <span className="text-zinc-100 font-medium">
                                          {selectedInfluencer.roi}x
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100">
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Send Connection Request
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
