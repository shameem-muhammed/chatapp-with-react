import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import AllChat from '../../assets/icons/chat.svg'
import SeenIcon from '../../assets/icons/see.svg'
import UnSeenIcon from '../../assets/icons/invisible.svg'
import Settingsicon from '../../assets/icons/settings.svg'


function SideBar() {
  return (
    <MainContainer>
        <SectionTop>
            <LogoDiv>
                <LogoText>CH</LogoText>
            </LogoDiv>
            <NavigationDiv>
                <IconDiv>
                    <Button onClick={() => console.log('all chat clicked')} >
                        <AllChatLogo src={AllChat} />
                        <SubText>All chats</SubText>
                    </Button>
                </IconDiv>
                <IconDiv>
                    <Button onClick={() => console.log('seen clicked')}>
                        <SeenedLogo src={SeenIcon} />
                        <SubText>Seened</SubText>
                    </Button>
                </IconDiv>
                <IconDiv>
                    <Button onClick={() => console.log('unseen clicked')}>
                        <UnSeenedLogo src={UnSeenIcon} />
                        <SubText>Un seened</SubText>
                    </Button>
                </IconDiv>
            </NavigationDiv>
        </SectionTop>
        <SectionBottom>
            <SettingsDiv>
                <IconDiv>
                    <Button onClick={() => console.log('settings button clicked')}>
                        <SettingsIcon src={Settingsicon} />
                        <SubText>Settings</SubText>
                    </Button>
                </IconDiv>
            </SettingsDiv>
        </SectionBottom>
    </MainContainer>
  )
}

const MainContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #131313;
    height: 100vh;

`;

const SectionTop = styled.div``;
const SectionBottom = styled.div``;

const LogoDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const LogoText = styled.h1`
    color: white;
`;

const NavigationDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const IconDiv = styled.div`
    display: flex;
    justify-content: center;
    /* padding: 0 20px; */
    width: 70px;
    margin-bottom: 20px;
`;

const AllChatLogo = styled.img`
    width: 30px;
    display: block;
`;
const SeenedLogo = styled(AllChatLogo)``;
const UnSeenedLogo = styled(AllChatLogo)``;
const Button = styled.button`
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SettingsDiv = styled.div`
`;
const SettingsIcon = styled(AllChatLogo)``;
const SubText = styled.p`
    font-size: 10px;
    color: white;
`;







export default SideBar