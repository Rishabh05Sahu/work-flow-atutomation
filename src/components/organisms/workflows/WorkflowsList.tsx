"use client";

import { useState } from "react";
import { Bot, Loader2, Power, Workflow } from "lucide-react";
import { toast } from "sonner";

import { IWorkflow } from "@/types/workflow";
import { toggleWorkflowRequest } from "@/lib/services/workflow-client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";

type Props = {
  workflows: IWorkflow[];
  onUpdated: () => Promise<void> | void;
};

function triggerLabel(trigger: IWorkflow["trigger"]) {
  return trigger === "task_created" ? "Task Created" : "Task Updated";
}

function actionLabel(action: IWorkflow["action"]) {
  return action === "log_message" ? "Log Message" : "Save DB Entry";
}

export function WorkflowsList({ workflows, onUpdated }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggle = async (id: string) => {
    try {
      setLoadingId(id);
      await toggleWorkflowRequest(id);
      toast.success("Workflow updated successfully");
      await onUpdated();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update workflow");
    } finally {
      setLoadingId(null);
    }
  };

  if (!workflows.length) {
    return (
      <EmptyState
        icon={Workflow}
        title="No workflows yet"
        description="Create one to automate task events."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {workflows.map((workflow) => {
        const isLoading = loadingId === workflow._id;

        return (
          <div
            key={workflow._id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                    <Bot className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-white text-black hover:bg-white">
                      IF {triggerLabel(workflow.trigger)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/10 bg-white/5 text-white"
                    >
                      THEN {actionLabel(workflow.action)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        workflow.isActive
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-white/10 bg-white/5 text-neutral-400"
                      }
                    >
                      {workflow.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm leading-6 text-neutral-300">
                  {workflow.message}
                </p>

                <p className="text-xs text-neutral-500">
                  Created{" "}
                  {workflow.createdAt
                    ? new Date(workflow.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>

              <Button
                onClick={() => handleToggle(workflow._id!)}
                disabled={isLoading}
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Power className="mr-2 h-4 w-4" />
                    {workflow.isActive ? "Disable" : "Enable"}
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}