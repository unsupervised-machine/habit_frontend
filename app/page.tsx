import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome to Simply Habits</h1>
      <p className="text-xl">Organize Your Routine. Simplify Your Life.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/auth/signup">Get Started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Try Out</Link>
        </Button>
      </div>
    </div>
  )
}

