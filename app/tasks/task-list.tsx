"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DemoModeToggle } from "@/components/demo-mode-toggle"
import { type Task, demoTasks } from "@/constants/demoTasks"
import { AddTask } from "./add-task" // Import the AddTask component


function SkeletonLoader() {
  return (
    <ul className="space-y-4 mb-8 w-full">
      {[...Array(5)].map((_, index) => (
        <li key={index} className="py-3">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-600 rounded-full flex-shrink-0 animate-pulse"></div>
            <div className="flex-grow flex items-center justify-between">
              <div
                className={`h-4 bg-gray-600 rounded-md animate-pulse w-${["3/4", "2/3", "5/6", "1/2", "4/5"][index]}`}
              ></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsLoading(true)

    let data: Task[] = demoTasks // Default to demo data
    let isUsingDemoData = true

    try {
      const response = await fetch("/api/tasks") // Replace with your actual API endpoint
      if (response.ok) {
        const fetchedData: Task[] = await response.json()
        if (fetchedData.length) {
          data = fetchedData
          isUsingDemoData = false
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }

    // Sort the data before updating state
    setTasks(data.sort((a, b) => (a.sorted_index || 0) - (b.sorted_index || 0)))
    setIsDemoMode(isUsingDemoData)

    setIsLoading(false)
  }

  const addTask = async (newTask: Task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks((prevTasks) =>
          [...prevTasks, savedTask].sort((a, b) => (a.sorted_index || 0) - (b.sorted_index || 0))
        );
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode)
  }

  const toggleTaskCompletion = (taskId: string) => {
    setUpdatingTaskId(taskId)
    setTasks((prevTasks) =>
      prevTasks
        .map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
        .sort((a, b) => {
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1
          }
          return (a.sorted_index || 0) - (b.sorted_index || 0)
        }),
    )
    setTimeout(() => setUpdatingTaskId(null), 500)
  }

  const openTaskInNewWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col relative">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Modified header section to place AddTask to the right of the heading */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-center">Due Today</h1>
            <AddTask addTask={addTask} />
          </div>

          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <motion.ul layout className="space-y-4 mb-8 w-full">
              <AnimatePresence initial={false}>
                {tasks.map((task) => (
                  <motion.li
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.3 }}
                    className={`py-3 cursor-pointer group ${task.completed ? "opacity-60" : ""}`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-5 h-5 flex-shrink-0 border-2 border-gray-600 rounded-full flex items-center justify-center"
                        animate={updatingTaskId === task.id ? {rotate: 360} : {rotate: 0}}
                        transition={
                          updatingTaskId === task.id
                            ? {duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear"}
                            : {duration: 0}
                        }
                      >
                        {task.completed && (
                          <div className="w-2.5 h-2.5 bg-gray-600 rounded-full"></div>
                        )}
                      </motion.div>
                      <div className="flex-grow flex items-center justify-between overflow-hidden">
                        <span
                          className="text-sm truncate text-gray-400 group-hover:text-white transition-colors duration-300 ease-in-out">
                          {task.title}
                        </span>
                      </div>
                      {task.url && (
                        <div
                          className="hidden group-hover:block transition-opacity duration-200 ml-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            openTaskInNewWindow(task.url!)
                          }}
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-300 ease-in-out" />
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>
      <DemoModeToggle isDemoMode={isDemoMode} toggleDemoMode={toggleDemoMode} />
    </div>
  )
}
