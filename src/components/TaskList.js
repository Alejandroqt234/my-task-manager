// ============================================
// COMPONENT: TaskList
// PURPOSE: Receives the filtered tasks and renders
// one TaskCard for each item.
// TYPE: Client Component
// PROPS:
// - tasks: array of visible tasks
// - onToggle: callback from TaskBoard
// - onDelete: callback from TaskBoard
// ============================================

'use client';

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  // This conditional render shows a message only when there are
  // no tasks to display for the current filter.
  if (tasks.length === 0) {
    return (
      <p className="mb-4 text-center text-sm text-gray-400">
        No tasks to show.
      </p>
    );
  }

  return (
    <div className="mb-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          done={task.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}