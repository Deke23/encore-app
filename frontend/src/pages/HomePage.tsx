/**
 * Home Page - Main habit tracking screen
 */
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Flame, Check, Snowflake, AlertTriangle, Shield } from 'lucide-react'
import { format, subDays } from 'date-fns'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui'
import { PageContainer } from '@/components/layout'
import { HabitWizard, WeekStrip } from '@/components/features'
import { useActiveHabits, useAppStore, type Habit } from '@/store'

// Habit Card Component
function HabitCard({
  habit,
  onShowFreezeModal,
  onFreezeEarned,
}: {
  habit: Habit
  onShowFreezeModal: (habit: Habit) => void
  onFreezeEarned: (habitName: string, streak: number) => void
}) {
  const navigate = useNavigate()
  const selectedDate = useAppStore((state) => state.selectedDate)
  const toggleHabitCompletion = useAppStore((state) => state.toggleHabitCompletion)
  const completions = useAppStore((state) => state.completions[habit.id] || [])

  // Check if habit is completed for the selected date
  const isCompletedForDate = useMemo(() => {
    return completions.some((c) => c.date === selectedDate)
  }, [completions, selectedDate])

  // Check if habit is completed for a specific date
  const isCompletedFor = useCallback((date: string) => {
    return completions.some((c) => c.date === date)
  }, [completions])

  // Determine if streak is at risk
  // At risk = has streak, not completed today, yesterday was missed, has freezes available
  const atRiskStatus = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd')

    // Only check at-risk for today's view
    if (selectedDate !== today) return { isAtRisk: false, canUseFreeze: false }

    // Not at risk if already completed today
    if (isCompletedFor(today)) return { isAtRisk: false, canUseFreeze: false }

    // Not at risk if no current streak
    if (habit.currentStreak === 0) return { isAtRisk: false, canUseFreeze: false }

    // Check if yesterday was missed
    const yesterdayCompleted = isCompletedFor(yesterday)

    // At risk if yesterday was NOT completed and we have a streak
    const isAtRisk = !yesterdayCompleted && habit.currentStreak > 0

    // Can use freeze if at risk, freeze mode is on, and freezes available
    const canUseFreeze = isAtRisk && habit.freezeMode && habit.freezesAvailable > 0

    return { isAtRisk, canUseFreeze }
  }, [selectedDate, isCompletedFor, habit.currentStreak, habit.freezeMode, habit.freezesAvailable])

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card navigation

    // Store current freeze count before completing
    const freezesBefore = habit.freezesAvailable

    toggleHabitCompletion(habit.id, selectedDate)

    // Check if freeze was earned after a small delay
    // (to allow store to update)
    setTimeout(() => {
      const updatedHabit = useAppStore.getState().habits.find(h => h.id === habit.id)
      if (updatedHabit && updatedHabit.freezesAvailable > freezesBefore && habit.freezeMode) {
        onFreezeEarned(habit.name, updatedHabit.currentStreak)
      }
    }, 50)
  }

  const handleFreeze = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShowFreezeModal(habit)
  }

  const handleCardClick = () => {
    navigate(`/habit/${habit.id}`)
  }

  const streakColor = habit.currentStreak > 0
    ? atRiskStatus.isAtRisk
      ? 'text-warning-500'
      : 'text-brand-500'
    : 'text-gray-400'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card
        className={`hover:shadow-md transition-all duration-300 cursor-pointer ${
          isCompletedForDate
            ? 'ring-2 ring-success-500 bg-success-50/50 dark:bg-success-900/10'
            : atRiskStatus.isAtRisk
              ? 'ring-2 ring-warning-500 bg-warning-50/50 dark:bg-warning-900/10'
              : ''
        }`}
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl relative"
                style={{ backgroundColor: `${habit.color}20` }}
                animate={isCompletedForDate ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {habit.icon}
                {atRiskStatus.isAtRisk && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-warning-500 rounded-full flex items-center justify-center"
                  >
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </motion.div>
              <div>
                <CardTitle className="text-base">{habit.name}</CardTitle>
                <CardDescription>
                  {atRiskStatus.isAtRisk ? (
                    <span className="text-warning-600 dark:text-warning-400">Streak at risk!</span>
                  ) : (
                    `${habit.streakGoal} day goal`
                  )}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {atRiskStatus.canUseFreeze && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFreeze}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-freeze-500 text-white text-xs font-medium hover:bg-freeze-600 transition-colors"
                >
                  <Shield className="h-3.5 w-3.5" />
                  Use Freeze
                </motion.button>
              )}
              {habit.freezeMode && habit.freezesAvailable > 0 && !atRiskStatus.canUseFreeze && (
                <Badge variant="freeze" className="gap-1">
                  <Snowflake className="h-3 w-3" />
                  {habit.freezesAvailable}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={isCompletedForDate ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Flame className={`h-5 w-5 ${streakColor} transition-colors duration-300`} />
              </motion.div>
              <motion.span
                key={habit.currentStreak}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-h2 font-bold ${streakColor} transition-colors duration-300`}
              >
                {habit.currentStreak}
              </motion.span>
              <span className="text-small text-gray-600 dark:text-gray-400">
                day{habit.currentStreak !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Animated Complete Button */}
            <motion.button
              onClick={handleComplete}
              whileTap={{ scale: 0.95 }}
              className={`
                relative overflow-hidden h-10 px-4 rounded-xl font-medium text-sm
                transition-all duration-300 ease-out
                flex items-center justify-center gap-1.5
                ${isCompletedForDate
                  ? 'bg-success-600 dark:bg-success-500 text-success-950 dark:text-white shadow-lg shadow-success-500/25'
                  : 'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-500 hover:text-brand-500'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {isCompletedForDate ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                    Done
                  </motion.span>
                ) : (
                  <motion.span
                    key="complete"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    Complete
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Success ripple effect */}
              {isCompletedForDate && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white rounded-xl"
                />
              )}
            </motion.button>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (habit.currentStreak / habit.streakGoal) * 100)}%`,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: habit.color }}
              />
            </div>
            <p className="text-caption text-gray-500 dark:text-gray-400 mt-1">
              {habit.currentStreak} / {habit.streakGoal} days
              {habit.currentStreak >= habit.streakGoal && ' - Goal reached!'}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Freeze Confirmation Modal
function FreezeModal({
  habit,
  isOpen,
  onClose,
  onConfirm,
}: {
  habit: Habit | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  if (!isOpen || !habit) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Freeze Icon */}
        <div className="pt-6 pb-4 flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 rounded-full bg-freeze-100 dark:bg-freeze-900/30 flex items-center justify-center"
          >
            <Shield className="h-8 w-8 text-freeze-500" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="px-6 pb-4 text-center">
          <h2 className="text-h3 font-semibold text-gray-900 dark:text-white mb-2">
            Protect Your Streak?
          </h2>
          <p className="text-small text-gray-600 dark:text-gray-400">
            Use 1 freeze to protect your <span className="font-semibold text-brand-500">{habit.currentStreak}-day streak</span> for "{habit.name}".
          </p>
          <p className="text-caption text-gray-500 dark:text-gray-500 mt-2">
            You have {habit.freezesAvailable} freeze{habit.freezesAvailable !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Stats */}
        <div className="mx-6 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-brand-500" />
                <span className="text-h3 font-bold text-gray-900 dark:text-white">
                  {habit.currentStreak}
                </span>
              </div>
              <p className="text-caption text-gray-500">Current</p>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Snowflake className="h-4 w-4 text-freeze-500" />
                <span className="text-h3 font-bold text-gray-900 dark:text-white">
                  {habit.freezesAvailable}
                </span>
              </div>
              <p className="text-caption text-gray-500">Freezes</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-3">
          <Button
            size="lg"
            onClick={onConfirm}
            className="w-full bg-freeze-500 hover:bg-freeze-600"
          >
            <Shield className="h-4 w-4 mr-2" />
            Use Freeze
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

// Freeze Success Toast (when using a freeze)
function FreezeSuccessToast({
  habit,
  isVisible,
  onHide,
}: {
  habit: Habit | null
  isVisible: boolean
  onHide: () => void
}) {
  // Auto-hide after 4 seconds
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(onHide, 4000)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, onHide])

  if (!isVisible || !habit) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-24 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-80"
    >
      <div className="bg-freeze-600 dark:bg-freeze-700 text-white rounded-xl shadow-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Shield className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Streak Protected!</p>
          <p className="text-small text-freeze-100">
            Your {habit.currentStreak}-day streak is safe
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Freeze Earned Toast (when earning a new freeze)
function FreezeEarnedToast({
  habitName,
  streak,
  isVisible,
  onHide,
}: {
  habitName: string
  streak: number
  isVisible: boolean
  onHide: () => void
}) {
  // Auto-hide after 5 seconds
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(onHide, 5000)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, onHide])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed top-20 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-96"
    >
      <div className="bg-gradient-to-r from-freeze-500 to-freeze-600 text-white rounded-xl shadow-2xl p-4 overflow-hidden">
        {/* Confetti effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 100 + '%', opacity: 1 }}
              animate={{
                y: 100,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
                repeat: 1,
              }}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
            />
          ))}
        </motion.div>

        <div className="relative flex items-center gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center"
          >
            <Snowflake className="h-7 w-7" />
          </motion.div>
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-bold text-lg"
            >
              Freeze Earned!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-small text-freeze-100"
            >
              {streak}-day streak on "{habitName}"
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HomePage() {
  const habits = useActiveHabits()
  const [showWizard, setShowWizard] = useState(false)
  const [freezeModalHabit, setFreezeModalHabit] = useState<Habit | null>(null)
  const [showFreezeSuccess, setShowFreezeSuccess] = useState(false)
  const [freezeSuccessHabit, setFreezeSuccessHabit] = useState<Habit | null>(null)
  const [showFreezeEarned, setShowFreezeEarned] = useState(false)
  const [freezeEarnedInfo, setFreezeEarnedInfo] = useState<{ habitName: string; streak: number } | null>(null)
  const useFreeze = useAppStore((state) => state.useFreeze)

  const handleShowFreezeModal = useCallback((habit: Habit) => {
    setFreezeModalHabit(habit)
  }, [])

  const handleCloseFreezeModal = useCallback(() => {
    setFreezeModalHabit(null)
  }, [])

  const handleConfirmFreeze = useCallback(() => {
    if (!freezeModalHabit) return

    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd')
    const success = useFreeze(freezeModalHabit.id, yesterday)

    if (success) {
      setFreezeSuccessHabit(freezeModalHabit)
      setShowFreezeSuccess(true)
    }

    setFreezeModalHabit(null)
  }, [freezeModalHabit, useFreeze])

  const handleHideFreezeSuccess = useCallback(() => {
    setShowFreezeSuccess(false)
    setFreezeSuccessHabit(null)
  }, [])

  const handleFreezeEarned = useCallback((habitName: string, streak: number) => {
    setFreezeEarnedInfo({ habitName, streak })
    setShowFreezeEarned(true)
  }, [])

  const handleHideFreezeEarned = useCallback(() => {
    setShowFreezeEarned(false)
    setFreezeEarnedInfo(null)
  }, [])

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
          {habits.length > 0 && (
            <Button size="sm" onClick={() => setShowWizard(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>

        {/* Week Strip Calendar */}
        {habits.length > 0 && (
          <Card className="p-4">
            <WeekStrip />
          </Card>
        )}

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
                <Button size="lg" className="mt-4" onClick={() => setShowWizard(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Habit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Habit List */}
        {habits.length > 0 && (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onShowFreezeModal={handleShowFreezeModal}
                  onFreezeEarned={handleFreezeEarned}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* FAB for mobile */}
        {habits.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowWizard(true)}
            className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 flex items-center justify-center z-40"
            aria-label="Add new habit"
          >
            <Plus className="h-6 w-6" />
          </motion.button>
        )}
      </div>

      {/* Habit Creation Wizard */}
      <AnimatePresence>
        {showWizard && (
          <HabitWizard
            onClose={() => setShowWizard(false)}
            onComplete={() => {
              // Could add celebration animation here
            }}
          />
        )}
      </AnimatePresence>

      {/* Freeze Confirmation Modal */}
      <AnimatePresence>
        <FreezeModal
          habit={freezeModalHabit}
          isOpen={!!freezeModalHabit}
          onClose={handleCloseFreezeModal}
          onConfirm={handleConfirmFreeze}
        />
      </AnimatePresence>

      {/* Freeze Success Toast */}
      <AnimatePresence>
        <FreezeSuccessToast
          habit={freezeSuccessHabit}
          isVisible={showFreezeSuccess}
          onHide={handleHideFreezeSuccess}
        />
      </AnimatePresence>

      {/* Freeze Earned Toast */}
      <AnimatePresence>
        <FreezeEarnedToast
          habitName={freezeEarnedInfo?.habitName || ''}
          streak={freezeEarnedInfo?.streak || 0}
          isVisible={showFreezeEarned}
          onHide={handleHideFreezeEarned}
        />
      </AnimatePresence>
    </PageContainer>
  )
}
