export interface Task {
  id: string
  title: string
  description: string
  date: string
  sort_index?: number
  team?: { name: string }
  completed?: boolean
  url?: string
}

export const demoTasks: Task[] = [
  { id: "1", title: "Implement new feature", description: "Test Description", date: "2025-02-27", url: "https://linear.app/demo/issue/DEMO-1", sort_index: 5, completed: false},
  { id: "2", title: "Fix critical bug", description: "Test Description", date: "2025-02-27", url: "https://linear.app/demo/issue/DEMO-2", sort_index: 1 , completed: true},
  { id: "3", title: "Update documentation", description: "Test Description", date: "2025-02-27", url: "https://linear.app/demo/issue/DEMO-3", sort_index: 3, completed: false},
  { id: "4", title: "Prepare for team meeting", description: "Test Description", date: "2025-02-27", url: "https://linear.app/demo/issue/DEMO-4", sort_index: 0.5, completed: false },
  { id: "5", title: "Review pull requests", description: "Test Description", date: "2025-02-27", url: "https://linear.app/demo/issue/DEMO-5", sort_index: 1.5, completed: true },
]

