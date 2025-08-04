import React from 'react';
import type { Pattern, DrumType } from '../types/drum';

interface DrumNotationProps {
  pattern: Pattern;
  className?: string;
}

// Standard drum notation mapping
const drumNotationMap: Record<DrumType, {
  position: number; // Staff position (higher = higher on staff)
  noteHead: 'normal' | 'x' | 'triangle';
  stemDirection?: 'up' | 'down';
  label: string;
}> = {
  crash: { position: 6, noteHead: 'x', stemDirection: 'up', label: 'Crash' },
  ride: { position: 5, noteHead: 'x', stemDirection: 'up', label: 'Ride' },
  tom1: { position: 4, noteHead: 'normal', stemDirection: 'up', label: 'High Tom' },
  tom2: { position: 3, noteHead: 'normal', stemDirection: 'up', label: 'Mid Tom' },
  tom3: { position: 2, noteHead: 'normal', stemDirection: 'up', label: 'Floor Tom' },
  snare: { position: 1, noteHead: 'normal', stemDirection: 'up', label: 'Snare' },
  openhat: { position: 6, noteHead: 'triangle', stemDirection: 'up', label: 'Open Hi-hat' },
  hihat: { position: 6, noteHead: 'x', stemDirection: 'up', label: 'Hi-hat' },
  kick: { position: 0, noteHead: 'normal', stemDirection: 'down', label: 'Kick' },
};

export const DrumNotation: React.FC<DrumNotationProps> = ({ pattern, className = '' }) => {
  const staffHeight = 280;
  const staffWidth = Math.max(800, pattern.steps * 40 + 120);
  const lineSpacing = 24;
  const stepWidth = (staffWidth - 120) / pattern.steps;
  const startX = 60;

  // Calculate staff lines (5 lines for drum notation)
  const staffLines = Array.from({ length: 5 }, (_, i) =>
    staffHeight / 2 - lineSpacing * 2 + i * lineSpacing
  );

  const renderNoteHead = (x: number, y: number, type: string, accent: boolean, velocity: number) => {
    const baseSize = 4;
    const size = accent ? baseSize + 2 : baseSize + (velocity / 127) * 2;
    const strokeWidth = accent ? 2 : 1;
    const opacity = Math.max(0.4, velocity / 127);

    switch (type) {
      case 'x':
        return (
          <g key={`${x}-${y}-x`} opacity={opacity}>
            <line
              x1={x - size}
              y1={y - size}
              x2={x + size}
              y2={y + size}
              stroke="#333"
              strokeWidth={strokeWidth}
            />
            <line
              x1={x - size}
              y1={y + size}
              x2={x + size}
              y2={y - size}
              stroke="#333"
              strokeWidth={strokeWidth}
            />
          </g>
        );
      case 'triangle':
        return (
          <polygon
            key={`${x}-${y}-triangle`}
            points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
            fill={accent ? "#333" : "none"}
            stroke="#333"
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        );
      default: // normal
        return (
          <circle
            key={`${x}-${y}-normal`}
            cx={x}
            cy={y}
            r={size}
            fill={accent ? "#333" : "none"}
            stroke="#333"
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        );
    }
  };

  const renderStem = (x: number, noteY: number, direction: 'up' | 'down', velocity: number) => {
    const stemLength = 24;
    const stemY = direction === 'up' ? noteY - stemLength : noteY + stemLength;
    const opacity = Math.max(0.4, velocity / 127);

    return (
      <line
        key={`${x}-${noteY}-stem`}
        x1={x}
        y1={noteY}
        x2={x}
        y2={stemY}
        stroke="#333"
        strokeWidth={1}
        opacity={opacity}
      />
    );
  };

  const getYPosition = (position: number) => {
    const baseY = staffHeight / 2;
    return baseY - (position * lineSpacing / 2);
  };

  // Helper to render beam groups for 16th notes
  const renderBeam = (x1: number, x2: number, y: number) => {
    return (
      <line
        key={`beam-${x1}-${x2}`}
        x1={x1}
        y1={y - 24}
        x2={x2}
        y2={y - 24}
        stroke="#333"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className={`drum-notation bg-white border rounded-lg p-4 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          🥁 {pattern.name} - Drum Notation
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>📊 {pattern.steps} steps</span>
          <span>🎵 {pattern.bpm} BPM</span>
          <span>🎭 {pattern.genre}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg width={staffWidth} height={staffHeight} className="border border-gray-200 rounded">
          {/* Staff lines */}
          {staffLines.map((y, index) => (
            <line
              key={`staff-${index}`}
              x1={startX - 30}
              y1={y}
              x2={staffWidth - 30}
              y2={y}
              stroke="#666"
              strokeWidth={1}
            />
          ))}

          {/* Clef (Percussion clef) */}
          <text
            x={startX - 45}
            y={staffHeight / 2 + 5}
            fontSize="24"
            fontWeight="bold"
            fill="#333"
            textAnchor="middle"
          >
            ♪
          </text>

          {/* Measure lines */}
          {Array.from({ length: Math.ceil(pattern.steps / 4) + 1 }, (_, i) => (
            <line
              key={`measure-${i}`}
              x1={startX + i * stepWidth * 4}
              y1={staffLines[0] - 15}
              x2={startX + i * stepWidth * 4}
              y2={staffLines[4] + 15}
              stroke="#333"
              strokeWidth={i === 0 || i === Math.ceil(pattern.steps / 4) ? 3 : 1}
            />
          ))}

          {/* Beat numbers */}
          {Array.from({ length: Math.ceil(pattern.steps / 4) }, (_, i) => (
            <text
              key={`beat-${i}`}
              x={startX + i * stepWidth * 4 + stepWidth * 2}
              y={staffLines[4] + 35}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#666"
            >
              {i + 1}
            </text>
          ))}

          {/* Step subdivisions (16th note guides) */}
          {pattern.steps === 16 && Array.from({ length: 16 }, (_, i) => (
            i % 4 !== 0 && (
              <line
                key={`subdivision-${i}`}
                x1={startX + i * stepWidth}
                y1={staffLines[0] - 5}
                x2={startX + i * stepWidth}
                y2={staffLines[4] + 5}
                stroke="#ddd"
                strokeWidth={0.5}
                strokeDasharray="2,2"
              />
            )
          ))}

          {/* Tempo marking */}
          <text
            x={startX}
            y={35}
            fontSize="14"
            fontWeight="bold"
            fill="#333"
          >
            ♩ = {pattern.bpm}
          </text>

          {/* Time signature */}
          <text
            x={startX - 15}
            y={staffHeight / 2 - 20}
            fontSize="18"
            fontWeight="bold"
            fill="#333"
            textAnchor="middle"
          >
            4
          </text>
          <text
            x={startX - 15}
            y={staffHeight / 2 + 10}
            fontSize="18"
            fontWeight="bold"
            fill="#333"
            textAnchor="middle"
          >
            4
          </text>

          {/* Swing indication if applicable */}
          {pattern.swing > 0 && (
            <text
              x={startX + 60}
              y={35}
              fontSize="12"
              fill="#666"
              fontStyle="italic"
            >
              Swing: {Math.round(pattern.swing * 100)}%
            </text>
          )}

          {/* Drum notes */}
          {Object.entries(pattern.beats).map(([drumType, steps]) => {
            const drumInfo = drumNotationMap[drumType as DrumType];
            if (!drumInfo || !steps) return null;

            return steps.map((step, stepIndex) => {
              if (!step.active) return null;

              const x = startX + stepIndex * stepWidth;
              const y = getYPosition(drumInfo.position);

              return (
                <g key={`${drumType}-${stepIndex}`}>
                  {renderNoteHead(x, y, drumInfo.noteHead, step.accent, step.velocity)}
                  {drumInfo.stemDirection && renderStem(x, y, drumInfo.stemDirection, step.velocity)}
                </g>
              );
            });
          })}

          {/* 16th note beams for consecutive notes */}
          {pattern.steps === 16 && Object.entries(pattern.beats).map(([drumType, steps]) => {
            const drumInfo = drumNotationMap[drumType as DrumType];
            if (!drumInfo || !steps) return null;

            const beams: React.ReactElement[] = [];
            let beamStart = -1;

            steps.forEach((step, stepIndex) => {
              if (step.active && beamStart === -1) {
                beamStart = stepIndex;
              } else if (!step.active && beamStart !== -1) {
                if (stepIndex - beamStart > 1) {
                  const y = getYPosition(drumInfo.position);
                  beams.push(
                    renderBeam(
                      startX + beamStart * stepWidth,
                      startX + (stepIndex - 1) * stepWidth,
                      y
                    )
                  );
                }
                beamStart = -1;
              }
            });

            return beams;
          })}
        </svg>
      </div>

      {/* Enhanced Legend */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Notation Legend</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg width="20" height="20">
                <circle cx="10" cy="10" r="4" fill="none" stroke="#333" strokeWidth="1" />
              </svg>
              <span className="text-gray-700">Normal drums (Kick, Snare, Toms)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20">
                <circle cx="10" cy="10" r="4" fill="#333" stroke="#333" strokeWidth="2" />
              </svg>
              <span className="text-gray-700">Accented notes</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg width="20" height="20">
                <line x1="6" y1="6" x2="14" y2="14" stroke="#333" strokeWidth="1" />
                <line x1="6" y1="14" x2="14" y2="6" stroke="#333" strokeWidth="1" />
              </svg>
              <span className="text-gray-700">Cymbals (Hi-hat, Ride, Crash)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20">
                <polygon points="10,6 6,14 14,14" fill="none" stroke="#333" strokeWidth="1" />
              </svg>
              <span className="text-gray-700">Open Hi-hat</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-600">
              <div className="font-medium">Note Opacity:</div>
              <div className="text-xs">Indicates velocity (volume)</div>
            </div>
            <div className="text-gray-600">
              <div className="font-medium">Note Size:</div>
              <div className="text-xs">Larger = accented/louder</div>
            </div>
          </div>
        </div>

        {/* Drum Layout Reference */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <h5 className="font-medium text-gray-800 mb-2">Staff Layout (Top to Bottom):</h5>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Crash/Ride/Hi-hat (Top line + above)</div>
            <div>High Tom (4th line)</div>
            <div>Mid Tom (3rd line)</div>
            <div>Floor Tom (2nd line)</div>
            <div>Snare (1st line)</div>
            <div>Kick Drum (Below staff)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
