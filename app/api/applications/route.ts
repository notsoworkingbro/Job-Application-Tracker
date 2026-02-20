import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/db"
import { applications } from "@/lib/db/schema"
import { inArray } from "drizzle-orm"  // <-- import this

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const inserted = await db.insert(applications).values({
      company: body.company,
      position: body.position,
      status: body.status,
      application_date: body.application_date,
      salary: body.salary,
    }).returning() // returning inserted row

    return NextResponse.json(inserted)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to add application" }, { status: 500 })
  }
}

export async function GET() {
  const allApplications = await db.select().from(applications)
  return NextResponse.json(allApplications)
}

export async function DELETE(req: NextRequest) {
  try {
    const { ids } = await req.json()
    await db.delete(applications).where(inArray(applications.id, ids))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete applications" }, { status: 500 })
  }
}