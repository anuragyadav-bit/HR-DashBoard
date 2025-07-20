"use client"

import { useEffect } from "react"
import { useAppContext } from "@/lib/context/app-context"
import { useSearch } from "@/hooks/use-search"
import { fetchUsers } from "@/lib/api"
import { Navbar } from "@/components/layout/navbar"
import { UserCard } from "@/components/ui/user-card"
import { SearchFilters } from "@/components/ui/search-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { AddEmployeeModal } from "@/components/ui/add-employee-modal"

export default function Dashboard() {
  const { state, dispatch } = useAppContext()
  const {
    searchQuery,
    setSearchQuery,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
    departments,
  } = useSearch(state.users)

  useEffect(() => {
    async function loadUsers() {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        const users = await fetchUsers()
        dispatch({ type: "SET_USERS", payload: users })
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load users" })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    if (state.users.length === 0) {
      loadUsers()
    }
  }, [dispatch, state.users.length])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage employee performance and track key metrics</p>
        </div>

        {state.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {!state.loading && !state.error && (
          <div className="mb-6">
            <SearchFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDepartments={selectedDepartments}
              setSelectedDepartments={setSelectedDepartments}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              departments={departments}
            />
          </div>
        )}

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4 p-6 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-18" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {state.users.length} employees
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {filteredUsers.length === 0 && !state.loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No employees found matching your criteria.</p>
              </div>
            )}
          </>
        )}
        {/* Floating Add Employee Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <AddEmployeeModal />
        </div>
      </main>
    </div>
  )
}
