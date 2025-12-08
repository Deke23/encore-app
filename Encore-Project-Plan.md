# Encore Habit Tracker
## Project Plan & Sprint Breakdown
### Product Owner: Dekene | Version 1.0

---

# PROJECT OVERVIEW

## Timeline Summary
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: PWA                    │ PHASE 2: MOBILE        │ PHASE 3: PREMIUM │
│ Weeks 1-8                       │ Weeks 9-20             │ Weeks 21-26      │
├─────────────────────────────────┼────────────────────────┼──────────────────┤
│ ████████████████████████████████│████████████████████████│██████████████████│
│ Foundation → Core → Polish      │ RN Setup → Features    │ Premium → Growth │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Team Structure
| Role | Count | Responsibility | Key Skills |
|------|-------|----------------|------------|
| Product Owner | 1 | Requirements, prioritization, acceptance | Domain knowledge, stakeholder management |
| Tech Lead | 1 | Architecture, code review, technical decisions | Full-stack, Docker, DevOps |
| Frontend Developer | 2 | PWA & mobile implementation | React, TypeScript, Tailwind |
| Backend Developer | 1 | API, database, infrastructure | FastAPI, PostgreSQL, Keycloak, Docker |
| UI/UX Designer | 1 | Design system, prototypes, user research | Figma, mobile UX, animation |
| QA Engineer | 1 | Testing, automation, quality gates | pytest, Playwright, API testing |

### Backend Developer Requirements
- Strong Python 3.11+ experience
- FastAPI framework expertise
- SQLAlchemy (async) and Alembic
- Keycloak/OIDC integration
- Casbin authorization
- Docker and Docker Compose
- PostgreSQL administration
- Redis caching patterns
- Celery background tasks
- pytest testing

---

# PHASE 1: PROGRESSIVE WEB APP (8 WEEKS)

## Sprint 0: Infrastructure Setup (Pre-Sprint)
**Duration**: 3 days before Sprint 1  
**Sprint Goal**: Set up Docker infrastructure and development environment

### Deliverables

#### D0.1: Docker Infrastructure
**Owner**: Tech Lead / Backend Dev  
**Estimate**: 2 days

- [ ] Create docker-compose.yml with all services
- [ ] Configure PostgreSQL with multiple databases
- [ ] Set up Keycloak container with realm import
- [ ] Configure Redis container
- [ ] Set up Nginx reverse proxy
- [ ] Create .env.example with all variables
- [ ] Write database initialization scripts
- [ ] Test full stack startup with `docker-compose up`

**Acceptance Criteria**:
- `docker-compose up` starts all services
- Keycloak admin console accessible
- PostgreSQL databases created
- Redis accepting connections
- All services communicate via Docker network

#### D0.2: Keycloak Configuration
**Owner**: Backend Developer  
**Estimate**: 1 day

- [ ] Create "encore" realm
- [ ] Configure encore-web client (public, PKCE)
- [ ] Configure encore-api client (bearer-only)
- [ ] Configure encore-mobile client (public)
- [ ] Set up user roles (user, premium, admin)
- [ ] Configure token lifespans
- [ ] Export realm configuration for version control
- [ ] Test OIDC flow with Postman

**Realm Configuration**:
```
Clients:
├── encore-web (public, authorization code + PKCE)
├── encore-api (bearer-only, resource server)
└── encore-mobile (public, authorization code + PKCE)

Roles:
├── user (default)
├── premium
└── admin

Token Settings:
├── Access Token Lifespan: 15 minutes
├── Refresh Token Lifespan: 30 days
└── SSO Session Idle: 30 days
```

---

## Sprint 1: Project Foundation
**Duration**: Week 1 (5 days)  
**Sprint Goal**: Establish development environment and design system foundation

### Deliverables

#### D1.1: Frontend Development Environment Setup
**Owner**: Tech Lead  
**Estimate**: 1 day

- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up ESLint + Prettier
- [ ] Configure path aliases
- [ ] Initialize Git repository with branching strategy
- [ ] Set up GitHub Actions CI pipeline
- [ ] Configure Keycloak JS adapter
- [ ] Set up environment variables

**Acceptance Criteria**:
- `npm run dev` starts development server < 3 seconds
- `npm run build` completes without errors
- Keycloak login flow works locally
- All team members can clone and run locally

#### D1.2: Backend Project Setup
**Owner**: Backend Developer  
**Estimate**: 2 days

- [ ] Initialize FastAPI project structure
- [ ] Configure SQLAlchemy async engine
- [ ] Set up Alembic for migrations
- [ ] Implement Pydantic settings management
- [ ] Create Keycloak token validation dependency
- [ ] Set up Casbin with PostgreSQL adapter
- [ ] Configure pytest with async support
- [ ] Create Dockerfile for API service
- [ ] Set up pre-commit hooks (Ruff, Black)

**Project Structure**:
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Pydantic settings
│   ├── database.py          # SQLAlchemy setup
│   ├── api/                  # Route handlers
│   ├── core/                 # Security, Casbin
│   ├── models/               # SQLAlchemy models
│   ├── schemas/              # Pydantic schemas
│   └── services/             # Business logic
├── alembic/                  # Migrations
├── tests/                    # pytest tests
├── Dockerfile
└── requirements.txt
```

**Acceptance Criteria**:
- FastAPI app starts with `uvicorn app.main:app`
- `/health` endpoint returns 200
- Keycloak token validation works
- Database connection established
- Alembic migrations run successfully

#### D1.3: Design System - Foundations
**Owner**: UI/UX Designer + Frontend Dev  
**Estimate**: 2 days

- [ ] Define color palette (light + dark themes)
- [ ] Define typography scale
- [ ] Define spacing system (4px base)
- [ ] Define border radius tokens
- [ ] Define shadow tokens
- [ ] Create Tailwind config with all tokens
- [ ] Set up CSS custom properties for theming

**Acceptance Criteria**:
- All design tokens documented
- Tailwind config reviewed and approved
- Theme switching works at CSS level

#### D1.3: Base Component Library
**Owner**: Frontend Developer  
**Estimate**: 3 days (parallel)

| Component | Variants | Status |
|-----------|----------|--------|
| Button | primary, secondary, ghost, destructive, sizes | [ ] |
| Input | text, error state, disabled | [ ] |
| Card | default, interactive | [ ] |
| Badge | default, colors | [ ] |
| Spinner | sizes | [ ] |
| Icon | wrapper component | [ ] |

**Acceptance Criteria**:
- Components render correctly in Storybook
- All variants documented
- Accessibility attributes present
- Dark mode supported

---

## Sprint 2: Design System Completion
**Duration**: Week 2 (5 days)  
**Sprint Goal**: Complete component library and routing structure

### Deliverables

#### D2.1: Complex Components
**Owner**: Frontend Developer  
**Estimate**: 3 days

| Component | Description | Status |
|-----------|-------------|--------|
| Modal/Dialog | Overlay, animations, focus trap | [ ] |
| BottomSheet | Mobile drawer, drag to dismiss | [ ] |
| Toast | Notification system | [ ] |
| Progress | Linear + circular | [ ] |
| Toggle/Switch | Animated checkbox | [ ] |
| Calendar | Date picker grid | [ ] |
| Tabs | Segmented control | [ ] |

**Acceptance Criteria**:
- All components accessible (keyboard, screen reader)
- Animations respect prefers-reduced-motion
- Touch targets ≥ 44px on interactive elements

#### D2.2: Application Shell
**Owner**: Frontend Developer  
**Estimate**: 2 days

- [ ] Set up React Router
- [ ] Create layout components (Header, BottomNav, PageContainer)
- [ ] Implement navigation structure
- [ ] Add page transition animations
- [ ] Configure lazy loading for routes

**Routes Structure**:
```
/                   → Home (habit list)
/onboarding         → Onboarding flow
/habit/new          → Create habit wizard
/habit/:id          → Habit detail
/habit/:id/edit     → Edit habit
/stats              → Statistics
/settings           → Settings
```

#### D2.3: State Management Setup
**Owner**: Frontend Developer  
**Estimate**: 1 day

- [ ] Set up Zustand store
- [ ] Define store slices (habits, user, ui)
- [ ] Implement persistence middleware (localStorage)
- [ ] Add devtools integration

**Store Structure**:
```typescript
interface AppState {
  // User
  user: User | null;
  isOnboarded: boolean;
  
  // Habits
  habits: Habit[];
  completions: Record<string, Completion[]>;
  
  // UI
  theme: 'light' | 'dark' | 'system';
  selectedDate: string;
  
  // Actions
  addHabit: (habit: Habit) => void;
  toggleCompletion: (habitId: string, date: string) => void;
  // ...
}
```

---

## Sprint 3: Onboarding Flow + Backend Core
**Duration**: Week 3 (5 days)  
**Sprint Goal**: Implement complete onboarding experience and core backend APIs

### Frontend Deliverables

#### D3.1: Onboarding Carousel
**Owner**: Frontend Developer  
**Estimate**: 2 days

- [ ] Create OnboardingScreen component
- [ ] Implement 3-slide carousel with swipe
- [ ] Add dot indicators
- [ ] Create slide content components
- [ ] Add skip functionality
- [ ] Implement "Start my first streak" CTA

**Slide Content**:
| Slide | Headline | Visual |
|-------|----------|--------|
| 1 | "Build core habits. Again and again." | Fire mascot + sample habit card |
| 2 | "Got a 7+ day streak? Use a Freeze." | Ice mascot + freeze explanation |
| 3 | "Ready to build lasting habits?" | Orange streak card preview |

#### D3.2: Fire Mascot Animation
**Owner**: UI/UX Designer + Frontend Dev  
**Estimate**: 1 day

- [ ] Source/create fire mascot Lottie animation
- [ ] Source/create ice/freeze mascot Lottie
- [ ] Implement Lottie player component
- [ ] Create fallback static SVGs
- [ ] Optimize animation file sizes (< 50KB each)

#### D3.3: Habit Creation Wizard
**Owner**: Frontend Developer  
**Estimate**: 2 days

**Step 1 - Name Input**:
- [ ] Text input with character counter
- [ ] Advanced settings toggle (initial streak)
- [ ] Validation (non-empty, max 50 chars)

**Step 2 - Freeze Mode**:
- [ ] Two option cards (Active/Inactive)
- [ ] Mascot icons on cards
- [ ] Single selection behavior

**Step 3 - Streak Goal**:
- [ ] Four preset options (7, 14, 30, 50)
- [ ] Selection cards with fire icons
- [ ] Visual progress indicators

**Step 4 - Confirmation**:
- [ ] Summary of all selections
- [ ] "Create your habit" CTA
- [ ] Success animation

### Backend Deliverables

#### D3.4: User & Habit Models
**Owner**: Backend Developer  
**Estimate**: 1 day

- [ ] Create SQLAlchemy models (User, Habit, Completion)
- [ ] Write Alembic migrations
- [ ] Create Pydantic schemas for request/response
- [ ] Set up user sync from Keycloak (on first login)

**Migration**:
```bash
alembic revision --autogenerate -m "create_initial_tables"
alembic upgrade head
```

#### D3.5: Habits API Endpoints
**Owner**: Backend Developer  
**Estimate**: 2 days

```python
# Endpoints to implement
POST   /api/v1/habits           # Create habit
GET    /api/v1/habits           # List user's habits
GET    /api/v1/habits/{id}      # Get habit detail
PATCH  /api/v1/habits/{id}      # Update habit
DELETE /api/v1/habits/{id}      # Delete habit
```

- [ ] Implement CRUD endpoints with async SQLAlchemy
- [ ] Add Keycloak authentication dependency
- [ ] Add Casbin permission checks
- [ ] Write unit tests for each endpoint
- [ ] Add OpenAPI documentation

**Example Endpoint**:
```python
@router.post("/", response_model=HabitResponse, status_code=201)
async def create_habit(
    habit_data: HabitCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Create a new habit for the authenticated user."""
    # Check habit limit for free users
    if not current_user.get("is_premium"):
        habit_count = await habit_service.count_user_habits(db, current_user["id"])
        if habit_count >= 3:
            raise HTTPException(
                status_code=403, 
                detail="Free users limited to 3 habits"
            )
    
    habit = await habit_service.create_habit(
        db, 
        user_id=current_user["id"], 
        habit_data=habit_data
    )
    return habit
```

#### D3.6: Progress Bar Component
**Owner**: Frontend Developer  
**Estimate**: 0.5 days

- [ ] Multi-step progress indicator
- [ ] Animated fill transitions
- [ ] Back navigation support

---

## Sprint 4: Core Habit Tracking + Completions API
**Duration**: Week 4 (5 days)  
**Sprint Goal**: Implement primary habit tracking functionality with full backend integration

### Frontend Deliverables

#### D4.1: Home Screen Header
**Owner**: Frontend Developer  
**Estimate**: 0.5 days

- [ ] Encore logo component
- [ ] Premium badge button
- [ ] Current date display

#### D4.2: Week Strip Calendar
**Owner**: Frontend Developer  
**Estimate**: 1 day

- [ ] Horizontal scrollable week view
- [ ] Day selection behavior
- [ ] Today highlighting
- [ ] Selected day styling
- [ ] Date change triggers habit list update
- [ ] Smooth scroll performance

#### D4.3: Habit List
**Owner**: Frontend Developer  
**Estimate**: 1.5 days

- [ ] Habit card component
- [ ] Streak count display
- [ ] Fire icon (orange active / gray inactive)
- [ ] Completion checkbox
- [ ] One-tap completion toggle
- [ ] Optimistic UI updates with React Query
- [ ] Empty state (no habits)
- [ ] API integration with TanStack Query

#### D4.4: Floating Action Button
**Owner**: Frontend Developer  
**Estimate**: 0.5 days

- [ ] FAB component with positioning
- [ ] Tap animation feedback
- [ ] Navigation to habit creation
- [ ] Safe area handling

### Backend Deliverables

#### D4.5: Completions API
**Owner**: Backend Developer  
**Estimate**: 1.5 days

```python
# Endpoints to implement
POST   /api/v1/habits/{id}/completions           # Log completion
GET    /api/v1/habits/{id}/completions           # Get completions (date range)
DELETE /api/v1/habits/{id}/completions/{date}    # Remove completion
```

- [ ] Implement completion CRUD endpoints
- [ ] Add date range query parameters
- [ ] Prevent duplicate completions (same habit + date)
- [ ] Update habit statistics on completion
- [ ] Write unit tests

**Example Endpoint**:
```python
@router.post("/{habit_id}/completions", response_model=CompletionResponse, status_code=201)
async def log_completion(
    habit_id: UUID,
    completion_data: CompletionCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Log a habit completion for a specific date."""
    habit = await habit_service.get_habit(db, habit_id, current_user["id"])
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    completion = await completion_service.create_completion(
        db, 
        habit_id=habit_id, 
        completion_data=completion_data
    )
    
    # Recalculate streak
    await streak_service.recalculate_streak(db, habit_id)
    
    return completion
```

#### D4.6: Streak Calculation Service
**Owner**: Backend Developer  
**Estimate**: 1.5 days

- [ ] Implement streak calculation algorithm
- [ ] Handle timezone considerations
- [ ] Calculate current streak from completions
- [ ] Calculate best streak
- [ ] Integrate freeze logic into calculation
- [ ] Create background task for daily streak updates
- [ ] Write comprehensive unit tests for edge cases

**Streak Service**:
```python
# app/services/streak_service.py
from datetime import date, timedelta
from sqlalchemy.ext.asyncio import AsyncSession

class StreakService:
    async def calculate_current_streak(
        self, 
        db: AsyncSession, 
        habit_id: UUID,
        user_timezone: str = "UTC"
    ) -> int:
        """
        Calculate current streak for a habit.
        Considers freeze days (don't break streak, but don't add).
        """
        completions = await self.get_completions_desc(db, habit_id)
        today = date.today()  # Should be user's timezone
        
        streak = 0
        current_date = today
        freezes_used = 0
        
        completion_dates = {c.date for c in completions}
        
        while True:
            if current_date in completion_dates:
                streak += 1
                current_date -= timedelta(days=1)
            elif self._can_use_freeze(habit_id, freezes_used):
                # Freeze day - don't break streak but don't increment
                freezes_used += 1
                current_date -= timedelta(days=1)
            else:
                break
        
        return streak
    
    async def recalculate_streak(self, db: AsyncSession, habit_id: UUID):
        """Recalculate and update habit's streak values."""
        current_streak = await self.calculate_current_streak(db, habit_id)
        best_streak = await self.calculate_best_streak(db, habit_id)
        
        await habit_service.update_streaks(
            db, habit_id, 
            current_streak=current_streak,
            best_streak=max(current_streak, best_streak)
        )
```

**Edge Cases to Test**:
- Habit created today (streak = 0 or 1?)
- Completion logged retroactively
- Timezone boundary (completion at 11:59 PM)
- Freeze used mid-streak
- Multiple freezes in a row
- Edit existing completion

---

## Sprint 5: Habit Management + Freeze System
**Duration**: Week 5 (5 days)  
**Sprint Goal**: Enable full habit CRUD operations with freeze system

### Frontend Deliverables

#### D5.1: Habit Detail View
**Owner**: Frontend Developer  
**Estimate**: 2 days

**Sections**:
- [ ] Header (name, icon, current streak)
- [ ] Calendar heatmap (monthly completions)
- [ ] Statistics cards (best streak, total, rate)
- [ ] Settings section
- [ ] Delete/Archive options

#### D5.2: Edit Habit Flow
**Owner**: Frontend Developer  
**Estimate**: 1 day

- [ ] Edit mode bottom sheet
- [ ] Name editing
- [ ] Goal modification
- [ ] Freeze mode toggle
- [ ] Auto-save behavior
- [ ] Cancel reverts changes

#### D5.3: Delete/Archive Functionality
**Owner**: Frontend Developer  
**Estimate**: 0.5 days

- [ ] Delete confirmation modal
- [ ] Archive option (soft delete)
- [ ] Undo toast (10 seconds)
- [ ] Data cleanup

### Backend Deliverables

#### D5.4: Freeze System Service
**Owner**: Backend Developer  
**Estimate**: 2 days

- [ ] Implement freeze earning logic (1 per 7 consecutive days)
- [ ] Maximum freeze storage (2)
- [ ] Auto-apply freeze at midnight (Celery task)
- [ ] Freeze usage tracking
- [ ] Freeze history endpoint
- [ ] Write unit tests

**Freeze Service**:
```python
# app/services/freeze_service.py
class FreezeService:
    MAX_FREEZES = 2
    DAYS_TO_EARN_FREEZE = 7
    
    async def check_and_award_freeze(
        self, 
        db: AsyncSession, 
        habit_id: UUID
    ) -> bool:
        """
        Check if user earned a new freeze.
        Called after each completion.
        """
        habit = await habit_service.get_habit(db, habit_id)
        
        if habit.freezes_available >= self.MAX_FREEZES:
            return False
        
        # Count consecutive completions without freeze
        consecutive = await self._count_consecutive_no_freeze(db, habit_id)
        
        if consecutive >= self.DAYS_TO_EARN_FREEZE:
            await self._award_freeze(db, habit_id)
            return True
        
        return False
    
    async def apply_freeze(
        self, 
        db: AsyncSession, 
        habit_id: UUID, 
        date: date
    ) -> bool:
        """
        Apply a freeze for a missed day.
        Returns True if freeze was applied.
        """
        habit = await habit_service.get_habit(db, habit_id)
        
        if not habit.freeze_mode or habit.freezes_available <= 0:
            return False
        
        # Create a "freeze" completion
        await completion_service.create_freeze_completion(db, habit_id, date)
        
        # Decrement available freezes
        await habit_service.decrement_freezes(db, habit_id)
        
        return True
```

**Celery Task for Daily Freeze Check**:
```python
# app/worker/tasks.py
from celery import shared_task
from datetime import date, timedelta

@shared_task
def daily_freeze_check():
    """
    Run at midnight to apply freezes for missed days.
    """
    yesterday = date.today() - timedelta(days=1)
    
    # Get all habits that weren't completed yesterday
    habits = get_incomplete_habits_for_date(yesterday)
    
    for habit in habits:
        if habit.freeze_mode and habit.freezes_available > 0:
            apply_freeze(habit.id, yesterday)
        else:
            # Streak broken - reset
            reset_streak(habit.id)
```

#### D5.5: Statistics API
**Owner**: Backend Developer  
**Estimate**: 1 day

```python
# Endpoints to implement
GET /api/v1/stats/overview           # User dashboard stats
GET /api/v1/stats/habits/{id}        # Habit-specific stats
```

- [ ] Implement stats aggregation queries
- [ ] Calculate completion rate
- [ ] Day-of-week analysis
- [ ] Best/worst habits ranking

**Stats Response Schema**:
```python
class HabitStatsResponse(BaseModel):
    habit_id: UUID
    current_streak: int
    best_streak: int
    total_completions: int
    completion_rate: float  # 0.0 - 1.0
    freezes_used: int
    day_of_week_breakdown: dict[str, int]  # {"monday": 5, "tuesday": 3, ...}
    monthly_completions: list[MonthlyData]
```

---

## Sprint 6: Settings & Theming
**Duration**: Week 6 (5 days)  
**Sprint Goal**: Complete settings and visual customization

### Deliverables

#### D6.1: Settings Screen
**Owner**: Frontend Developer  
**Estimate**: 1.5 days

**Sections**:
- [ ] Premium section (upgrade CTA, restore)
- [ ] Appearance (theme toggle)
- [ ] App settings (language, week start)
- [ ] About section (version, links)

#### D6.2: Theme Switching
**Owner**: Frontend Developer  
**Estimate**: 1 day

- [ ] Light theme implementation
- [ ] Dark theme implementation
- [ ] System preference detection
- [ ] Persist preference
- [ ] Smooth transition animation

#### D6.3: Statistics Screen (Basic)
**Owner**: Frontend Developer  
**Estimate**: 1.5 days

- [ ] Overall completion rate
- [ ] Total streaks summary
- [ ] Premium upsell overlay
- [ ] Basic charts (completion trend)

#### D6.4: Micro-interactions & Polish
**Owner**: Frontend Developer  
**Estimate**: 1 day

- [ ] Button tap animations
- [ ] Card press states
- [ ] Page transitions refinement
- [ ] Loading states
- [ ] Error states

---

## Sprint 7: PWA, Offline & Docker Deployment
**Duration**: Week 7 (5 days)  
**Sprint Goal**: Enable PWA capabilities, offline support, and production deployment

### Frontend Deliverables

#### D7.1: PWA Configuration
**Owner**: Frontend Developer  
**Estimate**: 1.5 days

- [ ] Create manifest.json
- [ ] Generate app icons (all sizes)
- [ ] Create splash screens
- [ ] Configure theme colors
- [ ] Set up Workbox service worker
- [ ] Test "Add to Home Screen"

#### D7.2: Offline Support
**Owner**: Frontend Developer  
**Estimate**: 2 days

- [ ] Cache static assets (cache-first)
- [ ] Cache API responses (network-first)
- [ ] Offline detection
- [ ] Offline indicator UI
- [ ] Queue offline mutations (React Query)
- [ ] Sync when online
- [ ] Handle Keycloak token refresh offline

### Backend Deliverables

#### D7.3: User API & GDPR Compliance
**Owner**: Backend Developer  
**Estimate**: 1.5 days

```python
# Endpoints to implement
GET    /api/v1/users/me           # Get current user profile
PATCH  /api/v1/users/me           # Update profile
DELETE /api/v1/users/me           # Delete account (GDPR)
GET    /api/v1/users/me/export    # Export all data (GDPR)
```

- [ ] Implement user profile endpoints
- [ ] Sync user data from Keycloak on first login
- [ ] Implement data export (JSON format)
- [ ] Implement account deletion (cascade all data)
- [ ] Add rate limiting to sensitive endpoints

#### D7.4: Production Docker Configuration
**Owner**: Tech Lead / DevOps  
**Estimate**: 1.5 days

- [ ] Create production docker-compose.prod.yml
- [ ] Configure Nginx with SSL termination
- [ ] Set up Let's Encrypt certificates
- [ ] Configure production environment variables
- [ ] Set up database backups (pg_dump cron)
- [ ] Configure log aggregation
- [ ] Set up health check endpoints
- [ ] Create deployment scripts

**Production Docker Compose**:
```yaml
# docker-compose.prod.yml
version: '3.9'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - certbot-webroot:/var/www/certbot:ro
    depends_on:
      - api
      - keycloak
    restart: always

  api:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      - ENVIRONMENT=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - KEYCLOAK_URL=${KEYCLOAK_URL}
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
    restart: always

  keycloak:
    image: quay.io/keycloak/keycloak:24.0
    command: start --optimized
    environment:
      - KC_DB=postgres
      - KC_DB_URL=${KEYCLOAK_DB_URL}
      - KC_HOSTNAME=${KEYCLOAK_HOSTNAME}
      - KC_PROXY=edge
    restart: always

  postgres:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: always

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    restart: always

  certbot:
    image: certbot/certbot
    volumes:
      - certbot-webroot:/var/www/certbot
      - ./nginx/ssl:/etc/letsencrypt
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"

volumes:
  postgres_data:
  certbot-webroot:
```

**Nginx Production Config**:
```nginx
# nginx/nginx.prod.conf
upstream api {
    server api:8000;
}

upstream keycloak {
    server keycloak:8080;
}

server {
    listen 80;
    server_name encore.app www.encore.app;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name encore.app www.encore.app;
    
    ssl_certificate /etc/nginx/ssl/live/encore.app/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/encore.app/privkey.pem;
    
    # API
    location /api {
        proxy_pass http://api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Keycloak
    location /auth {
        proxy_pass http://keycloak;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Frontend (PWA)
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Sprint 8: Testing, Integration & Launch
**Duration**: Week 8 (5 days)  
**Sprint Goal**: Quality assurance, full integration testing, and production deployment

### Deliverables

#### D8.1: Frontend Testing
**Owner**: QA Engineer + Frontend Dev  
**Estimate**: 2 days

**Unit Tests (Vitest)**:
- [ ] Component rendering tests
- [ ] Hook logic tests
- [ ] Utility function tests

**Integration Tests**:
- [ ] Onboarding flow
- [ ] Habit creation flow
- [ ] Completion toggle
- [ ] Settings changes
- [ ] Keycloak authentication flow

**E2E Tests (Playwright)**:
- [ ] Happy path (new user → create habit → complete)
- [ ] Returning user flow
- [ ] Offline behavior

**Cross-Browser Testing**:
| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | [ ] | [ ] |
| Safari | [ ] | [ ] |
| Firefox | [ ] | [ ] |
| Edge | [ ] | [ ] |

#### D8.2: Backend Testing
**Owner**: QA Engineer + Backend Dev  
**Estimate**: 1.5 days

**Unit Tests (pytest)**:
- [ ] Streak calculation logic (all edge cases)
- [ ] Freeze system logic
- [ ] Casbin permission checks
- [ ] Service layer functions

**Integration Tests**:
- [ ] Full API endpoint tests
- [ ] Database transactions
- [ ] Keycloak token validation
- [ ] Rate limiting

**Load Testing (Locust)**:
- [ ] 100 concurrent users
- [ ] API response times < 500ms
- [ ] No memory leaks

```python
# tests/test_habits.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_create_habit(authenticated_client: AsyncClient):
    response = await authenticated_client.post(
        "/api/v1/habits",
        json={
            "name": "Morning Run",
            "freeze_mode": True,
            "streak_goal": 30
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Morning Run"
    assert data["current_streak"] == 0

@pytest.mark.asyncio
async def test_streak_calculation():
    """Test streak calculation with various scenarios."""
    from app.services.streak_service import StreakService
    
    service = StreakService()
    
    # Test consecutive completions
    completions = create_mock_completions(days=[0, 1, 2, 3])  # Today and 3 days back
    streak = await service.calculate_streak(completions)
    assert streak == 4
    
    # Test with gap (no freeze)
    completions = create_mock_completions(days=[0, 1, 3, 4])  # Gap on day 2
    streak = await service.calculate_streak(completions)
    assert streak == 2  # Only today + yesterday
```

#### D8.3: Accessibility Audit
**Owner**: QA Engineer  
**Estimate**: 0.5 days

- [ ] Automated axe testing
- [ ] Manual keyboard navigation
- [ ] Screen reader testing (VoiceOver, TalkBack)
- [ ] Color contrast verification
- [ ] Focus management review

#### D8.4: Production Deployment
**Owner**: Tech Lead  
**Estimate**: 1 day

**Pre-Deployment Checklist**:
- [ ] All tests passing (frontend + backend)
- [ ] Environment variables configured
- [ ] SSL certificates issued
- [ ] Database migrations run
- [ ] Keycloak realm imported
- [ ] Casbin policies loaded
- [ ] Redis configured
- [ ] Nginx config verified
- [ ] Health checks passing

**Deployment Steps**:
```bash
# 1. Build and push images
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml push

# 2. Deploy to server
ssh production "cd /opt/encore && docker-compose -f docker-compose.prod.yml pull"
ssh production "cd /opt/encore && docker-compose -f docker-compose.prod.yml up -d"

# 3. Run migrations
ssh production "docker-compose exec api alembic upgrade head"

# 4. Verify health
curl https://encore.app/api/health
curl https://encore.app/auth/realms/encore
```

**Monitoring Setup**:
- [ ] Sentry error tracking (frontend + backend)
- [ ] PostHog analytics
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Log aggregation (Loki or CloudWatch)
- [ ] Database monitoring (pg_stat_statements)

---

## Phase 1 Exit Criteria

### Frontend Functionality
- [ ] User can complete onboarding
- [ ] User can create habits with wizard
- [ ] User can mark habits complete/incomplete
- [ ] User can view/edit/delete habits
- [ ] Streak display updates correctly
- [ ] Freeze system works correctly
- [ ] Settings persist correctly
- [ ] Dark mode fully functional
- [ ] PWA installable
- [ ] Offline mode functional

### Backend Functionality
- [ ] All API endpoints implemented and tested
- [ ] Keycloak authentication working
- [ ] Casbin authorization enforced
- [ ] Streak calculation accurate
- [ ] Freeze system auto-applies
- [ ] Database migrations complete
- [ ] Background tasks running (Celery)

### Quality
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] API response times < 500ms (p95)
- [ ] Zero critical bugs
- [ ] Zero high-priority bugs
- [ ] E2E tests passing
- [ ] Backend test coverage > 80%

### Infrastructure
- [ ] Docker Compose stack running in production
- [ ] SSL certificates active
- [ ] Health checks passing
- [ ] Monitoring and alerting active
- [ ] Database backups configured
- [ ] Error tracking collecting data
- [ ] Analytics collecting data

---

# PHASE 2: MOBILE APP (12 WEEKS)

## Sprint 9-10: React Native Foundation
**Duration**: Weeks 9-10  
**Sprint Goal**: Set up React Native project with shared architecture

### Deliverables
- [ ] Initialize Expo project
- [ ] Set up navigation (React Navigation)
- [ ] Port design system to React Native
- [ ] Configure native animations (Reanimated)
- [ ] Set up storage (MMKV)
- [ ] Configure CI/CD for mobile

---

## Sprint 11-14: Feature Parity
**Duration**: Weeks 11-14  
**Sprint Goal**: Port all PWA features to mobile

### Deliverables
- [ ] Onboarding screens
- [ ] Habit creation wizard
- [ ] Home screen with habit list
- [ ] Habit detail view
- [ ] Settings screen
- [ ] Platform-specific UI adjustments

---

## Sprint 15-16: Native Features
**Duration**: Weeks 15-16  
**Sprint Goal**: Implement mobile-specific capabilities

### Deliverables
- [ ] Push notifications (Notifee)
- [ ] Haptic feedback
- [ ] Widget (iOS/Android)
- [ ] Deep linking
- [ ] Share functionality

---

## Sprint 17-18: Polish & Beta
**Duration**: Weeks 17-18  
**Sprint Goal**: Beta testing and refinement

### Deliverables
- [ ] TestFlight deployment
- [ ] Play Console internal testing
- [ ] Beta tester feedback collection
- [ ] Bug fixes
- [ ] Performance optimization

---

## Sprint 19-20: App Store Launch
**Duration**: Weeks 19-20  
**Sprint Goal**: Submit and launch on app stores

### Deliverables
- [ ] App Store screenshots
- [ ] App Store description
- [ ] Privacy policy
- [ ] App review submission
- [ ] Launch coordination

---

# PHASE 3: PREMIUM & GROWTH (6 WEEKS)

## Sprint 21-23: Premium Features
**Duration**: Weeks 21-23  
**Sprint Goal**: Implement premium subscription and advanced features

### Backend Deliverables

#### Premium API Endpoints
```python
# Premium-only endpoints (Casbin enforced)
GET  /api/v1/stats/advanced          # Advanced analytics
POST /api/v1/export                  # Full data export
GET  /api/v1/habits/unlimited        # Unlimited habit creation
POST /api/v1/goals/custom            # Custom streak goals
```

#### Payment Integration (Stripe)
- [ ] Stripe webhook handlers
- [ ] Subscription lifecycle management
- [ ] Sync premium status to Keycloak roles
- [ ] Handle subscription cancellation
- [ ] Implement trial period logic

```python
# app/api/v1/payments.py
@router.post("/webhook")
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """Handle Stripe webhook events."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    event = stripe.Webhook.construct_event(
        payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
    )
    
    if event["type"] == "customer.subscription.created":
        await handle_subscription_created(db, event["data"]["object"])
    elif event["type"] == "customer.subscription.deleted":
        await handle_subscription_cancelled(db, event["data"]["object"])
    
    return {"status": "success"}

async def handle_subscription_created(db: AsyncSession, subscription):
    """Upgrade user to premium in Keycloak."""
    user_id = subscription["metadata"]["user_id"]
    
    # Add premium role in Keycloak
    await keycloak_admin.assign_role(user_id, "premium")
    
    # Update user in database
    await user_service.update_premium_status(
        db, user_id, 
        is_premium=True,
        expires_at=datetime.fromtimestamp(subscription["current_period_end"])
    )
```

#### Advanced Statistics Service
- [ ] Habit correlations analysis
- [ ] Prediction model for streak breaks
- [ ] Personalized insights generation
- [ ] Weekly/monthly reports (Celery scheduled task)

### Frontend Deliverables
- [ ] Premium upgrade paywall
- [ ] Stripe Checkout integration
- [ ] Advanced statistics dashboard
- [ ] Data export UI
- [ ] Custom goal creation

---

## Sprint 24-26: Growth Features
### Deliverables
- [ ] Referral system
- [ ] Social sharing
- [ ] Achievement sharing
- [ ] A/B testing framework
- [ ] Push notification campaigns

---

# APPENDIX A: SPRINT CEREMONIES

## Daily Standup
**Time**: 15 minutes  
**Frequency**: Daily  
**Format**:
1. What I completed yesterday
2. What I'm working on today
3. Any blockers

## Sprint Planning
**Time**: 2 hours  
**Frequency**: Start of sprint  
**Agenda**:
1. Sprint goal definition
2. Backlog refinement
3. Story estimation
4. Capacity planning
5. Commitment

## Sprint Review
**Time**: 1 hour  
**Frequency**: End of sprint  
**Agenda**:
1. Demo completed work
2. Stakeholder feedback
3. Backlog updates

## Sprint Retrospective
**Time**: 1 hour  
**Frequency**: End of sprint  
**Format**:
1. What went well
2. What could improve
3. Action items

---

# APPENDIX B: BACKEND SETUP GUIDE

## Local Development Setup

### Prerequisites
- Docker Desktop 4.x+
- Python 3.11+
- Node.js 20 LTS
- Git

### 1. Clone Repository
```bash
git clone https://github.com/your-org/encore.git
cd encore
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Generate secrets
echo "SECRET_KEY=$(openssl rand -hex 32)" >> .env
echo "POSTGRES_PASSWORD=$(openssl rand -hex 16)" >> .env
echo "KEYCLOAK_ADMIN_PASSWORD=$(openssl rand -hex 16)" >> .env
echo "KEYCLOAK_DB_PASSWORD=$(openssl rand -hex 16)" >> .env
```

### 3. Start Docker Stack
```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f api
```

### 4. Database Setup
```bash
# Run migrations
docker-compose exec api alembic upgrade head

# Seed initial data (optional)
docker-compose exec api python -m app.scripts.seed
```

### 5. Keycloak Configuration
1. Access Keycloak admin: http://localhost:8080/admin
2. Login with credentials from .env
3. Import realm: `keycloak/realm-export.json`
4. Or realm auto-imports on startup

### 6. Verify Installation
```bash
# Health check
curl http://localhost:8000/api/health

# Keycloak realm
curl http://localhost:8080/realms/encore

# Get test token
curl -X POST http://localhost:8080/realms/encore/protocol/openid-connect/token \
  -d "client_id=encore-web" \
  -d "username=test@example.com" \
  -d "password=test123" \
  -d "grant_type=password"
```

## Backend Development Workflow

### Running Locally (without Docker)
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Run with auto-reload
uvicorn app.main:app --reload --port 8000
```

### Creating Migrations
```bash
# Generate migration from model changes
docker-compose exec api alembic revision --autogenerate -m "add_achievement_table"

# Apply migration
docker-compose exec api alembic upgrade head

# Rollback
docker-compose exec api alembic downgrade -1
```

### Running Tests
```bash
# All tests
docker-compose exec api pytest

# With coverage
docker-compose exec api pytest --cov=app --cov-report=html

# Specific test file
docker-compose exec api pytest tests/test_habits.py -v

# Run tests locally
cd backend && pytest
```

### Code Quality
```bash
# Format code
docker-compose exec api black app tests

# Lint
docker-compose exec api ruff check app tests

# Type checking
docker-compose exec api mypy app
```

## Service URLs (Local Development)

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| API | http://localhost:8000 | - |
| API Docs | http://localhost:8000/docs | - |
| Keycloak Admin | http://localhost:8080/admin | See .env |
| pgAdmin | http://localhost:5050 | See .env |
| Redis Commander | http://localhost:8081 | - |

## Useful Docker Commands

```bash
# Rebuild single service
docker-compose build api

# Restart service
docker-compose restart api

# Shell into container
docker-compose exec api bash

# View logs
docker-compose logs -f --tail=100 api

# Stop all
docker-compose down

# Stop and remove volumes (reset data)
docker-compose down -v

# Production build
docker-compose -f docker-compose.prod.yml build
```

---

# APPENDIX C: API DOCUMENTATION

## Authentication Flow

### 1. Login (Authorization Code + PKCE)
```javascript
// Frontend initiates login
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'encore',
  clientId: 'encore-web'
});

await keycloak.init({ 
  onLoad: 'login-required',
  pkceMethod: 'S256'
});

// Access token available
const token = keycloak.token;
```

### 2. API Request with Token
```javascript
// Include token in Authorization header
const response = await fetch('/api/v1/habits', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### 3. Token Refresh
```javascript
// Keycloak JS handles refresh automatically
keycloak.onTokenExpired = () => {
  keycloak.updateToken(30).then(refreshed => {
    if (refreshed) {
      console.log('Token refreshed');
    }
  });
};
```

## API Error Responses

```json
// 400 Bad Request
{
  "detail": [
    {
      "loc": ["body", "name"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}

// 401 Unauthorized
{
  "detail": "Could not validate credentials"
}

// 403 Forbidden
{
  "detail": "Permission denied"
}

// 404 Not Found
{
  "detail": "Habit not found"
}

// 429 Too Many Requests
{
  "detail": "Rate limit exceeded. Try again in 60 seconds."
}
```

---

**Document Owner**: Product Owner  
**Last Updated**: December 2025  
**Next Review**: End of Sprint 2
