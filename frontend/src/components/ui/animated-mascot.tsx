/**
 * Animated Mascot Component
 *
 * Displays a Lottie animation if available, otherwise falls back to a static icon.
 * Used for onboarding slides and empty states.
 *
 * To add Lottie animations:
 * 1. Download animations from LottieFiles.com
 * 2. Save them to src/assets/animations/
 * 3. Import and use in the animationData prop
 *
 * Recommended LottieFiles searches:
 * - "fire flame" for streak mascot
 * - "snowflake ice" for freeze mascot
 * - "rocket launch" for start mascot
 */
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useRef, useEffect } from 'react'

interface AnimatedMascotProps {
  /**
   * Lottie animation data (imported JSON)
   * If not provided, falls back to icon
   */
  animationData?: object
  /**
   * Fallback icon when no animation is provided
   */
  icon: LucideIcon
  /**
   * Icon color class (e.g., "text-brand-500")
   */
  iconColor?: string
  /**
   * Background gradient class
   */
  bgGradient?: string
  /**
   * Ring color class
   */
  ringColor?: string
  /**
   * Size of the mascot container
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether to loop the animation
   */
  loop?: boolean
  /**
   * Whether to autoplay the animation
   */
  autoplay?: boolean
}

const sizeClasses = {
  sm: {
    container: 'w-20 h-20',
    icon: 'w-10 h-10',
    lottie: 80,
  },
  md: {
    container: 'w-32 h-32',
    icon: 'w-16 h-16',
    lottie: 128,
  },
  lg: {
    container: 'w-40 h-40',
    icon: 'w-20 h-20',
    lottie: 160,
  },
}

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function AnimatedMascot({
  animationData,
  icon: Icon,
  iconColor = 'text-brand-500',
  bgGradient = 'from-brand-500/20 via-brand-400/10 to-transparent',
  ringColor = 'ring-brand-500/30',
  size = 'md',
  loop = true,
  autoplay = true,
}: AnimatedMascotProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const sizeConfig = sizeClasses[size]

  // Control animation on mount
  useEffect(() => {
    if (lottieRef.current && autoplay) {
      lottieRef.current.play()
    }
  }, [autoplay])

  return (
    <motion.div
      className="relative"
      variants={iconVariants}
      initial="initial"
      animate={['animate', 'pulse']}
    >
      {/* Background gradient blur */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-radial ${bgGradient} blur-2xl scale-150`}
      />

      {/* Main container */}
      <div
        className={`relative ${sizeConfig.container} rounded-full bg-white dark:bg-gray-900
                   ring-4 ${ringColor} shadow-xl
                   flex items-center justify-center overflow-hidden`}
      >
        {animationData ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            style={{
              width: sizeConfig.lottie,
              height: sizeConfig.lottie,
            }}
          />
        ) : (
          <Icon
            className={`${sizeConfig.icon} ${iconColor}`}
            strokeWidth={1.5}
          />
        )}
      </div>
    </motion.div>
  )
}
