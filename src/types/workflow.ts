export type WorkflowTrigger = "task_created" | "task_updated";
export type WorkflowAction = "log_message" | "save_db_entry";

export interface IWorkflow {
  _id?: string;
  userId: string;
  trigger: WorkflowTrigger;
  action: WorkflowAction;
  message: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}