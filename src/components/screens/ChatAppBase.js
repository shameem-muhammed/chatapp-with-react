import React from 'react'
import styled from 'styled-components'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import ChatDetails from './ChatDetails'
import SideBar from '../includes/SideBar'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../includes/FireBase'
import { useNavigate } from "react-router-dom";

import Signin from './Signin'
import Signup from './Signup'
import AuthDetails from './AuthDetails'

function ChatAppBase() {
  const [chatType, setChatType] = useState('all')
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if(user) {
          navigate("/")
            
        } else {
          navigate("/signin")
            
        }
    })

    return () => {
        listen()
    }
}, [])
  return (
    <MainContainer>
        <SideBar chatFilter={(data) => {setChatType(data)}}/>
        <ChatList currentUser={auth.currentUser} chatConfig={chatType} />
    </MainContainer>
  ) 
}

const MainContainer = styled.section`
    display: flex;
    height: 100vh;
    background-color: #131313;
    /* overflow-y: hidden; */
`

export default ChatAppBase