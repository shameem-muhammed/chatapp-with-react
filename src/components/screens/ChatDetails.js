import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import MediaGallery from '../includes/MediaGallery'
import MediaFiles from '../../data/MediaFiles'

function ChatDetails({showDetails}) {
  const [closeGallery, setCloseGallery] = useState(false)

  let handleClose = () => {
    showDetails()
  }

  let renderMediaFiles = () => {
    return MediaFiles.map((file) => (
      <MediaItem key={file.id}>
        <MediaImageDiv>
          <MediaImage src={file.mediaurl} alt='media-image' />
        </MediaImageDiv>
      </MediaItem>
    ))
  }
  return (
    <>
    <MainContainer>
      <TopSection>
        <HeadTitle>Chat Details</HeadTitle>
        <CloseIconDiv>
          <Button onClick={handleClose}>
            <CloseIcon src={require('../../assets/icons/close-icon.svg').default} alt='closeicon' />
          </Button>
        </CloseIconDiv>
      </TopSection>
      <ChatFunctionSection>
        <NotificationIconDiv>
          <Button>
            <NotificationIcon src={require('../../assets/icons/bell.svg').default} alt='notificationicon' />
          </Button>
        </NotificationIconDiv>
        <CalenderIconDiv>
          <Button>
            <CalenderIcon src={require('../../assets/icons/calendar (1).svg').default} alt='calender-icon' />
          </Button>
        </CalenderIconDiv>
        <AnalizeIconDiv>
          <Button>
            <AnalizeIcon src={require('../../assets/icons/graph.svg').default} alt='analize-icon' />
          </Button>
        </AnalizeIconDiv>
        <MuteIconDiv>
          <Button>
            <MuteIcon src={require('../../assets/icons/sound.svg').default} alt='mute-icon' />
          </Button>
        </MuteIconDiv>
      </ChatFunctionSection>
      <MediaSection>
        <TopHead>
          <LeftSection>
            <MeadiaHead>Photos and Videos</MeadiaHead>
            <MediaCount>104</MediaCount>
          </LeftSection>
          <RightSection>
            <SeeAllBtn onClick={() => setCloseGallery(true)}>See all</SeeAllBtn>
          </RightSection>
        </TopHead>
        <MediaList>
         {renderMediaFiles()}
        </MediaList>
      </MediaSection>
      <SharedFilesSection>
        <SharedFileTopSection>
          <SharedFileTopLeftDiv>
            <SharedFileHeading>Shared Files</SharedFileHeading>
            <SharedFileCount>1384</SharedFileCount>
          </SharedFileTopLeftDiv>
          <SharedFileTopRightDiv>
            <SeeAllBtn>See all</SeeAllBtn>
          </SharedFileTopRightDiv>
        </SharedFileTopSection>
        <SharedFilesList>
          <SharedFileItem>
            <SharedFileButton>
              <FileIconDiv>
                <FileIcon src={require('../../assets/icons/document.svg').default} alt='file-icon' />
              </FileIconDiv>
              <SharedFileTitle>Contract for the provision of printing services</SharedFileTitle>
            </SharedFileButton>
          </SharedFileItem>

          <SharedFileItem>
            <SharedFileButton>
              <FileIconDiv>
                <FileIcon src={require('../../assets/icons/document.svg').default} alt='file-icon' />
              </FileIconDiv>
              <SharedFileTitle>Changes in the schedule of the department of material...</SharedFileTitle>
            </SharedFileButton>
          </SharedFileItem>

          <SharedFileItem>
            <SharedFileButton>
              <FileIconDiv>
                <FileIcon src={require('../../assets/icons/document.svg').default} alt='file-icon' />
              </FileIconDiv>
              <SharedFileTitle>Changes in the schedule of the department of material...</SharedFileTitle>
            </SharedFileButton>
          </SharedFileItem>

          <SharedFileItem>
            <SharedFileButton>
              <FileIconDiv>
                <FileIcon src={require('../../assets/icons/document.svg').default} alt='file-icon' />
              </FileIconDiv>
              <SharedFileTitle>Contract for the provision of printing services</SharedFileTitle>
            </SharedFileButton>
          </SharedFileItem>

          <SharedFileItem>
            <SharedFileButton>
              <FileIconDiv>
                <FileIcon src={require('../../assets/icons/document.svg').default} alt='file-icon' />
              </FileIconDiv>
              <SharedFileTitle>Changes in the schedule of the department of material...</SharedFileTitle>
            </SharedFileButton>
          </SharedFileItem>

          <SharedFileItem>
            <SharedFileButton>
              <FileIconDiv>
                <FileIcon src={require('../../assets/icons/document.svg').default} alt='file-icon' />
              </FileIconDiv>
              <SharedFileTitle>Contract for the provision of printing services</SharedFileTitle>
            </SharedFileButton>
          </SharedFileItem>
        </SharedFilesList>
      </SharedFilesSection>

      <SharedLinkSection>
        <SharedLinkTopSection>
          <SharedLinkTopLeftDiv>
            <SharedLinkHeading>Shared Links</SharedLinkHeading>
            <SharedLinkCount>32</SharedLinkCount>
          </SharedLinkTopLeftDiv>
          <SharedLinkTopRightDiv>
            <SeeAllBtn>See all</SeeAllBtn>
          </SharedLinkTopRightDiv>
        </SharedLinkTopSection>
        <SharedLinkList>

          <SharedLinkItem>
            <SharedLinkButton>
              <ShareLinkLeftSection>
                <LinkFileIconDiv>
                  <LinkFileIcon src={require('../../assets/icons/excel.png')} alt='file-icon' />
                </LinkFileIconDiv>
              </ShareLinkLeftSection>
              
              <ShareLinkRightSection>
                <ShareLinkTitle>Economic Policy</ShareLinkTitle>
                <ShareLinkTitleLink>https://vm.fi/en/economic-policy</ShareLinkTitleLink>
              </ShareLinkRightSection>
            </SharedLinkButton>
          </SharedLinkItem>

          <SharedLinkItem>
            <SharedLinkButton>
              <ShareLinkLeftSection>
                <LinkFileIconDiv>
                  <LinkFileIcon src={require('../../assets/icons/microsoft.png')} alt='file-icon' />
                </LinkFileIconDiv>
              </ShareLinkLeftSection>
              
              <ShareLinkRightSection>
                <ShareLinkTitle>Microsoft</ShareLinkTitle>
                <ShareLinkTitleLink>https://www.microsoft.com/</ShareLinkTitleLink>
              </ShareLinkRightSection>
            </SharedLinkButton>
          </SharedLinkItem>

          <SharedLinkItem>
            <SharedLinkButton>
              <ShareLinkLeftSection>
                <LinkFileIconDiv>
                  <LinkFileIcon src={require('../../assets/icons/excel.png')} alt='file-icon' />
                </LinkFileIconDiv>
              </ShareLinkLeftSection>
              
              <ShareLinkRightSection>
                <ShareLinkTitle>Contact information</ShareLinkTitle>
                <ShareLinkTitleLink>https://vm.fi/en/economic-policy</ShareLinkTitleLink>
              </ShareLinkRightSection>
            </SharedLinkButton>
          </SharedLinkItem>

          <SharedLinkItem>
            <SharedLinkButton>
              <ShareLinkLeftSection>
                <LinkFileIconDiv>
                  <LinkFileIcon src={require('../../assets/icons/microsoft.png')} alt='file-icon' />
                </LinkFileIconDiv>
              </ShareLinkLeftSection>
              
              <ShareLinkRightSection>
                <ShareLinkTitle>Official Guide to Government..</ShareLinkTitle>
                <ShareLinkTitleLink>https://www.use.gov/</ShareLinkTitleLink>
              </ShareLinkRightSection>
            </SharedLinkButton>
          </SharedLinkItem>

          
        </SharedLinkList>
      </SharedLinkSection>
      
    </MainContainer>
    {closeGallery ? <MediaGallery closeMedia={() => setCloseGallery(false)} /> : null}

    </>

  )
}

const MainContainer = styled.section`
    background-color: #131313;
    width: 20%;
    color: white;
    padding: 10px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const HeadTitle = styled.p``;
const CloseIconDiv = styled.div`
  width: 40px;
`;
const Button = styled.button``;
const CloseIcon = styled.img``;


const ChatFunctionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`;
const NotificationIconDiv = styled.div`
  width: 20px;
  padding: 10px;
  background-color: #2e343d;
  border-radius: 10px;
`;
const NotificationIcon = styled.img``;
const CalenderIconDiv = styled(NotificationIconDiv)``;
const CalenderIcon = styled.img``;
const AnalizeIconDiv = styled(NotificationIconDiv)``;
const AnalizeIcon = styled.img``;
const MuteIconDiv = styled(NotificationIconDiv)``;
const MuteIcon = styled.img``;


const MediaSection = styled.div`
  margin-bottom: 20px;
`;
const TopHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;
const MeadiaHead = styled.p`
  margin-right: 5px;
`;
const MediaCount = styled.span`
  font-size: 15px;
  color: #5a595f;
`;
const RightSection = styled.div``;
const SeeAllBtn = styled.button`
  color: #5a595f;
  font-size: 18px;
`;
const MediaList = styled.ul`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const MediaItem = styled.li``;
const MediaImageDiv = styled.div`
  width: 150px;
  margin-right: 10px;
  height: 80%;

`;
const MediaImage = styled.img`
  border-radius: 10px;
  height: 100%;
`;
const SharedFilesSection = styled.div``;
const SharedFileTopSection = styled(TopHead)``;
const SharedFileTopLeftDiv = styled(LeftSection)``;
const SharedFileTopRightDiv = styled.div``;

const SharedFileHeading = styled(MeadiaHead)``;
const SharedFileCount = styled(MediaCount)``;
const SharedFilesList = styled.ul`
  height: 150px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SharedFileItem = styled.li`
  padding: 5px;
`;
const SharedFileButton = styled.button`
  display: flex;
`;

const SharedFileTitle = styled.p`
  text-align: left;
  width: 80%;
  color: white;
`;

const FileIconDiv = styled.div`
  width: 40px;
  background-color: #2e343d;
  border-radius: 10px;
  margin-right: 10px;
`;
const FileIcon = styled.img``;
const SharedLinkSection = styled.div`
  margin-top: 20px;
`;
const SharedLinkTopSection = styled(TopHead)``;
const SharedLinkTopLeftDiv = styled(LeftSection)``;
const SharedLinkTopRightDiv = styled.div``;
const SharedLinkHeading = styled(MeadiaHead)``;
const SharedLinkCount = styled(MediaCount)``;
const SharedLinkList = styled.ul`
  height: 150px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SharedLinkItem = styled.li``;
const SharedLinkButton = styled.button`
  display: flex;
  padding: 5px;
`;
const ShareLinkLeftSection = styled.div`
  margin-right: 10px;
`;
const LinkFileIconDiv = styled.div`
  width: 20px;
`;
const LinkFileIcon = styled.img``;
const ShareLinkRightSection = styled.div``;
const ShareLinkTitle = styled.p`
  color: #c1c1c3;
  text-align: left;
`;
const ShareLinkTitleLink = styled.p`
  color: #63626a;
`;





export default ChatDetails