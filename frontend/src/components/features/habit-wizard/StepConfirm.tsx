/**
 * Step 4: Confirmation
 *
 * - Summary of all selections
 * - Edit capability for each field
 * - "Create your habit" CTA
 */
import { motion } from 'framer-motion'
import { Flame, Snowflake, Target, Pencil, Zap, Shield } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { HabitFormData } from './types'

interface StepConfirmProps {
  data: HabitFormData
  onEdit: (step: number) => void
}

export function StepConfirm({ data, onEdit }: StepConfirmProps) {
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
          Ready to start?
        </h2>
        <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
          Review your habit and let's begin!
        </p>
      </div>

      {/* Habit Preview Card */}
      <Card className="overflow-hidden">
        <div
          className="h-2"
          style={{ backgroundColor: data.color }}
        />
        <CardContent className="pt-4">
          <div className="flex items-center gap-4">
            {/* Icon Preview */}
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${data.color}20` }}
            >
              {data.icon}
            </div>

            {/* Habit Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-h3 font-bold text-gray-900 dark:text-white truncate">
                {data.name || 'Unnamed Habit'}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-small text-gray-500 dark:text-gray-400">
                  <Target className="h-4 w-4" />
                  <span>{data.streakGoal} day goal</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onEdit(0)}
              className="shrink-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Summary */}
      <div className="space-y-3">
        {/* Freeze Mode */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            {data.freezeMode ? (
              <>
                <div className="w-10 h-10 rounded-full bg-freeze-100 dark:bg-freeze-900/30 flex items-center justify-center">
                  <Snowflake className="h-5 w-5 text-freeze-500" />
                </div>
                <div>
                  <p className="text-body font-medium text-gray-900 dark:text-white">
                    Normal Mode
                  </p>
                  <p className="text-caption text-gray-500 dark:text-gray-400">
                    Freeze protection enabled
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-brand-500" />
                </div>
                <div>
                  <p className="text-body font-medium text-gray-900 dark:text-white">
                    Hard Mode
                  </p>
                  <p className="text-caption text-gray-500 dark:text-gray-400">
                    No freeze protection
                  </p>
                </div>
              </>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(1)}
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>

        {/* Streak Goal */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
              <Flame className="h-5 w-5 text-brand-500" />
            </div>
            <div>
              <p className="text-body font-medium text-gray-900 dark:text-white">
                {data.streakGoal}-Day Goal
              </p>
              <p className="text-caption text-gray-500 dark:text-gray-400">
                Build your streak to {data.streakGoal} days
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>

        {/* Initial Streak (if set) */}
        {data.initialStreak > 0 && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-success-500" />
              </div>
              <div>
                <p className="text-body font-medium text-gray-900 dark:text-white">
                  Starting Streak
                </p>
                <p className="text-caption text-gray-500 dark:text-gray-400">
                  Beginning with {data.initialStreak} days
                </p>
              </div>
            </div>
            <Badge variant="success">{data.initialStreak} days</Badge>
          </div>
        )}
      </div>

      {/* Motivation Message */}
      <div className="text-center p-4 bg-gradient-to-r from-brand-50 to-orange-50 dark:from-brand-900/20 dark:to-orange-900/20 rounded-xl">
        <p className="text-body text-gray-700 dark:text-gray-300">
          Small daily actions lead to <strong>remarkable results</strong>.
        </p>
        <p className="text-small text-gray-500 dark:text-gray-400 mt-1">
          You're about to start something great!
        </p>
      </div>
    </motion.div>
  )
}
