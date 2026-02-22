"use client";

import * as React from "react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    updateData?: (
      rowIndex: number,
      columnId: keyof TData,
      value: unknown
    ) => void;
  }
}

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteTableAction } from "./delete-application";
import { AddApplicationDialog } from "./add-application-dialog";
import type { Application } from "@/lib/db/schema";

interface DataTableProps {
  columns: ColumnDef<Application, unknown>[];
  data: Application[];
  onAdd: (newApp: Application) => void;
  onDelete: (ids: number[]) => void;
}

export function DataTable({ columns, data, onAdd, onDelete }: DataTableProps) {
  const [localData, setLocalData] = React.useState<Application[]>(data);

  React.useEffect(() => {
    setLocalData(data);
  }, [data]);

  const table = useReactTable({
    data: localData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setLocalData((old) =>
          old.map((row, index) =>
            index === rowIndex
              ? { ...row, [columnId]: value }
              : row
          )
        );
      },
    },
  });

  return (
    <div className="mb-4 px-4 py-2">
      <div className="flex gap-2 mb-4">
        <AddApplicationDialog onAdd={onAdd} />
        <DeleteTableAction table={table} onDelete={onDelete}/>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}