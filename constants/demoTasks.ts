export interface Task {
  id: string
  title: string
  team?: { name: string }
  completed?: boolean
  url?: string
}

export const demoTasks: Task[] = [
  { id: "1", title: "Implement new feature", url: "https://linear.app/demo/issue/DEMO-1" },
  { id: "2", title: "Fix critical bug", url: "https://linear.app/demo/issue/DEMO-2" },
  { id: "3", title: "Update documentation", url: "https://linear.app/demo/issue/DEMO-3" },
  { id: "4", title: "Prepare for team meeting", url: "https://linear.app/demo/issue/DEMO-4" },
  { id: "5", title: "Review pull requests", url: "https://linear.app/demo/issue/DEMO-5" },
]

