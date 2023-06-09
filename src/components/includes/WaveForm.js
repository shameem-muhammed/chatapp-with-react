import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import ChatMessages from "../../data/ChatMessages";
import { json } from "react-router-dom";
import { doc, getDocs, updateDoc, getDoc, setDoc, query, where } from "firebase/firestore";
import {auth, db, database} from '../includes/FireBase'


const WaveformComponent = ({
  audioUrl,
  audioId,
  playFunc,
  isPlayingFunc,
  combainedId
}) => {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(null);
  
  const togglePlayPause = () => {
   
    waveformRef.current.playPause()
    if(waveformRef.current.isPlaying()) {
      setIsPlaying(waveformRef.current)

    } else {
      setIsPlaying(null)
    }
    

    isPlayingFunc();
  };

  const addWaveFile = async (wavefile) => {
    console.log(typeof(wavefile))
    await setDoc(doc(db, "voicemessages", audioId), {
      wavefile
    });
  }


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
    console.log(isPlaying)
    wavesurfer.load(audioUrl);
    waveformRef.current = wavesurfer;
    wavesurfer && addWaveFile(wavesurfer)
    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  if (waveformRef.current !== null) {
    waveformRef.current.on("finish", function () {
      waveformRef.current.stop()
      setIsPlaying(null)
  
      isPlayingFunc();
    });
  }

  return (
    <VoiceMainContainer>
      
      <VoiceBottomDiv>
        <VoicePlayBtnDiv onClick={() => togglePlayPause()}>
          {isPlaying == waveformRef.current && isPlaying !==null ? (
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
