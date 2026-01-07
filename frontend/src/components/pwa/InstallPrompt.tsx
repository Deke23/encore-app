/**
 * Install Prompt Component
 *
 * Shows a prompt to install the PWA when available.
 * Appears as a banner at the bottom of the screen.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui'

interface InstallPromptProps {
  canInstall: boolean
  onInstall: () => Promise<void>
}

export function InstallPrompt({ canInstall, onInstall }: InstallPromptProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Check if user previously dismissed (with 7-day cooldown)
  useEffect(() => {
    const dismissedAt = localStorage.getItem('pwa-install-dismissed')
    if (dismissedAt) {
      const dismissedDate = new Date(dismissedAt)
      const now = new Date()
      const daysDiff = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)

      // Show again after 7 days
      if (daysDiff < 7) {
        setIsDismissed(true)
        return
      }
    }

    // Delay showing the prompt by 30 seconds for better UX
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 30000)

    return () => clearTimeout(timeout)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString())
  }

  const handleInstall = async () => {
    await onInstall()
    setIsDismissed(true)
  }

  if (!canInstall || isDismissed || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-20 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-96"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-600 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Install Encore</p>
              <p className="text-xs text-white/80">Add to your home screen</p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Install Encore for quick access, offline support, and a native app experience.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDismiss}
                className="flex-1"
              >
                Not now
              </Button>
              <Button
                size="sm"
                onClick={handleInstall}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Install
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
