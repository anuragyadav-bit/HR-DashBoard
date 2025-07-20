"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PerformanceRating } from "@/components/ui/performance-rating"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export function UserTabs({ user }) {
  const [feedbackText, setFeedbackText] = useState("")
  const { toast } = useToast()

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) return

    toast({
      title: "Feedback submitted",
      description: "Your feedback has been recorded successfully.",
    })
    setFeedbackText("")
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-yellow-500"
      case "pending":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Age</Label>
                <p className="text-sm text-muted-foreground">{user.age} years old</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Company</Label>
                <p className="text-sm text-muted-foreground">{user.company.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-muted-foreground">
                  {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Country</Label>
                <p className="text-sm text-muted-foreground">{user.address.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>Recent performance ratings and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Rating</span>
                <PerformanceRating rating={user.performance} showNumber />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Q4 2023</span>
                  <span>4.2/5.0</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Q3 2023</span>
                  <span>3.8/5.0</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Q2 2023</span>
                  <span>4.0/5.0</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projects" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Projects</CardTitle>
            <CardDescription>Projects assigned to {user.firstName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.projects?.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(project.status)}
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <Badge variant="secondary" className={`text-white ${getStatusColor(project.status)}`}>
                        {project.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.completion}%</p>
                    <Progress value={project.completion} className="w-20 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="feedback" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Feedback from managers and peers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.feedback?.map((feedback) => (
                <div key={feedback.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{feedback.from}</span>
                    <div className="flex items-center gap-2">
                      <PerformanceRating rating={feedback.rating} size="sm" />
                      <span className="text-sm text-muted-foreground">{feedback.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feedback.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Feedback</CardTitle>
            <CardDescription>Provide feedback for {user.firstName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Enter your feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleSubmitFeedback} disabled={!feedbackText.trim()}>
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
