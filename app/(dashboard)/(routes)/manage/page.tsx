"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Pencil,
  Trash2,
  Briefcase,
  Users,
  FileText,
  Code,
  Award,
  MapPin,
  DollarSign,
  Calendar,
  Save,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "react-hot-toast";

export default function Setting() {
  const [jobPostings, setJobPostings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedPostings = localStorage.getItem("jobPostings");
    if (storedPostings) {
      setJobPostings(JSON.parse(storedPostings));
    }
  }, []);

  const handleEdit = (id) => {
    if (editingId === id) return; // Prevent editing if already editing
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
    localStorage.setItem("jobPostings", JSON.stringify(jobPostings));
    toast.success("Saved successfully", {
      style: {
        background: "#10B981",
        color: "#FFFFFF",
      },
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#10B981",
      },
    });
  };

  const handleChange = (id, field, value) => {
    setJobPostings(
      jobPostings.map((job) =>
        job.id === id ? { ...job, [field]: value } : job
      )
    );
  };

  const handleDelete = (id) => {
    const updatedPostings = jobPostings.filter((job) => job.id !== id);
    setJobPostings(updatedPostings);
    localStorage.setItem("jobPostings", JSON.stringify(updatedPostings));
    toast.error("Deleted successfully", {
      style: {
        background: "#EF4444",
        color: "#FFFFFF",
      },
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#EF4444",
      },
    });
  };

  const getIconForField = (field) => {
    switch (field) {
      case "jobTitle":
        return <Briefcase className="h-4 w-4" />; // No color
      case "department":
        return <Users className="h-4 w-4" />; // No color
      case "jobDescription":
        return <FileText className="h-4 w-4" />; // No color
      case "requiredSkills":
        return <Code className="h-4 w-4" />; // No color
      case "experienceLevel":
        return <Award className="h-4 w-4" />; // No color
      case "location":
        return <MapPin className="h-4 w-4" />; // No color
      case "salaryRange":
        return <DollarSign className="h-4 w-4" />; // No color
      case "applicationDeadline":
        return <Calendar className="h-4 w-4" />; // No color
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 px-8 lg:px-24 min-h-screen bg-zinc-950">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-100 flex items-center justify-center">
        <Briefcase className="h-8 w-8 text-blue-500 mr-2" />
        Job Postings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobPostings.length > 0 ? (
          jobPostings.map((job) => (
            <Card
              key={job.id}
              className="bg-zinc-800 text-gray-100 relative flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-100 transition-colors duration-200"
                  onClick={() => handleEdit(job.id)}
                >
                  <Pencil className="h-4 w-4 text-yellow-500" />
                  <span className="sr-only">Edit job posting</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  onClick={() => handleDelete(job.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Delete job posting</span>
                </Button>
              </div>
              <CardHeader>
                <CardTitle>
                  {editingId === job.id ? (
                    <>
                      <Label
                        htmlFor={`jobTitle-${job.id}`}
                        className="block mb-2 text-sm font-medium text-gray-300 flex items-center"
                      >
                        {getIconForField("jobTitle")}
                        <span className="ml-2">Job Title</span>
                      </Label>
                      <Input
                        id={`jobTitle-${job.id}`}
                        value={job.jobTitle}
                        onChange={(e) =>
                          handleChange(job.id, "jobTitle", e.target.value)
                        }
                        className="bg-zinc-700 text-gray-100 border-zinc-600 focus:border-zinc-500 focus:ring-zinc-500"
                      />
                    </>
                  ) : (
                    <div className="flex items-center">
                      {getIconForField("jobTitle")}
                      <span className="ml-2">{job.jobTitle}</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  {Object.entries(job).map(([key, value]) => {
                    if (key === "id" || key === "jobTitle") return null;
                    return (
                      <div key={key}>
                        <Label
                          htmlFor={`${key}-${job.id}`}
                          className="block mb-1 text-sm font-medium text-gray-300 flex items-center"
                        >
                          {getIconForField(key)}
                          <span className="ml-2">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        </Label>
                        {editingId === job.id ? (
                          key === "jobDescription" ? (
                            <Textarea
                              id={`${key}-${job.id}`}
                              value={value}
                              onChange={(e) =>
                                handleChange(job.id, key, e.target.value)
                              }
                              className="bg-zinc-700 text-gray-100 border-zinc-600 focus:border-zinc-500 focus:ring-zinc-500 min-h-[100px]"
                            />
                          ) : key === "experienceLevel" ? (
                            <Select
                              value={value}
                              onValueChange={(newValue) =>
                                handleChange(job.id, key, newValue)
                              }
                            >
                              <SelectTrigger
                                id={`${key}-${job.id}`}
                                className="bg-zinc-700 text-gray-100 border-zinc-600"
                              >
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-700 text-gray-100 border-zinc-600">
                                <SelectItem value="entry">
                                  Entry Level
                                </SelectItem>
                                <SelectItem value="mid">Mid Level</SelectItem>
                                <SelectItem value="senior">
                                  Senior Level
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : key === "applicationDeadline" ? (
                            <Input
                              id={`${key}-${job.id}`}
                              type="date"
                              value={value}
                              onChange={(e) =>
                                handleChange(job.id, key, e.target.value)
                              }
                              className="bg-zinc-700 text-gray-100 border-zinc-600 focus:border-zinc-500 focus:ring-zinc-500"
                            />
                          ) : (
                            <Input
                              id={`${key}-${job.id}`}
                              value={value}
                              onChange={(e) =>
                                handleChange(job.id, key, e.target.value)
                              }
                              className="bg-zinc-700 text-gray-100 border-zinc-600 focus:border-zinc-500 focus:ring-zinc-500"
                            />
                          )
                        ) : (
                          <p className="text-gray-300">{value}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                {editingId === job.id && (
                  <Button
                    onClick={() => handleSave(job.id)}
                    className="mt-6 w-full bg-zinc-700 hover:bg-zinc-600 text-gray-100 flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 text-green-500 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-gray-100 text-center text-lg">
            No job postings available.
          </div>
        )}
      </div>
    </div>
  );
}
