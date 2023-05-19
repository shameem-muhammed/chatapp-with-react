import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

import AllChat from '../../assets/icons/chat.svg'
import SeenIcon from '../../assets/icons/see.svg'
import UnSeenIcon from '../../assets/icons/invisible.svg'
import Settingsicon from '../../assets/icons/settings.svg'
import { useEffect } from 'react'
import { type } from '@testing-library/user-event/dist/type'
import Settings from './Settings'
import { useState } from 'react'
import {signOut } from 'firebase/auth'
import { auth } from '../includes/FireBase'



function SideBar({chatFilter}) {
    let navigate = useNavigate()
    useEffect(() => {
        document.getElementById('all-button').classList.add('toggle-navigation')
    }, [])

    const [openSettings, setOpenSettings] = useState(false)

    let handleLogout = () => {
        signOut(auth).then(() => {
            console.log('sign out successfully')
            navigate('/signin')
        }).catch((error) => {
            console.log('something went wrong')
        })
    }

    let handleClick = (event, type) => {
        chatFilter(type)
        let elementId = event.currentTarget.id
        let elements = document.getElementsByClassName('navigation-button')
        Array.from(elements).forEach(function(element) {
            if(element.getAttribute('id') == elementId) {
                element.classList.add('toggle-navigation')
                
            } else {
                element.classList.remove('toggle-navigation')
            }
        })

    }

    let handleOpenSettings = (event) => {
        let id = event.currentTarget.id
        document.getElementById(id).classList.toggle('toggle-navigation')
        setOpenSettings(!openSettings)

    }
  return (
    <MainContainer>
        <SectionTop>
            <LogoDiv>
                {
                    auth.currentUser ? <LogoIcon src={auth.currentUser.photoURL} alt="profil picture" /> : null
                }
            </LogoDiv>
            <NavigationDiv>
                <IconDiv>
                    <Button className='navigation-button' id='all-button' onClick={(event) => handleClick(event, 'all')} >
                        <AllChatLogo src={AllChat} />
                        <SubText>All chats</SubText>
                    </Button>
                </IconDiv>
                <IconDiv>
                    <Button className='navigation-button' id='seend-button' onClick={(event) => handleClick(event, 'seend')}>
                        <SeenedLogo src={SeenIcon} />
                        <SubText>Seened</SubText>
                    </Button>
                </IconDiv>
                <IconDiv>
                    <Button className='navigation-button' id='unseen-button' onClick={(event) => handleClick(event, 'unseen')}>
                        <UnSeenedLogo src={UnSeenIcon} />
                        <SubText>Un seened</SubText>
                    </Button>
                </IconDiv>
            </NavigationDiv>
        </SectionTop>
        <SectionBottom>
            <SettingsDiv>
                <IconDiv>
                    <Button id='settings-button' onClick={(event) => handleOpenSettings(event)}>
                        <SettingsIcon src={Settingsicon} />
                        <SubText>Settings</SubText>
                    </Button>
                </IconDiv>
                {
                    openSettings ? <Settings logOutUser={() => handleLogout()} /> : null
                }
                
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
    width: 60px;
    height: 60px;
`;

const LogoIcon = styled.img`
    object-fit: cover;
    border-radius: 50%;

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
    position: relative;
`;
const SettingsIcon = styled(AllChatLogo)``;
const SubText = styled.p`
    font-size: 10px;
    color: white;
`;







export default SideBar