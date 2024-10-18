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
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

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
}

export default function UserDashboard() {
  const { user, isLoaded } = useUser();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching applications for user:", user.id);
        const response = await axios.post("/api/application/user", {
          userId: user.id,
        });
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
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">
            Loading user information...
          </h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white pt-40 px-8 md:px-24 flex items-center justify-center">
        <Card className="bg-zinc-800 border-zinc-700 p-8 max-w-md w-full">
          <CardTitle className="text-2xl font-bold mb-4 text-center">
            Access Denied
          </CardTitle>
          <p className="text-center text-zinc-400">
            Please log in to view your applications.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-40 px-8 md:px-24">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        My Applications
      </h1>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold">Loading applications...</h2>
          </div>
        </div>
      ) : error ? (
        <Card className="bg-zinc-800 border-zinc-700 p-8">
          <CardTitle className="text-2xl font-bold mb-4 text-center text-red-500">
            Error
          </CardTitle>
          <p className="text-center text-zinc-400">{error}</p>
        </Card>
      ) : applications.length === 0 ? (
        <Card className="bg-zinc-800 border-zinc-700 p-8">
          <CardTitle className="text-2xl font-bold mb-4 text-center">
            No Applications Yet
          </CardTitle>
          <p className="text-center text-zinc-400">
            You haven't submitted any applications yet.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <Card
              key={application._id}
              className="bg-zinc-800 border-zinc-700 overflow-hidden group hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="bg-zinc-700 pb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <CardTitle className="relative z-10">
                  {application.brandName}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 mb-4">
                  <p className="flex items-center text-sm text-zinc-400">
                    <User className="mr-2 text-purple-400" size={16} />{" "}
                    {application.name}
                  </p>
                  <p className="flex items-center text-sm text-zinc-400">
                    <Phone className="mr-2 text-green-400" size={16} />{" "}
                    {application.mobile}
                  </p>
                  <p className="flex items-center text-sm text-zinc-400">
                    <Users className="mr-2 text-blue-400" size={16} />{" "}
                    {application.socialCount} followers
                  </p>
                  <p className="flex items-center text-sm text-zinc-400">
                    <Link className="mr-2 text-pink-400" size={16} />
                    <a 
                      href={application.socialLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Social Profile
                    </a>
                  </p>
                </div>
                <div className="bg-zinc-700 p-3 rounded-lg mb-4 hover:bg-zinc-600 transition-colors duration-300">
                  <p className="text-sm text-zinc-300 flex items-start">
                    <Send
                      className="mr-2 text-yellow-400 flex-shrink-0 mt-1"
                      size={16}
                    />
                    {application.message}
                  </p>
                </div>
                <p className="text-xs text-zinc-500 flex items-center">
                  <Clock className="mr-1 text-indigo-400" size={12} />
                  Applied on:{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
