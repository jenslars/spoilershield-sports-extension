import styled from 'styled-components'

export const StyledBlockedEvent = styled.div`
  border-top: 1px solid #5B5B5B;
  border-bottom: 1px solid #5B5B5B;
  display: flex;
  font-size: 14px;
  flex-direction: row;
  height: 94px;
  
  margin-top: 10px;
`

export const StyledLogoSection = styled.div`
  width: 20%;
  display:flex;
  justify-content: center;
  align-items: center;
`

export const StyledEventSection = styled.div`
  flex-grow: 1; /* Allows the text section to take up available space */
  display: flex;
  flex-direction: column; /* Aligns text vertically */
  justify-content: center; /* Centers text vertically within the container */

  p {
    margin: 2px 0; /* Adds consistent spacing between lines of text */
    text-align: left; /* Aligns text to the left */
  }
`

export const StyledRemoveSection = styled.div`
  width: 20%;
  display:flex;
  justify-content: center; 
  align-items: center;
`

export const StyledCompetitors = styled.p`
  font-size: 14px;
`

export const StyledStartTime = styled.p`
  font-size: 12px;
`

export const StyledStartDate = styled.p`
 font-size: 10px;
 color: #8C8C8C;
`

export const StyledDeleteButton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;

  svg{
  width: 40px;
  height: 40px;
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