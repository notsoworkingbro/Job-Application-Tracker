"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { Application } from "@/lib/db/schema";

export const columns: ColumnDef<Application>[] = [
  // ✅ CHECKBOX COLUMN
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Your existing columns
  { accessorKey: "company", header: "Company" },
  { accessorKey: "position", header: "Position" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "application_date", header: "Application Date" },
  { accessorKey: "salary", header: "Salary" },
];