// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard
// PURPOSE: This component is the main controller of the app.
// It stores all tasks, handles user actions, and passes data
// to other components. This follows React's "lifting state up".
// TYPE: Client Component (uses useState and useEffect)
// ══════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from "react";

export default function TaskBoard() {

  // ───────────────── STATE ─────────────────

  // This state stores all tasks.
  // We use a lazy initializer to load tasks from localStorage only once.
  // The typeof window check avoids errors because Next.js first runs on server.
  const [tasks, setTasks] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // This state controls which filter is active (all, active, done).
  // It is separate from tasks because it changes independently.
  const [filter, setFilter] = useState("all");


  // ───────────────── EFFECT ─────────────────

  // This effect runs every time tasks change.
  // It saves the updated tasks into localStorage so they persist after refresh.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  // ─────────────── DERIVED VALUES ───────────────

  // These values are calculated from tasks instead of stored in state.
  // This avoids duplication and keeps the data consistent.

  const total = tasks.length;
  const completed = tasks.filter(task => task.done).length;
  const active = tasks.filter(task => !task.done).length;

  // This determines which tasks should be visible based on filter.
  const visibleTasks =
    filter === "all"
      ? tasks
      : filter === "done"
      ? tasks.filter(task => task.done)
      : tasks.filter(task => !task.done);


  // ─────────────── HANDLERS ───────────────

  // Adds a new task.
  // We use spread (...) to create a new array instead of mutating state.
  function handleAdd(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      done: false
    };
    setTasks([...tasks, newTask]);
  }

  // Toggles a task between done and not done.
  // map() returns a new array, which is required for React to detect changes.
  function handleToggle(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  // Deletes a task.
  // filter() creates a new array without the selected task.
  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Removes all completed tasks at once.
  function handleClearCompleted() {
    setTasks(tasks.filter(task => !task.done));
  }


  // ───────────────── RENDER ─────────────────

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-xl">

      <h1 className="text-2xl font-bold mb-4 text-center">
        My Task Manager
      </h1>

      {/* Add Task Form (we will create this component next) */}
      <p className="text-sm text-gray-400 mb-4 text-center">
        Add tasks below
      </p>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>

      {/* Task List placeholder */}
      <div className="mb-4">
        {visibleTasks.map(task => (
          <div key={task.id} className="flex justify-between mb-2">
            <span>{task.title}</span>
            <div>
              <button onClick={() => handleToggle(task.id)}>Toggle</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-300 text-center">
        Total: {total} | Active: {active} | Done: {completed}
      </div>

      {/* Clear completed */}
      <div className="text-center mt-3">
        <button onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>

    </div>
  );
}