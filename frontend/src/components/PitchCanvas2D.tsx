'use client';

import React, { useState } from 'react';
import { PitchState, PlayerNode } from '@/types/incident';
import { MapPin, Eye, Compass, Info } from 'lucide-react';

interface PitchCanvas2DProps {
  pitch: PitchState;
  shortTitle: string;
}

export const PitchCanvas2D: React.FC<PitchCanvas2DProps> = ({ pitch, shortTitle }) => {
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerNode | null>(null);

  return (
    <div className="w-full bg-panel-base border border-technical rounded-xl overflow-hidden flex flex-col shadow-md">
      {/* Pitch Header */}
      <div className="px-4 py-3 bg-panel-elevated border-b border-technical flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
            Pitch View & Key Positions
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-blue-400 shadow-sm"></span> FC Barcelona
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border border-rose-400 shadow-sm"></span> Opponent
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-300 shadow-sm"></span> Referee
          </span>
        </div>
      </div>

      {/* SVG Canvas Area: Styled like an actual sports broadcast football pitch */}
      <div className="relative w-full aspect-[105/68] bg-[#0c2415] select-none p-2 sm:p-3">
        <svg
          viewBox={pitch.viewBox}
          className="w-full h-full drop-shadow-lg rounded-lg overflow-hidden"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Pattern for alternating grass cut stripes */}
            <pattern id="turf-stripes" width="10" height="68" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="5" height="68" fill="#0e2a19" />
              <rect x="5" y="0" width="5" height="68" fill="#12331f" />
            </pattern>

            {/* Vector Arrow Heads */}
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

          {/* Grass Background */}
          <rect x="0" y="0" width="105" height="68" fill="url(#turf-stripes)" />

          {/* Tactical Pitch Lines in Crisp White */}
          <g stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="0.4" fill="none">
            {/* Outer Pitch Boundary */}
            <rect x="0.5" y="0.5" width="104" height="67" strokeWidth="0.5" />

            {/* Halfway Line */}
            <line x1="52.5" y1="0" x2="52.5" y2="68" />
            <circle cx="52.5" cy="34" r="9.15" />
            <circle cx="52.5" cy="34" r="0.6" fill="#FFFFFF" fillOpacity="0.6" />

            {/* Left Penalty Box (16.5m x 40.32m) */}
            <rect x="0" y="13.84" width="16.5" height="40.32" />
            {/* Left 6-Yard Box (5.5m x 18.32m) */}
            <rect x="0" y="24.84" width="5.5" height="18.32" />
            {/* Left Penalty Spot (11m) */}
            <circle cx="11.0" cy="34.0" r="0.6" fill="#FFFFFF" fillOpacity="0.8" />
            {/* Left Penalty Arc (D-Box) */}
            <path d="M 16.5 26.5 A 9.15 9.15 0 0 1 16.5 41.5" />

            {/* Right Penalty Box */}
            <rect x="88.5" y="13.84" width="16.5" height="40.32" />
            {/* Right 6-Yard Box */}
            <rect x="99.5" y="24.84" width="5.5" height="18.32" />
            {/* Right Penalty Spot */}
            <circle cx="94.0" cy="34.0" r="0.6" fill="#FFFFFF" fillOpacity="0.8" />
            {/* Right Penalty Arc */}
            <path d="M 88.5 26.5 A 9.15 9.15 0 0 0 88.5 41.5" />

            {/* Corner Arcs */}
            <path d="M 0 1 A 1 1 0 0 0 1 0" />
            <path d="M 0 67 A 1 1 0 0 1 1 68" />
            <path d="M 104 0 A 1 1 0 0 0 105 1" />
            <path d="M 104 68 A 1 1 0 0 1 105 67" />
          </g>

          {/* Highlight Zone Overlay (Area under review) */}
          <rect
            x={pitch.highlightZone.x}
            y={pitch.highlightZone.y}
            width={pitch.highlightZone.width}
            height={pitch.highlightZone.height}
            fill="#38BDF8"
            fillOpacity="0.08"
            stroke="#38BDF8"
            strokeOpacity="0.4"
            strokeWidth="0.4"
            strokeDasharray="2, 1.5"
            rx="0.5"
          />

          {/* Telemetry Vectors (Passes, Runs, Collisions) */}
          {pitch.vectors.map((vec) => (
            <g key={vec.id}>
              <line
                x1={vec.from.x}
                y1={vec.from.y}
                x2={vec.to.x}
                y2={vec.to.y}
                stroke={vec.color}
                strokeWidth="0.5"
                strokeDasharray={vec.dashed || vec.type === 'RUN' ? '1.5, 1.5' : undefined}
                markerEnd={
                  vec.type === 'RUN'
                    ? 'url(#recovery-arrow)'
                    : vec.type === 'COLLISION'
                    ? 'url(#collision-arrow)'
                    : 'url(#vector-arrow)'
                }
              />
              <rect
                x={(vec.from.x + vec.to.x) / 2 - 8}
                y={(vec.from.y + vec.to.y) / 2 - 2.8}
                width="16"
                height="2.8"
                rx="0.6"
                fill="#0B111E"
                fillOpacity="0.85"
                stroke={vec.color}
                strokeWidth="0.2"
              />
              <text
                x={(vec.from.x + vec.to.x) / 2}
                y={(vec.from.y + vec.to.y) / 2 - 1.0}
                fill="#F1F5F9"
                fontSize="1.3"
                fontWeight="600"
                textAnchor="middle"
              >
                {vec.label}
              </text>
            </g>
          ))}

          {/* Contact / Incident Point Pulse */}
          {pitch.contactPoint && (
            <g>
              <circle
                cx={pitch.contactPoint.x}
                cy={pitch.contactPoint.y}
                r="3.2"
                fill="#F43F5E"
                fillOpacity="0.25"
                className="animate-ping"
              />
              <circle
                cx={pitch.contactPoint.x}
                cy={pitch.contactPoint.y}
                r="1.4"
                fill="#F43F5E"
                stroke="#FFFFFF"
                strokeWidth="0.4"
              />
              <rect
                x={pitch.contactPoint.x - 7.5}
                y={pitch.contactPoint.y + 2.2}
                width="15"
                height="3.0"
                rx="0.6"
                fill="#881337"
                fillOpacity="0.9"
                stroke="#F43F5E"
                strokeWidth="0.3"
              />
              <text
                x={pitch.contactPoint.x}
                y={pitch.contactPoint.y + 4.2}
                fill="#FFFFFF"
                fontSize="1.3"
                fontWeight="bold"
                textAnchor="middle"
              >
                {pitch.contactPoint.timestamp} Contact Point
              </text>
            </g>
          )}

          {/* Ball Indicator (Crisp football) */}
          <g>
            <circle
              cx={pitch.ball.x}
              cy={pitch.ball.y}
              r="1.1"
              fill="#FFFFFF"
              stroke="#0f172a"
              strokeWidth="0.3"
              className="drop-shadow-sm"
            />
            {/* Football pentagon center */}
            <polygon
              points={`
                ${pitch.ball.x},${pitch.ball.y - 0.45}
                ${pitch.ball.x + 0.45},${pitch.ball.y - 0.15}
                ${pitch.ball.x + 0.3},${pitch.ball.y + 0.45}
                ${pitch.ball.x - 0.3},${pitch.ball.y + 0.45}
                ${pitch.ball.x - 0.45},${pitch.ball.y - 0.15}
              `}
              fill="#0f172a"
            />
          </g>

          {/* Player Nodes */}
          {pitch.players.map((player) => {
            const isHome = player.team === 'BARCELONA';
            const isRef = player.team === 'REFEREE';
            const fill = isRef ? '#EAB308' : isHome ? '#1D4ED8' : '#BE123C';
            const stroke = isRef ? '#FEF08A' : isHome ? '#93C5FD' : '#FDA4AF';

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
                    r="2.8"
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
                  r="1.9"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.4"
                  className="drop-shadow-md"
                />
                {/* Player Number */}
                <text
                  x={player.x}
                  y={player.y}
                  dy="0.6"
                  textAnchor="middle"
                  fontSize="1.3"
                  fontWeight="bold"
                  fill="#FFFFFF"
                  className="select-none"
                >
                  {isRef ? 'R' : player.number}
                </text>
                {/* Player Name Pill */}
                <text
                  x={player.x}
                  y={player.y - 2.8}
                  textAnchor="middle"
                  fontSize="1.6"
                  fontWeight="600"
                  fill="#FFFFFF"
                  className="drop-shadow select-none"
                >
                  {player.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered Player Tooltip */}
        {hoveredPlayer && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-panel-elevated/95 border border-technical text-xs text-slate-100 shadow-xl backdrop-blur-sm">
            <span className="font-bold text-white">{hoveredPlayer.label}</span>
            <span className="text-slate-400 ml-2">
              Grid: ({hoveredPlayer.x.toFixed(1)}m, {hoveredPlayer.y.toFixed(1)}m)
            </span>
          </div>
        )}
      </div>

      {/* Pitch Footer Note */}
      <div className="px-4 py-2.5 bg-panel-elevated border-t border-technical flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          Interactive 2D Pitch: Click or hover over players to inspect positions
        </span>
        <span className="text-slate-400 hidden sm:inline">
          Regulation UEFA Pitch (105m × 68m)
        </span>
      </div>
    </div>
  );
};
