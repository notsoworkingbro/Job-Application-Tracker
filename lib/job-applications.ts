import { ColumnDef } from "@tanstack/react-table"
import type { Application } from "@/lib/db/schema"

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
    accessorKey: "min_salary",
    header: "Minimum Salary",
  },
  {
    accessorKey: "max_salary",
    header: "Maximum Salary",
  },
]