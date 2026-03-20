"use client";

import { useState } from "react";
import { Menu, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { logoutUser } from "@/lib/services/auth-client";
import { Button } from "@/components/ui/button";

type Props = {
  userEmail?: string;
  onOpenSidebar?: () => void;
};

export function DashboardHeader({ userEmail, onOpenSidebar }: Props) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <p className="text-xs text-neutral-500">Welcome back</p>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 sm:block">
            {userEmail || "User"}
          </div>

          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}