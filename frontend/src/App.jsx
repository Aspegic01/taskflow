import React, { useState, useEffect, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { TaskBoard } from './components/TaskBoard';
import { TaskModal } from './components/TaskModal';
import { AuthModal } from './components/AuthModal';
import { INITIAL_TASKS, INITIAL_PROJECTS } from './mock/initialTasks';

const TASKS_STORAGE_KEY = 'taskflow_tasks';
const PROJECTS_STORAGE_KEY = 'taskflow_projects';

function MainLayout() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskInitialStatus, setNewTaskInitialStatus] = useState('todo');

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  // Filter tasks based on project and search
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesProject =
        selectedProject === 'All Projects' || t.project === selectedProject;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.project && t.project.toLowerCase().includes(q)) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)));

      return matchesProject && matchesSearch;
    });
  }, [tasks, selectedProject, searchQuery]);

  const handleOpenNewTask = (status = 'todo') => {
    setEditingTask(null);
    setNewTaskInitialStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (savedTask) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === savedTask.id);
      if (exists) {
        return prev.map((t) => (t.id === savedTask.id ? savedTask : t));
      } else {
        return [savedTask, ...prev];
      }
    });

    // If new project was introduced, add to list
    if (savedTask.project && !projects.includes(savedTask.project)) {
      setProjects((prev) => [...prev, savedTask.project]);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNewTask={() => handleOpenNewTask('todo')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Guest / Onboarding announcement if user not logged in */}
        {!user && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/40 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-sm text-indigo-300">
                Connected to FastAPI Backend
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Register or log in using the backend's authentication system (with Argon2 & PostgreSQL), or test in demo mode.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow-sm shadow-indigo-600/30 transition whitespace-nowrap"
              >
                Sign In / Register
              </button>
            </div>
          </div>
        )}

        {/* Stats Overview & Project switcher */}
        <StatsOverview
          tasks={tasks}
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />

        {/* Kanban Board */}
        <TaskBoard
          tasks={filteredTasks}
          onEditTask={handleOpenEditTask}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onNewTaskInStatus={(status) => handleOpenNewTask(status)}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Taskflow — Built with React, Tailwind CSS & FastAPI</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>FastAPI: http://localhost:8000</span>
            <span>Docs: http://localhost:8000/docs</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
        initialStatus={newTaskInitialStatus}
        projects={projects}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

