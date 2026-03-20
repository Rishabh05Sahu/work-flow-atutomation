"use client";

import { useEffect, useState } from "react";
import { Workflow as WorkflowIcon } from "lucide-react";

import { IWorkflow } from "@/types/workflow";
import { getAllWorkflows } from "@/lib/services/workflow-client";
import { LoadingCard } from "@/components/shared/LoadingCard";
import { CreateWorkflowForm } from "@/components/organisms/workflows/CreateWorkflowForm";
import { WorkflowsList } from "@/components/organisms/workflows/WorkflowsList";

export function WorkflowsPageClient() {
  const [workflows, setWorkflows] = useState<IWorkflow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkflows = async () => {
    try {
      const response = await getAllWorkflows();
      setWorkflows(response.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <WorkflowIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Automation Rules
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">Workflows</h1>
            <p className="mt-3 max-w-2xl text-sm text-neutral-400">
              Create IF trigger THEN action rules that run automatically on task
              events.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <CreateWorkflowForm onCreated={fetchWorkflows} />

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">All Workflows</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Enable or disable workflows and monitor your automation rules.
            </p>
          </div>

          {loading ? (
            <LoadingCard text="Loading workflows..." />
          ) : (
            <WorkflowsList workflows={workflows} onUpdated={fetchWorkflows} />
          )}
        </div>
      </section>
    </div>
  );
}
