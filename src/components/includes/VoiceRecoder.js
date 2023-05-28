import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import ChatMessages from '../../data/ChatMessages';
import { getDownloadURL, uploadBytesResumable, ref as sRef } from 'firebase/storage'
import {auth, db, database, storage} from '../includes/FireBase'
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import {ref, set, child, get } from "firebase/database";
import {v4 as uuidv4} from 'uuid';





const ExampleComponent = ({ renderRecord, isRecord, combainedId, uploadStatus, selectedUser, reRender }) => {
  const recorderControls = useAudioRecorder()

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;

    let fileName = `audio${blob.size}`

    console.log(fileName)
    const storageRef = sRef(storage);
        const imagesRef = sRef(storageRef, combainedId);
        const spaceRef = sRef(imagesRef, fileName);
        const uploadTask = uploadBytesResumable(spaceRef, blob);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadStatus('Upload is ' + progress + '% done')
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        },
        (error) => {
            console.log(error)
        },
        () => {
            uploadStatus(null)
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                console.log(downloadUrl)
                const userchatRef = doc(db, "chats", combainedId);
                var today = new Date();
                await updateDoc(userchatRef, {
                    messages: arrayUnion({
                        messageid: uuidv4(),
                        senderdata: {
                            name: auth.currentUser.displayName,
                            profilePic: auth.currentUser.photoURL,
                            useruid: auth.currentUser.uid
                        },
                        recieverdata: {
                            name: selectedUser.name,
                            profilePic: selectedUser.profilePic,
                            useruid: selectedUser.uid
                        },
                        message: downloadUrl,
                        messagetype: 'voice',
                        isPlaying: false,
                        timestamp: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
                    })
                });
                set(ref(database, 'userchats/' + combainedId), {
                    uid: combainedId,
                    lastmessage: "🎤 Voice",
                })
                .then(() => {
                    reRender()
                    // Data saved successfully!
                })
                .catch((error) => {
                    // The write failed...
                });
            })
        }
        )


    // let newData = {
    //         id: ChatMessages.length + 1,
    //         currentuser: true,
    //         user: 'Shameem',
    //         userprofile: require('../../assets/icons/man.png'),
    //         messagetype: 'voice',
    //         message: url,
    //         viewed: 3,
    //         sendtime: '08:57'
    //     }

    //     ChatMessages.push(newData)
        renderRecord()
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  if(recorderControls.isRecording) {
    isRecord(true)
  } else {
    isRecord(false)

  }

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