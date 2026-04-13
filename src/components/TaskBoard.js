// ============================================
// COMPONENT: TaskBoard
// PURPOSE: Main controller of the app.
// It stores all tasks and passes data to children.
// TYPE: Client Component
// ============================================

'use client';

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const active = tasks.filter((task) => !task.done).length;

  const visibleTasks =
    filter === "all"
      ? tasks
      : filter === "done"
      ? tasks.filter((task) => task.done)
      : tasks.filter((task) => !task.done);
  function handleAdd(title) {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: title,
        done: false,
      },
    ]);
  }
  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((task) => !task.done));
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">My Task Manager</h1>

      <p className="text-sm text-gray-400 mb-4 text-center">
        Add tasks below
      </p>

<AddTaskForm onAdd={handleAdd} />

      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>

            <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

            <TaskStats
        total={total}
        active={active}
        completed={completed}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}