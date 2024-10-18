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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import { Briefcase } from "lucide-react";

export default function AgencyRecruitment() {
  const [formData, setFormData] = useState({
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

  const [jobPostings, setJobPostings] = useState([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPosting = { ...formData, id: Date.now().toString() };
    const updatedPostings = [...jobPostings, newPosting];
    setJobPostings(updatedPostings);
    localStorage.setItem("jobPostings", JSON.stringify(updatedPostings));
    console.log("Job posting submitted:", newPosting);
    toast.success("Job posted successfully!", {
      icon: "🎉",
      style: {
        borderRadius: "10px",
        background: "#45f248",
        color: "#fff",
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
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <Card className="mt-16 bg-zinc-800 border-zinc-700">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
              <Briefcase className="w-8 h-8" />
              Create New Job Posting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g., Senior Video Editor"
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g., Creative, Marketing"
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Provide a detailed job description"
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400 min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requiredSkills">Required Skills</Label>
                  <Input
                    id="requiredSkills"
                    name="requiredSkills"
                    type="text"
                    value={formData.requiredSkills}
                    onChange={handleChange}
                    placeholder="e.g., Premiere Pro, Photoshop"
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) =>
                      handleSelectChange("experienceLevel", value)
                    }
                  >
                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-zinc-100">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-700 border-zinc-600 text-zinc-100">
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Remote, New York, London"
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryRange">Salary Range</Label>
                  <Input
                    id="salaryRange"
                    name="salaryRange"
                    type="text"
                    value={formData.salaryRange}
                    onChange={handleChange}
                    placeholder="e.g., $50,000 - $70,000"
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">
                    Application Deadline
                  </Label>
                  <Input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    className="bg-zinc-700 border-zinc-600 text-zinc-100"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-zinc-600 hover:bg-zinc-500 text-zinc-100"
                >
                  Post Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
