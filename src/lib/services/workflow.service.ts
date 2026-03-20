import { createWorkflowSchema } from "@/lib/validations/workflow";
import { Workflow } from "@/models/Workflow";

function serializeWorkflow(workflow: any) {
  return {
    _id: workflow._id.toString(),
    userId: workflow.userId.toString(),
    trigger: workflow.trigger,
    action: workflow.action,
    message: workflow.message,
    isActive: workflow.isActive,
    createdAt: workflow.createdAt?.toISOString?.() || workflow.createdAt,
    updatedAt: workflow.updatedAt?.toISOString?.() || workflow.updatedAt,
  };
}

export async function createWorkflow(userId: string, body: unknown) {
  const parsed = createWorkflowSchema.safeParse(body);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid workflow data");
  }

  const workflow = await Workflow.create({
    userId,
    trigger: parsed.data.trigger,
    action: parsed.data.action,
    message: parsed.data.message,
    isActive: true,
  });

  return serializeWorkflow(workflow);
}

export async function getWorkflows(userId: string) {
  const workflows = await Workflow.find({ userId }).sort({ createdAt: -1 });
  return workflows.map(serializeWorkflow);
}

export async function toggleWorkflow(userId: string, workflowId: string) {
  const workflow = await Workflow.findOne({ _id: workflowId, userId });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  workflow.isActive = !workflow.isActive;
  await workflow.save();

  return serializeWorkflow(workflow);
}