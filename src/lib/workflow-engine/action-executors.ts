type ExecuteActionParams = {
  action: "log_message" | "save_db_entry";
  message: string;
  task: {
    _id: string;
    title: string;
    status: string;
  };
};

export async function executeAction({
  action,
  message,
  task,
}: ExecuteActionParams) {
  switch (action) {
    case "log_message":
      return message || `Task "${task.title}" triggered a workflow`;

    case "save_db_entry":
      return `Database entry saved for task "${task.title}" with status "${task.status}"${
        message ? ` - ${message}` : ""
      }`;

    default:
      throw new Error("Unsupported workflow action");
  }
}