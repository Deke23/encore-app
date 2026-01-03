/**
 * Header Component
 * App header with logo, date, and premium badge
 */
import { Flame, Crown } from 'lucide-react'
import { Badge } from '@/components/ui'
import { useAppStore, useIsPremium } from '@/store'
import { format } from 'date-fns'

export function Header() {
  const selectedDate = useAppStore((state) => state.selectedDate)
  const isPremium = useIsPremium()

  const formattedDate = format(new Date(selectedDate), 'EEEE, MMMM d')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Flame className="h-7 w-7 text-brand-500" />
          <span className="text-h3 font-bold text-gray-900 dark:text-white">
            Encore
          </span>
        </div>

        {/* Date */}
        <div className="hidden sm:block text-small text-gray-600 dark:text-gray-400">
          {formattedDate}
        </div>

        {/* Premium Badge */}
        {isPremium && (
          <Badge variant="freeze" className="gap-1">
            <Crown className="h-3 w-3" />
            Premium
          </Badge>
        )}
      </div>
    </header>
  )
}
