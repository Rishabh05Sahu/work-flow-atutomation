import { ILog } from "@/types/log";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { FileText } from "lucide-react";

type Props = {
  logs: ILog[];
};

function triggerLabel(trigger: ILog["trigger"]) {
  return trigger === "task_created" ? "Task Created" : "Task Updated";
}

function actionLabel(action: ILog["action"]) {
  return action === "log_message" ? "Log Message" : "Save DB Entry";
}

export function RecentLogsList({ logs }: Props) {
  if (!logs.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No recent activity"
        description="Create a workflow and trigger it by creating or updating a task."
      />
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log._id}
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white text-black hover:bg-white">
              {triggerLabel(log.trigger)}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/10 bg-white/5 text-white"
            >
              {actionLabel(log.action)}
            </Badge>
            <Badge
              variant="outline"
              className={
                log.status === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }
            >
              {log.status}
            </Badge>
          </div>

          <p className="mt-3 text-sm text-neutral-300">{log.output}</p>
          <p className="mt-2 text-xs text-neutral-500">
            {log.createdAt ? new Date(log.createdAt).toLocaleString() : "-"}
          </p>
        </div>
      ))}
    </div>
  );
}