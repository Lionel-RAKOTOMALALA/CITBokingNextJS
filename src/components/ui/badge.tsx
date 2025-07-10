import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info"
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
          {
            "bg-slate-700 text-slate-200": variant === "default",
            "bg-green-900 text-green-300 border border-green-800": variant === "success",
            "bg-yellow-900 text-yellow-300 border border-yellow-800": variant === "warning",
            "bg-red-900 text-red-300 border border-red-800": variant === "error",
            "bg-blue-900 text-blue-300 border border-blue-800": variant === "info",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
