import React from 'react';
import type { DrumType } from '../types/drum';

interface DrumChannelConfig {
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  output: number; // 1-8 for separate outputs
}

interface ProfessionalMixerProps {
  drumChannels: Record<DrumType, DrumChannelConfig>;
  onChannelChange: (drum: DrumType, config: Partial<DrumChannelConfig>) => void;
  masterVolume: number;
  onMasterVolumeChange: (volume: number) => void;
  masterPan: number;
  onMasterPanChange: (pan: number) => void;
  soloActive: boolean;
}

export const ProfessionalMixer: React.FC<ProfessionalMixerProps> = ({
  drumChannels,
  onChannelChange,
  masterVolume,
  onMasterVolumeChange,
  masterPan,
  onMasterPanChange,
  soloActive,
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

  const renderChannelStrip = (drumType: DrumType) => {
    const channel = drumChannels[drumType];
    const isMuted = channel.mute || (soloActive && !channel.solo);

    return (
      <div key={drumType} className={`channel-strip ${isMuted ? 'muted' : ''}`}>
        <div className="channel-label">{drumLabels[drumType]}</div>

        {/* Output Assignment */}
        <div className="output-select">
          <label>OUT</label>
          <select
            value={channel.output}
            onChange={(e) => onChannelChange(drumType, { output: parseInt(e.target.value) })}
          >
            <option value={1}>MAIN</option>
            <option value={2}>AUX 1</option>
            <option value={3}>AUX 2</option>
            <option value={4}>AUX 3</option>
            <option value={5}>AUX 4</option>
            <option value={6}>AUX 5</option>
            <option value={7}>AUX 6</option>
            <option value={8}>AUX 7</option>
          </select>
        </div>

        {/* Pan Control */}
        <div className="pan-control">
          <label>PAN</label>
          <input
            type="range"
            min="-50"
            max="50"
            value={channel.pan}
            onChange={(e) => onChannelChange(drumType, { pan: parseInt(e.target.value) })}
            className="pan-slider"
          />
          <div className="pan-indicator">
            <span className={channel.pan < -10 ? 'active' : ''}>L</span>
            <span className={Math.abs(channel.pan) <= 10 ? 'active' : ''}>C</span>
            <span className={channel.pan > 10 ? 'active' : ''}>R</span>
          </div>
        </div>

        {/* Volume Fader */}
        <div className="volume-fader">
          <input
            type="range"
            min="0"
            max="127"
            value={channel.volume}
            onChange={(e) => onChannelChange(drumType, { volume: parseInt(e.target.value) })}
            className="volume-slider vertical"
          />
          <div className="volume-label">{channel.volume}</div>
        </div>

        {/* Solo/Mute Buttons */}
        <div className="channel-buttons">
          <button
            className={`solo-button ${channel.solo ? 'active' : ''}`}
            onClick={() => onChannelChange(drumType, { solo: !channel.solo })}
          >
            S
          </button>
          <button
            className={`mute-button ${channel.mute ? 'active' : ''}`}
            onClick={() => onChannelChange(drumType, { mute: !channel.mute })}
          >
            M
          </button>
        </div>

        {/* Level Meter */}
        <div className="level-meter">
          <div className="meter-bars">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={`meter-bar ${i < (channel.volume / 127) * 12 ? 'active' : ''} ${i >= 10 ? 'red' : i >= 8 ? 'yellow' : 'green'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="professional-mixer">
      <div className="mixer-header">
        <h3>Professional Mixer</h3>

        {/* Global Controls */}
        <div className="global-controls">
          <button className="link-button">LINK</button>
          <button className="clear-button">CLEAR ALL</button>
          <button className="save-button">SAVE MIX</button>
        </div>
      </div>

      <div className="mixer-channels">
        {Object.keys(drumChannels).map((drumType) =>
          renderChannelStrip(drumType as DrumType)
        )}

        {/* Master Section */}
        <div className="master-section">
          <div className="channel-label">MASTER</div>

          {/* Master Pan */}
          <div className="pan-control">
            <label>PAN</label>
            <input
              type="range"
              min="-50"
              max="50"
              value={masterPan}
              onChange={(e) => onMasterPanChange(parseInt(e.target.value))}
              className="pan-slider"
            />
          </div>

          {/* Master Volume */}
          <div className="volume-fader master">
            <input
              type="range"
              min="0"
              max="127"
              value={masterVolume}
              onChange={(e) => onMasterVolumeChange(parseInt(e.target.value))}
              className="volume-slider vertical master"
            />
            <div className="volume-label">{masterVolume}</div>
          </div>

          {/* Master Level Meter */}
          <div className="level-meter master">
            <div className="meter-bars">
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className={`meter-bar ${i < (masterVolume / 127) * 16 ? 'active' : ''} ${i >= 14 ? 'red' : i >= 12 ? 'yellow' : 'green'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mixer-footer">
        <div className="headphone-section">
          <label>PHONES</label>
          <input
            type="range"
            min="0"
            max="127"
            defaultValue="80"
            className="headphone-volume"
          />
        </div>

        <div className="monitor-section">
          <button className="monitor-button">CUE</button>
          <button className="monitor-button">MIX</button>
        </div>
      </div>
    </div>
  );
};
