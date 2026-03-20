import { z } from "zod";
import { WORKFLOW_ACTIONS, WORKFLOW_TRIGGERS } from "../utils/constants";

export const createWorkflowSchema = z.object({
  trigger: z.enum(WORKFLOW_TRIGGERS),
  action: z.enum(WORKFLOW_ACTIONS),
  message: z.string().min(1, "Message is required"),
});