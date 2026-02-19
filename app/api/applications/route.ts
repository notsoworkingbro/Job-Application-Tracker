import { db } from "@/lib/db/db"
import { applications } from "@/lib/db/schema"

export async function POST(req: Request) {

  const body = await req.json()

  await db.insert(applications).values(body)

  return Response.json({ success: true })
}