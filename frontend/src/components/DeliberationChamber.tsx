'use client';

import React, { useState, useEffect } from 'react';
import { DeliberationStep } from '@/types/incident';
import { MessageSquare, Play, Clock, CheckCircle2, ShieldAlert, Headphones } from 'lucide-react';

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

  const getAgentFriendlyName = (agent: string, role: string) => {
    if (agent === 'VARAdvocate' || role === 'DEFENSE') {
      return {
        title: 'VAR Video Referee',
        subtitle: 'Defending the on-field call',
        icon: <Headphones className="w-4 h-4 text-amber-400" />,
        badge: 'On-Pitch Perspective',
        badgeColor: 'bg-amber-500/15 border-amber-500/30 text-amber-300'
      };
    }
    if (agent === 'RulesAuditor' || role === 'PROSECUTION') {
      return {
        title: 'IFAB Rulebook Auditor',
        subtitle: 'Strict law & precedent check',
        icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
        badge: 'Law 12 Audit',
        badgeColor: 'bg-rose-500/15 border-rose-500/30 text-rose-300'
      };
    }
    return {
      title: 'Final Independent Consensus',
      subtitle: 'Official recommendation & verdict',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      badge: 'Final Consensus',
      badgeColor: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
    };
  };

  return (
    <div className="w-full bg-panel-base border border-technical rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-md">
      {/* Header with Review Audio / Simulation Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-technical">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Inside the VAR Review Discussion
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step debate between the video referee, rulebook auditor, and final consensus
          </p>
        </div>

        <button
          onClick={handleSimulateStream}
          disabled={isStreaming}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-panel-elevated hover:bg-panel-subtle border border-technical text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          {isStreaming ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Replaying Discussion...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-sky-400" />
              <span>Replay VAR Discussion</span>
            </>
          )}
        </button>
      </div>

      {/* Deliberation Posts */}
      <div className="flex flex-col gap-3">
        {deliberation.slice(0, streamIndex).map((step, idx) => {
          const info = getAgentFriendlyName(step.agent, step.role);
          const isFinal = idx === 2 || step.role === 'ARBITRATION';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all duration-300 flex flex-col gap-2.5 ${
                isFinal
                  ? 'border-emerald-500/40 bg-emerald-950/20 shadow-sm'
                  : 'border-technical bg-panel-elevated/50'
              }`}
            >
              {/* Agent Title & Timestamp */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-panel-base border border-technical">
                    {info.icon}
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 text-xs sm:text-sm block">
                      {info.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-normal">
                      {info.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${info.badgeColor}`}>
                    {info.badge}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {step.timestamp}
                  </span>
                </div>
              </div>

              {/* Message text */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-1">
                {step.message}
              </p>

              {/* Citations */}
              {step.citations.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-technical/60">
                  <span className="text-[11px] font-medium text-slate-400 mr-1">
                    Official Rules Cited:
                  </span>
                  {step.citations.map((cite, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-panel-base border border-technical text-sky-300 font-medium"
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
      <div className="pt-2 border-t border-technical flex items-center justify-between text-xs text-slate-400">
        <span>Deliberation Engine: Multi-Agent Consensus Graph</span>
        <span>Powered by NVIDIA Nemotron & Meterless</span>
      </div>
    </div>
  );
};
