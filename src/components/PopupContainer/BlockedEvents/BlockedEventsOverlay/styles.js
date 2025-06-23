import styled, { keyframes } from 'styled-components';

// Define the slide-in animation
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Define the slide-out animation
const slideOutToLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const StyledBlockedEventsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #202020;
  color: white;
  z-index: 9999;
  animation: ${({ isExiting }) =>
    isExiting ? slideOutToLeft : slideInFromLeft} 0.3s ease-out;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)}; /* Fade out */
  transition: opacity 0.3s ease-out; /* Match animation duration */
`;


export const StyledCloseButton = styled.button`
  border: none;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    svg {
      transform: scale(1.1);
      transition: transform 0.2s ease;
    }
  }

  &:active {
    svg {
      transform: scale(0.95);
    }
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  text-align: center;
  align-items: center;
  margin-top: 20px;
`;

export const StyledHeaderTitle = styled.div`
  width: 80%;
  text-align: start;
`;
