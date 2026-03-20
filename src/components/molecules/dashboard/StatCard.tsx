import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
};

export function StatCard({ title, value, description, icon: Icon }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
          <p className="mt-2 text-sm text-neutral-500">{description}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}