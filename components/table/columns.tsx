"use client";

import * as React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Application } from "@/lib/db/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";


function EditableCell(
  props: CellContext<Application, unknown>
) {
  const { getValue, row, column, table } = props;

  const initialValue = getValue() as string | number;
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = async () => {
    const id = row.original.id;
    const field = column.id as keyof Application;

    await fetch("/api/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        field,
        value,
      }),
    });

    table.options.meta?.updateData?.(
      row.index,
      field,
      value
    );
  };

  return (
    <Input
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="h-8"
    />
  );
}

function StatusCell(
  props: CellContext<Application, unknown>
) {
  const { row, column, table } = props;

  const value = row.original.status;

  const handleChange = async (newValue: string) => {
    const id = row.original.id;
    const field = column.id as keyof Application;

    await fetch("/api/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        field,
        value: newValue,
      }),
    });

    table.options.meta?.updateData?.(
      row.index,
      field,
      newValue
    );
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Applied">Applied</SelectItem>
        <SelectItem value="Interview">Interview</SelectItem>
        <SelectItem value="Offer">Offer</SelectItem>
        <SelectItem value="Rejected">Rejected</SelectItem>
        <SelectItem value="Pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
}

function DateCell(
  props: CellContext<Application, unknown>
) {
  const { row, column, table } = props;

  const rawValue = row.original.application_date;

  const parsedDate =
    rawValue && !isNaN(new Date(rawValue).getTime())
      ? new Date(rawValue)
      : undefined;

  const handleChange = async (date: Date | undefined) => {
    if (!date) return;

    const id = row.original.id;
    const field = column.id as keyof Application;

    const formattedDate = format(date, "yyyy-MM-dd");

    await fetch("/api/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        field,
        value: formattedDate,
      }),
    });

    table.options.meta?.updateData?.(
      row.index,
      field,
      formattedDate
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-full justify-start text-left font-normal"
        >
          {parsedDate
            ? format(parsedDate, "PPP")
            : "Pick a date"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export const columns: ColumnDef<Application>[] = [
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

  {
    accessorKey: "company",
    header: "Company",
    cell: EditableCell,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: EditableCell,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "application_date",
    header: "Application Date",
    cell: DateCell,
    sortingFn: "datetime",
  },
  {
    accessorKey: "min_salary",
    header: "Minimum Salary",
    cell: EditableCell,
  },
  {
    accessorKey: "max_salary",
    header: "Maximum Salary",
    cell: EditableCell,
  },
];