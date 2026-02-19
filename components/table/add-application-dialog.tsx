"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddApplicationDialog() {

  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    application_date: "",
    salary: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {

    await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        salary: Number(form.salary)
      })
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {/* Small Add Button */}
      <DialogTrigger asChild>
        <Button size="sm">+ Add</Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Company */}
          <div>
            <Label>Company</Label>
            <Input
              name="company"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          {/* Position */}
          <div>
            <Label>Position</Label>
            <Input
              name="position"
              value={form.position}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
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

          {/* Date */}
          <div>
            <Label>Application Date</Label>
            <Input
              type="date"
              name="application_date"
              value={form.application_date}
              onChange={handleChange}
            />
          </div>

          {/* Salary */}
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
            Add Application
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}