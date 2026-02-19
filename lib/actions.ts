"use server"

import { db } from "@/lib/db/db"
import { applications } from "@/lib/db/schema"
import { revalidatePath } from "next/cache"

export async function addApplication(formData: FormData) {

  await db.insert(applications).values({
    company: formData.get("company") as string,
    position: formData.get("position") as string,
    status: formData.get("status") as string,
    application_date: formData.get("application_date") as string,
    salary: Number(formData.get("salary")),
  })

  revalidatePath("/dashboard")
}