import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { InferSelectModel, InferInsertModel } from "drizzle-orm"

export const applications = pgTable("applications", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  status: text("status").notNull(),
  application_date: text("application_date").notNull(),
  salary: integer("salary").notNull(),
})

export type Application = InferSelectModel<typeof applications>

export type NewApplication = InferInsertModel<typeof applications>