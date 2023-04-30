import React from 'react'
import styled from 'styled-components'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import ChatDetails from './ChatDetails'
import SideBar from '../includes/SideBar'

function ChatAppBase() {
  return (
    <>
        <MainContainer>
            <SideBar/>
            <ChatList/>
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