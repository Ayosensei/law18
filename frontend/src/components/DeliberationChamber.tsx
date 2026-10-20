'use client';

import React, { useState, useEffect } from 'react';
import { DeliberationStep } from '@/types/incident';
import { MessageSquare, ShieldCheck, Play, RotateCcw, Clock } from 'lucide-react';

interface DeliberationChamberProps {
  deliberation: DeliberationStep[];
  incidentId: string;
}

export const DeliberationChamber: React.FC<DeliberationChamberProps> = ({
  deliberation,
  incidentId,
}) => {
  const [streamIndex, setStreamIndex] = useState<number>(deliberation.length);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Reset when incident changes
  useEffect(() => {
    setStreamIndex(deliberation.length);
    setIsStreaming(false);
  }, [incidentId, deliberation.length]);

  const handleSimulateStream = () => {
    setStreamIndex(1);
    setIsStreaming(true);

    const timer1 = setTimeout(() => {
      setStreamIndex(2);
    }, 1200);

    const timer2 = setTimeout(() => {
      setStreamIndex(3);
      setIsStreaming(false);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  return (
    <div className="w-full bg-panel-base border border-technical rounded-lg p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
      {/* Header with Live Stream Simulation Control */}
      <div className="flex items-center justify-between pb-2 border-b border-technical">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-mono font-semibold tracking-wide text-slate-200">
            ADVERSARIAL DELIBERATION CHAMBER
          </h3>
        </div>

        <button
          onClick={handleSimulateStream}
          disabled={isStreaming}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-panel-elevated hover:bg-panel-subtle border border-technical text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
        >
          {isStreaming ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              Streaming Debate...
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-sky-400" />
              Replay Deliberation
            </>
          )}
        </button>
      </div>

      {/* Deliberation Posts */}
      <div className="flex flex-col gap-3 mt-1">
        {deliberation.slice(0, streamIndex).map((step, idx) => {
          const isDefense = step.role === 'DEFENSE';
          const isProsecution = step.role === 'PROSECUTION';
          const isArbitration = step.role === 'ARBITRATION';

          const roleBadgeColor = isDefense
            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
            : isProsecution
            ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
            : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';

          const cardBorder = isArbitration
            ? 'border-emerald-500/30 bg-panel-elevated/70'
            : 'border-technical bg-panel-elevated/40';

          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${cardBorder} flex flex-col gap-2 transition-all duration-300`}
            >
              {/* Agent Title & Timestamp */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-200 text-xs">
                    {step.agent}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border uppercase font-medium ${roleBadgeColor}`}>
                    {step.role}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {step.timestamp}
                </span>
              </div>

              {/* Message text */}
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {step.message}
              </p>

              {/* Citations */}
              {step.citations.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-technical/60">
                  <span className="text-[10px] font-mono text-slate-500 mr-1">
                    Citations:
                  </span>
                  {step.citations.map((cite, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-panel-base border border-technical text-slate-400"
                    >
                      {cite}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Model inference info */}
      <div className="pt-2 border-t border-technical flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>Reasoning Engine: NVIDIA Nemotron 70B</span>
        <span>Bounded Markovian Context ($O(1)$ Tokens)</span>
      </div>
    </div>
  );
};
