import TaskList from "../tasks/task-list"

const initialTasks = [
  {
    id: 1,
    title: "Project A",
    checked: false,
    subtasks: [
      { id: 11, title: "Design mockups", checked: false },
      { id: 12, title: "Implement frontend", checked: false },
    ],
  },
  {
    id: 2,
    title: "Project B",
    checked: false,
    subtasks: [
      { id: 21, title: "Market research", checked: false },
      { id: 22, title: "Create proposal", checked: false },
    ],
  },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <TaskList initialTasks={initialTasks} />
    </div>
  )
}

