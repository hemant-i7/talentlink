'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sun, Moon } from "lucide-react"
import toast, { Toaster } from 'react-hot-toast'

interface GeneratedContent {
  title: string;
  description: string;
}

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setGeneratedContent(null)

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const content: GeneratedContent = await response.json()
      setGeneratedContent(content)
      toast.success('Content generated successfully!', {
        style: {
          background: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#333',
        },
      })
    } catch (err) {
      toast.error('Failed to generate content. Please try again.', {
        style: {
          background: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#333',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen justify-center pt-20 ${isDarkMode ? 'dark' : ''}`}>
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center dark:text-white">Title and Description Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter a topic or keyword
                </label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., artificial intelligence, digital marketing"
                  required
                  className="w-full text-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Content'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedContent && (
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold dark:text-white">Generated Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2 dark:text-gray-300">Title:</h3>
                <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-lg dark:text-white">{generatedContent.title}</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 dark:text-gray-300">Description:</h3>
                <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-lg dark:text-white">{generatedContent.description}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}