"use client"

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

export function FormFieldWrapper({ label, description, required = false, className, children }) {
  return (
    <FormItem className={cn(className)}>
      <FormLabel className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
