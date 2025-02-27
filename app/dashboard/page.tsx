import { TaskList } from "../tasks/task-list";

export default function TasksPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Habit Dashboard</h1>
      <TaskList />
    </div>
  );
}
