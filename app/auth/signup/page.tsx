"use client"

import { SignUpForm } from "@/components/signup-form" // adjust the path based on your project structure

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <SignUpForm className="w-full max-w-md" />
    </div>
  )
}
