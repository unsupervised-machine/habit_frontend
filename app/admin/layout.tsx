import type React from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-gray-100 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="block p-2 hover:bg-gray-200 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block p-2 hover:bg-gray-200 rounded">
                User Management
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

