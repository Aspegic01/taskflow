# Taskflow Frontend (React + Tailwind CSS + Vite)

A modern, responsive React frontend designed to work seamlessly with the Taskflow FastAPI backend and PostgreSQL database.

---

## 🚀 Features

- **Full FastAPI Authentication**:
  - **Register**: Supports `first_name`, `last_name`, `email`, `password` (with real-time counter ensuring the backend's 15-character minimum requirement), and optional `nickname`.
  - **Login**: Authenticates against `/auth/login` and handles Argon2 password verification.
  - **Guest / Demo Mode**: Instant one-click test mode to explore without creating an account.
  - **Session Persistence**: Persists user session in `localStorage`.
- **Live Backend & Database Health Monitor**:
  - Automatically pings `/` and `/health/db` on the FastAPI backend.
  - Dynamic status indicator with pulse animation (Green = Healthy, Amber = Partial, Red = Offline) and quick refresh button.
- **Interactive Kanban Task Workspace**:
  - 4 status columns: **To Do**, **In Progress**, **In Review**, **Completed**.
  - Create, edit, and delete tasks.
  - Filter tasks by project and real-time text search (titles, descriptions, tags).
  - Quick column status selector on each card.
  - Local state persistence with ready-to-hook API service layer for backend task endpoints.
- **Modern UI & UX**:
  - Styled with Tailwind CSS, dark slate palette, and vibrant accent colors.
  - Zero external icon bloat (lightweight inline SVG icons for instant render).

---

## 🛠️ Getting Started

### Option 1: Run with Docker Compose (Recommended)

From the root directory of the repository:

```bash
docker compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Backend**: [http://localhost:8000](http://localhost:8000)
- **Swagger / OpenAPI Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option 2: Run Locally with Node.js

Requires Node.js 18+.

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
frontend/
├── Dockerfile              # Multi-stage production build (Node build -> Nginx)
├── nginx.conf              # SPA routing and API reverse-proxy configuration
├── package.json            # React 18, Vite, Tailwind CSS
├── vite.config.js          # Vite config with dev proxy to :8000
├── tailwind.config.js      # Tailwind color palette & dark theme
├── src/
│   ├── main.jsx            # React root entry point
│   ├── App.jsx             # Main application layout, state, & modals
│   ├── index.css           # Tailwind directives & custom scrollbars
│   ├── api/
│   │   └── client.js       # API client for FastAPI endpoints (auth, health)
│   ├── context/
│   │   └── AuthContext.jsx # User authentication state provider
│   ├── components/
│   │   ├── Navbar.jsx          # Header with search, status, and auth actions
│   │   ├── BackendStatus.jsx   # Real-time health badge (/health/db & /)
│   │   ├── AuthModal.jsx       # Sign In & Sign Up modal with 15-char validation
│   │   ├── StatsOverview.jsx   # Metrics cards & project filter pills
│   │   ├── TaskBoard.jsx       # 4-column Kanban board
│   │   ├── TaskCard.jsx        # Task item with priority, tags, status selector
│   │   ├── TaskModal.jsx       # New/Edit task dialog
│   │   └── Icons.jsx           # Clean lightweight SVG icons
│   └── mock/
│       └── initialTasks.js # Sample workflow tasks and projects
```

---

## 🔌 API Integration Details

The frontend connects to the following FastAPI endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | Backend connectivity check |
| `/health/db` | `GET` | PostgreSQL database connection status |
| `/auth/register` | `POST` | Registers new user (`email`, `password >= 15 chars`, `first_name`, `last_name`, `nickname`) |
| `/auth/login` | `POST` | Authenticates user credentials |

