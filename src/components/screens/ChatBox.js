import React, {useState, useEffect, useRef} from 'react'
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



function ChatBox({selectedUser}) {
    const [rerender, setRerender] = useState(false);

    

    let [textMsg, setTextMsg] = useState('')
    let [load, setLoad] = useState(false)
    let [record, setRecord] = useState(false)

    let [textRow, setTextRow] = useState(1)
    let [containerHieght, setContainerHieght] = useState(80)



    let handleClick = () => {

        
        let newData = {
            id: ChatMessages.length + 1,
            currentuser: true,
            user: 'Shameem',
            userprofile: require('../../assets/icons/man.png'),
            messagetype: 'text',
            message: textMsg,
            viewed: 3,
            sendtime: '08:57'
        }

        ChatMessages.push(newData)

        setLoad(!load)


    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Do something when Shift+Enter is pressed
            console.log('Shift+Enter pressed');
            setTextMsg(textMsg + "\n")
            let rows = event.target.rows
            if(rows < 7) {
                setTextRow(textRow + 1)
            } 

            if(containerHieght > 69) {
                setContainerHieght(containerHieght - 2)
            }


          } else if (event.key === 'Backspace' && textMsg === ''  && textRow > 1) {
            // Decrease the number of rows by 1 if input is empty and Backspace is pressed
            setTextRow(1)
            setContainerHieght(80)
        } 

          
      };

    const onChangeTextarea = (event) => {
        setTextMsg(event.target.value)
    }


    useEffect(() => {
        renderChats()

        if(selectedUser !== null) {
            var element = document.getElementById('chatlist')

            element.scrollIntoView({block: "end"})
        }
        
        
    }, [load])

    useEffect(() => {
        renderChats()
    }, [rerender])


    


    

    let renderChats = () => {
        return ChatMessages.map((chat) => (
            <ChatItem style={{flexDirection: chat.currentuser ? 'row-reverse' : 'row'}}>
                    <LeftProfileSection>
                        <ProfileDiv>
                            <Profile src={chat.userprofile} alt='profile'/>
                        </ProfileDiv>
                    </LeftProfileSection>
                    <RightMessageSection style={{marginRight: chat.currentuser ? '10px': '0px', borderRadius: chat.currentuser ? '20px 20px 0px 20px': '', backgroundColor: chat.currentuser ? '#6b8afd' : ''}}>
                        {chat.messagetype == 'image' ? (
                            <>
                                <ProfileName>{chat.user}</ProfileName>

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
                        <ProfileName>{chat.user}</ProfileName>
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
                        ): 'data type does not found'}
                        
                        <MessageStatusDiv>
                            <LeftBottomSection>
                            <ReactedList>
                                <Reaction>
                                    <ReactEmojiDiv>
                                        <ReactEmoji src={require('../../assets/icons/emoji.png')} alt='emoji' />
                                    </ReactEmojiDiv>
                                    <ReactedProfilesUl>
                                        <ProfileReactionLi>
                                            <ProfileAvatarDiv>
                                                <ProfileAvatar src={require('../../assets/icons/man.png')} alt='avatar'/>
                                            </ProfileAvatarDiv>
                                        </ProfileReactionLi>

                                        <ProfileReactionLi>
                                            <ProfileAvatarDiv>
                                                <ProfileAvatar src={require('../../assets/icons/man.png')} alt='avatar'/>
                                            </ProfileAvatarDiv>
                                        </ProfileReactionLi>
                                        <ProfileReactionLi>
                                            <ProfileAvatarDiv>
                                                <ProfileAvatar src={require('../../assets/icons/man.png')} alt='avatar'/>
                                            </ProfileAvatarDiv>
                                        </ProfileReactionLi>
                                    </ReactedProfilesUl>
                                </Reaction>
                                <Reaction>
                                    <ReactEmojiDiv>
                                        <ReactEmoji src={require('../../assets/icons/star.png')} alt='emoji' />
                                    </ReactEmojiDiv>
                                    <ProfileAvatarDiv>
                                        <ProfileAvatar src={require('../../assets/icons/man.png')} alt='avatar'/>
                                    </ProfileAvatarDiv>
                                </Reaction>
                            </ReactedList>
                            </LeftBottomSection>
                            <RightBottomSection>
                                <SeenCountDiv>
                                    <SeenIconDiv>
                                        <SeenIcon src={SeenedIcon} alt='seen'/>
                                    </SeenIconDiv>
                                    <SeenCount>{chat.viewed}</SeenCount>
                                </SeenCountDiv>
                                <SendTime>{chat.sendtime}</SendTime>
                            </RightBottomSection>

                        </MessageStatusDiv>
                    </RightMessageSection>
                </ChatItem>
        ))
    }

  return selectedUser !== null ? (
    <MainContainer>
        <TopSection>
            <LeftSection>
                <ChatName>{selectedUser.name}</ChatName>
                <ChatStatus>46 members, 24 online</ChatStatus>
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
                <ThreeIconDiv>
                    <CommonIcon src={ThreeDot} alt='threedots'/>
                </ThreeIconDiv>
            </RightSection>
        </TopSection>
        <ChatBoxSection hieghtDiv={`${containerHieght}%`}>
            <ChatUl id='chatlist'>
            {renderChats()}
            </ChatUl>
        </ChatBoxSection>
        <SendInputMessageSection>
            
            <SendMessageDiv>
                <ClipFilesDiv>
                    <ClipFileButton>
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
    </MainContainer>
  ) : (
    <div>please select a chat</div>
  )

  
}

const MainContainer = styled.section`
    padding: 10px 30px;
    background-color: #202329;
    color: white;
    width: 60%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    
`;
const TopSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const LeftSection = styled.div`
    /* margin-right: 300px; */
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
    width: 100%;
    display: block;
`;
const RightMessageSection = styled.div`
    margin-left: 15px;
    background-color: #2e343d;
    padding: 10px;
    border-radius: 20px 30px 20px 0;
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
const ReactEmoji = styled(Profile)``;
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
const ProfileAvatar = styled(Profile)``;
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
const SeenIcon = styled(Profile)``;
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