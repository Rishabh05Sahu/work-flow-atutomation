import { z } from "zod";
import { TASK_STATUSES } from "../utils/constants";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(TASK_STATUSES).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  status: z.enum(TASK_STATUSES).optional(),
});