"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Building2,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
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

interface JobPosting {
  id: string;
  jobTitle: string;
  department: string;
  jobDescription: string;
  requiredSkills: string;
  experienceLevel: string;
  location: string;
  salaryRange: string;
  applicationDeadline: string;
}

export default function ManageJobs() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedPostings = localStorage.getItem("jobPostings");
    if (storedPostings) {
      setJobPostings(JSON.parse(storedPostings));
    }
  }, []);

  const handleEdit = (id: string) => {
    if (editingId === id) return;
    setEditingId(id);
  };

  const handleSave = async (id: string) => {
    setIsLoading(true);
    try {
      localStorage.setItem("jobPostings", JSON.stringify(jobPostings));
      toast.success("Changes saved successfully", {
        style: {
          background: "#27272b",
          color: "#fafafa",
          borderRadius: "8px",
        },
      });
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (id: string, field: string, value: string) => {
    setJobPostings(
      jobPostings.map((job) =>
        job.id === id ? { ...job, [field]: value } : job
      )
    );
  };

  const handleDelete = (id: string) => {
    const updatedPostings = jobPostings.filter((job) => job.id !== id);
    setJobPostings(updatedPostings);
    localStorage.setItem("jobPostings", JSON.stringify(updatedPostings));
    toast.success("Job posting deleted", {
      style: {
        background: "#27272b",
        color: "#fafafa",
        borderRadius: "8px",
      },
    });
  };

  const getIconForField = (field: string) => {
    const iconClasses = "h-4 w-4 text-zinc-400";
    switch (field) {
      case "jobTitle":
        return <Briefcase className={iconClasses} />;
      case "department":
        return <Users className={iconClasses} />;
      case "jobDescription":
        return <FileText className={iconClasses} />;
      case "requiredSkills":
        return <Code className={iconClasses} />;
      case "experienceLevel":
        return <Award className={iconClasses} />;
      case "location":
        return <MapPin className={iconClasses} />;
      case "salaryRange":
        return <DollarSign className={iconClasses} />;
      case "applicationDeadline":
        return <Calendar className={iconClasses} />;
      default:
        return null;
    }
  };

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#27272b",
            color: "#fafafa",
            borderRadius: "8px",
          },
        }}
      />
      <div className="max-w-7xl mx-auto">
        <Card className="bg-zinc-800/50 border-zinc-700/50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-zinc-100 flex items-center">
                  <Building2 className="w-6 h-6 mr-2 text-zinc-400" />
                  Manage Job Postings
                </CardTitle>
                <CardDescription className="text-zinc-400 mt-2">
                  Edit and manage your active job postings
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                  <ClipboardList className="w-4 h-4 mr-1" />
                  {jobPostings.length} Total Postings
                </Badge>
                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {jobPostings.filter(job => !isDeadlinePassed(job.applicationDeadline)).length} Active
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobPostings.length > 0 ? (
                jobPostings.map((job) => (
                  <Card
                    key={job.id}
                    className="bg-zinc-800/50 border-zinc-700/50 relative group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          {editingId === job.id ? (
                            <div className="space-y-2">
                              <Label
                                htmlFor={`jobTitle-${job.id}`}
                                className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                              >
                                {getIconForField("jobTitle")}
                                Job Title
                              </Label>
                              <Input
                                id={`jobTitle-${job.id}`}
                                value={job.jobTitle}
                                onChange={(e) =>
                                  handleChange(job.id, "jobTitle", e.target.value)
                                }
                                className="bg-zinc-700/50 border-zinc-600 text-zinc-100"
                              />
                            </div>
                          ) : (
                            <>
                              <CardTitle className="text-lg text-zinc-100 flex items-center gap-2">
                                {getIconForField("jobTitle")}
                                {job.jobTitle}
                              </CardTitle>
                              <CardDescription className="text-zinc-400 flex items-center gap-2">
                                {getIconForField("department")}
                                {job.department}
                              </CardDescription>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isDeadlinePassed(job.applicationDeadline) ? (
                            <Badge variant="outline" className="border-red-500/20 bg-red-500/10 text-red-400">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Expired
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-400">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          )}
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
                              onClick={() => handleEdit(job.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDelete(job.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(job).map(([key, value]) => {
                        if (key === "id" || key === "jobTitle" || key === "department") return null;
                        return (
                          <div key={key} className="space-y-2">
                            <Label
                              htmlFor={`${key}-${job.id}`}
                              className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                            >
                              {getIconForField(key)}
                              {key.split(/(?=[A-Z])/).join(" ")}
                            </Label>
                            {editingId === job.id ? (
                              key === "jobDescription" ? (
                                <Textarea
                                  id={`${key}-${job.id}`}
                                  value={value}
                                  onChange={(e) =>
                                    handleChange(job.id, key, e.target.value)
                                  }
                                  className="bg-zinc-700/50 border-zinc-600 text-zinc-100 min-h-[100px]"
                                />
                              ) : key === "experienceLevel" ? (
                                <Select
                                  value={value}
                                  onValueChange={(newValue) =>
                                    handleChange(job.id, key, newValue)
                                  }
                                >
                                  <SelectTrigger className="bg-zinc-700/50 border-zinc-600 text-zinc-100">
                                    <SelectValue placeholder="Select experience level" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="entry">Entry Level</SelectItem>
                                    <SelectItem value="mid">Mid Level</SelectItem>
                                    <SelectItem value="senior">Senior Level</SelectItem>
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
                                  className="bg-zinc-700/50 border-zinc-600 text-zinc-100"
                                />
                              ) : (
                                <Input
                                  id={`${key}-${job.id}`}
                                  value={value}
                                  onChange={(e) =>
                                    handleChange(job.id, key, e.target.value)
                                  }
                                  className="bg-zinc-700/50 border-zinc-600 text-zinc-100"
                                />
                              )
                            ) : (
                              <p className="text-sm text-zinc-300 bg-zinc-800 rounded-md p-3 border border-zinc-700/50">
                                {value}
                              </p>
                            )}
                          </div>
                        );
                      })}
                      {editingId === job.id && (
                        <div className="pt-4">
                          <Button
                            onClick={() => handleSave(job.id)}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-100 border border-zinc-600"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving Changes...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full bg-zinc-800/50 border-zinc-700/50">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ClipboardList className="h-12 w-12 text-zinc-400 mb-4" />
                    <h3 className="text-xl font-semibold text-zinc-300 mb-2">No Job Postings</h3>
                    <p className="text-zinc-400 max-w-md">
                      You haven't created any job postings yet. Create one from the recruitment page.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
