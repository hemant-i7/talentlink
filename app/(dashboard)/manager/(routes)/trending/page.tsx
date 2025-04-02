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
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-zinc-400" />
                Trending Influencers
              </h1>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Top 15 Creators
              </Badge>
            </div>
          </div>

          <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-zinc-400" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-zinc-800/50">
                    <TableHead className="text-zinc-400">Influencer</TableHead>
                    <TableHead className="text-zinc-400">Platform</TableHead>
                    <TableHead className="text-zinc-400">Followers</TableHead>
                    <TableHead className="text-zinc-400">Engagement Rate</TableHead>
                    <TableHead className="text-zinc-400">ROI</TableHead>
                    <TableHead className="text-zinc-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInfluencers.map((influencer) => (
                    <TableRow
                      key={influencer.id}
                      className="hover:bg-zinc-800/50 cursor-pointer"
                      onClick={() => setSelectedInfluencer(influencer)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={influencer.avatar} alt={influencer.name} />
                            <AvatarFallback className="bg-zinc-700 text-zinc-100">
                              {influencer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-zinc-100">{influencer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <PlatformIcon platform={influencer.platform} />
                          <span className="text-zinc-300 capitalize">{influencer.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-zinc-400" />
                          <span className="text-zinc-300">{formatNumber(influencer.followers)}</span>
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
                      <TableCell>
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
                                  <Avatar className="h-16 w-16">
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
                                <div className="space-y-2">
                                  <h3 className="text-sm font-medium text-zinc-400">Contact Information</h3>
                                  <div className="space-y-2">
                                    <p className="text-zinc-300 flex items-center">
                                      <span className="w-20 text-zinc-400">Email:</span>
                                      {selectedInfluencer.email}
                                    </p>
                                    <p className="text-zinc-300 flex items-center">
                                      <span className="w-20 text-zinc-400">Phone:</span>
                                      {selectedInfluencer.phone}
                                    </p>
                                    <p className="text-zinc-300 flex items-center">
                                      <span className="w-20 text-zinc-400">Location:</span>
                                      {selectedInfluencer.address}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h3 className="text-sm font-medium text-zinc-400">Performance Metrics</h3>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-zinc-800/50 p-3 rounded-lg">
                                      <p className="text-sm text-zinc-400">Followers</p>
                                      <p className="text-lg font-semibold text-zinc-100">
                                        {formatNumber(selectedInfluencer.followers)}
                                      </p>
                                    </div>
                                    <div className="bg-zinc-800/50 p-3 rounded-lg">
                                      <p className="text-sm text-zinc-400">Engagement Rate</p>
                                      <p className="text-lg font-semibold text-zinc-100">
                                        {selectedInfluencer.engagementRate}%
                                      </p>
                                    </div>
                                    <div className="bg-zinc-800/50 p-3 rounded-lg">
                                      <p className="text-sm text-zinc-400">ROI</p>
                                      <p className="text-lg font-semibold text-zinc-100">
                                        {selectedInfluencer.roi}x
                                      </p>
                                    </div>
                                  </div>
                                </div>
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
