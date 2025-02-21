"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AccountPage() {
  const [email, setEmail] = useState("user@example.com")
  const [notifications, setNotifications] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle account update logic here
    console.log("Updating account...")
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Account Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Receive notifications</Label>
          <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
        </div>
        <Button type="submit">Update Account</Button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Danger Zone</h2>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  )
}

