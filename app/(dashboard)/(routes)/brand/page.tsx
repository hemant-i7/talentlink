"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Brand {
  _id: string;
  name: string;
  description: string;
  moneyOffered: string;
  sponsorshipAvailable: boolean;
  imageUrl: string;
}

const UserDashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [applicationMessage, setApplicationMessage] = useState<string>("");
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
    if (!selectedBrand || !user) return;

    try {
      const response = await axios.post("/api/application/add", {
        userId: user.id,
        brandId: selectedBrand._id,
        brandName: selectedBrand.name,
        message: applicationMessage,
        name,
        mobile,
        socialCount,
        socialLink,
      });

      if (response.status === 201) {
        alert("Application submitted successfully!");
        setIsModalOpen(false);
        resetApplicationForm();
      }
    } catch (error: any) {
      console.error(
        "Application submission error:",
        error.response?.data || error.message
      );
      alert(
        "Failed to submit application: " +
          (error.response?.data?.message || error.message)
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

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="pt-40 px-24">
      <div className="flex h-screen bg-black text-white">
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">
                Available Sponsorships
              </h1>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 bg-gray-800 text-white border-gray-700"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {loading ? (
              <p>Loading brands...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBrands.map((brand) => (
                  <Card key={brand._id} className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <img
                        src={brand.imageUrl}
                        alt={`${brand.name} logo`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <CardTitle>{brand.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-2">
                        {brand.description}
                      </p>
                      <p className="text-sm font-bold text-green-500">
                        Sponsorship: {brand.moneyOffered}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={
                          brand.sponsorshipAvailable ? "default" : "secondary"
                        }
                        disabled={!brand.sponsorshipAvailable}
                        onClick={() => openApplicationModal(brand)}
                      >
                        {brand.sponsorshipAvailable
                          ? "Apply for Sponsorship"
                          : "Unavailable"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Apply for Sponsorship
              {selectedBrand && ` - ${selectedBrand.name}`}
            </DialogTitle>
            <Button
              variant="ghost"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={() => setIsModalOpen(false)}
            >
             
              <span className="sr-only">Close</span>
            </Button>
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
                className="col-span-3 bg-gray-700 text-white"
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
                className="col-span-3 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="socialCount" className="text-right">
                Followers
              </Label>
              <Input
                id="socialCount"
                value={socialCount}
                onChange={(e) => setSocialCount(e.target.value)}
                className="col-span-3 bg-gray-700 text-white"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="socialLink" className="text-right">
                Social Link
              </Label>
              <Input
                id="socialLink"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                className="col-span-3 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder={
                  selectedBrand
                    ? `Why do you want sponsorship from ${selectedBrand.name}?`
                    : "Why do you want this sponsorship?"
                }
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                className="col-span-3 bg-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleApplicationSubmit} className="w-full">
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;