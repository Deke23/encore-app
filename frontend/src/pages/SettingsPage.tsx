/**
 * Settings Page - App preferences and account management
 */
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Moon,
  Sun,
  Monitor,
  Bell,
  User,
  Crown,
  LogOut,
  RotateCcw,
  Trash2,
  Download,
  Clock,
  AlertTriangle,
  Mail,
  ExternalLink,
  Shield,
  FileText,
  HelpCircle,
  ChevronRight,
  Archive,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Switch,
} from '@/components/ui'
import { PageContainer } from '@/components/layout'
import { useAppStore, useIsPremium, useActiveHabits } from '@/store'

// Confirmation Modal Component
function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  confirmVariant = 'danger',
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText: string
  confirmVariant?: 'danger' | 'default'
}) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-error" />
            </div>
            <h3 className="text-h3 font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-small text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="px-6 pb-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant={confirmVariant === 'danger' ? 'destructive' : 'default'}
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="flex-1"
            >
              {confirmText}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

// Settings Row Component
function SettingsRow({
  icon: Icon,
  label,
  description,
  action,
  onClick,
}: {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  description?: string
  action?: React.ReactNode
  onClick?: () => void
}) {
  const content = (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
        )}
        <div>
          <p className="text-body font-medium text-gray-900 dark:text-white">
            {label}
          </p>
          {description && (
            <p className="text-small text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
      {action || (onClick && <ChevronRight className="h-5 w-5 text-gray-400" />)}
    </div>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-4 px-4 rounded-lg transition-colors"
      >
        {content}
      </button>
    )
  }

  return content
}

export function SettingsPage() {
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const setOnboarded = useAppStore((state) => state.setOnboarded)
  const user = useAppStore((state) => state.user)
  const isPremium = useIsPremium()
  const habits = useActiveHabits()
  const completions = useAppStore((state) => state.completions)
  const clearAllData = useAppStore((state) => state.clearAllData)

  // Notification settings
  const notificationsEnabled = useAppStore((state) => state.notificationsEnabled)
  const setNotificationsEnabled = useAppStore((state) => state.setNotificationsEnabled)
  const reminderTime = useAppStore((state) => state.reminderTime)
  const setReminderTime = useAppStore((state) => state.setReminderTime)
  const streakAtRiskEnabled = useAppStore((state) => state.streakAtRiskEnabled)
  const setStreakAtRiskEnabled = useAppStore((state) => state.setStreakAtRiskEnabled)
  const weeklyDigestEnabled = useAppStore((state) => state.weeklyDigestEnabled)
  const setWeeklyDigestEnabled = useAppStore((state) => state.setWeeklyDigestEnabled)

  const [showClearDataModal, setShowClearDataModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  // Calculate total stats
  const totalStats = useMemo(() => {
    const totalCompletions = Object.values(completions).reduce(
      (sum, arr) => sum + arr.length,
      0
    )
    return {
      habits: habits.length,
      completions: totalCompletions,
    }
  }, [habits, completions])

  const handleResetOnboarding = () => {
    setOnboarded(false)
  }

  const handleClearData = () => {
    clearAllData()
    setShowClearDataModal(false)
  }

  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      habits: habits,
      completions: completions,
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `encore-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ]

  return (
    <PageContainer>
      <div className="space-y-6 max-w-2xl mx-auto pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
            Manage your preferences and account
          </p>
        </motion.div>

        {/* Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-medium text-gray-900 dark:text-white">
                    {user?.email || 'Guest User'}
                  </p>
                  <p className="text-small text-gray-600 dark:text-gray-400">
                    {user?.displayName || 'Not signed in'}
                  </p>
                </div>
                {isPremium && (
                  <Badge variant="freeze" className="gap-1">
                    <Crown className="h-3 w-3" />
                    Premium
                  </Badge>
                )}
              </div>
              <Button variant="ghost" className="w-full justify-start" disabled>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium Section */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-orange-50 dark:from-brand-900/20 dark:to-orange-900/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-brand-500" />
                </div>
                <CardTitle>Upgrade to Premium</CardTitle>
                <CardDescription>
                  Unlock unlimited habits and advanced features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-small text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <span>Unlimited habits (Free: 3 max)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <span>Advanced analytics and insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <span>Custom streak goals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <span>Data export and backup</span>
                  </div>
                </div>
                <Button className="w-full mt-4">Upgrade Now</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how Encore looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-small font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {themeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={theme === option.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme(option.value)}
                      className="flex items-center gap-2"
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage your reminder preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <SettingsRow
                icon={Bell}
                label="Daily Reminders"
                description="Get notified to complete your habits"
                action={
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    aria-label="Toggle daily reminders"
                  />
                }
              />

              {notificationsEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <SettingsRow
                    icon={Clock}
                    label="Reminder Time"
                    description={`Remind me at ${reminderTime}`}
                    action={
                      <input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-small"
                      />
                    }
                  />
                </motion.div>
              )}

              <SettingsRow
                icon={AlertTriangle}
                label="Streak at Risk"
                description="Alert when habits aren't completed by 8 PM"
                action={
                  <Switch
                    checked={streakAtRiskEnabled}
                    onCheckedChange={setStreakAtRiskEnabled}
                    aria-label="Toggle streak at risk alerts"
                  />
                }
              />

              <SettingsRow
                icon={Mail}
                label="Weekly Digest"
                description="Receive a weekly summary of your progress"
                action={
                  <Switch
                    checked={weeklyDigestEnabled}
                    onCheckedChange={setWeeklyDigestEnabled}
                    aria-label="Toggle weekly digest"
                  />
                }
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                {totalStats.habits} habits, {totalStats.completions} completions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <SettingsRow
                icon={Download}
                label="Export Data"
                description="Download your habits as JSON"
                onClick={handleExportData}
              />

              <SettingsRow
                icon={Trash2}
                label="Clear All Data"
                description="Delete all habits and completions"
                onClick={() => setShowClearDataModal(true)}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Help & Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <SettingsRow
                icon={FileText}
                label="Privacy Policy"
                action={<ExternalLink className="h-4 w-4 text-gray-400" />}
                onClick={() => window.open('/privacy', '_blank')}
              />

              <SettingsRow
                icon={Shield}
                label="Terms of Service"
                action={<ExternalLink className="h-4 w-4 text-gray-400" />}
                onClick={() => window.open('/terms', '_blank')}
              />

              <SettingsRow
                icon={Mail}
                label="Contact Support"
                action={<ExternalLink className="h-4 w-4 text-gray-400" />}
                onClick={() => window.open('mailto:support@encore.app', '_blank')}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>About Encore</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-small">
                <span className="text-gray-600 dark:text-gray-400">Version</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  1.0.0
                </span>
              </div>
              <div className="flex justify-between text-small">
                <span className="text-gray-600 dark:text-gray-400">Build</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  Sprint 5 - Enhancement
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <p className="text-small text-center text-gray-500 dark:text-gray-400">
                  Made with passion for habit builders
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Developer Tools (visible in development) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-gray-500 dark:text-gray-400">
                Developer Tools
              </CardTitle>
              <CardDescription>Testing and debugging options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetOnboarding}
                className="w-full justify-start"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Onboarding
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetModal(true)}
                className="w-full justify-start text-error hover:text-error"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Factory Reset
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        onConfirm={handleClearData}
        title="Clear All Data?"
        description={`This will permanently delete ${totalStats.habits} habits and ${totalStats.completions} completions. Your settings will be preserved.`}
        confirmText="Clear Data"
        confirmVariant="danger"
      />

      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={() => {
          useAppStore.getState().reset()
          setShowResetModal(false)
        }}
        title="Factory Reset?"
        description="This will reset the entire app to its initial state, including all data and settings."
        confirmText="Reset Everything"
        confirmVariant="danger"
      />
    </PageContainer>
  )
}
