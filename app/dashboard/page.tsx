import {TaskList} from "../tasks/task-list"

const tasks = [
  {
    id: 1,
    title: "Exercise",
    checked: false,
    streak: 15,
    subtasks: [
      { id: 11, title: "Run 1 Mile", checked: false },
      { id: 12, title: "Do 5 Pull Ups", checked: false },
      { id: 13, title: "Do 10 Push Ups", checked: false },
    ],
  },
  {
    id: 2,
    title: "Reading",
    checked: false,
    streak: -3,
    subtasks: [
      { id: 21, title: "Read 1 Page", checked: false },
      { id: 22, title: "Read 1 Chapter", checked: false },
    ],
  },
  {
    id: 3,
    title: "Mindfulness",
    checked: false,
    streak: 2,
    subtasks: [
      { id: 31, title: "Journal", checked: false },
      { id: 32, title: "Meditate", checked: false },
    ],
  },
]

console.log("Tasks being passed to TaskList:", tasks);

export default function TasksPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Builder</h1>
      <TaskList initialTasks={tasks} />
    </div>
  )
}



