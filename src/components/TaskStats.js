// ============================================
// COMPONENT: TaskStats
// PURPOSE: Displays task counts and gives the user
// one button to remove all completed tasks.
// TYPE: Client Component
// PROPS:
// - total: total number of tasks
// - active: number of tasks not completed
// - completed: number of completed tasks
// - onClearCompleted: callback from TaskBoard
// ============================================

'use client';

export default function TaskStats({
  total,
  active,
  completed,
  onClearCompleted,
}) {
  return (
    <div className="text-center">
      <div className="mb-3 text-sm text-gray-300">
        Total: {total} | Active: {active} | Done: {completed}
      </div>

      <button
        onClick={onClearCompleted}
        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
      >
        Clear Completed
      </button>
    </div>
  );
}