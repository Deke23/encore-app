# 🛠 Development Guide

Quick reference for common development tasks.

## 🚀 Getting Started

### First Time Setup

\`\`\`bash
# 1. Clone and navigate
git clone https://github.com/Deke23/encore-app.git
cd encore-app

# 2. Start all backend services
docker-compose up -d

# 3. Install frontend dependencies
cd frontend && npm install

# 4. Start frontend dev server
npm run dev
\`\`\`

## 📋 Daily Development Workflow

### Start Development

\`\`\`bash
# Start backend services (if not running)
docker-compose up -d

# Start frontend dev server
cd frontend && npm run dev
\`\`\`

### Stop Development

\`\`\`bash
# Stop all services
docker-compose down

# Or stop without removing containers
docker-compose stop
\`\`\`

## 🔧 Common Tasks

### Backend

\`\`\`bash
# View API logs
docker-compose logs -f api

# Access Python shell
docker-compose exec api python

# Run database migrations
docker-compose exec api alembic upgrade head

# Create new migration
docker-compose exec api alembic revision --autogenerate -m "your message"

# Run tests
docker-compose exec api pytest

# Format code
docker-compose exec api black app tests

# Check code quality
docker-compose exec api ruff check app
\`\`\`

### Frontend

\`\`\`bash
cd frontend

# Install new package
npm install package-name

# Format code
npm run format

# Lint code
npm run lint

# Type check
npm run type-check

# Build for production
npm run build
\`\`\`

### Database

\`\`\`bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U postgres -d encore_db

# Backup database
docker-compose exec postgres pg_dump -U postgres encore_db > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres encore_db < backup.sql

# View running queries
docker-compose exec postgres psql -U postgres -d encore_db -c "SELECT * FROM pg_stat_activity;"
\`\`\`

### Keycloak

\`\`\`bash
# Access Keycloak admin console
open http://localhost:8080/admin

# View Keycloak logs
docker-compose logs -f keycloak

# Export realm configuration
docker-compose exec keycloak /opt/keycloak/bin/kc.sh export --dir /tmp/export --realm encore
\`\`\`

## 🐛 Debugging

### Check Service Health

\`\`\`bash
# Check all services status
docker-compose ps

# Check specific service health
docker-compose exec api curl http://localhost:8000/health
docker-compose exec postgres pg_isready -U postgres
docker-compose exec redis redis-cli ping
\`\`\`

### View Logs

\`\`\`bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f postgres
docker-compose logs -f keycloak
docker-compose logs -f worker

# Last 100 lines
docker-compose logs --tail=100 api
\`\`\`

### Restart Services

\`\`\`bash
# Restart specific service
docker-compose restart api

# Restart all services
docker-compose restart

# Rebuild and restart
docker-compose up -d --build api
\`\`\`

### Reset Everything

\`\`\`bash
# Nuclear option: remove all data
docker-compose down -v

# Remove Docker images
docker-compose down --rmi all

# Full cleanup and restart
docker-compose down -v && docker-compose up -d
\`\`\`

## 🧪 Testing

### Backend Tests

\`\`\`bash
# Run all tests
docker-compose exec api pytest

# Run with coverage
docker-compose exec api pytest --cov=app --cov-report=html

# Run specific test file
docker-compose exec api pytest tests/test_habits.py

# Run specific test
docker-compose exec api pytest tests/test_habits.py::test_create_habit -v

# Run tests with print statements
docker-compose exec api pytest -s
\`\`\`

### Frontend Tests (to be implemented)

\`\`\`bash
cd frontend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
\`\`\`

## 📦 Dependencies

### Update Backend Dependencies

\`\`\`bash
cd backend

# Update all packages
pip list --outdated
pip install --upgrade package-name

# Freeze dependencies
pip freeze > requirements.txt
\`\`\`

### Update Frontend Dependencies

\`\`\`bash
cd frontend

# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages
npm update

# Install latest versions
npm install package-name@latest
\`\`\`

## 🔐 Access Credentials

All credentials are in `.env` file (auto-generated with secure passwords).

### Default Test Users

| Email | Password | Role |
|-------|----------|------|
| test@encore.app | test123 | Free user |
| premium@encore.app | premium123 | Premium user |

### Service URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend Dev | http://localhost:5173 | 5173 |
| API | http://localhost:8000 | 8000 |
| API Docs | http://localhost:8000/docs | 8000 |
| Keycloak | http://localhost:8080 | 8080 |
| PostgreSQL | localhost | 5432 |
| Redis | localhost | 6379 |
| pgAdmin | http://localhost:5050 | 5050 |

## 🎯 Sprint 1 Tasks

Current focus: Foundation and design system (Week 1-2)

### Backend Tasks
- [ ] Create User model
- [ ] Create Habit model
- [ ] Create Completion model
- [ ] Set up Keycloak security dependency
- [ ] Implement basic CRUD endpoints

### Frontend Tasks
- [ ] Set up shadcn/ui components
- [ ] Create design tokens
- [ ] Build base component library
- [ ] Set up routing
- [ ] Configure Zustand store
- [ ] Implement Keycloak auth

## 📚 Helpful Commands

### Docker

\`\`\`bash
# Remove all unused Docker resources
docker system prune -a

# View Docker disk usage
docker system df

# Shell into container
docker-compose exec api bash
docker-compose exec postgres bash
\`\`\`

### Git

\`\`\`bash
# Create feature branch
git checkout -b feature/your-feature

# Commit with message
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature
\`\`\`

### Environment

\`\`\`bash
# View environment variables
cat .env

# Test environment variable loading
docker-compose config
\`\`\`

## 🆘 Troubleshooting

### Port Already in Use

\`\`\`bash
# Find process using port
lsof -i :8000
lsof -i :5173

# Kill process
kill -9 <PID>
\`\`\`

### Database Connection Refused

\`\`\`bash
# Check PostgreSQL is running
docker-compose exec postgres pg_isready

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
\`\`\`

### Keycloak Not Starting

Keycloak takes ~60 seconds to fully start. Wait and check:

\`\`\`bash
docker-compose logs -f keycloak
\`\`\`

### Frontend Build Fails

\`\`\`bash
# Clear cache
rm -rf frontend/node_modules frontend/dist
cd frontend && npm install
\`\`\`

## 🔗 Useful Links

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Keycloak Docs](https://www.keycloak.org/documentation)
- [Docker Compose Docs](https://docs.docker.com/compose/)

---

**Happy coding! 🔥**
