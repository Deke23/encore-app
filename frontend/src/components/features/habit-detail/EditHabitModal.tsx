/**
 * Edit Habit Modal
 *
 * Modal form for editing habit properties:
 * - Name
 * - Icon
 * - Color
 * - Streak goal
 * - Freeze mode
 */
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Snowflake } from 'lucide-react'
import { Button } from '@/components/ui'
import { useAppStore, type Habit } from '@/store'
import { HABIT_ICONS, HABIT_COLORS, STREAK_GOALS } from '../habit-wizard/types'

interface EditHabitModalProps {
  habit: Habit
  isOpen: boolean
  onClose: () => void
}

export function EditHabitModal({ habit, isOpen, onClose }: EditHabitModalProps) {
  const updateHabit = useAppStore((state) => state.updateHabit)

  const [name, setName] = useState(habit.name)
  const [icon, setIcon] = useState(habit.icon)
  const [color, setColor] = useState(habit.color)
  const [streakGoal, setStreakGoal] = useState(habit.streakGoal)
  const [freezeMode, setFreezeMode] = useState(habit.freezeMode)
  const [error, setError] = useState('')

  const handleSave = useCallback(() => {
    // Validate
    if (!name.trim()) {
      setError('Please enter a habit name')
      return
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    // Update habit
    updateHabit(habit.id, {
      name: name.trim(),
      icon,
      color,
      streakGoal,
      freezeMode,
    })

    onClose()
  }, [name, icon, color, streakGoal, freezeMode, habit.id, updateHabit, onClose])

  const handleCancel = useCallback(() => {
    // Reset to original values
    setName(habit.name)
    setIcon(habit.icon)
    setColor(habit.color)
    setStreakGoal(habit.streakGoal)
    setFreezeMode(habit.freezeMode)
    setError('')
    onClose()
  }, [habit, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancel}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[85vh] overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-h3 font-semibold text-gray-900 dark:text-white">
              Edit Habit
            </h2>
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-140px)] space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="habit-name"
                className="block text-small font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Habit Name
              </label>
              <input
                id="habit-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="e.g., Morning meditation"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                maxLength={50}
              />
              {error && (
                <p className="mt-2 text-small text-error">{error}</p>
              )}
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-small font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {HABIT_ICONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`
                      aspect-square rounded-xl text-2xl flex items-center justify-center
                      transition-all duration-200
                      ${icon === emoji
                        ? 'bg-brand-100 dark:bg-brand-900/30 ring-2 ring-brand-500 scale-110'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-small font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {HABIT_COLORS.map((colorValue) => (
                  <button
                    key={colorValue}
                    type="button"
                    onClick={() => setColor(colorValue)}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-200
                      ${color === colorValue ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900 scale-110' : ''}
                    `}
                    style={{ backgroundColor: colorValue }}
                    aria-label={`Color ${colorValue}`}
                  >
                    {color === colorValue && (
                      <Check className="h-5 w-5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Streak Goal */}
            <div>
              <label className="block text-small font-medium text-gray-700 dark:text-gray-300 mb-2">
                Streak Goal
              </label>
              <div className="grid grid-cols-4 gap-2">
                {STREAK_GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => setStreakGoal(goal.value)}
                    className={`
                      py-3 rounded-xl text-center transition-all duration-200
                      ${streakGoal === goal.value
                        ? 'bg-brand-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <div className="text-lg font-bold">{goal.value}</div>
                    <div className="text-caption opacity-80">days</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Freeze Mode */}
            <div>
              <label className="block text-small font-medium text-gray-700 dark:text-gray-300 mb-2">
                Freeze Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFreezeMode(true)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${freezeMode
                      ? 'border-freeze-500 bg-freeze-50 dark:bg-freeze-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Snowflake className={`h-5 w-5 ${freezeMode ? 'text-freeze-500' : 'text-gray-400'}`} />
                    <span className={`font-medium ${freezeMode ? 'text-freeze-600 dark:text-freeze-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      Normal
                    </span>
                  </div>
                  <p className="text-caption text-gray-500 dark:text-gray-400">
                    Earn freezes to protect streaks
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFreezeMode(false)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${!freezeMode
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-lg ${!freezeMode ? '' : 'grayscale'}`}>🔥</span>
                    <span className={`font-medium ${!freezeMode ? 'text-brand-600 dark:text-brand-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      Hard Mode
                    </span>
                  </div>
                  <p className="text-caption text-gray-500 dark:text-gray-400">
                    No freezes, pure commitment
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={handleSave}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
