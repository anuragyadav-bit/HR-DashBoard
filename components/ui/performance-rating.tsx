import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface PerformanceRatingProps {
  rating: number
  size?: "sm" | "md" | "lg"
  showNumber?: boolean
  className?: string
}

export function PerformanceRating({ rating, size = "md", showNumber = false, className }: PerformanceRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-500"
    if (rating >= 3.5) return "text-yellow-500"
    if (rating >= 2.5) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= Math.floor(rating)
                ? cn("fill-current", getRatingColor(rating))
                : star <= rating
                  ? cn("fill-current opacity-50", getRatingColor(rating))
                  : "text-muted-foreground",
            )}
          />
        ))}
      </div>
      {showNumber && <span className={cn("font-medium", getRatingColor(rating))}>{rating.toFixed(1)}</span>}
    </div>
  )
}
