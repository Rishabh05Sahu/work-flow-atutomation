"use client";

import { useEffect, useState } from "react";
import { CheckSquare } from "lucide-react";

import { ITask } from "@/types/task";
import { getAllTasks } from "@/lib/services/task-client";
import { LoadingCard } from "@/components/shared/LoadingCard";
import { CreateTaskForm } from "@/components/organisms/tasks/CreateTaskForm";
import { TasksTable } from "@/components/organisms/tasks/TasksTable";

export function TasksPageClient() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Task Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">Tasks</h1>
            <p className="mt-3 max-w-2xl text-sm text-neutral-400">
              Create and update tasks. These task events will act as triggers
              for your automation workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <CreateTaskForm onCreated={fetchTasks} />

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">All Tasks</h2>
            <p className="mt-1 text-sm text-neutral-400">
              View and update the status of your tasks.
            </p>
          </div>

          {loading ? (
            <LoadingCard text="Loading tasks..." />
          ) : (
            <TasksTable tasks={tasks} onUpdated={fetchTasks} />
          )}
        </div>
      </section>
    </div>
  );
}
