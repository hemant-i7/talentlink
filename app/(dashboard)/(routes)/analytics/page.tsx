"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface GeneratedContent {
  title: string;
  description: string;
}

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedContent(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const content: GeneratedContent = await response.json();
      setGeneratedContent(content);
      toast.success("Content generated successfully!");
    } catch (err) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 mt-16 text-zinc-100 pt-16 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#27272b",
            color: "#fafafa",
          },
        }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100">
            AI Content Generator
          </h1>
          <p className="text-xl text-zinc-400">
            Harness the power of AI to create compelling titles and descriptions
          </p>
        </div>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-2xl text-zinc-100">
              Generate Title and Description
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Enter a topic or keyword to generate AI-powered content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="prompt"
                  className="text-sm font-medium text-zinc-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Topic or Keyword
                </label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., artificial intelligence, digital marketing"
                  required
                  className="text-base bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-zinc-600 text-black"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedContent && (
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">
                AI-Generated Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-zinc-300">Title</h3>
                <p className="p-3 rounded-md bg-zinc-700 text-zinc-100">
                  {generatedContent.title}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-zinc-300">
                  Description
                </h3>
                <p className="p-3 rounded-md bg-zinc-700 text-zinc-100">
                  {generatedContent.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
