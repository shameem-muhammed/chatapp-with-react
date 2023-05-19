import React, { useState } from "react";
import ChatListData from "../../data/ChatListData";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import ChatBox from "./ChatBox";
import PinImage from '../..//assets/icons/office-push-pin.svg'
import SearchIconSvg from '../../assets/icons/zoom-lens_1.svg'
import UserSettings from "../includes/UserSettings";
import { doc, getDocs, collection, setDoc, getDoc, updateDoc, query, orderBy, onSnapshot, where, serverTimestamp } from "firebase/firestore";
import {auth, db, database} from '../includes/FireBase'
import { useEffect } from "react";
import {ref, set, getDatabase } from "firebase/database";


function ChatList({chatConfig}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatBoxdata, setChatBoxdata] = useState(null);
  const [userSettings, setUserSettings] = useState(null);
  const [userList, setUserList] = useState([]);
  const [render, setRerender] = useState(false)
  const [searchUser,setSearchUser] = useState("")
  const [searchList, setSearchList] = useState([])



  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userchats", auth.currentUser.uid), (doc) => {
        setUserList(doc.data())
  
        });
  
      setRerender(!render)
    
        return () => {
          unsub()
        }
    }

    auth.currentUser.uid && getChats()


  }, [auth.currentUser.uid])

  let handleSearch = async (event) => {
    if (event.key == 'Enter') {
      let res = []
      const q = query(collection(db, "users"), where("name", "==", searchUser));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.exists) {
          res.push(doc.data())

        } else {
          setSearchList(null)
        }
        // doc.data() is never undefined for query doc snapshots
      });
      setSearchList(res)
    }

    // console.log(userList)
    
  }

  let selectUser = (event, userid, userinfo) => {
    // const combainid = auth.currentUser.uid > user ? auth.currentUser.uid + user.useruid : user.useruid + auth.currentUser.uid
    if (event.button === 0) { // Check if left mouse button is clicked
      // Left click logic goes here
      setUserSettings(null)
    }
    let userLists = document.getElementsByClassName('userprofile-div')
    Array.from(userLists).forEach(function(element) {
      if(element.getAttribute('id') == userid) {
          element.style.backgroundColor = '#2e343d'
          setSelectedUser(userinfo)
          
          
      } else {
        element.style.backgroundColor = ''
      }
  })

  setChatBoxdata(userid)
  }

  let handleIndiviual = async (event, id, user) => {
    const combainid = auth.currentUser.uid > id ? auth.currentUser.uid + id : id + auth.currentUser.uid
    if (event.button === 0) { // Check if left mouse button is clicked
      // Left click logic goes here
      setUserSettings(null)
    }
    let userLists = document.getElementsByClassName('userprofile-div')
    Array.from(userLists).forEach(function(element) {
      if(element.getAttribute('id') == id) {
          element.style.backgroundColor = '#2e343d'
          setSelectedUser(user)
          
          
      } else {
        element.style.backgroundColor = ''
      }
  })

  set(ref(database, 'userchats/' + combainid), {
    uid: combainid,
    lastmessage: "",
  });
  

  try {
    
    const docSnap = await getDoc(doc(db, 'chats', combainid));
    if(!docSnap.exists()) {
      await setDoc(doc(db, "chats", combainid), {
        messages: []
      })

      await updateDoc(doc(db, "userchats", auth.currentUser.uid), {
        [combainid+".userInfo"]: {
          uid: user.uid,
          name: user.name,
          profilePic: user.profilePic,
        },
        [combainid+".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userchats", user.uid), {
        [combainid+".userInfo"]: {
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          profilePic: auth.currentUser.photoURL,
        },
        [combainid+".date"]: serverTimestamp(),
      });

    } 
  } catch(err) {
    console.log(err)
  } 

  }

  let handleContextMenu = (event, id) => {
    event.preventDefault()
    setUserSettings(id)
  }

  let renderSearchList = () => {
    return searchList.map((item) => (
      <ProfileLi className="userprofile-div" id={item.uid} key={item.uid} onContextMenu={(event) => handleContextMenu(event, item.uid)}  onClick={(event) => handleIndiviual(event,item.uid, item)}>
          <LinkDiv to="#">
            <ProfileAvatar>
              <Avatar src={item.profilePic} alt="avatar" />
            </ProfileAvatar>
            <NameDiv>
              <ProfileName>{item.name}</ProfileName>
              <LastMessage>last message</LastMessage>
            </NameDiv>
            <IncommingDiv>
              <LastMeassageTime>4 m</LastMeassageTime>
              
              <MessageCountDiv>
              {item.incomingcount !== 0 ? (
                <MessageCount>
                  <Count>{item.incomingcount}</Count>
                </MessageCount>
              ): null}
                <PinnedDiv>
                  {item.ispinned ? (
                    <PinnedIcon src={PinImage} alt="" />
                  ) : (
                    null
                  )}
                </PinnedDiv>
              </MessageCountDiv>
            </IncommingDiv>
          </LinkDiv>
          {userSettings == item.uid ? <UserSettings /> : null}
        </ProfileLi>
    ))
  }

  let ChatProfile = () => {
    if(chatConfig == 'all') {
      return Object.entries(userList)?.map((item) => (
        <ProfileDiv className="userprofile-div" id={item[0]} key={item[0]} onContextMenu={(event) => handleContextMenu(event, item[0])}  onClick={(event) => selectUser(event, item[0], item[1].userInfo)}>
          <LinkDiv to="#">
            <ProfileAvatar>
              <Avatar src={item[1].userInfo.profilePic} alt="avatar" />
            </ProfileAvatar>
            <NameDiv>
              <ProfileName>{item[1].userInfo.name}</ProfileName>
              <LastMessage>{item.lastmessage}</LastMessage>
            </NameDiv>
            <IncommingDiv>
              <LastMeassageTime>4 m</LastMeassageTime>
              
              <MessageCountDiv>
              {item.incomingcount !== 0 ? (
                <MessageCount>
                  <Count>{item.incomingcount}</Count>
                </MessageCount>
              ): null}
                <PinnedDiv>
                  {item.ispinned ? (
                    <PinnedIcon src={PinImage} alt="" />
                  ) : (
                    null
                  )}
                </PinnedDiv>
              </MessageCountDiv>
            </IncommingDiv>
          </LinkDiv>
          {userSettings == item[0] ? <UserSettings /> : null}
        </ProfileDiv>
      ));
    } else if (chatConfig == 'seend') {
      return ChatListData.filter((data) => data.incomingmsgcount == 0).map((item) => (
        <ProfileDiv key={item.id} onClick={() => handleIndiviual(item.id)}>
          <LinkDiv  to="#">
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
        <ProfileDiv key={item.id} onClick={() => handleIndiviual(item.id)}>
          <LinkDiv bgcolor={item.isActive ? '#2e343d': ''} to="#">
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
        <SearchInput value={searchUser} onChange={(e) => setSearchUser(e.target.value)} onKeyDown={(e) => handleSearch(e)} type='text' placeholder="Search" />
      </SearchDiv>
      <SearchList>
        {renderSearchList()}
      </SearchList>
    <MainList>
      
      {ChatProfile()}
    </MainList>
    </UserListSection>
    
      <ChatBox chatBoxData={chatBoxdata} selectedUser={selectedUser} />

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
  width: 50%;

`;
const MainList = styled.div`
  overflow-y: scroll;
  height: 85%;
  /* padding: 20px; */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchList = styled.ul``;
const ProfileDiv = styled.div`
    position: relative;
    margin-bottom: 10px;
    &:first-child {
        margin-top: 10px;
    }
`;

const ProfileLi = styled(ProfileDiv)``;

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
  width: 70px;
`;
const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
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
