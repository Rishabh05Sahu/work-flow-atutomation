"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PanelLeftClose } from "lucide-react";

import { dashboardNavItems } from "@/lib/utils/dashboard-nav";
import { cn } from "@/lib/utils";

type Props = {
  onClose?: () => void;
};

export function DashboardSidebar({ onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            Workflow
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">Automation</h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {dashboardNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-white text-black"
                  : "text-neutral-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-xl bg-white"
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-neutral-500">Assignment Project</p>
          <p className="mt-1 text-sm text-neutral-300">
            Trigger-action automation dashboard
          </p>
        </div>
      </div>
    </aside>
  );
}