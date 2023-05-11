import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import ChatMessages from "../../data/ChatMessages";
import { json } from "react-router-dom";

const WaveformComponent = ({
  audioUrl,
  chatUserName,
  audioId,
  playFunc,
  isPlayingFunc,
}) => {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(null);

  const togglePlayPause = () => {
    ChatMessages.filter((data) => data.messagetype == "voice").map((data) => {
      if (data.id != audioId) {
        data.wave.pause();
        data.isPlaying = false;
      }

      if (data.id == audioId) {
        data.isPlaying = !data.isPlaying;
        if (data.wave.isPlaying()) {
          data.wave.pause();
        } else {
          data.wave.play();
        }
      }
    });

    isPlayingFunc();
  };

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: `#wave${audioId}`,
      waveColor: "#D9DCFF",
      progressColor: "#4353FF",
      cursorColor: "#4353FF",
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 50,
      barGap: 3,
      // Additional WaveSurfer configuration options...
    });
    wavesurfer.load(audioUrl);
    waveformRef.current = wavesurfer;

    ChatMessages.filter((data) => data.id == audioId).map((data) => {
      data.wave = wavesurfer;
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  if (waveformRef.current !== null) {
    waveformRef.current.on("finish", function () {
      ChatMessages.filter((data) => data.messagetype == "voice").map((data) => {
  
        if (data.id == audioId) {
          data.isPlaying = false;
          data.wave.stop();
           
        }
      });
  
      isPlayingFunc();
    });
  }

  return (
    <VoiceMainContainer>
      <VoiceTopDiv>
        <ProfileNameDiv>
          <ProfileName>{chatUserName}</ProfileName>
        </ProfileNameDiv>
        <AudioDetailDiv>
          <AudioTime>10,</AudioTime>
          <AudioSize>{10} Mb</AudioSize>
        </AudioDetailDiv>
      </VoiceTopDiv>
      <VoiceBottomDiv>
        <VoicePlayBtnDiv onClick={() => togglePlayPause()}>
          {playFunc ? (
            <PlayIcon
              src={require("../../assets/icons/pause.png")}
              alt="play/puase"
            />
          ) : (
            <PauseIcon
              src={require("../../assets/icons/play-button-arrowhead.png")}
              alt="play/puase"
            />
          )}
        </VoicePlayBtnDiv>
        <VoiceWaveDiv id={`wave${audioId}`} ref={waveformRef}></VoiceWaveDiv>
      </VoiceBottomDiv>
    </VoiceMainContainer>
  );
};

export default WaveformComponent;

const VoiceBottomDiv = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;
const VoicePlayBtnDiv = styled.div`
  width: 20px;
  padding: 10px;
  border-radius: 50%;
  background-color: #6887ef;
  margin-right: 10px;
`;
const VoiceWaveDiv = styled.div`
  flex: 1;
`;
const VoiceWave = styled.div`
  width: 300px;
`;

const PlayIcon = styled.img``;
const PauseIcon = styled.img``;

const VoiceMainContainer = styled.div``;
const VoiceTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const ProfileNameDiv = styled.div``;
const AudioDetailDiv = styled.div`
  display: flex;
`;
const AudioTime = styled.p``;
const AudioSize = styled.p``;

const ProfileName = styled.p`
  margin-bottom: 10px;
`;
