import React, { useState } from "react";
import ChatListData from "../../data/ChatListData";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

function ChatList() {
  let ChatProfile = () => {
    return ChatListData.map((item) => (
      <ProfileDiv>
        <LinkDiv to="#">
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
              <MessageCount>
                <Count>5</Count>
              </MessageCount>
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
  };
  return <MainList>{ChatProfile()}</MainList>;
}

const MainList = styled.section`
  background-color: #202329;
  overflow-y: scroll;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  width: 80%;
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

export default ChatList;
