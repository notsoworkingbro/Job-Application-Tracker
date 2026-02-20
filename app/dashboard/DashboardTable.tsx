"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import type { Application } from "@/lib/db/schema";

export default function DashboardTable() {
  const [data, setData] = useState<Application[]>([]);

  // Load initial data from API
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/applications");
      const apps: Application[] = await res.json();
      setData(apps);
    }
    fetchData();
  }, []);

  const handleAdd = (newApp: Application) => setData((prev) => [...prev, newApp]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} onAdd={handleAdd} />
    </div>
  );
}