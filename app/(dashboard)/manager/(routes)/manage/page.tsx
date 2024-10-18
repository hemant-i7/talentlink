"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/application/fetchAll");
        if (response.data.success) {
          setApplications(response.data.applications);
          console.log("Applications:", response.data.applications);
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

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

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
                <CardTitle>{application.brandName || "Unknown Brand"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">User ID: {application.userId}</p>
                <p className="text-sm">Message: {application.message}</p>
                <p className="text-sm">Submitted on: {new Date(application.createdAt).toLocaleString()}</p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedApplication(application)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 text-white">
                    <DialogHeader>
                      <DialogTitle>Application Details</DialogTitle>
                    </DialogHeader>
                    {selectedApplication && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <h3 className="font-semibold">Brand Name</h3>
                          <p>{selectedApplication.brandName}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Applicant Name</h3>
                          <p>{selectedApplication.name}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">User ID</h3>
                          <p>{selectedApplication.userId}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Message</h3>
                          <p>{selectedApplication.message}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Mobile</h3>
                          <p>{selectedApplication.mobile}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Social Media Followers</h3>
                          <p>{selectedApplication.socialCount}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Social Media Link</h3>
                          <a href={selectedApplication.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {selectedApplication.socialLink}
                          </a>
                        </div>
                        <div>
                          <h3 className="font-semibold">Status</h3>
                          <Badge className={`${getStatusColor(selectedApplication.status)} text-white`}>
                            {selectedApplication.status}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold">Submitted on</h3>
                          <p>{new Date(selectedApplication.createdAt).toLocaleString()}</p>
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