import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "dots" | "pulse"
  className?: string
}

export function Loading({ size = "md", variant = "spinner", className }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  if (variant === "spinner") {
    return (
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-slate-600 border-t-orange-500",
          sizeClasses[size],
          className,
        )}
      />
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-orange-500 rounded-full animate-pulse",
              size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3",
            )}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    )
  }

  return <div className={cn("bg-slate-700 rounded animate-pulse", sizeClasses[size], className)} />
}
