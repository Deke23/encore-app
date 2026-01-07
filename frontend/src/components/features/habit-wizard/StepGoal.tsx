/**
 * Step 3: Streak Goal Selection
 *
 * - Four preset options: 7, 14, 30, 50 days
 * - Custom goal input (Premium feature)
 * - Visual streak milestones
 */
import { motion } from 'framer-motion'
import { Target, Crown, Check } from 'lucide-react'
import { HabitFormData, STREAK_GOALS } from './types'
import { useIsPremium } from '@/store'
import { Badge } from '@/components/ui'

interface StepGoalProps {
  data: HabitFormData
  onChange: (updates: Partial<HabitFormData>) => void
}

export function StepGoal({ data, onChange }: StepGoalProps) {
  const isPremium = useIsPremium()

  const getProgressLabel = (goal: number) => {
    if (goal <= 7) return 'Starter'
    if (goal <= 14) return 'Committed'
    if (goal <= 30) return 'Dedicated'
    return 'Master'
  }

  const getProgressColor = (goal: number) => {
    if (goal <= 7) return 'bg-success-500'
    if (goal <= 14) return 'bg-brand-400'
    if (goal <= 30) return 'bg-brand-500'
    return 'bg-brand-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-h2 font-bold text-gray-900 dark:text-white">
          Set your goal
        </h2>
        <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
          How long is your streak target?
        </p>
      </div>

      {/* Goal Options */}
      <div className="grid grid-cols-2 gap-3">
        {STREAK_GOALS.map((goal) => {
          const isSelected = data.streakGoal === goal.value

          return (
            <motion.button
              key={goal.value}
              type="button"
              onClick={() => onChange({ streakGoal: goal.value })}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-300 dark:border-brand-700 ring-2 ring-brand-500'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {/* Selection Check */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </motion.div>
              )}

              {/* Goal Number */}
              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className={`text-display font-bold ${
                    isSelected
                      ? 'text-brand-500'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {goal.value}
                </span>
                <span className="text-small text-gray-500 dark:text-gray-400">
                  days
                </span>
              </div>

              {/* Description */}
              <p className="text-caption text-gray-600 dark:text-gray-400">
                {goal.description}
              </p>
            </motion.button>
          )
        })}
      </div>

      {/* Custom Goal (Premium) */}
      <div
        className={`p-4 rounded-xl border-2 ${
          isPremium
            ? 'border-gray-200 dark:border-gray-800'
            : 'border-dashed border-gray-300 dark:border-gray-700 opacity-60'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Target className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-body font-medium text-gray-900 dark:text-white">
                  Custom Goal
                </span>
                {!isPremium && (
                  <Badge variant="secondary" className="gap-1">
                    <Crown className="h-3 w-3" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-caption text-gray-500 dark:text-gray-400">
                Set any number of days
              </p>
            </div>
          </div>

          {isPremium ? (
            <input
              type="number"
              min={1}
              max={365}
              value={
                !STREAK_GOALS.some((g) => g.value === data.streakGoal)
                  ? data.streakGoal
                  : ''
              }
              onChange={(e) => {
                const value = parseInt(e.target.value, 10)
                if (value >= 1 && value <= 365) {
                  onChange({ streakGoal: value })
                }
              }}
              placeholder="e.g., 21"
              className="w-20 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-center text-body font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          ) : (
            <span className="text-caption text-gray-400">Upgrade to unlock</span>
          )}
        </div>
      </div>

      {/* Progress Preview */}
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between text-small">
          <span className="text-gray-600 dark:text-gray-400">
            Goal: {data.streakGoal} days
          </span>
          <Badge variant="outline">{getProgressLabel(data.streakGoal)}</Badge>
        </div>

        {/* Progress Bar Preview */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '15%' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`h-full ${getProgressColor(data.streakGoal)} rounded-full`}
          />
        </div>

        <p className="text-caption text-gray-500 dark:text-gray-400 text-center">
          Complete your habit daily to reach your {data.streakGoal}-day goal
        </p>
      </div>
    </motion.div>
  )
}
