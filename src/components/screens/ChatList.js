import React, { useState } from "react";
import ChatListData from "../../data/ChatListData";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import ChatBox from "./ChatBox";
import ChatDetails from "./ChatDetails";
import SearchIconSvg from '../../assets/icons/zoom-lens_1.svg'

function ChatList({chatConfig}) {
  const [selectedUser, setSelectedUser] = useState(null);
  let handleIndiviual = (id) => {
    ChatListData.map((data) => {
      if (data.id === id) {
        data.isActive = true
        setSelectedUser(data)
      } else {
        data.isActive = false
      }
    })
  }
  let ChatProfile = () => {
    if(chatConfig == 'all') {
      return ChatListData.map((item) => (
        <ProfileDiv  onClick={() => handleIndiviual(item.id)}>
          <LinkDiv bgColor={item.isActive ? '#2e343d': ''} to="#">
            <ProfileAvatar>
              <Avatar src={item.avatar} alt="avatar" />
            </ProfileAvatar>
            <NameDiv>
              <ProfileName>{item.name}</ProfileName>
              <LastMessage>{item.lastMessage}</LastMessage>
            </NameDiv>
            <IncommingDiv>
              <LastMeassageTime>4 m</LastMeassageTime>
              
              <MessageCountDiv>
              {item.incomingmsgcount != 0 ? (
                <MessageCount>
                  <Count>{item.incomingmsgcount}</Count>
                </MessageCount>
              ): ''}
                <PinnedDiv>
                  {item.pinned ? (
                    <PinnedIcon src={item.pinnedImage} alt="" />
                  ) : (
                    ""
                  )}
                </PinnedDiv>
              </MessageCountDiv>
            </IncommingDiv>
          </LinkDiv>
        </ProfileDiv>
      ));
    } else if (chatConfig == 'seend') {
      return ChatListData.filter((data) => data.incomingmsgcount == 0).map((item) => (
        <ProfileDiv onClick={() => handleIndiviual(item.id)}>
          <LinkDiv bgColor={item.isActive ? '#2e343d': ''} to="#">
            <ProfileAvatar>
              <Avatar src={item.avatar} alt="avatar" />
            </ProfileAvatar>
            <NameDiv>
              <ProfileName>{item.name}</ProfileName>
              <LastMessage>{item.lastMessage}</LastMessage>
            </NameDiv>
            <IncommingDiv>
              <LastMeassageTime>4 m</LastMeassageTime>
              
              <MessageCountDiv>
              {item.incomingmsgcount != 0 ? (
                <MessageCount>
                  <Count>{item.incomingmsgcount}</Count>
                </MessageCount>
              ): ''}
                <PinnedDiv>
                  {item.pinned ? (
                    <PinnedIcon src={item.pinnedImage} alt="" />
                  ) : (
                    ""
                  )}
                </PinnedDiv>
              </MessageCountDiv>
            </IncommingDiv>
          </LinkDiv>
        </ProfileDiv>
      ))
    } else if (chatConfig == 'unseen') {
      return ChatListData.filter((data) => data.incomingmsgcount !== 0).map((item) => (
        <ProfileDiv onClick={() => handleIndiviual(item.id)}>
          <LinkDiv bgColor={item.isActive ? '#2e343d': ''} to="#">
            <ProfileAvatar>
              <Avatar src={item.avatar} alt="avatar" />
            </ProfileAvatar>
            <NameDiv>
              <ProfileName>{item.name}</ProfileName>
              <LastMessage>{item.lastMessage}</LastMessage>
            </NameDiv>
            <IncommingDiv>
              <LastMeassageTime>4 m</LastMeassageTime>
              
              <MessageCountDiv>
              {item.incomingmsgcount != 0 ? (
                <MessageCount>
                  <Count>{item.incomingmsgcount}</Count>
                </MessageCount>
              ): ''}
                <PinnedDiv>
                  {item.pinned ? (
                    <PinnedIcon src={item.pinnedImage} alt="" />
                  ) : (
                    ""
                  )}
                </PinnedDiv>
              </MessageCountDiv>
            </IncommingDiv>
          </LinkDiv>
        </ProfileDiv>
      ))
    }
    
  };
  return (
    <>
    <UserListSection>
    <SearchDiv>
        <SearchIconDiv>
          <SearchIcon src={SearchIconSvg} alt='searchicon' />
        </SearchIconDiv>
        <SearchInput type='text' placeholder="Search" />
      </SearchDiv>
    <MainList>
      
      {ChatProfile()}
    </MainList>
    </UserListSection>
    
      <ChatBox selectedUser={selectedUser} />
      <ChatDetails />

    </>
    

  );
}
const UserListSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: #202329;

`;
const MainList = styled.div`
  overflow-y: scroll;
  height: 85%;
  /* padding: 20px; */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ProfileDiv = styled.div`
    margin-bottom: 10px;
    &:first-child {
        margin-top: 10px;
    }
`;

const LinkDiv = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  justify-content: space-around;
  text-decoration: none;
  border-radius: 10px;
  background-color: ${({bgColor}) => bgColor};

  &:hover {
    background-color: #2e343d;
  }
`;

const ProfileAvatar = styled.div`
  width: 50px;
`;
const Avatar = styled.img`
  width: 100%;
  display: block;
`;
const NameDiv = styled.div`
  padding: 0 10px;
`;
const ProfileName = styled.h3`
  color: white;
`;
const LastMessage = styled.p`
  color: #5e5f65;
`;
const IncommingDiv = styled.div``;
const LastMeassageTime = styled.p`
  text-align: right;
  color: #5e5f65;
`;
const PinnedDiv = styled.div`
  width: 20px;
`;
const PinnedIcon = styled(Avatar)``;
const MessageCountDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  justify-content: space-evenly;
`;
const MessageCount = styled.div`
  background-color: #6b8afd;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
const Count = styled.p`
  color: white;
  font-weight: bold;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 20px;
`;
const SearchIconDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 5px;
  width: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;
const SearchIcon = styled.img`
`;
const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  padding-left: 30px;
`;




export default ChatList;
