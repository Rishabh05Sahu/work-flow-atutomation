import Link from "next/link";
import { AuthForm } from "@/components/organisms/auth/AuthForm";

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      
      <div className="relative grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="hidden lg:block">
          <Link href="/" className="mb-8 inline-block text-sm text-neutral-400 hover:text-white">
            ← Back to home
          </Link>

          <div className="max-w-xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neutral-500">
              Workflow Automation
            </p>
            <h1 className="text-5xl font-bold leading-tight text-white">
              Start building your internal automation system
            </h1>
            <p className="mt-5 text-lg text-neutral-400">
              Sign up to create tasks, define workflows, and track every
              execution in a polished dashboard.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <AuthForm mode="signup" />
        </div>
      </div>
    </main>
  );
}