'use client';

import { useState, useEffect } from 'react';

interface Task {
  id?: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error connecting to the backend');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setSubmitting(true);
      const newTask: Task = {
        title: title.trim(),
        completed: false,
      };

      const res = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error('Failed to add task');

      const savedTask = await res.json();
      setTasks((prev) => [...prev, savedTask]);
      setTitle('');
    } catch (err: any) {
      alert(err.message || 'Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-6 md:p-12 selection:bg-indigo-500 selection:text-white">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <main className="w-full max-w-2xl mt-8 md:mt-16 z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Task Orchestrator
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-medium">
            Manage your daily flow with elegance and style
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl mb-8">
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center min-w-[120px]"
            >
              {submitting ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'Add Task'
              )}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={fetchTasks}
              className="text-red-400 hover:text-red-300 text-xs font-semibold underline underline-offset-4 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Task List Card */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-lg font-bold text-slate-300 mb-4 flex items-center justify-between">
            <span>Tasks Checklist</span>
            <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-semibold">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </h2>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium">Fetching active checklist...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002-2h-2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-slate-500 font-semibold mb-1">No tasks today</p>
              <p className="text-slate-600 text-sm">Add one above to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center justify-between bg-slate-950/50 hover:bg-slate-950 border border-slate-900 hover:border-indigo-500/20 rounded-xl p-4 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                        task.completed
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-700 group-hover:border-slate-500'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm md:text-base transition-all duration-300 ${
                        task.completed ? 'text-slate-500 line-through' : 'text-slate-200'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        task.completed
                          ? 'bg-indigo-500/10 text-indigo-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {task.completed ? 'Done' : 'Active'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
