"use client"

import { Navbar } from "@/components/layout/navbar"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PerformanceRating } from "@/components/ui/performance-rating"
import { Eye, Trash2, TrendingUp, UserPlus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function BookmarksPage() {
  const { bookmarkedUsers, removeBookmark, promoteUser } = useBookmarks()
  const { toast } = useToast()

  const handleAssignToProject = (userId) => {
    const user = bookmarkedUsers.find((u) => u.id === userId)
    if (user) {
      toast({
        title: "Assigned to project",
        description: `${user.firstName} ${user.lastName} has been assigned to a new project.`,
      })
    }
  }

  if (bookmarkedUsers.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
            <p className="text-muted-foreground mt-2">Manage your bookmarked employees and quick actions</p>
          </div>

          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No bookmarked employees yet.</p>
            <p className="text-muted-foreground mt-2">
              Go to the{" "}
              <Link href="/" className="text-primary hover:underline">
                dashboard
              </Link>{" "}
              to bookmark employees.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
          <p className="text-muted-foreground mt-2">Manage your bookmarked employees and quick actions</p>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          {bookmarkedUsers.length} bookmarked employee{bookmarkedUsers.length !== 1 ? "s" : ""}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold truncate">
                        {user.firstName} {user.lastName}
                      </h3>
                      <Badge variant="secondary">{user.department}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>

                    <div className="mt-3">
                      <PerformanceRating rating={user.performance} showNumber />
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      Bookmarked: {new Date(user.bookmarkedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 p-6 pt-0">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/employee/${user.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>

                <Button variant="outline" size="sm" onClick={() => promoteUser(user.id)}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Promote
                </Button>

                <Button variant="outline" size="sm" onClick={() => handleAssignToProject(user.id)}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Assign
                </Button>

                <Button variant="outline" size="sm" onClick={() => removeBookmark(user.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
