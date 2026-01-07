/**
 * Update Prompt Component
 *
 * Shows a prompt when a new version of the app is available.
 * Appears as a toast at the bottom of the screen.
 */
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui'

interface UpdatePromptProps {
  needRefresh: boolean
  onUpdate: () => void
  onDismiss?: () => void
}

export function UpdatePrompt({ needRefresh, onUpdate, onDismiss }: UpdatePromptProps) {
  if (!needRefresh) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-24 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-96"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
          {/* Content */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="h-5 w-5 text-brand-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Update Available
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  A new version of Encore is ready. Refresh to get the latest features.
                </p>
              </div>
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              {onDismiss && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDismiss}
                  className="flex-1"
                >
                  Later
                </Button>
              )}
              <Button
                size="sm"
                onClick={onUpdate}
                className="flex-1"
              >
                <RefreshCw className="h-4 w-4 mr-1.5" />
                Update now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
