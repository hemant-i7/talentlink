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
import { Search, Plus, Edit, Trash2, Briefcase, DollarSign, Building2, FileText, CheckCircle, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <Toaster position="top-right" />
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-800/50 border-zinc-700">
            <TabsTrigger 
              value="current" 
              className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Current Brand Deals
            </TabsTrigger>
            <TabsTrigger 
              value="add"
              className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Brand Deal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight flex items-center">
                  <Briefcase className="w-8 h-8 mr-3 text-zinc-400" />
                  Brand Deals
                </h1>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-zinc-400 text-lg">Loading brands...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-red-400 text-lg">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBrands.map((brand) => (
                    <Card
                      key={brand._id}
                      className="bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300 border-zinc-700/50 hover:border-zinc-600"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={brand.imageUrl}
                            alt={brand.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700"
                          />
                          <div>
                            <CardTitle className="text-lg font-semibold text-zinc-100">
                              {brand.name}
                            </CardTitle>
                            <Badge 
                              variant="outline" 
                              className={`mt-2 ${
                                brand.sponsorshipAvailable
                                  ? "border-green-500/50 text-green-400"
                                  : "border-red-500/50 text-red-400"
                              }`}
                            >
                              {brand.sponsorshipAvailable ? "Available" : "Unavailable"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-zinc-300 line-clamp-2">
                          {brand.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-medium text-zinc-400 flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Sponsorship
                          </span>
                          <span className="text-sm font-semibold text-zinc-100">
                            ${brand.moneyOffered}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2 pt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-700 text-zinc-100 hover:text-white"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-700 text-zinc-100 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add">
            <Card className="bg-zinc-800/50 border-zinc-700/50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-zinc-100 flex items-center">
                  <Plus className="w-6 h-6 mr-2 text-zinc-400" />
                  Add New Brand Deal
                </CardTitle>
                <p className="text-sm text-zinc-400 mt-2">
                  Fill in the details below to create a new brand sponsorship opportunity.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-zinc-400" />
                    Brand Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={brandDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-zinc-400" />
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={brandDetails.description}
                    onChange={handleInputChange}
                    placeholder="Enter brand description"
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 min-h-[120px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-zinc-400" />
                    Money Offered
                  </label>
                  <Input
                    type="text"
                    name="moneyOffered"
                    value={brandDetails.moneyOffered}
                    onChange={handleInputChange}
                    placeholder="$ Enter sponsorship amount"
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 h-11 pl-7"
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    name="sponsorshipAvailable"
                    checked={brandDetails.sponsorshipAvailable}
                    onCheckedChange={(checked) =>
                      setBrandDetails((prev) => ({
                        ...prev,
                        sponsorshipAvailable: !!checked,
                      }))
                    }
                    className="border-zinc-700 data-[state=checked]:bg-zinc-700 data-[state=checked]:border-zinc-600"
                  />
                  <label className="text-sm font-medium text-zinc-300 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-zinc-400" />
                    Sponsorship Available
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center">
                    <Image className="w-4 h-4 mr-2 text-zinc-400" />
                    Image URL
                  </label>
                  <Input
                    type="text"
                    name="imageUrl"
                    value={brandDetails.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 h-11"
                  />
                </div>
                <Button
                  onClick={handleAddBrand}
                  className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-colors h-11 text-base font-medium"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Brand Deal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
