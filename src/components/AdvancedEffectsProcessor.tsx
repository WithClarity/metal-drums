import React from 'react';
import type { DrumType } from '../types/drum';

interface EffectConfig {
  enabled: boolean;
  wet: number; // 0-100
  params: Record<string, number | string>;
}

interface AdvancedEffectsProcessorProps {
  drumEffects: Record<DrumType, {
    reverb: EffectConfig;
    delay: EffectConfig;
    filter: EffectConfig;
    distortion: EffectConfig;
    compressor: EffectConfig;
  }>;
  masterEffects: {
    reverb: EffectConfig;
    delay: EffectConfig;
    limiter: EffectConfig;
    eq: EffectConfig;
  };
  onDrumEffectChange: (drum: DrumType, effect: string, config: Partial<EffectConfig>) => void;
  onMasterEffectChange: (effect: string, config: Partial<EffectConfig>) => void;
}

export const AdvancedEffectsProcessor: React.FC<AdvancedEffectsProcessorProps> = ({
  drumEffects,
  masterEffects,
  onDrumEffectChange,
  onMasterEffectChange,
}) => {
  const drumLabels: Record<DrumType, string> = {
    kick: 'KICK',
    snare: 'SNARE',
    hihat: 'HI-HAT',
    openhat: 'OPEN HT',
    crash: 'CRASH',
    ride: 'RIDE',
    tom1: 'TOM 1',
    tom2: 'TOM 2',
    tom3: 'TOM 3',
  };

  const renderDrumEffects = (drumType: DrumType) => {
    const effects = drumEffects[drumType];

    return (
      <div key={drumType} className="drum-effects-strip">
        <div className="drum-label">{drumLabels[drumType]}</div>

        {/* Reverb */}
        <div className="effect-section">
          <div className="effect-header">
            <label>
              <input
                type="checkbox"
                checked={effects.reverb.enabled}
                onChange={(e) => onDrumEffectChange(drumType, 'reverb', { enabled: e.target.checked })}
              />
              REVERB
            </label>
          </div>
          {effects.reverb.enabled && (
            <div className="effect-controls">
              <div className="control-group">
                <label>Room</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effects.reverb.params.room || 50}
                  onChange={(e) => onDrumEffectChange(drumType, 'reverb', {
                    params: { ...effects.reverb.params, room: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="control-group">
                <label>Decay</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effects.reverb.params.decay || 40}
                  onChange={(e) => onDrumEffectChange(drumType, 'reverb', {
                    params: { ...effects.reverb.params, decay: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="control-group">
                <label>Mix</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effects.reverb.wet}
                  onChange={(e) => onDrumEffectChange(drumType, 'reverb', { wet: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="effect-section">
          <div className="effect-header">
            <label>
              <input
                type="checkbox"
                checked={effects.filter.enabled}
                onChange={(e) => onDrumEffectChange(drumType, 'filter', { enabled: e.target.checked })}
              />
              FILTER
            </label>
          </div>
          {effects.filter.enabled && (
            <div className="effect-controls">
              <div className="control-group">
                <label>Cutoff</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effects.filter.params.cutoff || 80}
                  onChange={(e) => onDrumEffectChange(drumType, 'filter', {
                    params: { ...effects.filter.params, cutoff: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="control-group">
                <label>Resonance</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effects.filter.params.resonance || 10}
                  onChange={(e) => onDrumEffectChange(drumType, 'filter', {
                    params: { ...effects.filter.params, resonance: parseInt(e.target.value) }
                  })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Distortion */}
        <div className="effect-section">
          <div className="effect-header">
            <label>
              <input
                type="checkbox"
                checked={effects.distortion.enabled}
                onChange={(e) => onDrumEffectChange(drumType, 'distortion', { enabled: e.target.checked })}
              />
              DRIVE
            </label>
          </div>
          {effects.distortion.enabled && (
            <div className="effect-controls">
              <div className="control-group">
                <label>Drive</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effects.distortion.params.drive || 30}
                  onChange={(e) => onDrumEffectChange(drumType, 'distortion', {
                    params: { ...effects.distortion.params, drive: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="control-group">
                <label>Mix</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effects.distortion.wet}
                  onChange={(e) => onDrumEffectChange(drumType, 'distortion', { wet: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="advanced-effects-processor">
      <div className="effects-header">
        <h3>Advanced Effects Processing</h3>

        <div className="preset-controls">
          <button className="preset-button">LOAD PRESET</button>
          <button className="preset-button">SAVE PRESET</button>
          <button className="preset-button">CLEAR ALL</button>
        </div>
      </div>

      <div className="effects-tabs">
        <button className="tab-button active">DRUM FX</button>
        <button className="tab-button">MASTER FX</button>
        <button className="tab-button">ROUTING</button>
      </div>

      {/* Individual Drum Effects */}
      <div className="drum-effects-section">
        <div className="effects-grid">
          {Object.keys(drumEffects).map((drumType) =>
            renderDrumEffects(drumType as DrumType)
          )}
        </div>
      </div>

      {/* Master Effects Section */}
      <div className="master-effects-section">
        <h4>Master Effects Chain</h4>

        {/* Master Reverb */}
        <div className="master-effect-strip">
          <div className="effect-header">
            <label>
              <input
                type="checkbox"
                checked={masterEffects.reverb.enabled}
                onChange={(e) => onMasterEffectChange('reverb', { enabled: e.target.checked })}
              />
              MASTER REVERB
            </label>
          </div>
          {masterEffects.reverb.enabled && (
            <div className="master-effect-controls">
              <div className="control-group">
                <label>Type</label>
                <select
                  value={masterEffects.reverb.params.type || 'hall'}
                  onChange={(e) => onMasterEffectChange('reverb', {
                    params: { ...masterEffects.reverb.params, type: e.target.value }
                  })}
                >
                  <option value="room">Room</option>
                  <option value="hall">Hall</option>
                  <option value="plate">Plate</option>
                  <option value="spring">Spring</option>
                </select>
              </div>
              <div className="control-group">
                <label>Pre-Delay</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterEffects.reverb.params.predelay || 20}
                  onChange={(e) => onMasterEffectChange('reverb', {
                    params: { ...masterEffects.reverb.params, predelay: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="control-group">
                <label>Mix</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterEffects.reverb.wet}
                  onChange={(e) => onMasterEffectChange('reverb', { wet: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Master EQ */}
        <div className="master-effect-strip">
          <div className="effect-header">
            <label>
              <input
                type="checkbox"
                checked={masterEffects.eq.enabled}
                onChange={(e) => onMasterEffectChange('eq', { enabled: e.target.checked })}
              />
              MASTER EQ
            </label>
          </div>
          {masterEffects.eq.enabled && (
            <div className="master-eq-controls">
              <div className="eq-band">
                <label>LOW</label>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  value={masterEffects.eq.params.low || 0}
                  onChange={(e) => onMasterEffectChange('eq', {
                    params: { ...masterEffects.eq.params, low: parseInt(e.target.value) }
                  })}
                />
                <span>{masterEffects.eq.params.low || 0}dB</span>
              </div>
              <div className="eq-band">
                <label>MID</label>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  value={masterEffects.eq.params.mid || 0}
                  onChange={(e) => onMasterEffectChange('eq', {
                    params: { ...masterEffects.eq.params, mid: parseInt(e.target.value) }
                  })}
                />
                <span>{masterEffects.eq.params.mid || 0}dB</span>
              </div>
              <div className="eq-band">
                <label>HIGH</label>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  value={masterEffects.eq.params.high || 0}
                  onChange={(e) => onMasterEffectChange('eq', {
                    params: { ...masterEffects.eq.params, high: parseInt(e.target.value) }
                  })}
                />
                <span>{masterEffects.eq.params.high || 0}dB</span>
              </div>
            </div>
          )}
        </div>

        {/* Master Limiter */}
        <div className="master-effect-strip">
          <div className="effect-header">
            <label>
              <input
                type="checkbox"
                checked={masterEffects.limiter.enabled}
                onChange={(e) => onMasterEffectChange('limiter', { enabled: e.target.checked })}
              />
              LIMITER
            </label>
          </div>
          {masterEffects.limiter.enabled && (
            <div className="limiter-controls">
              <div className="control-group">
                <label>Threshold</label>
                <input
                  type="range"
                  min="-20"
                  max="0"
                  value={masterEffects.limiter.params.threshold || -6}
                  onChange={(e) => onMasterEffectChange('limiter', {
                    params: { ...masterEffects.limiter.params, threshold: parseInt(e.target.value) }
                  })}
                />
                <span>{masterEffects.limiter.params.threshold || -6}dB</span>
              </div>
              <div className="control-group">
                <label>Release</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={masterEffects.limiter.params.release || 10}
                  onChange={(e) => onMasterEffectChange('limiter', {
                    params: { ...masterEffects.limiter.params, release: parseInt(e.target.value) }
                  })}
                />
                <span>{masterEffects.limiter.params.release || 10}ms</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
