# Encore Habit Tracker
## Product Requirements Document (PRD)
### Version 1.0 | December 2025

---

# TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [User Personas](#3-user-personas)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [User Stories & Acceptance Criteria](#6-user-stories--acceptance-criteria)
7. [Technical Specifications](#7-technical-specifications)
8. [Project Plan & Deliverables](#8-project-plan--deliverables)
9. [UI/UX Research Guide](#9-uiux-research-guide)
10. [Risk Assessment](#10-risk-assessment)
11. [Success Metrics](#11-success-metrics)

---

# 1. EXECUTIVE SUMMARY

## 1.1 Product Overview
Encore is a streak-based habit tracking application designed to help users build and maintain positive habits through gamification, visual progress tracking, and motivational feedback systems.

## 1.2 Business Objectives
- Create a highly engaging habit tracking experience
- Achieve 40% Day-7 retention rate
- Build a sustainable freemium revenue model
- Establish market presence in the productivity app category

## 1.3 Development Phases
| Phase | Deliverable | Timeline |
|-------|-------------|----------|
| Phase 1 | Progressive Web App (PWA) | 8 weeks |
| Phase 2 | Native Mobile Apps (iOS/Android) | 12 weeks |
| Phase 3 | Premium Features & Analytics | 6 weeks |

## 1.4 Target Platforms
- **Phase 1**: Web (PWA) - Chrome, Safari, Firefox, Edge
- **Phase 2**: iOS 14+, Android 10+

---

# 2. PRODUCT VISION

## 2.1 Vision Statement
"Empower individuals to build their core habits through consistent repetition, with an intuitive, motivating, and visually delightful habit tracking experience."

## 2.2 Value Proposition
- **Simplicity**: One-tap habit completion
- **Motivation**: Streak-based gamification with visual rewards
- **Flexibility**: Freeze system prevents discouragement from missed days
- **Insights**: Data-driven feedback on habit performance

## 2.3 Competitive Analysis

| Feature | Encore | Habitica | Streaks | Loop |
|---------|-------|----------|---------|------|
| Streak Focus | ✅ Primary | ❌ | ✅ | ⚠️ |
| Freeze System | ✅ | ❌ | ❌ | ❌ |
| Gamification | ✅ | ✅ Heavy | ⚠️ Light | ❌ |
| Onboarding | ✅ Guided | ⚠️ | ⚠️ | ❌ |
| Free Tier | ✅ | ✅ | ❌ Paid | ✅ |

## 2.4 Unique Selling Points
1. **Streak Freeze System**: Preserves streaks during legitimate misses
2. **Animated Mascot**: Emotional connection through fire character
3. **Progressive Goals**: Tiered achievement system (Good → Unbeatable)
4. **Frictionless UX**: Minimal taps to complete daily habits

---

# 3. USER PERSONAS

## 3.1 Primary Persona: "The Self-Improver"
**Name**: Alex, 28  
**Occupation**: Software Engineer  
**Goals**: Build morning routine, exercise regularly, read daily  
**Pain Points**: 
- Forgets habits during busy periods
- Gets discouraged when breaking streaks
- Needs visual motivation

**Behaviors**:
- Checks phone first thing in morning
- Responds well to gamification
- Values clean, minimal interfaces

## 3.2 Secondary Persona: "The Health Seeker"
**Name**: Maria, 35  
**Occupation**: Marketing Manager  
**Goals**: Improve physical and mental health habits  
**Pain Points**:
- Overwhelmed by complex apps
- Needs flexibility for travel/sick days
- Wants to see progress over time

## 3.3 Tertiary Persona: "The Student"
**Name**: David, 21  
**Occupation**: University Student  
**Goals**: Study consistently, maintain sleep schedule  
**Pain Points**:
- Limited budget (prefers free apps)
- Irregular schedule
- Needs reminders

---

# 4. FUNCTIONAL REQUIREMENTS

## 4.1 Onboarding Module

### FR-ONB-001: Welcome Carousel
**Priority**: P0 (Critical)  
**Description**: Display 3-slide onboarding carousel for first-time users

| Slide | Content | Visual |
|-------|---------|--------|
| 1 | Streak concept introduction | Fire mascot animation |
| 2 | Freeze feature explanation | Ice mascot animation |
| 3 | Call-to-action to create first habit | Habit card preview |

**Acceptance Criteria**:
- [ ] Carousel supports swipe navigation
- [ ] Dot indicators show current position
- [ ] "Start my first streak" button advances to habit creation
- [ ] Skip option available after first slide
- [ ] Animations load within 500ms

### FR-ONB-002: Habit Creation Wizard
**Priority**: P0 (Critical)  
**Description**: Multi-step wizard for creating new habits

**Step 1 - Name Input**:
- Text input field (max 50 characters)
- Advanced settings toggle (initial streak count)
- Character counter
- Validation: non-empty, no special characters only

**Step 2 - Freeze Mode Selection**:
- Two options: Active (Normal) / Inactive (Hard)
- Visual cards with mascot icons
- Single selection required

**Step 3 - Streak Goal Selection**:
- Four preset options: 7, 14, 30, 50 days
- Custom goal input (optional, Premium)
- Visual streak milestones

**Step 4 - Confirmation**:
- Summary of all selections
- Edit capability for each field
- "Create your habit" CTA

### FR-ONB-003: Progress Indicator
**Priority**: P1 (High)  
**Description**: Visual progress bar showing wizard completion

**Acceptance Criteria**:
- [ ] Progress bar fills proportionally (25% per step)
- [ ] Back navigation decrements progress
- [ ] Animated transitions between states

---

## 4.2 Home Module

### FR-HOME-001: Header Component
**Priority**: P0 (Critical)  
**Description**: App header with branding and premium badge

**Elements**:
- Encore logo (fire icon + wordmark)
- Premium badge/button (links to upgrade)
- Current date display

### FR-HOME-002: Week Strip Calendar
**Priority**: P0 (Critical)  
**Description**: Horizontal scrollable week view

**Specifications**:
- Display 7 days centered on selected day
- Today highlighted with distinct color
- Selected day shows filled background
- Tapping day updates habit view for that date
- Horizontal scroll for accessing other weeks

**Acceptance Criteria**:
- [ ] Today auto-selected on app launch
- [ ] Past days accessible for editing
- [ ] Future days viewable but not editable
- [ ] Smooth scroll performance (60fps)
- [ ] Day names abbreviated (M, T, W, T, F, S, S)

### FR-HOME-003: Habit List
**Priority**: P0 (Critical)  
**Description**: Scrollable list of user's habits

**Card Components**:
```
┌─────────────────────────────────────────────┐
│  [streak#]  [🔥/⚫]  [habit name]    [✓]   │
└─────────────────────────────────────────────┘
```

**Specifications**:
- Streak count (numeric)
- Fire icon: Orange (active streak) / Gray (no streak)
- Habit name (truncate with ellipsis if > 20 chars)
- Checkbox: Orange (completed) / Gray outline (pending)

**Interactions**:
- Tap checkbox → Toggle completion for selected day
- Long press card → Open habit details/edit
- Swipe left → Delete option (with confirmation)

### FR-HOME-004: Floating Action Button
**Priority**: P0 (Critical)  
**Description**: FAB for creating new habits

**Specifications**:
- Position: Bottom-right, 16dp from edges
- Size: 56x56dp
- Icon: Plus sign
- Color: Primary orange
- Shadow: Elevation 6dp

**Behavior**:
- Tap → Open habit creation wizard
- Respect safe area insets

### FR-HOME-005: Empty State
**Priority**: P1 (High)  
**Description**: Display when user has no habits

**Elements**:
- Gray fire mascot illustration
- "No habits yet" message
- "Tap + to create one!" instruction
- Optional: Quick-start templates

---

## 4.3 Habit Management Module

### FR-HAB-001: Habit Detail View
**Priority**: P1 (High)  
**Description**: Full-screen view of habit details

**Sections**:
1. **Header**: Habit name, fire icon, current streak
2. **Calendar Grid**: Monthly view with completion status
3. **Statistics**: 
   - Current streak
   - Best streak
   - Total completions
   - Completion rate (%)
4. **Settings**: Edit name, goal, freeze mode
5. **Danger Zone**: Archive/Delete habit

### FR-HAB-002: Streak Calculation
**Priority**: P0 (Critical)  
**Description**: Logic for calculating habit streaks

**Rules**:
```
streak = consecutive_days_completed_ending_today

IF freeze_mode_active AND missed_day AND freeze_available:
    use_freeze()
    maintain_streak()
ELSE IF missed_day:
    reset_streak_to_zero()
```

**Edge Cases**:
- Habit created mid-streak (honor initial streak setting)
- Timezone changes
- Retroactive completion edits

### FR-HAB-003: Freeze System
**Priority**: P1 (High)  
**Description**: Streak protection mechanism

**Specifications**:
- Users earn 1 freeze per 7 consecutive days
- Maximum 2 freezes stored
- Freeze auto-applies when day is missed
- Freeze does NOT count toward streak (pauses it)
- Visual indicator of available freezes

### FR-HAB-004: Habit CRUD Operations
**Priority**: P0 (Critical)

| Operation | Trigger | Confirmation Required |
|-----------|---------|----------------------|
| Create | FAB tap | No |
| Read | Card tap | No |
| Update | Edit button | No (auto-save) |
| Delete | Swipe + confirm | Yes (modal) |
| Archive | Settings menu | Yes (modal) |

---

## 4.4 Statistics Module

### FR-STAT-001: Statistics Dashboard
**Priority**: P2 (Medium) - Premium Feature  
**Description**: Analytics view for habit insights

**Metrics**:
- Overall completion rate
- Best performing habit
- Worst performing habit
- Day-of-week analysis
- Streak history chart
- Monthly heatmap

### FR-STAT-002: Achievement Badges
**Priority**: P2 (Medium)  
**Description**: Gamification through achievements

**Badge Categories**:
| Badge | Criteria | Icon |
|-------|----------|------|
| First Step | Complete 1 habit | 🌱 |
| Week Warrior | 7-day streak | 🔥 |
| Fortnight Force | 14-day streak | 💪 |
| Monthly Master | 30-day streak | 🏆 |
| Habit Hero | 50-day streak | 👑 |
| Perfect Week | 7/7 days all habits | ⭐ |
| Centurion | 100 total completions | 💯 |

---

## 4.5 Settings Module

### FR-SET-001: Settings Screen
**Priority**: P1 (High)  
**Description**: App configuration options

**Sections**:

**Premium**:
- Upgrade to Premium CTA
- Restore purchases

**Appearance**:
- Theme (Light/Dark/System)
- App icon selection (Premium)

**Notifications**:
- Enable/disable reminders
- Reminder time configuration
- Sound selection

**App**:
- Language selection
- Week start day (Sunday/Monday)
- Data export (JSON/CSV)
- Clear all data

**About**:
- Version info
- Terms of Service
- Privacy Policy
- Contact support

### FR-SET-002: Notification System
**Priority**: P1 (High)  
**Description**: Reminder notifications

**Types**:
1. **Daily Reminder**: Configurable time
2. **Streak at Risk**: If habit not completed by 8 PM
3. **Achievement Unlocked**: When badge earned
4. **Weekly Summary**: Optional weekly digest

---

## 4.6 Premium Features

### FR-PREM-001: Premium Tier
**Priority**: P2 (Medium)  
**Description**: Paid subscription features

**Free Tier Limits**:
- Maximum 3 habits
- Basic statistics only
- Standard reminders

**Premium Features**:
- Unlimited habits
- Advanced statistics & insights
- Custom streak goals
- Multiple reminder times per habit
- Data export
- Custom app icons
- Priority support
- No ads (if implemented)

**Pricing Model**:
- Monthly: $4.99/month
- Annual: $29.99/year (50% savings)
- Lifetime: $79.99 one-time

---

# 5. NON-FUNCTIONAL REQUIREMENTS

## 5.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial Load (PWA) | < 3 seconds | Lighthouse |
| Time to Interactive | < 2 seconds | Lighthouse |
| Animation Frame Rate | 60 fps | Chrome DevTools |
| API Response Time | < 500ms | Server logs |
| Offline Capability | Full functionality | Manual testing |

## 5.2 Scalability
- Support 100,000 concurrent users
- Handle 1M daily habit completions
- Auto-scaling infrastructure

## 5.3 Security
- HTTPS only
- JWT authentication
- Data encryption at rest (AES-256)
- GDPR/CCPA compliance
- No PII in analytics

## 5.4 Accessibility
- WCAG 2.1 AA compliance
- Screen reader support
- Minimum touch target 44x44px
- Color contrast ratio ≥ 4.5:1
- Support for reduced motion

## 5.5 Reliability
- 99.9% uptime SLA
- Automatic failover
- Daily backups
- Disaster recovery plan

## 5.6 Compatibility

**PWA**:
| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 80+ |
| Safari | 14+ |
| Firefox | 75+ |
| Edge | 80+ |

**Mobile**:
| Platform | Minimum Version |
|----------|-----------------|
| iOS | 14.0+ |
| Android | 10 (API 29)+ |

---

# 6. USER STORIES & ACCEPTANCE CRITERIA

## Epic 1: Onboarding

### US-1.1: First Launch Experience
**As a** new user  
**I want to** understand what the app does through an onboarding flow  
**So that** I can decide if it's right for me

**Acceptance Criteria**:
- [ ] App detects first launch via local storage flag
- [ ] 3 onboarding slides display sequentially
- [ ] Each slide has animated mascot/illustration
- [ ] "Start my first streak" button is clearly visible
- [ ] Progress dots indicate current position
- [ ] Swipe gestures work for navigation
- [ ] Flow completes in < 60 seconds

### US-1.2: Create First Habit
**As a** new user  
**I want to** create my first habit through a guided wizard  
**So that** I understand how to use the app

**Acceptance Criteria**:
- [ ] Wizard has 4 clear steps with progress indicator
- [ ] Each step has a single primary action
- [ ] Back navigation preserves entered data
- [ ] Validation prevents empty habit names
- [ ] Confirmation screen summarizes all choices
- [ ] Habit appears in list immediately after creation

---

## Epic 2: Daily Habit Tracking

### US-2.1: View Today's Habits
**As a** returning user  
**I want to** see all my habits for today when I open the app  
**So that** I know what I need to complete

**Acceptance Criteria**:
- [ ] Today is selected by default
- [ ] All habits display with current streak count
- [ ] Completed habits show checkmark
- [ ] Incomplete habits show empty checkbox
- [ ] List scrolls if more than screen height

### US-2.2: Complete a Habit
**As a** user  
**I want to** mark a habit as complete with one tap  
**So that** I can quickly log my progress

**Acceptance Criteria**:
- [ ] Single tap on checkbox toggles completion
- [ ] Visual feedback within 100ms
- [ ] Streak count updates immediately
- [ ] Fire icon changes from gray to orange
- [ ] Undo available for 5 seconds (toast)
- [ ] Works offline (syncs when online)

### US-2.3: View Past Days
**As a** user  
**I want to** view and edit habits from previous days  
**So that** I can log forgotten completions

**Acceptance Criteria**:
- [ ] Week strip allows selecting past days
- [ ] Habit list updates to show that day's status
- [ ] Can toggle completion for past days
- [ ] Streak recalculates correctly
- [ ] Cannot edit days older than 7 days (configurable)

### US-2.4: Streak Protection
**As a** user  
**I want** my streak protected if I miss a day and have freezes  
**So that** one bad day doesn't ruin my progress

**Acceptance Criteria**:
- [ ] Freeze auto-applies at midnight
- [ ] User notified of freeze usage
- [ ] Streak count pauses (doesn't increment)
- [ ] Freeze count decrements
- [ ] Can see freeze history in habit details

---

## Epic 3: Habit Management

### US-3.1: Edit Habit
**As a** user  
**I want to** edit my habit's name and settings  
**So that** I can adjust as my goals change

**Acceptance Criteria**:
- [ ] Access edit from habit detail view
- [ ] Can modify: name, goal, freeze mode
- [ ] Changes save automatically
- [ ] Cancel reverts changes
- [ ] Streak preserved on edit

### US-3.2: Delete Habit
**As a** user  
**I want to** delete a habit I no longer want to track  
**So that** my list stays relevant

**Acceptance Criteria**:
- [ ] Delete option in habit detail view
- [ ] Confirmation modal prevents accidents
- [ ] Habit removed from list immediately
- [ ] Data deleted (not just hidden)
- [ ] Undo available for 10 seconds

### US-3.3: View Habit Statistics
**As a** user  
**I want to** see detailed statistics for each habit  
**So that** I understand my patterns

**Acceptance Criteria**:
- [ ] Current and best streak displayed
- [ ] Completion rate percentage
- [ ] Calendar heatmap of completions
- [ ] Day-of-week breakdown
- [ ] All data updates in real-time

---

## Epic 4: Gamification

### US-4.1: Earn Achievements
**As a** user  
**I want to** earn badges for reaching milestones  
**So that** I feel rewarded for my progress

**Acceptance Criteria**:
- [ ] Achievement unlocks trigger celebration animation
- [ ] Push notification sent (if enabled)
- [ ] Badge appears in achievements list
- [ ] Locked badges show progress toward unlocking
- [ ] Can share achievements (optional)

### US-4.2: Track Multiple Streak Goals
**As a** user  
**I want to** see my progress toward streak goals  
**So that** I have clear targets to aim for

**Acceptance Criteria**:
- [ ] Progress bar shows distance to next goal
- [ ] Milestone markers at 7, 14, 30, 50 days
- [ ] Celebration when goal reached
- [ ] New goal auto-sets after completion

---

## Epic 5: Settings & Preferences

### US-5.1: Configure Reminders
**As a** user  
**I want to** set daily reminders for my habits  
**So that** I don't forget to complete them

**Acceptance Criteria**:
- [ ] Can enable/disable reminders globally
- [ ] Can set reminder time
- [ ] Notification permission requested appropriately
- [ ] Reminder fires at correct local time
- [ ] Deep link to app from notification

### US-5.2: Change Theme
**As a** user  
**I want to** switch between light and dark themes  
**So that** I can use the app comfortably at any time

**Acceptance Criteria**:
- [ ] Three options: Light, Dark, System
- [ ] Theme changes immediately on selection
- [ ] Preference persists across sessions
- [ ] All screens support both themes
- [ ] System option follows device settings

---

# 7. TECHNICAL SPECIFICATIONS

## 7.1 Architecture Overview

### System Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DOCKER COMPOSE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         NGINX (Reverse Proxy)                        │   │
│  │                            Port 80/443                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                    │                    │                    │              │
│                    ▼                    ▼                    ▼              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐ │
│  │     PWA/Mobile      │  │      FastAPI        │  │      Keycloak       │ │
│  │   Static Files      │  │     Backend         │  │   (Auth Server)     │ │
│  │    Port 3000        │  │    Port 8000        │  │    Port 8080        │ │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘ │
│                                     │                        │              │
│                                     ▼                        │              │
│                    ┌─────────────────────────────┐           │              │
│                    │         Casbin              │           │              │
│                    │   (Authorization/RBAC)      │           │              │
│                    └─────────────────────────────┘           │              │
│                                     │                        │              │
│                    ┌────────────────┴────────────────────────┘              │
│                    ▼                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        PostgreSQL Database                           │   │
│  │                            Port 5432                                 │   │
│  │     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │   │
│  │     │  encore_db    │  │ keycloak_db  │  │  casbin_db   │            │   │
│  │     │ (App Data)   │  │ (Auth Data)  │  │  (Policies)  │            │   │
│  │     └──────────────┘  └──────────────┘  └──────────────┘            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                             Redis                                    │   │
│  │                    (Cache, Sessions, Queue)                          │   │
│  │                           Port 6379                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### PWA Architecture (Phase 1)
```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (PWA)                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   React 18  │  │   Zustand   │  │  React      │     │
│  │   + Vite    │  │   (State)   │  │  Query      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Tailwind   │  │   Framer    │  │   Workbox   │     │
│  │    CSS      │  │   Motion    │  │   (SW)      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Keycloak JS Adapter (OIDC Client)       │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                    IndexedDB / LocalStorage              │
└─────────────────────────────────────────────────────────┘
```

### Mobile Architecture (Phase 2)
```
┌─────────────────────────────────────────────────────────┐
│                   MOBILE CLIENT                          │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │              React Native / Expo                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Reanimated│  │    MMKV     │  │   Notifee   │     │
│  │   (Anim)    │  │  (Storage)  │  │  (Notif)    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │      react-native-app-auth (OIDC Client)        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 7.2 Technology Stack

### Frontend (PWA)
| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Framework | React | 18.x | Component architecture, ecosystem |
| Build Tool | Vite | 5.x | Fast HMR, optimized builds |
| Styling | Tailwind CSS | 3.x | Utility-first, rapid development |
| Animation | Framer Motion | 10.x | Declarative animations |
| State | Zustand | 4.x | Simple, performant state |
| Data Fetching | TanStack Query | 5.x | Caching, sync, offline |
| Forms | React Hook Form | 7.x | Performance, validation |
| PWA | Workbox | 7.x | Service worker tooling |
| Icons | Lucide React | Latest | Consistent icon set |
| Charts | Recharts | 2.x | React-native charting |
| Auth | Keycloak JS | 24.x | OIDC client adapter |

### Frontend (Mobile)
| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Framework | React Native | 0.73+ | Cross-platform, shared logic |
| Toolchain | Expo | 50+ | Simplified development |
| Navigation | React Navigation | 6.x | Native navigation |
| Animation | Reanimated | 3.x | 60fps native animations |
| Storage | MMKV | 2.x | Fast key-value storage |
| Notifications | Notifee | Latest | Full notification control |
| Auth | react-native-app-auth | Latest | OIDC for mobile |

### Backend (FastAPI + Python)
| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Runtime | Python | 3.11+ | Modern async support, type hints |
| Framework | FastAPI | 0.109+ | High performance, auto docs, async |
| ASGI Server | Uvicorn | 0.27+ | Lightning-fast ASGI server |
| Database ORM | SQLAlchemy | 2.0+ | Async support, mature ORM |
| Migrations | Alembic | 1.13+ | Database version control |
| Validation | Pydantic | 2.x | Data validation, settings |
| Auth | Keycloak | 24.x | Enterprise-grade IAM |
| Authorization | Casbin | 1.x | Flexible RBAC/ABAC |
| Task Queue | Celery | 5.x | Background job processing |
| Cache | Redis | 7.x | Caching, sessions, queue broker |

### Authentication & Authorization
| Component | Technology | Purpose |
|-----------|------------|---------|
| Identity Provider | Keycloak 24.x | User management, SSO, OAuth2/OIDC |
| Authorization | PyCasbin 1.x | RBAC policies, permission enforcement |
| Token Format | JWT (via Keycloak) | Stateless authentication |
| Session Store | Redis | Token blacklist, refresh tokens |

### Database
| Component | Technology | Purpose |
|-----------|------------|---------|
| Primary DB | PostgreSQL 16 | Application data |
| Keycloak DB | PostgreSQL 16 | Identity data (separate schema) |
| Casbin DB | PostgreSQL 16 | Authorization policies |
| Cache | Redis 7.x | Query cache, sessions |

### Infrastructure (Docker)
| Component | Image | Purpose |
|-----------|-------|---------|
| API | python:3.11-slim | FastAPI application |
| Auth | quay.io/keycloak/keycloak:24.0 | Identity management |
| Database | postgres:16-alpine | Data persistence |
| Cache | redis:7-alpine | Caching layer |
| Proxy | nginx:alpine | Reverse proxy, SSL termination |
| Worker | python:3.11-slim | Celery background tasks |

### Development Tools
| Tool | Purpose |
|------|---------|
| Docker Compose | Local development orchestration |
| pytest | Unit and integration testing |
| Ruff | Fast Python linter |
| Black | Code formatting |
| pre-commit | Git hooks for quality |
| Alembic | Database migrations |

## 7.3 Docker Compose Configuration

### docker-compose.yml
```yaml
version: '3.9'

services:
  # ===================
  # NGINX Reverse Proxy
  # ===================
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - api
      - keycloak
      - frontend
    networks:
      - encore-network
    restart: unless-stopped

  # ===================
  # Frontend (PWA)
  # ===================
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      - VITE_API_URL=http://localhost/api
      - VITE_KEYCLOAK_URL=http://localhost/auth
      - VITE_KEYCLOAK_REALM=encore
      - VITE_KEYCLOAK_CLIENT_ID=encore-web
    networks:
      - encore-network
    restart: unless-stopped

  # ===================
  # FastAPI Backend
  # ===================
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=postgresql+asyncpg://encore:encore_password@postgres:5432/encore_db
      - REDIS_URL=redis://redis:6379/0
      - KEYCLOAK_URL=http://keycloak:8080
      - KEYCLOAK_REALM=encore
      - KEYCLOAK_CLIENT_ID=encore-api
      - KEYCLOAK_CLIENT_SECRET=${KEYCLOAK_CLIENT_SECRET}
      - CASBIN_MODEL_PATH=/app/casbin/model.conf
      - CASBIN_POLICY_ADAPTER=postgresql
      - SECRET_KEY=${SECRET_KEY}
      - ENVIRONMENT=development
    volumes:
      - ./backend:/app
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      keycloak:
        condition: service_healthy
    networks:
      - encore-network
    restart: unless-stopped

  # ===================
  # Celery Worker
  # ===================
  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A app.worker worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql+asyncpg://encore:encore_password@postgres:5432/encore_db
      - REDIS_URL=redis://redis:6379/0
      - CELERY_BROKER_URL=redis://redis:6379/1
    depends_on:
      - api
      - redis
    networks:
      - encore-network
    restart: unless-stopped

  # ===================
  # Keycloak (Auth)
  # ===================
  keycloak:
    image: quay.io/keycloak/keycloak:24.0
    command: start-dev --import-realm
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=${KEYCLOAK_ADMIN_PASSWORD}
      - KC_DB=postgres
      - KC_DB_URL=jdbc:postgresql://postgres:5432/keycloak_db
      - KC_DB_USERNAME=keycloak
      - KC_DB_PASSWORD=${KEYCLOAK_DB_PASSWORD}
      - KC_HOSTNAME_STRICT=false
      - KC_HTTP_ENABLED=true
      - KC_PROXY=edge
    volumes:
      - ./keycloak/realm-export.json:/opt/keycloak/data/import/realm-export.json:ro
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "exec 3<>/dev/tcp/localhost/8080 && echo -e 'GET /health/ready HTTP/1.1\\r\\nHost: localhost\\r\\n\\r\\n' >&3 && cat <&3 | grep -q '200 OK'"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - encore-network
    restart: unless-stopped

  # ===================
  # PostgreSQL Database
  # ===================
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_MULTIPLE_DATABASES=encore_db:encore:encore_password,keycloak_db:keycloak:${KEYCLOAK_DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/create-multiple-databases.sh:/docker-entrypoint-initdb.d/create-multiple-databases.sh:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - encore-network
    restart: unless-stopped

  # ===================
  # Redis Cache
  # ===================
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - encore-network
    restart: unless-stopped

  # ===================
  # pgAdmin (Development)
  # ===================
  pgadmin:
    image: dpage/pgadmin4:latest
    profiles: ["dev"]
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@encore.app
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PASSWORD}
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - encore-network

networks:
  encore-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

### Environment Variables (.env.example)
```bash
# PostgreSQL
POSTGRES_PASSWORD=your_secure_postgres_password

# Keycloak
KEYCLOAK_ADMIN_PASSWORD=your_secure_admin_password
KEYCLOAK_DB_PASSWORD=your_secure_keycloak_db_password
KEYCLOAK_CLIENT_SECRET=your_client_secret

# Application
SECRET_KEY=your_secure_secret_key_min_32_chars

# Development
PGADMIN_PASSWORD=your_pgadmin_password
```

## 7.4 Backend Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry
│   ├── config.py               # Settings (Pydantic BaseSettings)
│   ├── database.py             # SQLAlchemy async engine
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py             # Dependency injection
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py       # API router aggregation
│   │   │   ├── habits.py       # Habit endpoints
│   │   │   ├── completions.py  # Completion endpoints
│   │   │   ├── stats.py        # Statistics endpoints
│   │   │   └── users.py        # User endpoints
│   │   └── health.py           # Health check endpoint
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py         # Keycloak token validation
│   │   ├── casbin_enforcer.py  # Casbin authorization
│   │   └── exceptions.py       # Custom exceptions
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User SQLAlchemy model
│   │   ├── habit.py            # Habit model
│   │   ├── completion.py       # Completion model
│   │   └── achievement.py      # Achievement model
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── habit.py            # Habit Pydantic schemas
│   │   ├── completion.py       # Completion schemas
│   │   ├── stats.py            # Statistics schemas
│   │   └── user.py             # User schemas
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── habit_service.py    # Habit business logic
│   │   ├── streak_service.py   # Streak calculations
│   │   ├── freeze_service.py   # Freeze system logic
│   │   └── stats_service.py    # Statistics calculations
│   │
│   ├── worker/
│   │   ├── __init__.py
│   │   ├── celery_app.py       # Celery configuration
│   │   └── tasks.py            # Background tasks
│   │
│   └── casbin/
│       ├── model.conf          # Casbin RBAC model
│       └── policy.csv          # Default policies
│
├── alembic/
│   ├── env.py
│   ├── versions/               # Migration files
│   └── alembic.ini
│
├── tests/
│   ├── conftest.py
│   ├── test_habits.py
│   ├── test_streaks.py
│   └── test_auth.py
│
├── Dockerfile
├── requirements.txt
├── pyproject.toml
└── README.md
```

## 7.5 Keycloak Configuration

### Realm Setup (encore)
```json
{
  "realm": "encore",
  "enabled": true,
  "registrationAllowed": true,
  "loginWithEmailAllowed": true,
  "duplicateEmailsAllowed": false,
  "resetPasswordAllowed": true,
  "editUsernameAllowed": false,
  "bruteForceProtected": true,
  
  "clients": [
    {
      "clientId": "encore-web",
      "name": "Encore Web App",
      "enabled": true,
      "publicClient": true,
      "standardFlowEnabled": true,
      "directAccessGrantsEnabled": false,
      "redirectUris": [
        "http://localhost:3000/*",
        "https://encore.app/*"
      ],
      "webOrigins": ["+"]
    },
    {
      "clientId": "encore-api",
      "name": "Encore Backend API",
      "enabled": true,
      "publicClient": false,
      "bearerOnly": true,
      "standardFlowEnabled": false
    },
    {
      "clientId": "encore-mobile",
      "name": "Encore Mobile App",
      "enabled": true,
      "publicClient": true,
      "standardFlowEnabled": true,
      "directAccessGrantsEnabled": false,
      "redirectUris": [
        "encore://oauth/callback",
        "exp://*/--/oauth/callback"
      ]
    }
  ],
  
  "roles": {
    "realm": [
      { "name": "user", "description": "Standard user" },
      { "name": "premium", "description": "Premium subscriber" },
      { "name": "admin", "description": "Administrator" }
    ]
  },
  
  "defaultRoles": ["user"]
}
```

### Token Claims Configuration
```
User attributes to include in JWT:
- sub (user ID)
- email
- preferred_username
- realm_access.roles
- resource_access.encore-api.roles
```

## 7.6 Casbin Authorization

### RBAC Model (model.conf)
```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
```

### Default Policies (policy.csv)
```csv
# Role assignments
g, user, user
g, premium, user
g, premium, premium
g, admin, premium
g, admin, admin

# User permissions (free tier)
p, user, habits, read
p, user, habits, create
p, user, habits, update
p, user, habits, delete
p, user, completions, read
p, user, completions, create
p, user, completions, delete
p, user, stats, read_basic
p, user, profile, read
p, user, profile, update

# Premium permissions (additional)
p, premium, habits, unlimited
p, premium, stats, read_advanced
p, premium, export, create
p, premium, goals, custom

# Admin permissions (additional)
p, admin, users, read
p, admin, users, update
p, admin, users, delete
p, admin, system, manage
```

### Casbin Enforcer Implementation
```python
# app/core/casbin_enforcer.py
import casbin
from casbin_sqlalchemy_adapter import Adapter
from app.config import settings

def get_enforcer():
    adapter = Adapter(settings.DATABASE_URL.replace('+asyncpg', ''))
    enforcer = casbin.Enforcer(
        settings.CASBIN_MODEL_PATH,
        adapter
    )
    return enforcer

async def check_permission(user_roles: list, resource: str, action: str) -> bool:
    enforcer = get_enforcer()
    for role in user_roles:
        if enforcer.enforce(role, resource, action):
            return True
    return False
```

## 7.7 FastAPI Security Dependencies

```python
# app/core/security.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from jose import jwt, JWTError
from app.config import settings
import httpx

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{settings.KEYCLOAK_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/auth",
    tokenUrl=f"{settings.KEYCLOAK_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/token",
)

async def get_keycloak_public_key():
    """Fetch Keycloak realm public key for token verification"""
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.KEYCLOAK_URL}/realms/{settings.KEYCLOAK_REALM}"
        )
        realm_info = response.json()
        return realm_info["public_key"]

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Validate JWT and extract user info"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        public_key = await get_keycloak_public_key()
        payload = jwt.decode(
            token,
            f"-----BEGIN PUBLIC KEY-----\n{public_key}\n-----END PUBLIC KEY-----",
            algorithms=["RS256"],
            audience=settings.KEYCLOAK_CLIENT_ID,
        )
        
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
            
        return {
            "id": user_id,
            "email": payload.get("email"),
            "username": payload.get("preferred_username"),
            "roles": payload.get("realm_access", {}).get("roles", []),
        }
    except JWTError:
        raise credentials_exception

async def require_permission(resource: str, action: str):
    """Dependency factory for Casbin permission checks"""
    async def permission_checker(user = Depends(get_current_user)):
        from app.core.casbin_enforcer import check_permission
        
        if not await check_permission(user["roles"], resource, action):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permission denied"
            )
        return user
    return permission_checker
```

## 7.8 API Endpoints (Updated)

### Authentication (Keycloak handles these)
```
# Keycloak endpoints (proxied through /auth)
GET    /auth/realms/encore/protocol/openid-connect/auth    - Authorization
POST   /auth/realms/encore/protocol/openid-connect/token   - Token exchange
POST   /auth/realms/encore/protocol/openid-connect/logout  - Logout
GET    /auth/realms/encore/protocol/openid-connect/userinfo - User info
```

### Application API
```
# Health
GET    /api/health                    - Health check

# Habits
GET    /api/v1/habits                 - List user's habits
POST   /api/v1/habits                 - Create habit
GET    /api/v1/habits/{id}            - Get habit details
PATCH  /api/v1/habits/{id}            - Update habit
DELETE /api/v1/habits/{id}            - Delete habit
POST   /api/v1/habits/{id}/archive    - Archive habit

# Completions
GET    /api/v1/habits/{id}/completions - Get completions (query: start, end)
POST   /api/v1/habits/{id}/completions - Log completion
DELETE /api/v1/habits/{id}/completions/{date} - Remove completion

# Statistics
GET    /api/v1/stats/overview         - Dashboard stats
GET    /api/v1/stats/habits/{id}      - Habit-specific stats

# User
GET    /api/v1/users/me               - Get current user profile
PATCH  /api/v1/users/me               - Update profile
DELETE /api/v1/users/me               - Delete account (GDPR)
GET    /api/v1/users/me/export        - Export data (GDPR)

# Premium (requires premium role)
GET    /api/v1/stats/advanced         - Advanced analytics
POST   /api/v1/export                 - Data export
```

## 7.9 Data Models (SQLAlchemy)

### User Model
```python
# app/models/user.py
from sqlalchemy import Column, String, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime
import enum

class WeekStart(enum.Enum):
    SUNDAY = 0
    MONDAY = 1

class Theme(enum.Enum):
    LIGHT = "light"
    DARK = "dark"
    SYSTEM = "system"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    keycloak_id = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False)
    display_name = Column(String(100))
    avatar_url = Column(String(500))
    is_premium = Column(Boolean, default=False)
    premium_expires_at = Column(DateTime, nullable=True)
    timezone = Column(String(50), default="UTC")
    week_starts_on = Column(Enum(WeekStart), default=WeekStart.SUNDAY)
    theme = Column(Enum(Theme), default=Theme.SYSTEM)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    habits = relationship("Habit", back_populates="user", cascade="all, delete-orphan")
    achievements = relationship("Achievement", back_populates="user", cascade="all, delete-orphan")
```

### Habit Model
```python
# app/models/habit.py
from sqlalchemy import Column, String, Boolean, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime

class Habit(Base):
    __tablename__ = "habits"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(50), nullable=False)
    icon = Column(String(10), default="🎯")  # Emoji
    color = Column(String(7), default="#f97316")  # Hex color
    freeze_mode = Column(Boolean, default=True)
    freezes_available = Column(Integer, default=0)  # 0-2
    streak_goal = Column(Integer, default=7)  # 7, 14, 30, 50, custom
    current_streak = Column(Integer, default=0)
    best_streak = Column(Integer, default=0)
    total_completions = Column(Integer, default=0)
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="habits")
    completions = relationship("Completion", back_populates="habit", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Habit {self.name} (streak: {self.current_streak})>"
```

### Completion Model
```python
# app/models/completion.py
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Date, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime

class Completion(Base):
    __tablename__ = "completions"
    __table_args__ = (
        UniqueConstraint('habit_id', 'date', name='unique_habit_date'),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    habit_id = Column(UUID(as_uuid=True), ForeignKey("habits.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False, index=True)  # YYYY-MM-DD
    completed_at = Column(DateTime, default=datetime.utcnow)
    used_freeze = Column(Boolean, default=False)
    note = Column(String(500), nullable=True)

    # Relationships
    habit = relationship("Habit", back_populates="completions")

    def __repr__(self):
        return f"<Completion {self.habit_id} on {self.date}>"
```

### Achievement Model
```python
# app/models/achievement.py
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime
import enum

class AchievementType(enum.Enum):
    FIRST_HABIT = "first_habit"
    FIRST_COMPLETION = "first_completion"
    STREAK_7 = "streak_7"
    STREAK_14 = "streak_14"
    STREAK_30 = "streak_30"
    STREAK_50 = "streak_50"
    PERFECT_WEEK = "perfect_week"
    CENTURION = "centurion"

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    type = Column(Enum(AchievementType), nullable=False)
    habit_id = Column(UUID(as_uuid=True), ForeignKey("habits.id", ondelete="SET NULL"), nullable=True)
    unlocked_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="achievements")
```

### Pydantic Schemas
```python
# app/schemas/habit.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class HabitBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    icon: str = Field(default="🎯", max_length=10)
    color: str = Field(default="#f97316", pattern="^#[0-9a-fA-F]{6}$")
    freeze_mode: bool = True
    streak_goal: int = Field(default=7, ge=1, le=365)

class HabitCreate(HabitBase):
    initial_streak: int = Field(default=0, ge=0)

class HabitUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=50)
    icon: Optional[str] = Field(None, max_length=10)
    color: Optional[str] = Field(None, pattern="^#[0-9a-fA-F]{6}$")
    freeze_mode: Optional[bool] = None
    streak_goal: Optional[int] = Field(None, ge=1, le=365)

class HabitResponse(HabitBase):
    id: UUID
    current_streak: int
    best_streak: int
    total_completions: int
    freezes_available: int
    is_archived: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CompletionCreate(BaseModel):
    date: str = Field(..., pattern="^\d{4}-\d{2}-\d{2}$")  # YYYY-MM-DD
    note: Optional[str] = Field(None, max_length=500)

class CompletionResponse(BaseModel):
    id: UUID
    habit_id: UUID
    date: str
    completed_at: datetime
    used_freeze: bool
    note: Optional[str]

    class Config:
        from_attributes = True
```

## 7.10 Infrastructure & Deployment

### Development Environment
| Service | Local Port | Container |
|---------|------------|-----------|
| Frontend | 3000 | frontend |
| FastAPI | 8000 | api |
| Keycloak | 8080 | keycloak |
| PostgreSQL | 5432 | postgres |
| Redis | 6379 | redis |
| pgAdmin | 5050 | pgadmin (dev only) |

### Production Deployment Options

#### Option A: Single VPS (MVP)
- **Provider**: Hetzner, DigitalOcean, Linode
- **Specs**: 4 vCPU, 8GB RAM, 80GB SSD
- **Cost**: ~$40/month
- **Setup**: Docker Compose on single server

#### Option B: Managed Services (Scale)
| Component | Service | Cost Estimate |
|-----------|---------|---------------|
| API Hosting | Railway / Render | $20/month |
| Database | Supabase / Neon | $25/month |
| Keycloak | Cloud-IAM / Self-hosted | $0-50/month |
| Redis | Upstash | $10/month |
| CDN | Cloudflare | Free |

#### Option C: Kubernetes (Enterprise)
- **Provider**: GKE, EKS, or self-managed
- **Components**: Helm charts for all services
- **Cost**: $200+/month

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Backend Tests
        run: |
          cd backend
          pip install -r requirements-dev.txt
          pytest --cov=app
      
      - name: Run Frontend Tests
        run: |
          cd frontend
          npm ci
          npm run test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker Images
        run: |
          docker-compose -f docker-compose.prod.yml build
          
      - name: Push to Registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker-compose -f docker-compose.prod.yml push

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /opt/encore
            docker-compose -f docker-compose.prod.yml pull
            docker-compose -f docker-compose.prod.yml up -d
            docker-compose exec -T api alembic upgrade head
```

### Backup Strategy

```bash
# Database backup (daily cron)
0 2 * * * docker-compose exec -T postgres pg_dump -U encore encore_db | gzip > /backups/encore_$(date +\%Y\%m\%d).sql.gz

# Keycloak export (weekly)
0 3 * * 0 docker-compose exec -T keycloak /opt/keycloak/bin/kc.sh export --dir /tmp/export

# Retention: 30 days local, 90 days S3
find /backups -name "*.sql.gz" -mtime +30 -delete
aws s3 sync /backups s3://encore-backups/ --storage-class GLACIER
```

### manifest.json
```json
{
  "name": "Encore - Habit Tracker",
  "short_name": "Encore",
  "description": "Build core habits. Again and again.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#f97316",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker Strategy
- **Static Assets**: Cache-first
- **API Calls**: Network-first with fallback
- **Images**: Stale-while-revalidate
- **Offline Page**: Pre-cached fallback

---

# 8. PROJECT PLAN & DELIVERABLES

## 8.1 Phase 1: PWA Development (8 Weeks)

### Sprint 1-2: Foundation (Weeks 1-2)
**Deliverables**:
- [ ] Project setup (Vite, React, Tailwind)
- [ ] Design system implementation
- [ ] Component library (buttons, inputs, cards)
- [ ] Routing structure
- [ ] State management setup
- [ ] Local storage persistence

**Exit Criteria**:
- Design system documented in Storybook
- All base components reviewed and approved
- CI/CD pipeline operational

### Sprint 3-4: Core Features (Weeks 3-4)
**Deliverables**:
- [ ] Onboarding flow (3 slides)
- [ ] Habit creation wizard (4 steps)
- [ ] Home screen with habit list
- [ ] Habit completion toggle
- [ ] Week strip calendar
- [ ] Streak calculation logic

**Exit Criteria**:
- User can complete full onboarding
- User can create, view, and complete habits
- Streaks calculate correctly

### Sprint 5-6: Enhancement (Weeks 5-6)
**Deliverables**:
- [ ] Habit detail view
- [ ] Edit/delete functionality
- [ ] Freeze system implementation
- [ ] Settings screen
- [ ] Theme switching
- [ ] Animations and micro-interactions

**Exit Criteria**:
- Full CRUD operations functional
- Freeze system working correctly
- Dark mode fully implemented

### Sprint 7-8: Polish & Launch (Weeks 7-8)
**Deliverables**:
- [ ] PWA configuration
- [ ] Offline functionality
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Bug fixes
- [ ] Production deployment

**Exit Criteria**:
- Lighthouse score > 90 all categories
- WCAG 2.1 AA compliant
- Zero critical/high bugs
- App live on production URL

---

## 8.2 Phase 2: Mobile Development (12 Weeks)

### Sprint 9-12: Mobile Foundation (Weeks 9-12)
**Deliverables**:
- [ ] React Native project setup
- [ ] Navigation structure
- [ ] Shared component library
- [ ] Native animations
- [ ] Platform-specific UI adjustments

### Sprint 13-16: Feature Parity (Weeks 13-16)
**Deliverables**:
- [ ] All PWA features ported
- [ ] Push notifications
- [ ] Haptic feedback
- [ ] App icon and splash screen
- [ ] Deep linking

### Sprint 17-20: Native Features & Launch (Weeks 17-20)
**Deliverables**:
- [ ] Widgets (iOS/Android)
- [ ] App Store assets
- [ ] TestFlight/Play Console beta
- [ ] Store submission
- [ ] Launch marketing

---

## 8.3 Phase 3: Premium & Analytics (6 Weeks)

### Sprint 21-23: Premium Features
**Deliverables**:
- [ ] Backend API for premium
- [ ] Payment integration (Stripe/RevenueCat)
- [ ] Advanced statistics
- [ ] Unlimited habits
- [ ] Custom goals
- [ ] Data export

### Sprint 24-26: Analytics & Growth
**Deliverables**:
- [ ] Analytics dashboard (PostHog)
- [ ] A/B testing framework
- [ ] Referral system
- [ ] Social sharing
- [ ] Push notification campaigns

---

## 8.4 Milestone Summary

| Milestone | Date | Deliverable |
|-----------|------|-------------|
| M1 | Week 2 | Design system complete |
| M2 | Week 4 | Core habit tracking functional |
| M3 | Week 6 | All PWA features complete |
| M4 | Week 8 | **PWA Launch** |
| M5 | Week 12 | Mobile foundation complete |
| M6 | Week 16 | Mobile feature parity |
| M7 | Week 20 | **Mobile App Launch** |
| M8 | Week 26 | Premium features live |

---

# 9. UI/UX RESEARCH GUIDE

## 9.1 Design System Resources

### Component Libraries
| Resource | URL | Use Case |
|----------|-----|----------|
| **shadcn/ui** | https://ui.shadcn.com | Base component primitives |
| **Radix UI** | https://radix-ui.com | Accessible primitives |
| **Headless UI** | https://headlessui.com | Unstyled components |
| **Tremor** | https://tremor.so | Dashboard/stats components |

### shadcn/ui Recommended Components
```
- Button (primary, secondary, ghost, destructive)
- Input (text, with validation states)
- Card (habit cards, stat cards)
- Dialog (confirmation modals)
- Sheet (bottom sheets for mobile)
- Progress (streak progress bars)
- Toggle (habit completion)
- Calendar (date selection)
- Tabs (settings sections)
- Toast (notifications)
```

### Implementation Notes
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add components
npx shadcn-ui@latest add button card dialog sheet progress toggle
```

---

## 9.2 Animation Resources

### Lottie Animations
| Resource | URL | Use Case |
|----------|-----|----------|
| **LottieFiles** | https://lottiefiles.com | Animation marketplace |
| **IconScout Lottie** | https://iconscout.com/lottie-animations | Icon animations |
| **Lordicon** | https://lordicon.com | Animated icons |

### Recommended Lottie Searches
```
- "fire animation" - Streak fire mascot
- "ice crystal" - Freeze mascot
- "confetti celebration" - Achievement unlock
- "checkmark success" - Habit completion
- "loading flame" - Loading states
- "empty state" - No habits illustration
- "streak counter" - Number animations
- "trophy" - Achievement badges
```

### Lottie Implementation
```bash
npm install lottie-react
```

```tsx
import Lottie from 'lottie-react';
import fireAnimation from './fire.json';

<Lottie 
  animationData={fireAnimation}
  loop={true}
  style={{ width: 120, height: 120 }}
/>
```

### Recommended Lottie Files
1. **Fire Mascot**: https://lottiefiles.com/animations/fire
2. **Success Check**: https://lottiefiles.com/animations/success
3. **Confetti**: https://lottiefiles.com/animations/confetti
4. **Empty State**: https://lottiefiles.com/animations/empty

---

## 9.3 Motion Design Guidelines

### Framer Motion Patterns
```tsx
// Habit card tap feedback
const tapAnimation = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Streak counter increment
const counterAnimation = {
  scale: [1, 1.2, 1],
  transition: { duration: 0.3 }
};

// Checkbox completion
const checkAnimation = {
  pathLength: [0, 1],
  transition: { duration: 0.3, ease: "easeOut" }
};

// Page transitions
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};
```

### Animation Timing Guidelines
| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button tap | 100ms | ease-out |
| Page transition | 200-300ms | ease-in-out |
| Modal open | 200ms | ease-out |
| Modal close | 150ms | ease-in |
| Checkbox toggle | 200ms | spring |
| Counter change | 300ms | spring |
| Celebration | 1000ms | ease-out |

---

## 9.4 Design Inspiration

### Apps to Study
| App | Focus Area | Key Learnings |
|-----|------------|---------------|
| **Streaks** (iOS) | Streak UI | Minimal, focused design |
| **Habitica** | Gamification | RPG mechanics, rewards |
| **Duolingo** | Onboarding | Mascot, encouragement |
| **Headspace** | Animation | Calming micro-interactions |
| **Things 3** | Task UI | Clean, intuitive lists |
| **Forest** | Motivation | Visual progress metaphor |

### Design References
| Resource | URL | Use Case |
|----------|-----|----------|
| **Dribbble** | https://dribbble.com/search/habit-tracker | UI inspiration |
| **Mobbin** | https://mobbin.com | Mobile UI patterns |
| **Screenlane** | https://screenlane.com | UI screenshots |
| **Pttrns** | https://pttrns.com | Mobile patterns |

### Specific Dribbble Searches
```
- "habit tracker app"
- "streak app design"
- "gamification mobile"
- "onboarding illustration"
- "achievement badges UI"
- "calendar mobile"
```

---

## 9.5 Icon Resources

### Icon Libraries
| Resource | URL | Style |
|----------|-----|-------|
| **Lucide** | https://lucide.dev | Clean, consistent |
| **Phosphor** | https://phosphoricons.com | Flexible weights |
| **Heroicons** | https://heroicons.com | Tailwind native |
| **Tabler Icons** | https://tabler-icons.io | 3000+ icons |

### Custom Illustrations
| Resource | URL | Use Case |
|----------|-----|----------|
| **unDraw** | https://undraw.co | Empty states |
| **Blush** | https://blush.design | Character illustrations |
| **Humaaans** | https://humaaans.com | People illustrations |
| **Open Peeps** | https://openpeeps.com | Hand-drawn people |

---

## 9.6 Color System

### Primary Palette
```css
--orange-50: #fff7ed;
--orange-100: #ffedd5;
--orange-200: #fed7aa;
--orange-300: #fdba74;
--orange-400: #fb923c;
--orange-500: #f97316;  /* Primary */
--orange-600: #ea580c;
--orange-700: #c2410c;
--orange-800: #9a3412;
--orange-900: #7c2d12;
```

### Semantic Colors
```css
--success: #10b981;  /* Completion */
--warning: #f59e0b;  /* Streak at risk */
--error: #ef4444;    /* Destructive */
--info: #06b6d4;     /* Freeze */
```

### Dark Mode Palette
```css
--background: #0f0f0f;
--surface: #1a1a1a;
--surface-elevated: #262626;
--text-primary: #fafafa;
--text-secondary: #a3a3a3;
--border: #2e2e2e;
```

---

## 9.7 Typography

### Font Stack
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Cal Sans', 'Inter', sans-serif;
```

### Type Scale
| Name | Size | Weight | Use Case |
|------|------|--------|----------|
| Display | 32px | 700 | Streak numbers |
| H1 | 24px | 700 | Screen titles |
| H2 | 20px | 600 | Section headers |
| H3 | 18px | 600 | Card titles |
| Body | 16px | 400 | Default text |
| Small | 14px | 400 | Secondary text |
| Caption | 12px | 500 | Labels, hints |

### Font Resources
| Font | URL | License |
|------|-----|---------|
| Inter | https://rsms.me/inter | Open Font License |
| Cal Sans | https://github.com/calcom/font | Open Font License |

---

## 9.8 Accessibility Checklist

### WCAG 2.1 AA Requirements
- [ ] Color contrast ≥ 4.5:1 (normal text)
- [ ] Color contrast ≥ 3:1 (large text, UI)
- [ ] Touch targets ≥ 44x44px
- [ ] Focus indicators visible
- [ ] Screen reader labels on all interactive elements
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Content readable at 200% zoom
- [ ] No information conveyed by color alone

### Testing Tools
| Tool | URL | Purpose |
|------|-----|---------|
| axe DevTools | Chrome extension | Automated testing |
| WAVE | https://wave.webaim.org | Web accessibility |
| Contrast Checker | https://webaim.org/resources/contrastchecker | Color contrast |
| VoiceOver | macOS/iOS | Screen reader testing |
| TalkBack | Android | Screen reader testing |

---

## 9.9 Prototyping Tools

### Recommended Tools
| Tool | URL | Use Case |
|------|-----|----------|
| **Figma** | https://figma.com | Design & prototyping |
| **Framer** | https://framer.com | Interactive prototypes |
| **Principle** | https://principleformac.com | Animation prototypes |
| **ProtoPie** | https://protopie.io | Complex interactions |

### Figma Resources
- [Habit Tracker UI Kit](https://www.figma.com/community/search?model_type=hub_files&q=habit%20tracker)
- [Mobile App Template](https://www.figma.com/community/search?model_type=hub_files&q=mobile%20app)
- [shadcn/ui Figma](https://www.figma.com/community/file/1203061493325953101)

---

# 10. RISK ASSESSMENT

## 10.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| PWA limitations on iOS | High | Medium | Clear communication of limitations, prioritize native |
| Offline sync conflicts | Medium | High | Implement conflict resolution strategy |
| Animation performance | Medium | Medium | Test on low-end devices, provide reduced motion |
| Push notification deliverability | Medium | Medium | Multiple notification providers, in-app reminders |

## 10.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low conversion to premium | High | High | A/B test pricing, optimize paywall |
| High churn rate | Medium | High | Focus on onboarding, streak mechanics |
| App store rejection | Low | High | Follow guidelines strictly, prepare appeals |
| Competitor feature copy | Medium | Low | Rapid iteration, focus on UX quality |

## 10.3 Timeline Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scope creep | High | Medium | Strict backlog management, MVP focus |
| Design iteration delays | Medium | Medium | Early design freeze, parallel workstreams |
| Third-party API changes | Low | Medium | Abstract integrations, have fallbacks |

---

# 11. SUCCESS METRICS

## 11.1 Key Performance Indicators (KPIs)

### Acquisition
| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| Monthly Active Users | 10,000 | 50,000 |
| Daily Active Users | 3,000 | 20,000 |
| App Store Rating | 4.5+ | 4.7+ |

### Engagement
| Metric | Target |
|--------|--------|
| Day 1 Retention | 60% |
| Day 7 Retention | 40% |
| Day 30 Retention | 25% |
| Daily Completions per User | 3+ |
| Avg Session Duration | 2 minutes |

### Revenue
| Metric | Target (Month 6) |
|--------|------------------|
| Premium Conversion Rate | 5% |
| Monthly Recurring Revenue | $10,000 |
| Customer Lifetime Value | $25 |
| Churn Rate | < 8% monthly |

### Performance
| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Time to Interactive | < 2s |
| Crash-Free Sessions | > 99.5% |
| API Uptime | > 99.9% |

## 11.2 Analytics Events to Track

### Onboarding
```
onboarding_started
onboarding_slide_viewed { slide_number }
onboarding_completed
onboarding_skipped { at_slide }
```

### Habit Management
```
habit_created { goal, freeze_mode }
habit_completed { habit_id, streak }
habit_uncompleted { habit_id }
habit_edited { habit_id, field }
habit_deleted { habit_id, streak_at_delete }
habit_archived { habit_id }
```

### Engagement
```
app_opened { source }
streak_milestone_reached { habit_id, milestone }
freeze_used { habit_id }
achievement_unlocked { achievement_type }
```

### Premium
```
paywall_viewed { trigger }
subscription_started { plan }
subscription_cancelled { reason }
```

---

# APPENDICES

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| Streak | Consecutive days a habit is completed |
| Freeze | Protection that preserves streak when a day is missed |
| Completion | A single instance of marking a habit done |
| Goal | Target streak length (7, 14, 30, 50 days) |

## Appendix B: Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 2025 | Product Team | Initial release |

---

**Document Status**: APPROVED FOR DEVELOPMENT  
**Next Review Date**: End of Phase 1 (Week 8)
