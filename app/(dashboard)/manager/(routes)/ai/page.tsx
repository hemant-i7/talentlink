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
import {
  Loader2,
  Instagram,
  AlertCircle,
  Users,
  BarChart2,
  Image,
  Sparkles,
  Info,
  Heart,
  MessageCircle,
  Trophy,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EngagementData {
  username: string;
  followerCount: number;
  engagementRate: string;
  postCount: number;
  averageLikes: number;
  averageComments: number;
  topPost: {
    url: string;
    likes: number;
    comments: number;
  };
}

export default function InstagramEngagementCalculator() {
  const [username, setUsername] = useState("");
  const [engagementData, setEngagementData] = useState<EngagementData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEngagementData(null);
    setError("");

    // Simulating API call with setTimeout
    setTimeout(() => {
      setEngagementData({
        username: username,
        followerCount: 500000,
        engagementRate: "3.2",
        postCount: 100,
        averageLikes: 15000,
        averageComments: 500,
        topPost: {
          url: "https://picsum.photos/200",
          likes: 25000,
          comments: 1000,
        },
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl rounded-xl mt-28 mx-auto p-6 space-y-8 bg-zinc-800 min-h-screen">
      <Card className="border-zinc-700  bg-zinc-800">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center flex flex-col items-center justify-center">
            <Instagram className="mb-2 h-12 w-12 text-pink-500" />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Instagram Engagement Calculator
            </span>
          </CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Analyze your Instagram profile's performance and engagement rate
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Enter Instagram Username
              </label>
              <div className="relative">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., instagram"
                  required
                  className="w-full pl-10 bg-zinc-800 text-white border-zinc-600"
                />
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5 text-yellow-300" />
                  Calculate Engagement Rate
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-800 bg-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-center text-red-500">
              <AlertCircle className="mr-2 h-6 w-6" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {engagementData && (
        <Card className="border-zinc-700 bg-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center text-white">
              <BarChart2 className="mr-2 h-6 w-6 text-green-500" />
              Engagement Results for @{engagementData.username}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center text-zinc-300">
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  Follower Count:
                </h3>
                <p className="bg-zinc-700 p-3 rounded-lg font-semibold text-white">
                  {engagementData.followerCount.toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center text-zinc-300">
                  <BarChart2 className="mr-2 h-5 w-5 text-green-500" />
                  Engagement Rate:
                </h3>
                <p className="bg-zinc-700 p-3 rounded-lg font-semibold text-white">
                  {engagementData.engagementRate}%
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center text-zinc-300">
                  <Image className="mr-2 h-5 w-5 text-yellow-500" />
                  Posts Analyzed:
                </h3>
                <p className="bg-zinc-700 p-3 rounded-lg font-semibold text-white">
                  {engagementData.postCount}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center text-zinc-300">
                  <Heart className="mr-2 h-5 w-5 text-red-500" />
                  Average Likes:
                </h3>
                <p className="bg-zinc-700 p-3 rounded-lg font-semibold text-white">
                  {engagementData.averageLikes.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="border-t border-zinc-700 pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                <Sparkles className="mr-2 h-6 w-6 text-purple-500" />
                Additional Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium mb-2 text-zinc-300 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
                    Average Comments:
                  </h4>
                  <p className="bg-zinc-700 p-3 rounded-lg font-semibold text-white">
                    {engagementData.averageComments.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2 text-zinc-300 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                    Top Post Performance:
                  </h4>
                  <p className="bg-zinc-700 p-3 rounded-lg font-semibold text-white">
                    {engagementData.topPost.likes.toLocaleString()} likes,{" "}
                    {engagementData.topPost.comments.toLocaleString()} comments
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-zinc-700 pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                <Image className="mr-2 h-6 w-6 text-pink-500" />
                Top Performing Post
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={engagementData.topPost.url}
                  alt="Top post"
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                />
                <div>
                  <p className="text-lg font-medium mb-2 text-zinc-300 flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    Likes:{" "}
                    <span className="font-semibold text-white ml-2">
                      {engagementData.topPost.likes.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-zinc-300 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
                    Comments:{" "}
                    <span className="font-semibold text-white ml-2">
                      {engagementData.topPost.comments.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full mt-4 bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600"
            >
              <Info className="mr-2 h-5 w-5 text-blue-400" />
              What is Engagement Rate?
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-800 text-white border-zinc-700">
            <p className="max-w-xs text-sm">
              Engagement rate is the level of interaction your content receives
              from your audience. It's typically calculated by dividing the
              total number of interactions (likes + comments) by the number of
              followers, then multiplying by 100 to get a percentage.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
