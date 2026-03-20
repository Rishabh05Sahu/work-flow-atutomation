import type { WorkflowAction, WorkflowTrigger } from "./workflow";

export interface ILog {
  _id?: string;
  workflowId: string;
  userId: string;
  taskId?: string;
  trigger: WorkflowTrigger;
  action: WorkflowAction;
  status: "success" | "failed";
  output: string;
  createdAt?: string;
}