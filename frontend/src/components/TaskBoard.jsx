import React from 'react';
import { TaskCard } from './TaskCard';
import { PlusIcon } from './Icons';

export function TaskBoard({ tasks, onEditTask, onDeleteTask, onStatusChange, onNewTaskInStatus }) {
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'border-slate-700/60 bg-slate-900/40',
      badgeColor: 'bg-slate-800 text-slate-300',
      dotColor: 'bg-slate-400',
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: 'border-amber-500/20 bg-amber-500/5',
      badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      dotColor: 'bg-amber-400',
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'border-indigo-500/20 bg-indigo-500/5',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      dotColor: 'bg-indigo-400',
    },
    {
      id: 'done',
      title: 'Completed',
      color: 'border-emerald-500/20 bg-emerald-500/5',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      dotColor: 'bg-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      {columns.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col.id);

        return (
          <div
            key={col.id}
            className={`rounded-2xl border p-3 flex flex-col min-h-[500px] transition-colors ${col.color}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                <h2 className="font-bold text-sm text-slate-200">{col.title}</h2>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                  {columnTasks.length}
                </span>
              </div>

              <button
                onClick={() => onNewTaskInStatus(col.id)}
                title={`Add task to ${col.title}`}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Task list inside column */}
            <div className="space-y-3 flex-1">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onStatusChange={onStatusChange}
                />
              ))}

              {columnTasks.length === 0 && (
                <div className="h-40 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-4">
                  <p className="text-xs text-slate-500">No tasks in {col.title.toLowerCase()}</p>
                  <button
                    onClick={() => onNewTaskInStatus(col.id)}
                    className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                    <span>Create one</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

