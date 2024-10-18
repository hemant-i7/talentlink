'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Twitter, Youtube } from "lucide-react"

interface Influencer {
  id: number
  name: string
  avatar: string
  followers: number
  engagementRate: number
  roi: number
  platform: 'instagram' | 'youtube' | 'twitter'
  email: string
  phone: string
  address: string
}

const mockInfluencers: Influencer[] = [
  {
    id: 1,
    name: "Virat Kohli",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 211000000,
    engagementRate: 2.5,
    roi: 8.7,
    platform: 'instagram',
    email: "virat@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India"
  },
  {
    id: 2,
    name: "Priyanka Chopra",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 83000000,
    engagementRate: 1.8,
    roi: 7.2,
    platform: 'instagram',
    email: "priyanka@example.com",
    phone: "+91 98765 43211",
    address: "Mumbai, Maharashtra, India"
  },
  {
    id: 3,
    name: "Amit Bhadana",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 23700000,
    engagementRate: 5.2,
    roi: 9.1,
    platform: 'youtube',
    email: "amit@example.com",
    phone: "+91 98765 43212",
    address: "New Delhi, India"
  },
  {
    id: 4,
    name: "Bhuvan Bam",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 14900000,
    engagementRate: 4.8,
    roi: 8.9,
    platform: 'youtube',
    email: "bhuvan@example.com",
    phone: "+91 98765 43213",
    address: "New Delhi, India"
  },
  {
    id: 5,
    name: "Kusha Kapila",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 2900000,
    engagementRate: 3.7,
    roi: 7.8,
    platform: 'instagram',
    email: "kusha@example.com",
    phone: "+91 98765 43214",
    address: "New Delhi, India"
  }
]

export default function TrendingInfluencers() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const PlatformIcon = ({ platform }: { platform: Influencer['platform'] }) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />
      case 'youtube':
        return <Youtube className="h-4 w-4" />
      case 'twitter':
        return <Twitter className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full max-w-7xl mt-36 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Trending Influencers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Influencer</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Engagement Rate</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInfluencers.map((influencer) => (
              <TableRow key={influencer.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={influencer.avatar} alt={influencer.name} />
                      <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{influencer.name}</div>
                      <div className="text-sm text-gray-500">
                        <PlatformIcon platform={influencer.platform} />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatNumber(influencer.followers)}</TableCell>
                <TableCell>{influencer.engagementRate.toFixed(1)}%</TableCell>
                <TableCell>{influencer.roi.toFixed(1)}x</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedInfluencer(influencer)}
                      >
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Contact Information</DialogTitle>
                      </DialogHeader>
                      {selectedInfluencer && (
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={selectedInfluencer.avatar} alt={selectedInfluencer.name} />
                              <AvatarFallback>{selectedInfluencer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold">{selectedInfluencer.name}</h3>
                              <p className="text-sm text-gray-500">
                                <PlatformIcon platform={selectedInfluencer.platform} />
                                {' '}
                                {formatNumber(selectedInfluencer.followers)} followers
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold">Email:</h4>
                            <p>{selectedInfluencer.email}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Phone:</h4>
                            <p>{selectedInfluencer.phone}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Address:</h4>
                            <p>{selectedInfluencer.address}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}