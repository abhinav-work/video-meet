import React from 'react';
import {
  Bar,
  Left,
  Center,
  Right,
  ActionButton,
  StopButton
} from './BottomBar.styles';

const BottomBar = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  displayChat
}) => {
  return (
    <Bar $chatOpen={displayChat}>
      <Left>
        <ActionButton onClick={toggleCameraAudio} data-switch='video'>
          <i className={`fas ${userVideoAudio.video ? 'fa-video' : 'fa-video-slash'}`} />
          Camera
        </ActionButton>
        <ActionButton onClick={toggleCameraAudio} data-switch='audio'>
          <i className={`fas ${userVideoAudio.audio ? 'fa-microphone' : 'fa-microphone-slash'}`} />
          Audio
        </ActionButton>
      </Left>

      <Center>
        <ActionButton onClick={clickChat}>
          <i className='fas fa-comments' />
          Chat
        </ActionButton>
        <ActionButton onClick={clickScreenSharing}>
          <i className={`fas fa-desktop ${screenShare ? 'sharing' : ''}`} />
          Share
        </ActionButton>
      </Center>

      <Right>
        <StopButton onClick={goToBack}>
          <i className='fas fa-phone-slash' />
          Stop
        </StopButton>
      </Right>
    </Bar>
  );
};

export default BottomBar;