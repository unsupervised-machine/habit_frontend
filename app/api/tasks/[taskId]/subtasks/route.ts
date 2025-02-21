import { NextResponse } from "next/server"

let subtaskId = 100 // Starting from 100 to avoid conflicts with existing subtask IDs

export async function POST(request: Request, { params }: { params: { taskId: string } }) {
  const taskId = Number.parseInt(params.taskId)
  const { title } = await request.json()

  const newSubtask = {
    id: subtaskId++,
    title,
    checked: false,
  }

  // In a real application, you would save this to a database
  // and associate it with the correct task
  // For now, we'll just return the new subtask
  return NextResponse.json(newSubtask, { status: 201 })
}

