import { FileText } from "lucide-react";
import { ILog } from "@/types/log";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  logs: ILog[];
};

function triggerLabel(trigger: ILog["trigger"]) {
  return trigger === "task_created" ? "Task Created" : "Task Updated";
}

function actionLabel(action: ILog["action"]) {
  return action === "log_message" ? "Log Message" : "Save DB Entry";
}

export function LogsTable({ logs }: Props) {
  if (!logs.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No execution logs yet"
        description="Run a workflow by creating or updating a task."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-neutral-400">Trigger</TableHead>
            <TableHead className="text-neutral-400">Action</TableHead>
            <TableHead className="text-neutral-400">Status</TableHead>
            <TableHead className="text-neutral-400">Output</TableHead>
            <TableHead className="text-neutral-400">Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {logs.map((log) => (
            <TableRow key={log._id} className="border-white/10">
              <TableCell className="text-white">
                {triggerLabel(log.trigger)}
              </TableCell>
              <TableCell className="text-white">
                {actionLabel(log.action)}
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell className="max-w-[320px] text-neutral-300">
                <span className="line-clamp-2">{log.output}</span>
              </TableCell>
              <TableCell className="text-neutral-400">
                {log.createdAt ? new Date(log.createdAt).toLocaleString() : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}