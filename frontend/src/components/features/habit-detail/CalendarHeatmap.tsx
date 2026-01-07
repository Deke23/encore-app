/**
 * Calendar Heatmap Component
 *
 * Displays a monthly calendar view with completion status visualization.
 * Each day shows completion state with color intensity.
 */
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isFuture,
  addMonths,
  subMonths,
} from 'date-fns'
import { Button } from '@/components/ui'
import type { Completion } from '@/store'

interface CalendarHeatmapProps {
  completions: Completion[]
  habitColor: string
  currentMonth: Date
  onMonthChange: (date: Date) => void
  onDayClick?: (date: string) => void
}

export function CalendarHeatmap({
  completions,
  habitColor,
  currentMonth,
  onMonthChange,
  onDayClick,
}: CalendarHeatmapProps) {
  // Create a map of completions for quick lookup
  const completionMap = useMemo(() => {
    const map = new Map<string, boolean>()
    completions.forEach((c) => {
      map.set(c.date, true)
    })
    return map
  }, [completions])

  // Generate calendar days for the month
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

    const days: Date[] = []
    let day = calendarStart

    while (day <= calendarEnd) {
      days.push(day)
      day = addDays(day, 1)
    }

    return days
  }, [currentMonth])

  // Day of week headers
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const goToPreviousMonth = () => {
    onMonthChange(subMonths(currentMonth, 1))
  }

  const goToNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1))
  }

  const goToCurrentMonth = () => {
    onMonthChange(new Date())
  }

  const isCurrentMonth = isSameMonth(currentMonth, new Date())

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-body font-semibold text-gray-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          {!isCurrentMonth && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goToCurrentMonth}
              className="text-brand-500 hover:text-brand-600 text-small"
            >
              Today
            </Button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            className="h-8 w-8"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
            className="h-8 w-8"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const dateString = format(day, 'yyyy-MM-dd')
            const isCompleted = completionMap.has(dateString)
            const isCurrentDay = isToday(day)
            const isFutureDay = isFuture(day)
            const isInMonth = isSameMonth(day, currentMonth)

            return (
              <motion.button
                key={dateString}
                type="button"
                onClick={() => onDayClick?.(dateString)}
                disabled={isFutureDay}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`
                  relative aspect-square rounded-lg flex items-center justify-center
                  text-small font-medium transition-all
                  ${!isInMonth ? 'opacity-30' : ''}
                  ${isFutureDay ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-300 dark:hover:ring-gray-600'}
                  ${isCurrentDay ? 'ring-2 ring-brand-500 ring-offset-1 dark:ring-offset-gray-800' : ''}
                  ${isCompleted
                    ? 'text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
                style={{
                  backgroundColor: isCompleted ? habitColor : undefined,
                }}
                aria-label={`${format(day, 'MMMM d, yyyy')}${isCompleted ? ' - completed' : ''}`}
              >
                {format(day, 'd')}

                {/* Today indicator */}
                {isCurrentDay && !isCompleted && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500" />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-small text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600" />
          <span>Not done</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: habitColor }}
          />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-white dark:bg-gray-700 ring-2 ring-brand-500" />
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
