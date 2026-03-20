"use client";

import { motion } from "framer-motion";

type Props = {
  email?: string;
};

export function DashboardHero({ email }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] p-6 shadow-2xl"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
        Workflow Control Center
      </p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
        Build automations around your task activity
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
        Create tasks, define trigger-action workflows, and monitor execution logs
        from one clean dashboard.
        {email ? ` Signed in as ${email}.` : ""}
      </p>
    </motion.div>
  );
}