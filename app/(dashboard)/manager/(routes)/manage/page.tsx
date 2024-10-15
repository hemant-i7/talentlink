
"use client";
import { useEffect, useState } from "react";

const Setting = () => {
  const [jobData, setJobData] = useState({
    jobTitle: '',
    department: '',
    jobDescription: '',
    requiredSkills: '',
    experienceLevel: '',
    location: '',
    salaryRange: '',
    applicationDeadline: '',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('jobPostingData');
    if (storedData) {
      setJobData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="pt-40 px-24">
      <h2 className="text-2xl font-bold mb-4">Submitted Job Posting Details</h2>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Job Title:</strong> {jobData.jobTitle}
      </div>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Department:</strong> {jobData.department}
      </div>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Job Description:</strong> {jobData.jobDescription}
      </div>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Required Skills:</strong> {jobData.requiredSkills}
      </div>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Experience Level:</strong> {jobData.experienceLevel}
      </div>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Location:</strong> {jobData.location}
      </div>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Salary Range:</strong> {jobData.salaryRange}
      </div>
      <div className="bg-zinc-800 p-4 rounded mb-4">
        <strong>Application Deadline:</strong> {jobData.applicationDeadline}
      </div>
    </div>
  );
};

export default Setting;
