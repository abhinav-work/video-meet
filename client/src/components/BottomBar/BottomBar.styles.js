// BottomBar.styles.js
import styled from 'styled-components';

export const Bar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ $chatOpen }) => ($chatOpen ? 'calc(100% - 32px)' : '99%')};
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
    height: auto;
    max-height: 30vh;
    flex-direction: column;
    padding: 8px 4px;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
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

  /* Responsive sizing using clamp: min, preferred, max */
  width: clamp(28px, 10vw, 60px);
  height: clamp(30px, 8vw, 50px);
  padding: clamp(4px, 1vw, 10px);
  border-radius: clamp(8px, 2vw, 16px);

  background-color: #ffffff22;
  color: white;
  font-size: clamp(11px, 2.5vw, 15px);
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffffff33;
  }

  i {
    font-size: clamp(18px, 4vw, 28px);
    margin-bottom: clamp(2px, 0.7vw, 6px);
  }

  .fa-microphone-slash,
  .fa-video-slash,
  .sharing {
    color: #ee2560;
  }

  * {
    pointer-events: none;
  }

  /* Extra tweaks for very small screens */
  @media (max-width: 480px) {
    width: 44vw;
    min-width: 44px;
    height: 12vw;
    min-height: 36px;
    border-radius: 10vw;
    font-size: 12px;
    i {
      font-size: 22px;
    }
  }
  @media (max-width: 768px) {
    flex: 1 1 45%;
    max-width: 48%;
    margin: 0 1% 8px 1%;
  }
`;


export const StopButton = styled(ActionButton)`
  background-color: #ee2560;

  &:hover {
    background-color: #f25483;
  }
`;

export const Center = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }
`;
