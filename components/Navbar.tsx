"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>

          <Link href="/about" className="hover:text-blue-500">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>

      </div>
    </nav>
  )
}