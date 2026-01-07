/**
 * Offline Indicator Component
 *
 * Shows a banner when the app is offline.
 * Also shows a success message when offline mode is ready.
 */
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, CheckCircle } from 'lucide-react'

interface OfflineIndicatorProps {
  isOnline: boolean
  offlineReady: boolean
}

export function OfflineIndicator({ isOnline, offlineReady }: OfflineIndicatorProps) {
  // Show offline ready toast
  if (offlineReady) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-80"
        >
          <div className="bg-success-600 text-white rounded-xl shadow-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Ready for offline use</p>
              <p className="text-xs text-success-100">
                The app has been cached for offline access
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Show offline banner
  if (!isOnline) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white py-2 px-4"
      >
        <div className="flex items-center justify-center gap-2 text-sm">
          <WifiOff className="h-4 w-4" />
          <span>You're offline. Some features may be unavailable.</span>
        </div>
      </motion.div>
    )
  }

  return null
}
