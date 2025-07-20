"use client"

import { useAppContext } from "@/lib/context/app-context"
import { useToast } from "@/hooks/use-toast"

export function useBookmarks() {
  const { state, dispatch } = useAppContext()
  const { toast } = useToast()

  const addBookmark = (user) => {
    const isAlreadyBookmarked = state.bookmarkedUsers.some((bookmarked) => bookmarked.id === user.id)

    if (isAlreadyBookmarked) {
      toast({
        title: "Already bookmarked",
        description: `${user.firstName} ${user.lastName} is already in your bookmarks.`,
        variant: "destructive",
      })
      return
    }

    const bookmarkedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.company.department,
      performance: user.performance,
      bookmarkedAt: new Date().toISOString(),
    }

    dispatch({ type: "ADD_BOOKMARK", payload: bookmarkedUser })
    toast({
      title: "Bookmarked",
      description: `${user.firstName} ${user.lastName} has been added to your bookmarks.`,
    })
  }

  const removeBookmark = (userId) => {
    const user = state.bookmarkedUsers.find((u) => u.id === userId)
    dispatch({ type: "REMOVE_BOOKMARK", payload: userId })

    if (user) {
      toast({
        title: "Bookmark removed",
        description: `${user.firstName} ${user.lastName} has been removed from your bookmarks.`,
      })
    }
  }

  const isBookmarked = (userId) => {
    return state.bookmarkedUsers.some((user) => user.id === userId)
  }

  const promoteUser = (userId) => {
    dispatch({ type: "PROMOTE_USER", payload: userId })
    const user = state.users.find((u) => u.id === userId) || state.bookmarkedUsers.find((u) => u.id === userId)

    if (user) {
      toast({
        title: "User promoted",
        description: `${user.firstName} ${user.lastName} has been promoted!`,
      })
    }
  }

  return {
    bookmarkedUsers: state.bookmarkedUsers,
    addBookmark,
    removeBookmark,
    isBookmarked,
    promoteUser,
  }
}
