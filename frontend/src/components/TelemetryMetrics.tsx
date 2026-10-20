'use client';

import React from 'react';
import { MetricTileData } from '@/types/incident';

interface TelemetryMetricsProps {
  metrics: MetricTileData[];
}

export const TelemetryMetrics: React.FC<TelemetryMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
      {metrics.map((metric, idx) => {
        const isAlert = metric.status === 'alert';
        const isWarning = metric.status === 'warning';
        const isSuccess = metric.status === 'success';

        const borderColor = isAlert
          ? 'border-rose-500/30'
          : isWarning
          ? 'border-amber-500/30'
          : isSuccess
          ? 'border-emerald-500/30'
          : 'border-technical';

        const textColor = isAlert
          ? 'text-rose-400'
          : isWarning
          ? 'text-amber-400'
          : isSuccess
          ? 'text-emerald-400'
          : 'text-slate-100';

        return (
          <div
            key={idx}
            className={`p-2.5 rounded-lg bg-panel-base border ${borderColor} flex flex-col justify-between`}
          >
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {metric.label}
            </span>
            <div className={`text-sm sm:text-base font-mono font-bold ${textColor} my-0.5 tracking-tight`}>
              {metric.value}
            </div>
            {metric.sublabel && (
              <span className="text-[10px] text-slate-400 font-sans truncate">
                {metric.sublabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
