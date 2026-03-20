import { Loader2 } from "lucide-react";

type Props = {
  text?: string;
};

export function LoadingCard({ text = "Loading..." }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-neutral-400">
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{text}</span>
      </div>
    </div>
  );
}