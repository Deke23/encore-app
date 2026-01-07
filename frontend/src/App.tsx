/**
 * Main App Component
 * Sets up routing, providers, and global layout
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { queryClient } from '@/lib/query-client'
import { Header, BottomNav } from '@/components/layout'
import { InstallPrompt, OfflineIndicator, UpdatePrompt } from '@/components/pwa'
import { HomePage, HabitDetailPage, StatsPage, SettingsPage, OnboardingPage } from '@/pages'
import { useAppStore } from '@/store'
import { usePWA } from '@/hooks'
import { useEffect } from 'react'

// Page transition animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2,
}

function App() {
  const theme = useAppStore((state) => state.theme)
  const isOnboarded = useAppStore((state) => state.isOnboarded)

  // PWA functionality
  const {
    canInstall,
    installPrompt,
    needRefresh,
    offlineReady,
    updateServiceWorker,
    isOnline,
  } = usePWA()

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Show onboarding for first-time users */}
        {!isOnboarded ? (
          <OnboardingPage />
        ) : (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />

            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <motion.div
                      key="home"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={pageTransition}
                    >
                      <HomePage />
                    </motion.div>
                  }
                />
                <Route
                  path="/habit/:habitId"
                  element={
                    <motion.div
                      key="habit-detail"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={pageTransition}
                    >
                      <HabitDetailPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/stats"
                  element={
                    <motion.div
                      key="stats"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={pageTransition}
                    >
                      <StatsPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <motion.div
                      key="settings"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={pageTransition}
                    >
                      <SettingsPage />
                    </motion.div>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>

            <BottomNav />
          </div>
        )}

        {/* PWA Components */}
        <OfflineIndicator isOnline={isOnline} offlineReady={offlineReady} />
        <InstallPrompt canInstall={canInstall} onInstall={installPrompt} />
        <UpdatePrompt needRefresh={needRefresh} onUpdate={updateServiceWorker} />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
