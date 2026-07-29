export interface StatCardProps {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly value: string;
}
export default function StatCard({
  icon,
  label,
  value,
}: Readonly<StatCardProps>) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-3">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] uppercase tracking-wide text-white/50">
          {label}
        </span>
      </div>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
