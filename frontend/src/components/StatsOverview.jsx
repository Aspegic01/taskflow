import React from 'react';

export function StatsOverview({ tasks, projects, selectedProject, onSelectProject }) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const highPriority = tasks.filter((t) => t.priority === 'high' && t.status !== 'done').length;

  return (
    <div className="space-y-4 mb-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Tasks</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-white">{total}</span>
            <span className="text-[11px] text-slate-500">across board</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
          <p className="text-[11px] font-medium text-amber-400 uppercase tracking-wider">In Progress</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-400">{inProgress}</span>
            <span className="text-[11px] text-slate-500">active now</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
          <p className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider">Completed</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-400">{done}</span>
            <span className="text-[11px] text-slate-500">
              {total > 0 ? `${Math.round((done / total) * 100)}% done` : '0%'}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
          <p className="text-[11px] font-medium text-rose-400 uppercase tracking-wider">High Priority</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-rose-400">{highPriority}</span>
            <span className="text-[11px] text-slate-500">needs attention</span>
          </div>
        </div>
      </div>

      {/* Project Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <span className="text-xs text-slate-400 font-medium whitespace-nowrap pl-0.5">Projects:</span>
        {projects.map((proj) => {
          const count = proj === 'All Projects' 
            ? tasks.length 
            : tasks.filter(t => t.project === proj).length;
          const isSelected = selectedProject === proj;

          return (
            <button
              key={proj}
              onClick={() => onSelectProject(proj)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {proj}
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

