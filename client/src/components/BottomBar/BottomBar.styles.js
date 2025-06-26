// BottomBar.styles.js
import styled from 'styled-components';

export const Bar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ $chatOpen }) => ($chatOpen ? 'calc(100% - 32px)' : '99%')}; // Chat window assumed to be 350px
  right: ${({ $chatOpen }) => ($chatOpen ? '150px' : '0')};
  height: 8%;
  background-color: #4ea1d3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  transition: width 0.3s ease, right 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    right: 0;
  }
`;


export const Section = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
`;

export const ActionButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 60px;
  padding: 6px;
  border-radius: 12px;
  background-color: #ffffff22;
  color: white;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffffff33;
  }

  i {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .fa-microphone-slash,
  .fa-video-slash,
  .sharing {
    color: #ee2560;
  }

  * {
    pointer-events: none;
  }
`;

export const StopButton = styled(ActionButton)`
  background-color: #ee2560;

  &:hover {
    background-color: #f25483;
  }
`;

export const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  position: absolute;
  left: 16px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 16px;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
