/**
 * Onboarding Page - First-time user experience
 *
 * 3-slide carousel introducing:
 * 1. Streak concept with fire mascot
 * 2. Freeze feature with ice mascot
 * 3. Call-to-action to create first habit
 *
 * To add Lottie animations:
 * 1. Download from LottieFiles.com (search: "fire", "snowflake", "rocket")
 * 2. Save to src/assets/animations/
 * 3. Import and add to slides config below
 */
import { useState, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Flame, Snowflake, Rocket, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button, AnimatedMascot } from '@/components/ui'
import { useAppStore } from '@/store'
import { useNavigate } from 'react-router-dom'

// Optional: Import Lottie animations when available
// import fireAnimation from '@/assets/animations/fire.json'
// import iceAnimation from '@/assets/animations/ice.json'
// import rocketAnimation from '@/assets/animations/rocket.json'

// Slide content configuration
// Add animationData property to use Lottie animations
const slides = [
  {
    id: 'streak',
    icon: Flame,
    iconColor: 'text-brand-500',
    bgGradient: 'from-brand-500/20 via-brand-400/10 to-transparent',
    ringColor: 'ring-brand-500/30',
    title: 'Build Streaks',
    subtitle: 'Consistency is key',
    description:
      'Complete your habits daily to build powerful streaks. Watch your progress grow as you maintain your momentum day after day.',
    // animationData: fireAnimation, // Uncomment when animation is available
  },
  {
    id: 'freeze',
    icon: Snowflake,
    iconColor: 'text-freeze-500',
    bgGradient: 'from-freeze-500/20 via-freeze-400/10 to-transparent',
    ringColor: 'ring-freeze-500/30',
    title: 'Freeze Protection',
    subtitle: 'Life happens',
    description:
      "Earn freezes to protect your streaks when you miss a day. One freeze per 7 days keeps your progress safe when life gets busy.",
    // animationData: iceAnimation, // Uncomment when animation is available
  },
  {
    id: 'start',
    icon: Rocket,
    iconColor: 'text-success-500',
    bgGradient: 'from-success-500/20 via-success-400/10 to-transparent',
    ringColor: 'ring-success-500/30',
    title: 'Start Your Journey',
    subtitle: 'Ready to begin?',
    description:
      'Create your first habit and begin building the life you want. Small daily actions lead to remarkable results.',
    // animationData: rocketAnimation, // Uncomment when animation is available
  },
] as const

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

// Swipe configuration
const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export function OnboardingPage() {
  const [[currentSlide, direction], setSlide] = useState([0, 0])
  const navigate = useNavigate()
  const setOnboarded = useAppStore((state) => state.setOnboarded)

  const paginate = useCallback((newDirection: number) => {
    const nextSlide = currentSlide + newDirection
    if (nextSlide >= 0 && nextSlide < slides.length) {
      setSlide([nextSlide, newDirection])
    }
  }, [currentSlide])

  const goToSlide = useCallback((index: number) => {
    const newDirection = index > currentSlide ? 1 : -1
    setSlide([index, newDirection])
  }, [currentSlide])

  const handleComplete = useCallback(() => {
    setOnboarded(true)
    navigate('/', { replace: true })
  }, [setOnboarded, navigate])

  const handleSkip = useCallback(() => {
    // Jump to last slide
    setSlide([slides.length - 1, 1])
  }, [])

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipe = swipePower(info.offset.x, info.velocity.x)

      if (swipe < -swipeConfidenceThreshold && currentSlide < slides.length - 1) {
        paginate(1)
      } else if (swipe > swipeConfidenceThreshold && currentSlide > 0) {
        paginate(-1)
      }
    },
    [currentSlide, paginate]
  )

  const currentSlideData = slides[currentSlide]
  const isLastSlide = currentSlide === slides.length - 1
  const isFirstSlide = currentSlide === 0

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950 flex flex-col overflow-hidden">
      {/* Skip button - shown after first slide */}
      <div className="absolute top-4 right-4 z-10">
        {!isLastSlide && !isFirstSlide && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-gray-500 dark:text-gray-400"
          >
            Skip
          </Button>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        {/* Slide content with swipe gesture */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="flex flex-col items-center text-center w-full max-w-md cursor-grab active:cursor-grabbing"
          >
            {/* Animated mascot */}
            <div className="mb-8">
              <AnimatedMascot
                icon={currentSlideData.icon}
                iconColor={currentSlideData.iconColor}
                bgGradient={currentSlideData.bgGradient}
                ringColor={currentSlideData.ringColor}
                size="md"
                // animationData={currentSlideData.animationData} // Uncomment when Lottie animations are available
              />
            </div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <p className="text-small font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {currentSlideData.subtitle}
                </p>
                <h1 className="text-display font-bold text-gray-900 dark:text-white">
                  {currentSlideData.title}
                </h1>
              </div>

              <p className="text-body text-gray-600 dark:text-gray-300 max-w-sm leading-relaxed">
                {currentSlideData.description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="px-6 pb-8 space-y-6">
        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-brand-500'
                  : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-4">
          {/* Back button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(-1)}
            disabled={isFirstSlide}
            className={`shrink-0 ${isFirstSlide ? 'opacity-0 pointer-events-none' : ''}`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Main CTA button */}
          {isLastSlide ? (
            <Button
              size="lg"
              className="flex-1"
              onClick={handleComplete}
            >
              <Flame className="h-5 w-5 mr-2" />
              Start My First Streak
            </Button>
          ) : (
            <Button
              size="lg"
              className="flex-1"
              onClick={() => paginate(1)}
            >
              Continue
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          )}

          {/* Forward button (hidden on last slide) */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            disabled={isLastSlide}
            className={`shrink-0 ${isLastSlide ? 'opacity-0 pointer-events-none' : ''}`}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Skip text for first slide */}
        {isFirstSlide && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-caption text-gray-500 dark:text-gray-400"
          >
            Swipe or tap to navigate
          </motion.p>
        )}
      </div>
    </div>
  )
}
