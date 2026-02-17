"use client"

import { columns, Application } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"

const data: Application[] = [
  {
    company: "Google",
    position: "Frontend Developer",
    status: "Applied",
    application_date: "2026-02-10",
    salary: 80000,
  },
  {
    company: "Microsoft",
    position: "Backend Engineer",
    status: "Interviewed",
    application_date: "2026-02-01",
    salary: 90000,
  },
]

export default function Page() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  )
}