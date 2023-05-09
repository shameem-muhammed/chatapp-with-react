import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformComponent = ({ audioUrl }) => {
  const waveformRef = useRef(null);

  useEffect(() => {
    // Create the WaveSurfer instance
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      // Additional WaveSurfer configuration options...
    });

    // Load the audio file
    wavesurfer.load(audioUrl);

    // Clean up the WaveSurfer instance when the component is unmounted
    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  return <div ref={waveformRef} />;
};

export default WaveformComponent;

