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
    <Card className="w-full max-w-7xl mt-36 mx-auto ml-6 bg-zinc-950 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Trending Influencers
        </CardTitle>
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          Discover top influencers across platforms
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Influencer</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Engagement Rate</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInfluencers.map((influencer) => (
              <TableRow
                key={influencer.id}
                className="hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                      <AvatarImage
                        src={influencer.avatar}
                        alt={influencer.name}
                      />
                      <AvatarFallback>
                        {influencer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{influencer.name}</div>
                      <div className="text-sm text-zinc-500 flex items-center space-x-1">
                        <PlatformIcon platform={influencer.platform} />
                        <span>{influencer.platform}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{formatNumber(influencer.followers)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span>{influencer.engagementRate.toFixed(1)}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{influencer.roi.toFixed(1)}x</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedInfluencer(influencer)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                          Contact Information
                        </DialogTitle>
                      </DialogHeader>
                      {selectedInfluencer && (
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16 border-4 border-purple-200">
                              <AvatarImage
                                src={selectedInfluencer.avatar}
                                alt={selectedInfluencer.name}
                              />
                              <AvatarFallback>
                                {selectedInfluencer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-bold">
                                {selectedInfluencer.name}
                              </h3>
                              <p className="text-sm text-zinc-500 flex items-center space-x-1">
                                <PlatformIcon
                                  platform={selectedInfluencer.platform}
                                />
                                <span>
                                  {formatNumber(selectedInfluencer.followers)}{" "}
                                  followers
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <User className="h-5 w-5 text-zinc-400" />
                              <span className="font-semibold">Email:</span>
                              <span>{selectedInfluencer.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <UserCheck className="h-5 w-5 text-zinc-400" />
                              <span className="font-semibold">Phone:</span>
                              <span>{selectedInfluencer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-5 w-5 text-zinc-400" />
                              <span className="font-semibold">Address:</span>
                              <span>{selectedInfluencer.address}</span>
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
  );
}
