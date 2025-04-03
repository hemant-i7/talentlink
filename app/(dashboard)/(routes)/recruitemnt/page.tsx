"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "react-hot-toast";
import {
  Briefcase,
  FileText,
  Users,
  Code,
  Award,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Plus,
  Loader2,
  CheckCircle,
  ClipboardList,
  Sparkles,
} from "lucide-react";

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

export default function AgencyRecruitment() {
  const [formData, setFormData] = useState<JobPosting>({
    id: "",
    jobTitle: "",
    department: "",
    jobDescription: "",
    requiredSkills: "",
    experienceLevel: "",
    location: "",
    salaryRange: "",
    applicationDeadline: "",
  });

  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedPostings = localStorage.getItem("jobPostings");
    if (storedPostings) {
      setJobPostings(JSON.parse(storedPostings));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPosting = { ...formData, id: Date.now().toString() };
      const updatedPostings = [...jobPostings, newPosting];
      setJobPostings(updatedPostings);
      localStorage.setItem("jobPostings", JSON.stringify(updatedPostings));
      
      toast.success("Job posted successfully!", {
        style: {
          background: "#27272b",
          color: "#fafafa",
          borderRadius: "8px",
        },
      });

      setFormData({
        id: "",
        jobTitle: "",
        department: "",
        jobDescription: "",
        requiredSkills: "",
        experienceLevel: "",
        location: "",
        salaryRange: "",
        applicationDeadline: "",
      });
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                  Recruitment Hub
                </CardTitle>
                <CardDescription className="text-zinc-400 mt-2">
                  Create and manage job postings for your agency
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                {jobPostings.length} Active Postings
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <Card className="bg-zinc-800/50 border-zinc-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-zinc-100 flex items-center">
                      <Plus className="w-5 h-5 mr-2 text-zinc-400" />
                      Create New Job Posting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-zinc-400" />
                            Job Title
                          </Label>
                          <Input
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="e.g., Senior Video Editor"
                            className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <Users className="w-4 h-4 text-zinc-400" />
                            Department
                          </Label>
                          <Input
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="e.g., Creative, Marketing"
                            className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            required
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="jobDescription" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-zinc-400" />
                            Job Description
                          </Label>
                          <Textarea
                            id="jobDescription"
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            placeholder="Provide a detailed job description"
                            className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder-zinc-400 min-h-[120px]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="requiredSkills" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <Code className="w-4 h-4 text-zinc-400" />
                            Required Skills
                          </Label>
                          <Input
                            id="requiredSkills"
                            name="requiredSkills"
                            value={formData.requiredSkills}
                            onChange={handleChange}
                            placeholder="e.g., Premiere Pro, Photoshop"
                            className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="experienceLevel" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <Award className="w-4 h-4 text-zinc-400" />
                            Experience Level
                          </Label>
                          <Select
                            value={formData.experienceLevel}
                            onValueChange={(value) => handleSelectChange("experienceLevel", value)}
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
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-zinc-400" />
                            Location
                          </Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Remote, New York, London"
                            className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="salaryRange" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-zinc-400" />
                            Salary Range
                          </Label>
                          <Input
                            id="salaryRange"
                            name="salaryRange"
                            value={formData.salaryRange}
                            onChange={handleChange}
                            placeholder="e.g., $50,000 - $70,000"
                            className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicationDeadline" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-400" />
                            Application Deadline
                          </Label>
                          <Input
                            id="applicationDeadline"
                            name="applicationDeadline"
                            type="date"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                            className="bg-zinc-700/50 border-zinc-600 text-zinc-100"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-100 border border-zinc-600"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Post Job
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Section */}
              <div className="lg:col-span-1">
                <Card className="bg-zinc-800/50 border-zinc-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-zinc-100 flex items-center">
                      <ClipboardList className="w-5 h-5 mr-2 text-zinc-400" />
                      Job Posting Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Total Postings</p>
                        <p className="text-2xl font-semibold text-zinc-100">{jobPostings.length}</p>
                      </div>

                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Status</p>
                        <div className="flex items-center text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Ready to Post
                        </div>
                      </div>

                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Experience Levels</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Entry: {jobPostings.filter(job => job.experienceLevel === 'entry').length}
                          </Badge>
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Mid: {jobPostings.filter(job => job.experienceLevel === 'mid').length}
                          </Badge>
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Senior: {jobPostings.filter(job => job.experienceLevel === 'senior').length}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
