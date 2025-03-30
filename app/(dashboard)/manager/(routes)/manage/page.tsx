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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  Calendar,
  Eye,
  MessageSquare,
  Phone,
  Share2,
  User,
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface Application {
  _id: string;
  userId: string;
  brandId: { name: string };
  brandName: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  name: string;
  mobile: string;
  socialCount: number;
  socialLink: string;
  createdAt: string;
}

export default function ManagerDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    Application["status"] | "all"
  >("all");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/application/fetchAll");
        if (response.data.success) {
          setApplications(response.data.applications);
          setFilteredApplications(response.data.applications);
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

  useEffect(() => {
    const filtered = applications.filter(
      (app) =>
        (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.brandName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || app.status === statusFilter)
    );
    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-40 px-4 sm:px-6 lg:px-24">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Briefcase className="mr-2 h-8 w-8 text-blue-500" />
        Application Submissions
      </h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-800 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
        </div>
      </div>
      {loading ? (
        <p className="text-center text-xl">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500 text-center text-xl">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((application) => (
            <Card
              key={application._id}
              className="bg-zinc-800 hover:bg-zinc-700 transition-colors border-zinc-600"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">
                    {application.brandName || "Unknown Brand"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${application.name}`}
                        alt={application.name}
                      />
                      <AvatarFallback>
                        {application.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <p className="text-sm flex items-center">
                      <User className="mr-2 h-4 w-4 text-purple-500" />
                      {application.name}
                    </p>
                  </div>
                  <p className="text-sm flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                    {application.message.substring(0, 50)}...
                  </p>
                  <p className="text-sm flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    {new Date(application.createdAt).toLocaleString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedApplication(application)}
                      className="w-full"
                    >
                      <Eye className="mr-2 h-4 w-4 text-blue-500" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-800 text-white border border-zinc-700">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold flex items-center">
                        <Eye className="mr-2 h-6 w-6 text-blue-500" />
                        Application Details
                      </DialogTitle>
                    </DialogHeader>
                    {selectedApplication && (
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <Avatar className="h-16 w-16 mr-4">
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedApplication.name}`}
                              alt={selectedApplication.name}
                            />
                            <AvatarFallback>
                              {selectedApplication.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold flex items-center">
                              <User className="mr-2 h-4 w-4 text-purple-500" />
                              Applicant Name
                            </h3>
                            <p>{selectedApplication.name}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Briefcase className="mr-2 h-4 w-4 text-yellow-500" />
                            Brand Name
                          </h3>
                          <p>{selectedApplication.brandName}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                            Message
                          </h3>
                          <p>{selectedApplication.message}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-blue-500" />
                            Mobile
                          </h3>
                          <p>{selectedApplication.mobile}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Users className="mr-2 h-4 w-4 text-pink-500" />
                            Social Media Followers
                          </h3>
                          <p>{selectedApplication.socialCount}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Share2 className="mr-2 h-4 w-4 text-indigo-500" />
                            Social Media Link
                          </h3>
                          <a
                            href={selectedApplication.socialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {selectedApplication.socialLink}
                          </a>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                            Submitted on
                          </h3>
                          <p>
                            {new Date(
                              selectedApplication.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
