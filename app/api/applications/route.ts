import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/db"
import { applications } from "@/lib/db/schema"
import { inArray, eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inserted = await db
      .insert(applications)
      .values(body)
      .returning();

    return NextResponse.json(inserted[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to insert" },
      { status: 500 }
    );
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

export async function PATCH(req: Request) {
  const { id, field, value } = await req.json();

  await db
    .update(applications)
    .set({ [field]: value })
    .where(eq(applications.id, id));

  return Response.json({ success: true });
}