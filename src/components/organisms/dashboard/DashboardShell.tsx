"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { DashboardSidebar } from "@/components/organisms/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/organisms/dashboard/DashboardHeader";
import { getCurrentUser } from "@/lib/services/auth-client";

type Props = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        setUserEmail(response.data?.email || "");
      } catch {
        setUserEmail("");
      }
    };

    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="flex min-h-screen">
        <div className="hidden w-72 lg:block">
          <DashboardSidebar />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative h-full w-72">
              <DashboardSidebar onClose={() => setSidebarOpen(false)} />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 p-2 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader
            userEmail={userEmail}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
          <main className="flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}