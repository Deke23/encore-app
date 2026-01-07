/**
 * Habit Statistics Component
 *
 * Displays key statistics for a habit including:
 * - Current streak
 * - Best streak
 * - Total completions
 * - Completion rate
 * - Day of week breakdown
 */
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Flame, Trophy, Target, TrendingUp, Calendar } from 'lucide-react'
import { format, differenceInDays, parseISO } from 'date-fns'
import { Card, CardContent } from '@/components/ui'
import type { Habit, Completion } from '@/store'

interface HabitStatsProps {
  habit: Habit
  completions: Completion[]
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  subtext?: string
  color?: string
  delay?: number
}

function StatCard({ icon, label, value, subtext, color = 'text-gray-600', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="h-full">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${color}`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-small text-gray-500 dark:text-gray-400">{label}</p>
              <p className="text-h2 font-bold text-gray-900 dark:text-white truncate">
                {value}
              </p>
              {subtext && (
                <p className="text-caption text-gray-500 dark:text-gray-400 truncate">
                  {subtext}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function HabitStats({ habit, completions }: HabitStatsProps) {
  // Calculate completion rate
  const completionStats = useMemo(() => {
    if (completions.length === 0 || !habit.createdAt) {
      return {
        rate: 0,
        totalDays: 0,
        completedDays: completions.length,
      }
    }

    const createdDate = parseISO(habit.createdAt)
    const today = new Date()
    const totalDays = Math.max(1, differenceInDays(today, createdDate) + 1)
    const completedDays = completions.length
    const rate = Math.round((completedDays / totalDays) * 100)

    return { rate, totalDays, completedDays }
  }, [completions, habit.createdAt])

  // Calculate day of week breakdown
  const dayOfWeekStats = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const counts = new Array(7).fill(0)

    completions.forEach((c) => {
      const date = parseISO(c.date + 'T00:00:00')
      const dayIndex = date.getDay()
      counts[dayIndex]++
    })

    const maxCount = Math.max(...counts, 1)

    return days.map((day, index) => ({
      day,
      count: counts[index],
      percentage: (counts[index] / maxCount) * 100,
    }))
  }, [completions])

  // Find best and worst days
  const bestDay = useMemo(() => {
    const sorted = [...dayOfWeekStats].sort((a, b) => b.count - a.count)
    return sorted[0]?.day || 'N/A'
  }, [dayOfWeekStats])

  // Calculate streak goal progress
  const goalProgress = Math.min(100, (habit.currentStreak / habit.streakGoal) * 100)

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label="Current Streak"
          value={habit.currentStreak}
          subtext={habit.currentStreak === 1 ? 'day' : 'days'}
          color="text-brand-500"
          delay={0}
        />
        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label="Best Streak"
          value={habit.bestStreak}
          subtext={habit.bestStreak === 1 ? 'day' : 'days'}
          color="text-warning-DEFAULT"
          delay={0.05}
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Total Completions"
          value={habit.totalCompletions}
          subtext={`of ${completionStats.totalDays} days`}
          color="text-success-DEFAULT"
          delay={0.1}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Completion Rate"
          value={`${completionStats.rate}%`}
          subtext={`Best day: ${bestDay}`}
          color="text-info-DEFAULT"
          delay={0.15}
        />
      </div>

      {/* Streak Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-small font-medium text-gray-700 dark:text-gray-300">
                Streak Goal Progress
              </span>
              <span className="text-small text-gray-500 dark:text-gray-400">
                {habit.currentStreak} / {habit.streakGoal} days
              </span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goalProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: habit.color }}
              />
            </div>
            {goalProgress >= 100 && (
              <p className="text-small text-success-DEFAULT mt-2 font-medium">
                Goal reached! Keep going!
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Day of Week Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-small font-medium text-gray-700 dark:text-gray-300">
                Completions by Day
              </span>
            </div>
            <div className="flex items-end justify-between gap-1 h-20">
              {dayOfWeekStats.map((stat, index) => (
                <div key={stat.day} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(4, stat.percentage)}%` }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    className={`w-full rounded-t ${
                      stat.count === 0 ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    style={{
                      backgroundColor: stat.count > 0 ? habit.color : undefined,
                    }}
                  />
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {stat.day}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Habit Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-4 space-y-3">
            <h4 className="text-small font-medium text-gray-700 dark:text-gray-300">
              Habit Details
            </h4>
            <div className="grid grid-cols-2 gap-3 text-small">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Created</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {habit.createdAt
                    ? format(parseISO(habit.createdAt), 'MMM d, yyyy')
                    : 'Unknown'}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Freeze Mode</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {habit.freezeMode ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Freezes Available</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {habit.freezesAvailable} / 2
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Streak Goal</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {habit.streakGoal} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
