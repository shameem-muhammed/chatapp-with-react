import React from 'react'
import styled from 'styled-components'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import ChatDetails from './ChatDetails'
import SideBar from '../includes/SideBar'
import { useState } from 'react'

function ChatAppBase() {
  const [chatType, setChatType] = useState('all')
  return (
    <>
        <MainContainer>
            <SideBar chatFilter={(data) => {setChatType(data)}}/>
            <ChatList chatConfig={chatType} />
        </MainContainer>
        

    </>
  )
}

const MainContainer = styled.section`
    display: flex;
    height: 100vh;
    background-color: #131313;
    /* overflow-y: hidden; */
`

export default ChatAppBase