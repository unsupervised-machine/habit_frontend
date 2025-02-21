import { NextResponse } from "next/server"

let taskId = 4 // Assuming we start with 3 tasks in our mock data

export async function POST(request: Request) {
  const { title } = await request.json()

  const newTask = {
    id: taskId++,
    title,
    checked: false,
    subtasks: [],
  }

  // In a real application, you would save this to a database
  // For now, we'll just return the new task
  return NextResponse.json(newTask, { status: 201 })
}

