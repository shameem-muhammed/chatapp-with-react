import React, { useEffect } from 'react'
import { useState } from 'react'
import ChatMessages from '../../data/ChatMessages'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function SendMediaFile({selectedItem, clearSelectedItem}) {
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

    let handleSendClick = () => {
        let newData = {
            id: ChatMessages.length + 1,
            currentuser: true,
            user: 'Shameem',
            userprofile: require('../../assets/icons/man.png'),
            messagetype: selectedFileType,
            message: URL.createObjectURL(selectedItem),
            viewed: 3,
            sendtime: '08:57'
        }

        ChatMessages.push(newData)
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