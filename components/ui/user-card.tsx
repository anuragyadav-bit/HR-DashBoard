"use client"

import type { User } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PerformanceRating } from "@/components/ui/performance-rating"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Eye, Bookmark, TrendingUp, BookmarkCheck } from "lucide-react"
import Link from "next/link"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const { addBookmark, isBookmarked, promoteUser } = useBookmarks()
  const bookmarked = isBookmarked(user.id)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
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
              <Badge variant="secondary">{user.company.department}</Badge>
            </div>

            <p className="text-sm text-muted-foreground truncate">{user.email}</p>

            <p className="text-sm text-muted-foreground mt-1">Age: {user.age}</p>

            <div className="mt-3">
              <PerformanceRating rating={user.performance} showNumber />
            </div>
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

        <Button variant="outline" size="sm" onClick={() => addBookmark(user)} disabled={bookmarked}>
          {bookmarked ? <BookmarkCheck className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </Button>

        <Button variant="outline" size="sm" onClick={() => promoteUser(user.id)}>
          <TrendingUp className="h-4 w-4 mr-1" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  )
}
