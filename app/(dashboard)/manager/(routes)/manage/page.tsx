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
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Application Submissions</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              </div>
              <Select value={statusFilter} onValueChange={(value: Application["status"] | "all") => setStatusFilter(value)}>
                <SelectTrigger className="w-40 bg-zinc-800/50 border-zinc-700 text-zinc-100">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-zinc-400 text-lg">Loading applications...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredApplications.map((application) => (
                <Card
                  key={application._id}
                  className="bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300 border-zinc-700/50 hover:border-zinc-600"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-zinc-100">
                        {application.brandName || "Unknown Brand"}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`${
                          application.status === "accepted" 
                            ? "border-green-500/50 text-green-400" 
                            : application.status === "rejected"
                            ? "border-red-500/50 text-red-400"
                            : "border-yellow-500/50 text-yellow-400"
                        }`}
                      >
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${application.name}`}
                          alt={application.name}
                        />
                        <AvatarFallback className="bg-zinc-700 text-zinc-100">
                          {application.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-zinc-100">{application.name}</p>
                        <p className="text-xs text-zinc-400">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 line-clamp-2">
                      {application.message}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                          className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-700 text-zinc-100 hover:text-white transition-colors"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-800 border-zinc-700">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold text-zinc-100">
                            Application Details
                          </DialogTitle>
                        </DialogHeader>
                        {selectedApplication && (
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage
                                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedApplication.name}`}
                                  alt={selectedApplication.name}
                                />
                                <AvatarFallback className="bg-zinc-700 text-zinc-100">
                                  {selectedApplication.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-sm font-medium text-zinc-400">Applicant Name</h3>
                                <p className="text-lg font-semibold text-zinc-100">{selectedApplication.name}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-zinc-400">Brand Name</h3>
                              <p className="text-zinc-100">{selectedApplication.brandName}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-zinc-400">Message</h3>
                              <p className="text-zinc-100">{selectedApplication.message}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-zinc-400">Contact</h3>
                              <p className="text-zinc-100">{selectedApplication.mobile}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-zinc-400">Social Links</h3>
                              <p className="text-zinc-100">{selectedApplication.socialLink}</p>
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
      </div>
    </div>
  );
}
