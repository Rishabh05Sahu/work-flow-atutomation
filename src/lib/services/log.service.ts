import { Log } from "@/models/Log";

function serializeLog(log: any) {
  return {
    _id: log._id.toString(),
    workflowId: log.workflowId.toString(),
    userId: log.userId.toString(),
    taskId: log.taskId?.toString?.() || undefined,
    trigger: log.trigger,
    action: log.action,
    status: log.status,
    output: log.output,
    createdAt: log.createdAt?.toISOString?.() || log.createdAt,
  };
}

export async function createExecutionLog(payload: {
  workflowId: string;
  userId: string;
  taskId?: string;
  trigger: string;
  action: string;
  status: "success" | "failed";
  output: string;
}) {
  const log = await Log.create(payload);
  return serializeLog(log);
}

export async function getLogs(userId: string) {
  const logs = await Log.find({ userId }).sort({ createdAt: -1 });
  return logs.map(serializeLog);
}