export type TaskStatus = "pending" | "in_progress" | "completed";

export interface ITask {
  _id?: string;
  userId: string;
  title: string;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}