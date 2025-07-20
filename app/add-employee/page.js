"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { AddEmployeeForm } from "@/components/forms/add-employee-form"

export default function AddEmployeePage() {
  const router = useRouter()

  const handleSuccess = () => {
    // Redirect to dashboard after successful creation
    router.push("/")
  }

  const handleCancel = () => {
    // Go back to dashboard
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <AddEmployeeForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </main>
    </div>
  )
}
