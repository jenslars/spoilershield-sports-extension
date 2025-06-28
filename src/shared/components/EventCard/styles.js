import styled from "styled-components";

export const StyledEventContainer = styled.div`
    width: 100%;
    height: 99px;
    background-color: #2D2D2D;
    border-radius: 10px;
    margin-top: 5px;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
    display: grid;
    grid-template-columns: 80px 20px 80px 1px 60px;
    grid-gap: 16px;
    align-items: center;
    position: relative;
`;

export const StyledTeamSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

export const StyledTeamLogo = styled.img`
    display: block;
    height: 35px;
    width: auto; 
    margin: 0 auto; 
`

export const StyledTeamName = styled.p`
    font-size: 10px;
    text-align: center;
    margin-top: 2px;
    width: 100%;
`

export const StyledTimeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledTime = styled.p`
    font-size: 14px;
    font-weight: 700;
`

export const StyledDate = styled.p`
    margin-top: -10px;
    font-size: 10px;
    color: #7C7C7C;
`

export const EventDivider = styled.div`
    width: 1px;
    background-color: #FFFFFF;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
`

export const HideSpoilersSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    width: 100%;
    cursor: pointer;
`

export const HideSpoilersButton = styled.p`
    color: #eeeeee;
    transition: 0.2s;
`

export const StyledBlockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(75, 75, 75, 0.9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

export const StyledOverlayEventDetails = styled.div`
  display: flex; /* Ensure horizontal alignment */
  flex: 1; /* Take up equal space */
  flex-direction: column;
  justify-content: center; /* Center text vertically */
  width: 49%; /* Take up 40% of the space */
  margin: auto auto 2px;
`;

export const StyledCompetitors = styled.p`
  font-size: 14px;
  margin: auto auto 2px;
`;

export const StyledStartTime = styled.p`
  font-size: 12px;
  margin: auto auto 2px;
`;

export const StyledStartDate = styled.p`
  font-size: 10px;
  color: #8C8C8C;
  margin: auto auto 2px;
`;

export const StyledDividerSection = styled.div`
  display: flex; /* Center content within this section */
  justify-content: center;
  align-items: center;
  width: 2%; /* Adjust width as needed */
`;

export const StyledBlockedEventDivider = styled.div`
  width: 1px;
  background-color: #FFFFFF;
  height: 40px;
  margin: auto; /* Center the divider */
`;

export const StyledStatus = styled.div`
  display: flex;
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  font-size: 14px;
  flex: 1; /* Take up equal space */
  width: 49%;
  margin: auto;
`;
