import { Workflow } from "@/models/Workflow";
import { createExecutionLog } from "@/lib/services/log.service";
import { executeAction } from "./action-executors";

type ExecuteWorkflowParams = {
  userId: string;
  trigger: "task_created" | "task_updated";
  task: {
    _id: string;
    title: string;
    status: string;
  };
};

export async function executeWorkflows({
  userId,
  trigger,
  task,
}: ExecuteWorkflowParams) {
  const workflows = await Workflow.find({
    userId,
    trigger,
    isActive: true,
  });

  if (!workflows.length) {
    return;
  }

  for (const workflow of workflows) {
    try {
      const output = await executeAction({
        action: workflow.action,
        message: workflow.message,
        task,
      });

      await createExecutionLog({
        workflowId: workflow._id.toString(),
        userId,
        taskId: task._id,
        trigger,
        action: workflow.action,
        status: "success",
        output,
      });
    } catch (error) {
      await createExecutionLog({
        workflowId: workflow._id.toString(),
        userId,
        taskId: task._id,
        trigger,
        action: workflow.action,
        status: "failed",
        output:
          error instanceof Error
            ? error.message
            : "Workflow execution failed",
      });
    }
  }
}