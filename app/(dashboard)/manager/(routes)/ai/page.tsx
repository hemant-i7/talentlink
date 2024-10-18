'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { toast } from 'react-hot-toast'
import jsPDF from 'jspdf'

export default function ContractGenerator() {
  const [formData, setFormData] = useState({
    brandName: '',
    influencerName: '',
    campaignDetails: '',
    compensation: '',
    duration: ''
  })
  const [contract, setContract] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setContract('')

    try {
      const response = await fetch('/api/contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate contract')
      }

      const data = await response.json()
      setContract(data.contract)
      toast.success('Your contract has been successfully generated.')
    } catch (err) {
      toast.error('Failed to generate contract. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // PDF generation using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.text(contract, 10, 10)
    doc.save('influencer_contract.pdf')
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 dark:bg-gray-900 dark:text-white">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">AI Influencer Contract Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brandName" className="dark:text-white">Brand Name</Label>
                <Input
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="influencerName" className="dark:text-white">Influencer Name</Label>
                <Input
                  id="influencerName"
                  name="influencerName"
                  value={formData.influencerName}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaignDetails" className="dark:text-white">Campaign Details</Label>
              <Textarea
                id="campaignDetails"
                name="campaignDetails"
                value={formData.campaignDetails}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compensation" className="dark:text-white">Compensation</Label>
                <Input
                  id="compensation"
                  name="compensation"
                  value={formData.compensation}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="dark:text-white">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Contract...
                </>
              ) : (
                'Generate Contract'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {contract && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Generated Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md max-h-96 overflow-y-auto">
              <ReactMarkdown>{contract}</ReactMarkdown>
            </div>
            <div className="flex space-x-4 mt-4">
              <Button onClick={handleDownloadPDF} className="w-full">
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
