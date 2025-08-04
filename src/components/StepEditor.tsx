import React, { useState } from 'react';
import type { DrumType, Step } from '../types/drum';

interface StepEditorProps {
  step: Step;
  drumType: DrumType;
  stepIndex: number;
  onStepChange: (newStep: Step) => void;
}

export const StepEditor: React.FC<StepEditorProps> = ({
  step,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drumType: _drumType, // Unused for now, but may be needed for drum-specific features
  stepIndex,
  onStepChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateStep = (updates: Partial<Step>) => {
    onStepChange({ ...step, ...updates });
  };

  return (
    <div className="step-editor">
      <div className="step-basic">
        <button
          className={`step-trigger ${step.active ? 'active' : ''} ${step.accent ? 'accent' : ''}`}
          onClick={() => updateStep({ active: !step.active })}
        >
          {stepIndex + 1}
        </button>

        {step.active && (
          <>
            <div className="velocity-control">
              <label>Vel</label>
              <input
                type="range"
                min="0"
                max="127"
                value={step.velocity}
                onChange={(e) => updateStep({ velocity: parseInt(e.target.value) })}
                className="velocity-slider"
              />
              <span>{step.velocity}</span>
            </div>

            <button
              className={`accent-button ${step.accent ? 'active' : ''}`}
              onClick={() => updateStep({ accent: !step.accent })}
            >
              ACC
            </button>
          </>
        )}
      </div>

      {step.active && (
        <div className="step-advanced">
          <button
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? '▼' : '▶'} Advanced
          </button>

          {showAdvanced && (
            <div className="advanced-controls">
              {/* Probability Control */}
              <div className="control-group">
                <label>Probability</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={step.probability || 100}
                  onChange={(e) => updateStep({ probability: parseInt(e.target.value) })}
                />
                <span>{step.probability || 100}%</span>
              </div>

              {/* Flam Control */}
              <div className="control-group">
                <label>
                  <input
                    type="checkbox"
                    checked={step.flam || false}
                    onChange={(e) => updateStep({ flam: e.target.checked })}
                  />
                  Flam
                </label>
              </div>

              {/* Roll Control */}
              <div className="control-group">
                <label>Roll</label>
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={step.roll || 0}
                  onChange={(e) => updateStep({ roll: parseInt(e.target.value) })}
                />
                <span>{step.roll || 0}</span>
              </div>

              {/* Pan Control */}
              <div className="control-group">
                <label>Pan</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={step.pan || 0}
                  onChange={(e) => updateStep({ pan: parseInt(e.target.value) })}
                />
                <span>{step.pan || 0}</span>
              </div>

              {/* Pitch Control */}
              <div className="control-group">
                <label>Pitch</label>
                <input
                  type="range"
                  min="-24"
                  max="24"
                  value={step.pitch || 0}
                  onChange={(e) => updateStep({ pitch: parseInt(e.target.value) })}
                />
                <span>{step.pitch || 0}st</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
