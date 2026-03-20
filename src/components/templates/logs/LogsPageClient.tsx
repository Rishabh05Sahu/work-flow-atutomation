"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import { ILog } from "@/types/log";
import { getAllLogs } from "@/lib/services/log-client";
import { LoadingCard } from "@/components/shared/LoadingCard";
import { LogsTable } from "@/components/organisms/logs/LogsTable";

export function LogsPageClient() {
  const [logs, setLogs] = useState<ILog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await getAllLogs();
      setLogs(response.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Execution Tracking
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">Logs</h1>
            <p className="mt-3 max-w-2xl text-sm text-neutral-400">
              Track every workflow execution with result status and output.
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <LoadingCard text="Loading logs..." />
      ) : (
        <LogsTable logs={logs} />
      )}
    </div>
  );
}
