import styled from 'styled-components';

export const ChatContainer = styled.div`
  width: 350px;
  height: 100vh;
  max-width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: linear-gradient(135deg, #9ab7f0, #dde4ea); /* soft gradient */
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 50;

  &.width0 {
    width: 0;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    bottom: 0;
    top: auto;
    right: 0;
  }
`;

export const TopHeader = styled.div`
  width: 100%;
  padding: 15px;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  background: linear-gradient(135deg, #4a90e2, #6bb3f2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const ChatArea = styled.div`
  width: 100%;
  height: 83%;
  max-height: 83%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #f0f4fa, #e8eef5);
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Message = styled.div`
  background-color: #ffffff;
  padding: 10px 15px;
  border-radius: 12px;
  align-self: flex-start;
  max-width: 75%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  strong {
    color: #1a3e72;
    display: block;
    margin-bottom: 5px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #333;
    word-break: break-word;
  }
`;

export const UserMessage = styled(Message)`
  background-color: #d1eaff;
  align-self: flex-end;

  strong {
    color: #155fa0;
  }
`;

export const BottomInput = styled.input`
  border: none;
  border-top: 1px solid #ccc;
  padding: 12px 15px;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  background-color: #ffffff;

  ::placeholder {
    color: #888;
  }
`;
