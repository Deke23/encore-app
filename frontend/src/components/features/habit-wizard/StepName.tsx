/**
 * Step 1: Habit Name Input
 *
 * - Text input for habit name (max 50 characters)
 * - Character counter
 * - Icon and color selection
 * - Optional: Initial streak setting (advanced)
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { HabitFormData, HABIT_ICONS, HABIT_COLORS } from './types'

interface StepNameProps {
  data: HabitFormData
  onChange: (updates: Partial<HabitFormData>) => void
  error?: string
}

const MAX_NAME_LENGTH = 50

export function StepName({ data, onChange, error }: StepNameProps) {
  const [showAdvanced, setShowAdvanced] = useState(data.initialStreak > 0)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_NAME_LENGTH)
    onChange({ name: value })
  }

  const charCount = data.name.length
  const isNearLimit = charCount >= MAX_NAME_LENGTH - 10

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
          Name your habit
        </h2>
        <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
          What habit do you want to build?
        </p>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="e.g., Morning Exercise"
          value={data.name}
          onChange={handleNameChange}
          error={error}
          autoFocus
          className="text-center text-lg"
        />
        <div className="flex justify-end">
          <span
            className={`text-caption ${
              isNearLimit
                ? 'text-warning-DEFAULT'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {charCount}/{MAX_NAME_LENGTH}
          </span>
        </div>
      </div>

      {/* Icon Selection */}
      <div className="space-y-3">
        <label className="text-small font-medium text-gray-700 dark:text-gray-300">
          Choose an icon
        </label>
        <div className="grid grid-cols-8 gap-2">
          {HABIT_ICONS.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => onChange({ icon })}
              className={`h-10 w-10 rounded-lg text-xl flex items-center justify-center transition-all
                ${
                  data.icon === icon
                    ? 'bg-brand-100 dark:bg-brand-900/30 ring-2 ring-brand-500 scale-110'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <label className="text-small font-medium text-gray-700 dark:text-gray-300">
          Choose a color
        </label>
        <div className="flex flex-wrap gap-2">
          {HABIT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ color })}
              className={`h-8 w-8 rounded-full transition-all ${
                data.color === color
                  ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900 scale-110'
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Advanced Settings Toggle */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-small text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          {showAdvanced ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          Advanced settings
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3"
          >
            <label className="text-small font-medium text-gray-700 dark:text-gray-300">
              Starting streak (if continuing from another app)
            </label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  onChange({
                    initialStreak: Math.max(0, data.initialStreak - 1),
                  })
                }
                disabled={data.initialStreak === 0}
              >
                -
              </Button>
              <span className="text-h3 font-bold text-gray-900 dark:text-white w-16 text-center">
                {data.initialStreak}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  onChange({ initialStreak: data.initialStreak + 1 })
                }
              >
                +
              </Button>
              <span className="text-small text-gray-500 dark:text-gray-400">
                days
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
