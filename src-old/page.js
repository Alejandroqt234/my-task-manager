// ============================================
// FILE: page.js
// PURPOSE: This is the main page of the app.
// It renders the TaskBoard component.
// TYPE: Server Component (default in Next.js)
// ============================================

import TaskBoard from "../src/components/TaskBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <TaskBoard />
    </main>
  );
}