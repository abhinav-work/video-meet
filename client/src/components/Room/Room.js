// Room.js
import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import socket from '../../socket';
import VideoCard from '../Video/VideoCard';
import BottomBar from '../BottomBar/BottomBar';
import Chat from '../Chat/Chat';
import {
  RoomContainer,
  VideoAndBarContainer,
  VideoContainer,
  VideoBox,
  FaIcon,
  MyVideo,
  VideoText,
  AudioText,
  UserName
} from './Room.styles';

const Room = (props) => {
  const currentUser = sessionStorage.getItem('user');
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const [videoDevices, setVideoDevices] = useState([]);
  const [displayChat, setDisplayChat] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const roomId = props.match.params.roomId;

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === 'videoinput');
      setVideoDevices(filtered);
    });

    window.addEventListener('popstate', goToBack);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideoRef.current.srcObject = stream;
      userStream.current = stream;

      socket.emit('backendJoinRoom', { roomId, userName: currentUser });

      socket.on('frontendUserJoin', (users) => {
        const peers = [];
        users.forEach(({ connectSocketId, info }) => {
          let { userName, video, audio } = info;
          if (userName !== currentUser) {
            const peer = createPeer(connectSocketId, socket.id, stream);
            peer.userName = userName;
            peer.peerID = connectSocketId;
            peersRef.current.push({ peerID: connectSocketId, peer, userName });
            peers.push(peer);
            setUserVideoAudio((prev) => ({
              ...prev,
              [peer.userName]: { video, audio },
            }));
          }
        });
        setPeers(peers);
      });

      socket.on('frontendReceiveCall', ({ signal, from, info }) => {
        let { userName, video, audio } = info;
        const peerIdx = findPeer(from);

        if (!peerIdx) {
          const peer = addPeer(signal, from, stream);
          peer.userName = userName;
          peersRef.current.push({ peerID: from, peer, userName });
          setPeers((prev) => [...prev, peer]);
          setUserVideoAudio((prev) => ({
            ...prev,
            [peer.userName]: { video, audio },
          }));
        }
      });

      socket.on('frontendCallAccepted', ({ signal, answerId }) => {
        const peerIdx = findPeer(answerId);
        peerIdx.peer.signal(signal);
      });

      socket.on('frontendUserLeave', ({ connectSocketId }) => {
        const peerIdx = findPeer(connectSocketId);
        if (!peerIdx?.peer) return;
        peerIdx.peer.destroy();
        setPeers((prev) => prev.filter((p) => p.peerID !== peerIdx.peer.peerID));
        peersRef.current = peersRef.current.filter(({ peerID }) => peerID !== connectSocketId);
      });
    });

    socket.on('frontendToggleCamera', ({ connectSocketId, switchTarget }) => {
      const peerIdx = findPeer(connectSocketId);
      if (!peerIdx) return;

      setUserVideoAudio((prev) => {
        const current = prev[peerIdx.userName];
        let { video, audio } = current;
        if (switchTarget === 'video') video = !video;
        else audio = !audio;

        return {
          ...prev,
          [peerIdx.userName]: { video, audio },
        };
      });
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  function createPeer(connectSocketId, caller, stream) {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (signal) => {
      socket.emit('backendCallUser', { userToCall: connectSocketId, from: caller, signal });
    });
    peer.on('disconnect', () => {
      socket.emit('backendLeaveRoom', { roomId, leaver: currentUser });
    });
    return peer;
  }

  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (signal) => {
      socket.emit('backendAcceptCall', { signal, to: callerId });
    });
    peer.on('disconnect', () => {
      socket.emit('backendLeaveRoom', { roomId, leaver: currentUser });
    });
    peer.signal(incomingSignal);
    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }

  function createUserVideo(peer, index, arr) {
    return (
      <VideoBox className={`width-peer${peers.length > 8 ? '' : peers.length}`} onClick={expandScreen} key={index} id={`remoteVideo_${peer.peerID}`}>
        <VideoCard key={index} peer={peer} number={arr.length} userName={peer.userName} />
        {writeUserName(peer.userName, !!(peer.userName && userVideoAudio[peer.userName]?.video))}
        {writeUserAudioStatus(!!(peer.userName && userVideoAudio[peer.userName]?.audio))}
      </VideoBox>
    );
  }

  function writeUserName(userName, videoEnabled) {
    return videoEnabled ? <VideoText>{userName}</VideoText> : <UserName key={userName}>{userName}</UserName>;
  }

  function writeUserAudioStatus(audioEnabled) {
    return <AudioText>{audioEnabled ? 'Audio ON' : 'Audio OFF'}</AudioText>;
  }

  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

   const closeChatBox = (e) => {
    if (displayChat) {
      e.stopPropagation();
      setDisplayChat(false);
    }
  };

  const goToBack = (e) => {
    e.preventDefault();
    socket.emit('backendLeaveRoom', { roomId, leaver: currentUser });
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };

  const toggleCameraAudio = (e) => {
    const target = e.target.getAttribute('data-switch');
    setUserVideoAudio((prev) => {
      const current = prev['localUser'];
      let { video, audio } = current;

      if (target === 'video') {
        const track = userVideoRef.current.srcObject.getVideoTracks()[0];
        video = !video;
        track.enabled = video;
      } else {
        const track = userVideoRef.current.srcObject.getAudioTracks()[0] || userStream.current.getAudioTracks()[0];
        audio = !audio;
        track.enabled = audio;
      }

      return {
        ...prev,
        localUser: { video, audio },
      };
    });
    socket.emit('backendToggleCameraAudio', { roomId, switchTarget: target });
  };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
        const screenTrack = stream.getTracks()[0];
        peersRef.current.forEach(({ peer }) => {
          peer.replaceTrack(peer.streams[0].getTracks().find((t) => t.kind === 'video'), screenTrack, userStream.current);
        });

        screenTrack.onended = () => {
          peersRef.current.forEach(({ peer }) => {
            peer.replaceTrack(screenTrack, peer.streams[0].getTracks().find((t) => t.kind === 'video'), userStream.current);
          });
          userVideoRef.current.srcObject = userStream.current;
          setScreenShare(false);
        };

        userVideoRef.current.srcObject = stream;
        screenTrackRef.current = screenTrack;
        setScreenShare(true);
      });
    } else {
      screenTrackRef.current.onended();
    }
  };

  const expandScreen = (e) => {
    const elem = e.target;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  return (
    <RoomContainer>
      <VideoAndBarContainer>
        <VideoContainer onClick={closeChatBox}>
          <VideoBox className={`width-peer${peers.length > 8 ? '' : peers.length}`} id={`localVideo_${socket.id}`}>
            {!userVideoAudio['localUser'].video && <UserName>{currentUser}</UserName>}
            {writeUserName(currentUser, userVideoAudio['localUser'].video)}
            {writeUserAudioStatus(userVideoAudio['localUser'].audio)}
            <MyVideo onClick={expandScreen} ref={userVideoRef} muted autoPlay playInline />
          </VideoBox>
          {peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
        </VideoContainer>
        <BottomBar
          clickScreenSharing={clickScreenSharing}
          clickChat={clickChat}
          goToBack={goToBack}
          toggleCameraAudio={toggleCameraAudio}
          userVideoAudio={userVideoAudio['localUser']}
          screenShare={screenShare}
          videoDevices={videoDevices}
          displayChat={displayChat}
        />
      </VideoAndBarContainer>
      <Chat display={displayChat} roomId={roomId} />
    </RoomContainer>
  );
};

export default Room;
