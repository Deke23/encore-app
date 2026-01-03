import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-gray-300 border-t-brand-500",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        default: "h-8 w-8 border-2",
        lg: "h-12 w-12 border-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { Spinner, spinnerVariants }
