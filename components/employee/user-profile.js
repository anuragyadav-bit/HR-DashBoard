"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PerformanceRating } from "@/components/ui/performance-rating"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Bookmark, TrendingUp, BookmarkCheck, Mail, Phone, MapPin } from "lucide-react"

export function UserProfile({ user }) {
  const { addBookmark, isBookmarked, promoteUser } = useBookmarks()
  const bookmarked = isBookmarked(user.id)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="text-lg">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-lg text-muted-foreground">{user.company.title}</p>
              </div>
              <Badge variant="secondary" className="w-fit">
                {user.company.department}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                {user.email}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                {user.phone}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {user.address.city}, {user.address.state}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Performance Rating:</span>
                <PerformanceRating rating={user.performance} showNumber />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => addBookmark(user)} disabled={bookmarked}>
                {bookmarked ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </Button>

              <Button variant="outline" onClick={() => promoteUser(user.id)}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Promote
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
