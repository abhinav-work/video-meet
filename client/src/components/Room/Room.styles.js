import styled from 'styled-components';

export const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  flex-direction: row;
  background-color: #454552;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const VideoContainer = styled.div`
  max-width: 100%;
  height: 92%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 15px;
  box-sizing: border-box;
  gap: 10px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    height: calc(100vh - 80px);
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    padding: 8px;
    gap: 8px;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    padding: 5px;
    gap: 5px;
    height: calc(100vh - 70px);
    justify-content: center;
  }

  /* Desktop/Tablet layouts - Landscape aspect ratio (16:9) */
  @media (min-width: 769px) {
    .width-peer1 {
      width: 100%;
      height: 56.25vw; /* 16:9 aspect ratio */
      max-height: calc(100vh - 120px);
    }

    .width-peer2 {
      width: calc(50% - 10px);
      height: calc((50vw - 25px) * 0.5625); /* 16:9 aspect ratio */
      max-height: calc((100vh - 140px) / 2);
    }

    .width-peer3 {
      width: calc(33.33% - 10px);
      height: calc((33.33vw - 20px) * 0.5625); /* 16:9 aspect ratio */
      max-height: calc((100vh - 140px) / 2);
    }

    .width-peer4, .width-peer5, .width-peer6 {
      width: calc(33.33% - 10px);
      height: calc((33.33vw - 20px) * 0.5625); /* 16:9 aspect ratio */
      min-height: 180px;
      max-height: calc((100vh - 160px) / 2);
    }

    .width-peer7, .width-peer8, .width-peer9 {
      width: calc(33.33% - 10px);
      height: calc((33.33vw - 20px) * 0.5625); /* 16:9 aspect ratio */
      min-height: 150px;
      max-height: calc((100vh - 180px) / 3);
    }

    /* More than 9 peers - 3 per row, landscape */
    .width-peer {
      width: calc(33.33% - 10px);
      height: calc((33.33vw - 20px) * 0.5625); /* 16:9 aspect ratio */
      min-height: 120px;
      max-height: calc((100vh - 200px) / 4);
    }
  }

  /* Mobile layouts - Square grids, 2 per row */
  @media (max-width: 768px) {
    .width-peer1 {
      width: calc(50% - 8px); /* Square grid for single video */
      height: calc(50vw - 8px); /* 1:1 aspect ratio (square) */
      max-height: calc(40vh - 60px);
      margin: 0 auto;
    }

    .width-peer2 {
      width: calc(50% - 8px); /* Square grid */
      height: calc(50vw - 8px); /* 1:1 aspect ratio (square) */
      min-height: 120px;
      max-height: calc((100vh - 100px) / 3);
      margin: 0;
    }

    .width-peer3, .width-peer4, .width-peer5, .width-peer6, .width-peer7, .width-peer8, .width-peer9, .width-peer {
      width: calc(50% - 8px); /* Square grid */
      height: calc(50vw - 8px); /* 1:1 aspect ratio (square) */
      min-height: 120px;
      max-height: calc((100vh - 100px) / 4);
      margin: 0;
    }

    /* Center odd number of videos (last video in row) */
    .width-peer2:nth-last-child(1):nth-child(odd),
    .width-peer3:nth-last-child(1):nth-child(odd),
    .width-peer4:nth-last-child(1):nth-child(odd),
    .width-peer5:nth-last-child(1):nth-child(odd),
    .width-peer6:nth-last-child(1):nth-child(odd),
    .width-peer7:nth-last-child(1):nth-child(odd),
    .width-peer8:nth-last-child(1):nth-child(odd),
    .width-peer9:nth-last-child(1):nth-child(odd),
    .width-peer:nth-last-child(1):nth-child(odd) {
      width: calc(50% - 8px);
      margin: 0 auto;
    }
  }

  /* Smaller mobile screens - maintain square grids */
  @media (max-width: 480px) {
    .width-peer1 {
      width: calc(50% - 5px); /* Square grid */
      height: calc(50vw - 5px); /* 1:1 aspect ratio (square) */
      max-height: calc(35vh - 50px);
      margin: 0 auto;
    }

    .width-peer2 {
      width: calc(50% - 5px); /* Square grid */
      height: calc(50vw - 5px); /* 1:1 aspect ratio (square) */
      min-height: 100px;
      max-height: calc((100vh - 90px) / 4);
      margin: 0;
    }

    .width-peer3, .width-peer4, .width-peer5, .width-peer6, .width-peer7, .width-peer8, .width-peer9, .width-peer {
      width: calc(50% - 5px); /* Square grid */
      height: calc(50vw - 5px); /* 1:1 aspect ratio (square) */
      min-height: 100px;
      max-height: calc((100vh - 90px) / 5);
      margin: 0;
    }

    /* Center odd videos on small screens */
    .width-peer2:nth-last-child(1):nth-child(odd),
    .width-peer3:nth-last-child(1):nth-child(odd),
    .width-peer4:nth-last-child(1):nth-child(odd),
    .width-peer5:nth-last-child(1):nth-child(odd),
    .width-peer6:nth-last-child(1):nth-child(odd),
    .width-peer7:nth-last-child(1):nth-child(odd),
    .width-peer8:nth-last-child(1):nth-child(odd),
    .width-peer9:nth-last-child(1):nth-child(odd),
    .width-peer:nth-last-child(1):nth-child(odd) {
      width: calc(50% - 5px);
      margin: 0 auto;
    }
  }
`;

export const VideoAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const MyVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  background-color: #000;

  @media (max-width: 768px) {
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const VideoText = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  z-index: 2;
  max-width: calc(100% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 3px 6px;
    bottom: 8px;
    right: 8px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 2px 5px;
    bottom: 6px;
    right: 6px;
  }
`;

export const AudioText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
  max-width: calc(100% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 6px;
    bottom: 8px;
    left: 8px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 2px 5px;
    bottom: 6px;
    left: 6px;
  }
`;

export const VideoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;

  > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &:hover {
    transform: scale(1.02);
    
    > i {
      display: block;
    }
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    border-radius: 6px;
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.95);
    }

    /* Always show expand icon on mobile for better UX */
    > i {
      display: block;
      opacity: 0.7;
    }

    /* Ensure video fills container properly on mobile */
    > video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  @media (max-width: 480px) {
    border-radius: 4px;
  }
`;

export const UserName = styled.div`
  position: absolute;
  font-size: clamp(16px, 4vw, 24px);
  z-index: 2;
  color: white;
  text-align: center;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  max-width: calc(100% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: clamp(14px, 3.5vw, 20px);
  }

  @media (max-width: 480px) {
    font-size: clamp(12px, 3vw, 16px);
  }
`;

export const FaIcon = styled.i`
  display: none;
  position: absolute;
  right: 12px;
  top: 12px;
  color: white;
  font-size: 18px;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    right: 8px;
    top: 8px;
    font-size: 16px;
    padding: 6px;
    
    &:active {
      transform: scale(0.9);
    }
  }

  @media (max-width: 480px) {
    right: 6px;
    top: 6px;
    font-size: 14px;
    padding: 5px;
  }
`;

/* Additional utility classes for better mobile experience */
export const MobileOptimizations = styled.div`
  /* Prevent zoom on double tap for video elements */
  video {
    touch-action: manipulation;
  }

  /* Improve scrolling performance */
  * {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  /* Prevent text selection on mobile */
  @media (max-width: 768px) {
    * {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    /* Allow text selection for usernames and text elements */
    ${VideoText}, ${AudioText}, ${UserName} {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  }
`;

/* Landscape orientation optimizations for mobile devices */
export const LandscapeStyles = `
  @media (max-width: 768px) and (orientation: landscape) {
    ${VideoContainer} {
      height: calc(100vh - 60px);
      
      .width-peer1 {
        width: calc(50% - 8px);
        height: calc(50vw - 8px); /* Keep square even in landscape */
        max-height: calc(60vh - 40px);
      }
      
      .width-peer2, .width-peer3, .width-peer4, .width-peer5, .width-peer6, .width-peer7, .width-peer8, .width-peer {
        width: calc(50% - 8px);
        height: calc(50vw - 8px); /* Keep square even in landscape */
        min-height: 80px;
        max-height: calc((100vh - 80px) / 3);
      }
    }
  }
`;

/* Performance optimizations */
export const PerformanceStyles = `
  /* Use hardware acceleration for smooth animations */
  ${VideoBox} {
    will-change: transform;
    transform: translateZ(0);
  }
  
  /* Optimize video rendering */
  video {
    will-change: auto;
    backface-visibility: hidden;
  }
`;