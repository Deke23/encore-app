/**
 * Step 2: Freeze Mode Selection
 *
 * Two options:
 * - Active (Normal): Freezes enabled, protects streaks
 * - Inactive (Hard Mode): No freezes, miss = reset
 */
import { motion } from 'framer-motion'
import { Flame, Snowflake, Shield, Zap } from 'lucide-react'
import { HabitFormData } from './types'

interface StepFreezeModeProps {
  data: HabitFormData
  onChange: (updates: Partial<HabitFormData>) => void
}

const freezeOptions = [
  {
    value: true,
    title: 'Normal Mode',
    subtitle: 'With freeze protection',
    description:
      'Earn freezes to protect your streak when life gets busy. One freeze per 7 consecutive days, up to 2 stored.',
    icon: Shield,
    mascot: Snowflake,
    mascotColor: 'text-freeze-500',
    bgColor: 'bg-freeze-50 dark:bg-freeze-900/20',
    borderColor: 'border-freeze-200 dark:border-freeze-800',
    ringColor: 'ring-freeze-500',
  },
  {
    value: false,
    title: 'Hard Mode',
    subtitle: 'No safety net',
    description:
      'For the dedicated. Miss a single day and your streak resets to zero. Maximum accountability.',
    icon: Zap,
    mascot: Flame,
    mascotColor: 'text-brand-500',
    bgColor: 'bg-brand-50 dark:bg-brand-900/20',
    borderColor: 'border-brand-200 dark:border-brand-800',
    ringColor: 'ring-brand-500',
  },
]

export function StepFreezeMode({ data, onChange }: StepFreezeModeProps) {
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
          Choose your mode
        </h2>
        <p className="text-small text-gray-600 dark:text-gray-400 mt-1">
          How strict do you want to be?
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div className="space-y-4">
        {freezeOptions.map((option) => {
          const isSelected = data.freezeMode === option.value
          const Icon = option.icon
          const Mascot = option.mascot

          return (
            <motion.button
              key={option.value.toString()}
              type="button"
              onClick={() => onChange({ freezeMode: option.value })}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? `${option.bgColor} ${option.borderColor} ring-2 ${option.ringColor}`
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Mascot Icon */}
                <div
                  className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected
                      ? option.bgColor
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <Mascot
                    className={`h-6 w-6 ${
                      isSelected
                        ? option.mascotColor
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-body font-semibold text-gray-900 dark:text-white">
                      {option.title}
                    </h3>
                    <Icon
                      className={`h-4 w-4 ${
                        isSelected
                          ? option.mascotColor
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    />
                  </div>
                  <p className="text-small text-gray-500 dark:text-gray-400 mt-0.5">
                    {option.subtitle}
                  </p>
                  <p className="text-caption text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                <div className="shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? `${option.borderColor} bg-current`
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-2 h-2 rounded-full ${
                          option.value ? 'bg-freeze-500' : 'bg-brand-500'
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4">
        <p className="text-caption text-gray-600 dark:text-gray-400 text-center">
          {data.freezeMode ? (
            <>
              You'll earn <strong className="text-freeze-500">1 freeze</strong>{' '}
              for every 7-day streak. Freezes auto-apply when you miss a day.
            </>
          ) : (
            <>
              <strong className="text-brand-500">No freezes</strong> will be
              earned. Stay consistent or start over!
            </>
          )}
        </p>
      </div>
    </motion.div>
  )
}
