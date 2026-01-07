/**
 * Habit Detail Page
 *
 * Full-screen view of a single habit with:
 * - Header with habit name and streak
 * - Calendar heatmap for completion visualization
 * - Statistics section
 * - Edit and delete functionality
 */
import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Edit2, Trash2, Flame, Snowflake } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import { PageContainer } from '@/components/layout'
import {
  CalendarHeatmap,
  HabitStats,
  EditHabitModal,
  DeleteHabitModal,
} from '@/components/features'
import { useAppStore } from '@/store'

export function HabitDetailPage() {
  const { habitId } = useParams<{ habitId: string }>()
  const navigate = useNavigate()

  const habit = useAppStore((state) =>
    state.habits.find((h) => h.id === habitId)
  )
  const completions = useAppStore(
    (state) => state.completions[habitId || ''] || []
  )
  const toggleHabitCompletion = useAppStore(
    (state) => state.toggleHabitCompletion
  )

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Check if today is completed
  const todayStr = useMemo(() => {
    return new Date().toISOString().split('T')[0]
  }, [])

  const isCompletedToday = useMemo(() => {
    return completions.some((c) => c.date === todayStr)
  }, [completions, todayStr])

  // Handle case when habit is not found
  if (!habit) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-h2 font-bold text-gray-900 dark:text-white mb-2">
            Habit Not Found
          </h1>
          <p className="text-body text-gray-600 dark:text-gray-400 mb-6">
            This habit may have been deleted or doesn't exist.
          </p>
          <Button onClick={() => navigate('/')}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        </div>
      </PageContainer>
    )
  }

  const handleDayClick = (date: string) => {
    // Don't allow future date completions
    if (date > todayStr) return

    toggleHabitCompletion(habit.id, date)
  }

  const handleDeleted = () => {
    navigate('/')
  }

  return (
    <PageContainer>
      <div className="space-y-6 pb-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="-ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </motion.div>

        {/* Habit Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="overflow-hidden">
            {/* Color Bar */}
            <div
              className="h-2"
              style={{ backgroundColor: habit.color }}
            />

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                {/* Habit Info */}
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${habit.color}20` }}
                    animate={isCompletedToday ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {habit.icon}
                  </motion.div>
                  <div>
                    <h1 className="text-h2 font-bold text-gray-900 dark:text-white">
                      {habit.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Flame className={`h-5 w-5 ${habit.currentStreak > 0 ? 'text-brand-500' : 'text-gray-400'}`} />
                        <span className="text-body font-semibold text-gray-900 dark:text-white">
                          {habit.currentStreak}
                        </span>
                        <span className="text-small text-gray-500">
                          day streak
                        </span>
                      </div>
                      {habit.freezeMode && habit.freezesAvailable > 0 && (
                        <Badge variant="freeze" className="gap-1">
                          <Snowflake className="h-3 w-3" />
                          {habit.freezesAvailable}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowEditModal(true)}
                    aria-label="Edit habit"
                  >
                    <Edit2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDeleteModal(true)}
                    className="text-error hover:text-error hover:bg-error/10"
                    aria-label="Delete habit"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Complete Today Button */}
              <motion.div className="mt-6">
                <Button
                  size="lg"
                  onClick={() => handleDayClick(todayStr)}
                  className={`w-full ${
                    isCompletedToday
                      ? 'bg-success-600 dark:bg-success-500 hover:bg-success-700 dark:hover:bg-success-600'
                      : ''
                  }`}
                  style={
                    !isCompletedToday
                      ? { backgroundColor: habit.color }
                      : undefined
                  }
                >
                  {isCompletedToday ? (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-2"
                      >
                        ✓
                      </motion.span>
                      Completed Today
                    </>
                  ) : (
                    'Mark Complete for Today'
                  )}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Calendar Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <CalendarHeatmap
              completions={completions}
              habitColor={habit.color}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              onDayClick={handleDayClick}
            />
          </Card>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-h3 font-semibold text-gray-900 dark:text-white mb-4">
            Statistics
          </h2>
          <HabitStats habit={habit} completions={completions} />
        </motion.div>
      </div>

      {/* Modals */}
      <EditHabitModal
        habit={habit}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />

      <DeleteHabitModal
        habit={habit}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDeleted={handleDeleted}
      />
    </PageContainer>
  )
}
