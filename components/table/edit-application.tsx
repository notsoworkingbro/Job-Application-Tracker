"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Application = {
  id: number
  company: string
  position: string
  status: string
  application_date: string
  salary: number
}

interface Props {
  application: Application
}

export function EditApplication({ application }: Props) {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    company: application.company,
    position: application.position,
    status: application.status,
    application_date: application.application_date,
    salary: application.salary.toString(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    await fetch("/api/applications", {
      method: "PUT",
      body: JSON.stringify({
        id: application.id,
        ...form,
        salary: Number(form.salary),
      }),
    })

    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Company</Label>
            <Input
              name="company"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Position</Label>
            <Input
              name="position"
              value={form.position}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm({ ...form, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interviewed">Interviewed</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Application Date</Label>
            <Input
              type="date"
              name="application_date"
              value={form.application_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Save Changes
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}