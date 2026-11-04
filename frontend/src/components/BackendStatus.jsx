import React, { useState, useEffect } from 'react';
import { healthAPI, API_BASE_URL } from '../api/client';
import { DatabaseIcon, ServerIcon, RefreshIcon } from './Icons';

export function BackendStatus() {
  const [status, setStatus] = useState({
    loading: true,
    apiOk: false,
    dbOk: false,
    details: null,
    error: null,
  });

  const checkHealth = async () => {
    setStatus((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const rootRes = await healthAPI.checkRoot().catch(() => null);
      const dbRes = await healthAPI.checkDB().catch(() => null);

      setStatus({
        loading: false,
        apiOk: !!rootRes,
        dbOk: dbRes?.status === 'ok',
        details: { rootRes, dbRes },
        error: !rootRes ? 'Backend unreachable' : !dbRes ? 'Database unavailable' : null,
      });
    } catch (err) {
      setStatus({
        loading: false,
        apiOk: false,
        dbOk: false,
        details: null,
        error: err.message,
      });
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const isHealthy = status.apiOk && status.dbOk;
  const isPartial = status.apiOk && !status.dbOk;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-slate-900/80 backdrop-blur-sm transition-all border-slate-800">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          {isHealthy && (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          )}
          {isPartial && (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </>
          )}
          {!status.apiOk && (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          )}
        </span>

        <span className="text-slate-300">
          {status.loading ? (
            'Checking API...'
          ) : isHealthy ? (
            <span className="text-emerald-400 font-semibold">Backend & DB Healthy</span>
          ) : isPartial ? (
            <span className="text-amber-400 font-semibold">API Online (DB Disconnected)</span>
          ) : (
            <span className="text-rose-400 font-semibold">FastAPI Offline</span>
          )}
        </span>
      </div>

      <button
        onClick={checkHealth}
        title="Refresh backend status"
        className="ml-1 text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded hover:bg-slate-800"
      >
        <RefreshIcon className={`w-3.5 h-3.5 ${status.loading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}

