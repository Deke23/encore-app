/**
 * BottomNav Component
 * Mobile-friendly bottom navigation bar
 */
import { NavLink } from 'react-router-dom'
import { Home, BarChart3, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    to: '/',
    icon: Home,
    label: 'Home',
  },
  {
    to: '/stats',
    icon: BarChart3,
    label: 'Stats',
  },
  {
    to: '/settings',
    icon: Settings,
    label: 'Settings',
  },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-gray-950/95 safe-area-inset-bottom">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 py-3 transition-colors',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                  isActive
                    ? 'text-brand-500'
                    : 'text-gray-600 dark:text-gray-400'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      'h-6 w-6 transition-all',
                      isActive && 'scale-110'
                    )}
                  />
                  <span className="text-tiny font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
