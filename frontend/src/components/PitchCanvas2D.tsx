'use client';

import React, { useState } from 'react';
import { PitchState, PlayerNode } from '@/types/incident';
import { Activity, Eye, Compass } from 'lucide-react';

interface PitchCanvas2DProps {
  pitch: PitchState;
  shortTitle: string;
}

export const PitchCanvas2D: React.FC<PitchCanvas2DProps> = ({ pitch, shortTitle }) => {
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerNode | null>(null);

  return (
    <div className="w-full bg-panel-base border border-technical rounded-lg overflow-hidden flex flex-col shadow-sm">
      {/* Pitch Header */}
      <div className="px-4 py-2.5 bg-panel-elevated/70 border-b border-technical flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono font-semibold tracking-wide text-slate-200">
            SPATIAL TELEMETRY CANVAS
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span> FC Barcelona
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Atlético Madrid
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Referee
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full aspect-[105/68] bg-[#0A131C] p-2 sm:p-4 select-none">
        <svg
          viewBox={pitch.viewBox}
          className="w-full h-full drop-shadow-md"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Vector Arrow Head */}
            <marker
              id="vector-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38BDF8" />
            </marker>
            <marker
              id="collision-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#F43F5E" />
            </marker>
            <marker
              id="recovery-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
            </marker>
          </defs>

          {/* Tactical Pitch Lines */}
          <g stroke="#1E293B" strokeWidth="0.5" fill="none">
            {/* Outer Pitch Boundary */}
            <rect x="0" y="0" width="105" height="68" strokeWidth="0.6" />

            {/* Halfway Line */}
            <line x1="52.5" y1="0" x2="52.5" y2="68" />
            <circle cx="52.5" cy="34" r="9.15" />
            <circle cx="52.5" cy="34" r="0.6" fill="#1E293B" />

            {/* Left Penalty Box (16.5m x 40.32m) */}
            <rect x="0" y="13.84" width="16.5" height="40.32" />
            {/* Left 6-Yard Box (5.5m x 18.32m) */}
            <rect x="0" y="24.84" width="5.5" height="18.32" />
            {/* Left Penalty Spot (11m) */}
            <circle cx="11.0" cy="34.0" r="0.6" fill="#1E293B" />
            {/* Left Penalty Arc (9.15m from penalty spot) */}
            <path d="M 16.5 26.5 A 9.15 9.15 0 0 1 16.5 41.5" />

            {/* Right Penalty Box */}
            <rect x="88.5" y="13.84" width="16.5" height="40.32" />
            {/* Right 6-Yard Box */}
            <rect x="99.5" y="24.84" width="5.5" height="18.32" />
            {/* Right Penalty Spot */}
            <circle cx="94.0" cy="34.0" r="0.6" fill="#1E293B" />
            {/* Right Penalty Arc */}
            <path d="M 88.5 26.5 A 9.15 9.15 0 0 0 88.5 41.5" />
          </g>

          {/* Highlight Zone Overlay */}
          <rect
            x={pitch.highlightZone.x}
            y={pitch.highlightZone.y}
            width={pitch.highlightZone.width}
            height={pitch.highlightZone.height}
            fill="#38BDF8"
            fillOpacity="0.05"
            stroke="#38BDF8"
            strokeOpacity="0.25"
            strokeWidth="0.4"
            strokeDasharray="2, 2"
          />

          {/* Telemetry Vectors */}
          {pitch.vectors.map((vec) => (
            <g key={vec.id}>
              <line
                x1={vec.from.x}
                y1={vec.from.y}
                x2={vec.to.x}
                y2={vec.to.y}
                stroke={vec.color}
                strokeWidth="0.7"
                strokeDasharray={vec.dashed ? '1.5, 1.5' : undefined}
                markerEnd={
                  vec.type === 'COLLISION'
                    ? 'url(#collision-arrow)'
                    : vec.color === '#10B981'
                    ? 'url(#recovery-arrow)'
                    : 'url(#vector-arrow)'
                }
              />
              <text
                x={(vec.from.x + vec.to.x) / 2}
                y={(vec.from.y + vec.to.y) / 2 - 1.2}
                fill={vec.color}
                fontSize="1.6"
                fontWeight="600"
                textAnchor="middle"
                className="font-mono"
              >
                {vec.label}
              </text>
            </g>
          ))}

          {/* Contact Point Pulse */}
          {pitch.contactPoint && (
            <g>
              <circle
                cx={pitch.contactPoint.x}
                cy={pitch.contactPoint.y}
                r="3.2"
                fill="#F43F5E"
                fillOpacity="0.2"
                className="animate-ping"
              />
              <circle
                cx={pitch.contactPoint.x}
                cy={pitch.contactPoint.y}
                r="1.2"
                fill="#F43F5E"
                stroke="#FFFFFF"
                strokeWidth="0.4"
              />
              <text
                x={pitch.contactPoint.x}
                y={pitch.contactPoint.y + 3.2}
                fill="#F43F5E"
                fontSize="1.4"
                fontWeight="bold"
                textAnchor="middle"
                className="font-mono drop-shadow"
              >
                {pitch.contactPoint.timestamp} Contact
              </text>
            </g>
          )}

          {/* Ball Indicator */}
          <g>
            <circle
              cx={pitch.ball.x}
              cy={pitch.ball.y}
              r="1.0"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="0.3"
            />
            <circle cx={pitch.ball.x} cy={pitch.ball.y} r="0.4" fill="#000000" />
          </g>

          {/* Player Nodes */}
          {pitch.players.map((player) => {
            const isHome = player.team === 'BARCELONA';
            const isRef = player.team === 'REFEREE';
            const fill = isRef ? '#EAB308' : isHome ? '#1E3A8A' : '#881337';
            const stroke = isRef ? '#FEF08A' : isHome ? '#38BDF8' : '#FB7185';

            return (
              <g
                key={player.id}
                onMouseEnter={() => setHoveredPlayer(player)}
                onMouseLeave={() => setHoveredPlayer(null)}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                {/* Action Subject Pulsing Halo */}
                {player.isActionSubject && (
                  <circle
                    cx={player.x}
                    cy={player.y}
                    r="2.6"
                    fill="none"
                    stroke={stroke}
                    strokeWidth="0.4"
                    strokeDasharray="1, 1"
                    className="animate-spin"
                  />
                )}
                {/* Player Circle */}
                <circle
                  cx={player.x}
                  cy={player.y}
                  r="1.8"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.4"
                />
                {/* Player Number */}
                <text
                  x={player.x}
                  y={player.y}
                  dy="0.6"
                  textAnchor="middle"
                  fontSize="1.4"
                  fontWeight="bold"
                  fill="#FFFFFF"
                  className="font-mono select-none"
                >
                  {isRef ? 'R' : player.number}
                </text>
                {/* Player Name Tag */}
                <text
                  x={player.x}
                  y={player.y - 2.5}
                  textAnchor="middle"
                  fontSize="1.5"
                  fontWeight="500"
                  fill="#CBD5E1"
                  className="font-sans drop-shadow-sm select-none"
                >
                  {player.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered Player Tooltip Pill */}
        {hoveredPlayer && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-panel-elevated/95 border border-technical text-[11px] font-mono text-slate-200 shadow-md">
            <span className="font-semibold text-white">{hoveredPlayer.label}</span>
            <span className="text-slate-400 ml-2">
              Position: ({hoveredPlayer.x.toFixed(1)}m, {hoveredPlayer.y.toFixed(1)}m)
            </span>
          </div>
        )}
      </div>

      {/* Pitch Footer: Metric coordinates caption */}
      <div className="px-4 py-2 bg-panel-elevated/40 border-t border-technical flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-slate-500" />
          Standard 105m × 68m Pitch Grid
        </span>
        <span className="text-slate-500">
          State Model: Meterless World Model Service
        </span>
      </div>
    </div>
  );
};
