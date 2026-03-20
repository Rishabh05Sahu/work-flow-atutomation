export const TASK_STATUSES = ["pending", "in_progress", "completed"] as const;

export const WORKFLOW_TRIGGERS = ["task_created", "task_updated"] as const;

export const WORKFLOW_ACTIONS = ["log_message", "save_db_entry"] as const;