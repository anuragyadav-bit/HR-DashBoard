"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const initialState = {
  users: [],
  bookmarkedUsers: [],
  loading: false,
  error: null,
}

const AppContext = createContext(null)

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarkedUsers: [...state.bookmarkedUsers, action.payload],
      }
    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarkedUsers: state.bookmarkedUsers.filter((user) => user.id !== action.payload),
      }
    case "PROMOTE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload ? { ...user, performance: Math.min(5, user.performance + 0.5) } : user,
        ),
      }
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("hr-bookmarks")
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks)
      bookmarks.forEach((bookmark) => {
        dispatch({ type: "ADD_BOOKMARK", payload: bookmark })
      })
    }
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("hr-bookmarks", JSON.stringify(state.bookmarkedUsers))
  }, [state.bookmarkedUsers])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
