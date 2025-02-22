import TaskList from "../tasks/task-list"

const tasks = [
  {
    id: 1,
    title: "Project A",
    checked: false,
    isOnTrack: true,
    streak: 15,
    subtasks: [
      { id: 11, title: "Design mockups", checked: false },
      { id: 12, title: "Implement frontend", checked: false },
      { id: 13, title: "Setup backend", checked: false },
    ],
  },
  {
    id: 2,
    title: "Project B",
    checked: false,
    isOnTrack: false,
    streak: -3,
    subtasks: [
      { id: 21, title: "Market research", checked: false },
      { id: 22, title: "Create proposal", checked: false },
    ],
  },
  {
    id: 3,
    title: "Project C",
    checked: false,
    isOnTrack: true,
    streak: 2,
    subtasks: [
      { id: 31, title: "Plan timeline", checked: false },
      { id: 32, title: "Assign resources", checked: false },
    ],
  },
]

console.log("Tasks being passed to TaskList:", tasks);

export default function TasksPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskList initialTasks={tasks} />
    </div>
  )
}



