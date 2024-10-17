'use client'

import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, XCircle, User, Phone, Users, Link } from "lucide-react"
import { useUser } from "@clerk/clerk-react"

interface Application {
  _id: string
  brandId: string
  brandName: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  name: string
  mobile: string
  socialCount: string
  socialLink: string
}

export default function UserDashboard() {
  const { user, isLoaded } = useUser()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return
      setLoading(true)
      setError(null)
      try {
        console.log("Fetching applications for user:", user.id)
        const response = await axios.post('/api/application/user', { userId: user.id })
        console.log("API Response:", response.data)
        if (response.data.success) {
          setApplications(response.data.applications)
        } else {
          throw new Error(response.data.message || "Failed to fetch applications")
        }
      } catch (err: any) {
        console.error("Error fetching applications:", err)
        setError(err.response?.data?.message || err.message || "An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [user])

  if (!isLoaded) {
    return <p className="text-center mt-8">Loading user information...</p>
  }

  if (!user) {
    return <p className="text-center mt-8">Please log in to view this page.</p>
  }

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-24">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      {loading ? (
        <p className="text-center">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : applications.length === 0 ? (
        <p className="text-center">You haven't submitted any applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <Card key={application._id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>{application.brandName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-sm text-gray-400">
                    <User className="mr-2" size={16} /> {application.name}
                  </p>
                  <p className="flex items-center text-sm text-gray-400">
                    <Phone className="mr-2" size={16} /> {application.mobile}
                  </p>
                  <p className="flex items-center text-sm text-gray-400">
                    <Users className="mr-2" size={16} /> {application.socialCount} followers
                  </p>
                  <p className="flex items-center text-sm text-gray-400">
                    <Link className="mr-2" size={16} /> 
                    <a href={application.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Social Profile
                    </a>
                  </p>
                </div>
                <p className="text-sm text-gray-400 mb-2">{application.message}</p>
                <p className="text-sm font-bold">
                  Status: {' '}
                  {application.status === 'accepted' ? (
                    <span className="text-green-500 flex items-center">
                      Accepted <CheckCircle className="ml-1" size={16} />
                    </span>
                  ) : application.status === 'rejected' ? (
                    <span className="text-red-500 flex items-center">
                      Rejected <XCircle className="ml-1" size={16} />
                    </span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Applied on: {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}