import { Task } from "@/models/Task";
import { Workflow } from "@/models/Workflow";
import { Log } from "@/models/Log";

function serializeLog(log: any) {
  return {
    _id: log._id.toString(),
    workflowId: log.workflowId?.toString?.() || "",
    userId: log.userId?.toString?.() || "",
    taskId: log.taskId?.toString?.() || undefined,
    trigger: log.trigger,
    action: log.action,
    status: log.status,
    output: log.output,
    createdAt: log.createdAt?.toISOString?.() || log.createdAt,
  };
}

export async function getDashboardOverview(userId: string) {
  const [totalTasks, activeWorkflows, totalLogs, successLogs, recentLogs] =
    await Promise.all([
      Task.countDocuments({ userId }),
      Workflow.countDocuments({ userId, isActive: true }),
      Log.countDocuments({ userId }),
      Log.countDocuments({ userId, status: "success" }),
      Log.find({ userId }).sort({ createdAt: -1 }).limit(5),
    ]);

  const successRate =
    totalLogs === 0 ? 0 : Math.round((successLogs / totalLogs) * 100);

  return {
    stats: {
      totalTasks,
      activeWorkflows,
      totalLogs,
      successRate,
    },
    recentLogs: recentLogs.map(serializeLog),
  };
}