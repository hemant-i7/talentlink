"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  FileText,
  Download,
  Briefcase,
  User,
  Calendar,
  DollarSign,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";

export default function ContractGenerator() {
  const [formData, setFormData] = useState({
    brandName: "",
    influencerName: "",
    campaignDetails: "",
    compensation: "",
    duration: "",
  });
  const [contract, setContract] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setContract("");

    try {
      const response = await fetch("/api/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate contract");
      }

      const data = await response.json();
      setContract(data.contract);
      toast.success("Your contract has been successfully generated.");
    } catch (err) {
      toast.error("Failed to generate contract. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Set font styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    // Add header
    doc.text("Influencer Agreement", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 15;

    // Reset font for body text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add contract details
    const addSection = (title: string, content: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, yPosition);
      doc.setFont("helvetica", "normal");
      yPosition += 10;
      const lines = doc.splitTextToSize(content, pageWidth - 2 * margin);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 7 + 10;
    };

    addSection(
      "This agreement is made between:",
      `${formData.brandName} (the "Brand") and ${formData.influencerName} (the "Influencer").`
    );
    addSection("1. Campaign Details:", formData.campaignDetails);
    addSection("2. Compensation:", formData.compensation);
    addSection("3. Duration:", formData.duration);
    addSection(
      "4. Responsibilities:",
      "The Influencer agrees to create and publish content as specified in the Campaign Details. The Brand agrees to provide necessary materials and compensation as outlined in this agreement."
    );
    addSection(
      "5. Content Approval:",
      "All content must be approved by the Brand before publication. The Brand reserves the right to request revisions."
    );
    addSection(
      "6. Confidentiality:",
      "The Influencer agrees to keep all proprietary information confidential during and after the campaign."
    );

    // Add signature lines
    yPosition = pageHeight - 50;
    doc.line(margin, yPosition, pageWidth / 2 - 10, yPosition);
    doc.line(pageWidth / 2 + 10, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
    doc.text("Brand Representative", margin, yPosition);
    doc.text("Influencer", pageWidth / 2 + 10, yPosition);

    // Add date
    yPosition += 15;
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, margin, yPosition);

    doc.save("influencer_contract.pdf");
  };

  return (
    <div className="max-w-4xl mt-40 mx-auto p-4 space-y-6 dark:bg-zinc-900 dark:text-white">
      <Card className="dark:bg-zinc-800 dark:border-zinc-700 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center space-x-2">
            <FileText className="h-8 w-8 text-yellow-400" />
            <span>AI Influencer Contract Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="brandName"
                  className="dark:text-white flex items-center space-x-2"
                >
                  <Briefcase className="h-4 w-4 text-blue-500" />
                  <span>Brand Name</span>
                </Label>
                <Input
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-zinc-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="influencerName"
                  className="dark:text-white flex items-center space-x-2"
                >
                  <User className="h-4 w-4 text-green-500" />
                  <span>Influencer Name</span>
                </Label>
                <Input
                  id="influencerName"
                  name="influencerName"
                  value={formData.influencerName}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-zinc-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="campaignDetails"
                className="dark:text-white flex items-center space-x-2"
              >
                <FileCheck className="h-4 w-4 text-purple-500" />
                <span>Campaign Details</span>
              </Label>
              <Textarea
                id="campaignDetails"
                name="campaignDetails"
                value={formData.campaignDetails}
                onChange={handleInputChange}
                required
                className="dark:bg-zinc-700 dark:text-white focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="compensation"
                  className="dark:text-white flex items-center space-x-2"
                >
                  <DollarSign className="h-4 w-4 text-yellow-500" />
                  <span>Compensation</span>
                </Label>
                <Input
                  id="compensation"
                  name="compensation"
                  value={formData.compensation}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-zinc-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="dark:text-white flex items-center space-x-2"
                >
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span>Duration</span>
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-zinc-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Contract...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5 text-white" />
                  Generate Contract
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {contract && (
        <Card className="dark:bg-zinc-800 dark:border-zinc-700 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold flex items-center space-x-2">
              <FileCheck className="h-6 w-6 text-white" />
              <span>Generated Contract</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-zinc-100 dark:bg-zinc-700 p-6 rounded-lg max-h-96 overflow-y-auto shadow-inner">
              <ReactMarkdown>{contract}</ReactMarkdown>
            </div>
            <div className="flex space-x-4 mt-6">
              <Button
                onClick={handleDownloadPDF}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <Download className="mr-2 h-5 w-5 text-white" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8">
        <p className="flex items-center justify-center space-x-1">
          <AlertCircle className="h-4 w-4 text-orange-500" />
          <span>
            This is an AI-generated contract. Please review with a legal
            professional before use.
          </span>
        </p>
      </div>
    </div>
  );
}
