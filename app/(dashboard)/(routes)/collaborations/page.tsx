"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Users,
  Link,
  Clock,
  Send,
  Briefcase,
  Building2,
  HandshakeIcon,
  Calendar,
  MessageSquare,
  ShoppingBag,
  Store,
  Shirt,
  Gem,
  Crown,
  Sparkles,
  Palette,
  Laptop,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";

// Brand logo mapping
const brandLogos: { [key: string]: string } = {
  "Nike": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nike_Logo.svg/1200px-Nike_Logo.svg.png",
  "Adidas": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
  "Puma": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_Logo.svg/2560px-Puma_Logo.svg.png",
  "Under Armour": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Under_armour_logo.svg/2560px-Under_armour_logo.svg.png",
  "Reebok": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Reebok_2019_logo.svg/2560px-Reebok_2019_logo.svg.png",
  "New Balance": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/1200px-New_Balance_logo.svg.png",
  "Asics": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Asics_Logo.svg/2560px-Asics_Logo.svg.png",
  "Fila": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Fila_logo.svg/2560px-Fila_logo.svg.png",
  "Converse": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/1200px-Converse_logo.svg.png",
  "Vans": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vans_logo.svg/2560px-Vans_logo.svg.png",
  "Mama Earth": "https://upload.wikimedia.org/wikipedia/commons/3/34/Mamaearth_Logo.png",
  "Zebronics": "https://zebrronics.com/cdn/shop/files/Zebronics_Logo_100x.png?v=1613549671",
  "Mamaearth": "https://upload.wikimedia.org/wikipedia/commons/3/34/Mamaearth_Logo.png",
  "Zebracrics": "https://zebrronics.com/cdn/shop/files/Zebronics_Logo_100x.png?v=1613549671",
};

// Fallback brand icons from Lucide
const fallbackIcons = [
  ShoppingBag,
  Store,
  Shirt,
  Gem,
  Crown,
  Sparkles,
  Palette,
  Laptop,
  HeartHandshake,
  BadgeCheck,
];

// Function to get consistent icon for a brand name
const getFallbackIcon = (brandName: string) => {
  // Use the sum of character codes to get a consistent index
  const sum = brandName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = sum % fallbackIcons.length;
  const IconComponent = fallbackIcons[index];
  return <IconComponent className="w-8 h-8 text-zinc-100" />;
};

// Function to get brand logo URL or fallback icon
const getBrandLogo = (brandName: string): string | JSX.Element => {
  // First try exact match
  if (brandLogos[brandName]) {
    return brandLogos[brandName];
  }

  // Try case-insensitive match
  const lowerBrandName = brandName.toLowerCase();
  const foundBrand = Object.keys(brandLogos).find(
    brand => brand.toLowerCase() === lowerBrandName
  );
  
  if (foundBrand) {
    return brandLogos[foundBrand];
  }

  // Return fallback icon
  return getFallbackIcon(brandName);
};

interface Application {
  _id: string;
  brandId: string;
  brandName: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  name: string;
  mobile: string;
  socialCount: string;
  socialLink: string;
  userImage?: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "accepted":
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
          <CheckCircle className="w-3 h-3 mr-1" />
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
  }
};

export default function UserDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/application/fetch");
        console.log("API Response:", response.data);
        if (response.data.success) {
          setApplications(response.data.applications);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch applications"
          );
        }
      } catch (err: any) {
        console.error("Error fetching applications:", err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-zinc-800/50 border-zinc-700/50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-zinc-100 flex items-center">
                <HandshakeIcon className="w-6 h-6 mr-2 text-zinc-400" />
                My Applications
              </CardTitle>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Powered by Talentlink
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-400 mr-2" />
                <p className="text-zinc-400">Loading applications...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-red-400">
                <XCircle className="w-6 h-6 mr-2" />
                <p>{error}</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-zinc-800 mb-4">
                  <Building2 className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-300 mb-2">No Applications Yet</h3>
                <p className="text-zinc-400 max-w-md">
                  You haven't submitted any applications yet. Start exploring brands and apply for sponsorships.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((application) => (
                  <Card
                    key={application._id}
                    className="bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600 transition-all duration-300"
                  >
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(application.status)}
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full border-2 border-zinc-700 bg-zinc-800 overflow-hidden flex items-center justify-center">
                            {getFallbackIcon(application.brandName)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-zinc-800 border border-zinc-700">
                            <Briefcase className="w-4 h-4 text-zinc-400" />
                          </div>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-zinc-100">
                            {application.brandName}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(application.createdAt).toLocaleDateString()}
                            </Badge>
                            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                              ID: #{application._id.slice(-4)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700/50">
                            <p className="text-xs text-zinc-500 mb-1">Applicant</p>
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <img
                                  src={application.userImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(application.name)}&background=18181b&color=fff`}
                                  alt={application.name}
                                  className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                                />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-800"></div>
                              </div>
                              <p className="text-sm text-zinc-300 flex items-center">
                                {application.name}
                              </p>
                            </div>
                          </div>
                          <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700/50">
                            <p className="text-xs text-zinc-500 mb-1">Contact</p>
                            <p className="text-sm text-zinc-300 flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-zinc-500" />
                              {application.mobile}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700/50">
                            <p className="text-xs text-zinc-500 mb-1">Following</p>
                            <p className="text-sm text-zinc-300 flex items-center">
                              <Users className="w-4 h-4 mr-2 text-zinc-500" />
                              {application.socialCount}
                            </p>
                          </div>
                          <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700/50">
                            <p className="text-xs text-zinc-500 mb-1">Profile</p>
                            <a
                              href={application.socialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-400 hover:underline flex items-center"
                            >
                              <Link className="w-4 h-4 mr-2" />
                              View Profile
                            </a>
                          </div>
                        </div>

                        <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700/50">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-zinc-500 flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Application Message
                            </p>
                            <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                              {application.message.length} chars
                            </Badge>
                          </div>
                          <p className="text-sm text-zinc-300 line-clamp-3">
                            {application.message}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2">
                          <p className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(application.createdAt).toLocaleTimeString()}
                          </p>
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Brand ID: {String(application.brandId).slice(-6)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
