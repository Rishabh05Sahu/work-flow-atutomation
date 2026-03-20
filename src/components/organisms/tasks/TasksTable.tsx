"use client";

import { useState } from "react";
import { Loader2, Pencil, CheckSquare } from "lucide-react";
import { toast } from "sonner";

import { ITask, TaskStatus } from "@/types/task";
import { updateTaskRequest } from "@/lib/services/task-client";

import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

type Props = {
  tasks: ITask[];
  onUpdated: () => Promise<void> | void;
};

function getStatusLabel(status: TaskStatus) {
  switch (status) {
    case "pending":
      return "Pending";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

export function TasksTable({ tasks, onUpdated }: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    try {
      setUpdatingId(taskId);
      await updateTaskRequest(taskId, { status });
      toast.success("Task updated successfully");
      await onUpdated();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update task");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!tasks.length) {
    return (
      <EmptyState
        icon={CheckSquare}
        title="No tasks yet"
        description="Create your first task to trigger workflows."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-neutral-400">Title</TableHead>
            <TableHead className="text-neutral-400">Current Status</TableHead>
            <TableHead className="text-neutral-400">Update Status</TableHead>
            <TableHead className="text-neutral-400">Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => {
            const isUpdating = updatingId === task._id;

            return (
              <TableRow key={task._id} className="border-white/10">
                <TableCell className="font-medium text-white">
                  <div className="flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-neutral-500" />
                    {task.title}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white"
                  >
                    {getStatusLabel(task.status)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="w-[180px]">
                    <Select
                      value={task.status}
                      onValueChange={(value) =>
                        handleStatusChange(task._id!, value as TaskStatus)
                      }
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="border-white/10 bg-white/5 text-white">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>

                <TableCell className="text-neutral-400">
                  <div className="flex items-center gap-2">
                    {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleString()
                      : "-"}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}