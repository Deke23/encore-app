/**
 * Week Strip Calendar
 *
 * Horizontal scrollable week view for date selection.
 *
 * Features:
 * - 7-day view centered on selected week
 * - Today highlighted with distinct styling
 * - Selected day shows filled background
 * - Swipe/scroll to navigate weeks
 * - Future days are viewable but show indicator
 */
import { useRef, useCallback, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isToday,
  isFuture,
  addWeeks,
  subWeeks,
} from 'date-fns'
import { useAppStore } from '@/store'
import { Button } from '@/components/ui'

interface DayButtonProps {
  date: Date
  isSelected: boolean
  isCurrentDay: boolean
  isFutureDay: boolean
  onClick: () => void
  hasCompletions?: boolean
}

function DayButton({
  date,
  isSelected,
  isCurrentDay,
  isFutureDay,
  onClick,
  hasCompletions,
}: DayButtonProps) {
  const dayName = format(date, 'EEEEE') // Single letter: M, T, W, etc.
  const dayNumber = format(date, 'd')

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`
        relative flex flex-col items-center justify-center
        min-w-[48px] h-[68px] rounded-xl transition-all
        ${
          isSelected
            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
            : isCurrentDay
              ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
        ${isFutureDay && !isSelected ? 'opacity-50' : ''}
      `}
      aria-label={format(date, 'EEEE, MMMM d')}
      aria-pressed={isSelected}
    >
      {/* Day name */}
      <span
        className={`text-[10px] font-medium uppercase tracking-wider ${
          isSelected
            ? 'text-white/80'
            : isCurrentDay
              ? 'text-brand-500 dark:text-brand-400'
              : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {dayName}
      </span>

      {/* Day number */}
      <span
        className={`text-lg font-bold ${
          isSelected ? 'text-white' : ''
        }`}
      >
        {dayNumber}
      </span>

      {/* Today indicator dot */}
      {isCurrentDay && !isSelected && (
        <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-brand-500" />
      )}

      {/* Completion indicator */}
      {hasCompletions && !isSelected && (
        <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-success-500" />
      )}
    </motion.button>
  )
}

interface WeekStripProps {
  /**
   * Callback when a date is selected
   */
  onDateSelect?: (date: string) => void
  /**
   * Map of dates (YYYY-MM-DD) to completion status
   */
  completionMap?: Record<string, boolean>
  /**
   * Whether to show navigation arrows
   */
  showNavigation?: boolean
}

export function WeekStrip({
  onDateSelect,
  completionMap = {},
  showNavigation = true,
}: WeekStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const selectedDate = useAppStore((state) => state.selectedDate)
  const setSelectedDate = useAppStore((state) => state.setSelectedDate)

  // Parse the selected date string to Date object
  const selectedDateObj = useMemo(() => {
    return new Date(selectedDate + 'T00:00:00')
  }, [selectedDate])

  // Get the start of the current week (Sunday by default)
  const weekStart = useMemo(() => {
    return startOfWeek(selectedDateObj, { weekStartsOn: 0 })
  }, [selectedDateObj])

  // Generate the 7 days of the week
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  }, [weekStart])

  // Handle date selection
  const handleDateSelect = useCallback(
    (date: Date) => {
      const dateString = format(date, 'yyyy-MM-dd')
      setSelectedDate(dateString)
      onDateSelect?.(dateString)
    },
    [setSelectedDate, onDateSelect]
  )

  // Navigate to previous week
  const goToPreviousWeek = useCallback(() => {
    const newDate = subWeeks(selectedDateObj, 1)
    handleDateSelect(newDate)
  }, [selectedDateObj, handleDateSelect])

  // Navigate to next week
  const goToNextWeek = useCallback(() => {
    const newDate = addWeeks(selectedDateObj, 1)
    handleDateSelect(newDate)
  }, [selectedDateObj, handleDateSelect])

  // Go to today
  const goToToday = useCallback(() => {
    handleDateSelect(new Date())
  }, [handleDateSelect])

  // Check if we're viewing the current week
  const isCurrentWeek = useMemo(() => {
    const today = new Date()
    const todayWeekStart = startOfWeek(today, { weekStartsOn: 0 })
    return isSameDay(weekStart, todayWeekStart)
  }, [weekStart])

  // Scroll selected day into view
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const selectedButton = container.querySelector('[aria-pressed="true"]')
    if (selectedButton) {
      selectedButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [selectedDate])

  return (
    <div className="space-y-3">
      {/* Month/Year Header with Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-body font-semibold text-gray-900 dark:text-white">
            {format(selectedDateObj, 'MMMM yyyy')}
          </h2>
          {!isCurrentWeek && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goToToday}
              className="text-brand-500 hover:text-brand-600 text-small"
            >
              Today
            </Button>
          )}
        </div>

        {showNavigation && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousWeek}
              className="h-8 w-8"
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextWeek}
              className="h-8 w-8"
              aria-label="Next week"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Week Days Strip */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {weekDays.map((day) => {
          const dateString = format(day, 'yyyy-MM-dd')
          const isSelected = isSameDay(day, selectedDateObj)
          const isCurrentDay = isToday(day)
          const isFutureDay = isFuture(day)
          const hasCompletions = completionMap[dateString] || false

          return (
            <div
              key={dateString}
              style={{ scrollSnapAlign: 'center' }}
            >
              <DayButton
                date={day}
                isSelected={isSelected}
                isCurrentDay={isCurrentDay}
                isFutureDay={isFutureDay}
                hasCompletions={hasCompletions}
                onClick={() => handleDateSelect(day)}
              />
            </div>
          )
        })}
      </div>

      {/* Selected Date Display */}
      <div className="text-center">
        <p className="text-small text-gray-600 dark:text-gray-400">
          {isToday(selectedDateObj) ? (
            <span className="font-medium text-brand-500">Today</span>
          ) : (
            format(selectedDateObj, 'EEEE, MMMM d')
          )}
          {isFuture(selectedDateObj) && (
            <span className="ml-2 text-gray-400 dark:text-gray-500">
              (upcoming)
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
