/**
 * Settings Page - App preferences and account management
 */
import { Moon, Sun, Monitor, Bell, User, Crown, LogOut } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@/components/ui'
import { PageContainer } from '@/components/layout'
import { useAppStore, useIsPremium } from '@/store'

export function SettingsPage() {
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const user = useAppStore((state) => state.user)
  const isPremium = useIsPremium()

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ]

  return (
    <PageContainer>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
            Manage your preferences and account
          </p>
        </div>

        {/* Account Section */}
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
                  {user?.email || 'Not logged in'}
                </p>
                <p className="text-small text-gray-600 dark:text-gray-400">
                  {user?.displayName || 'Guest User'}
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

        {/* Premium Section */}
        {!isPremium && (
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
              <Button className="w-full mt-4">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Appearance Section */}
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

        {/* Notifications Section */}
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
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-medium text-gray-900 dark:text-white">
                    Daily Reminders
                  </p>
                  <p className="text-small text-gray-600 dark:text-gray-400">
                    Get notified to complete your habits
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Configure
                </Button>
              </div>
              <p className="text-small text-gray-500 dark:text-gray-500">
                Notification settings will be available in Sprint 3
              </p>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About Encore</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-small text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Version</span>
              <span className="font-medium text-gray-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Sprint</span>
              <span className="font-medium text-gray-900 dark:text-white">2 - Application Shell</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
