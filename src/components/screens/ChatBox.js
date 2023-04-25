import React from 'react'
import LenIcon from '../../assets/icons/zoom-lens_1.svg'
import CallIcon from '../../assets/icons/call_1.svg'
import SplitIcon from '../../assets/icons/layout.svg'
import ThreeDot from '../../assets/icons/dots.svg'
import SeenedIcon from '../../assets/icons/see.svg'
import PaperClipIcon from '../../assets/icons/paper-clip.svg'
import MicIcon from '../../assets/icons/mic.svg'
import styled from 'styled-components'


function ChatBox() {
  return (
    <MainContainer>
        <TopSection>
            <LeftSection>
                <ChatName>office chat</ChatName>
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
        <ChatBoxSection>
        <ChatUl>
                <ChatItem>
                    <LeftProfileSection>
                        <ProfileDiv>
                            <Profile src={require('../../assets/icons/man.png')} alt='profile'/>
                        </ProfileDiv>
                    </LeftProfileSection>
                    <RightMessageSection>
                        <ProfileName>Harry Fettei</ProfileName>
                        <ChatImageDiv>
                            <ChatImage src={require('../../assets/images/chat-box-img.jpg')} alt='image'/>
                        </ChatImageDiv>
                        <MessageStatusDiv>
                            <LeftBottomSection>
                            <ReactedList>
                                <Reaction>
                                    <ReactEmojiDiv>
                                        <ReactEmoji src={require('../../assets/icons/emoji.png')} alt='emoji' />
                                    </ReactEmojiDiv>
                                    <ProfileAvatarDiv>
                                        <ProfileAvatar src={require('../../assets/icons/man.png')} alt='avatar'/>
                                    </ProfileAvatarDiv>
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
                                    <SeenCount>3</SeenCount>
                                </SeenCountDiv>
                                <SendTime>08:57</SendTime>
                            </RightBottomSection>

                        </MessageStatusDiv>
                    </RightMessageSection>
                </ChatItem>

                <ChatItem>
                    <LeftProfileSection>
                        <ProfileDiv>
                            <Profile src={require('../../assets/icons/man.png')} alt='profile'/>
                        </ProfileDiv>
                    </LeftProfileSection>
                    <RightMessageSection>
                        <ProfileName>Harry Fettei</ProfileName>
                        <ChatImageDiv>
                            <ChatImage src={require('../../assets/images/chat-box-img.jpg')} alt='image'/>
                        </ChatImageDiv>
                        <MessageStatusDiv>
                            <LeftBottomSection>
                            <ReactedList>
                                <Reaction>
                                    <ReactEmojiDiv>
                                        <ReactEmoji src={require('../../assets/icons/emoji.png')} alt='emoji' />
                                    </ReactEmojiDiv>
                                    <ProfileAvatarDiv>
                                        <ProfileAvatar src={require('../../assets/icons/man.png')} alt='avatar'/>
                                    </ProfileAvatarDiv>
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
                                    <SeenCount>3</SeenCount>
                                </SeenCountDiv>
                                <SendTime>08:57</SendTime>
                            </RightBottomSection>

                        </MessageStatusDiv>
                    </RightMessageSection>
                </ChatItem>

                <ChatItem>
                    <LeftProfileSection>
                        <ProfileDiv>
                            <Profile src={require('../../assets/icons/man.png')} alt='profile'/>
                        </ProfileDiv>
                    </LeftProfileSection>
                    <RightMessageSection>
                        <ProfileName>Harry Fettei</ProfileName>
                        <ChatImageDiv>
                            <ChatImage src={require('../../assets/images/chat-box-img.jpg')} alt='image'/>
                        </ChatImageDiv>
                        <MessageStatusDiv>
                            <LeftBottomSection>
                            <ReactedList>
                                <Reaction>
                                    <ReactEmojiDiv>
                                        <ReactEmoji src={require('../../assets/icons/emoji.png')} alt='emoji' />
                                    </ReactEmojiDiv>
                                    <ProfileAvatarDiv>
                                        <ProfileAvatar src={require('../../assets/icons/man.png')} alt='avatar'/>
                                    </ProfileAvatarDiv>
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
                                    <SeenCount>3</SeenCount>
                                </SeenCountDiv>
                                <SendTime>08:57</SendTime>
                            </RightBottomSection>

                        </MessageStatusDiv>
                    </RightMessageSection>
                </ChatItem>
            </ChatUl>
        </ChatBoxSection>
        <SendInputMessageSection>
            
            <SendMessageDiv>
                <ClipFilesDiv>
                    <ClipFileButton>
                        <ClipFileIcon src={PaperClipIcon} alt='clipfile-icon' />
                    </ClipFileButton>
                </ClipFilesDiv> 
                <SendMessageInput type='text' placeholder='Your message'/>
                <SendVoiceDiv>
                    <SendVoiceButton>
                        <SendVoiceIcon src={MicIcon} alt='voice-icon' />
                    </SendVoiceButton>
                </SendVoiceDiv>
            </SendMessageDiv>
            
        </SendInputMessageSection>
    </MainContainer>
  )
}

const MainContainer = styled.section`
    padding: 10px 30px;
    background-color: #202329;
    color: white;
    width: 100%;
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
    height: 80%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
    display: none;
  }
    
`;
const ChatUl = styled.ul`
    
`;
const ChatItem = styled.li`
    display: flex;
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
const ProfileAvatarDiv = styled.div`
    width: 15px;
`;
const ProfileAvatar = styled(Profile)``;
const RightBottomSection = styled.div`
    display: flex;
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
    align-items: center;
`;
const SendMessageInput = styled.input`
    width: 100%;
    background: none;
    border: none;
    padding: 5px;
    margin: 5px;
    color: white;
`;
const SendVoiceDiv = styled(ClipFilesDiv)``;
const SendVoiceButton = styled(ClipFileButton)``;
const SendVoiceIcon = styled(ClipFileIcon)``;








export default ChatBox