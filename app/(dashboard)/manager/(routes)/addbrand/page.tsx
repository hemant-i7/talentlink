"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface Brand {
  _id: string;
  name: string;
  description: string;
  moneyOffered: string;
  sponsorshipAvailable: boolean;
  imageUrl: string;
  status?: string; // Optional field
}

const ManagerDashboard: React.FC = () => {
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

  // Fetch brands from API on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/brands/add");
        if (!res.ok) throw new Error("Failed to fetch brands");
        const data: Brand[] = await res.json();
        setBrandList(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      const { checked } = e.target;
      setBrandDetails((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setBrandDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle adding a new brand
  const handleAddBrand = async () => {
    const { name, description, moneyOffered, sponsorshipAvailable, imageUrl } = brandDetails;

    if (!name || !description || !moneyOffered || !imageUrl) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("/api/brands/add", brandDetails);

      if (response.status === 201) {
        toast.success("Brand added successfully!");

        // Update brand list with the new brand
        setBrandList((prev) => [...prev, response.data.brand]);

        // Reset form
        setBrandDetails({
          _id: "",
          name: "",
          description: "",
          moneyOffered: "",
          sponsorshipAvailable: true,
          imageUrl: "",
        });
      } else {
        toast.error("Failed to add brand");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the brand.");
    }
  };

  return (
    <div className="p-6">
      {/* Toaster component to show toast messages */}
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold mb-4">Manage Brand Deals</h1>
      <div className="space-y-6">
        {/* Form to Add New Brand */}
        <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Add New Brand</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand Name</label>
              <Input
                type="text"
                name="name"
                value={brandDetails.name}
                onChange={handleInputChange}
                placeholder="Enter brand name"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                name="description"
                value={brandDetails.description}
                onChange={handleInputChange}
                placeholder="Enter brand description"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Money Offered</label>
              <Input
                type="text"
                name="moneyOffered"
                value={brandDetails.moneyOffered}
                onChange={handleInputChange}
                placeholder="Enter sponsorship amount"
                className="w-full"
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
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                type="text"
                name="imageUrl"
                value={brandDetails.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className="w-full"
              />
            </div>
            <Button onClick={handleAddBrand} className="w-full bg-green-600">
              Add Brand Deal
            </Button>
          </CardContent>
        </Card>

        {/* Display list of brands for management */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Current Brand Deals</h2>
          {loading ? (
            <p>Loading brands...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {brandList.map((brand) => (
                <Card key={brand._id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>{brand.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-2">{brand.description}</p>
                    <p className="text-sm font-bold text-green-500">
                      Sponsorship: {brand.moneyOffered}
                    </p>
                    <p className="text-sm font-medium">
                      Status: {brand.sponsorshipAvailable ? "Available" : "Unavailable"}
                    </p>
                  </CardContent>
                  <CardFooter>{/* Future: Add Edit/Delete Buttons */}</CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
