// ============================================
// COMPONENT: TaskCard
// PURPOSE: Shows one task and sends user actions
// back up to TaskBoard through callback props.
// TYPE: Client Component
// PROPS:
// - id: unique task id
// - title: task text
// - done: true if task is completed
// - onToggle: callback to toggle task status
// - onDelete: callback to delete task
// ============================================

'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  // This class changes depending on the task status.
  // The goal is to make completed tasks look visually different.
  const textClass = done
    ? "line-through text-gray-400"
    : "text-white";

  return (
    <div className="flex items-center justify-between rounded-md bg-gray-700 px-3 py-2 mb-2">
      <span className={textClass}>{title}</span>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(id)}
          className="rounded bg-yellow-500 px-3 py-1 text-sm text-black hover:bg-yellow-400"
        >
          Toggle
        </button>

        <button
          onClick={() => onDelete(id)}
          className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}