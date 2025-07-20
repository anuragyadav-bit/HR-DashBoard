"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchUserById } from "@/lib/api"
import { Navbar } from "@/components/layout/navbar"
import { UserProfile } from "@/components/employee/user-profile"
import { UserTabs } from "@/components/employee/user-tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmployeePage() {
  const params = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      setError(null)

      try {
        const userData = await fetchUserById(Number(params.id))
        if (userData) {
          setUser(userData)
        } else {
          setError("User not found")
        }
      } catch (err) {
        setError("Failed to load user details")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadUser()
    }
  }, [params.id])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        ) : user ? (
          <div className="space-y-6">
            <UserProfile user={user} />
            <UserTabs user={user} />
          </div>
        ) : null}
      </main>
    </div>
  )
}
