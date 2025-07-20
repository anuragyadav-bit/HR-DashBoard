"use client"

import { useState, useMemo } from "react"

export function useSearch(users) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.department.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(user.company.department)

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.some((rating) => Math.floor(user.performance) === rating)

      return matchesSearch && matchesDepartment && matchesRating
    })
  }, [users, searchQuery, selectedDepartments, selectedRatings])

  const departments = useMemo(() => {
    return Array.from(new Set(users.map((user) => user.company.department)))
  }, [users])

  return {
    searchQuery,
    setSearchQuery,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
    departments,
  }
}
