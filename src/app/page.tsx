import Link from "next/link";
import { ArrowRight, Workflow, CheckSquare, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
          Full Stack Assignment Project
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          Build automation workflows for your tasks with a clean modern dashboard
        </h1>

        <p className="mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg">
          Create tasks, define trigger-action workflows, and track execution logs
          in one polished system.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
          >
            Login
          </Link>
        </div>

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <Workflow className="mb-4 h-8 w-8 text-white" />
            <h3 className="text-lg font-semibold">Workflows</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Create IF event THEN action workflows in a simple interface.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <CheckSquare className="mb-4 h-8 w-8 text-white" />
            <h3 className="text-lg font-semibold">Tasks</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Manage tasks and automatically trigger workflow executions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <FileText className="mb-4 h-8 w-8 text-white" />
            <h3 className="text-lg font-semibold">Execution Logs</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Track every workflow execution with status and output details.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}