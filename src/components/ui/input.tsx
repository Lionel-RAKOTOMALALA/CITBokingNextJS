import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search"
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, variant = "default", type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full rounded-lg border bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
        {
          "border-slate-600 focus:border-orange-500 focus:ring-orange-500": variant === "default",
          "border-slate-600 focus:border-orange-500 focus:ring-orange-500 pl-10": variant === "search",
        },
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
