/**
 * Habit Creation Wizard
 *
 * A 4-step wizard for creating new habits:
 * 1. Name & appearance
 * 2. Freeze mode selection
 * 3. Streak goal
 * 4. Confirmation
 *
 * Features:
 * - Progress indicator
 * - Step navigation (back/next)
 * - Form validation
 * - Animated transitions
 */
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Flame, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { useAppStore } from '@/store'
import { generateId } from '@/lib/utils'
import { StepName } from './StepName'
import { StepFreezeMode } from './StepFreezeMode'
import { StepGoal } from './StepGoal'
import { StepConfirm } from './StepConfirm'
import { HabitFormData, DEFAULT_HABIT_DATA, WIZARD_STEPS } from './types'

interface HabitWizardProps {
  onClose: () => void
  onComplete?: (habit: HabitFormData) => void
}

export function HabitWizard({ onClose, onComplete }: HabitWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<HabitFormData>(DEFAULT_HABIT_DATA)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addHabit = useAppStore((state) => state.addHabit)

  const totalSteps = WIZARD_STEPS.length
  const progress = ((currentStep + 1) / totalSteps) * 100
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  // Update form data
  const handleChange = useCallback((updates: Partial<HabitFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
    // Clear errors for updated fields
    const updatedKeys = Object.keys(updates)
    setErrors((prev) => {
      const newErrors = { ...prev }
      updatedKeys.forEach((key) => delete newErrors[key])
      return newErrors
    })
  }, [])

  // Validate current step
  const validateStep = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 0) {
      // Validate name
      if (!formData.name.trim()) {
        newErrors.name = 'Please enter a habit name'
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [currentStep, formData])

  // Navigate to next step
  const handleNext = useCallback(() => {
    if (!validateStep()) return

    if (isLastStep) {
      handleSubmit()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }, [isLastStep, validateStep])

  // Navigate to previous step
  const handleBack = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [isFirstStep])

  // Jump to specific step (for editing from confirmation)
  const handleEdit = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  // Submit the form
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)

    try {
      // Create the habit object
      const newHabit = {
        id: generateId(),
        name: formData.name.trim(),
        icon: formData.icon,
        color: formData.color,
        freezeMode: formData.freezeMode,
        freezesAvailable: 0,
        streakGoal: formData.streakGoal,
        currentStreak: formData.initialStreak,
        bestStreak: formData.initialStreak,
        totalCompletions: 0,
        isArchived: false,
        lastCompletedAt: null,
        createdAt: new Date().toISOString(),
      }

      // Add to store
      addHabit(newHabit)

      // Call completion callback
      onComplete?.(formData)

      // Close wizard
      onClose()
    } catch (error) {
      console.error('Failed to create habit:', error)
      setErrors({ submit: 'Failed to create habit. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, addHabit, onComplete, onClose])

  // Render current step content
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepName
            data={formData}
            onChange={handleChange}
            error={errors.name}
          />
        )
      case 1:
        return <StepFreezeMode data={formData} onChange={handleChange} />
      case 2:
        return <StepGoal data={formData} onChange={handleChange} />
      case 3:
        return <StepConfirm data={formData} onEdit={handleEdit} />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl sm:mb-0 mb-0"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          {/* Progress Bar */}
          <div className="h-1 bg-gray-100 dark:bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-brand-500"
            />
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-small text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {totalSteps}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close wizard"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-160px)] sm:max-h-[calc(90vh-140px)]">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

          {/* Submit Error */}
          {errors.submit && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-small text-error"
            >
              {errors.submit}
            </motion.p>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-6 py-4 pb-safe bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={isFirstStep || isSubmitting}
              className={isFirstStep ? 'opacity-0 pointer-events-none' : ''}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>

            {/* Next/Submit Button */}
            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : isLastStep ? (
                <>
                  <Flame className="h-5 w-5 mr-2" />
                  Create Habit
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="h-5 w-5 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
