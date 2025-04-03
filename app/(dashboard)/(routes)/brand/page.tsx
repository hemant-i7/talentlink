"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  X,
  DollarSign,
  Users,
  Link as LinkIcon,
  Send,
  Briefcase,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast, Toaster } from "react-hot-toast";

interface Brand {
  _id: string;
  name: string;
  description: string;
  moneyOffered: string;
  sponsorshipAvailable: boolean;
  imageUrl: string;
}

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const isLoaded = status !== "loading";
  const user = session?.user;

  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [socialCount, setSocialCount] = useState("");
  const [socialLink, setSocialLink] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/brands/fetch");
        setBrands(response.data.brands);
      } catch (err: any) {
        setError(err.message || "Error fetching brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openApplicationModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleApplicationSubmit = async () => {
    if (!selectedBrand) return;

    const userId = user?.email || "anonymous";

    try {
      const response = await axios.post("/api/application/add", {
        userId,
        brandId: selectedBrand._id,
        brandName: selectedBrand.name,
        message: applicationMessage,
        name,
        mobile,
        socialCount,
        socialLink,
      });

      if (response.status === 201) {
        toast.success("Application submitted successfully!");
        setIsModalOpen(false);
        resetApplicationForm();
      }
    } catch (error: any) {
      console.error(
        "Application submission error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to submit application"
      );
    }
  };

  const resetApplicationForm = () => {
    setApplicationMessage("");
    setName("");
    setMobile("");
    setSocialCount("");
    setSocialLink("");
  };

  if (!isLoaded) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <div className="max-w-7xl mx-auto">
        <Card className="bg-zinc-800/50 border-zinc-700/50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-zinc-100 flex items-center">
                <Building2 className="w-6 h-6 mr-2 text-zinc-400" />
                Available Sponsorships
              </CardTitle>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Powered by Talentlink
              </Badge>
            </div>
            <div className="relative mt-4">
              <Input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Clock className="w-6 h-6 animate-spin text-zinc-400 mr-2" />
                <p className="text-zinc-400">Loading brands...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-red-400">
                <XCircle className="w-6 h-6 mr-2" />
                <p>{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBrands.map((brand) => (
                  <Card key={brand._id} className="bg-zinc-800/50 border-zinc-700/50">
                    <CardContent className="p-6 relative">
                      {brand.sponsorshipAvailable && (
                        <Badge className="absolute top-2 right-2 bg-green-500/20 text-green-400 border-green-500/50">
                          Active
                        </Badge>
                      )}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={brand.imageUrl}
                            alt={`${brand.name} logo`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-zinc-100">{brand.name}</h2>
                          <Badge variant="outline" className="mt-1 border-zinc-700 text-zinc-400">
                            <Briefcase className="w-3 h-3 mr-1" />
                            Brand Partner
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                        {brand.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="border-green-500/20 text-green-400">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {brand.moneyOffered}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500/20 text-blue-400">
                          <Users className="w-3 h-3 mr-1" />
                          Open for Applications
                        </Badge>
                      </div>
                      <Button
                        className={`w-full ${
                          brand.sponsorshipAvailable
                            ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700"
                            : "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-500"
                        }`}
                        disabled={!brand.sponsorshipAvailable}
                        onClick={() => openApplicationModal(brand)}
                      >
                        {brand.sponsorshipAvailable ? (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Apply Now
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Currently Unavailable
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px] bg-zinc-800/90 border-zinc-700 text-white">
          <DialogHeader className="pb-4 border-b border-zinc-700/50">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                <div className="p-2 rounded-full bg-blue-500/10">
                  <Send className="w-5 h-5 text-blue-400" />
                </div>
                Apply for Sponsorship
              </DialogTitle>
              {selectedBrand && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {selectedBrand.name}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Active
                  </Badge>
                </div>
              )}
            </div>
            <p className="text-sm text-zinc-400 mt-2">Fill in your details to apply for this sponsorship opportunity.</p>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-zinc-400 flex items-center">
                  <User className="w-4 h-4 mr-2 text-zinc-500" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium text-zinc-400 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-zinc-500" />
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="socialCount" className="text-sm font-medium text-zinc-400 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-zinc-500" />
                  Follower Count
                </Label>
                <Input
                  id="socialCount"
                  value={socialCount}
                  onChange={(e) => setSocialCount(e.target.value)}
                  type="number"
                  placeholder="Enter your follower count"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialLink" className="text-sm font-medium text-zinc-400 flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2 text-zinc-500" />
                  Social Media Profile
                </Label>
                <Input
                  id="socialLink"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  placeholder="Enter your profile URL"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-zinc-400 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-zinc-500" />
                Why should we choose you?
              </Label>
              <Textarea
                id="message"
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                placeholder="Tell us why you'd be a great fit for this sponsorship..."
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter className="border-t border-zinc-700/50 pt-4">
            <div className="flex items-center gap-2 w-full justify-end">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleApplicationSubmit}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
