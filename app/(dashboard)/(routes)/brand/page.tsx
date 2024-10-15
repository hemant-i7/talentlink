"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import axios from "axios";

interface Brand {
  _id: string;
  name: string;
  description: string;
  moneyOffered: string;
  sponsorshipAvailable: boolean;
  imageUrl: string;
}

const UserDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch brands using Axios
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/brands/fetch"); // Axios GET request
        setBrands(response.data.brands); // Assuming the API returns { brands: Brand[] }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Filter brands based on search term
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-40 px-24">
      <div className="flex h-screen bg-black text-white">
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">Available Sponsorships</h1>
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
                      <p className="text-sm text-gray-400 mb-2">{brand.description}</p>
                      <p className="text-sm font-bold text-green-500">
                        Sponsorship: {brand.moneyOffered}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={brand.sponsorshipAvailable ? "default" : "secondary"}
                        disabled={!brand.sponsorshipAvailable}
                      >
                        {brand.sponsorshipAvailable
                          ? "Apply for Sponsorship"
                          : "Sponsorship Unavailable"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
