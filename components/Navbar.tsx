"use client"

import Link from "next/link"
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-6">

        <Link href="/" className="text-xl font-bold">
          I Need A Job
        </Link>
        
        <SignedIn>
          <UserButton afterSignOutUrl="/dashboard"/>
        </SignedIn>


      </div>
    </nav>
  )
}