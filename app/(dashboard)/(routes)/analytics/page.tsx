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
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Sparkles,
  Wand2,
  BrainCircuit,
  Lightbulb,
  Rocket,
  Zap,
  MessageSquare,
  Crown,
  Star,
  Clock,
  CheckCircle,
  BookOpen,
  Palette,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface GeneratedContent {
  title: string;
  description: string;
}

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

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
      setGenerationCount(prev => prev + 1);
      toast.success("Content generated successfully!");
    } catch (err) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
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
              <CardTitle className="text-2xl font-semibold text-zinc-100 flex items-center">
                <BrainCircuit className="w-6 h-6 mr-2 text-zinc-400" />
                AI Content Generator
              </CardTitle>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Powered by Gemini
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Section */}
              <div className="lg:col-span-1">
                <Card className="bg-zinc-800/50 border-zinc-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-zinc-100 flex items-center">
                      <Wand2 className="w-5 h-5 mr-2 text-zinc-400" />
                      Generate Content
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Enter your topic to create engaging content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="prompt" className="text-sm font-medium text-zinc-300">
                          Topic or Keyword
                        </label>
                        <Input
                          id="prompt"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="e.g., artificial intelligence, digital marketing"
                          required
                          className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-100 border border-zinc-600"
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

                    {/* Stats Section */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Generated</p>
                        <p className="text-sm text-zinc-300 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-zinc-500" />
                          {generationCount} times
                        </p>
                      </div>
                      <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Status</p>
                        <p className="text-sm text-zinc-300 flex items-center">
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 text-zinc-500 animate-spin" />
                              Working
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              Ready
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Output Section */}
              <div className="lg:col-span-2">
                {generatedContent ? (
                  <Card className="bg-zinc-800/50 border-zinc-700/50 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-zinc-100 flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2 text-zinc-400" />
                          Generated Content
                        </CardTitle>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          <Star className="w-3 h-3 mr-1" />
                          New
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-zinc-500 flex items-center">
                            <Crown className="w-4 h-4 mr-1" />
                            Generated Title
                          </p>
                          <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            {generatedContent.title.length} chars
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-300">
                          {generatedContent.title}
                        </p>
                      </div>

                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-zinc-500 flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Generated Description
                          </p>
                          <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            {generatedContent.description.length} chars
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-300 whitespace-pre-wrap">
                          {generatedContent.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-500 pt-2">
                        <p className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date().toLocaleTimeString()}
                        </p>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                          <Palette className="w-3 h-3 mr-1" />
                          AI Generated
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-zinc-800/50 border-zinc-700/50 h-full">
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <div className="p-4 rounded-full bg-zinc-800 mb-4">
                        <Rocket className="w-8 h-8 text-zinc-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-300 mb-2">Ready to Generate</h3>
                      <p className="text-zinc-400 max-w-md">
                        Enter your topic or keyword and let AI create engaging content for you.
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
