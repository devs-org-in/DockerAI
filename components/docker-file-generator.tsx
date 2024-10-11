'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import Groq from "groq-sdk"
import { Octokit } from "@octokit/core"

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || ''
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || ''

export function DockerFileGeneratorComponent() {
  const [dockerFile, setDockerFile] = useState('')
  const [githubRepo, setGithubRepo] = useState('')
  const [githubOwner, setGithubOwner] = useState('')
  const [dockerFileInstructions, setDockerFileInstructions] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('GROQ_API_KEY:', GROQ_API_KEY)
    console.log('GITHUB_TOKEN:', GITHUB_TOKEN)
  }, [])

  const handleGenerateDockerFile = async () => {
    setIsLoading(true)
    setError('')
    setDockerFile('')
  
    if (!githubRepo || !githubOwner || !dockerFileInstructions) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }
  
    const octokit = new Octokit({ auth: GITHUB_TOKEN })
    const groq = new Groq({ apiKey: GROQ_API_KEY })
  
    try {
      const response = await getGithubRepoData(octokit, githubOwner, githubRepo)
      const repoTree = response.data.tree
  
      const combinedInstructions = `
        Repository Tree:
        ${JSON.stringify(repoTree, null, 2)}
  
        User Instructions:
        ${dockerFileInstructions}
  
        Just give me a Dockerfile for this repository
      `
  
      const chatCompletion = await getGroqChatCompletion(groq, combinedInstructions)
      const fullResponse = chatCompletion.choices[0]?.message?.content || ""
  
      // Extract the code part enclosed within triple backticks
      const codeMatch = fullResponse.match(/```([^`]+)```/)
      const dockerFileContent = codeMatch ? codeMatch[1].trim() : ""
  
      setDockerFile(dockerFileContent)
    } catch (error) {
      console.error(error)
      setError('An error occurred while generating the Docker file. Please check your inputs and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getGroqChatCompletion = async (groq, instructions) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: instructions,
        },
      ],
      model: "llama3-8b-8192",
    })
  }

  const getGithubRepoData = async (octokit, owner, repo) => {
    return octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
      owner,
      repo,
      tree_sha: 'main',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Docker File Generator</CardTitle>
          <CardDescription>Generate a Dockerfile for your GitHub repository using AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github-owner">GitHub Username</Label>
              <Input 
                id="github-owner" 
                value={githubOwner} 
                onChange={(e) => setGithubOwner(e.target.value)} 
                placeholder="e.g., octocat"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github-repo">GitHub Repository Name</Label>
              <Input 
                id="github-repo" 
                value={githubRepo} 
                onChange={(e) => setGithubRepo(e.target.value)} 
                placeholder="e.g., my-project"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="docker-file-instructions">Docker File Instructions</Label>
            <Textarea 
              id="docker-file-instructions" 
              value={dockerFileInstructions} 
              onChange={(e) => setDockerFileInstructions(e.target.value)} 
              placeholder="Describe how you want your Dockerfile to be generated..."
              rows={4}
            />
          </div>
          <Button onClick={handleGenerateDockerFile} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Docker File'}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      {dockerFile && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Dockerfile</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={dockerFile} 
              readOnly 
              className="font-mono"
              rows={10}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}