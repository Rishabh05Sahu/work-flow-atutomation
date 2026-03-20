"use client";

import { useEffect, useState } from "react";
import { Activity, CheckSquare, FileText, Workflow } from "lucide-react";

import { DashboardHero } from "@/components/organisms/dashboard/DashboardHero";
import { RecentLogsList } from "@/components/organisms/dashboard/RecentLogsList";
import { StatCard } from "@/components/molecules/dashboard/StatCard";
import { SectionCard } from "@/components/shared/SectionCard";
import { LoadingCard } from "@/components/shared/LoadingCard";

import { getDashboardOverviewRequest } from "@/lib/services/dashboard-client";
import { ILog } from "@/types/log";

type OverviewState = {
  stats: {
    totalTasks: number;
    activeWorkflows: number;
    totalLogs: number;
    successRate: number;
  };
  recentLogs: ILog[];
};

export default function DashboardPage() {
  const [overview, setOverview] = useState<OverviewState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await getDashboardOverviewRequest();
        setOverview(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardHero />

      {loading || !overview ? (
        <LoadingCard text="Loading dashboard overview..." />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Tasks"
              value={overview.stats.totalTasks}
              description="Tasks created by you"
              icon={CheckSquare}
            />
            <StatCard
              title="Active Workflows"
              value={overview.stats.activeWorkflows}
              description="Automation rules currently enabled"
              icon={Workflow}
            />
            <StatCard
              title="Execution Logs"
              value={overview.stats.totalLogs}
              description="Workflow runs tracked in the system"
              icon={FileText}
            />
            <StatCard
              title="Success Rate"
              value={`${overview.stats.successRate}%`}
              description="Execution performance overview"
              icon={Activity}
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <SectionCard
              title="Recent Activity"
              description="Latest workflow executions from your system."
            >
              <RecentLogsList logs={overview.recentLogs} />
            </SectionCard>

            <SectionCard
              title="How it works"
              description="Your automation engine listens for task events and executes matching workflows."
            >
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-neutral-300">
                  IF task is created → THEN log a message
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-neutral-300">
                  IF task is updated → THEN save an entry in database
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-neutral-300">
                  Every execution is stored as a log with status, output, and timestamp.
                </div>
              </div>
            </SectionCard>
          </section>
        </>
      )}
    </div>
  );
}