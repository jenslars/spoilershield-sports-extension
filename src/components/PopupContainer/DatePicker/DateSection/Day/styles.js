import styled from 'styled-components';

export const StyledDay = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
`;

export const StyledWeekdayBackground = styled.div`
  height: 39px;
  width: 24px;
  border-radius: 200px;

  ${({ isToday, isActive }) => 
    isToday && isActive
      ? `
      background-color: #4B99F1;
    `
      : isActive
      ? `
      background-color: #354350;
    `
      : ''}
`;

export const StyledWeekday = styled.div`
  color: #7F7F7F;
  font-size: 10px;
  margin-top: 2px;
  font-weight: 700;

  ${({ isToday, isActive }) => 
    isToday && isActive
      ? `
      color: #202020;
    `
      : isActive
      ? `
      color: #7F7F7F;
    `
      : ''}
`;

export const StyledDateNumber = styled.div`
  font-weight: 400;
  font-size: 15px;
  margin-top: 2px;

  ${({ isToday, isActive }) => 
    isToday && isActive
      ? `
      color: #202020;
    `
      : isActive
      ? `
      color: #FFFFFF;
    `
      : isToday ? `
      color: #6CA9ED
  ` :''}
`;

export const StyledMarker = styled.div`
  width: 20px;
  height: 3px;
  margin: auto;
  margin-top: 3px;
  background-color: transparent; /* Default color */

  &.active {
    background-color: #1790FF;
    transition: 0.33s;
  }

  ${StyledDay}:hover & {
    background-color: #1790FF;
    transition: 0.33s;
    }
`;
