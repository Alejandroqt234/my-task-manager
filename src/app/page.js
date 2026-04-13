import TaskBoard from "../components/TaskBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <TaskBoard />
    </main>
  );
}