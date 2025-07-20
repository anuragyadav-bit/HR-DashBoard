"use client"

import { useEffect, useState } from "react"

export function useFormPersistence(key, defaultValues) {
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        setValues(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to parse saved form data:", error)
      }
    }
  }, [key])

  const saveValues = (newValues) => {
    setValues(newValues)
    localStorage.setItem(key, JSON.stringify(newValues))
  }

  const clearValues = () => {
    setValues(defaultValues)
    localStorage.removeItem(key)
  }

  return { values, saveValues, clearValues }
}
