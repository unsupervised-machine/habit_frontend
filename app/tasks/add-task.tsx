import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import {Task} from "@/constants/demoTasks";


export function AddTask({ addTask }: { addTask: (task: Task) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: name,
      description: description,
      completed: false,
      sorted_index: Date.now(),
    };

    addTask(newTask);
    setName("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Create a new task by filling out the details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" className="col-span-3 min-h-[100px]" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
