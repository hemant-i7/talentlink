'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Instagram, AlertCircle } from "lucide-react"

interface EngagementData {
  username: string;
  followerCount: number;
  engagementRate: string;
  postCount: number;
}

export default function InstagramEngagementCalculator() {
  const [username, setUsername] = useState('')
  const [engagementData, setEngagementData] = useState<EngagementData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setEngagementData(null)
    setError('')

    try {
      const response = await fetch('/api/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found. Please check the username and try again.')
        } else {
          throw new Error('Failed to fetch Instagram data. Please try again later.')
        }
      }

      const data: EngagementData = await response.json()
      setEngagementData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <Instagram className="mr-2 h-6 w-6" />
            Instagram Engagement Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Instagram Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., instagram"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                'Calculate Engagement Rate'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-center">
              <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {engagementData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Engagement Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Username:</h3>
              <p className="bg-gray-100 p-2 rounded">{engagementData.username}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Follower Count:</h3>
              <p className="bg-gray-100 p-2 rounded">{engagementData.followerCount.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Engagement Rate:</h3>
              <p className="bg-gray-100 p-2 rounded">{engagementData.engagementRate}%</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Posts Analyzed:</h3>
              <p className="bg-gray-100 p-2 rounded">{engagementData.postCount}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}