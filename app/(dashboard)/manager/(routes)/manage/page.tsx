"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define types for your application data
interface Application {
  _id: string;               // Assuming _id is a string
  userId: string;            // Assuming userId is a string
  brandId: { name: string }; // Assuming brandId contains a name field
  message: string;           // Assuming there's a message field
  createdAt: string;         // Assuming createdAt is a string in ISO format
}

export default function ManagerDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/application/fetchAll"); // Ensure this matches your API route
        if (response.data.success) {
          setApplications(response.data.applications);
        } else {
          setError("Failed to fetch applications.");
        }
      } catch (err: any) {
        setError(err.message || "Error fetching applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-40 px-24">
      <h1 className="text-2xl font-bold mb-6">Application Submissions</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <Card key={application._id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>{application.brandId?.name || "Unknown Brand"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">User ID: {application.userId}</p>
                <p className="text-sm">Message: {application.message}</p>
                <p className="text-sm">Submitted on: {new Date(application.createdAt).toLocaleString()}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
