"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

interface Brand {
  _id: string;
  name: string;
  description: string;
  moneyOffered: string;
  sponsorshipAvailable: boolean;
  imageUrl: string;
  status?: string;
}

export default function ManagerDashboard() {
  const [brandDetails, setBrandDetails] = useState<Brand>({
    _id: "",
    name: "",
    description: "",
    moneyOffered: "",
    sponsorshipAvailable: true,
    imageUrl: "",
  });
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/brands/fetch");
        setBrandList(response.data.brands);
      } catch (err: any) {
        setError(err.message || "Error fetching brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setBrandDetails((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setBrandDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddBrand = async () => {
    if (
      !brandDetails.name ||
      !brandDetails.description ||
      !brandDetails.moneyOffered ||
      !brandDetails.imageUrl
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("/api/brands/add", brandDetails);
      if (response.status === 201) {
        toast.success("Brand added successfully!");
        setBrandList((prev) => [...prev, response.data.brand]);
        setBrandDetails({
          _id: "",
          name: "",
          description: "",
          moneyOffered: "",
          sponsorshipAvailable: true,
          imageUrl: "",
        });
      } else {
        toast.error("Failed to add brand.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the brand.");
    }
  };

  const filteredBrands = brandList.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-40 px-24">
      <Toaster position="top-right" />
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="current">Current Brand Deals</TabsTrigger>
          <TabsTrigger value="add">Add New Brand Deal</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <div className="mb-6 relative">
            <Input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-zinc-900 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {loading ? (
            <p className="text-center">Loading brands...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBrands.map((brand) => (
                <Card
                  key={brand._id}
                  className="bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <img
                      src={brand.imageUrl}
                      alt={brand.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <CardTitle>{brand.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-2">
                      {brand.description}
                    </p>
                    <p className="text-sm font-bold text-white">
                      Sponsorship: {brand.moneyOffered}
                    </p>
                    <p className="text-sm font-medium">
                      Status:{" "}
                      <span
                        className={
                          brand.sponsorshipAvailable
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {brand.sponsorshipAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="add">
          <Card className="bg-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <Plus className="mr-2" /> Add New Brand Deal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Brand Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={brandDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                  className="w-full bg-zinc-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  name="description"
                  value={brandDetails.description}
                  onChange={handleInputChange}
                  placeholder="Enter brand description"
                  className="w-full bg-zinc-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Money Offered
                </label>
                <Input
                  type="text"
                  name="moneyOffered"
                  value={brandDetails.moneyOffered}
                  onChange={handleInputChange}
                  placeholder="Enter sponsorship amount"
                  className="w-full bg-zinc-900"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <Checkbox
                    name="sponsorshipAvailable"
                    checked={brandDetails.sponsorshipAvailable}
                    onCheckedChange={(checked) =>
                      setBrandDetails((prev) => ({
                        ...prev,
                        sponsorshipAvailable: !!checked,
                      }))
                    }
                  />
                  <span className="text-sm">Sponsorship Available</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <Input
                  type="text"
                  name="imageUrl"
                  value={brandDetails.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  className="w-full bg-zinc-900"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleAddBrand}
                className="w-full bg-white hover:bg-white/20"
              >
                Add Brand Deal
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
