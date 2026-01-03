/**
 * Home Page - Main habit tracking screen
 */
import { Plus, Flame } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui'
import { PageContainer } from '@/components/layout'
import { useActiveHabits } from '@/store'

export function HomePage() {
  const habits = useActiveHabits()

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold text-gray-900 dark:text-white">
              Your Habits
            </h1>
            <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
              {habits.length === 0
                ? 'Start building your first habit'
                : `${habits.length} active habit${habits.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {habits.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-brand-100 dark:bg-brand-900/20 p-6">
                  <Flame className="h-12 w-12 text-brand-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-h3 font-semibold text-gray-900 dark:text-white">
                    No habits yet
                  </h3>
                  <p className="text-small text-gray-600 dark:text-gray-400 max-w-sm">
                    Create your first habit to start building consistent daily
                    routines with streak-based tracking.
                  </p>
                </div>
                <Button size="lg" className="mt-4">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Habit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Habit List (Sample Data for Demo) */}
        {habits.length === 0 && (
          <div className="space-y-4">
            <h2 className="text-h3 font-semibold text-gray-900 dark:text-white">
              Examples
            </h2>
            <div className="grid gap-4">
              {/* Sample Habit Card 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🏃</div>
                      <div>
                        <CardTitle>Morning Run</CardTitle>
                        <CardDescription>7 day streak goal</CardDescription>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-brand-500" />
                      <span className="text-h2 font-bold text-brand-500">7</span>
                      <span className="text-small text-gray-600 dark:text-gray-400">
                        days
                      </span>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Habit Card 2 */}
              <Card className="hover:shadow-md transition-shadow opacity-60">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">📚</div>
                      <div>
                        <CardTitle>Read 30 Minutes</CardTitle>
                        <CardDescription>30 day streak goal</CardDescription>
                      </div>
                    </div>
                    <Badge variant="freeze">❄️ 2</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-gray-400" />
                      <span className="text-h2 font-bold text-gray-400">0</span>
                      <span className="text-small text-gray-600 dark:text-gray-400">
                        days
                      </span>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* FAB would float here in final version */}
      </div>
    </PageContainer>
  )
}
