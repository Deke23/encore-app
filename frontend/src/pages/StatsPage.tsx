/**
 * Statistics Page - View habit analytics and insights
 */
import { TrendingUp, Target, Award, Lock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '@/components/ui'
import { PageContainer } from '@/components/layout'
import { useIsPremium } from '@/store'

export function StatsPage() {
  const isPremium = useIsPremium()

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white">
            Statistics
          </h1>
          <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
            Track your progress and insights
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-8 w-8 text-brand-500 mb-2" />
                <div className="text-display font-bold text-gray-900 dark:text-white">
                  85%
                </div>
                <div className="text-small text-gray-600 dark:text-gray-400">
                  Completion Rate
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Target className="h-8 w-8 text-success-DEFAULT mb-2" />
                <div className="text-display font-bold text-gray-900 dark:text-white">
                  21
                </div>
                <div className="text-small text-gray-600 dark:text-gray-400">
                  Best Streak
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Features Preview */}
        {!isPremium && (
          <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-orange-50 dark:from-brand-900/20 dark:to-orange-900/20">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="freeze">Premium</Badge>
              </div>
              <CardTitle>Unlock Advanced Analytics</CardTitle>
              <CardDescription>
                Get detailed insights into your habit patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-small text-gray-700 dark:text-gray-300">
                <Award className="h-5 w-5 text-brand-500" />
                <span>Habit correlations and patterns</span>
              </div>
              <div className="flex items-center gap-3 text-small text-gray-700 dark:text-gray-300">
                <TrendingUp className="h-5 w-5 text-brand-500" />
                <span>Predictive streak analytics</span>
              </div>
              <div className="flex items-center gap-3 text-small text-gray-700 dark:text-gray-300">
                <Target className="h-5 w-5 text-brand-500" />
                <span>Personalized insights and tips</span>
              </div>
              <Button className="w-full mt-4">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Locked Premium Stats */}
        {!isPremium && (
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <Lock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-small font-medium text-gray-600 dark:text-gray-400">
                  Premium Feature
                </p>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>
                Your habit completion patterns by day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-small font-medium text-gray-600 dark:text-gray-400 w-12">
                      {day}
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Premium Stats (visible when premium) */}
        {isPremium && (
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>
                Your habit completion patterns by day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-small text-gray-600 dark:text-gray-400">
                Advanced analytics will be implemented in Sprint 21-23
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  )
}
