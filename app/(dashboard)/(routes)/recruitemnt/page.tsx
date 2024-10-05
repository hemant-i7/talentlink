"use client";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
// Import Shadcn components

const AgencyRecruitment = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    jobDescription: '',
    requiredSkills: '',
    experienceLevel: '',
    location: '',
    salaryRange: '',
    applicationDeadline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    // Add form submission logic here (e.g., API call to create a job posting)
    console.log("Job posting submitted:", formData);
  };

  return (
    <div className="pt-20 mx-10 px-10 py-10 bg-zinc-900 min-h-screen">
      <h2 className="text-2xl font-bold text-center py-5 justify-center text-white mb-6">Create New Job Posting</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title */}
        <div className="bg-zinc-800 p-4 rounded">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input 
            id="jobTitle"
            name="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g., Senior Video Editor"
            className="mt-2 w-full"
            required
          />
        </div>

        {/* Department */}
        <div className="bg-zinc-800 p-4 rounded">
          <Label htmlFor="department">Department</Label>
          <Input 
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Creative, Marketing"
            className="mt-2 w-full"
            required
          />
        </div>

        {/* Job Description */}
        <div className="bg-zinc-800 p-4 rounded md:col-span-2">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Provide a detailed job description"
            className="mt-2 w-full"
            required
          />
        </div>

        {/* Required Skills */}
        <div className="bg-zinc-800 p-4 rounded">
          <Label htmlFor="requiredSkills">Required Skills</Label>
          <Input 
            id="requiredSkills"
            name="requiredSkills"
            type="text"
            value={formData.requiredSkills}
            onChange={handleChange}
            placeholder="e.g., Premiere Pro, Photoshop"
            className="mt-2 w-full"
            required
          />
        </div>

        {/* Experience Level */}
        <div className="bg-zinc-800 p-4 rounded">
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select value={formData.experienceLevel} onValueChange={(value) => handleSelectChange('experienceLevel', value)}>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="bg-zinc-800 p-4 rounded">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Remote, New York, London"
            className="mt-2 w-full"
            required
          />
        </div>

        {/* Salary Range */}
        <div className="bg-zinc-800 p-4 rounded">
          <Label htmlFor="salaryRange">Salary Range</Label>
          <Input 
            id="salaryRange"
            name="salaryRange"
            type="text"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder="e.g., $50,000 - $70,000"
            className="mt-2 w-full"
            required
          />
        </div>

        {/* Application Deadline */}
        <div className="bg-zinc-800 p-4 rounded">
          <Label htmlFor="applicationDeadline">Application Deadline</Label>
          <Input 
            id="applicationDeadline"
            name="applicationDeadline"
            type="date"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="mt-2 w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <Button type="submit" className="mt-4">
            Post Job
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgencyRecruitment;
