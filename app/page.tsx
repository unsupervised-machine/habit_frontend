import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome to Task Manager</h1>
      <p className="text-xl">Organize your tasks efficiently and boost your productivity.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/auth">Get Started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/pricing">View Pricing</Link>
        </Button>
      </div>
    </div>
  )
}

