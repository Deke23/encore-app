/**
 * Habit Wizard Types
 * Defines the data structure for the habit creation wizard
 */

export interface HabitFormData {
  name: string
  icon: string
  color: string
  freezeMode: boolean
  streakGoal: number
  initialStreak: number
}

export const DEFAULT_HABIT_DATA: HabitFormData = {
  name: '',
  icon: '🎯',
  color: '#f97316',
  freezeMode: true,
  streakGoal: 7,
  initialStreak: 0,
}

export const STREAK_GOALS = [
  { value: 7, label: '7 days', description: 'Perfect for building new habits' },
  { value: 14, label: '14 days', description: 'Two weeks of consistency' },
  { value: 30, label: '30 days', description: 'A full month challenge' },
  { value: 50, label: '50 days', description: 'For serious commitment' },
] as const

export const HABIT_ICONS = [
  '🎯', '💪', '📚', '🏃', '🧘', '💧', '🍎', '😴',
  '✍️', '🎨', '🎵', '🧠', '💼', '🏋️', '🚴', '🧹',
] as const

export const HABIT_COLORS = [
  '#f97316', // orange (brand)
  '#ef4444', // red
  '#f59e0b', // amber
  '#84cc16', // lime
  '#22c55e', // green
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
] as const

export type WizardStep = 'name' | 'freeze' | 'goal' | 'confirm'

export const WIZARD_STEPS: WizardStep[] = ['name', 'freeze', 'goal', 'confirm']
