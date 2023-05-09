import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import ChatMessages from '../../data/ChatMessages';

const ExampleComponent = () => {
  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;

    console.log(audio.src)

    let newData = {
            id: 7,
            currentuser: true,
            user: 'Shameem',
            userprofile: require('../../assets/icons/man.png'),
            messagetype: 'voice',
            message: url,
            viewed: 3,
            sendtime: '08:57'
        }

        ChatMessages.push(newData)
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  return (
    <div>
      <AudioRecorder 
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      {/* <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
    </div>
  )
}

export default ExampleComponent