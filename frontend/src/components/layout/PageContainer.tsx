/**
 * PageContainer Component
 * Wrapper for page content with consistent spacing and safe areas
 */
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
  withPadding?: boolean
}

export function PageContainer({
  children,
  className,
  withPadding = true,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'min-h-[calc(100vh-4rem-4rem)] pb-20', // Account for header and bottom nav
        withPadding && 'container mx-auto px-4 py-6',
        className
      )}
    >
      {children}
    </main>
  )
}
