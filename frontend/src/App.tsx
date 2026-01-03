/**
 * Main App Component
 * Sets up routing, providers, and global layout
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { queryClient } from '@/lib/query-client'
import { Header, BottomNav } from '@/components/layout'
import { HomePage, StatsPage, SettingsPage } from '@/pages'
import { useAppStore } from '@/store'
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
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
