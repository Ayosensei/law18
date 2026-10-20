'use client';

import React from 'react';
import { MetricTileData } from '@/types/incident';
import { Activity, Radio, MapPin, Scale } from 'lucide-react';

interface TelemetryMetricsProps {
  metrics: MetricTileData[];
}

export const TelemetryMetrics: React.FC<TelemetryMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {metrics.map((metric, idx) => {
        const isAlert = metric.status === 'alert';
        const isWarning = metric.status === 'warning';
        const isSuccess = metric.status === 'success';

        const borderColor = isAlert
          ? 'border-rose-500/30 bg-rose-500/5'
          : isWarning
          ? 'border-amber-500/30 bg-amber-500/5'
          : isSuccess
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-technical bg-panel-base';

        const textColor = isAlert
          ? 'text-rose-400'
          : isWarning
          ? 'text-amber-400'
          : isSuccess
          ? 'text-emerald-400'
          : 'text-slate-100';

        const getIcon = (label: string) => {
          if (label.includes('BALL')) return <Radio className="w-3.5 h-3.5 text-sky-400" />;
          if (label.includes('TOUCH') || label.includes('FORCE') || label.includes('BOOT')) return <Activity className="w-3.5 h-3.5 text-rose-400" />;
          if (label.includes('BOX') || label.includes('DEFENDER') || label.includes('PROXIMITY')) return <MapPin className="w-3.5 h-3.5 text-amber-400" />;
          return <Scale className="w-3.5 h-3.5 text-emerald-400" />;
        };

        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${borderColor} flex flex-col justify-between transition-all hover:border-slate-600 shadow-sm`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {metric.label}
              </span>
              {getIcon(metric.label)}
            </div>

            <div className={`text-base sm:text-lg font-bold ${textColor} tracking-tight`}>
              {metric.value}
            </div>

            {metric.sublabel && (
              <span className="text-xs text-slate-400 mt-1 font-medium leading-snug">
                {metric.sublabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
