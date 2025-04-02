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
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-zinc-800/50 border-zinc-700/50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-zinc-100 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-zinc-400" />
                AI Contract Generator
              </CardTitle>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Powered by Talentlink
              </Badge>
            </div>
            <p className="text-sm text-zinc-400 mt-2">
              Generate professional influencer contracts instantly with AI assistance.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-300 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-zinc-400" />
                    Brand Name
                  </Label>
                  <Input
                    id="brandName"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-300 flex items-center">
                    <User className="w-4 h-4 mr-2 text-zinc-400" />
                    Influencer Name
                  </Label>
                  <Input
                    id="influencerName"
                    name="influencerName"
                    value={formData.influencerName}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300 flex items-center">
                  <FileCheck className="w-4 h-4 mr-2 text-zinc-400" />
                  Campaign Details
                </Label>
                <Textarea
                  id="campaignDetails"
                  name="campaignDetails"
                  value={formData.campaignDetails}
                  onChange={handleInputChange}
                  required
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 min-h-[120px] resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-300 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-zinc-400" />
                    Compensation
                  </Label>
                  <div className="relative">
                    <Input
                      id="compensation"
                      name="compensation"
                      value={formData.compensation}
                      onChange={handleInputChange}
                      required
                      className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 h-11 pl-7"
                    />
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-300 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-zinc-400" />
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 h-11"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-colors h-11 text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Contract...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Generate Contract
                  </>
                )}
              </Button>
            </form>

            {contract && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-zinc-100">Generated Contract</h3>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      Ready to Download
                    </Badge>
                  </div>
                  <Button
                    onClick={handleDownloadPDF}
                    className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-colors h-9"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
                  <ReactMarkdown className="prose prose-invert max-w-none">
                    {contract}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
