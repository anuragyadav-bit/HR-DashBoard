export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  company: {
    department: string
    name: string
    title: string
  }
  image: string
  performance: number
  bio?: string
  projects?: Project[]
  feedback?: Feedback[]
}

export interface BookmarkedUser {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
  performance: number
  bookmarkedAt: string
}

export interface Project {
  id: number
  name: string
  status: "completed" | "in-progress" | "pending"
  completion: number
}

export interface Feedback {
  id: number
  from: string
  message: string
  rating: number
  date: string
}

export interface AnalyticsData {
  departmentRatings: { department: string; rating: number; count: number }[]
  bookmarkTrends: { month: string; bookmarks: number }[]
}
