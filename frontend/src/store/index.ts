/**
 * Zustand Store - Global State Management
 *
 * Store structure:
 * - user: User authentication and profile
 * - habits: Habits list and management
 * - ui: UI preferences and state
 */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { format } from 'date-fns'
import {
  calculateStreak,
  calculateEarnedFreezes,
  calculateBestStreak,
  type CompletionRecord,
} from '@/lib/streak'
import { generateId } from '@/lib/utils'

// ========================================
// TYPES
// ========================================

export interface User {
  id: string
  email: string
  displayName: string | null
  isPremium: boolean
  theme: 'light' | 'dark' | 'system'
  timezone: string
}

export interface Habit {
  id: string
  name: string
  icon: string
  color: string
  freezeMode: boolean
  freezesAvailable: number
  streakGoal: number
  currentStreak: number
  bestStreak: number
  totalCompletions: number
  isArchived: boolean
  lastCompletedAt: string | null
  createdAt: string // ISO timestamp
}

export interface Completion {
  id: string
  habitId: string
  date: string
  completedAt: string
  usedFreeze: boolean
  isManual: boolean
  note: string | null
}

// ========================================
// STORE INTERFACE
// ========================================

interface AppState {
  // User State
  user: User | null
  isOnboarded: boolean
  setUser: (user: User | null) => void
  setOnboarded: (onboarded: boolean) => void

  // Habits State
  habits: Habit[]
  selectedHabitId: string | null
  setHabits: (habits: Habit[]) => void
  addHabit: (habit: Habit) => void
  updateHabit: (id: string, updates: Partial<Habit>) => void
  removeHabit: (id: string) => void
  setSelectedHabit: (id: string | null) => void

  // Completions State (cached)
  completions: Record<string, Completion[]> // habitId -> completions[]
  setCompletions: (habitId: string, completions: Completion[]) => void
  addCompletion: (habitId: string, completion: Completion) => void
  removeCompletion: (habitId: string, completionId: string) => void

  // Habit Completion Actions
  toggleHabitCompletion: (habitId: string, date: string) => void
  recalculateHabitStreak: (habitId: string) => void
  useFreeze: (habitId: string, date: string) => boolean // Returns true if freeze was used successfully

  // UI State
  theme: 'light' | 'dark' | 'system'
  selectedDate: string // ISO date string (YYYY-MM-DD)
  sidebarOpen: boolean
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setSelectedDate: (date: string) => void
  setSidebarOpen: (open: boolean) => void

  // Notification Settings
  notificationsEnabled: boolean
  reminderTime: string // HH:mm format
  streakAtRiskEnabled: boolean
  weeklyDigestEnabled: boolean
  setNotificationsEnabled: (enabled: boolean) => void
  setReminderTime: (time: string) => void
  setStreakAtRiskEnabled: (enabled: boolean) => void
  setWeeklyDigestEnabled: (enabled: boolean) => void

  // Actions
  reset: () => void
  clearAllData: () => void
}

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  user: null,
  isOnboarded: false,
  habits: [],
  selectedHabitId: null,
  completions: {},
  theme: 'system' as const,
  selectedDate: new Date().toISOString().split('T')[0], // Today
  sidebarOpen: false,
  notificationsEnabled: false,
  reminderTime: '09:00',
  streakAtRiskEnabled: true,
  weeklyDigestEnabled: false,
}

// ========================================
// STORE
// ========================================

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      // User Actions
      setUser: (user) => set({ user }),
      setOnboarded: (onboarded) => set({ isOnboarded: onboarded }),

      // Habits Actions
      setHabits: (habits) => set({ habits }),

      addHabit: (habit) =>
        set((state) => ({ habits: [...state.habits, habit] })),

      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, ...updates } : h
          ),
        })),

      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
          selectedHabitId:
            state.selectedHabitId === id ? null : state.selectedHabitId,
        })),

      setSelectedHabit: (id) => set({ selectedHabitId: id }),

      // Completions Actions
      setCompletions: (habitId, completions) =>
        set((state) => ({
          completions: { ...state.completions, [habitId]: completions },
        })),

      addCompletion: (habitId, completion) =>
        set((state) => ({
          completions: {
            ...state.completions,
            [habitId]: [...(state.completions[habitId] || []), completion],
          },
        })),

      removeCompletion: (habitId, completionId) =>
        set((state) => ({
          completions: {
            ...state.completions,
            [habitId]: (state.completions[habitId] || []).filter(
              (c) => c.id !== completionId
            ),
          },
        })),

      // Habit Completion Actions
      toggleHabitCompletion: (habitId, date) =>
        set((state) => {
          const habit = state.habits.find((h) => h.id === habitId)
          if (!habit) return state

          const habitCompletions = state.completions[habitId] || []
          const existingCompletion = habitCompletions.find((c) => c.date === date)

          let newCompletions: Completion[]
          let newTotalCompletions: number

          if (existingCompletion) {
            // Remove completion (uncomplete)
            newCompletions = habitCompletions.filter((c) => c.date !== date)
            newTotalCompletions = Math.max(0, habit.totalCompletions - 1)
          } else {
            // Add completion
            const newCompletion: Completion = {
              id: generateId(),
              habitId,
              date,
              completedAt: new Date().toISOString(),
              usedFreeze: false,
              isManual: false,
              note: null,
            }
            newCompletions = [...habitCompletions, newCompletion]
            newTotalCompletions = habit.totalCompletions + 1
          }

          // Convert to CompletionRecord for streak calculation
          const completionRecords: CompletionRecord[] = newCompletions.map((c) => ({
            date: c.date,
            usedFreeze: c.usedFreeze,
          }))

          // Calculate new streak
          const today = format(new Date(), 'yyyy-MM-dd')
          const streakResult = calculateStreak(
            completionRecords,
            today,
            habit.freezeMode,
            habit.freezesAvailable,
            0, // Initial streak already counted in completions
            habit.createdAt
          )

          // Calculate best streak from all completions
          const newBestStreak = calculateBestStreak(
            completionRecords,
            habit.freezeMode,
            2 // max freezes
          )

          // Calculate earned freezes based on streak progression
          const previousStreak = habit.currentStreak
          const newFreezes = calculateEarnedFreezes(
            streakResult.currentStreak,
            previousStreak,
            streakResult.freezesRemaining
          )

          // Find last completed date
          const sortedCompletions = [...newCompletions].sort((a, b) =>
            b.date.localeCompare(a.date)
          )
          const lastCompletedAt = sortedCompletions[0]?.completedAt || null

          return {
            completions: {
              ...state.completions,
              [habitId]: newCompletions,
            },
            habits: state.habits.map((h) =>
              h.id === habitId
                ? {
                    ...h,
                    currentStreak: streakResult.currentStreak,
                    bestStreak: Math.max(h.bestStreak, newBestStreak),
                    totalCompletions: newTotalCompletions,
                    freezesAvailable: newFreezes,
                    lastCompletedAt,
                  }
                : h
            ),
          }
        }),

      recalculateHabitStreak: (habitId) =>
        set((state) => {
          const habit = state.habits.find((h) => h.id === habitId)
          if (!habit) return state

          const habitCompletions = state.completions[habitId] || []
          const completionRecords: CompletionRecord[] = habitCompletions.map((c) => ({
            date: c.date,
            usedFreeze: c.usedFreeze,
          }))

          const today = format(new Date(), 'yyyy-MM-dd')
          const streakResult = calculateStreak(
            completionRecords,
            today,
            habit.freezeMode,
            habit.freezesAvailable,
            0,
            habit.createdAt
          )

          const newBestStreak = calculateBestStreak(
            completionRecords,
            habit.freezeMode,
            2
          )

          return {
            habits: state.habits.map((h) =>
              h.id === habitId
                ? {
                    ...h,
                    currentStreak: streakResult.currentStreak,
                    bestStreak: Math.max(h.bestStreak, newBestStreak),
                    freezesAvailable: streakResult.freezesRemaining,
                  }
                : h
            ),
          }
        }),

      // Use a freeze to protect streak for a missed day
      useFreeze: (habitId, date) => {
        const state = useAppStore.getState()
        const habit = state.habits.find((h) => h.id === habitId)

        // Validate
        if (!habit) return false
        if (!habit.freezeMode) return false
        if (habit.freezesAvailable <= 0) return false

        // Check if already completed or frozen for this date
        const habitCompletions = state.completions[habitId] || []
        const existingCompletion = habitCompletions.find((c) => c.date === date)
        if (existingCompletion) return false

        // Add freeze completion record
        const freezeCompletion: Completion = {
          id: generateId(),
          habitId,
          date,
          completedAt: new Date().toISOString(),
          usedFreeze: true,
          isManual: false,
          note: 'Streak protected with freeze',
        }

        const newCompletions = [...habitCompletions, freezeCompletion]

        // Convert to CompletionRecord for streak calculation
        const completionRecords: CompletionRecord[] = newCompletions.map((c) => ({
          date: c.date,
          usedFreeze: c.usedFreeze,
        }))

        // Calculate new streak
        const today = format(new Date(), 'yyyy-MM-dd')
        const streakResult = calculateStreak(
          completionRecords,
          today,
          habit.freezeMode,
          habit.freezesAvailable - 1, // Subtract the freeze being used
          0,
          habit.createdAt
        )

        // Calculate best streak
        const newBestStreak = calculateBestStreak(
          completionRecords,
          habit.freezeMode,
          2
        )

        // Update store
        set({
          completions: {
            ...state.completions,
            [habitId]: newCompletions,
          },
          habits: state.habits.map((h) =>
            h.id === habitId
              ? {
                  ...h,
                  currentStreak: streakResult.currentStreak,
                  bestStreak: Math.max(h.bestStreak, newBestStreak),
                  freezesAvailable: habit.freezesAvailable - 1,
                }
              : h
          ),
        })

        return true
      },

      // UI Actions
      setTheme: (theme) => set({ theme }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Notification Actions
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setReminderTime: (time) => set({ reminderTime: time }),
      setStreakAtRiskEnabled: (enabled) => set({ streakAtRiskEnabled: enabled }),
      setWeeklyDigestEnabled: (enabled) => set({ weeklyDigestEnabled: enabled }),

      // Reset
      reset: () => set(initialState),

      // Clear all data (habits and completions only, keep settings)
      clearAllData: () =>
        set((state) => ({
          habits: [],
          completions: {},
          selectedHabitId: null,
          // Keep other settings
          isOnboarded: state.isOnboarded,
          theme: state.theme,
          notificationsEnabled: state.notificationsEnabled,
          reminderTime: state.reminderTime,
          streakAtRiskEnabled: state.streakAtRiskEnabled,
          weeklyDigestEnabled: state.weeklyDigestEnabled,
        })),
    }),
    {
      name: 'encore-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Persist these fields
        isOnboarded: state.isOnboarded,
        theme: state.theme,
        selectedDate: state.selectedDate,
        habits: state.habits,
        completions: state.completions,
        notificationsEnabled: state.notificationsEnabled,
        reminderTime: state.reminderTime,
        streakAtRiskEnabled: state.streakAtRiskEnabled,
        weeklyDigestEnabled: state.weeklyDigestEnabled,
      }),
    }
  )
)

// ========================================
// SELECTORS
// ========================================

// Get active (non-archived) habits
export const useActiveHabits = () =>
  useAppStore((state) => state.habits.filter((h) => !h.isArchived))

// Get selected habit
export const useSelectedHabit = () =>
  useAppStore((state) => {
    const { habits, selectedHabitId } = state
    return habits.find((h) => h.id === selectedHabitId) || null
  })

// Check if premium
export const useIsPremium = () =>
  useAppStore((state) => state.user?.isPremium ?? false)

// Get completions for a habit
export const useHabitCompletions = (habitId: string) =>
  useAppStore((state) => state.completions[habitId] || [])

// Check if habit is completed for a specific date
export const useIsHabitCompletedForDate = (habitId: string, date: string) =>
  useAppStore((state) => {
    const completions = state.completions[habitId] || []
    return completions.some((c) => c.date === date)
  })

// Get all habits with their completion status for selected date
export const useHabitsWithCompletionStatus = () =>
  useAppStore((state) => {
    const { habits, completions, selectedDate } = state
    return habits
      .filter((h) => !h.isArchived)
      .map((habit) => ({
        ...habit,
        isCompletedForDate: (completions[habit.id] || []).some(
          (c) => c.date === selectedDate
        ),
      }))
  })
