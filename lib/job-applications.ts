"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
export type Application = {
    company: string,
    position: string,
    status: "Offer" | "Applied" | "Interviewed" | "Rejected" | "Pending"
    application_date: string,
    salary: number,
}

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