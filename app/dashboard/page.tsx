import { columns} from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"

import { applications } from "@/lib/db/schema"
import { db } from "@/lib/db/db"

export default async function Page() {

  // 🔥 Fetch data from Neon database
  const data = await db.select().from(applications)

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  )
}