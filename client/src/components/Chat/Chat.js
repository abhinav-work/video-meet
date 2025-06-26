import React, { useState, useEffect, useRef } from 'react';
import socket from '../../socket'; // Adjust based on your structure
import {
  ChatContainer,
  TopHeader,
  ChatArea,
  MessageList,
  Message,
  UserMessage,
  BottomInput
} from './Chat.styles'; // if you use styled components in a separate file

const Chat = ({ display, roomId }) => {
  const currentUser = sessionStorage.getItem('user');
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    socket.on('frontendReceiveMessage', ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });

    return () => socket.off('frontendReceiveMessage');
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      const msg = e.target.value;
      if (msg) {
        socket.emit('backendSendMessage', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
      }
    }
  };

  return (
    <ChatContainer className={display ? '' : 'width0'}>
      <TopHeader>Group Chat Room</TopHeader>
      <ChatArea>
        <MessageList>
          {msg.map(({ sender, msg }, idx) =>
            sender !== currentUser ? (
              <Message key={idx}>
                <strong>{sender}</strong>
                <p>{msg}</p>
              </Message>
            ) : (
              <UserMessage key={idx}>
                <strong>{sender}</strong>
                <p>{msg}</p>
              </UserMessage>
            )
          )}
          <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
        </MessageList>
      </ChatArea>
      <BottomInput
        ref={inputRef}
        onKeyUp={sendMessage}
        placeholder="Enter your message"
      />
    </ChatContainer>
  );
};

export default Chat;
