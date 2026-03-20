"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { createTaskSchema } from "@/lib/validations/task";
import { createTaskRequest } from "@/lib/services/task-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof createTaskSchema>;

type Props = {
  onCreated: () => Promise<void> | void;
};

export function CreateTaskForm({ onCreated }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      status: "pending",
    },
  });

  const selectedStatus = watch("status");

  const onSubmit = async (values: FormValues) => {
    try {
      await createTaskRequest(values);
      toast.success("Task created successfully");
      reset({ title: "", status: "pending" });
      await onCreated();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create task");
    }
  };

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription className="text-neutral-400">
          Add a task that can trigger automation workflows.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              {...register("title")}
              className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
            />
            {errors.title && (
              <p className="text-sm text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setValue("status", value as FormValues["status"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="Select task status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-400">{errors.status.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-neutral-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Task
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}