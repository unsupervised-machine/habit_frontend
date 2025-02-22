"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Plus } from "lucide-react"
import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Subtask {
  id: number
  title: string
  checked: boolean
}

interface Task {
  id: number
  title: string
  checked: boolean
  isOnTrack: boolean
  subtasks: Subtask[]
}

interface TaskListProps {
  initialTasks: Task[]
}

export default function TaskList({ initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [expandedTasks, setExpandedTasks] = useState<number[]>(initialTasks.map(task => task.id))
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("")
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null)

  const toggleTask = (taskId: number) => {
    setExpandedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const handleTaskCheck = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              checked: !task.checked,
              subtasks: task.subtasks.map((subtask) => ({
                ...subtask,
                checked: !task.checked,
              })),
            }
          : task,
      ),
    )
  }

  const handleSubtaskCheck = (taskId: number, subtaskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, checked: !subtask.checked } : subtask
              ),
              // Recalculate checked status based on the updated subtasks
              checked: task.subtasks.every((subtask) =>
                subtask.id === subtaskId ? !subtask.checked : subtask.checked
              ),
            }
          : task
      )
    );
  };

  const addNewTask = async () => {
    if (!newTaskTitle.trim()) return

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskTitle }),
      })

      if (!response.ok) {
        throw new Error("Failed to add task")
      }

      const newTask: Task = await response.json()
      setTasks((prevTasks) => [...prevTasks, newTask])
      setExpandedTasks((prevExpanded) => [...prevExpanded, newTask.id]); // Expand the new task
      setNewTaskTitle("")
      toast.success(`New task "${newTask.title}" has been added.`)
    } catch (error) {
      console.error("Error adding task:", error)
      toast.error("Failed to add task. Please try again.")
    }
  }

  const addNewSubtask = async (taskId: number) => {
    if (!newSubtaskTitle.trim()) return

    try {
      const response = await fetch(`/api/tasks/${taskId}/subtasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newSubtaskTitle }),
      })

      if (!response.ok) {
        throw new Error("Failed to add subtask")
      }

      const newSubtask: Subtask = await response.json()
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, subtasks: [...task.subtasks, newSubtask] } : task)),
      )
      setNewSubtaskTitle("")
      setActiveTaskId(null)
      toast.success(`New subtask "${newSubtask.title}" has been added.`)
    } catch (error) {
      console.error("Error adding subtask:", error)
      toast.error("Failed to add subtask. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
            />
            <Button variant="ghost" onClick={addNewTask}>Add Task</Button>
          </div>
        </DialogContent>
      </Dialog>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.checked}
                  onCheckedChange={() => handleTaskCheck(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-lg font-semibold ${task.checked ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setActiveTaskId(task.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Subtask</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        placeholder="Enter subtask title"
                      />
                      <Button variant="ghost" onClick={() => addNewSubtask(task.id)}>Add Subtask</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="sm" onClick={() => toggleTask(task.id)}>
                  {expandedTasks.includes(task.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {expandedTasks.includes(task.id) && (
              <ul className="mt-2 ml-8 space-y-2">
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subtask-${subtask.id}`}
                      checked={subtask.checked}
                      onCheckedChange={() => handleSubtaskCheck(task.id, subtask.id)}
                    />
                    <label
                      htmlFor={`subtask-${subtask.id}`}
                      className={subtask.checked ? "line-through text-muted-foreground" : ""}
                    >
                      {subtask.title}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

