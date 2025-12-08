# 🔥 Encore Habit Tracker

**Build core habits. Again and again.**

A streak-based habit tracking application with gamification, freeze system, and beautiful UI. Built with FastAPI, React, PostgreSQL, Keycloak, and Docker.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

- **🔥 Streak Tracking**: Build habits through consecutive daily completions
- **❄️ Freeze System**: Protect streaks with earned freezes (1 per 7 days)
- **🎮 Gamification**: Achievements, badges, and visual rewards
- **📊 Statistics**: Track progress with charts and insights
- **🔐 Secure Auth**: Keycloak OIDC authentication
- **👥 RBAC**: Casbin role-based access control
- **📱 PWA**: Install as mobile app with offline support
- **🌙 Dark Mode**: Beautiful light and dark themes
- **♿ Accessible**: WCAG 2.1 AA compliant

---

## 🛠 Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **PostgreSQL 16** - Relational database
- **SQLAlchemy 2.0** - Async ORM
- **Alembic** - Database migrations
- **Keycloak 24** - Authentication & identity management
- **Casbin** - Authorization & RBAC
- **Redis 7** - Caching & message broker
- **Celery** - Background task processing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations
- **Lottie** - Animated illustrations
- **Lucide React** - Icons

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** 4.x+ ([Download](https://www.docker.com/products/docker-desktop))
- **Node.js** 20 LTS ([Download](https://nodejs.org/))
- **Python** 3.11+ (for local backend development)
- **Git** ([Download](https://git-scm.com/downloads))

---

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/Deke23/encore-app.git
cd encore-app
\`\`\`

### 2. Environment Setup

The `.env` file has been automatically generated with secure passwords:

\`\`\`bash
# Verify .env exists
cat .env
\`\`\`

### 3. Start All Services

\`\`\`bash
# Start backend services (PostgreSQL, Redis, Keycloak, FastAPI, Celery)
docker-compose up -d

# Wait for all services to be healthy (about 60 seconds)
docker-compose ps
\`\`\`

### 4. Install Frontend Dependencies

\`\`\`bash
cd frontend
npm install
\`\`\`

### 5. Start Frontend Development Server

\`\`\`bash
npm run dev
\`\`\`

### 6. Access the Application

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | - |
| **API** | http://localhost:8000 | - |
| **API Docs** | http://localhost:8000/docs | - |
| **Keycloak Admin** | http://localhost:8080/admin | Check `.env` for `KEYCLOAK_ADMIN` |
| **pgAdmin** | http://localhost:5050 | See below |

### 7. Test Authentication

**Test Users (created automatically):**
- **Free user**: `test@encore.app` / `test123`
- **Premium user**: `premium@encore.app` / `premium123`

---

## 💻 Development

### Backend Development

#### Run Backend Locally (without Docker)

\`\`\`bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --port 8000
\`\`\`

#### Database Migrations

\`\`\`bash
# Generate migration
docker-compose exec api alembic revision --autogenerate -m "description"

# Apply migrations
docker-compose exec api alembic upgrade head

# Rollback
docker-compose exec api alembic downgrade -1

# View migration history
docker-compose exec api alembic history
\`\`\`

#### Run Tests

\`\`\`bash
# All tests
docker-compose exec api pytest

# With coverage
docker-compose exec api pytest --cov=app --cov-report=html

# Specific test file
docker-compose exec api pytest tests/test_habits.py -v
\`\`\`

#### Code Quality

\`\`\`bash
# Format code
docker-compose exec api black app tests

# Lint
docker-compose exec api ruff check app tests

# Type checking
docker-compose exec api mypy app
\`\`\`

### Frontend Development

#### Available Scripts

\`\`\`bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
\`\`\`

#### Hot Reload

The development server automatically reloads on file changes. Both frontend and backend support hot reload.

---

## 📁 Project Structure

\`\`\`
encore-app/
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   └── v1/          # API version 1
│   │   ├── core/            # Security, auth, exceptions
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── worker/          # Celery tasks
│   │   ├── casbin/          # Authorization policies
│   │   ├── config.py        # Settings
│   │   ├── database.py      # Database setup
│   │   └── main.py          # FastAPI app
│   ├── alembic/             # Database migrations
│   ├── tests/               # Backend tests
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── features/    # Feature components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities
│   │   ├── services/        # API services
│   │   ├── assets/          # Images, animations
│   │   ├── styles/          # CSS files
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── nginx/                   # Nginx configuration
│   └── nginx.conf
│
├── keycloak/                # Keycloak realm config
│   └── realm-export.json
│
├── scripts/                 # Utility scripts
│   └── create-multiple-databases.sh
│
├── docker-compose.yml       # Docker orchestration
├── .env                     # Environment variables
├── .env.example             # Environment template
└── README.md
\`\`\`

---

## 📚 API Documentation

### Automatic Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Authentication Flow

1. **Login**: Keycloak handles authentication
2. **Token**: Receive JWT access token
3. **API Request**: Include token in `Authorization: Bearer <token>` header
4. **Authorization**: Casbin checks permissions based on user roles

### Key Endpoints (will be implemented in sprints)

\`\`\`
# Health
GET  /health

# Habits
POST   /api/v1/habits
GET    /api/v1/habits
GET    /api/v1/habits/{id}
PATCH  /api/v1/habits/{id}
DELETE /api/v1/habits/{id}

# Completions
POST   /api/v1/habits/{id}/completions
GET    /api/v1/habits/{id}/completions
DELETE /api/v1/habits/{id}/completions/{date}

# Statistics
GET /api/v1/stats/overview
GET /api/v1/stats/habits/{id}

# User
GET    /api/v1/users/me
PATCH  /api/v1/users/me
DELETE /api/v1/users/me
GET    /api/v1/users/me/export
\`\`\`

---

## 🔐 Environment Variables

Key environment variables (see `.env.example` for all):

### Database
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_PASSWORD` - Postgres superuser password

### Keycloak
- `KEYCLOAK_URL` - Keycloak server URL
- `KEYCLOAK_REALM` - Realm name (encore)
- `KEYCLOAK_CLIENT_ID` - Client ID
- `KEYCLOAK_CLIENT_SECRET` - Client secret
- `KEYCLOAK_ADMIN_PASSWORD` - Admin password

### Backend
- `SECRET_KEY` - Application secret key
- `ENVIRONMENT` - development/production
- `DEBUG` - Enable debug mode

### Redis
- `REDIS_URL` - Redis connection string

---

## 🧪 Testing

### Backend Testing

\`\`\`bash
# Run all tests
docker-compose exec api pytest

# With coverage report
docker-compose exec api pytest --cov=app --cov-report=html
open htmlcov/index.html

# Run specific test
docker-compose exec api pytest tests/test_habits.py::test_create_habit -v

# Run with debugging
docker-compose exec api pytest -s -v
\`\`\`

### Frontend Testing (to be set up)

\`\`\`bash
cd frontend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
\`\`\`

---

## 🚀 Deployment

### Production Build

\`\`\`bash
# Build frontend
cd frontend
npm run build

# Frontend build output is in frontend/dist

# Build Docker images
docker-compose -f docker-compose.prod.yml build

# Start production stack
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

### Database Backups

\`\`\`bash
# Manual backup
docker-compose exec postgres pg_dump -U postgres encore_db > backup_$(date +%Y%m%d).sql

# Restore backup
docker-compose exec -T postgres psql -U postgres encore_db < backup_20240101.sql
\`\`\`

---

## 🐛 Troubleshooting

### Services Not Starting

\`\`\`bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f api
docker-compose logs -f keycloak
docker-compose logs -f postgres

# Restart services
docker-compose restart

# Nuclear option: reset everything
docker-compose down -v
docker-compose up -d
\`\`\`

### Database Connection Issues

\`\`\`bash
# Check PostgreSQL is running
docker-compose exec postgres pg_isready -U postgres

# Connect to database
docker-compose exec postgres psql -U postgres -d encore_db
\`\`\`

### Keycloak Not Loading

Keycloak takes ~60 seconds to start. Check logs:

\`\`\`bash
docker-compose logs -f keycloak
\`\`\`

Wait for message: "Listening on: http://0.0.0.0:8080"

---

## 📖 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Casbin Documentation](https://casbin.org/docs/overview)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👥 Team

- **Product Owner**: Dekene
- **Tech Stack**: FastAPI + React + PostgreSQL + Keycloak + Docker

---

## 🎯 Development Roadmap

### Phase 1: PWA (8 weeks)
- ✅ Sprint 0: Infrastructure setup
- 🔄 Sprint 1-2: Foundation & design system
- ⏳ Sprint 3-4: Core features
- ⏳ Sprint 5-6: Enhancement
- ⏳ Sprint 7-8: PWA & launch

### Phase 2: Mobile (12 weeks)
- React Native iOS/Android apps

### Phase 3: Premium (6 weeks)
- Advanced statistics
- Payment integration
- Premium features

---

**Built with ❤️ and 🔥 by the Encore team**
