import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border-2 bg-white px-4 py-2 text-base transition-colors",
            "placeholder:text-gray-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100",
            error
              ? "border-error-DEFAULT focus-visible:ring-error-DEFAULT"
              : "border-gray-300 dark:border-gray-700",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-error-DEFAULT">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
