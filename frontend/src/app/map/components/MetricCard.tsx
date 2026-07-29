export interface MetricCardProps {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly value: number;
  readonly unit: string;
  readonly barColor: string;
  readonly percent: number;
}

export default function MetricCard({ icon, label, value, unit, barColor, percent } : Readonly<MetricCardProps>) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-3">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] uppercase tracking-wide text-white/50">{label}</span>
      </div>
      <p className="text-lg font-semibold mb-2">
        {value}
        {unit && <span className="text-xs text-white/40 ml-1">{unit}</span>}
      </p>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}