import styled from 'styled-components';

export const StyledSlidingPanel = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  background: white;
  box-shadow: ${props => props.direction === 'left' ? '2px 0 8px rgba(0,0,0,0.1)' : '-2px 0 8px rgba(0,0,0,0.1)'};
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  border: 2px solid red; /* Debug border to see the panel */
  
  ${props => props.direction === 'left' && `
    left: 0;
    transform: translateX(${props.isOpen ? '0' : '-100%'});
  `}
  
  ${props => props.direction === 'right' && `
    right: 0;
    transform: translateX(${props.isOpen ? '0' : '100%'});
  `}
`;



export const StyledPanelContent = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`; 