import styled from 'styled-components';

export const HeaderSectionButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #45a049;
  }

  img {
    margin-right: 10px; // Some margin between the icon and the text
  }
`;
