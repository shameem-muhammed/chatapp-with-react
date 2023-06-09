import React, { useEffect } from 'react'
import { useState } from 'react'
import ChatMessages from '../../data/ChatMessages'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { doc, getDoc, arrayUnion, updateDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import {auth, db, database, storage} from '../includes/FireBase'
import {ref, set, child, get } from "firebase/database";
import { getDownloadURL, uploadBytesResumable, ref as sRef } from 'firebase/storage'




function SendMediaFile({selectedItem, clearSelectedItem, selectedUser, combainedId, reRender, uploadStatus}) {
    const [closeContainer, setCloseContainer] = useState(true)
    const [showEmojiMart, setShowEmojiMart] = useState(false)
    const [selectedFileType, setSelectedFileType] = useState(null)



    useEffect(() => {
        let fileType = selectedItem.type.split('/')[0]
        setSelectedFileType(fileType)
    }, [selectedItem])


    let handleCloseContainer = () => {
        setCloseContainer(false)
        clearSelectedItem()
    }

    let handleSendClick = async () => {
        console.log(selectedItem.name)
        const storageRef = sRef(storage);
        const imagesRef = sRef(storageRef, combainedId);
        const spaceRef = sRef(imagesRef, selectedItem.name);
        const uploadTask = uploadBytesResumable(spaceRef, selectedItem);

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
                        messagetype: selectedFileType,
                        timestamp: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
                    })
                });
                set(ref(database, 'userchats/' + combainedId), {
                    uid: combainedId,
                    lastmessage: "📷 image",
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

        setCloseContainer(false)
        clearSelectedItem()


    }



  return closeContainer ? (
    <div id='sendmedia-maincontainer'>
        <div className='sendmedia-secondcontainer'>
            <div className='sendmedia-top'>
                <button onClick={handleCloseContainer}>
                    <div className='close-btn-div'>
                        <img src={require('../../assets/icons/close-icon.svg').default} alt="close-btn" />
                    </div>
                </button>
                
                <div className='send-item-title'>
                    <h5>Send Photo</h5>
                </div>
            </div>
            <div className='middle'>
                <div className='selected-item-div'>
                    {
                        selectedFileType === 'image' ? <img src={URL.createObjectURL(selectedItem)} alt="selected-item" /> : selectedFileType === 'video' ? <video controls src={URL.createObjectURL(selectedItem)} /> : null
                    }
                    
                </div>
                {
                    showEmojiMart ? <div className='emoji-mart-div'><Picker data={data} onEmojiSelect={console.log} /></div> : null
                }
                
            </div>
            <div className='sendmedia-bottom'>
                <button onClick={() => setShowEmojiMart(!showEmojiMart)}>
                    <div className='emoji-icon-div'>
                        <img src={require('../../assets/icons/emoji-icon.svg').default} alt="emoji" />
                    </div>
                </button>
                <div className='caption-input'>
                    <input placeholder='add caption' type="text" />
                </div>
                <div className='send-div'>
                    <button onClick={() => handleSendClick()}>Send</button>
                </div>
            </div>
        </div>
    </div>
  ) : null
}

export default SendMediaFile