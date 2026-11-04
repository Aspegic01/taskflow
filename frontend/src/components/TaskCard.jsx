import React from 'react';
import { TrashIcon, EditIcon, ClockIcon, TagIcon } from './Icons';

export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priorityColors = {
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'review', label: 'Review' },
    { value: 'done', label: 'Done' },
  ];

  return (
    <div className="group relative bg-slate-900 border border-slate-800/90 rounded-xl p-4 hover:border-slate-700 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Header: Priority & Project */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
              priorityColors[task.priority] || priorityColors.medium
            }`}
          >
            {task.priority}
          </span>

          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 truncate max-w-[130px]">
            <TagIcon className="w-3 h-3 flex-shrink-0 text-slate-500" />
            <span className="truncate">{task.project || 'General'}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2">
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="mt-1 text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Due date + Status selector + Actions */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <ClockIcon className="w-3.5 h-3.5 text-slate-500" />
          <span>{task.dueDate || 'No date'}</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Status selector */}
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="text-[11px] bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            className="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded transition"
          >
            <EditIcon className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            title="Delete task"
            className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition"
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

