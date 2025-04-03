"use client";

import React from "react";
import { LoginButton } from "@/components/ui/auth/login-button";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/ui/HeroSection";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FloatingNavDemo } from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar";
import FallingStars from "./falling-stars";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Star,
  CheckCircle,
  Users,
  TrendingUp,
  Globe,
  Award,
  MessageSquare,
  Briefcase,
  Building2,
  DollarSign,
  Sparkles,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Influencer",
    image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=18181b&color=fff",
    content: "TalentLink has transformed how I collaborate with brands. The platform is intuitive and makes managing partnerships a breeze.",
    rating: 5,
    platform: "Instagram",
    followers: "500K+",
  },
  {
    name: "David Chen",
    role: "Tech Reviewer",
    image: "https://ui-avatars.com/api/?name=David+Chen&background=18181b&color=fff",
    content: "As a tech content creator, finding the right brand partnerships was challenging until I found TalentLink. The quality of opportunities is unmatched.",
    rating: 5,
    platform: "YouTube",
    followers: "1M+",
  },
  {
    name: "Emma Williams",
    role: "Lifestyle Blogger",
    image: "https://ui-avatars.com/api/?name=Emma+Williams&background=18181b&color=fff",
    content: "The analytics and insights provided by TalentLink help me make better decisions about brand collaborations.",
    rating: 5,
    platform: "TikTok",
    followers: "750K+",
  },
];

const partners = [
  {
    name: "Meta",
    logo: "https://1000logos.net/wp-content/uploads/2021/10/Meta-Logo.png",
  },
  {
    name: "Adobe",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/Adobe-logo.png",
  },
  {
    name: "Coca Cola",
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Coca-Cola-logo.png",
  },
  {
    name: "Google",
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png",
  },
  {
    name: "Microsoft",
    logo: "https://1000logos.net/wp-content/uploads/2017/04/Microsoft-Logo.png",
  },
  {
    name: "Samsung",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
  },
  {
    name: "Oracle",
    logo: "https://1000logos.net/wp-content/uploads/2017/04/Oracle-Logo.png",
  },
  {
    name: "Amazon",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
  }
];

const stats = [
  {
    title: "Active Creators",
    value: "50,000+",
    icon: <Users className="w-5 h-5" />,
    description: "Talented influencers across platforms",
  },
  {
    title: "Brand Partnerships",
    value: "10,000+",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Successful collaborations made",
  },
  {
    title: "Global Reach",
    value: "100M+",
    icon: <Globe className="w-5 h-5" />,
    description: "Combined audience reached",
  },
  {
    title: "Campaign Success",
    value: "95%",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Average campaign satisfaction",
  },
];

const features = [
  {
    title: "Smart Matching",
    description: "AI-powered algorithm connects you with the perfect partners based on your niche and audience.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "Secure Payments",
    description: "Hassle-free payment processing with escrow protection for both parties.",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    title: "Performance Analytics",
    description: "Detailed insights and metrics to track your campaign success and ROI.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: "Verified Partners",
    description: "All brands and creators are verified to ensure quality collaborations.",
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <FallingStars />
      <HeroSection />
      <FloatingNavDemo />
      {/* <Sidebar/> */}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center space-y-8">
            <Badge className="bg-zinc-800/50 text-zinc-300 border-zinc-700/50 py-1 px-3 text-sm">
              Connecting Creators with Brands
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
              The Ultimate Platform for
              <br />
              Influencer Collaborations
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-zinc-400">
              Join thousands of creators and brands making impactful partnerships.
              Streamline your collaborations, grow your reach, and boost your earnings.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-zinc-700/50">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-zinc-100">{stat.value}</p>
                      <p className="text-sm text-zinc-400">{stat.title}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-100">Why Choose TalentLink?</h2>
            <p className="mt-4 text-zinc-400">Everything you need to succeed in influencer marketing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-zinc-700/50 w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-100">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-100">What Our Users Say</h2>
            <p className="mt-4 text-zinc-400">Trusted by leading creators and brands worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border border-zinc-700"
                    />
                    <div>
                      <p className="font-semibold text-zinc-100">{testimonial.name}</p>
                      <p className="text-sm text-zinc-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-zinc-300">{testimonial.content}</p>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span>{testimonial.platform}</span>
                    <span>•</span>
                    <span>{testimonial.followers} Followers</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-zinc-100">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Join thousands of successful creators and brands already using TalentLink
            to grow their business and create impactful collaborations.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
