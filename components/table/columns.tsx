"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Application } from "@/lib/db/schema"



export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "application_date",
    header: "Application Date",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
]