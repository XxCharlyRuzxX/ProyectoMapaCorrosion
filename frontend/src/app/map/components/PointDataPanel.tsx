"use client";

import { CorrosionGrade, CorrosionPoint } from "@/app/core/CorrosionPoint";
import { X, AlertTriangle, Droplet, Wind, FlaskConical } from "lucide-react";
import StatCard, { StatCardProps } from "./StatCrad";
import MetricCard, { MetricCardProps } from "./MetricCard";

type Props = {
  point: CorrosionPoint;
  onClose: () => void;
};

const gradeConfig: Record<
  CorrosionGrade,
  { label: string; bg: string; border: string; text: string }
> = {
  [CorrosionGrade.Low]: {
    label: "Bajo",
    bg: "bg-green-950/40",
    border: "border-green-900/60",
    text: "text-green-400",
  },
  [CorrosionGrade.Medium]: {
    label: "Medio",
    bg: "bg-amber-950/40",
    border: "border-amber-900/60",
    text: "text-amber-400",
  },
  [CorrosionGrade.High]: {
    label: "Alto",
    bg: "bg-red-950/40",
    border: "border-red-900/60",
    text: "text-red-400",
  },
};

export default function CorrosionPanel({ point, onClose }: Readonly<Props>) {
  const grade = gradeConfig[point.corrosionGrade];

  const metricCards: MetricCardProps[] = [
    {
      icon: <Droplet className="w-4 h-4 text-sky-400" />,
      label: "Temperatura",
      value: point.environmentalParameters.temperature,
      unit: "°C",
      barColor: "bg-sky-400",
      percent: Math.min(point.environmentalParameters.temperature, 100),
    },
    {
      icon: <Wind className="w-4 h-4 text-red-300" />,
      label: "Humedad",
      value: point.environmentalParameters.humidity,
      unit: "%",
      barColor: "bg-red-300",
      percent: point.environmentalParameters.humidity,
    },
    {
      icon: <FlaskConical className="w-4 h-4 text-purple-300" />,
      label: "pH",
      value: point.environmentalParameters.ph,
      unit: "",
      barColor: "bg-purple-300",
      percent: (point.environmentalParameters.ph / 14) * 100,
    },
    {
      icon: <Droplet className="w-4 h-4 text-cyan-300" />,
      label: "Cloruros",
      value: point.environmentalParameters.chlorides,
      unit: "mg/L",
      barColor: "bg-cyan-300",
      percent: Math.min(point.environmentalParameters.chlorides, 100),
    },
    {
      icon: <FlaskConical className="w-4 h-4 text-yellow-300" />,
      label: "Sulfatos",
      value: point.environmentalParameters.sulfates,
      unit: "mg/L",
      barColor: "bg-yellow-300",
      percent: Math.min(point.environmentalParameters.sulfates, 100),
    },
  ];

  const statCards: StatCardProps[] = [
    {
      icon: <FlaskConical className="w-4 h-4 text-white/50" />,
      label: "Tasa de corrosión",
      value: point.corrosionRate,
    },
    {
      icon: <Wind className="w-4 h-4 text-white/50" />,
      label: "Última actualización",
      value: point.lastUpdate,
    },
  ];

  return (
    <div className="h-full w-full bg-black text-white overflow-y-auto">
      <div className="flex items-start justify-between p-4">
        <div>
          <h2 className="text-lg font-semibold">{point.name}</h2>
          <p className="text-xs text-white/50 mt-1">
            {point.position.lat.toFixed(4)}° N,{" "}
            {Math.abs(point.position.lng).toFixed(4)}° W
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4">
        <div
          className={`flex items-center gap-3 rounded-lg border p-3 ${grade.bg} ${grade.border}`}
        >
          <AlertTriangle className={`w-5 h-5 shrink-0 ${grade.text}`} />
          <div>
            <p className="text-[10px] uppercase tracking-wide text-white/50">
              Grado de corrosión
            </p>
            <p className={`text-sm font-semibold ${grade.text}`}>
              {grade.label}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        {statCards.map((card , i)=>(
        <StatCard
          key={`${card.label}-${i}`}
         {...card}
        />
        ))}
      </div>

      <div className="px-4 pb-4">
        <h3 className="text-sm font-medium text-white/70 mb-3">
          Parámetros ambientales
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {metricCards.map((card, i) => (
            <MetricCard key={`${card.label}-${i}`} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
