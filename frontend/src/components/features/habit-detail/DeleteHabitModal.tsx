/**
 * Delete Habit Modal
 *
 * Confirmation modal for deleting or archiving a habit.
 * Shows habit stats before deletion and offers undo.
 */
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Archive, AlertTriangle, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { useAppStore, type Habit } from '@/store'

interface DeleteHabitModalProps {
  habit: Habit
  isOpen: boolean
  onClose: () => void
  onDeleted: () => void
}

export function DeleteHabitModal({
  habit,
  isOpen,
  onClose,
  onDeleted,
}: DeleteHabitModalProps) {
  const removeHabit = useAppStore((state) => state.removeHabit)
  const updateHabit = useAppStore((state) => state.updateHabit)
  const addHabit = useAppStore((state) => state.addHabit)

  const [isDeleting, setIsDeleting] = useState(false)
  const [showUndo, setShowUndo] = useState(false)
  const [deletedHabit, setDeletedHabit] = useState<Habit | null>(null)
  const [undoTimeout, setUndoTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (undoTimeout) {
        clearTimeout(undoTimeout)
      }
    }
  }, [undoTimeout])

  const handleDelete = useCallback(() => {
    setIsDeleting(true)

    // Store habit for potential undo
    setDeletedHabit({ ...habit })

    // Remove from store
    removeHabit(habit.id)

    // Show undo option
    setShowUndo(true)
    onClose()

    // Set timeout to clear undo option after 10 seconds
    const timeout = setTimeout(() => {
      setShowUndo(false)
      setDeletedHabit(null)
      onDeleted()
    }, 10000)

    setUndoTimeout(timeout)
    setIsDeleting(false)
  }, [habit, removeHabit, onClose, onDeleted])

  const handleArchive = useCallback(() => {
    updateHabit(habit.id, { isArchived: true })
    onClose()
    onDeleted()
  }, [habit.id, updateHabit, onClose, onDeleted])

  const handleUndo = useCallback(() => {
    if (deletedHabit && undoTimeout) {
      clearTimeout(undoTimeout)
      addHabit(deletedHabit)
      setShowUndo(false)
      setDeletedHabit(null)
    }
  }, [deletedHabit, undoTimeout, addHabit])

  if (!isOpen && !showUndo) return null

  // Show undo toast
  if (showUndo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-80"
      >
        <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl shadow-2xl p-4 flex items-center gap-3">
          <div className="flex-1">
            <p className="font-medium">Habit deleted</p>
            <p className="text-small text-gray-400">
              Tap undo within 10 seconds to restore
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUndo}
            className="text-brand-400 hover:text-brand-300 hover:bg-gray-700"
          >
            <Undo2 className="h-4 w-4 mr-1" />
            Undo
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
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
          {/* Warning Icon */}
          <div className="pt-6 pb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-error" />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-4 text-center">
            <h2 className="text-h3 font-semibold text-gray-900 dark:text-white mb-2">
              Delete "{habit.name}"?
            </h2>
            <p className="text-small text-gray-600 dark:text-gray-400">
              This will permanently delete this habit and all its data including
              your {habit.totalCompletions} completion{habit.totalCompletions !== 1 ? 's' : ''} and {habit.currentStreak}-day streak.
            </p>
          </div>

          {/* Stats Preview */}
          <div className="mx-6 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${habit.color}20` }}
              >
                {habit.icon}
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-h3 font-bold text-gray-900 dark:text-white">
                    {habit.currentStreak}
                  </p>
                  <p className="text-caption text-gray-500">Streak</p>
                </div>
                <div>
                  <p className="text-h3 font-bold text-gray-900 dark:text-white">
                    {habit.bestStreak}
                  </p>
                  <p className="text-caption text-gray-500">Best</p>
                </div>
                <div>
                  <p className="text-h3 font-bold text-gray-900 dark:text-white">
                    {habit.totalCompletions}
                  </p>
                  <p className="text-caption text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 space-y-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleArchive}
              className="w-full"
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive Instead
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete Permanently'}
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
    </AnimatePresence>
  )
}
