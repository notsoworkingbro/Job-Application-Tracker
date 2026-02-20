"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Application, NewApplication } from "@/lib/db/schema";

interface Props {
  onAdd: (newApp: Application) => void;
}

export function AddApplicationDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    application_date: "",
    salary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, salary: Number(form.salary) } as NewApplication),
    });
    const newApp: Application = await response.json();
    onAdd(newApp);
    setOpen(false);
    setForm({ company: "", position: "", status: "Applied", application_date: "", salary: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">+ Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Company</Label>
            <Input name="company" value={form.company} onChange={handleChange} />
          </div>

          <div>
            <Label>Position</Label>
            <Input name="position" value={form.position} onChange={handleChange} />
          </div>

          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
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
            <Input type="date" name="application_date" value={form.application_date} onChange={handleChange} />
          </div>

          <div>
            <Label>Salary</Label>
            <Input type="number" name="salary" value={form.salary} onChange={handleChange} />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Add Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}