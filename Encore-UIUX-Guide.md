# Encore Habit Tracker
## UI/UX Research & Design Guide
### For the Design Team | Version 1.0

---

# TABLE OF CONTENTS

1. [Design Philosophy](#1-design-philosophy)
2. [Component Libraries & Tools](#2-component-libraries--tools)
3. [Animation Resources](#3-animation-resources)
4. [Icon & Illustration Resources](#4-icon--illustration-resources)
5. [Design Inspiration](#5-design-inspiration)
6. [Color & Typography](#6-color--typography)
7. [Motion Design Guidelines](#7-motion-design-guidelines)
8. [Accessibility Requirements](#8-accessibility-requirements)
9. [Platform-Specific Guidelines](#9-platform-specific-guidelines)
10. [Prototyping Workflow](#10-prototyping-workflow)

---

# 1. DESIGN PHILOSOPHY

## 1.1 Core Principles

### Simplicity First
> "One tap to complete. Zero friction to build habits."

- Every screen should have ONE primary action
- Remove all unnecessary elements
- Use progressive disclosure for advanced features
- Habit completion = single tap (no confirmations)

### Emotional Connection
> "The fire mascot isn't decoration—it's your accountability partner."

- Mascot reacts to user behavior (celebrates, encourages)
- Visual rewards for achievements
- Color communicates emotional state (orange = active, gray = inactive)

### Instant Gratification
> "Every completion should feel like a small victory."

- Immediate visual feedback on actions
- Satisfying animations for completions
- Streak counter updates instantly
- No loading spinners for core actions

### Honest Design
> "No dark patterns. No guilt trips. Just helpful nudges."

- Streak breaks happen—freeze system prevents discouragement
- No shame for missed days
- Positive framing for all messaging
- Transparent about premium vs free

## 1.2 Design Mantras

```
✓ "Would I use this at 6 AM half-asleep?"
✓ "Can I complete a habit in under 2 seconds?"
✓ "Does this screen have a single clear purpose?"
✓ "Is this delightful or just decorative?"
```

---

# 2. COMPONENT LIBRARIES & TOOLS

## 2.1 Primary: shadcn/ui

### Why shadcn/ui?
- Accessible by default (built on Radix UI)
- Unstyled foundation = full design control
- Copy-paste components = easy customization
- Perfect for Tailwind CSS projects
- Active community and updates

### Website
🔗 **https://ui.shadcn.com**

### Installation
```bash
# Initialize shadcn/ui in project
npx shadcn-ui@latest init

# Select: TypeScript, Tailwind CSS, CSS variables

# Add components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add toggle
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add input
```

### Components to Use

| Component | Encore Usage |
|-----------|-------------|
| `Button` | CTAs, FAB, toggles |
| `Card` | Habit cards, stat cards |
| `Dialog` | Confirmation modals |
| `Sheet` | Bottom sheets (mobile) |
| `Progress` | Streak progress, wizard steps |
| `Toggle` | Habit completion checkbox |
| `Tabs` | Settings sections |
| `Calendar` | Date picker, heatmap base |
| `Toast` | Undo notifications |
| `Input` | Habit name input |

### Customization Guide
```tsx
// Example: Customizing Button for Encore
// In components/ui/button.tsx

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-semibold transition-all active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-600",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
  }
)
```

### Figma Integration
🔗 **https://www.figma.com/community/file/1203061493325953101** (shadcn/ui Figma)

---

## 2.2 Alternative Libraries

### Radix UI (Primitives)
🔗 **https://www.radix-ui.com**

When to use: Building completely custom components with accessibility baked in.

```bash
npm install @radix-ui/react-dialog
npm install @radix-ui/react-progress
npm install @radix-ui/react-toggle
```

### Headless UI
🔗 **https://headlessui.com**

When to use: If team prefers Tailwind Labs' approach.

### Tremor (Dashboard Components)
🔗 **https://www.tremor.so**

When to use: Statistics/analytics dashboard screens.

Components to explore:
- AreaChart (completion trends)
- BarChart (day-of-week analysis)
- DonutChart (completion rate)
- Metric cards

---

## 2.3 Form Handling

### React Hook Form
🔗 **https://react-hook-form.com**

```bash
npm install react-hook-form
npm install @hookform/resolvers
npm install zod
```

Usage for habit creation wizard:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const habitSchema = z.object({
  name: z.string().min(1).max(50),
  freezeMode: z.boolean(),
  goal: z.enum(['7', '14', '30', '50']),
});
```

---

# 3. ANIMATION RESOURCES

## 3.1 Lottie Animations

### Primary Source: LottieFiles
🔗 **https://lottiefiles.com**

### Recommended Searches

| Animation Need | Search Terms |
|----------------|--------------|
| Fire mascot | "fire character", "flame mascot", "fire face" |
| Ice/Freeze mascot | "ice crystal", "frozen", "snowflake character" |
| Success celebration | "confetti", "celebration", "success check" |
| Streak counter | "number counter", "score animation" |
| Achievement unlock | "trophy", "badge unlock", "reward" |
| Loading | "fire loading", "flame loader" |
| Empty state | "empty box", "no data", "add first" |
| Checkmark | "check animation", "done", "complete tick" |

### Curated Lottie Files

**Fire Mascot Options**:
1. https://lottiefiles.com/animations/cute-fire
2. https://lottiefiles.com/animations/fire-flame
3. https://lottiefiles.com/animations/burning-fire

**Success/Completion**:
1. https://lottiefiles.com/animations/success-check
2. https://lottiefiles.com/animations/confetti-celebration
3. https://lottiefiles.com/animations/checkmark-success

**Premium Lottie Marketplaces**:
- 🔗 **https://iconscout.com/lottie-animations** (High quality)
- 🔗 **https://lordicon.com** (Animated icons)
- 🔗 **https://useanimations.com** (Micro-interactions)

### Implementation

```bash
npm install lottie-react
```

```tsx
import Lottie from 'lottie-react';
import fireAnimation from '@/assets/animations/fire.json';

export function FireMascot({ size = 120 }) {
  return (
    <Lottie
      animationData={fireAnimation}
      loop={true}
      style={{ width: size, height: size }}
    />
  );
}
```

### Performance Guidelines
- Keep Lottie files < 50KB
- Use `lottie-web/light` for smaller bundles
- Lazy load animations not in viewport
- Provide static fallback for slow connections

---

## 3.2 Framer Motion

🔗 **https://www.framer.com/motion/**

### Installation
```bash
npm install framer-motion
```

### Animation Presets for Encore

```tsx
// animations/presets.ts

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 }
};

export const tapScale = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1 }
};

export const checkmarkDraw = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const streakPop = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.2, 1] },
  transition: { duration: 0.3 }
};

export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear"
  }
};
```

### Page Transitions

```tsx
// For React Router
import { AnimatePresence, motion } from 'framer-motion';

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2 }
};

function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes>...</Routes>
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 3.3 CSS Animations (Lightweight)

For simple animations, use CSS to reduce bundle size:

```css
/* Habit card press feedback */
.habit-card {
  transition: transform 0.1s ease-out;
}
.habit-card:active {
  transform: scale(0.98);
}

/* Checkbox fill */
@keyframes checkFill {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.checkbox-checked {
  animation: checkFill 0.2s ease-out;
}

/* Streak counter pop */
@keyframes pop {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
.streak-updated {
  animation: pop 0.3s ease-out;
}

/* Skeleton loading shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

# 4. ICON & ILLUSTRATION RESOURCES

## 4.1 Icon Libraries

### Primary: Lucide Icons
🔗 **https://lucide.dev**

Why Lucide:
- Clean, consistent stroke width
- React component library
- MIT licensed
- 1000+ icons

```bash
npm install lucide-react
```

```tsx
import { Flame, Check, Settings, BarChart3, Plus } from 'lucide-react';

<Flame className="w-6 h-6 text-orange-500" />
```

### Icons Needed for Encore

| Icon | Lucide Name | Usage |
|------|-------------|-------|
| Fire | `Flame` | Streak indicator |
| Check | `Check` | Completion |
| Plus | `Plus` | Add habit |
| Settings | `Settings` | Settings tab |
| Chart | `BarChart3` | Stats tab |
| Home | `Home` | Home tab |
| Calendar | `Calendar` | Week strip |
| Trophy | `Trophy` | Achievements |
| Lock | `Lock` | Premium features |
| Snowflake | `Snowflake` | Freeze feature |
| ChevronLeft | `ChevronLeft` | Back navigation |
| X | `X` | Close/dismiss |
| Edit | `Pencil` | Edit mode |
| Trash | `Trash2` | Delete |
| Bell | `Bell` | Notifications |
| Moon | `Moon` | Dark mode |
| Sun | `Sun` | Light mode |

### Alternative Icon Libraries

**Phosphor Icons**
🔗 **https://phosphoricons.com**
- Multiple weights (thin, light, regular, bold, fill, duotone)
- Great for UI consistency

**Heroicons**
🔗 **https://heroicons.com**
- By Tailwind Labs
- Outline and solid variants

**Tabler Icons**
🔗 **https://tabler-icons.io**
- 3000+ icons
- Consistent 24x24 grid

---

## 4.2 Custom Illustrations

### Empty States & Onboarding

**unDraw**
🔗 **https://undraw.co/illustrations**

Search terms:
- "Goals" - For habit creation
- "Completed" - For achievements
- "Empty" - For no habits state
- "Starting" - For onboarding

**Blush Design**
🔗 **https://blush.design**

Collections to explore:
- "Humaaans" - Customizable people
- "Open Peeps" - Hand-drawn characters
- "Blob Scene" - Abstract illustrations

**Storyset**
🔗 **https://storyset.com**

- Animated illustration sets
- Customizable colors
- Free for attribution

### Creating Custom Mascots

If sourcing doesn't work, create custom fire/ice mascots:

**Tools**:
- Figma (vector design)
- Adobe Illustrator
- Vectornator (iPad)

**Export for Animation**:
- Export as SVG
- Use LottieFiles creator or After Effects + Bodymovin
- Or animate directly with Framer Motion

---

# 5. DESIGN INSPIRATION

## 5.1 Apps to Study

### Habit & Productivity

| App | Platform | Study For |
|-----|----------|-----------|
| **Streaks** | iOS | Minimal streak UI, gesture-based |
| **Encore** | iOS/Android | Direct inspiration, mascot approach |
| **Habitica** | All | Gamification mechanics |
| **Todoist** | All | Task list UX, premium model |
| **Things 3** | iOS/Mac | Clean UI, satisfying interactions |

### Gamification & Engagement

| App | Platform | Study For |
|-----|----------|-----------|
| **Duolingo** | All | Mascot personality, streaks, onboarding |
| **Forest** | All | Visual progress metaphor |
| **Headspace** | All | Calming animations, onboarding |
| **Fabulous** | All | Habit coaching, premium model |

### General Mobile UX

| App | Platform | Study For |
|-----|----------|-----------|
| **Apple Health** | iOS | Data visualization |
| **Spotify** | All | Bottom navigation, dark mode |
| **Linear** | Web | Clean design system |

---

## 5.2 Design Galleries

### Dribbble
🔗 **https://dribbble.com**

**Recommended Searches**:
```
- "habit tracker app"
- "streak mobile app"
- "gamification mobile UI"
- "fitness app dark mode"
- "onboarding mobile"
- "calendar mobile UI"
- "achievement badges UI"
- "settings screen mobile"
- "bottom navigation mobile"
```

**Curated Collections**:
- https://dribbble.com/tags/habit_tracker
- https://dribbble.com/tags/fitness_app
- https://dribbble.com/tags/mobile_app

### Mobbin
🔗 **https://mobbin.com**

Best for: Real-world app screenshots organized by pattern

**Patterns to Search**:
- Onboarding
- Empty states
- Settings
- Bottom navigation
- Cards
- Progress indicators

### Screenlane
🔗 **https://screenlane.com**

Best for: Video recordings of app flows

### Pttrns
🔗 **https://pttrns.com**

Best for: Mobile UI patterns by category

### Refero Design
🔗 **https://refero.design**

Best for: Web app design inspiration

---

## 5.3 Design Systems to Reference

| Design System | URL | Learn From |
|---------------|-----|------------|
| Apple HIG | https://developer.apple.com/design/human-interface-guidelines | iOS patterns |
| Material Design 3 | https://m3.material.io | Android patterns |
| Tailwind UI | https://tailwindui.com | Component patterns |
| Radix Themes | https://www.radix-ui.com/themes | Accessible components |
| Linear Design | https://linear.app/design | Clean product design |

---

# 6. COLOR & TYPOGRAPHY

## 6.1 Color Palette

### Brand Colors

```css
/* Primary - Orange (Fire/Energy) */
--orange-50: #fff7ed;
--orange-100: #ffedd5;
--orange-200: #fed7aa;
--orange-300: #fdba74;
--orange-400: #fb923c;
--orange-500: #f97316;  /* ← Primary brand color */
--orange-600: #ea580c;
--orange-700: #c2410c;
--orange-800: #9a3412;
--orange-900: #7c2d12;
```

### Semantic Colors

```css
/* Success - Completion */
--success-light: #d1fae5;
--success-default: #10b981;
--success-dark: #047857;

/* Warning - Streak at risk */
--warning-light: #fef3c7;
--warning-default: #f59e0b;
--warning-dark: #b45309;

/* Error - Destructive actions */
--error-light: #fee2e2;
--error-default: #ef4444;
--error-dark: #b91c1c;

/* Info - Freeze feature */
--info-light: #cffafe;
--info-default: #06b6d4;
--info-dark: #0e7490;
```

### Theme Colors

```css
/* Light Mode */
--background: #ffffff;
--surface: #f9fafb;
--surface-elevated: #ffffff;
--text-primary: #111827;
--text-secondary: #6b7280;
--text-tertiary: #9ca3af;
--border: #e5e7eb;
--border-light: #f3f4f6;

/* Dark Mode */
--background-dark: #0a0a0a;
--surface-dark: #171717;
--surface-elevated-dark: #262626;
--text-primary-dark: #fafafa;
--text-secondary-dark: #a3a3a3;
--text-tertiary-dark: #737373;
--border-dark: #262626;
--border-light-dark: #1f1f1f;
```

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        freeze: {
          light: '#cffafe',
          DEFAULT: '#06b6d4',
          dark: '#0e7490',
        }
      }
    }
  }
}
```

---

## 6.2 Typography

### Font Selection

**Primary Font: Inter**
🔗 **https://rsms.me/inter/**

Why Inter:
- Designed for screens
- Excellent legibility at small sizes
- Variable font (reduce file size)
- Open source (OFL)

**Display Font (Optional): Cal Sans**
🔗 **https://github.com/calcom/font**

Use for: Large headlines, logo wordmark

### Font Loading

```html
<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display | 32px | 700 | 1.2 | Streak numbers, hero text |
| H1 | 24px | 700 | 1.3 | Screen titles |
| H2 | 20px | 600 | 1.4 | Section headers |
| H3 | 18px | 600 | 1.4 | Card titles |
| Body | 16px | 400 | 1.5 | Default text |
| Body Bold | 16px | 600 | 1.5 | Emphasized body |
| Small | 14px | 400 | 1.5 | Secondary text |
| Caption | 12px | 500 | 1.4 | Labels, hints |
| Tiny | 10px | 500 | 1.3 | Badges, tags |

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
        'tiny': ['10px', { lineHeight: '1.3', fontWeight: '500' }],
      }
    }
  }
}
```

---

# 7. MOTION DESIGN GUIDELINES

## 7.1 Timing Standards

| Interaction Type | Duration | Easing |
|------------------|----------|--------|
| Micro (tap feedback) | 100ms | ease-out |
| Small (toggle, checkbox) | 150-200ms | ease-out |
| Medium (modal, sheet) | 200-300ms | ease-in-out |
| Large (page transition) | 300-400ms | ease-in-out |
| Celebration | 800-1200ms | ease-out |

## 7.2 Easing Functions

```css
/* Standard easings */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring (for bouncy interactions) */
--spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

## 7.3 Animation Principles

### 1. Purpose
Every animation should serve a purpose:
- Guide attention
- Provide feedback
- Create continuity
- Add delight

### 2. Performance
- Use `transform` and `opacity` only (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Test on low-end devices
- Provide `prefers-reduced-motion` alternatives

### 3. Subtlety
- Most animations should be barely noticeable
- Save dramatic animations for milestones
- When in doubt, make it faster

## 7.4 Specific Animation Specs

### Habit Completion
```
Trigger: Tap checkbox
Animation:
1. Checkbox fills with orange (150ms, ease-out)
2. Checkmark draws in (200ms, ease-out)
3. Fire icon scales up briefly (200ms, spring)
4. Streak number pops (200ms, spring)
```

### Bottom Sheet Open
```
Trigger: Open action
Animation:
1. Backdrop fades in (200ms, ease-out)
2. Sheet slides up from bottom (250ms, ease-out)
3. Sheet settles with slight overshoot (spring)
```

### Page Transition
```
Exit: Fade out + slide left (200ms)
Enter: Fade in + slide from right (200ms)
```

### Streak Milestone
```
Trigger: Reach goal (7, 14, 30, 50)
Animation:
1. Confetti burst (1000ms)
2. Badge scales in with bounce (400ms, spring)
3. Streak number pulses (300ms)
```

---

# 8. ACCESSIBILITY REQUIREMENTS

## 8.1 WCAG 2.1 AA Checklist

### Perceivable

- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Color contrast ≥ 3:1 for large text (18px+)
- [ ] Color contrast ≥ 3:1 for UI components
- [ ] Information not conveyed by color alone
- [ ] Text resizable to 200% without loss
- [ ] Alt text for all meaningful images
- [ ] Captions for any video content

### Operable

- [ ] All functionality accessible via keyboard
- [ ] Visible focus indicators
- [ ] No keyboard traps
- [ ] Touch targets ≥ 44x44px
- [ ] Adequate spacing between targets (8px min)
- [ ] No time limits (or adjustable)
- [ ] Motion can be disabled

### Understandable

- [ ] Language declared in HTML
- [ ] Consistent navigation
- [ ] Error messages are clear
- [ ] Labels on all form inputs
- [ ] Instructions before complex inputs

### Robust

- [ ] Valid HTML
- [ ] ARIA labels where needed
- [ ] Works with screen readers
- [ ] Works with voice control

## 8.2 Testing Tools

| Tool | Purpose | URL |
|------|---------|-----|
| axe DevTools | Automated testing | Chrome extension |
| WAVE | Web accessibility | https://wave.webaim.org |
| Lighthouse | Performance + a11y | Chrome DevTools |
| Contrast Checker | Color contrast | https://webaim.org/resources/contrastchecker |
| Stark | Figma plugin | https://www.getstark.co |

## 8.3 Screen Reader Labels

```tsx
// Examples of proper ARIA labeling

// Habit completion checkbox
<button
  role="checkbox"
  aria-checked={completed}
  aria-label={`Mark ${habitName} as ${completed ? 'incomplete' : 'complete'}`}
>

// Streak counter
<div aria-label={`Current streak: ${streak} days`}>
  {streak}
</div>

// Progress bar
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`Habit creation step ${step} of ${totalSteps}`}
>
```

## 8.4 Reduced Motion

```tsx
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Framer Motion variant
const animation = prefersReducedMotion
  ? { opacity: 1 }
  : { opacity: 1, y: 0 };

// CSS approach
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 9. PLATFORM-SPECIFIC GUIDELINES

## 9.1 PWA Considerations

### Safe Areas
```css
/* Account for notches/home indicators */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

### iOS Safari Quirks
- No hover states (use active)
- Momentum scrolling: `-webkit-overflow-scrolling: touch`
- Status bar: Use `theme-color` meta tag
- PWA splash: Provide apple-touch-startup-image

### Android Chrome
- Custom tab bar color via manifest
- Support for maskable icons
- Splash screen from manifest

## 9.2 Native Mobile (React Native)

### iOS Guidelines
🔗 **https://developer.apple.com/design/human-interface-guidelines**

Key patterns:
- Large navigation titles
- SF Symbols for icons
- Haptic feedback on actions
- Bottom sheet vs modal

### Android Guidelines
🔗 **https://m3.material.io**

Key patterns:
- FAB placement
- Bottom navigation styling
- Ripple effect on touch
- Material You theming

---

# 10. PROTOTYPING WORKFLOW

## 10.1 Recommended Tools

### Figma (Design & Basic Prototyping)
🔗 **https://figma.com**

Use for:
- All static designs
- Component library
- Basic click-through prototypes
- Design handoff

### Framer (Interactive Prototypes)
🔗 **https://framer.com**

Use for:
- Complex interactions
- Animation testing
- User testing prototypes

### ProtoPie (Advanced Interactions)
🔗 **https://protopie.io**

Use for:
- Gesture-based interactions
- Sensor-based prototypes
- Complex state management

## 10.2 Figma Setup

### File Structure
```
Encore Design System
├── 🎨 Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Effects
├── 🧩 Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Navigation
│   └── ...
├── 📱 Screens
│   ├── Onboarding
│   ├── Home
│   ├── Habit Creation
│   ├── Habit Detail
│   ├── Statistics
│   └── Settings
└── 🔄 Flows
    ├── Onboarding Flow
    ├── Create Habit Flow
    └── Complete Habit Flow
```

### Handoff Checklist
- [ ] All components use auto-layout
- [ ] Proper naming conventions
- [ ] Design tokens documented
- [ ] Interaction notes on each screen
- [ ] Responsive variants (if applicable)
- [ ] Dark mode variants
- [ ] Export settings configured

---

# APPENDIX: RESOURCE QUICK REFERENCE

## Must-Visit URLs

| Category | Resource | URL |
|----------|----------|-----|
| Components | shadcn/ui | https://ui.shadcn.com |
| Components | Radix UI | https://radix-ui.com |
| Animation | LottieFiles | https://lottiefiles.com |
| Animation | Framer Motion | https://framer.com/motion |
| Icons | Lucide | https://lucide.dev |
| Illustrations | unDraw | https://undraw.co |
| Inspiration | Mobbin | https://mobbin.com |
| Inspiration | Dribbble | https://dribbble.com |
| Colors | Tailwind Colors | https://tailwindcss.com/docs/colors |
| Typography | Inter Font | https://rsms.me/inter |
| Accessibility | WebAIM | https://webaim.org |
| iOS Guidelines | Apple HIG | https://developer.apple.com/design |
| Android Guidelines | Material 3 | https://m3.material.io |

---

**Document Owner**: UI/UX Lead  
**Last Updated**: December 2025  
**Next Review**: End of Sprint 2
