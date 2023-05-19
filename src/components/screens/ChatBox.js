import React, {useState, useEffect, useRef} from 'react'
import ChatDetails from "./ChatDetails";

import LenIcon from '../../assets/icons/zoom-lens_1.svg'
import CallIcon from '../../assets/icons/call_1.svg'
import SplitIcon from '../../assets/icons/layout.svg'
import ThreeDot from '../../assets/icons/dots.svg'
import SeenedIcon from '../../assets/icons/see.svg'
import PaperClipIcon from '../../assets/icons/paper-clip.svg'
import MicIcon from '../../assets/icons/mic.svg'
import SendIcon from '../../assets/icons/send.svg'
import styled from 'styled-components'
import song from '../../assets/audio/audio-one.m4a'
import WaveSurfer from "wavesurfer.js";
import AudioPlayer from '../includes/WaveForm'
import ChatMessages from '../../data/ChatMessages'
import { Link } from 'react-router-dom'
import ExampleComponent from '../includes/VoiceRecoder'
import { type } from '@testing-library/user-event/dist/type'
import WaveformComponent from '../includes/WaveForm'
import LoadingScreen from '../includes/LoadingScreen'
import AddFiles from '../includes/AddFiles';
import SendMediaFile from '../includes/SendMediaFile';
import ThreeDotSettings from '../includes/ThreeDotSettings';
import { doc, getDoc, arrayUnion, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import {auth, db, database} from '../includes/FireBase'
import {ref, set, child, get } from "firebase/database";




function ChatBox({selectedUser, chatBoxData}) {
    const [rerender, setRerender] = useState(false);
    let [textMsg, setTextMsg] = useState('')
    let [load, setLoad] = useState(false)
    let [toEnd, setToEnd] = useState(false)
    let [record, setRecord] = useState(false)
    let [render, setRender] = useState(false)
    let [showDetails, setShowDetails] = useState(false)
    let [openAddfiles, setAddfiles] = useState(false)
    let [selectedFile, setSelectedFile] = useState('')
    let [openChatSettings, setOpenChatSettings] = useState(false)
    let [messagesComing, setMessagesComing] = useState(false)


    let [chatDetails, setChatDetails] = useState(null)



    let [textRow, setTextRow] = useState(1)
    let [containerHieght, setContainerHieght] = useState(80)

    const chatListRef = useRef(null)

    const fetchChatData = async () => {

          onSnapshot(doc(db, "chats", chatBoxData), (doc) => {
            console.log(doc.data());
            setChatDetails(doc.data());
            chatListRef.current.scrollIntoView({behavior:"smooth", block: 'end'})

            setRender(true)
            chatListRef.current.scrollIntoView({behavior:"smooth", block: 'end'})


        });

        get(child(ref(database), `userchats/${chatBoxData}`)).then( async (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val().lastmessage)
                
                setMessagesComing(snapshot.val().lastmessage)
                chatListRef.current.scrollIntoView({behavior:"smooth", block: 'end'})

                if(snapshot.val().lastmessage) {
                    const userchatRef = doc(db, "userchats", chatBoxData);
                    
                    await updateDoc(userchatRef, {
                        lastmessage: snapshot.val().lastmessage,
                    });

                }
            } else {
              console.log("No data available");

            }
          }).catch((error) => {
            console.error(error);
          });

 

          
    }

    


    useEffect(() => {
        fetchChatData()
        // renderChats()

    }, [chatBoxData, load, render])


    let handleClick = async () => {
        if(textMsg !== "") {
            console.log(chatBoxData)
            const userchatRef = doc(db, "chats", chatBoxData);
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
                    message: textMsg,
                    messagetype: 'text',
                    timestamp: `${today.getHours()}:${today.getMinutes()}`
                })
            });
            set(ref(database, 'userchats/' + chatBoxData), {
                uid: chatBoxData,
                lastmessage: textMsg,
              })
              .then(() => {
                // Data saved successfully!
                setTextMsg("")
                setLoad(!load)
              })
              .catch((error) => {
                // The write failed...
              });

            
          
            setLoad(!load)

        }


    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClick()
            
          } else if (event.key === 'Backspace' && textMsg === ''  && textRow > 1) {
            // Decrease the number of rows by 1 if input is empty and Backspace is pressed
            setTextRow(1)
            setContainerHieght(80)
        } 

          
      };

    const onChangeTextarea = (event) => {
        setTextMsg(event.target.value)
    }

    

    let renderChats = () => {

        return render ? chatDetails.messages.map((chat) => (
            <ChatItem key={chat.id} style={{flexDirection: chat.senderdata.useruid == auth.currentUser.uid ? 'row-reverse' : 'row'}}>
                    
                    <RightMessageSection style={{marginRight: chat.senderdata.useruid == auth.currentUser.uid ? '10px': '0px', borderRadius: chat.senderdata.useruid == auth.currentUser.uid ? '20px 20px 0px 20px': '', backgroundColor: chat.senderdata.useruid == auth.currentUser.uid ? '#6b8afd' : ''}}>
                        {chat.messagetype == 'image' ? (
                            <>
                                <ProfileName>{chat.senderdata.useruid == auth.currentUser.uid ? chat.senderdata.name : chat.recieverdata.name}</ProfileName>

                                <ChatImageDiv>
                                    <Link to={chat.message} target='_blank'>
                                        <ChatImage src={chat.message} alt='image'/>
                                    </Link>
                                </ChatImageDiv>
                            </>
                            
                        ) : chat.messagetype == 'voice' ? (
                            <WaveformComponent audioUrl={chat.message} chatUserName={chat.user} audioId={chat.id} playFunc={chat.isPlaying} isPlayingFunc={() => {
                                setRerender(!rerender)
                            }} /> 
                            
                        ): chat.messagetype == 'text' ? (
                            <VoiceMainContainer>
                        <TextMessageDiv>
                            <MessageText style={{wordWrap: 'break-word'}}>
                                {chat.message.split(' ').length <= 1 ? chat.message.split('').map((char, index) => {
                                    return (
                                        <React.Fragment key={index} >
                                            {char}
                                            {(index + 1) % 60 === 0 && <br/>}
                                        </React.Fragment>
                                    )
                                }) : chat.message.split(' ').map((char, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {`${char} `}
                                            {(index + 1) % 100 === 0  && <br/>}
                                        </React.Fragment>
                                    )
                                })
                                }
                            </MessageText>
                        </TextMessageDiv>
                    </VoiceMainContainer> 
                        ): chat.messagetype == 'video'  ? (
                            <>
                                <ProfileName>{chat.user}</ProfileName>

                                <ChatImageDiv>
                                    <Link to={chat.message} target='_blank'>
                                        <ChatVideo controls src={chat.message} />
                                    </Link>
                                </ChatImageDiv>
                            </>
                        ) : 'no datatype found'
                    }
                        
                        <MessageStatusDiv>
                            <span>⏱️{chat.timestamp}</span>
                        </MessageStatusDiv>
                    </RightMessageSection>
                </ChatItem>
        )): null
    }

  return (
    <>
    <MainContainer>
        {
            selectedUser ? (

                <TopSection>
                    <LeftSection>
                        {
                            selectedUser ? (
                                <>
                                    <LogoDiv>
                                        <LogoIcon src={selectedUser.profilePic} alt="profil picture" />
                                    </LogoDiv>
                                    <ChatName>{selectedUser ? selectedUser.name : null}</ChatName>
                                </>
                            )  : null
                        }
                        
                    </LeftSection>
                    <RightSection>
                        <LenIconButton>
                            <CommonIcon src={LenIcon} alt='lens'/>
                        </LenIconButton>
                        <CallIconDiv>
                            <CommonIcon src={CallIcon} alt='call'/>
                        </CallIconDiv>
                        <SplitIconDiv>
                            <CommonIcon src={SplitIcon} alt='split'/>
                        </SplitIconDiv>
                        <ThreeIconDiv onClick={() => setOpenChatSettings(!openChatSettings)}>
                            <CommonIcon src={ThreeDot} alt='threedots'/>
                            {
                                openChatSettings ? <ThreeDotSettings openChatDetails={() => setShowDetails(!showDetails)} /> : null
                            }
                        </ThreeIconDiv>
                    </RightSection>
                </TopSection>
            ) : null
        }
        <ChatBoxSection hieghtDiv={`${containerHieght}%`}>
            {
                selectedUser ? (
                    <ChatUl ref={chatListRef} id='chatlist'>
                        {renderChats()}
                    </ChatUl>

                ) : <LoadingScreen />
            }
        </ChatBoxSection>
        {
            selectedUser ? (

            <SendInputMessageSection>
                
                <SendMessageDiv>
                    <ClipFilesDiv>
                        
                        
                        <ClipFileButton onMouseEnter={() => setAddfiles(true)} onMouseLeave={() => setAddfiles(false)} >
                        {
                            openAddfiles ? <AddFiles addFile={(data) => setSelectedFile(data)} /> : null
                        }
                            <ClipFileIcon src={PaperClipIcon} alt='clipfile-icon' />
                        </ClipFileButton>
                    </ClipFilesDiv> 
                    <SendMessageInput rows={textRow} type='text' value={textMsg} tabIndex='0' onKeyDown={handleKeyDown} onChange={(event) => onChangeTextarea(event)} placeholder='Your message'/>
                    <SendMessageIconDiv>
                        <SendMessageIconButton onClick={handleClick}>
                            {!record ? <SendMessageIconIcon src={SendIcon} alt='MessageIcon-icon' /> : null}
                            
                        </SendMessageIconButton>
                    </SendMessageIconDiv>
                    <SendVoiceDiv>
                        {/* <SendVoiceButton>
                            <SendVoiceIcon src={MicIcon} alt='voice-icon' />
                        </SendVoiceButton> */}
                        <ExampleComponent renderRecord={() => {
                            setLoad(!load)
                        }} isRecord={(data) => {setRecord(data)}} />
                    </SendVoiceDiv>
                </SendMessageDiv>
                
            </SendInputMessageSection>
            ) : null
        }
    </MainContainer>
    {
        showDetails ? <ChatDetails showDetails={() => setShowDetails(!showDetails)} /> : null
    }
    {
        selectedFile ? <SendMediaFile selectedItem={selectedFile} clearSelectedItem={() => setSelectedFile(null)} /> : null
    }

    
    
    </>

  )

  
}

const MainContainer = styled.section`
    padding: 10px 30px;
    background-color: #202329;
    color: white;
    width: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    position: relative;
    
`;
const TopSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const LeftSection = styled.div`
    display: flex;
    align-items: center;
    /* margin-right: 300px; */
`;
const LogoDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;
const LogoIcon = styled.img`
    object-fit: cover;
    border-radius: 50%;

`;
const ChatName = styled.h3``;
const ChatStatus = styled.p``;
const RightSection = styled.div`
    display: flex;
`;
const LenIconButton = styled.button`
    width: 35px;
    margin-right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
    &:hover {
        background-color: #2e343d;
    }
`;
const CallIconDiv = styled(LenIconButton)``;
const SplitIconDiv = styled(LenIconButton)``;
const ThreeIconDiv = styled(LenIconButton)``;
const CommonIcon = styled.img`
    width: 100%;
    display: block;
    position: relative;
`;

const ChatBoxSection = styled.div`
    margin-top: 20px;
    height: ${props => props.hieghtDiv};
    overflow-y: scroll;
    &::-webkit-scrollbar {
    display: none;
  }
    
`;
const ChatUl = styled.ul`
    
`;
const ChatItem = styled.li`
    display: flex;
    margin-bottom: 30px;

`;
const LeftProfileSection = styled.div`
    display: flex;
    align-items: flex-end;
`;
const ProfileDiv = styled.div`
    width: 50px;
`;
const Profile = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;

    /* width: 100%;
    display: block; */
`;
const RightMessageSection = styled.div`
    margin-left: 15px;
    background-color: #2e343d;
    padding: 10px;
    border-radius: 20px 30px 20px 0;
    width: 150px;
`;
const ProfileName = styled.p`
    margin-bottom: 10px;
`;
const ChatImageDiv = styled.div`
    width: 300px;
`;
const ChatImage = styled.img`
    width: 100%;
    display: block;
    border-radius: 10px;

`;

const ChatVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
const MessageStatusDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;
const LeftBottomSection = styled.div``;
const ReactedList = styled.ul`
    display: flex;
`;
const Reaction = styled.li`
    display: flex;
    background-color: black;
    padding: 5px;
    border-radius: 10px;
    margin-right: 5px;
`;
const ReactEmojiDiv = styled.div`
    width: 15px;
    margin-right: 5px;
`;
const ReactEmoji = styled.img``;
const ReactedProfilesUl = styled.ul`
    list-style: none;
    display: flex;
    
    
`;

const ProfileReactionLi = styled.li`
    border: 2px solid black;
    border-radius: 50%;
    &:not(:first-child) {
        right: 8px;
        
    }
`;
const ProfileAvatarDiv = styled.div`
    width: 15px;
    
`;
const ProfileAvatar = styled.img``;
const RightBottomSection = styled.div`
    display: flex;
    align-items: center;
`;
const SeenCountDiv = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
`;
const SeenIconDiv = styled.div`
    width: 15px;
    margin-right: 5px;
`;
const SeenIcon = styled.img``;
const SeenCount = styled.p``;
const SendTime = styled.p``;

const SendInputMessageSection = styled.div`
    margin-top: 20px;
`;
const ClipFilesDiv = styled.div`
    padding: 5px;
`;
const ClipFileButton = styled.button`
    width: 25px;
    background: none;
    border: none;
    position: relative;

`;
const ClipFileIcon = styled.img`
    width: 100%;
    display: block;
`;
const SendMessageDiv = styled.div`
    display: flex;
    align-items: flex-end;
    /* position: relative; */
`;
const SendMessageInput = styled.textarea`
    width: 100%;
    background: none;
    border: none;
    padding: 5px;
    margin: 5px;
    color: white;
    resize: none;
    &::-webkit-scrollbar {
        display: none;
    }
    /* position: relative; */
`;

const TextAreaDiv = styled.div`
    /* position: relative; */
`;


const SendVoiceDiv = styled(ClipFilesDiv)``;
const SendVoiceButton = styled(ClipFileButton)``;
const SendVoiceIcon = styled(ClipFileIcon)``;

const SendMessageIconDiv = styled(ClipFilesDiv)``;
const SendMessageIconButton = styled(ClipFileButton)``;
const SendMessageIconIcon = styled(ClipFileIcon)``;

const VoiceMainContainer = styled.div``;


const TextMessageDiv = styled.div``;
const MessageText = styled.p``;

















export default ChatBox