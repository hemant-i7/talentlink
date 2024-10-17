"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  };

  return (
    <div className="pt-24 px-8 lg:px-24">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
        Job Postings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPostings.length > 0 ? ( // Check if there are job postings to display
          jobPostings.map((job) => (
            <Card
              key={job.id}
              className="bg-gray-800 text-gray-100 relative flex flex-col"
            >
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-100"
                  onClick={() => handleEdit(job.id)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit job posting</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => handleDelete(job.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete job posting</span>
                </Button>
              </div>
              <CardHeader>
                <CardTitle>
                  {editingId === job.id ? (
                    <>
                      <Label
                        htmlFor={`jobTitle-${job.id}`}
                        className="block mb-2"
                      >
                        Job Title
                      </Label>
                      <Input
                        id={`jobTitle-${job.id}`}
                        value={job.jobTitle}
                        onChange={(e) =>
                          handleChange(job.id, "jobTitle", e.target.value)
                        }
                        className="bg-gray-700 text-gray-100"
                      />
                    </>
                  ) : (
                    job.jobTitle
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  {Object.entries(job).map(([key, value]) => {
                    if (key === "id" || key === "jobTitle") return null;
                    return (
                      <div key={key}>
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {editingId === job.id ? (
                          key === "jobDescription" ? (
                            <Textarea
                              value={value}
                              onChange={(e) =>
                                handleChange(job.id, key, e.target.value)
                              }
                              className="bg-gray-700 text-gray-100 mt-1"
                            />
                          ) : key === "experienceLevel" ? (
                            <Select
                              value={value}
                              onValueChange={(newValue) =>
                                handleChange(job.id, key, newValue)
                              }
                            >
                              <SelectTrigger className="bg-gray-700 text-gray-100 mt-1">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
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
                              type="date"
                              value={value}
                              onChange={(e) =>
                                handleChange(job.id, key, e.target.value)
                              }
                              className="bg-gray-700 text-gray-100 mt-1"
                            />
                          ) : (
                            <Input
                              value={value}
                              onChange={(e) =>
                                handleChange(job.id, key, e.target.value)
                              }
                              className="bg-gray-700 text-gray-100 mt-1"
                            />
                          )
                        ) : (
                          value
                        )}
                      </div>
                    );
                  })}
                </div>
                {editingId === job.id && (
                  <Button onClick={() => handleSave(job.id)} className="mt-4">
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-gray-100 text-center">
            No job postings available.
          </div>
        )}
      </div>
    </div>
  );
}
