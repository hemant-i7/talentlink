"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  X,
  DollarSign,
  Users,
  Link as LinkIcon,
  Send,
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

  // We allow all users to view the page now, even without authentication
  return (
    <div className="pt-40 px-24 h-screen bg-zinc-950 text-white overflow-auto">
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Available Sponsorships</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-zinc-800 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          </div>
        </div>

        {loading ? (
          <p>Loading brands...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map((brand) => (
              <div key={brand._id} className="bg-zinc-800 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={brand.imageUrl}
                    alt={`${brand.name} logo`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h2 className="text-xl font-bold">{brand.name}</h2>
                </div>
                <p className="text-sm text-zinc-400 mb-2">
                  {brand.description}
                </p>
                <p className="text-sm font-bold text-green-500 flex items-center mb-4">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Sponsorship: {brand.moneyOffered}
                </p>
                <Button
                  className="w-full"
                  variant={brand.sponsorshipAvailable ? "default" : "secondary"}
                  disabled={!brand.sponsorshipAvailable}
                  onClick={() => openApplicationModal(brand)}
                >
                  {brand.sponsorshipAvailable
                    ? "Apply for Sponsorship"
                    : "Unavailable"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Send className="w-5 h-5" />
              Apply for Sponsorship
              {selectedBrand && ` - ${selectedBrand.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 bg-zinc-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobile" className="text-right">
                Mobile
              </Label>
              <Input
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="col-span-3 bg-zinc-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="socialCount"
                className="text-right flex items-center justify-end"
              >
                <Users className="w-4 h-4 mr-2" />
                Followers
              </Label>
              <Input
                id="socialCount"
                value={socialCount}
                onChange={(e) => setSocialCount(e.target.value)}
                className="col-span-3 bg-zinc-700 text-white"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="socialLink"
                className="text-right flex items-center justify-end"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Social Link
              </Label>
              <Input
                id="socialLink"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                className="col-span-3 bg-zinc-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                className="col-span-3 bg-zinc-700 text-white"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleApplicationSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
