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

  // UI State
  theme: 'light' | 'dark' | 'system'
  selectedDate: string // ISO date string (YYYY-MM-DD)
  sidebarOpen: boolean
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setSelectedDate: (date: string) => void
  setSidebarOpen: (open: boolean) => void

  // Actions
  reset: () => void
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

      // UI Actions
      setTheme: (theme) => set({ theme }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'encore-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        isOnboarded: state.isOnboarded,
        theme: state.theme,
        selectedDate: state.selectedDate,
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
