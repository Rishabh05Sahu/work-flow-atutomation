import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <Icon className="h-5 w-5 text-neutral-400" />
      </div>
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm text-neutral-400">{description}</p>
    </div>
  );
}